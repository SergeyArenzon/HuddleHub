import { create } from 'zustand'
import { IPopups } from '@/interfaces'


type PopupStore = {
  popups: IPopups,
  updatePopup: (popupName: keyof IPopups, value: boolean) => void
}



export const usePopupStore = create<PopupStore>((set) => ({
  popups: {
    X: false
  },
  updatePopup: (popupName, value) =>
    set((state) => ({
      popups: {
        ...state.popups,
        [popupName]: value, 
      },
    })),
  // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  // removeAllBears: () => set({ bears: 0 }),
  // updateBears: (newBears) => set({ bears: newBears }),
}))
