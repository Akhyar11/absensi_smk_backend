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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGuru = exports.updateGuru = exports.getGuruById = exports.getAllGuru = exports.createGuru = exports.loginGuru = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const firebase_1 = require("../firebase");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const loginGuru = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const guruSnapshot = yield firebase_1.db
        .collection("guru")
        .where("email", "==", email)
        .get();
    if (guruSnapshot.empty) {
        return "Guru not found";
    }
    const guruData = guruSnapshot.docs[0].data();
    const isPasswordValid = yield bcryptjs_1.default.compare(password, guruData.password);
    if (!isPasswordValid) {
        return "Invalid password";
    }
    const token = jsonwebtoken_1.default.sign({ uid: guruSnapshot.docs[0].id }, process.env.JWT_PRIVATKEY, {
        expiresIn: "1h",
    });
    yield updateTokenGuru(guruSnapshot.docs[0].id, token);
    return token;
});
exports.loginGuru = loginGuru;
const updateTokenGuru = (guruId, token) => __awaiter(void 0, void 0, void 0, function* () {
    const adminDoc = firebase_1.db.collection("guru").doc(guruId);
    const guru = (yield adminDoc.get()).data();
    if (guru) {
        const updateAdmin = {
            nama: guru.nama,
            email: guru.email,
            id_guru: guru.id_guru,
            password: guru.password,
            token: token || guru.token,
        };
        yield adminDoc.update(updateAdmin);
    }
});
const createGuru = (nama, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const guruData = {
        id_guru: firebase_1.db.collection("guru").doc().id,
        nama,
        email,
        password: hashedPassword,
        token: "",
    };
    yield firebase_1.db.collection("guru").doc(guruData.id_guru).set(guruData);
    return guruData;
});
exports.createGuru = createGuru;
const getAllGuru = () => __awaiter(void 0, void 0, void 0, function* () {
    const snapshot = yield firebase_1.db.collection("guru").get();
    return snapshot.docs.map((doc) => doc.data());
});
exports.getAllGuru = getAllGuru;
const getGuruById = (guruId) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield firebase_1.db.collection("guru").doc(guruId).get();
    if (!doc.exists)
        return null;
    return doc.data();
});
exports.getGuruById = getGuruById;
const updateGuru = (guruId, nama, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const guruDoc = firebase_1.db.collection("guru").doc(guruId);
    const guru = (yield guruDoc.get()).data();
    if (!guru) {
        return null;
    }
    const updatedGuru = {
        nama: nama || guru.nama,
        email: email || guru.email,
    };
    if (password) {
        updatedGuru.password = yield bcryptjs_1.default.hash(password, 10);
    }
    yield guruDoc.update(updatedGuru);
    return updatedGuru;
});
exports.updateGuru = updateGuru;
const deleteGuru = (guruId) => __awaiter(void 0, void 0, void 0, function* () {
    const guruDoc = firebase_1.db.collection("guru").doc(guruId);
    yield guruDoc.delete();
});
exports.deleteGuru = deleteGuru;
