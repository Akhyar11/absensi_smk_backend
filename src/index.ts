import express from "express";
import cors from "cors";
import adminRoutes from "./routes/adminRoute";
import guruRoutes from "./routes/guruRoute";
import kelasRoutes from "./routes/kelasRoute";
import jadwalMapelRoutes from "./routes/jadwalMapelRoute";
import mapelRoutes from "./routes/mapelRoute";
import siswaRoutes from "./routes/siswaRoute";

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.use("/admin", adminRoutes);
app.use("/guru", guruRoutes);
app.use("/kelas", kelasRoutes);
app.use("/jadwalMapel", jadwalMapelRoutes);
app.use("/mapel", mapelRoutes);
app.use("/siswa", siswaRoutes);
app.get("/", (req, res) => {
  res.status(200).send("hello world");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
