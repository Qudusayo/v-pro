import { createContext, useContext } from "react";
import { persist } from "zustand/middleware";
import { create, useStore } from "zustand";

export interface ProfileData {
  email: string;
  balance: number;
  username: string;
  accountDetails?: {
    accountName: string;
    accountNumber: string;
    bankName: string;
  };
}

interface IUser {
  user: ProfileData;
  setUser: (user: ProfileData) => void;
}

const store = create<IUser>()(
  persist(
    (set) => ({
      user: {} as ProfileData,
      setUser: (user) => set({ user }),
    }),
    {
      name: "user-storage",
    },
  ),
);

const StoreContext = createContext(store);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}

export const useMyStore = (selector: (state: IUser) => any) =>
  useStore(useContext(StoreContext), selector);
