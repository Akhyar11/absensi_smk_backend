import { Request, Response } from "express";
import {
  createKelas,
  deleteKelasById,
  getAllKelas,
  getKelasByGuruId,
  getKelasById,
  updateKelas,
} from "../services/kelasService";
import { Kelas } from "../models/kelas";

export const createKelasController = async (req: Request, res: Response) => {
  const { id_guru, nama_kelas } = req.body;
  try {
    const kelasData = await createKelas(id_guru, nama_kelas);
    res
      .status(200)
      .json({ message: "Kelas created successfully", data: kelasData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllKelasController = async (req: Request, res: Response) => {
  try {
    const kelasData = await getAllKelas();
    res
      .status(200)
      .json({ message: "Get all kelas successfully", data: kelasData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getKelasByGuruIdContrller = async (
  req: Request,
  res: Response
) => {
  const guruId = req.params.guruId;
  try {
    const kelasData = await getKelasByGuruId(guruId);
    if (!kelasData)
      res.status(404).json({ message: "Cant find kelas by id guru" });
    res
      .status(200)
      .json({ message: "Get kelas by guru id successfully", data: kelasData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getKelasByIdContrller = async (req: Request, res: Response) => {
  const kelasId = req.params.id;
  try {
    const kelasData = await getKelasById(kelasId);
    if (!kelasData)
      res.status(404).json({ message: "Cant find kelas by kelas id" });
    res
      .status(200)
      .json({ message: "Get kelas by kelas id successfully", data: kelasData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateKelasController = async (req: Request, res: Response) => {
  const { id_guru, nama_kelas } = req.body;
  const id_kelas = req.params.id;
  const data: Kelas = {
    id_kelas,
    id_guru,
    nama_kelas,
  };

  try {
    const kelasData = await updateKelas(id_kelas, data);
    if (!kelasData)
      res
        .status(401)
        .json({ message: "Cant update kelas, cek your parameter" });
    res
      .status(200)
      .json({ message: "Update kelas successfully", data: kelasData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Sever Error" });
  }
};

export const deleteKelasController = async (req: Request, res: Response) => {
  const kelasId = req.params.id;
  try {
    const kelasData = await deleteKelasById(kelasId);
    if (!kelasData) res.status(404).json({ message: "Cant delete kelas" });
    res
      .status(200)
      .json({ message: "Delete kelas successfully", data: kelasData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Sever Error" });
  }
};
