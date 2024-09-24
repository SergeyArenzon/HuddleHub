'use client'

import { signOut, useSession } from "next-auth/react";
import { GoogleSignInButton } from "./components/authButtons";
import Card from "./components/Card";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";


export default function Home() {
	const { data: session,status } = useSession()
	const router = useRouter()
	
	


	useEffect(() => {
		const fetchz = async () => {
		if (status !== "authenticated") return
		console.log({session});
		
		  const res = await axios.get(`http://localhost:8080/api/auth/protected`, {
			headers: {
				Authorization: `Bearer ${session.accessToken}`, // Include the access token
			  },
			  withCredentials: true
		  })
		}

		fetchz()
	  }, [status])
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24 bg-blue-300">
			<Card>
				<div className="flex flex-col justify-between">
					<div className="w-[500px] h-[600px] flex flex-col gap-6">
						<div className="text-[20px] text-center font-semibold">HuddleHub</div>
						<div className="flex flex-col gap-4">
							<GoogleSignInButton />
						</div>
						{(session && session.user) && <div onClick={() => signOut()} className="text-[20px] text-center font-semibold cursor-pointer">Sign Out</div>}
					</div>

					<div className="text-[12px] text-center">Powered by HuddleHub</div>
				</div>
			</Card>
		</main>
	);
}
