import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Guru } from "../models/guru";
import { db } from "../firebase";

import { config } from "dotenv";

config();

export const getGuruByToken = async (token: string) => {
  try {
    const guruSnapshot = await db
      .collection("guru")
      .where("token", "==", token)
      .get();
    if (guruSnapshot.empty) {
      return "empty guru";
    }

    const payload = jwt.verify(token, process.env.JWT_PRIVATKEY as string);
    const guru = await getGuruById((payload as jwt.JwtPayload).uid);
    if (!guru) return "your not guru";
    return "your is guru";
  } catch (error) {
    console.log(error);
    return "Internal server error";
  }
};

export const getGuruByToken2 = async (token: string) => {
  try {
    const guruSnapshot = await db
      .collection("guru")
      .where("token", "==", token)
      .get();
    if (guruSnapshot.empty) {
      return "empty guru";
    }

    const payload = jwt.verify(token, process.env.JWT_PRIVATKEY as string);
    const guru = await getGuruById((payload as jwt.JwtPayload).uid);
    if (!guru) return "your not guru";
    return guru;
  } catch (error) {
    console.log(error);
    return "Internal server error";
  }
};

export const cekPasswordById = async (id_guru: string, password: string) => {
  const guruSnapshot = await db.collection("guru").doc(id_guru).get();
  if (!guruSnapshot.exists) return "Guru not found";

  const guruData = guruSnapshot.data() as Guru;
  const isPasswordValid = await bcrypt.compare(password, guruData.password);

  if (!isPasswordValid) return "wrong password";

  return "valid password";
};

export const loginGuru = async (email: string, password: string) => {
  const guruSnapshot = await db
    .collection("guru")
    .where("email", "==", email)
    .get();

  if (guruSnapshot.empty) {
    return "Guru not found";
  }

  const guruData = guruSnapshot.docs[0].data() as Guru;
  const isPasswordValid = await bcrypt.compare(password, guruData.password);

  if (!isPasswordValid) {
    return "Invalid password";
  }

  const token = jwt.sign(
    { uid: guruSnapshot.docs[0].id },
    process.env.JWT_PRIVATKEY as string,
    {
      expiresIn: "1h",
    }
  );

  await updateTokenGuru(guruSnapshot.docs[0].id, token);
  return token;
};

const updateTokenGuru = async (guruId: string, token: string) => {
  const adminDoc = db.collection("guru").doc(guruId);
  const guru = (await adminDoc.get()).data() as Guru;
  if (guru) {
    const updateAdmin: Partial<Guru> = {
      nama: guru.nama,
      email: guru.email,
      id_guru: guru.id_guru,
      password: guru.password,
      token: token || guru.token,
    };
    await adminDoc.update(updateAdmin);
  }
};

export const createGuru = async (
  nama: string,
  email: string,
  password: string
): Promise<Guru> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const guruData: Guru = {
    id_guru: db.collection("guru").doc().id,
    nama,
    email,
    password: hashedPassword,
    token: "",
  };

  await db.collection("guru").doc(guruData.id_guru).set(guruData);
  return guruData;
};

export const getAllGuru = async (): Promise<Guru[]> => {
  const snapshot = await db.collection("guru").get();
  return snapshot.docs.map((doc) => doc.data() as Guru);
};

export const getGuruById = async (guruId: string): Promise<Guru | null> => {
  const doc = await db.collection("guru").doc(guruId).get();
  if (!doc.exists) return null;
  return doc.data() as Guru;
};

export const updateGuru = async (
  guruId: string,
  nama: string,
  email: string,
  password?: string
): Promise<Partial<Guru | null>> => {
  const guruDoc = db.collection("guru").doc(guruId);
  const guru = (await guruDoc.get()).data() as Guru;

  if (!guru) {
    return null;
  }

  const updatedGuru: Partial<Guru> = {
    nama: nama || guru.nama,
    email: email || guru.email,
  };

  if (password) {
    updatedGuru.password = await bcrypt.hash(password, 10);
  }

  await guruDoc.update(updatedGuru);
  return updatedGuru;
};

export const deleteGuru = async (guruId: string): Promise<void> => {
  const guruDoc = db.collection("guru").doc(guruId);
  await guruDoc.delete();
};
