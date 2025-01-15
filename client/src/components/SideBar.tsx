'use client';

import { useSession } from "next-auth/react";
import Image from "next/image";
import Loader from "@/components/ui/loader";

const SideBar = () => {
  const { data: sessionData } = useSession();

  console.log({sessionDat: sessionData?.user?.image});
  
  return (
    <nav className="bg-accent w-56 h-full row-start-1 row-span-2 col-span-1 col-start-2 rounded-bl-3xl">
        <Image src={sessionData?.user?.image} width={10} height={10} alt="profile picture"/>
        <Loader/>
    </nav>
  )
}

export default SideBar