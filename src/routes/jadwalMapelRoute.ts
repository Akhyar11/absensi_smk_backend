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

router.use(authMiddleware);

router.post("/create", createJadwalMapelController);
router.get("/", getAllJadwalMapelController);
router.get("/:id", getJadwalMapelByIdController);
router.get("/guru/:guruId", getJadwalMapelByGuruIdController);
router.get("/kelas/:kelasId", getJadwalMapelByKelasIdController);
router.get("/mapel/:mapelId", getJadwalMapelByMapelIdController);
router.put("/:id", updateJadwalMapelController);
router.delete("/:id", deleteJadwalMapelController);

export default router;
