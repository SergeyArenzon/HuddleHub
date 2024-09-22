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
				if (!account || !account.access_token) return false;
				try {
					let res = await axios.post('http://auth:8084', {token: account.access_token});
					console.log("[User token]:", res.data );
					const token = res.data;
					return true
				
				} catch (error) {
					console.error({error});
					return false;
				}
			},
			async jwt({ token, user, account }) {
				console.log({token, user, account});
				
				// If user just signed in, add their custom token to the JWT
				if (account && user) token.customToken = account.access_token; // Or your custom token from the response
				
				return token;
		},
		async session({ session, token }) {
				// Add custom token to the session
				session.token = token.customToken;
				return session;
		},
		
		},

}