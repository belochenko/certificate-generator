import { createPool } from "@vercel/postgres";

const pool = createPool({
  connectionString:
    "postgres://default:04rTDaBkMpQq@ep-weathered-tree-a25dtwat-pooler.eu-central-1.aws.neon.tech:5432/verceldb?sslmode=require",
});

export async function queryDB(query: string, params: any[]) {
  const client = await pool.connect();
  try {
    return await client.query(query, params);
  } finally {
    client.release();
  }
}
