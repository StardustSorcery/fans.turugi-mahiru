'use client';
import { AppContext } from "@/types/app";
import { auth, getRedirectResult, onAuthStateChanged } from "@/utils/firebase/auth";
import { getAnalytics } from "@/utils/firebase/init";
import { logEvent } from "firebase/analytics";
import {
  useCallback,
  useEffect,
  useState,
} from "react"
import { appContext } from "./AppContext";
import hash from 'object-hash';
import { useSnackbar } from "notistack";
import { FirebaseError } from "firebase/app";

export default function AppRegistry({
  children,
  ...props
}: React.PropsWithChildren): React.ReactNode {
  const { enqueueSnackbar } = useSnackbar();

  // Handle Firebase Auth
  const [ firebaseUser, setFirebaseUser ] = useState<AppContext['firebase']['user'] | undefined>(undefined);
  const [ firebaseUserHash, setFirebaseUserHash ] = useState<AppContext['firebase']['userHash']>(null);
  const [ firebaseStatus, setFirebaseStatus ] = useState<AppContext['firebase']['status']>('loading');

  // onAuthStateChanged --> update `user`, `userHash`
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

  // update `userHash` from `user` manually
  const reloadFirebaseUser = useCallback(() => {
    const user = auth.currentUser;
    setFirebaseUserHash(
      user
        ? hash.MD5(user.toJSON())
        : null
    );
  }, []);

  // update `status` from `user` and `userHash`
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

  // notify redirect auth result
  useEffect(() => {
    getAnalytics()
      .then(analytics => {
        return getRedirectResult()
          .then(userCredential => {
            if(userCredential === null) return;

            switch(userCredential.operationType) {
              default: break;
              case 'signIn': {
                enqueueSnackbar('ログインしました', { variant: 'success' });

                if(analytics && userCredential.providerId) {
                  logEvent(analytics, 'login', { method: userCredential.providerId });
                }
                break;
              }
            }

            return;
          })
          .catch((err: FirebaseError) => {
            enqueueSnackbar('ログイン中にエラーが発生しました', { variant: 'error' });
            return;
          });
      });
  }, []);


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
