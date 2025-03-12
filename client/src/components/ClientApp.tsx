"use client";
import useAuth from "@/hooks/useAuth";
import Loading from "./Loading";

export default function ClientApp({ children }: { children: React.ReactNode }) {
  const { status } = useAuth();
  if (status === "loading") return <Loading/>

  return children;
}