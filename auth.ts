import NextAuth from "next-auth";
import "next-auth/jwt";

import GoogleProvider from "next-auth/providers/google";
import { createStorage } from "unstorage";
import memoryDriver from "unstorage/drivers/memory";
import vercelKVDriver from "unstorage/drivers/vercel-kv";
import { UnstorageAdapter } from "@auth/unstorage-adapter";

import type { NextAuthConfig } from "next-auth";

// const storage = createStorage({
//   driver: process.env.VERCEL
//     ? vercelKVDriver({
//         url: process.env.AUTH_KV_REST_API_URL as string,
//         token: process.env.AUTH_KV_REST_API_TOKEN,
//         env: false,
//       })
//     : memoryDriver(),
// });

const config = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
  basePath: "/",
  callbacks: {
    jwt({ token, trigger, session }) {
      if (trigger === "update") token.name = session.user.name;
      return token;
    },
    async session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  experimental: {
    enableWebAuthn: true,
  },
  debug: process.env.NODE_ENV !== "production" ? true : false,
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}
