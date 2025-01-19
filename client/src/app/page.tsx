"use client";

import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { usePopupStore } from "@/store";
import { Loading } from "@/components/Loading";
import { redirect } from "next/navigation";

export default function Home() {
  const {  data, status } = useSession();
  const { popups, updatePopup} = usePopupStore();
  

  const handleSignIn = () => {
    signIn(); // Specify the provider if needed
  };
    
    if (status === "loading") return <Loading />;
    else if (status === "unauthenticated") redirect('signin');
    else redirect('dashboard');
}
