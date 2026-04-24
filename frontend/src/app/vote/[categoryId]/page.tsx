"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Shell } from "../../_components/Shell";

type Category = {
  category_id: number;
  name: string;
  winner_nominee_id: number | null;
};

type Nominee = {
  nominee_id: number;
  photo: string;
  name: string;
  category_id: number;
  votes: number;
};

const FALLBACK_PHOTO =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Crect width='100%25' height='100%25' fill='%23111424'/%3E%3Ctext x='50%25' y='50%25' fill='%23aab3c5' font-size='14' text-anchor='middle' dominant-baseline='middle'%3ENo Photo%3C/text%3E%3C/svg%3E";
const ERROR_PHOTO =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Crect width='100%25' height='100%25' fill='%23111424'/%3E%3Ctext x='50%25' y='50%25' fill='%23aab3c5' font-size='14' text-anchor='middle' dominant-baseline='middle'%3EImage error%3C/text%3E%3C/svg%3E";

function nomineePhotoUrl(apiBase: string, photo?: string) {
  const p = (photo || "").trim();
  if (!p) return "";
  if (/^https?:\/\//i.test(p) || p.startsWith("data:")) return p;
  const base = apiBase.replace(/\/+$/, "");
  const normalized = p.replace(/\\/g, "/");
  const last = normalized.split("/").filter(Boolean).pop() || "";
  const safeFile = encodeURIComponent(last);
  return `${base}/uploads/nominee/${safeFile}`;
}

function friendlyError(code: string) {
  switch (code) {
    case "INVALID_CATEGORY_ID":
      return "Invalid category.";
    case "INVALID_NOMINEE_ID":
      return "Invalid nominee.";
    case "NOMINEE_NOT_FOUND":
      return "Nominee not found.";
    default:
      return code || "REQUEST_FAILED";
  }
}

export default function VoteCategoryPage() {
  const router = useRouter();
  const params = useParams<{ categoryId: string }>();
  const categoryId = Number(params?.categoryId);

  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

  const [category, setCategory] = React.useState<Category | null>(null);
  const [nominees, setNominees] = React.useState<Nominee[]>([]);
  const [selectedNomineeId, setSelectedNomineeId] = React.useState<number | null>(null);

  const [loading, setLoading] = React.useState(true);
  const [voting, setVoting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    if (!Number.isFinite(categoryId) || categoryId <= 0) {
      setLoading(false);
      setError("INVALID_CATEGORY_ID");
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const [catRes, nomRes] = await Promise.all([
        fetch(`${apiBase}/categories`).then(async (r) => {
          const data = await r.json().catch(() => null);
          if (!r.ok) throw new Error(data?.error || "CATEGORIES_FAILED");
          return data as { ok: boolean; categories: Category[] };
        }),
        fetch(`${apiBase}/categories/${categoryId}/nominees`).then(async (r) => {
          const data = await r.json().catch(() => null);
          if (!r.ok) throw new Error(data?.error || "NOMINEES_FAILED");
          return data as { ok: boolean; nominees: Nominee[] };
        }),
      ]);

      const found = (catRes.categories || []).find((c) => Number(c.category_id) === categoryId) || null;
      setCategory(found);
      setNominees(Array.isArray(nomRes.nominees) ? nomRes.nominees : []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "LOAD_FAILED");
    } finally {
      setLoading(false);
    }
  }, [apiBase, categoryId]);

  React.useEffect(() => {
    void load();
  }, [load]);

  async function submitVote() {
    if (!selectedNomineeId) return;
    setVoting(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch(`${apiBase}/nominees/${selectedNomineeId}/vote`, { method: "POST" });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(friendlyError(data?.error || "VOTE_FAILED"));

      await load();
      setSuccess("Vote submitted successfully.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "VOTE_FAILED");
    } finally {
      setVoting(false);
    }
  }

  const title = category ? `Vote: ${category.name}` : "Vote";

  return (
    <Shell
      title={title}
      subtitle="Select one nominee and submit your vote. After voting, the displayed vote count updates immediately."
      wide
      right={
        <button className="linkBtn" type="button" onClick={() => router.push("/actions")}>
          Back to dashboard
        </button>
      }
    >
      {loading ? <div className="hint">Loading category and nominees...</div> : null}
      {error ? <div className="error">Error: {friendlyError(error)}</div> : null}
      {success ? <div className="hint">{success}</div> : null}

      {!loading && !error ? (
        <section className="panel" aria-label="Nominee voting">
          <div className="panelHeader">
            <div className="panelTitle">Nominees</div>
            <div className="panelMeta">{nominees.length} nominees</div>
          </div>

          {nominees.length === 0 ? <div className="hint">No nominees found for this category.</div> : null}

          <div className="nomineeGrid">
            {nominees.map((n) => {
              const src = nomineePhotoUrl(apiBase, n.photo) || FALLBACK_PHOTO;
              const selected = selectedNomineeId === n.nominee_id;
              return (
                <label
                  key={n.nominee_id}
                  className={
                    selected
                      ? "listItem listItemActive selectableCard selectableCardSelected"
                      : "listItem selectableCard"
                  }
                  style={{ cursor: "pointer" }}
                >
                  <div className="row" style={{ justifyContent: "space-between" }}>
                    <div className="listTitle" style={{ whiteSpace: "normal", overflow: "visible" }}>
                      <input
                        type="radio"
                        name="nominee"
                        checked={selected}
                        onChange={() => setSelectedNomineeId(n.nominee_id)}
                        style={{ marginRight: 10 }}
                      />
                      {n.name}
                    </div>
                    <div className="badge" title="Votes">
                      {Number(n.votes ?? 0)} votes
                    </div>
                  </div>

                  <div style={{ marginTop: 10 }} className="nomineePhotoWrap">
                    <img
                      className="nomineePhoto"
                      src={src}
                      alt={n.name}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = ERROR_PHOTO;
                      }}
                    />
                  </div>
                </label>
              );
            })}
          </div>

          <div className="row" style={{ marginTop: 12 }}>
            <button className="btnSecondary" type="button" onClick={() => void load()} disabled={voting}>
              Refresh
            </button>
            <button className="btn" type="button" disabled={voting || !selectedNomineeId} onClick={submitVote}>
              {voting ? "Submitting vote..." : "Vote"}
            </button>
          </div>
        </section>
      ) : null}
    </Shell>
  );
}

