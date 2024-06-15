'use client'
import { useSession } from "next-auth/react";
import { GoogleSignInButton } from "./components/authButtons";



export default function Home() {
  const {data: session} = useSession()
  if(session && session.user) {
    console.log(session.user);
    
    return <div>authed...</div>
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <GoogleSignInButton/>
    </main>
  );
}
