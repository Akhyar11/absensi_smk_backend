export interface Absensi {
  id_absensi: string;
  id_siswa: string;
  id_jadwal: string;
  kehadiran: boolean;
  keterangan: string;
  waktu_absen: Date;
}
