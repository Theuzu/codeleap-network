import {create} from "zustand"
import { persist } from "zustand/middleware";

type UserStore = {
    username: string | null;
    addUsername: (username: string) => void;
    clearUsername: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      username: "",
      addUsername: (username: string) => set({ username }),
      clearUsername: () => set({ username: null }),
    }),
    { name: "user-storage" } // Key name
  )
)