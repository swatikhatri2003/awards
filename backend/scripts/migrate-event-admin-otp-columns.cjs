/**
 * Adds otp + otp_expires_at to event_admin if missing (fixes admin sign-in 500).
 * Usage: node scripts/migrate-event-admin-otp-columns.cjs
 */
const path = require("node:path");
const mysql = require("mysql2/promise");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

function requiredEnv(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

async function main() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT || 3306),
    user: requiredEnv("DB_USER"),
    password: process.env.DB_PASSWORD ?? "",
    database: requiredEnv("DB_NAME"),
    namedPlaceholders: true,
  });

  const alters = [
    "ALTER TABLE `event_admin` ADD COLUMN `otp` varchar(6) DEFAULT NULL",
    "ALTER TABLE `event_admin` ADD COLUMN `otp_expires_at` datetime DEFAULT NULL",
  ];

  for (const sql of alters) {
    try {
      await pool.query(sql);
      console.log("Applied:", sql.slice(0, 60) + "...");
    } catch (e) {
      if (e.code === "ER_DUP_FIELDNAME") {
        console.log("Skipped (already exists):", sql.slice(0, 50) + "...");
      } else {
        throw e;
      }
    }
  }

  await pool.end();
  console.log("event_admin OTP columns OK.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
