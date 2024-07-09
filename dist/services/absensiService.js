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
exports.updateAbsensi = exports.getAbsensiByJadwal = exports.getAbsensiBySiswa = exports.getAbsensiById = exports.getAllAbsensi = exports.createAbsensi = void 0;
const firebase_1 = require("../firebase");
const createAbsensi = (id_siswa, id_jadwal, kehadiran, keterangan, waktu_absen) => __awaiter(void 0, void 0, void 0, function* () {
    const absensiData = {
        id_absensi: firebase_1.db.collection("absensi").doc().id,
        id_siswa,
        id_jadwal,
        kehadiran,
        keterangan,
        waktu_absen,
    };
    yield firebase_1.db.collection("absensi").doc(absensiData.id_absensi).set(absensiData);
    return absensiData;
});
exports.createAbsensi = createAbsensi;
const getAllAbsensi = () => __awaiter(void 0, void 0, void 0, function* () {
    const snapshot = yield firebase_1.db.collection("absensi").get();
    return snapshot.docs.map((doc) => doc.data());
});
exports.getAllAbsensi = getAllAbsensi;
const getAbsensiById = (id_absensi) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield firebase_1.db.collection("absensi").doc(id_absensi).get();
    if (!doc.exists)
        return null;
    return doc.data();
});
exports.getAbsensiById = getAbsensiById;
const getAbsensiBySiswa = (id_siswa) => __awaiter(void 0, void 0, void 0, function* () {
    const snapshot = yield firebase_1.db
        .collection("absensi")
        .where("id_siswa", "==", id_siswa)
        .get();
    if (!snapshot.empty)
        return null;
    return snapshot.docs.map((doc) => doc.data());
});
exports.getAbsensiBySiswa = getAbsensiBySiswa;
const getAbsensiByJadwal = (id_jadwal) => __awaiter(void 0, void 0, void 0, function* () {
    const snapshot = yield firebase_1.db
        .collection("absensi")
        .where("id_jadwal", "==", id_jadwal)
        .get();
    if (!snapshot.empty)
        return null;
    return snapshot.docs.map((doc) => doc.data());
});
exports.getAbsensiByJadwal = getAbsensiByJadwal;
const updateAbsensi = (id_absensi, data) => __awaiter(void 0, void 0, void 0, function* () {
    const absensiDoc = firebase_1.db.collection("absensi").doc(id_absensi);
    const absensi = (yield absensiDoc.get()).data();
    if (!absensi)
        return null;
    const absensiData = data;
    yield absensiDoc.update(absensiData);
    return data;
});
exports.updateAbsensi = updateAbsensi;
