import mysql from "mysql2/promise";

function requiredEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

let pool: mysql.Pool | null = null;

export function getDb() {
  if (pool) return pool;

  pool = mysql.createPool({
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT || 3306),
    user: requiredEnv("DB_USER"),
    password: process.env.DB_PASSWORD ?? "",
    database: requiredEnv("DB_NAME"),
    waitForConnections: true,
    connectionLimit: Number(process.env.DB_POOL_LIMIT || 10),
    namedPlaceholders: true,
  });

  return pool;
}

