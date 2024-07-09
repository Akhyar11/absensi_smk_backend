import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

const firebaseConfig: admin.ServiceAccount = {
  clientEmail: process.env.CLIENTEMAIL || "no client Email",
  privateKey: process.env.PRIVATKEY || "no Private Key",
  projectId: process.env.PROJECTID || "no Project Id",
};

const app = admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
});

export const db = admin.firestore(app);
export const auth = admin.auth(app);
