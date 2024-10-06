import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBjNrpdSQBfehly2kJMnwN_j6VRHgCCiMY",
  authDomain: "ead-ecom.firebaseapp.com",
  projectId: "ead-ecom",
  storageBucket: "ead-ecom.appspot.com",
  messagingSenderId: "318516083497",
  appId: "1:318516083497:web:6b750fe6023a71807dd538",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, ref, uploadBytesResumable, getDownloadURL };
