import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
export const { signIn, signOut, auth } = NextAuth(req => {
 if (req) {
  console.log(req) // do something with the request
 }
 return { providers: [ Google ] }
})