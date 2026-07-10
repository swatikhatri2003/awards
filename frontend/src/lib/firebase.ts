"use client";

import { getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getDatabase, onValue, ref, set, type Database } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAiZfDIylsaUIB5xfQOdlC6qKaxUxlMl3g",
  authDomain: "jain-cricket-league.firebaseapp.com",
  databaseURL: "https://jain-cricket-league.firebaseio.com",
  projectId: "jain-cricket-league",
  storageBucket: "jain-cricket-league.appspot.com",
  messagingSenderId: "886224719584",
  appId: "1:886224719584:web:be3d8efa9acf1b23cd0a85",
};

let app: FirebaseApp | null = null;
let db: Database | null = null;

function getFirebaseApp(): FirebaseApp {
  if (app) return app;
  app = getApps()[0] ?? initializeApp(firebaseConfig);
  return app;
}

export function getRtdb(): Database {
  if (db) return db;
  db = getDatabase(getFirebaseApp());
  return db;
}

/** Per-event LED state: `ylf/events/{eventId}/...` */
export function ylfEventPath(eventId: number, subpath?: string): string {
  const base = `ylf/events/${eventId}`;
  return subpath ? `${base}/${subpath}` : base;
}

export type YlfPage = "home" | "category" | "winner" | "graph" | "qr";

export async function setYlfPage(eventId: number, page: YlfPage): Promise<void> {
  const start = Date.now();
  try {
    const database = getRtdb();
    await set(ref(database, ylfEventPath(eventId, "page")), page);
    console.log(
      `[FIREBASE] ${ylfEventPath(eventId, "page")} set to "${page}" in ${Date.now() - start}ms`,
    );
  } catch (err) {
    console.error(`[FIREBASE] Failed to set page="${page}" for event ${eventId}:`, err);
    throw err;
  }
}

export type YlfNominee = {
  id: number;
  name: string;
  photo: string;
  votes: number;
};

export type YlfWinnerEntry = {
  categoryId: number;
  categoryName: string;
  nominee: {
    id: number;
    name: string;
    photo: string;
  };
};

export type YlfPublicCategory = {
  id: number;
  name: string;
  showNominee: boolean;
  declareResult: boolean;
  winnerNomineeId: number | null;
};

export type YlfPublicNominee = {
  id: number;
  name: string;
  photo: string;
  description?: string | null;
  categoryId: number;
  votes: number;
};

export type YlfPublicState = {
  updatedAt: number;
  isLive?: boolean;
  declareResult?: boolean;
  categories?: Record<string, YlfPublicCategory>;
  nominees?: Record<string, YlfPublicNominee>;
};

export type YlfState = {
  page?: YlfPage;
  timer?: {
    categoryId: number;
    running: boolean;
    durationSec: number;
    endsAtMs: number;
  };
  category?: {
    id: number;
    name: string;
    showNominee?: boolean;
    nominees?: Record<string, YlfNominee> | YlfNominee[];
  };
  winners?: Record<string, YlfWinnerEntry> | YlfWinnerEntry[];
};

export function subscribeYlf(
  eventId: number,
  callback: (state: YlfState | null) => void,
): () => void {
  const database = getRtdb();
  const r = ref(database, ylfEventPath(eventId));
  const unsubscribe = onValue(
    r,
    (snap) => {
      const value = snap.val() as YlfState | null;
      console.log(`[FIREBASE] event ${eventId} snapshot ->`, value);
      callback(value);
    },
    (err) => {
      console.error(`[FIREBASE] subscribeYlf event ${eventId} error:`, err);
      callback(null);
    },
  );
  return unsubscribe;
}

export async function setYlfPublicState(eventId: number, state: YlfPublicState): Promise<void> {
  const database = getRtdb();
  await set(ref(database, ylfEventPath(eventId, "public")), state);
}

export function subscribeYlfPublic(
  eventId: number,
  callback: (state: YlfPublicState | null) => void,
): () => void {
  const database = getRtdb();
  const r = ref(database, ylfEventPath(eventId, "public"));
  const unsubscribe = onValue(
    r,
    (snap) => {
      callback(snap.val() as YlfPublicState | null);
    },
    (err) => {
      console.error(`[FIREBASE] subscribeYlfPublic event ${eventId} error:`, err);
      callback(null);
    },
  );
  return unsubscribe;
}

export async function setYlfNomineeVotes(
  eventId: number,
  params: { nomineeId: number; votes: number },
): Promise<void> {
  const database = getRtdb();
  await set(
    ref(database, ylfEventPath(eventId, `category/nominees/${params.nomineeId}/votes`)),
    params.votes,
  );
}

async function writeYlfCategory(
  eventId: number,
  page: Extract<YlfPage, "category" | "graph">,
  category: { id: number; name: string; nominees: YlfNominee[]; showNominee?: boolean },
): Promise<void> {
  const start = Date.now();
  try {
    const database = getRtdb();
    const showNominee = category.showNominee !== false;
    const nomineesByKey = showNominee
      ? category.nominees.reduce<Record<string, YlfNominee>>((acc, n) => {
          acc[String(n.id)] = n;
          return acc;
        }, {})
      : {};
    await set(ref(database, ylfEventPath(eventId)), {
      page,
      category: {
        id: category.id,
        name: category.name,
        showNominee,
        nominees: nomineesByKey,
      },
    });
    console.log(
      `[FIREBASE] event ${eventId} -> page="${page}", category=${category.id} "${category.name}", nominees=${category.nominees.length} in ${Date.now() - start}ms`,
    );
  } catch (err) {
    console.error(`[FIREBASE] Failed to set event ${eventId} page="${page}" category=${category.id}:`, err);
    throw err;
  }
}

export function setYlfCategory(
  eventId: number,
  category: {
    id: number;
    name: string;
    nominees: YlfNominee[];
    showNominee?: boolean;
  },
): Promise<void> {
  return writeYlfCategory(eventId, "category", category);
}

export function setYlfGraph(
  eventId: number,
  category: {
    id: number;
    name: string;
    nominees: YlfNominee[];
    showNominee?: boolean;
  },
): Promise<void> {
  return writeYlfCategory(eventId, "graph", category);
}

export async function setYlfTimer(
  eventId: number,
  timer: {
    categoryId: number;
    running: boolean;
    durationSec: number;
    endsAtMs: number;
  },
): Promise<void> {
  const start = Date.now();
  try {
    const database = getRtdb();
    await set(ref(database, ylfEventPath(eventId, "timer")), timer);
    console.log(
      `[FIREBASE] event ${eventId} timer set -> categoryId=${timer.categoryId}, running=${timer.running} in ${Date.now() - start}ms`,
    );
  } catch (err) {
    console.error(`[FIREBASE] Failed to set timer for event ${eventId}:`, err);
    throw err;
  }
}

export async function setYlfWinners(eventId: number, winners: YlfWinnerEntry[]): Promise<void> {
  const start = Date.now();
  try {
    const database = getRtdb();
    const winnersByKey = winners.reduce<Record<string, YlfWinnerEntry>>((acc, w) => {
      acc[String(w.categoryId)] = w;
      return acc;
    }, {});
    await set(ref(database, ylfEventPath(eventId)), {
      page: "winner",
      winners: winnersByKey,
    });
    console.log(
      `[FIREBASE] event ${eventId} -> page="winner", winners=${winners.length} in ${Date.now() - start}ms`,
    );
  } catch (err) {
    console.error(`[FIREBASE] Failed to set winners for event ${eventId}:`, err);
    throw err;
  }
}
