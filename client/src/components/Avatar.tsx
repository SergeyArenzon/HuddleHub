import {
    Avatar as AvatarComponent,
    AvatarFallback,
  } from "@/components/ui/avatar"
import { UserRound } from "lucide-react";
import Image from "next/image";

  
  type AvatarProps = {
    src: string
    fallback: string
   }


  export function Avatar( {src, fallback} : AvatarProps) {
    return (
      <AvatarComponent>
        {src ? <Image src={src} width={50} height={50}  alt="@shadcn" /> : <UserRound />}
        <AvatarFallback>{fallback}</AvatarFallback>
      </AvatarComponent>
    )
  }