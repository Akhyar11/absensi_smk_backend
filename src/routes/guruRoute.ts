import express from "express";
import {
  adminAuthMiddleware,
  authMiddleware,
} from "../middlewares/authMiddleware";
import {
  createGuruController,
  getAllGuruController,
  getGuruByIdController,
  updateGuruController,
  deleteGuruController,
  loginGuruController,
  cekPassword,
  cekLoginGuru,
  getGuruByTokenController,
} from "../controllers/guruController";

const router = express.Router();

router.post("/token", cekLoginGuru);
router.post("/", adminAuthMiddleware, createGuruController);
router.post("/cekPassword/:id", authMiddleware, cekPassword);
router.get("/", authMiddleware, getAllGuruController);
router.get("/:id", authMiddleware, getGuruByIdController);
router.get("/token/:token", authMiddleware, getGuruByTokenController);
router.put("/:id", authMiddleware, updateGuruController);
router.delete("/:id", authMiddleware, deleteGuruController);
router.post("/login", loginGuruController);

export default router;
