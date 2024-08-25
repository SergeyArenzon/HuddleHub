'use client'

import { signOut, useSession } from "next-auth/react";
import { EmailSignInButton, GoogleSignInButton } from "./components/authButtons";
import Card from "./components/Card";
import { useRouter } from "next/navigation";

export default function Home() {
	const { data: session } = useSession()
	const router = useRouter()

	if (session && session.user) {
		console.log(session)
		// router.push('/home')
	}


	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24 bg-blue-300">
			<Card>
				<div className="flex flex-col justify-between">
					<div className="w-[500px] h-[600px] flex flex-col gap-6">
						<div className="text-[20px] text-center font-semibold">HuddleHub</div>
						<div className="flex flex-col gap-4">
							<GoogleSignInButton />
							<EmailSignInButton />
						</div>
						{(session && session.user) && <div onClick={() => signOut()} className="text-[20px] text-center font-semibold cursor-pointer">Sign Out</div>}
					</div>
					<div className="text-[12px] text-center">Powered by HuddleHub</div>
				</div>
			</Card>
		</main>
	);
}
