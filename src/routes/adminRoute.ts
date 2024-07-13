import express from "express";
import {
  createAdminController,
  getAllAdminsController,
  getAdminByIdController,
  updateAdminController,
  deleteAdminController,
  loginAdminController,
  cekLoginAdmin,
  cekPassword,
} from "../controllers/adminContoller";
import { adminAuthMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/token", cekLoginAdmin);
router.post("/", adminAuthMiddleware, createAdminController);
router.get("/", adminAuthMiddleware, getAllAdminsController);
router.get("/:id", adminAuthMiddleware, getAdminByIdController);
router.put("/:id", adminAuthMiddleware, updateAdminController);
router.delete("/:id", adminAuthMiddleware, deleteAdminController);
router.post("/cekPassword/:id", adminAuthMiddleware, cekPassword);
router.post("/login", loginAdminController);

export default router;
