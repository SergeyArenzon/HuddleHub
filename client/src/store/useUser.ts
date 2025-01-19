import { User } from '@/types/user';
import { create } from 'zustand'



type UserStore = {
  user: User | null,
  setUser: (user: User) => void 
  clearUser: () => void
}


const useUserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
  }));

export default useUserStore;
