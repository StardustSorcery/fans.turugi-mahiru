import {
  getAuth,
  onAuthStateChanged as _onAuthStateChanged,
  signOut as _signOut,
  type User,
  type NextOrObserver,
  GoogleAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { analytics, app } from './init';
import { logEvent } from 'firebase/analytics';

const auth = getAuth(app);

export function onAuthStateChanged(cb: NextOrObserver<User>) {
  return _onAuthStateChanged(auth, cb);
}

export function singInWithGoogle() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider)
    .then((userCredential) => {
      logEvent(analytics, 'login', { method: 'Google' });

      return userCredential;
    });

}

export function singInWithTwitter() {
  const provider = new TwitterAuthProvider();
  return signInWithPopup(auth, provider)
    .then((userCredential) => {
      logEvent(analytics, 'login', { method: 'Twitter' });

      return userCredential;
    });
}

export function signOut() {
  return _signOut(auth)
    .then(() => {
      logEvent(analytics, 'logout');
    });
}
