import { Request, Response } from "express";
import {
  createAbsensi,
  getAllAbsensi,
  getAbsensiById,
  getAbsensiBySiswa,
  getAbsensiByJadwal,
  updateAbsensi,
  deleteAbsensiById,
  validasiAbsensi,
} from "../services/absensiService";
import { Absensi } from "../models/absensi";

export const validasiAbsensiController = async (
  req: Request,
  res: Response
) => {
  const data = req.body;
  try {
    const valid = await validasiAbsensi(data);
    res.status(200).json({ message: valid });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Interval Server Error" });
  }
};

// Controller untuk membuat absensi baru
export const createAbsensiController = async (req: Request, res: Response) => {
  const { id_siswa, id_jadwal, id_mapel, kehadiran, keterangan, waktu_absen } =
    req.body;

  try {
    const absensiData = await createAbsensi(
      id_siswa,
      id_jadwal,
      id_mapel,
      kehadiran,
      keterangan,
      waktu_absen
    );
    return res
      .status(200)
      .json({ message: "Absensi created successfully", data: absensiData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller untuk mengambil semua data absensi
export const getAllAbsensiController = async (req: Request, res: Response) => {
  try {
    const absensiData = await getAllAbsensi();
    return res
      .status(200)
      .json({ message: "Get all absensi successfully", data: absensiData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller untuk mengambil data absensi berdasarkan ID absensi
export const getAbsensiByIdController = async (req: Request, res: Response) => {
  const id_absensi = req.params.id_absensi;
  try {
    const absensiData = await getAbsensiById(id_absensi);
    if (!absensiData)
      return res.status(200).json({ message: "Absensi not found", data: [] });
    return res
      .status(200)
      .json({ message: "Get absensi by ID successfully", data: absensiData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller untuk mengambil data absensi berdasarkan ID siswa
export const getAbsensiBySiswaController = async (
  req: Request,
  res: Response
) => {
  const id_siswa = req.params.id_siswa;
  try {
    const absensiData = await getAbsensiBySiswa(id_siswa);
    if (!absensiData)
      return res.status(200).json({ message: "Absensi not found" });
    return res.status(200).json({
      message: "Get absensi by siswa ID successfully",
      data: absensiData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller untuk mengambil data absensi berdasarkan ID jadwal
export const getAbsensiByJadwalController = async (
  req: Request,
  res: Response
) => {
  const id_jadwal = req.params.id_jadwal;
  try {
    const absensiData = await getAbsensiByJadwal(id_jadwal);
    if (!absensiData)
      return res.status(200).json({ message: "Absensi not found" });
    return res.status(200).json({
      message: "Get absensi by jadwal ID successfully",
      data: absensiData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller untuk mengupdate data absensi
export const updateAbsensiController = async (req: Request, res: Response) => {
  const id_absensi = req.params.id_absensi;
  const data: Absensi = req.body;
  data.id_absensi = id_absensi;

  try {
    const updatedAbsensi = await updateAbsensi(id_absensi, data);
    if (!updatedAbsensi)
      return res.status(200).json({ message: "Absensi not found" });
    return res
      .status(200)
      .json({ message: "Absensi updated successfully", data: updatedAbsensi });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller untuk menghapus absensi berdasarkan ID absensi
export const deleteAbsensiController = async (req: Request, res: Response) => {
  const id_absensi = req.params.id_absensi;

  try {
    const result = await deleteAbsensiById(id_absensi);
    if (!result) {
      return res
        .status(200)
        .json({ message: "Absensi not found or could not be deleted" });
    } else {
      return res.status(200).json({ message: "Absensi deleted successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
