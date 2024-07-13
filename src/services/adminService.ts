import { db } from "../firebase";
import { Admin } from "../models/admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

export const cekPasswordById = async (id_admin: string, password: string) => {
  const adminSnapshot = await db.collection("admins").doc(id_admin).get();
  if (!adminSnapshot.exists) return "Admin not found";

  const adminData = adminSnapshot.data() as Admin;
  const isPasswordValid = await bcrypt.compare(password, adminData.password);

  if (!isPasswordValid) return "wrong password";

  return "valid password";
};

export const getAdminByToken = async (token: string) => {
  try {
    const adminSnapshot = await db
      .collection("admins")
      .where("token", "==", token)
      .get();
    if (adminSnapshot.empty) {
      return "empty admin";
    }

    const payload = jwt.verify(token, process.env.JWT_PRIVATKEY as string);
    const admin = await getAdminById((payload as jwt.JwtPayload).uid);
    if (!admin) return "your not admin";
    return "your is admin";
  } catch (error) {
    console.log(error);
    return "Internal server error";
  }
};

export const loginAdmin = async (email: string, password: string) => {
  try {
    const adminSnapshot = await db
      .collection("admins")
      .where("email", "==", email)
      .get();

    if (adminSnapshot.empty) {
      return "empty admin";
    }

    const adminData = adminSnapshot.docs[0].data();
    const isPasswordValid = await bcrypt.compare(password, adminData.password);

    if (!isPasswordValid) {
      return "Invalid email or password";
    }

    const token = jwt.sign(
      { uid: adminSnapshot.docs[0].id },
      process.env.JWT_PRIVATKEY as string,
      {
        expiresIn: "1h",
      }
    );

    await updateTokenAdmin(adminSnapshot.docs[0].id, token);
    return { token };
  } catch (error) {
    console.log(error);
    return "Invalid error from server";
  }
};

const updateTokenAdmin = async (adminId: string, token: string) => {
  const adminDoc = db.collection("admins").doc(adminId);
  const admin = (await adminDoc.get()).data() as Admin;
  if (admin) {
    const updateAdmin: Partial<Admin> = {
      nama: admin.nama,
      email: admin.email,
      id_admin: admin.id_admin,
      password: admin.password,
      token: token || admin.token,
    };

    await adminDoc.update(updateAdmin);
  }
};

export const createAdmin = async (
  nama: string,
  email: string,
  password: string
): Promise<Admin> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const adminData: Admin = {
    id_admin: db.collection("admins").doc().id,
    nama,
    email,
    password: hashedPassword,
    token: "",
  };

  await db.collection("admins").doc(adminData.id_admin).set(adminData);
  return adminData;
};

export const getAllAdmins = async (): Promise<Admin[]> => {
  const snapshot = await db.collection("admins").get();
  return snapshot.docs.map((doc) => doc.data() as Admin);
};

export const getAdminById = async (adminId: string): Promise<Admin | null> => {
  const doc = await db.collection("admins").doc(adminId).get();
  if (!doc.exists) return null;
  return doc.data() as Admin;
};

export const updateAdmin = async (
  adminId: string,
  nama: string,
  email: string,
  password?: string
): Promise<Partial<Admin | null>> => {
  const adminDoc = db.collection("admins").doc(adminId);
  const admin = (await adminDoc.get()).data() as Admin;

  if (!admin) return null;

  const updatedAdmin: Partial<Admin> = {
    nama: nama || admin.nama,
    email: email || admin.email,
  };

  if (password) {
    updatedAdmin.password = await bcrypt.hash(password, 10);
  }

  await adminDoc.update(updatedAdmin);
  return updatedAdmin;
};

export const deleteAdmin = async (adminId: string): Promise<void> => {
  const adminDoc = db.collection("admins").doc(adminId);
  await adminDoc.delete();
};
