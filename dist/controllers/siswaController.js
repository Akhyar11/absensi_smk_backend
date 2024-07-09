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
exports.deleteSiswaController = exports.updateSiswaController = exports.getSiswaByKelasController = exports.getSiswaByTokenController = exports.getSiswaByNisnController = exports.getSiswaByIdController = exports.getAllSiswaController = exports.createSiswaController = void 0;
const siswaService_1 = require("../services/siswaService");
const createSiswaController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_kelas, nisn, nama, jk, alamat, tg_masuk, tg_lahir } = req.body;
        const siswa = yield (0, siswaService_1.createSiswa)(id_kelas, nisn, nama, jk, alamat, tg_masuk, tg_lahir);
        res.status(201).json(siswa);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.createSiswaController = createSiswaController;
const getAllSiswaController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const siswas = yield (0, siswaService_1.getAllSiswa)();
        res.status(200).json(siswas);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getAllSiswaController = getAllSiswaController;
const getSiswaByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const siswaId = req.params.id;
        const siswa = yield (0, siswaService_1.getSiswaById)(siswaId);
        if (!siswa) {
            res.status(404).json({ error: "Siswa not found" });
        }
        else {
            res.status(200).json(siswa);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getSiswaByIdController = getSiswaByIdController;
const getSiswaByNisnController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nisn = req.params.nisn;
        const siswa = yield (0, siswaService_1.getSiswaByNisn)(nisn);
        if (!siswa) {
            res.status(404).json({ error: "Siswa not found" });
        }
        else {
            res.status(200).json(siswa);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getSiswaByNisnController = getSiswaByNisnController;
const getSiswaByTokenController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.params.token;
        const siswa = yield (0, siswaService_1.getSiswaByToken)(token);
        if (!siswa) {
            res.status(404).json({ error: "Siswa not found" });
        }
        else {
            res.status(200).json(siswa);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getSiswaByTokenController = getSiswaByTokenController;
const getSiswaByKelasController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const kelasId = req.params.kelasId;
        const siswa = yield (0, siswaService_1.getSiswaByKelas)(kelasId);
        if (!siswa) {
            res.status(404).json({ error: "Siswa not found" });
        }
        else {
            res.status(200).json(siswa);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getSiswaByKelasController = getSiswaByKelasController;
const updateSiswaController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const siswaId = req.params.id;
        const { id_kelas, nisn, nama, jk, alamat, tg_masuk, tg_lahir, token } = req.body;
        const updatedSiswa = yield (0, siswaService_1.updateSiswa)(siswaId, {
            id_siswa: siswaId,
            id_kelas,
            nisn,
            nama,
            jk,
            alamat,
            tg_masuk,
            tg_lahir,
            token,
        });
        if (!updatedSiswa) {
            res.status(404).json({ error: "Siswa not found" });
        }
        else {
            res.status(200).json(updatedSiswa);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.updateSiswaController = updateSiswaController;
const deleteSiswaController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const siswaId = req.params.id;
        yield (0, siswaService_1.deleteSiswaById)(siswaId);
        res.status(204).send();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.deleteSiswaController = deleteSiswaController;
