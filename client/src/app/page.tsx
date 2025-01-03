import { signIn } from "@/app/auth";
import { useSession } from "next-auth/react";

export default function Home() {

  const { data, update} = useSession();

  console.log({ data, update });
  
  return (
    <form
    action={async () => {
      "use server"
      await signIn("github", { redirectTo: "/dashboard" })
    }}
  >
    <button type="submit">Sign in</button>
  </form>
  );
}
