import { Request, Response } from "express";
import {
  createSiswa,
  deleteSiswaById,
  getSiswaById,
  getAllSiswa,
  updateSiswa,
  getSiswaByNisn,
  getSiswaByToken,
  getSiswaByKelas,
} from "../services/siswaService";

export const createSiswaController = async (req: Request, res: Response) => {
  try {
    const { id_kelas, nisn, nama, jk, alamat, tg_masuk, tg_lahir } = req.body;
    const siswa = await createSiswa(
      id_kelas,
      nisn,
      nama,
      jk,
      alamat,
      tg_masuk,
      tg_lahir
    );
    res.status(201).json({ message: "Siswa created successfully", siswa });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllSiswaController = async (req: Request, res: Response) => {
  try {
    const siswas = await getAllSiswa();
    res.status(200).json(siswas);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getSiswaByIdController = async (req: Request, res: Response) => {
  try {
    const siswaId = req.params.id;
    const siswa = await getSiswaById(siswaId);
    if (!siswa) {
      res.status(404).json({ error: "Siswa not found" });
    } else {
      res.status(200).json(siswa);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getSiswaByNisnController = async (req: Request, res: Response) => {
  try {
    const nisn = req.params.nisn;
    const siswa = await getSiswaByNisn(nisn);
    if (!siswa) {
      res.status(404).json({ error: "Siswa not found" });
    } else {
      res.status(200).json(siswa);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getSiswaByTokenController = async (
  req: Request,
  res: Response
) => {
  try {
    const token = req.params.token;
    const siswa = await getSiswaByToken(token);
    if (!siswa) {
      res.status(404).json({ error: "Siswa not found" });
    } else {
      res.status(200).json(siswa);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getSiswaByKelasController = async (
  req: Request,
  res: Response
) => {
  try {
    const kelasId = req.params.kelasId;
    const siswa = await getSiswaByKelas(kelasId);
    if (!siswa) {
      res.status(404).json({ error: "Siswa not found" });
    } else {
      res.status(200).json(siswa);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateSiswaController = async (req: Request, res: Response) => {
  try {
    const siswaId = req.params.id;
    const { id_kelas, nisn, nama, jk, alamat, tg_masuk, tg_lahir, token } =
      req.body;
    const updatedSiswa = await updateSiswa(siswaId, {
      id_siswa: siswaId,
      id_kelas,
      nisn,
      nama,
      jk,
      alamat,
      tg_masuk,
      tg_lahir,
      token,
    });
    if (!updatedSiswa) {
      res.status(404).json({ error: "Siswa not found" });
    } else {
      res.status(200).json({ message: "Siswa updated" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteSiswaController = async (req: Request, res: Response) => {
  try {
    const siswaId = req.params.id;
    await deleteSiswaById(siswaId);
    res.status(200).json({ message: "Siswa deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
