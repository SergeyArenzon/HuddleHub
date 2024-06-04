import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";



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
}