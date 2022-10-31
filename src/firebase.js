import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDRgV1_it2og-hIRRyFOD9_j7G8B149zpk",
  authDomain: "seproject-2b3a1.firebaseapp.com",
  projectId: "seproject-2b3a1",
  storageBucket: "seproject-2b3a1.appspot.com",
  messagingSenderId: "423539814001",
  appId: "1:423539814001:web:f06cc652e33a714aed75d0",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
