'use client';
import { AppContext } from "@/types/app";
import { auth, onAuthStateChanged } from "@/utils/firebase/auth";
import { getAnalytics } from "@/utils/firebase/init";
import { logEvent } from "firebase/analytics";
import {
  useCallback,
  useEffect,
  useState,
} from "react"
import { appContext } from "./AppContext";
import hash from 'object-hash';

export default function AppRegistry({
  children,
  ...props
}: React.PropsWithChildren): React.ReactNode {
  // Handle Firebase Auth
  const [ firebaseUser, setFirebaseUser ] = useState<AppContext['firebase']['user'] | undefined>(undefined);
  const [ firebaseUserHash, setFirebaseUserHash ] = useState<AppContext['firebase']['userHash']>(null);
  const [ firebaseStatus, setFirebaseStatus ] = useState<AppContext['firebase']['status']>('loading');

  useEffect(() => {
    onAuthStateChanged((user) => {
      setFirebaseUser(user);
      setFirebaseUserHash(
        user
          ? hash.MD5(user.toJSON())
          : null
      );
    });
  }, []);

  const reloadFirebaseUser = useCallback(() => {
    const user = auth.currentUser;
    setFirebaseUserHash(
      user
        ? hash.MD5(user.toJSON())
        : null
    );
  }, []);

  useEffect(() => {
    getAnalytics()
      .then(analytics => {
        setFirebaseStatus(prevStatus => {
          const status =
            firebaseUser === undefined
              ? 'loading'
              : (
                firebaseUser === null
                  ? 'unauthenticated'
                  : 'authenticated'
              );

          if(prevStatus === 'loading' && status === 'authenticated' && analytics) {
            logEvent(analytics, 'login_auto');
          }

          return status;
        });
      });
  }, [
    firebaseUser,
    firebaseUserHash,
  ]);

  return (
    <appContext.Provider
      {...props}
      value={{
        firebase: {
          user: firebaseUser || null,
          userHash: firebaseUserHash,
          status: firebaseStatus,
          reloadUser: reloadFirebaseUser,
        },
      }}
    >
      {children}
    </appContext.Provider>
  );
}
