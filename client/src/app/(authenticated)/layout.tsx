'use client'
import Topbar from "@/components/TopBar";
import { Sidebar } from "@/components/SideBar";
import isAuth from "./isAuth";


function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <div className="grid grid-cols-[1fr_300px] grid-rows-[70px_1fr]"> 
      <Topbar />
      <Sidebar />
      <main>{children}</main>
    </div>
    )  
}

export default isAuth(DashboardLayout)