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
    <div className="flex items-center justify-center col-start-1 col-span-1 row-start-2 row-span-1">
      <button className="bg-primary" onClick={handleSignIn}>Sign In</button>
    </div>
  );
}
