import { Router } from "express";
import {
  createAbsensiController,
  getAllAbsensiController,
  getAbsensiByIdController,
  getAbsensiBySiswaController,
  getAbsensiByJadwalController,
  updateAbsensiController,
  deleteAbsensiController,
  validasiAbsensiController,
} from "../controllers/absensiController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/validasiAbsensi", validasiAbsensiController);

// Endpoint untuk membuat absensi baru
router.post("/create", authMiddleware, createAbsensiController);

// Endpoint untuk mengambil semua data absensi
router.get("/", authMiddleware, getAllAbsensiController);

// Endpoint untuk mengambil data absensi berdasarkan ID absensi
router.get("/:id_absensi", authMiddleware, getAbsensiByIdController);

// Endpoint untuk mengambil data absensi berdasarkan ID siswa
router.get("/siswa/:id_siswa", authMiddleware, getAbsensiBySiswaController);

// Endpoint untuk mengambil data absensi berdasarkan ID jadwal
router.get("/jadwal/:id_jadwal", authMiddleware, getAbsensiByJadwalController);

// Endpoint untuk mengupdate data absensi berdasarkan ID absensi
router.put("/:id_absensi", authMiddleware, updateAbsensiController);

// Endpoint untuk menghapus data absensi berdasarkan ID absensi
router.delete("/:id_absensi", authMiddleware, deleteAbsensiController);

export default router;
