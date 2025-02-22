'use client';
import Sidebar from "@/components/Sidebar";
import isAuth from "@/utils/isAuth";

import useAuth from "./hooks/useAuth";
import TopBar from "@/components/Topbar";


function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLogged } = useAuth();
  if (!isLogged) return <div>Loading...</div>;
  
  return (
   <div className="grid grid-cols-[1fr_300px] grid-rows-[70px_1fr] h-screen"> 
      <TopBar />
      <Sidebar />
      <main>{children}</main>
    </div>
    )  
}

export default isAuth(DashboardLayout);