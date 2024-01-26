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
const firebaseConfig: FirebaseOptions = (() => {
  const mode = process.env.NEXT_PUBLIC_FIREBASE_MODE || 'production';

  switch(mode) {
    default: {
      return {
        apiKey: "AIzaSyDEWMXcSgxJEv4Aci-fCAGgfNZil1w_Dvw",
        authDomain: "turugi-mahiru.fans",
        projectId: "tsurugi-mahiru-schedule",
        storageBucket: "tsurugi-mahiru-schedule.appspot.com",
        messagingSenderId: "106334422545",
        appId: "1:106334422545:web:6cba10c27b28adc9e493b0",
        measurementId: "G-TQH10JB39F"
      };
    }
    case 'development': {
      return {
        apiKey: "AIzaSyDsXUbtwbuzZWDIW-PNBJFwy5WBJYqtV7Y",
        authDomain: new URL(process.env.NEXT_PUBLIC_PUBLIC_URL || 'https://www.turugi-mahiru.fans.127.0.0.1.nip.io:8080/').host,
        projectId: "tsurugi-mahiru-schedule-dev",
        storageBucket: "tsurugi-mahiru-schedule-dev.appspot.com",
        messagingSenderId: "1051143674625",
        appId: "1:1051143674625:web:46c3f0dedf1272f3565900"
      };
    }
  }
})();

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export async function getAnalytics() {
  if(!firebaseConfig.measurementId) return null;
  return (await isSupported()) ? _getAnalytics(app) : null;
}
