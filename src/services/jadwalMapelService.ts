import { JadwalMapel, jamType, hariType } from "../models/jadwalMapel";
import { db } from "../firebase";
import { getAllMapel, getMapelById } from "./mapelService";
import { getAllGuru, getGuruById } from "./guruService";
import { getAllKelas, getKelasById } from "./kelasService";

// Create JadwalMapel
export const createJadwalMapel = async (
  id_guru: string,
  id_kelas: string,
  id_mapel: string,
  hari: hariType,
  jam: jamType
): Promise<JadwalMapel> => {
  const JadwalMapelData: JadwalMapel = {
    id_jadwal_mapel: db.collection("jadwalMapel").doc().id,
    id_guru,
    id_kelas,
    id_mapel,
    hari,
    jam,
  };

  await db
    .collection("jadwalMapel")
    .doc(JadwalMapelData.id_jadwal_mapel)
    .set(JadwalMapelData);
  return JadwalMapelData;
};

// Read all JadwalMapel
export const getAllJadwalMapel = async (): Promise<JadwalMapel[]> => {
  const snapshot = await db.collection("jadwalMapel").get();
  const jadwalData = snapshot.docs.map((doc) => doc.data() as JadwalMapel);
  const mapelData = await getAllMapel();
  const guruData = await getAllGuru();
  const kelasData = await getAllKelas();

  const dataMapel = jadwalData.map((jadwal) => {
    const newJadwal: JadwalMapel = mapelData.map((mapel) => {
      if (mapel.id_mapel == jadwal.id_mapel)
        jadwal.id_mapel == mapel.nama_mapel;
      return jadwal;
    })[0];
    return newJadwal;
  });

  const dataGuru = dataMapel.map((jadwal) => {
    const newJadwal: JadwalMapel = guruData.map((guru) => {
      if (guru.id_guru == jadwal.id_guru) jadwal.id_guru == guru.nama;
      return jadwal;
    })[0];
    return newJadwal;
  });

  const dataKelas = dataGuru.map((jadwal) => {
    const newJadwal: JadwalMapel = kelasData.map((kls) => {
      if (kls.id_kelas == jadwal.id_kelas) jadwal.id_kelas == kls.nama_kelas;
      return jadwal;
    })[0];
    return newJadwal;
  });

  return dataKelas;
};

// Read by id JadwalMapel
export const getJadwalMapelById = async (
  JadwalMapelId: string
): Promise<JadwalMapel | null> => {
  const doc = await db.collection("jadwalMapel").doc(JadwalMapelId).get();
  if (!doc.exists) return null;
  return doc.data() as JadwalMapel;
};

// Read by id_guru JadwalMapel
export const getJadwalMapelByGuruId = async (
  guruId: string
): Promise<JadwalMapel | null> => {
  const doc = await db
    .collection("jadwalMapel")
    .where("id_guru", "==", guruId)
    .get();
  if (doc.empty) return null;
  const JadwalMapelData = doc.docs;
  return JadwalMapelData[0].data() as JadwalMapel;
};

// Read by id_kelas JadwalMapel
export const getJadwalMapelByKelasId = async (
  kelasId: string
): Promise<JadwalMapel | null> => {
  const doc = await db
    .collection("jadwalMapel")
    .where("id_kelas", "==", kelasId)
    .get();
  if (doc.empty) return null;
  const JadwalMapelData = doc.docs;
  return JadwalMapelData[0].data() as JadwalMapel;
};

// Read by id_mapel JadwalMapel
export const getJadwalMapelByMapelId = async (mapelId: string) => {
  const doc = await db
    .collection("jadwalMapel")
    .where("id_mapel", "==", mapelId)
    .get();
  if (doc.empty) return null;
  const JadwalMapelData = doc.docs;
  return JadwalMapelData[0].data() as JadwalMapel;
};

// Update JadwalMapel
export const updateJadwalMapel = async (
  JadwalMapelId: string,
  data: JadwalMapel
) => {
  const JadwalMapelData = await getJadwalMapelById(JadwalMapelId);
  if (!JadwalMapelData) return null;
  const JadwalMapelDoc = db.collection("jadwalMapel").doc(JadwalMapelId);
  const newJadwalMapelData: Partial<JadwalMapel> = data;
  await JadwalMapelDoc.update(newJadwalMapelData);
  return newJadwalMapelData;
};

// Delete by id JadwalMapel
export const deleteJadwalMapelById = async (JadwalMapelId: string) => {
  const validJadwalMapel = await getJadwalMapelById(JadwalMapelId);
  if (!validJadwalMapel) return null;
  const JadwalMapelDoc = db.collection("jadwalMapel").doc(JadwalMapelId);
  await JadwalMapelDoc.delete();
};
