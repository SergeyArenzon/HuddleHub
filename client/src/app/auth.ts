import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { setCookie } from "nookies";
import cookie from 'cookie';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // signIn: async ({ account, user, profile,req,res }) => {
      
    //   const response = await fetch(`http://huddlehub.io/api/auth`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },



    //     body: JSON.stringify({
    //       jwt: account?.id_token, // Send the Google JWT to verify
    //       provider: account?.provider
    //     }),
    //   });

    //   if (response.ok) {
    //     const data = await response.json();

    //   } else {
    //     return false; // If the request fails, sign-in is rejected
    //   }
      
    //   return true;
      
    // },
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token; // Save the Google access token
        token.tokenId = account.id_token; // Save the Google access token
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken; // Pass the token to the session
      session.tokenId = token.tokenId; // Pass the token to the session
      return session;
    },
  }
})