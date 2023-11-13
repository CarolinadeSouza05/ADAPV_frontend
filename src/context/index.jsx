import { createContext } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const UserValueDefault = {
  id: "",
  name: "",
  email: "",
  password: "",
  role: "USER",
};

const UserDTOValuesDefault = {
    id: "",
    role: "",
}

const StoreContext = createContext();

export const useNotionContext = create(
  persist(
    (set) => ({
      user: UserDTOValuesDefault,
      setUser: (user) => set((state) => (state.user = user)),
    }),
    {
      name: "user-adapv",
      getStorage: () => localStorage,
    },
  ),
);

function StoreProvider({ children }) {
  return <StoreContext.Provider value={useNotionContext}>{children}</StoreContext.Provider>;
}

export { StoreContext, StoreProvider };

