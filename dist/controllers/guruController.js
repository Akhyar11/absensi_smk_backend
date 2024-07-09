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
exports.deleteGuruController = exports.updateGuruController = exports.getGuruByIdController = exports.getAllGuruController = exports.createGuruController = exports.getForCekGuru = exports.loginGuruController = void 0;
const guruService_1 = require("../services/guruService");
const loginGuruController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const msg = yield (0, guruService_1.loginGuru)(email, password);
        res.json({ message: msg });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});
exports.loginGuruController = loginGuruController;
const getForCekGuru = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const guruData = yield (0, guruService_1.getAllGuru)();
        if (guruData.length > 0)
            return true;
        else
            return false;
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
        return false;
    }
});
exports.getForCekGuru = getForCekGuru;
// Create Guru
const createGuruController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nama, email, password } = req.body;
    try {
        const guruData = yield (0, guruService_1.createGuru)(nama, email, password);
        res
            .status(201)
            .json({ message: "Guru created successfully", data: guruData });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});
exports.createGuruController = createGuruController;
// Get All Guru
const getAllGuruController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const guruList = yield (0, guruService_1.getAllGuru)();
        res.status(200).json(guruList);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});
exports.getAllGuruController = getAllGuruController;
// Get Guru By ID
const getGuruByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const guruData = yield (0, guruService_1.getGuruById)(id);
        if (!guruData) {
            return res.status(404).json({ message: "Guru not found" });
        }
        res.status(200).json(guruData);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});
exports.getGuruByIdController = getGuruByIdController;
// Update Guru
const updateGuruController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nama, email, password } = req.body;
    try {
        const updatedGuru = yield (0, guruService_1.updateGuru)(id, nama, email, password);
        if (!updatedGuru) {
            return res.status(404).json({ message: "Guru not found" });
        }
        res
            .status(200)
            .json({ message: "Guru updated successfully", data: updatedGuru });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});
exports.updateGuruController = updateGuruController;
// Delete Guru
const deleteGuruController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield (0, guruService_1.deleteGuru)(id);
        res.status(200).json({ message: "Guru deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});
exports.deleteGuruController = deleteGuruController;
