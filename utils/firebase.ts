import { initializeApp } from "firebase/app";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDfXjbcfnqhWw7pHhXczhS37-iIytZVlo0",
  authDomain: "tonder-1170f.firebaseapp.com",
  projectId: "tonder-1170f",
  storageBucket: "tonder-1170f.appspot.com",
  messagingSenderId: "283676282089",
  appId: "1:283676282089:web:ea343539b2933f11be3478",
};
const firebase = initializeApp(firebaseConfig);
const authentication = getAuth(firebase);
export const provider = new GoogleAuthProvider();
export const providerFB = new FacebookAuthProvider();
export const storage = getStorage(firebase);

export default authentication;
