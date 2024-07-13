import { Kelas } from "../models/kelas";
import { db } from "../firebase";

export const createKelas = async (
  id_guru: string,
  nama_kelas: string
): Promise<Kelas> => {
  const kelasData: Kelas = {
    id_kelas: db.collection("kelas").doc().id,
    id_guru,
    nama_kelas,
  };

  await db.collection("kelas").doc(kelasData.id_kelas).set(kelasData);
  return kelasData;
};

export const getAllKelas = async (): Promise<Kelas[]> => {
  const snapshot = await db.collection("kelas").get();
  return snapshot.docs.map((doc) => doc.data() as Kelas);
};

export const getKelasById = async (KelasId: string): Promise<Kelas | null> => {
  const doc = await db.collection("kelas").doc(KelasId).get();
  if (!doc.exists) return null;
  return doc.data() as Kelas;
};

export const getKelasByGuruId = async (
  guruId: string
): Promise<Kelas | null> => {
  const doc = await db.collection("kelas").where("id_guru", "==", guruId).get();
  if (doc.empty) return null;
  const KelasData = doc.docs;
  return KelasData[0].data() as Kelas;
};

export const updateKelas = async (kelasId: string, data: Kelas) => {
  const KelasData = await getKelasById(kelasId);
  if (!KelasData) return null;
  const KelasDoc = db.collection("kelas").doc(kelasId);
  const newKelasData: Partial<Kelas> = data;
  await KelasDoc.update(newKelasData);
  return newKelasData;
};

export const deleteKelasById = async (kelasId: string) => {
  const validKelas = await getKelasById(kelasId);
  console.log(validKelas);
  if (!validKelas) return null;
  const KelasDoc = db.collection("kelas").doc(kelasId);
  await KelasDoc.delete();
};
