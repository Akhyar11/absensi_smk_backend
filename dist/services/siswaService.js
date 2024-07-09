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
exports.deleteSiswaById = exports.updateSiswa = exports.getSiswaByKelas = exports.getSiswaByToken = exports.getSiswaByNisn = exports.getSiswaById = exports.getAllSiswa = exports.createSiswa = void 0;
const firebase_1 = require("../firebase");
// Create Siswa
const createSiswa = (id_kelas, nisn, nama, jk, alamat, tg_masuk, tg_lahir) => __awaiter(void 0, void 0, void 0, function* () {
    const siswaData = {
        id_siswa: firebase_1.db.collection("siswa").doc().id,
        id_kelas,
        nisn,
        nama,
        jk,
        alamat,
        tg_masuk,
        tg_lahir,
        token: "",
    };
    yield firebase_1.db.collection("siswa").doc(siswaData.id_siswa).set(siswaData);
    return siswaData;
});
exports.createSiswa = createSiswa;
// Read all siswa
const getAllSiswa = () => __awaiter(void 0, void 0, void 0, function* () {
    const snapshot = yield firebase_1.db.collection("siswa").get();
    return snapshot.docs.map((doc) => doc.data());
});
exports.getAllSiswa = getAllSiswa;
// Read by id siswa
const getSiswaById = (siswaId) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield firebase_1.db.collection("siswa").doc(siswaId).get();
    if (!doc.exists)
        return null;
    return doc.data();
});
exports.getSiswaById = getSiswaById;
// Read by nisn siswa
const getSiswaByNisn = (nisn) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield firebase_1.db.collection("siswa").where("nisn", "==", nisn).get();
    if (doc.empty)
        return null;
    const siswaData = doc.docs;
    return siswaData[0].data();
});
exports.getSiswaByNisn = getSiswaByNisn;
// Read by token siswa
const getSiswaByToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield firebase_1.db.collection("siswa").where("token", "==", token).get();
    if (doc.empty)
        return null;
    const siswaData = doc.docs;
    return siswaData[0].data();
});
exports.getSiswaByToken = getSiswaByToken;
// Read by kelas siswa
const getSiswaByKelas = (kelasId) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield firebase_1.db
        .collection("siswa")
        .where("id_kelas", "==", kelasId)
        .get();
    if (doc.empty)
        return null;
    const siswaData = doc.docs;
    return siswaData[0].data();
});
exports.getSiswaByKelas = getSiswaByKelas;
// Update siswa
const updateSiswa = (siswaId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const siswaData = yield (0, exports.getSiswaById)(siswaId);
    if (!siswaData)
        return null;
    const siswaDoc = firebase_1.db.collection("siswa").doc(siswaId);
    const newSiswaData = data;
    yield siswaDoc.update(newSiswaData);
    return newSiswaData;
});
exports.updateSiswa = updateSiswa;
// Delete by id siswa
const deleteSiswaById = (siswaId) => __awaiter(void 0, void 0, void 0, function* () {
    const validSiswa = yield (0, exports.getSiswaById)(siswaId);
    if (!validSiswa)
        return null;
    const siswaDoc = firebase_1.db.collection("siswa").doc(siswaId);
    yield siswaDoc.delete();
});
exports.deleteSiswaById = deleteSiswaById;
