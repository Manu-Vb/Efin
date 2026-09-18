import Evento from "../models/Evento.js";

export async function listar(req, res) {

    const eventos = await Evento.find().sort({ fecha: 1 });
    res.json(eventos);

}

export async function crear(req, res) {

    try {

        const nuevo = await Evento.create(req.body);
        res.status(201).json(nuevo);

    } catch (error) {

        res.status(400).json({ mensaje: "Error al crear evento", error: error.message });

    }

}

export async function actualizar(req, res) {

    try {

        const actualizado = await Evento.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!actualizado) {
            return res.status(404).json({ mensaje: "Evento no encontrado" });
        }

        res.json(actualizado);

    } catch (error) {

        res.status(400).json({ mensaje: "Error al actualizar evento", error: error.message });

    }

}

export async function eliminar(req, res) {

    const eliminado = await Evento.findByIdAndDelete(req.params.id);

    if (!eliminado) {
        return res.status(404).json({ mensaje: "Evento no encontrado" });
    }

    res.json({ mensaje: "Evento eliminado" });

}
