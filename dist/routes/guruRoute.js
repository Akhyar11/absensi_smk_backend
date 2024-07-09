"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const guruController_1 = require("../controllers/guruController");
const router = express_1.default.Router();
router.post("/", authMiddleware_1.adminAuthMiddleware, guruController_1.createGuruController);
router.get("/", authMiddleware_1.authMiddleware, guruController_1.getAllGuruController);
router.get("/:id", authMiddleware_1.authMiddleware, guruController_1.getGuruByIdController);
router.put("/:id", authMiddleware_1.authMiddleware, guruController_1.updateGuruController);
router.delete("/:id", authMiddleware_1.authMiddleware, guruController_1.deleteGuruController);
router.post("/login", guruController_1.loginGuruController);
exports.default = router;
