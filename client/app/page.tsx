'use client'
import Image from "next/image";
import { useSession } from "next-auth/react";
import { GoogleSignInButton } from "./components/authButtons";



export default function Home() {
  const {data: session} = useSession()
  if(session && session.user) {
    return <div>authed</div>
  }

console.log(process.env.NEXT_PUBLIC_GOOGLE_ID);
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <GoogleSignInButton/>
    </main>
  );
}
