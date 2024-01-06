'use client';
import { FamilyRestroom } from "@mui/icons-material";
import {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

const DefaultContext = createContext<{
  sideNav: {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
  };
  signInPopup: {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
  }
}>({
  sideNav: {
    isOpen: false,
    open: () => {},
    close: () => {},
    toggle: () => {},
  },
  signInPopup: {
    isOpen: false,
    open: () => {},
    close: () => {},
    toggle: () => {},
  },
});
export default DefaultContext;

export const useDefaultContext = () => useContext(DefaultContext);

export function DefaultContextProvider({ children }: { children: React.ReactNode }): React.ReactNode {
  const [ sideNavIsOpen, setSideNavIsOpen ] = useState<boolean>(false);
  const openSideNav = useCallback(() => {
    setSideNavIsOpen(true);
  }, []);
  const closeSideNav = useCallback(() => {
    setSideNavIsOpen(false);
  }, []);
  const toggleSideNav = useCallback(() => {
    setSideNavIsOpen(isOpen => !isOpen);
  }, []);

  const [ signInPopupIsOpen, setSignInPopupIsOpen ] = useState<boolean>(false);
  const openSignInPopup = useCallback(() => {
    setSignInPopupIsOpen(true);
  }, []);
  const closeSignInPopup = useCallback(() => {
    setSignInPopupIsOpen(false);
  }, []);
  const toggleSignInPopup = useCallback(() => {
    setSignInPopupIsOpen(isOpen => !isOpen);
  }, []);

  return (
    <DefaultContext.Provider
      value={{
        sideNav: {
          isOpen: sideNavIsOpen,
          open: openSideNav,
          close: closeSideNav,
          toggle: toggleSideNav,
        },
        signInPopup: {
          isOpen: signInPopupIsOpen,
          open: openSignInPopup,
          close: closeSignInPopup,
          toggle: toggleSignInPopup,
        },
      }}
    >
      {children}
    </DefaultContext.Provider>
  );
}
