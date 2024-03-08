import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD6A5P9wFypLV-6Y4caLT_YR7S4RfQ7XrI",
  authDomain: "letmeask-cc142.firebaseapp.com",
  databaseURL: "https://letmeask-cc142-default-rtdb.firebaseio.com",
  projectId: "letmeask-cc142",
  storageBucket: "letmeask-cc142.appspot.com",
  messagingSenderId: "395227678707",
  appId: "1:395227678707:web:4d2c0ae0ba74eaf058f486",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export default app;
