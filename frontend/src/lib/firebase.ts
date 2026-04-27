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

export type YlfPage = "home" | "category" | "winner" | "graph" | "qr";

export async function setYlfPage(page: YlfPage): Promise<void> {
  const start = Date.now();
  try {
    const database = getRtdb();
    await set(ref(database, "ylf/page"), page);
    console.log(
      `[FIREBASE] ylf/page set to "${page}" in ${Date.now() - start}ms`,
    );
  } catch (err) {
    console.error(`[FIREBASE] Failed to set ylf/page="${page}":`, err);
    throw err;
  }
}

export type YlfNominee = {
  id: number;
  name: string;
  photo: string;
  votes: number;
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
    nominees?: Record<string, YlfNominee> | YlfNominee[];
  };
};

export function subscribeYlf(callback: (state: YlfState | null) => void): () => void {
  const database = getRtdb();
  const r = ref(database, "ylf");
  const unsubscribe = onValue(
    r,
    (snap) => {
      const value = snap.val() as YlfState | null;
      console.log("[FIREBASE] ylf snapshot ->", value);
      callback(value);
    },
    (err) => {
      console.error("[FIREBASE] subscribeYlf error:", err);
      callback(null);
    },
  );
  return unsubscribe;
}

async function writeYlfCategory(
  page: Extract<YlfPage, "category" | "graph">,
  category: { id: number; name: string; nominees: YlfNominee[] },
): Promise<void> {
  const start = Date.now();
  try {
    const database = getRtdb();
    const nomineesByKey = category.nominees.reduce<Record<string, YlfNominee>>((acc, n) => {
      acc[String(n.id)] = n;
      return acc;
    }, {});
    await set(ref(database, "ylf"), {
      page,
      category: {
        id: category.id,
        name: category.name,
        nominees: nomineesByKey,
      },
    });
    console.log(
      `[FIREBASE] ylf set -> page="${page}", category=${category.id} "${category.name}", nominees=${category.nominees.length} in ${Date.now() - start}ms`,
    );
  } catch (err) {
    console.error(`[FIREBASE] Failed to set ylf page="${page}" category=${category.id}:`, err);
    throw err;
  }
}

export function setYlfCategory(category: {
  id: number;
  name: string;
  nominees: YlfNominee[];
}): Promise<void> {
  return writeYlfCategory("category", category);
}

export function setYlfGraph(category: {
  id: number;
  name: string;
  nominees: YlfNominee[];
}): Promise<void> {
  return writeYlfCategory("graph", category);
}

export async function setYlfTimer(timer: {
  categoryId: number;
  running: boolean;
  durationSec: number;
  endsAtMs: number;
}): Promise<void> {
  const start = Date.now();
  try {
    const database = getRtdb();
    await set(ref(database, "ylf/timer"), timer);
    console.log(
      `[FIREBASE] ylf/timer set -> categoryId=${timer.categoryId}, running=${timer.running}, durationSec=${timer.durationSec} in ${Date.now() - start}ms`,
    );
  } catch (err) {
    console.error("[FIREBASE] Failed to set ylf/timer:", err);
    throw err;
  }
}
