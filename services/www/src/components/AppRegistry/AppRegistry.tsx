'use client';
import { AppContext } from "@/types/app";
import { onAuthStateChanged } from "@/utils/firebase/auth";
import { getAnalytics } from "@/utils/firebase/init";
import { logEvent } from "firebase/analytics";
import {
  useEffect,
  useState,
} from "react"
import { appContext } from "./AppContext";

export default function AppRegistry({
  children,
  ...props
}: React.PropsWithChildren): React.ReactNode {
  // Handle Firebase Auth
  const [ firebaseUser, setFirebaseUser ] = useState<AppContext['firebase']['user']>(null);
  const [ firebaseStatus, setFirebaseStatus ] = useState<AppContext['firebase']['status']>('loading');
  useEffect(() => {
    getAnalytics()
      .then(analytics => {
        if(!analytics) return;

        onAuthStateChanged((user) => {
          setFirebaseUser(user);
          setFirebaseStatus(prevStatus => {
            const status = user === null ? 'unauthenticated' : 'authenticated';

            if(prevStatus === 'loading' && status === 'authenticated') {
              logEvent(analytics, 'login_auto');
            }

            return status;
          });
        });
      });
  }, []);

  return (
    <appContext.Provider
      {...props}
      value={{
        firebase: {
          user: firebaseUser,
          status: firebaseStatus,
        },
      }}
    >
      {children}
    </appContext.Provider>
  );
}
