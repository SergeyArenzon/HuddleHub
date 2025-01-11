"use client";

import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
  const {  data, status } = useSession();



  const handleSignIn = () => {
    signIn(); // Specify the provider if needed
  };



  console.log({data, status});
  
  return (
    <div>
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
}
