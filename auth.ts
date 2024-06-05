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
callbacks: {
  async jwt({user, token}) {
      if (user) {
          token.user = user;
      }
      return token;
  },
  async session({session, token}: any) {
      session.user = token.user;
      return session;
  },
},
debug: process.env.NODE_ENV === "development",
});

export { handlers, signIn, signOut, auth };
