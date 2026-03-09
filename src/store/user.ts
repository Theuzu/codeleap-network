import {create} from "zustand"
import { persist } from "zustand/middleware";

type UserStore = {
    username: string;
    addUsername: (username: string) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      username: "",
      addUsername: (username: string) => set({ username }),
    }),
    { name: "user-storage" } // Nome da chave no localStorage
  )
)