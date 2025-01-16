import {
    Avatar as AvatarComponent,
    AvatarFallback,
  } from "@/components/ui/avatar"
import Image from "next/image";
  
  type AvatarProps = {
    src: string
    fallback: string
   }


  export function Avatar( {src, fallback} : AvatarProps) {
    return (
      <AvatarComponent>
        <Image src={src} width={50} height={50}  alt="@shadcn" />
        <AvatarFallback>{fallback}</AvatarFallback>
      </AvatarComponent>
    )
  }