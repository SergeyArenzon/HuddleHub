'use client';
import Sidebar from "@/components/Sidebar";
import isAuth from "./isAuth";

import useAuth from "./hooks/useAuth";


function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLogged } = useAuth();
  if (!isLogged) return <div>Loading...</div>;
  
  return (
   <div className="grid grid-cols-[1fr_300px] grid-rows-[70px_1fr]"> 
      <Sidebar />
      <main>{children}</main>
    </div>
    )  
}

export default isAuth(DashboardLayout);