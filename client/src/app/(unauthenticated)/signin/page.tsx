
'use client'
import ROUTES from "@/app/routes";
import { Loading } from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import bg from '@/../public/images/guilherme-stecanella-_dH-oQF9w-Y-unsplash.jpg'


export default function Dashboard() {
  const { status } = useSession();
  
  if (status === "authenticated") return redirect(ROUTES.DASHBOARD);
  else if (status === "loading") return <Loading />;
  
  return (
    <div className="bg-white w-3/5 h-3/4 flex">
      <div className="relative w-1/2 p-container flex justify-center items-center bg-primary m-2 overflow-hidden">
        <Button onClick={() => signIn("google")}>Sign in with Google</Button>
        <Image src={bg} className="opacity-30 absolute"/>
      </div>
      <p className="w-1/2 p-container">
        <h2>Discover More, Travel Better</h2>
        Your simplest way to connect with expert local guides for unforgettable experiences.
        Sign in and start your journey today
      </p>
      </div>
    )
}