import { useContext } from "react";
import { StoreContext } from ".";

export const useGlobalStore = () => {
  const useStore = useContext(StoreContext);

  return {
    user: useStore((state) => state.user),
    setUser: useStore((state) => state.setUser),
  };
};
