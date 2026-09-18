import bcrypt from "bcryptjs";

import Usuario from "../models/Usuario.js";

export async function listar(req, res) {

    const usuarios = await Usuario.find().select("-password").sort({ nombre: 1 });
    res.json(usuarios);

}

export async function crear(req, res) {

    try {

        const { nombre, usuario, password, rol } = req.body;

        if (!nombre || !usuario || !password) {
            return res.status(400).json({ mensaje: "Nombre, usuario y contraseña son obligatorios" });
        }

        const passwordHasheado = await bcrypt.hash(password, 10);

        const nuevo = await Usuario.create({
            nombre,
            usuario: usuario.toLowerCase().trim(),
            password: passwordHasheado,
            rol: rol || "profesor"
        });

        const { password: _omitido, ...usuarioSinPassword } = nuevo.toObject();

        res.status(201).json(usuarioSinPassword);

    } catch (error) {

        if (error.code === 11000) {
            return res.status(409).json({ mensaje: "Ese nombre de usuario ya existe" });
        }

        res.status(400).json({ mensaje: "Error al crear usuario", error: error.message });

    }

}

export async function actualizar(req, res) {

    try {

        const { nombre, usuario, password, rol } = req.body;

        if (rol && rol !== "admin") {

            const objetivo = await Usuario.findById(req.params.id);

            if (objetivo?.rol === "admin") {

                const totalAdmins = await Usuario.countDocuments({ rol: "admin" });

                if (totalAdmins === 1) {
                    return res.status(400).json({ mensaje: "Debe existir al menos un administrador" });
                }

            }

        }

        const cambios = { nombre, usuario, rol };

        if (password) {
            cambios.password = await bcrypt.hash(password, 10);
        }

        const actualizado = await Usuario.findByIdAndUpdate(
            req.params.id,
            cambios,
            { new: true, runValidators: true }
        ).select("-password");

        if (!actualizado) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        res.json(actualizado);

    } catch (error) {

        res.status(400).json({ mensaje: "Error al actualizar usuario", error: error.message });

    }

}

export async function eliminar(req, res) {

    const objetivo = await Usuario.findById(req.params.id);

    if (!objetivo) {
        return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    if (String(objetivo._id) === String(req.usuario.id)) {
        return res.status(400).json({ mensaje: "No puedes eliminar tu propia cuenta" });
    }

    if (objetivo.rol === "admin") {

        const totalAdmins = await Usuario.countDocuments({ rol: "admin" });

        if (totalAdmins === 1) {
            return res.status(400).json({ mensaje: "Debe existir al menos un administrador" });
        }

    }

    await objetivo.deleteOne();

    res.json({ mensaje: "Usuario eliminado" });

}
