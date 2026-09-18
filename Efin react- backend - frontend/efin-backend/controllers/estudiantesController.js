import Estudiante from "../models/Estudiante.js";

export async function listar(req, res) {

    const estudiantes = await Estudiante.find().sort({ nombre: 1 });
    res.json(estudiantes);

}

export async function crear(req, res) {

    try {

        const nuevo = await Estudiante.create(req.body);
        res.status(201).json(nuevo);

    } catch (error) {

        if (error.code === 11000) {
            return res.status(409).json({ mensaje: "Ya existe un estudiante con ese documento" });
        }

        res.status(400).json({ mensaje: "Error al crear estudiante", error: error.message });

    }

}

export async function actualizar(req, res) {

    try {

        const actualizado = await Estudiante.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!actualizado) {
            return res.status(404).json({ mensaje: "Estudiante no encontrado" });
        }

        res.json(actualizado);

    } catch (error) {

        res.status(400).json({ mensaje: "Error al actualizar estudiante", error: error.message });

    }

}

export async function eliminar(req, res) {

    const eliminado = await Estudiante.findByIdAndDelete(req.params.id);

    if (!eliminado) {
        return res.status(404).json({ mensaje: "Estudiante no encontrado" });
    }

    res.json({ mensaje: "Estudiante eliminado" });

}
