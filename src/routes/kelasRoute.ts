import { Router } from "express";
import {
  createKelasController,
  getAllKelasController,
  getKelasByIdContrller,
  updateKelasController,
  deleteKelasController,
  getKelasByGuruIdContrller,
} from "../controllers/kelasController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.use(authMiddleware);

router.post("/create", createKelasController);
router.get("/", getAllKelasController);
router.get("/:id", getKelasByIdContrller);
router.get("/guru/:guruId", getKelasByGuruIdContrller);
router.put("/:id", updateKelasController);
router.delete("/:id", deleteKelasController);

export default router;
