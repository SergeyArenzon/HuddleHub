import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import ROUTES from "@/app/routes";


export default function isAuth<T extends object>(Component: React.ComponentType<T>) {
    return function IsAuth(props: T) {
        const { status } = useSession();
        if (status == "unauthenticated") {
            return redirect(ROUTES.SIGNIN);
        } else if(status == "loading") {
            return <div>Loading...</div>;
        }

        return <Component {...props} />;
    };
}