"use client";

import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { usePopupStore } from "@/store";
import Loader from "@/components/ui/loader";
import { Loading } from "@/components/Loading";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const {  data, status } = useSession();
  const { popups, updatePopup} = usePopupStore();
  

  const handleSignIn = () => {
    signIn(); // Specify the provider if needed
  };



  if (status === "loading") return <Loading />;
  
  return (
    <div className="flex items-center justify-center col-start-1 col-span-1 row-start-2 row-span-1">
      <button className="bg-primary" onClick={() => updatePopup("X", true)}>zx</button>
    </div>
  );
}
