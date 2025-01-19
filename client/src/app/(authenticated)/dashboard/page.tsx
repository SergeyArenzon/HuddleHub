import { signIn } from "next-auth/react";
import useUserStore from "@/store/useUser";

export default function Dashboard() {
  const { user } = useUserStore();

  return (
    <div className="bg-red-300 flex items-center justify-center col-start-1 col-span-1 row-start-2 row-span-1">
      <button className="bg-primary" onClick={() => signIn()}>zx</button>
      {/* <button className="bg-primary" onClick={() => updatePopup("X", true)}>zx</button> */}
      <div>
        {JSON.stringify(user)}
      </div>
    </div>
  );
}
