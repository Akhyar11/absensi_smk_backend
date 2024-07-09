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
exports.deleteAdmin = exports.updateAdmin = exports.getAdminById = exports.getAllAdmins = exports.createAdmin = exports.loginAdmin = exports.getAdminByToken = void 0;
const firebase_1 = require("../firebase");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const privetKey_json_1 = __importDefault(require("../assets/privetKey.json"));
const getAdminByToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminSnapshot = yield firebase_1.db
            .collection("admins")
            .where("token", "==", token)
            .get();
        if (adminSnapshot.empty) {
            return "empty admin";
        }
        const payload = jsonwebtoken_1.default.verify(token, privetKey_json_1.default.value);
        const admin = yield (0, exports.getAdminById)(payload.uid);
        if (!admin)
            return "your not admin";
        return "your is admin";
    }
    catch (error) {
        console.log(error);
        return "Internal server error";
    }
});
exports.getAdminByToken = getAdminByToken;
const loginAdmin = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminSnapshot = yield firebase_1.db
            .collection("admins")
            .where("email", "==", email)
            .get();
        if (adminSnapshot.empty) {
            return "empty admin";
        }
        const adminData = adminSnapshot.docs[0].data();
        const isPasswordValid = yield bcryptjs_1.default.compare(password, adminData.password);
        if (!isPasswordValid) {
            return "Invalid email or password";
        }
        const token = jsonwebtoken_1.default.sign({ uid: adminSnapshot.docs[0].id }, privetKey_json_1.default.value, {
            expiresIn: "1h",
        });
        yield updateTokenAdmin(adminSnapshot.docs[0].id, token);
        return { token };
    }
    catch (error) {
        console.log(error);
        return "Invalid error from server";
    }
});
exports.loginAdmin = loginAdmin;
const updateTokenAdmin = (adminId, token) => __awaiter(void 0, void 0, void 0, function* () {
    const adminDoc = firebase_1.db.collection("admins").doc(adminId);
    const admin = (yield adminDoc.get()).data();
    if (admin) {
        const updateAdmin = {
            nama: admin.nama,
            email: admin.email,
            id_admin: admin.id_admin,
            password: admin.password,
            token: token || admin.token,
        };
        yield adminDoc.update(updateAdmin);
    }
});
const createAdmin = (nama, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const adminData = {
        id_admin: firebase_1.db.collection("admins").doc().id,
        nama,
        email,
        password: hashedPassword,
        token: "",
    };
    yield firebase_1.db.collection("admins").doc(adminData.id_admin).set(adminData);
    return adminData;
});
exports.createAdmin = createAdmin;
const getAllAdmins = () => __awaiter(void 0, void 0, void 0, function* () {
    const snapshot = yield firebase_1.db.collection("admins").get();
    return snapshot.docs.map((doc) => doc.data());
});
exports.getAllAdmins = getAllAdmins;
const getAdminById = (adminId) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield firebase_1.db.collection("admins").doc(adminId).get();
    if (!doc.exists)
        return null;
    return doc.data();
});
exports.getAdminById = getAdminById;
const updateAdmin = (adminId, nama, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const adminDoc = firebase_1.db.collection("admins").doc(adminId);
    const admin = (yield adminDoc.get()).data();
    if (!admin)
        return null;
    const updatedAdmin = {
        nama: nama || admin.nama,
        email: email || admin.email,
    };
    if (password) {
        updatedAdmin.password = yield bcryptjs_1.default.hash(password, 10);
    }
    yield adminDoc.update(updatedAdmin);
    return updatedAdmin;
});
exports.updateAdmin = updateAdmin;
const deleteAdmin = (adminId) => __awaiter(void 0, void 0, void 0, function* () {
    const adminDoc = firebase_1.db.collection("admins").doc(adminId);
    yield adminDoc.delete();
});
exports.deleteAdmin = deleteAdmin;
