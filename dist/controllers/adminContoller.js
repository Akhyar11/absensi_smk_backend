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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAdminController = exports.updateAdminController = exports.getAdminByIdController = exports.getAllAdminsController = exports.getForCekAdmin = exports.createAdminController = exports.loginAdminController = exports.cekLoginAdmin = void 0;
const adminService_1 = require("../services/adminService");
const cekLoginAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    const msg = yield (0, adminService_1.getAdminByToken)(token);
    res.status(200).json({ message: msg });
});
exports.cekLoginAdmin = cekLoginAdmin;
const loginAdminController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const msg = yield (0, adminService_1.loginAdmin)(email, password);
    res.status(200).json({ messege: msg });
});
exports.loginAdminController = loginAdminController;
const createAdminController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nama, email, password } = req.body;
        const adminData = yield (0, adminService_1.createAdmin)(nama, email, password);
        res
            .status(201)
            .json({ message: "Admin created successfully", data: adminData });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.createAdminController = createAdminController;
const getForCekAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admins = yield (0, adminService_1.getAllAdmins)();
        if (admins.length > 0)
            return true;
        else
            return false;
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
        return false;
    }
});
exports.getForCekAdmin = getForCekAdmin;
const getAllAdminsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admins = yield (0, adminService_1.getAllAdmins)();
        res.status(200).json(admins);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getAllAdminsController = getAllAdminsController;
const getAdminByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminId = req.params.id;
        const admin = yield (0, adminService_1.getAdminById)(adminId);
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.status(200).json(admin);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getAdminByIdController = getAdminByIdController;
const updateAdminController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminId = req.params.id;
        const { nama, email, password } = req.body;
        const updatedAdmin = yield (0, adminService_1.updateAdmin)(adminId, nama, email, password);
        if (!updatedAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res
            .status(200)
            .json({ message: "Admin updated successfully", data: updatedAdmin });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.updateAdminController = updateAdminController;
const deleteAdminController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminId = req.params.id;
        yield (0, adminService_1.deleteAdmin)(adminId);
        res.status(200).json({ message: "Admin deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.deleteAdminController = deleteAdminController;
