import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

export const authConfig: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
	jwt: {
		secret: process.env.JWT_SECRET, // Use the same secret for JWT
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
		async signIn({ user, account }) {
			const {JWT_SECRET} = process.env
			console.log({JWT_SECRET});
			
			// Persist the access token to the token object on sign in
			if (account) {
				account.accessToken = account.access_token;
		
				// Send the access token to the Fastify backend to check/create the user
				try {
				const userInfoResponse = await axios.post('http://auth:8084', {
					token: account.access_token,
				});
				if (!userInfoResponse?.data?.user) return false;
				// Store user information in the token
				user.user = userInfoResponse.data.user;
				user.accessToken = userInfoResponse.data.token;
				return true

				} catch (error) {
				console.error("Error checking/creating user:", error);
				}
			}
			return true;
		},
		async jwt({ token, user }) {
		// Add user and access token to the token
		console.log({user});
		
		if (user) {
			token.user = user.user // Store user information
			token.accessToken = user.accessToken; // Store access token if available
		}
		return token;
	},
	async session({ session, token }) {
		// Add user data and access token to the session
		// console.log({token});
		session.user = token.user; // User information
		session.accessToken = token.accessToken; // Include access token
		return session;
	},
	
	}
}