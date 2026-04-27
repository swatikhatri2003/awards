"use client";

import React from "react";
import styles from "./screen.module.css";
import { subscribeYlf, type YlfNominee, type YlfState } from "@/lib/firebase";

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

function normalizeNominees(
  nominees: NonNullable<YlfState["category"]>["nominees"],
): YlfNominee[] {
  if (!nominees) return [];
  if (Array.isArray(nominees)) return nominees.filter(Boolean);
  return Object.values(nominees).filter(Boolean);
}

function HomeStage() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#000",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src="/ylf-member-awards-banner.png"
        alt=""
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          display: "block",
        }}
      />
    </div>
  );
}

function CategoryStage({
  apiBase,
  category,
}: {
  apiBase: string;
  category: NonNullable<YlfState["category"]>;
}) {
  const nominees = normalizeNominees(category.nominees);

  return (
    <section aria-label="Category">
      <div className={styles.titleWrap}>
        {/* <span className={styles.kicker}>YLF Member Awards</span> */}
        <h1 className={styles.title}>{category.name}</h1>
        <hr className={styles.titleRule} />
        {/* <span className={styles.meta}>
          {nominees.length} {nominees.length === 1 ? "Nominee" : "Nominees"}
        </span> */}
      </div>

      {nominees.length === 0 ? (
        <div className={styles.empty}>No nominees in this category.</div>
      ) : (
        <div className={styles.grid}>
          {nominees.map((n) => {
            const src = nomineePhotoUrl(apiBase, n.photo) || FALLBACK_PHOTO;
            return (
              <div key={n.id} className={styles.card}>
                <div className={styles.photoWrap}>
                  <img
                    className={styles.photo}
                    src={src}
                    alt={n.name}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = ERROR_PHOTO;
                    }}
                  />
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.name}>{n.name}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

function GraphStage({
  apiBase,
  category,
}: {
  apiBase: string;
  category: NonNullable<YlfState["category"]>;
}) {
  const nominees = normalizeNominees(category.nominees);
  const sorted = [...nominees].sort((a, b) => (b.votes ?? 0) - (a.votes ?? 0));
  const totalVotes = sorted.reduce((sum, n) => sum + (Number(n.votes) || 0), 0);
  const maxVotes = sorted.reduce((m, n) => Math.max(m, Number(n.votes) || 0), 0);

  return (
    <section aria-label="Vote graph">
      <div className={styles.titleWrap}>
        <h1 className={styles.title}>{category.name}</h1>
        <hr className={styles.titleRule} />
      </div>

      {sorted.length === 0 ? (
        <div className={styles.empty}>No nominees in this category.</div>
      ) : (
        <div className={styles.graphWrap}>
          <div className={styles.graphTotal}>
            Total Votes: {totalVotes}
          </div>
          {sorted.map((n, idx) => {
            const votes = Number(n.votes) || 0;
            const pct = maxVotes > 0 ? (votes / maxVotes) * 100 : 0;
            const src = nomineePhotoUrl(apiBase, n.photo) || FALLBACK_PHOTO;
            const isLeader = idx === 0 && votes > 0;
            return (
              <div
                key={n.id}
                className={`${styles.bar} ${isLeader ? styles.barLeader : ""}`}
              >
                <div className={styles.barRank}>#{idx + 1}</div>
                <div className={styles.barWho}>
                  <div className={styles.barAvatar}>
                    <img
                      src={src}
                      alt={n.name}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = ERROR_PHOTO;
                      }}
                    />
                  </div>
                  <div className={styles.barName} title={n.name}>
                    {n.name}
                  </div>
                </div>
                <div
                  className={styles.barTrack}
                  role="progressbar"
                  aria-valuenow={votes}
                  aria-valuemin={0}
                  aria-valuemax={maxVotes || 1}
                  aria-label={`${n.name} votes`}
                >
                  <div
                    className={styles.barFill}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div>
                  <div className={styles.barVotes}>{votes}</div>
                  <span className={styles.barVotesLabel}>
                    {votes === 1 ? "Vote" : "Votes"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

function ScreenView({ apiBase }: { apiBase: string }) {
  const [state, setState] = React.useState<YlfState | null>(null);
  const [connected, setConnected] = React.useState(false);

  React.useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  React.useEffect(() => {
    console.log("[SCREEN] subscribing to ylf...");
    const unsubscribe = subscribeYlf((next) => {
      setState(next);
      setConnected(true);
    });
    return () => {
      console.log("[SCREEN] unsubscribing from ylf");
      unsubscribe();
    };
  }, []);

  const page = state?.page ?? "home";

  return (
    <div className={styles.root}>
      <div className={styles.bg} aria-hidden="true" />
      <div className={styles.glow1} aria-hidden="true" />
      <div className={styles.glow2} aria-hidden="true" />

      <div className={styles.stage}>
        <div className={styles.scroll}>
          {!connected ? (
            <div className={styles.connecting}>Connecting to live screen feed...</div>
          ) : page === "category" && state?.category ? (
            <CategoryStage apiBase={apiBase} category={state.category} />
          ) : page === "graph" && state?.category ? (
            <GraphStage apiBase={apiBase} category={state.category} />
          ) : (
            <HomeStage />
          )}
        </div>
      </div>
    </div>
  );
}

export default function ScreenPage() {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";
  return <ScreenView apiBase={apiBase} />;
}
