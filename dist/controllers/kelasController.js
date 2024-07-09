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
exports.deleteKelasController = exports.updateKelasController = exports.getKelasByIdContrller = exports.getKelasByGuruIdContrller = exports.getAllKelasController = exports.createKelasController = void 0;
const kelasService_1 = require("../services/kelasService");
const createKelasController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_guru, nama_kelas } = req.body;
    try {
        const kelasData = yield (0, kelasService_1.createKelas)(id_guru, nama_kelas);
        res
            .status(200)
            .json({ message: "Kelas created successfully", data: kelasData });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.createKelasController = createKelasController;
const getAllKelasController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const kelasData = yield (0, kelasService_1.getAllKelas)();
        res
            .status(200)
            .json({ message: "Get all kelas successfully", data: kelasData });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getAllKelasController = getAllKelasController;
const getKelasByGuruIdContrller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const guruId = req.params.guruId;
    try {
        const kelasData = yield (0, kelasService_1.getKelasByGuruId)(guruId);
        if (!kelasData)
            res.status(404).json({ message: "Cant find kelas by id guru" });
        res
            .status(200)
            .json({ message: "Get kelas by guru id successfully", data: kelasData });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getKelasByGuruIdContrller = getKelasByGuruIdContrller;
const getKelasByIdContrller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const kelasId = req.params.id;
    try {
        const kelasData = yield (0, kelasService_1.getKelasById)(kelasId);
        if (!kelasData)
            res.status(404).json({ message: "Cant find kelas by kelas id" });
        res
            .status(200)
            .json({ message: "Get kelas by kelas id successfully", data: kelasData });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getKelasByIdContrller = getKelasByIdContrller;
const updateKelasController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_guru, nama_kelas } = req.body;
    const id_kelas = req.params.id;
    const data = {
        id_kelas,
        id_guru,
        nama_kelas,
    };
    try {
        const kelasData = yield (0, kelasService_1.updateKelas)(id_kelas, data);
        if (!kelasData)
            res
                .status(401)
                .json({ message: "Cant update kelas, cek your parameter" });
        res
            .status(200)
            .json({ message: "Update kelas successfully", data: kelasData });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Sever Error" });
    }
});
exports.updateKelasController = updateKelasController;
const deleteKelasController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const kelasId = req.params.id;
    try {
        const kelasData = yield (0, kelasService_1.deleteKelasById)(kelasId);
        if (!kelasData)
            res.status(404).json({ message: "Cant delete kelas" });
        res
            .status(200)
            .json({ message: "Delete kelas successfully", data: kelasData });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Sever Error" });
    }
});
exports.deleteKelasController = deleteKelasController;
