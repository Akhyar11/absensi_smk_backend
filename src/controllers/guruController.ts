import { Request, Response } from "express";
import {
  createGuru,
  getAllGuru,
  getGuruById,
  updateGuru,
  deleteGuru,
  loginGuru,
  cekPasswordById,
  getGuruByToken,
  getGuruByToken2,
} from "../services/guruService";

export const cekLoginGuru = async (req: Request, res: Response) => {
  const { token } = req.body;
  const msg = await getGuruByToken(token);
  res.status(200).json({ message: msg });
};

export const getGuruByTokenController = async (req: Request, res: Response) => {
  const { token } = req.params;
  const msg = await getGuruByToken2(token);
  res.status(200).json({ message: msg });
};

export const loginGuruController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const msg = await loginGuru(email, password);
    res.json({ message: msg });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const cekPassword = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { password } = req.body;
  try {
    const msg = await cekPasswordById(id, password);
    res.status(200).json({ message: msg });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getForCekGuru = async (req: Request, res: Response) => {
  try {
    const guruData = await getAllGuru();
    if (guruData.length > 0) return true;
    else return false;
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    return false;
  }
};

// Create Guru
export const createGuruController = async (req: Request, res: Response) => {
  const { nama, email, password } = req.body;

  try {
    const guruData = await createGuru(nama, email, password);
    res
      .status(201)
      .json({ message: "Guru created successfully", data: guruData });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Get All Guru
export const getAllGuruController = async (req: Request, res: Response) => {
  try {
    const guruList = await getAllGuru();
    res.status(200).json(guruList);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Get Guru By ID
export const getGuruByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const guruData = await getGuruById(id);
    if (!guruData) {
      return res.status(404).json({ message: "Guru not found" });
    }
    res.status(200).json(guruData);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Update Guru
export const updateGuruController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nama, email, password } = req.body;

  try {
    const updatedGuru = await updateGuru(id, nama, email, password);
    if (!updatedGuru) {
      return res.status(404).json({ message: "Guru not found" });
    }
    res
      .status(200)
      .json({ message: "Guru updated successfully", data: updatedGuru });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Delete Guru
export const deleteGuruController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await deleteGuru(id);
    res.status(200).json({ message: "Guru deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
