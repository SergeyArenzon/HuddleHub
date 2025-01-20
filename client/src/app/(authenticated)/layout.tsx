'use client'
import Topbar from "@/components/Topbar";
import { Sidebar } from "@/components/SideBar";
import isAuth from "./isAuth";
import { Loading } from "@/components/Loading";
import useAuth from "./hooks/useAuth";


function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLogged } = useAuth();
  if (!isLogged) return <Loading />;
  
  return (
   <div className="grid grid-cols-[1fr_300px] grid-rows-[70px_1fr]"> 
      <Topbar />
      <Sidebar />
      <main>{children}</main>
    </div>
    )  
}

export default isAuth(DashboardLayout)