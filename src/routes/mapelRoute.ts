import { Router } from "express";
import {
  createMapelController,
  getAllMapelController,
  getMapelByIdController,
  updateMapelController,
  deleteMapelController,
} from "../controllers/mapelController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.use(authMiddleware);

router.post("/create", createMapelController);
router.get("/", getAllMapelController);
router.get("/:id", getMapelByIdController);
router.put("/:id", updateMapelController);
router.delete("/:id", deleteMapelController);

export default router;
