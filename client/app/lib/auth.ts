import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";



export const authConfig: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        GoogleProvider({
            // clientId: process.env.NEXT_PUBLIC_GOOGLE_ID as string,
            clientId: "336410896237-gn5efrus6pc08illenocnl6asmfan3pv.apps.googleusercontent.com",
            clientSecret: "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",
            // clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET as string,
        })
    ],
}