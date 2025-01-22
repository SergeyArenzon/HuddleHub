
'use client'
import ROUTES from "@/app/routes";
import { Loading } from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import bg from '@/../public/images/guilherme-stecanella-_dH-oQF9w-Y-unsplash.jpg'


export default function SigninPage() {
  const { status } = useSession();
  
  if (status === "authenticated") return redirect(ROUTES.DASHBOARD);
  else if (status === "loading") return <Loading />;
  
  return (
    <div className="bg-white w-3/5 h-3/4 flex shadow-md">
      <div className="relative w-1/2 p-container flex justify-center items-center bg-primary m-4 overflow-hidden">
        <Button className="z-10" onClick={() => signIn("google")}>Sign in with Google</Button>
        <Image src={bg} className="opacity-60 absolute z-0" layout="fill" objectFit="cover" alt="traveller image"/>
      </div>
      
      <p className="w-1/2 p-container">
        <h2 className="font-bold">Discover More, Travel Better</h2>
        <div className="italic">
          Your simplest way to connect with expert local guides for unforgettable experiences.
          Sign in and start your journey today
        </div>
      </p>
    </div>
    )
  }
