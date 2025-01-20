'use client'
import ROUTES from "@/app/routes";
import { Loading } from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Dashboard() {
  const { status } = useSession();
  
  if (status === "authenticated") return redirect(ROUTES.DASHBOARD);
  else if (status === "loading") return <Loading />;
  
  return (
    <div>
      <div>Become a Guide
      <Button onClick={() => signIn( )}>Sign in as Guide</Button>


      </div>
      <div>Become a Traveller
        <Button onClick={() => signIn()}>Sign in as Traveller</Button>
      </div>

      
    </div>
  );
}
