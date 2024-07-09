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
exports.deleteKelasById = exports.updateKelas = exports.getKelasByGuruId = exports.getKelasById = exports.getAllKelas = exports.createKelas = void 0;
const firebase_1 = require("../firebase");
const createKelas = (id_guru, nama_kelas) => __awaiter(void 0, void 0, void 0, function* () {
    const kelasData = {
        id_kelas: firebase_1.db.collection("kelas").doc().id,
        id_guru,
        nama_kelas,
    };
    yield firebase_1.db.collection("kelas").doc(kelasData.id_kelas).set(kelasData);
    return kelasData;
});
exports.createKelas = createKelas;
const getAllKelas = () => __awaiter(void 0, void 0, void 0, function* () {
    const snapshot = yield firebase_1.db.collection("kelas").get();
    return snapshot.docs.map((doc) => doc.data());
});
exports.getAllKelas = getAllKelas;
const getKelasById = (KelasId) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield firebase_1.db.collection("kelas").doc(KelasId).get();
    if (!doc.exists)
        return null;
    return doc.data();
});
exports.getKelasById = getKelasById;
const getKelasByGuruId = (guruId) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield firebase_1.db.collection("kelas").where("id_guru", "==", guruId).get();
    if (doc.empty)
        return null;
    const KelasData = doc.docs;
    return KelasData[0].data();
});
exports.getKelasByGuruId = getKelasByGuruId;
const updateKelas = (kelasId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const KelasData = yield (0, exports.getKelasById)(kelasId);
    if (!KelasData)
        return null;
    const KelasDoc = firebase_1.db.collection("kelas").doc(kelasId);
    const newKelasData = data;
    yield KelasDoc.update(newKelasData);
    return newKelasData;
});
exports.updateKelas = updateKelas;
const deleteKelasById = (kelasId) => __awaiter(void 0, void 0, void 0, function* () {
    const validKelas = yield (0, exports.getKelasById)(kelasId);
    if (!validKelas)
        return null;
    const KelasDoc = firebase_1.db.collection("kelas").doc(kelasId);
    yield KelasDoc.delete();
});
exports.deleteKelasById = deleteKelasById;
