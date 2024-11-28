import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBLXc6nhuzMXO7epPc11KKUmy8EpXPR3DU",
  authDomain: "tasks-board-6fd3d.firebaseapp.com",
  projectId: "tasks-board-6fd3d",
  storageBucket: "tasks-board-6fd3d.firebasestorage.app",
  messagingSenderId: "390730510008",
  appId: "1:390730510008:web:7173b83638fb8f40870e4d",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export { db };
