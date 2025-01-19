import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { Loading } from "@/components/Loading";
import ROUTES from "../routes";


export default function isAuth<T extends object>(Component: React.ComponentType<T>) {
    return function IsAuth(props: T) {
        const { status } = useSession();
        if (status == "unauthenticated") {
            return redirect(ROUTES.SIGNIN);
        } else if(status == "loading") {
            return <Loading />;
        }

        return <Component {...props} />;
    };
}