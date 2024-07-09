"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = exports.adminAuthMiddleware = void 0;
const adminContoller_1 = require("../controllers/adminContoller");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const privetKey_json_1 = __importDefault(require("../assets/privetKey.json"));
const adminService_1 = require("../services/adminService");
const adminAuthMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const validAdmin = yield (0, adminContoller_1.getForCekAdmin)(req, res);
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split("Bearer ")[1];
    if (validAdmin) {
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        try {
            const payload = jsonwebtoken_1.default.verify(token, privetKey_json_1.default.value);
            console.log(payload);
            const admin = yield (0, adminService_1.getAdminById)(payload.uid);
            if (!admin)
                return res.status(401).json({ message: "your not admin" });
            next();
        }
        catch (error) {
            console.log(error);
            return res.status(401).json({ message: "Unauthorized" });
        }
    }
    else
        next();
});
exports.adminAuthMiddleware = adminAuthMiddleware;
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const token = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split("Bearer ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        jsonwebtoken_1.default.verify(token, privetKey_json_1.default.value);
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Unauthorized" });
    }
});
exports.authMiddleware = authMiddleware;
