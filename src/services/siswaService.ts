import { Siswa } from "../models/siswa";
import { db } from "../firebase";

// Create Siswa
export const createSiswa = async (
  id_kelas: string,
  nisn: string,
  nama: string,
  jk: boolean,
  alamat: string,
  tg_masuk: string,
  tg_lahir: string
): Promise<Siswa> => {
  const siswaData: Siswa = {
    id_siswa: db.collection("siswa").doc().id,
    id_kelas,
    nisn,
    nama,
    jk,
    alamat,
    tg_masuk,
    tg_lahir,
    token: "",
  };

  await db.collection("siswa").doc(siswaData.id_siswa).set(siswaData);
  return siswaData;
};

// Read all siswa
export const getAllSiswa = async (): Promise<Siswa[]> => {
  const snapshot = await db.collection("siswa").get();
  return snapshot.docs.map((doc) => doc.data() as Siswa);
};

// Read by id siswa
export const getSiswaById = async (siswaId: string): Promise<Siswa | null> => {
  const doc = await db.collection("siswa").doc(siswaId).get();
  if (!doc.exists) return null;
  return doc.data() as Siswa;
};

// Read by nisn siswa
export const getSiswaByNisn = async (nisn: string): Promise<Siswa | null> => {
  const doc = await db.collection("siswa").where("nisn", "==", nisn).get();
  if (doc.empty) return null;
  const siswaData = doc.docs;
  return siswaData[0].data() as Siswa;
};

// Read by token siswa
export const getSiswaByToken = async (token: string): Promise<Siswa | null> => {
  const doc = await db.collection("siswa").where("token", "==", token).get();
  if (doc.empty) return null;
  const siswaData = doc.docs;
  return siswaData[0].data() as Siswa;
};

// Read by kelas siswa
export const getSiswaByKelas = async (kelasId: string) => {
  const doc = await db
    .collection("siswa")
    .where("id_kelas", "==", kelasId)
    .get();
  if (doc.empty) return null;
  const siswaData = doc.docs;
  return siswaData[0].data() as Siswa;
};

// Update siswa
export const updateSiswa = async (siswaId: string, data: Siswa) => {
  const siswaData = await getSiswaById(siswaId);
  if (!siswaData) return null;
  const siswaDoc = db.collection("siswa").doc(siswaId);
  const newSiswaData: Partial<Siswa> = data;
  await siswaDoc.update(newSiswaData);
  return newSiswaData;
};

// Delete by id siswa
export const deleteSiswaById = async (siswaId: string) => {
  const validSiswa = await getSiswaById(siswaId);
  if (!validSiswa) return null;
  const siswaDoc = db.collection("siswa").doc(siswaId);
  await siswaDoc.delete();
};
