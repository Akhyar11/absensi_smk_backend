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
exports.deleteJadwalMapelById = exports.updateJadwalMapel = exports.getJadwalMapelByMapelId = exports.getJadwalMapelByKelasId = exports.getJadwalMapelByGuruId = exports.getJadwalMapelById = exports.getAllJadwalMapel = exports.createJadwalMapel = void 0;
const firebase_1 = require("../firebase");
// Create JadwalMapel
const createJadwalMapel = (id_guru, id_kelas, id_mapel, jam_mulai, jam_berahir) => __awaiter(void 0, void 0, void 0, function* () {
    const JadwalMapelData = {
        id_jadwal_mapel: firebase_1.db.collection("jadwalMapel").doc().id,
        id_guru,
        id_kelas,
        id_mapel,
        jam_mulai,
        jam_berahir,
    };
    yield firebase_1.db
        .collection("jadwalMapel")
        .doc(JadwalMapelData.id_jadwal_mapel)
        .set(JadwalMapelData);
    return JadwalMapelData;
});
exports.createJadwalMapel = createJadwalMapel;
// Read all JadwalMapel
const getAllJadwalMapel = () => __awaiter(void 0, void 0, void 0, function* () {
    const snapshot = yield firebase_1.db.collection("jadwalMapel").get();
    return snapshot.docs.map((doc) => doc.data());
});
exports.getAllJadwalMapel = getAllJadwalMapel;
// Read by id JadwalMapel
const getJadwalMapelById = (JadwalMapelId) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield firebase_1.db.collection("jadwalMapel").doc(JadwalMapelId).get();
    if (!doc.exists)
        return null;
    return doc.data();
});
exports.getJadwalMapelById = getJadwalMapelById;
// Read by id_guru JadwalMapel
const getJadwalMapelByGuruId = (guruId) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield firebase_1.db
        .collection("jadwalMapel")
        .where("id_guru", "==", guruId)
        .get();
    if (doc.empty)
        return null;
    const JadwalMapelData = doc.docs;
    return JadwalMapelData[0].data();
});
exports.getJadwalMapelByGuruId = getJadwalMapelByGuruId;
// Read by id_kelas JadwalMapel
const getJadwalMapelByKelasId = (kelasId) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield firebase_1.db
        .collection("jadwalMapel")
        .where("id_kelas", "==", kelasId)
        .get();
    if (doc.empty)
        return null;
    const JadwalMapelData = doc.docs;
    return JadwalMapelData[0].data();
});
exports.getJadwalMapelByKelasId = getJadwalMapelByKelasId;
// Read by id_mapel JadwalMapel
const getJadwalMapelByMapelId = (mapelId) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield firebase_1.db
        .collection("jadwalMapel")
        .where("id_mapel", "==", mapelId)
        .get();
    if (doc.empty)
        return null;
    const JadwalMapelData = doc.docs;
    return JadwalMapelData[0].data();
});
exports.getJadwalMapelByMapelId = getJadwalMapelByMapelId;
// Update JadwalMapel
const updateJadwalMapel = (JadwalMapelId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const JadwalMapelData = yield (0, exports.getJadwalMapelById)(JadwalMapelId);
    if (!JadwalMapelData)
        return null;
    const JadwalMapelDoc = firebase_1.db.collection("jadwalMapel").doc(JadwalMapelId);
    const newJadwalMapelData = data;
    yield JadwalMapelDoc.update(newJadwalMapelData);
    return newJadwalMapelData;
});
exports.updateJadwalMapel = updateJadwalMapel;
// Delete by id JadwalMapel
const deleteJadwalMapelById = (JadwalMapelId) => __awaiter(void 0, void 0, void 0, function* () {
    const validJadwalMapel = yield (0, exports.getJadwalMapelById)(JadwalMapelId);
    if (!validJadwalMapel)
        return null;
    const JadwalMapelDoc = firebase_1.db.collection("jadwalMapel").doc(JadwalMapelId);
    yield JadwalMapelDoc.delete();
});
exports.deleteJadwalMapelById = deleteJadwalMapelById;
