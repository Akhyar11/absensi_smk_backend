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
exports.deleteMapelController = exports.updateMapelController = exports.getMapelByIdController = exports.getAllMapelController = exports.createMapelController = void 0;
const mapelService_1 = require("../services/mapelService");
const createMapelController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nama_mapel } = req.body;
        const mapel = yield (0, mapelService_1.createMapel)(nama_mapel);
        res.status(201).json(mapel);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.createMapelController = createMapelController;
const getAllMapelController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mapels = yield (0, mapelService_1.getAllMapel)();
        res.status(200).json(mapels);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getAllMapelController = getAllMapelController;
const getMapelByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mapelId = req.params.id;
        const mapel = yield (0, mapelService_1.getMapelById)(mapelId);
        if (!mapel) {
            res.status(404).json({ message: "Mapel not found" });
        }
        else {
            res.status(200).json(mapel);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getMapelByIdController = getMapelByIdController;
const updateMapelController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mapelId = req.params.id;
        const { nama_mapel } = req.body;
        const updatedMapel = yield (0, mapelService_1.updateMapel)(mapelId, {
            nama_mapel,
            id_mapel: mapelId,
        });
        if (!updatedMapel) {
            res.status(404).json({ message: "Mapel not found" });
        }
        else {
            res.status(200).json(updatedMapel);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.updateMapelController = updateMapelController;
const deleteMapelController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mapelId = req.params.id;
        yield (0, mapelService_1.deleteMapelById)(mapelId);
        res.status(204).send();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.deleteMapelController = deleteMapelController;
