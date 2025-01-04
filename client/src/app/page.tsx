"use client"
import { signIn } from "next-auth/react"
import { useSession } from "next-auth/react";

export default function Home() {

  const { data } = useSession();

  console.log({ data });
  
  return (
    <button onClick={() => signIn()}>Sign In</button>
  );
}
