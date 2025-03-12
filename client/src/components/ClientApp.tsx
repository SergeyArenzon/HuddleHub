"use client";
import useAuth from "@/hooks/useAuth";

export default function ClientApp({ children }: { children: React.ReactNode }) {
  const { status } = useAuth();
  if (status === "loading") return <div>Loading...</div>
  return children;
}