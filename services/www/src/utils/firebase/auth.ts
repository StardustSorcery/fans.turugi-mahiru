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
import { app, getAnalytics } from './init';
import { logEvent } from 'firebase/analytics';

const auth = getAuth(app);

export function onAuthStateChanged(cb: NextOrObserver<User>) {
  return _onAuthStateChanged(auth, cb);
}

export async function singInWithGoogle() {
  const analytics = await getAnalytics();
  if(!analytics) return;

  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);

  logEvent(analytics, 'login', { method: 'Google' });

  return userCredential;
}

export async function singInWithTwitter() {
  const analytics = await getAnalytics();
  if(!analytics) return;

  const provider = new TwitterAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);

  logEvent(analytics, 'login', { method: 'Twitter' });

  return userCredential;
}

export async function signOut() {
  const analytics = await getAnalytics();
  if(!analytics) return;

  await _signOut(auth)

  logEvent(analytics, 'logout');

  return;
}
