import {
  getAuth,
  onAuthStateChanged as _onAuthStateChanged,
  signOut as _signOut,
  type User,
  type NextOrObserver,
  GoogleAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
  linkWithPopup,
  unlink,
  updateProfile,
} from 'firebase/auth';
import { app, getAnalytics } from './init';
import { logEvent } from 'firebase/analytics';

export const auth = getAuth(app);

// State Handler
export function onAuthStateChanged(cb: NextOrObserver<User>) {
  return _onAuthStateChanged(auth, cb);
}

// Sign In
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

// Sign Out
export async function signOut() {
  const analytics = await getAnalytics();
  if(!analytics) return;

  await _signOut(auth)

  logEvent(analytics, 'logout');

  return;
}

// Link
export async function linkGoogle() {
  const user = auth.currentUser;
  if(!user) throw new Error('no-user');

  const provider = new GoogleAuthProvider();
  return await linkWithPopup(user, provider);
}

export async function linkTwitter() {
  const user = auth.currentUser;
  if(!user) throw new Error('no-user');

  const provider = new TwitterAuthProvider();
  return await linkWithPopup(user, provider);
}

// Unlink
export async function unlinkGoogle() {
  const user = auth.currentUser;
  if(!user) throw new Error('no-user');

  const provider = new GoogleAuthProvider();
  return await unlink(user, provider.providerId)
}

export async function unlinkTwitter() {
  const user = auth.currentUser;
  if(!user) throw new Error('no-user');

  const provider = new TwitterAuthProvider();
  return await unlink(user, provider.providerId)
}

// Update Profile
export async function updatePhoto(photo: File) {
  return;
}

export async function updateDisplayName(displayName: string) {
  const user = auth.currentUser;
  if(!user) throw new Error('no-user');

  return await updateProfile(user, { displayName });
}
