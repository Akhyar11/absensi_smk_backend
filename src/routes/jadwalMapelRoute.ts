import { Router } from "express";
import {
  createJadwalMapelController,
  getAllJadwalMapelController,
  getJadwalMapelByIdController,
  updateJadwalMapelController,
  deleteJadwalMapelController,
  getJadwalMapelByGuruIdController,
  getJadwalMapelByKelasIdController,
  getJadwalMapelByMapelIdController,
} from "../controllers/jadwalMapleController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/create", authMiddleware, createJadwalMapelController);
router.get("/", authMiddleware, getAllJadwalMapelController);
router.get("/:id", authMiddleware, getJadwalMapelByIdController);
router.get("/guru/:guruId", authMiddleware, getJadwalMapelByGuruIdController);
router.get("/kelas/:kelasId", getJadwalMapelByKelasIdController);
router.get(
  "/mapel/:mapelId",
  authMiddleware,
  getJadwalMapelByMapelIdController
);
router.put("/:id", authMiddleware, updateJadwalMapelController);
router.delete("/:id", authMiddleware, deleteJadwalMapelController);

export default router;
