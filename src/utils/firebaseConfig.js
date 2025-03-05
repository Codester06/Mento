// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  databaseURL: process.env.REACT_APP_FIRE_BASE
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
