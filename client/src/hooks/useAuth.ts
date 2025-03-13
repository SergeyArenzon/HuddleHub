import { UserSchema } from "@/schema";
import useUserStore from "@/store/useUser";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const useAuth = () => {
    const {  data, status } = useSession();
    const { setUser, clearUser, isLogged } = useUserStore();
    
    useEffect(() => {
      if (status === "authenticated") {  
        const user = UserSchema.parse(data?.user);
        setUser(user);
      } else if (status === "unauthenticated") {
        clearUser();
      }
    }, [status]);

    return { isLogged , status};
};

export default useAuth;