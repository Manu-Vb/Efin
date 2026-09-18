import { useState } from "react";

import { useData } from "../context/dataContext";
import { formatearFecha } from "../utils/formatearFecha";

import MainLayout from "../layouts/mainLayout";
import Tabla from "../components/tabla";

import "../styles/eventos.css";

const FORM_VACIO = {
    id: null,
    nombre: "",
    fecha: "",
    lugar: "",
    descripcion: ""
};

function Eventos() {

    const { eventos, cargando, crearEvento, actualizarEvento, eliminarEvento } = useData();

    const [form, setForm] = useState(FORM_VACIO);
    const [editando, setEditando] = useState(false);
    const [error, setError] = useState("");
    const [enviando, setEnviando] = useState(false);

    function limpiarFormulario() {
        setForm(FORM_VACIO);
        setEditando(false);
        setError("");
    }

    async function handleSubmit(e) {

        e.preventDefault();

        const nombre = form.nombre.trim();
        const lugar = form.lugar.trim();
        const descripcion = form.descripcion.trim();

        if (!nombre || !form.fecha || !lugar) {
            setError("Nombre, fecha y lugar son obligatorios");
            return;
        }

        setEnviando(true);
        setError("");

        try {

            const datos = { nombre, fecha: form.fecha, lugar, descripcion };

            if (editando) {
                await actualizarEvento(form.id, datos);
            } else {
                await crearEvento(datos);
            }

            limpiarFormulario();

        } catch (err) {

            setError(err.message);

        } finally {

            setEnviando(false);

        }

    }

    function handleEditar(evento) {
        setForm({ ...evento, id: evento._id });
        setEditando(true);
        setError("");
    }

    async function handleEliminar(evento) {

        const confirmar = window.confirm(
            `¿Eliminar el evento "${evento.nombre}"?`
        );

        if (!confirmar) return;

        try {

            await eliminarEvento(evento._id);

            if (form.id === evento._id) {
                limpiarFormulario();
            }

        } catch (err) {

            setError(err.message);

        }

    }

    const hoy = new Date().toISOString().split("T")[0];

    const columnas = [
        { clave: "nombre", titulo: "Evento" },
        { clave: "fecha", titulo: "Fecha", render: ev => formatearFecha(ev.fecha) },
        { clave: "lugar", titulo: "Lugar" },
        { clave: "descripcion", titulo: "Descripción" }
    ];

    return (

        <MainLayout>

            <h1>Eventos</h1>

            <p className="subtitulo-pagina">
                Organiza las actividades y eventos institucionales próximos.
            </p>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Nombre del evento"
                    value={form.nombre}
                    onChange={e => setForm({ ...form, nombre: e.target.value })}
                />

                <input
                    type="date"
                    value={form.fecha}
                    onChange={e => setForm({ ...form, fecha: e.target.value })}
                />

                <input
                    type="text"
                    placeholder="Lugar"
                    value={form.lugar}
                    onChange={e => setForm({ ...form, lugar: e.target.value })}
                />

                <input
                    type="text"
                    placeholder="Descripción (opcional)"
                    value={form.descripcion}
                    onChange={e => setForm({ ...form, descripcion: e.target.value })}
                />

                <button type="submit" disabled={enviando}>
                    {enviando ? "Guardando..." : editando ? "Guardar cambios" : "Agregar evento"}
                </button>

                {editando && (
                    <button type="button" onClick={limpiarFormulario}>
                        Cancelar
                    </button>
                )}

            </form>

            {error && <p style={{ color: "#dc2626" }}>{error}</p>}

            <p>
                {eventos.filter(ev => ev.fecha >= hoy).length} evento(s) próximos
                de {eventos.length} en total
            </p>

            {cargando ? (
                <p>Cargando eventos...</p>
            ) : (
                <Tabla
                    columnas={columnas}
                    datos={eventos}
                    onEditar={handleEditar}
                    onEliminar={handleEliminar}
                    vacioTexto="No hay eventos registrados"
                />
            )}

        </MainLayout>

    );

}

export default Eventos;
