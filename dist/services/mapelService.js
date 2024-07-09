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
exports.deleteMapelById = exports.updateMapel = exports.getMapelById = exports.getAllMapel = exports.createMapel = void 0;
const firebase_1 = require("../firebase");
const createMapel = (nama_mapel) => __awaiter(void 0, void 0, void 0, function* () {
    const mapelData = {
        id_mapel: firebase_1.db.collection("mapel").doc().id,
        nama_mapel,
    };
    yield firebase_1.db.collection("mapel").doc(mapelData.id_mapel).set(mapelData);
    return mapelData;
});
exports.createMapel = createMapel;
const getAllMapel = () => __awaiter(void 0, void 0, void 0, function* () {
    const snapshot = yield firebase_1.db.collection("mapel").get();
    return snapshot.docs.map((doc) => doc.data());
});
exports.getAllMapel = getAllMapel;
const getMapelById = (mapelId) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield firebase_1.db.collection("mapel").doc(mapelId).get();
    if (!doc.exists)
        return null;
    return doc.data();
});
exports.getMapelById = getMapelById;
const updateMapel = (mapelId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const MapelData = yield (0, exports.getMapelById)(mapelId);
    if (!MapelData)
        return null;
    const MapelDoc = firebase_1.db.collection("mapel").doc(mapelId);
    const newMapelData = data;
    yield MapelDoc.update(newMapelData);
    return newMapelData;
});
exports.updateMapel = updateMapel;
const deleteMapelById = (mapelId) => __awaiter(void 0, void 0, void 0, function* () {
    const validMapel = yield (0, exports.getMapelById)(mapelId);
    if (!validMapel)
        return null;
    const MapelDoc = firebase_1.db.collection("mapel").doc(mapelId);
    yield MapelDoc.delete();
});
exports.deleteMapelById = deleteMapelById;
