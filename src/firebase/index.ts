import admin from "firebase-admin";
import firebaseConfig from "../assets/firebase-config.json";

const app = admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig as admin.ServiceAccount),
});

export const db = admin.firestore(app);
export const auth = admin.auth(app);
