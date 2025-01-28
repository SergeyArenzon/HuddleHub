
'use client'
import ROUTES from "@/app/routes";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import bg from '@/../public/images/guilherme-stecanella-_dH-oQF9w-Y-unsplash.jpg'


export default function SigninPage() {
  const { status } = useSession();
  
  if (status === "authenticated") return redirect(ROUTES.DASHBOARD);
  else if (status === "loading") return <div>Loading...</div>;
  
  return (
    <div className="bg-white w-3/5 h-3/4 flex shadow-md container text-primary">
      <div className="relative w-1/2 container flex justify-center items-center bg-primary overflow-hidden">
        <Image src={bg} className="opacity-60 absolute z-0" layout="fill" objectFit="cover" alt="traveller image"/>
      </div>

      <div className="w-1/2 container flex flex-col gap-4  items-center ">
        <h2 className="font-extrabold">Discover More, Travel Better</h2>
        <div className="italic text-black">
          Your simplest way to connect with expert local guides for unforgettable experiences.
          Sign in and start your journey today
        </div>
        <div className="z-10 bg-red-600" onClick={() => signIn("google")}>Sign in with Google</div>
      </div>
    </div>
    )
  }
