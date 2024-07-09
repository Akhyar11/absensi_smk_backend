"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const adminRoute_1 = __importDefault(require("./routes/adminRoute"));
const guruRoute_1 = __importDefault(require("./routes/guruRoute"));
const kelasRoute_1 = __importDefault(require("./routes/kelasRoute"));
const jadwalMapelRoute_1 = __importDefault(require("./routes/jadwalMapelRoute"));
const mapelRoute_1 = __importDefault(require("./routes/mapelRoute"));
const siswaRoute_1 = __importDefault(require("./routes/siswaRoute"));
const app = (0, express_1.default)();
const port = 5000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/admin", adminRoute_1.default);
app.use("/guru", guruRoute_1.default);
app.use("/kelas", kelasRoute_1.default);
app.use("/jadwalMapel", jadwalMapelRoute_1.default);
app.use("/mapel", mapelRoute_1.default);
app.use("/siswa", siswaRoute_1.default);
app.get("/", (req, res) => {
    res.status(200).send("hello world");
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
