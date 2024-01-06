// Import the functions you need from the SDKs you need
import {
  getAnalytics as _getAnalytics,
  isSupported,
} from "firebase/analytics";
import {
  type FirebaseOptions,
  initializeApp,
} from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyDEWMXcSgxJEv4Aci-fCAGgfNZil1w_Dvw",
  authDomain: "tsurugi-mahiru-schedule.firebaseapp.com",
  projectId: "tsurugi-mahiru-schedule",
  storageBucket: "tsurugi-mahiru-schedule.appspot.com",
  messagingSenderId: "106334422545",
  appId: "1:106334422545:web:6cba10c27b28adc9e493b0",
  measurementId: "G-TQH10JB39F"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export async function getAnalytics() {
  return (await isSupported()) ? _getAnalytics(app) : null;
}
