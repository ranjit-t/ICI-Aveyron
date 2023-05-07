import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBjqwZQimbLUKYTATFjhKwbUTeqUajIFTc",
  authDomain: "aveyron-connect.firebaseapp.com",
  projectId: "aveyron-connect",
  storageBucket: "aveyron-connect.appspot.com",
  messagingSenderId: "140508540789",
  appId: "1:140508540789:web:c0a03b4b0923fe031bad3c",
};

initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();

export let signedUser = null; // initialize signedUser to null

onAuthStateChanged(auth, (user) => {
  signedUser = user
    ? {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid,
      }
    : null;
});
