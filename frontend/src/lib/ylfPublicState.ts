import { setYlfPublicState, type YlfPublicCategory, type YlfPublicNominee, type YlfPublicState } from "./firebase";
import { adminAuthHeader } from "@/app/_lib/adminAuthSession";

export type YlfPublicCategoryInput = {
  category_id: number;
  name: string;
  show_nominee?: number | boolean | null;
  declare_result?: number | boolean | null;
  winner_nominee_id?: number | null;
};

export type YlfPublicNomineeInput = {
  nominee_id: number;
  name: string;
  photo?: string;
  description?: string | null;
  category_id: number;
  votes?: number;
  is_approved?: number | boolean | null;
};

export type YlfPublicEventInput = {
  is_live?: number | boolean | null;
  declare_result?: number | boolean | null;
};

function flagOn(v: number | boolean | null | undefined): boolean {
  return v === true || v === 1;
}

function isApproved(n: YlfPublicNomineeInput): boolean {
  return n.is_approved === true || n.is_approved === 1;
}

export function buildYlfPublicState(params: {
  event: YlfPublicEventInput;
  categories: YlfPublicCategoryInput[];
  nominees: YlfPublicNomineeInput[];
}): YlfPublicState {
  const categories: Record<string, YlfPublicCategory> = {};
  for (const c of params.categories) {
    categories[String(c.category_id)] = {
      id: c.category_id,
      name: c.name,
      showNominee: flagOn(c.show_nominee),
      declareResult: flagOn(c.declare_result),
      winnerNomineeId:
        c.winner_nominee_id != null && Number(c.winner_nominee_id) > 0
          ? Number(c.winner_nominee_id)
          : null,
    };
  }

  const nominees: Record<string, YlfPublicNominee> = {};
  for (const n of params.nominees) {
    if (!isApproved(n)) continue;
    nominees[String(n.nominee_id)] = {
      id: n.nominee_id,
      name: n.name,
      photo: n.photo ?? "",
      description: n.description ?? null,
      categoryId: n.category_id,
      votes: Number(n.votes ?? 0),
    };
  }

  return {
    updatedAt: Date.now(),
    isLive: flagOn(params.event.is_live),
    declareResult: flagOn(params.event.declare_result),
    categories,
    nominees,
  };
}

export async function syncYlfPublicState(options: {
  eventId: number;
  apiBase: string;
  adminToken?: string;
  event?: YlfPublicEventInput;
  categories?: YlfPublicCategoryInput[];
  nominees?: YlfPublicNomineeInput[];
}): Promise<void> {
  const { eventId, apiBase, adminToken } = options;
  let event = options.event;
  let categories = options.categories;
  let nominees = options.nominees;

  const fetches: Promise<void>[] = [];

  if (!event) {
    fetches.push(
      fetch(`${apiBase}/events/${eventId}`)
        .then((r) => r.json().catch(() => null))
        .then((data) => {
          if (data?.event) {
            event = {
              is_live: data.event.is_live ?? null,
              declare_result: data.event.declare_result ?? null,
            };
          }
        }),
    );
  }

  if (!categories) {
    fetches.push(
      fetch(`${apiBase}/categories?eventId=${eventId}`)
        .then((r) => r.json().catch(() => null))
        .then((data) => {
          if (Array.isArray(data?.categories)) {
            categories = data.categories as YlfPublicCategoryInput[];
          }
        }),
    );
  }

  if (!nominees) {
    fetches.push(
      fetch(`${apiBase}/nominees?eventId=${eventId}`, {
        headers: { ...adminAuthHeader(adminToken ?? null) },
      })
        .then((r) => r.json().catch(() => null))
        .then((data) => {
          if (Array.isArray(data?.nominees)) {
            nominees = data.nominees as YlfPublicNomineeInput[];
          }
        }),
    );
  }

  await Promise.all(fetches);

  const state = buildYlfPublicState({
    event: event ?? {},
    categories: categories ?? [],
    nominees: nominees ?? [],
  });
  await setYlfPublicState(eventId, state);
}

type EventDetailLike = {
  is_live?: number | boolean | null;
  declare_result?: number | boolean | null;
};

type CategoryRowLike = {
  category_id: number;
  name: string;
  winner_nominee_id: number | null;
  show_nominee?: number | boolean | null;
  declare_result?: number | boolean | null;
};

type NomineeRowLike = {
  nominee_id: number;
  name: string;
  photo?: string;
  description?: string | null;
  category_id: number;
  votes?: number;
};

export function applyYlfPublicPatch<T extends EventDetailLike>(
  event: T,
  categories: CategoryRowLike[],
  nominees: NomineeRowLike[],
  patch: YlfPublicState,
): { event: T; categories: CategoryRowLike[]; nominees: NomineeRowLike[] } {
  let nextEvent = event;
  if (patch.isLive !== undefined) {
    nextEvent = { ...nextEvent, is_live: patch.isLive ? 1 : 0 };
  }
  if (patch.declareResult !== undefined) {
    nextEvent = { ...nextEvent, declare_result: patch.declareResult ? 1 : 0 };
  }

  let nextCategories = categories;
  if (patch.categories && Object.keys(patch.categories).length > 0) {
    const fromFb = Object.values(patch.categories)
      .map((c) => ({
        category_id: c.id,
        name: c.name,
        show_nominee: c.showNominee ? 1 : 0,
        declare_result: c.declareResult ? 1 : 0,
        winner_nominee_id: c.winnerNomineeId,
      }))
      .sort((a, b) => a.category_id - b.category_id);
    nextCategories = fromFb;
  }

  let nextNominees = nominees;
  if (patch.nominees && Object.keys(patch.nominees).length > 0) {
    nextNominees = Object.values(patch.nominees)
      .map((n) => ({
        nominee_id: n.id,
        name: n.name,
        photo: n.photo,
        description: n.description ?? null,
        category_id: n.categoryId,
        votes: n.votes,
      }))
      .sort((a, b) => a.category_id - b.category_id || a.nominee_id - b.nominee_id);
  }

  return { event: nextEvent, categories: nextCategories, nominees: nextNominees };
}
