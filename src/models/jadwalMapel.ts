export interface JadwalMapel {
  id_jadwal_mapel: string;
  id_guru: string;
  id_kelas: string;
  id_mapel: string;
  hari: hariType;
  jam: jamType;
}

export type hariType = "senin" | "selasa" | "rabu" | "kemis" | "jumat";
export type jamType = 1 | 2 | 3 | 4;
