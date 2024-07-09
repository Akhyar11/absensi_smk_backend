import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

const firebaseConfig: admin.ServiceAccount = {
  clientEmail: process.env.CLIENTEMAIL,
  privateKey: process.env.PRIVATKEY,
  projectId: process.env.PROJECTID,
};

const app = admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
});

export const db = admin.firestore(app);
export const auth = admin.auth(app);
