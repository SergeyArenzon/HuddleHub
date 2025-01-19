'use client'
import Topbar from "@/components/TopBar";
import { Sidebar } from "@/components/SideBar";
import isAuth from "./isAuth";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import useUserStore from "@/store/useUser";
import { UserSchema } from "@/schema";
import { Loading } from "@/components/Loading";


function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {  data, status } = useSession();
  const { setUser, clearUser, isLogged } = useUserStore();

  useEffect(() => {
    if (status === "authenticated") {
      const user = UserSchema.parse(data?.user)   
      setUser(user);
    } else if (status === "unauthenticated") {
      clearUser();
    }
  }, [status])

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