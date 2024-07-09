"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.db = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const firebaseConfig = {
    clientEmail: process.env.CLIENTEMAIL,
    privateKey: process.env.PRIVATKEY,
    projectId: process.env.PROJECTID,
};
const app = firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(firebaseConfig),
});
exports.db = firebase_admin_1.default.firestore(app);
exports.auth = firebase_admin_1.default.auth(app);
