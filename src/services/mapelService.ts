import { Mapel } from "../models/mapel";
import { db } from "../firebase";

export const createMapel = async (nama_mapel: string): Promise<Mapel> => {
  const mapelData: Mapel = {
    id_mapel: db.collection("mapel").doc().id,
    nama_mapel,
  };

  await db.collection("mapel").doc(mapelData.id_mapel).set(mapelData);
  return mapelData;
};

export const getAllMapel = async (): Promise<Mapel[]> => {
  const snapshot = await db.collection("mapel").get();
  return snapshot.docs.map((doc) => doc.data() as Mapel);
};

export const getMapelById = async (mapelId: string): Promise<Mapel | null> => {
  const doc = await db.collection("mapel").doc(mapelId).get();
  if (!doc.exists) return null;
  return doc.data() as Mapel;
};

export const updateMapel = async (mapelId: string, data: Mapel) => {
  const MapelData = await getMapelById(mapelId);
  if (!MapelData) return null;
  const MapelDoc = db.collection("mapel").doc(mapelId);
  const newMapelData: Partial<Mapel> = data;
  await MapelDoc.update(newMapelData);
  return newMapelData;
};

export const deleteMapelById = async (mapelId: string) => {
  const validMapel = await getMapelById(mapelId);
  if (!validMapel) return null;
  const MapelDoc = db.collection("mapel").doc(mapelId);
  await MapelDoc.delete();
};
