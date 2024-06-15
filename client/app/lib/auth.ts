import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";



export const authConfig: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        })
    ],
    pages: {
        signIn: '/',
        signOut: '/',
        error: '/',
    },
    callbacks: {
        async signIn({ user, account}: any) {
          if (!account || !account.access_token)
            return false
  
        //   const { data }: { data: { access_token: string } } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}auth/token`, { access_token: account.access_token })
        //   user.token = data.access_token

        console.log("zain--------------");

      
            try {
                const res = await axios.post("http://localhost:8080/api/user/token", {
                
                    access_token: account.access_token
                })
                
                console.log({res});
            } catch (error) {
                console.log({error});
                
            }


            
          return true
        },
        // async jwt({ token, user }: any) {
        //   if (user?.token)
        //     token.token = user.token
        //   return token
        // },
        // async session({ session, token }: any) {
        //   session.user.token = token.token
        //   return session
        // }
      },

}