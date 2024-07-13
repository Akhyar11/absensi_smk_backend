import { Request, Response } from "express";
import {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  loginAdmin,
  getAdminByToken,
  cekPasswordById,
} from "../services/adminService";

export const cekLoginAdmin = async (req: Request, res: Response) => {
  const { token } = req.body;
  const msg = await getAdminByToken(token);
  res.status(200).json({ message: msg });
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

export const loginAdminController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const msg = await loginAdmin(email, password);
  res.status(200).json({ messege: msg });
};

export const createAdminController = async (req: Request, res: Response) => {
  try {
    const { nama, email, password } = req.body;
    const adminData = await createAdmin(nama, email, password);
    res
      .status(201)
      .json({ message: "Admin created successfully", data: adminData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getForCekAdmin = async (req: Request, res: Response) => {
  try {
    const admins = await getAllAdmins();
    if (admins.length > 0) return true;
    else return false;
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    return false;
  }
};

export const getAllAdminsController = async (req: Request, res: Response) => {
  try {
    const admins = await getAllAdmins();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAdminByIdController = async (req: Request, res: Response) => {
  try {
    const adminId = req.params.id;
    const admin = await getAdminById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateAdminController = async (req: Request, res: Response) => {
  try {
    const adminId = req.params.id;
    const { nama, email, password } = req.body;
    const updatedAdmin = await updateAdmin(adminId, nama, email, password);
    if (!updatedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res
      .status(200)
      .json({ message: "Admin updated successfully", data: updatedAdmin });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteAdminController = async (req: Request, res: Response) => {
  try {
    const adminId = req.params.id;
    await deleteAdmin(adminId);
    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
