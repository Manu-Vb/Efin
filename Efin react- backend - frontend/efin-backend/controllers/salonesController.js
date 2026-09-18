import Salon from "../models/Salon.js";

export async function listar(req, res) {

    const salones = await Salon.find().sort({ nombre: 1 });
    res.json(salones);

}

export async function crear(req, res) {

    try {

        const nuevo = await Salon.create(req.body);
        res.status(201).json(nuevo);

    } catch (error) {

        if (error.code === 11000) {
            return res.status(409).json({ mensaje: "Ya existe un salón con ese nombre" });
        }

        res.status(400).json({ mensaje: "Error al crear salón", error: error.message });

    }

}

export async function actualizar(req, res) {

    try {

        const actualizado = await Salon.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!actualizado) {
            return res.status(404).json({ mensaje: "Salón no encontrado" });
        }

        res.json(actualizado);

    } catch (error) {

        res.status(400).json({ mensaje: "Error al actualizar salón", error: error.message });

    }

}

export async function eliminar(req, res) {

    const eliminado = await Salon.findByIdAndDelete(req.params.id);

    if (!eliminado) {
        return res.status(404).json({ mensaje: "Salón no encontrado" });
    }

    res.json({ mensaje: "Salón eliminado" });

}
