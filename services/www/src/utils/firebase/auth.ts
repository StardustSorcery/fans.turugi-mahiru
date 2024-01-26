import {
  getAuth,
  onAuthStateChanged as _onAuthStateChanged,
  signOut as _signOut,
  type User,
  type NextOrObserver,
  GoogleAuthProvider,
  TwitterAuthProvider,
  linkWithPopup,
  unlink,
  updateProfile,
  signInWithRedirect,
} from 'firebase/auth';
import { app, getAnalytics } from './init';
import { logEvent } from 'firebase/analytics';
import axios from 'axios';

export const auth = getAuth(app);

// State Handler
export function onAuthStateChanged(cb: NextOrObserver<User>) {
  return _onAuthStateChanged(auth, cb);
}

// Sign In
export async function singInWithGoogle() {
  const analytics = await getAnalytics();

  const provider = new GoogleAuthProvider();
  await signInWithRedirect(auth, provider);

  if(analytics) {
    logEvent(analytics, 'login', { method: 'Google' });
  }

  return;
}

export async function singInWithTwitter() {
  const analytics = await getAnalytics();

  const provider = new TwitterAuthProvider();
  await signInWithRedirect(auth, provider);

  if(analytics) {
    logEvent(analytics, 'login', { method: 'Twitter' });
  }

  return;
}

// Sign Out
export async function signOut() {
  const analytics = await getAnalytics();

  await _signOut(auth)

  if(analytics) {
    logEvent(analytics, 'logout');
  }

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
  const user = auth.currentUser;
  if(!user) throw new Error('no-user');

  const idToken = await user.getIdToken();

  const formData = new FormData();
  formData.append('photo', photo);

  const photoHash =
    await axios
      .request<{ hash: string; }>({
        method: 'post',
        url: `/api/users/${user.uid}/profile-image.jpg`,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${idToken}`,
        },
      })
      .then(resp => {
        return resp.data.hash;
      });

  return await updateProfile(
    user,
    {
      photoURL: `${window.location.origin}/api/users/${user.uid}/profile-image.jpg?h=${photoHash}`,
    }
  );
}

export async function updateDisplayName(displayName: string) {
  const user = auth.currentUser;
  if(!user) throw new Error('no-user');

  return await updateProfile(user, { displayName });
}
