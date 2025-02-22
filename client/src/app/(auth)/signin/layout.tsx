'use client';
import Topbar from "@/components/Topbar";
import { Sidebar } from "@/components/Sidebar";
import { Loading } from "@/components/Loading";


function SigninLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  
  
  return (
   <div className="h-full w-full flex justify-center items-center"> 
      {children}
    </div>
    )  
}

export default SigninLayout;