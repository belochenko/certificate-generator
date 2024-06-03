import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import vercelPostgresAdapter from "@/lib/adapter";

const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET as string,
  adapter: vercelPostgresAdapter(),
  providers: [Google({
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET,
    authorization: {
      params: {
        prompt: "consent",
        access_type: "offline",
        response_type: "code",
      },
    },
  })
],
});

export { handlers, signIn, signOut, auth };
