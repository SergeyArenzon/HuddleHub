import { User } from '@/types/user';
import { create } from 'zustand'



type UserStore = {
  user: User | null,
  setUser: (user: User) => void 
  clearUser: () => void
  isLogged: boolean
}


const useUserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user) => set({ user, isLogged: true }),
    clearUser: () => set({ user: null, isLogged: false }),
    isLogged: false
  }));

export default useUserStore;
