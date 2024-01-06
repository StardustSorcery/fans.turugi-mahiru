import { AppContext } from "@/types/app";
import { createContext } from "react";

export const appContext = createContext<AppContext>({
  firebase: {
    user: null,
    status: 'loading',
  },
});