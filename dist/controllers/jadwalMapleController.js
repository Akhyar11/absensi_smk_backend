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
exports.deleteJadwalMapelController = exports.updateJadwalMapelController = exports.getJadwalMapelByMapelIdController = exports.getJadwalMapelByKelasIdController = exports.getJadwalMapelByGuruIdController = exports.getJadwalMapelByIdController = exports.getAllJadwalMapelController = exports.createJadwalMapelController = void 0;
const jadwalMapelService_1 = require("../services/jadwalMapelService");
const createJadwalMapelController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_guru, id_kelas, id_mapel, jam_mulai, jam_berahir } = req.body;
        const jadwalMapel = yield (0, jadwalMapelService_1.createJadwalMapel)(id_guru, id_kelas, id_mapel, jam_mulai, jam_berahir);
        res.status(201).json(jadwalMapel);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.createJadwalMapelController = createJadwalMapelController;
const getAllJadwalMapelController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jadwalMapels = yield (0, jadwalMapelService_1.getAllJadwalMapel)();
        res.status(200).json(jadwalMapels);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getAllJadwalMapelController = getAllJadwalMapelController;
const getJadwalMapelByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jadwalMapelId = req.params.id;
        const jadwalMapel = yield (0, jadwalMapelService_1.getJadwalMapelById)(jadwalMapelId);
        if (!jadwalMapel) {
            res.status(404).json({ error: "JadwalMapel not found" });
        }
        else {
            res.status(200).json(jadwalMapel);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getJadwalMapelByIdController = getJadwalMapelByIdController;
const getJadwalMapelByGuruIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const guruId = req.params.guruId;
        const jadwalMapel = yield (0, jadwalMapelService_1.getJadwalMapelByGuruId)(guruId);
        if (!jadwalMapel) {
            res.status(404).json({ error: "JadwalMapel not found" });
        }
        else {
            res.status(200).json(jadwalMapel);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getJadwalMapelByGuruIdController = getJadwalMapelByGuruIdController;
const getJadwalMapelByKelasIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const kelasId = req.params.kelasId;
        const jadwalMapel = yield (0, jadwalMapelService_1.getJadwalMapelByKelasId)(kelasId);
        if (!jadwalMapel) {
            res.status(404).json({ error: "JadwalMapel not found" });
        }
        else {
            res.status(200).json(jadwalMapel);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getJadwalMapelByKelasIdController = getJadwalMapelByKelasIdController;
const getJadwalMapelByMapelIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mapelId = req.params.mapelId;
        const jadwalMapel = yield (0, jadwalMapelService_1.getJadwalMapelByMapelId)(mapelId);
        if (!jadwalMapel) {
            res.status(404).json({ error: "JadwalMapel not found" });
        }
        else {
            res.status(200).json(jadwalMapel);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getJadwalMapelByMapelIdController = getJadwalMapelByMapelIdController;
const updateJadwalMapelController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jadwalMapelId = req.params.id;
        const { id_guru, id_kelas, id_mapel, jam_mulai, jam_berahir } = req.body;
        const updatedJadwalMapel = yield (0, jadwalMapelService_1.updateJadwalMapel)(jadwalMapelId, {
            id_jadwal_mapel: jadwalMapelId,
            id_guru,
            id_kelas,
            id_mapel,
            jam_mulai,
            jam_berahir,
        });
        if (!updatedJadwalMapel) {
            res.status(404).json({ error: "JadwalMapel not found" });
        }
        else {
            res.status(200).json(updatedJadwalMapel);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.updateJadwalMapelController = updateJadwalMapelController;
const deleteJadwalMapelController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jadwalMapelId = req.params.id;
        yield (0, jadwalMapelService_1.deleteJadwalMapelById)(jadwalMapelId);
        res.status(204).send();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.deleteJadwalMapelController = deleteJadwalMapelController;
