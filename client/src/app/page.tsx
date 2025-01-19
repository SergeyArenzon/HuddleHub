'use client';
import { useSession } from "next-auth/react";
import { Loading } from "@/components/Loading";
import { redirect } from "next/navigation";

export default function Home() {
  // const { status } = useSession();
    
  // if (status === "loading") return <Loading />;
  // else if (status === "unauthenticated") redirect('signin');
  //  redirect('dashboard');
}
