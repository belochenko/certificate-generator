import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import { createStorage } from "unstorage"
import memoryDriver from "unstorage/drivers/memory"
import vercelKVDriver from "unstorage/drivers/vercel-kv"
import PostgresAdapter from "@auth/pg-adapter"
import { Pool } from "pg"
import { UnstorageAdapter } from "@auth/unstorage-adapter"

const pool = new Pool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

const storage = createStorage({
  driver: process.env.VERCEL
    ? vercelKVDriver({
        url: process.env.AUTH_KV_REST_API_URL,
        token: process.env.AUTH_KV_REST_API_TOKEN,
        env: false,
      })
    : memoryDriver(),
})

const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: UnstorageAdapter(storage), // PostgresAdapter(pool),
  providers: [Google],
});

export { handlers, signIn, signOut, auth };
