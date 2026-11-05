// Crea la tabla de citas en la base de datos indicada en DATABASE_URL.
// Uso: npm run db:init   (lee .env.local automáticamente)
import { readFileSync } from "node:fs";
import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
if (!url) {
  console.error("Falta DATABASE_URL. Agrégala a .env.local (ver .env.example).");
  process.exit(1);
}

const sql = neon(url);
const schema = readFileSync(new URL("../db/schema.sql", import.meta.url), "utf8");
const sentencias = schema
  .split(";")
  .map((s) => s.replace(/--.*$/gm, "").trim())
  .filter(Boolean);

for (const s of sentencias) await sql.query(s);
console.log(`Listo: ${sentencias.length} sentencias ejecutadas.`);
