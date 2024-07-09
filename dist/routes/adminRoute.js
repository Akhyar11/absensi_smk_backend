"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminContoller_1 = require("../controllers/adminContoller");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
router.post("/token", adminContoller_1.cekLoginAdmin);
router.post("/", authMiddleware_1.adminAuthMiddleware, adminContoller_1.createAdminController);
router.get("/", authMiddleware_1.adminAuthMiddleware, adminContoller_1.getAllAdminsController);
router.get("/:id", authMiddleware_1.adminAuthMiddleware, adminContoller_1.getAdminByIdController);
router.put("/:id", authMiddleware_1.adminAuthMiddleware, adminContoller_1.updateAdminController);
router.delete("/:id", authMiddleware_1.adminAuthMiddleware, adminContoller_1.deleteAdminController);
router.post("/login", adminContoller_1.loginAdminController);
exports.default = router;
