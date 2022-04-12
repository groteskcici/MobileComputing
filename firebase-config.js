import { getFirestore } from '@firebase/firestore';
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyBsN0wEZIv-VsDaLwleYdgSsw398Wzu5x4",
  authDomain: "mobilecomputing-135af.firebaseapp.com",
  projectId: "mobilecomputing-135af",
  storageBucket: "mobilecomputing-135af.appspot.com",
  messagingSenderId: "278853955846",
  appId: "1:278853955846:web:5da41fd1fab66df287ee87"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);