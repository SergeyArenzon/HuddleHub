import { redirect, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import ROUTES from "@/app/routes";


export default function isAuth<T extends object>(Component: React.ComponentType<T>) {
    return function IsAuth(props: T) {
        const { status } = useSession();
        const pathname = usePathname();

        if (pathname === ROUTES.ROOT && status === "authenticated") {
            return redirect(ROUTES.DASHBOARD);
        } else if (pathname === ROUTES.ROOT && status === "unauthenticated") {
            return redirect(ROUTES.SIGNIN)
        }
        else if (status == "unauthenticated" && pathname !== ROUTES.SIGNIN) {
            return redirect(ROUTES.SIGNIN);
        } else if (status === "authenticated" && pathname === ROUTES.SIGNIN) {
            return redirect(ROUTES.DASHBOARD);
        }
        return <Component {...props} />;
    };
}