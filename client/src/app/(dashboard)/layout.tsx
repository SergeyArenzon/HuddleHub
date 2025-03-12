'use client';
import {Sidebar} from "@/components/Sidebar";
import isAuth from "@/utils/isAuth";


function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <div className="grid grid-cols-[1fr_300px] grid-rows-[70px_1fr] h-screen"> 
      <Sidebar />
      <main>{children}</main>
    </div>
    )  
}

export default isAuth(DashboardLayout);