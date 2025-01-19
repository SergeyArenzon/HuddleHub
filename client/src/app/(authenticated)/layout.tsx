'use client'
import Topbar from "@/components/Topbar";
import { Sidebar } from "@/components/Sidebar";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // const { data, status } = useSession();
  
  // if (status !== "authenticated") redirect('/')
  return (
    <div className="grid grid-cols-[1fr_300px] grid-rows-[70px_1fr]"> 
      <Topbar />
      <Sidebar />
      <main>{children}</main>
    </div>
    )  
}