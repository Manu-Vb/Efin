import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Usuario from "../models/Usuario.js";

export async function login(req, res) {

    try {

        const { usuario, password } = req.body;

        if (!usuario || !password) {
            return res.status(400).json({ mensaje: "Usuario y contraseña son obligatorios" });
        }

        const encontrado = await Usuario.findOne({ usuario: usuario.toLowerCase().trim() });

        if (!encontrado) {
            return res.status(401).json({ mensaje: "Usuario o contraseña incorrectos" });
        }

        const coincide = await bcrypt.compare(password, encontrado.password);

        if (!coincide) {
            return res.status(401).json({ mensaje: "Usuario o contraseña incorrectos" });
        }

        const token = jwt.sign(
            {
                id: encontrado._id,
                nombre: encontrado.nombre,
                usuario: encontrado.usuario,
                rol: encontrado.rol
            },
            process.env.JWT_SECRET,
            { expiresIn: "8h" }
        );

        res.json({
            token,
            usuario: {
                id: encontrado._id,
                nombre: encontrado.nombre,
                usuario: encontrado.usuario,
                rol: encontrado.rol
            }
        });

    } catch (error) {

        res.status(500).json({ mensaje: "Error al iniciar sesión", error: error.message });

    }

}

// Se ejecuta una sola vez al arrancar el servidor: si no existe ningún
// admin todavía, crea uno por defecto (mismo comportamiento que tenía
// crearAdminInicial() en el frontend con localStorage).
export async function crearAdminInicial() {

    const existeAdmin = await Usuario.findOne({ rol: "admin" });

    if (existeAdmin) return;

    const passwordHasheado = await bcrypt.hash("admin123", 10);

    await Usuario.create({
        nombre: "Administrador",
        usuario: "admin",
        password: passwordHasheado,
        rol: "admin"
    });

    console.log("👤 Usuario admin creado por defecto (admin / admin123) — cámbialo pronto");

}
