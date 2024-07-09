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
} from "../controllers/guruController";

const router = express.Router();

router.post("/", adminAuthMiddleware, createGuruController);
router.get("/", authMiddleware, getAllGuruController);
router.get("/:id", authMiddleware, getGuruByIdController);
router.put("/:id", authMiddleware, updateGuruController);
router.delete("/:id", authMiddleware, deleteGuruController);
router.post("/login", loginGuruController);

export default router;
