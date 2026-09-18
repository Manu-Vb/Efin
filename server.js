import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import { conectarDB } from "./config/db.js";
import { crearAdminInicial } from "./controllers/authController.js";

import authRoutes from "./routes/authRoutes.js";
import estudiantesRoutes from "./routes/estudiantesRoutes.js";
import eventosRoutes from "./routes/eventosRoutes.js";
import salonesRoutes from "./routes/salonesRoutes.js";
import usuariosRoutes from "./routes/usuariosRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/estudiantes", estudiantesRoutes);
app.use("/api/eventos", eventosRoutes);
app.use("/api/salones", salonesRoutes);
app.use("/api/usuarios", usuariosRoutes);

app.get("/", (req, res) => {
    res.json({ mensaje: "API de EFIN funcionando correctamente 🚀" });
});

const PUERTO = process.env.PORT || 4000;

conectarDB().then(() => {

    crearAdminInicial();

    app.listen(PUERTO, () => {
        console.log(`🚀 Servidor EFIN corriendo en http://localhost:${PUERTO}`);
    });

});
