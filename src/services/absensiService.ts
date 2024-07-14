import { db } from "../firebase";
import { Absensi } from "../models/absensi";
import { getJadwalMapelById } from "./jadwalMapelService";
import { getSiswaByToken } from "./siswaService";

interface DataValidasiAbsensi {
  id_jadwal: string;
  id_kelas: string;
  token: string;
}

export const validasiAbsensi = async (data: DataValidasiAbsensi[]) => {
  try {
    for (let validasi of data) {
      const dataSiswa = await getSiswaByToken(validasi.token);
      const dataJadwal = await getJadwalMapelById(validasi.id_jadwal);
      if (dataSiswa && dataJadwal) {
        await createAbsensi(
          dataSiswa.id_siswa,
          validasi.id_jadwal,
          dataJadwal.id_mapel,
          true,
          "Absensi RFID",
          new Date()
        );
      } else return "Data Tidak Sesuai";
    }

    return "Absensi Selesai";
  } catch (error) {
    console.log(error);
    return "Internal Server Error";
  }
};

export const createAbsensi = async (
  id_siswa: string,
  id_jadwal: string,
  id_mapel: string,
  kehadiran: boolean,
  keterangan: string,
  waktu_absen: Date
) => {
  const absensiData: Absensi = {
    id_absensi: db.collection("absensi").doc().id,
    id_siswa,
    id_jadwal,
    id_mapel,
    kehadiran,
    keterangan,
    waktu_absen,
  };

  await db.collection("absensi").doc(absensiData.id_absensi).set(absensiData);
  return absensiData;
};

export const getAllAbsensi = async () => {
  const snapshot = await db.collection("absensi").get();
  return snapshot.docs.map((doc) => doc.data() as Absensi);
};

export const getAbsensiById = async (id_absensi: string) => {
  const doc = await db.collection("absensi").doc(id_absensi).get();
  if (!doc.exists) return null;
  return doc.data() as Absensi;
};

export const getAbsensiBySiswa = async (id_siswa: string) => {
  const snapshot = await db
    .collection("absensi")
    .where("id_siswa", "==", id_siswa)
    .get();
  if (!snapshot.empty) return null;
  return snapshot.docs.map((doc) => doc.data() as Absensi);
};

export const getAbsensiByJadwal = async (id_jadwal: string) => {
  const snapshot = await db
    .collection("absensi")
    .where("id_jadwal", "==", id_jadwal)
    .get();
  if (!snapshot.empty) return null;
  return snapshot.docs.map((doc) => doc.data() as Absensi);
};

export const updateAbsensi = async (id_absensi: string, data: Absensi) => {
  const absensiDoc = db.collection("absensi").doc(id_absensi);
  const absensi = (await absensiDoc.get()).data() as Absensi;

  if (!absensi) return null;

  const absensiData: Partial<Absensi> = data;

  await absensiDoc.update(absensiData);
  return data;
};

export const deleteAbsensiById = async (id_absensi: string) => {
  try {
    await db.collection("absensi").doc(id_absensi).delete();
    return true; // Berhasil menghapus
  } catch (error) {
    console.log("Error deleting absensi:", error);
    return false; // Gagal menghapus
  }
};
