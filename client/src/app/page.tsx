"use client";

import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Home() {
  const {  data, status } = useSession();



  const handleSignIn = () => {
    signIn(); // Specify the provider if needed
  };



  console.log({data, status});
  
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black">
      <button className="bg-red-500" onClick={handleSignIn}>Sign In</button>
    </div>
  );
}
