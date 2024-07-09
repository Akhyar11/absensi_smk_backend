import { Router } from "express";
import {
  createSiswaController,
  getAllSiswaController,
  getSiswaByIdController,
  updateSiswaController,
  deleteSiswaController,
  getSiswaByNisnController,
  getSiswaByTokenController,
  getSiswaByKelasController,
} from "../controllers/siswaController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.use(authMiddleware);

router.post("/create", createSiswaController);
router.get("/", getAllSiswaController);
router.get("/:id", getSiswaByIdController);
router.get("/nisn/:nisn", getSiswaByNisnController);
router.get("/token/:token", getSiswaByTokenController);
router.get("/kelas/:kelasId", getSiswaByKelasController);
router.put("/:id", updateSiswaController);
router.delete("/:id", deleteSiswaController);

export default router;
