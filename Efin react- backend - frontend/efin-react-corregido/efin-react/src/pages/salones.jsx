import { useState } from "react";

import { useData } from "../context/dataContext";

import MainLayout from "../layouts/mainLayout";
import Tabla from "../components/tabla";

import "../styles/salones.css";

const TIPOS = ["Aula", "Laboratorio", "Sala de sistemas", "Biblioteca", "Auditorio"];

const FORM_VACIO = {
    id: null,
    nombre: "",
    tipo: TIPOS[0],
    capacidad: ""
};

function Salones() {

    const { salones, cargando, crearSalon, actualizarSalon, eliminarSalon } = useData();

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
        const capacidad = Number(form.capacidad);

        if (!nombre) {
            setError("El nombre del salón es obligatorio");
            return;
        }

        if (!capacidad || capacidad <= 0) {
            setError("La capacidad debe ser un número mayor a 0");
            return;
        }

        setEnviando(true);
        setError("");

        try {

            const datos = { nombre, tipo: form.tipo, capacidad };

            if (editando) {
                await actualizarSalon(form.id, datos);
            } else {
                await crearSalon(datos);
            }

            limpiarFormulario();

        } catch (err) {

            setError(err.message);

        } finally {

            setEnviando(false);

        }

    }

    function handleEditar(salon) {
        setForm({ ...salon, id: salon._id, capacidad: String(salon.capacidad) });
        setEditando(true);
        setError("");
    }

    async function handleEliminar(salon) {

        const confirmar = window.confirm(
            `¿Eliminar el salón "${salon.nombre}"?`
        );

        if (!confirmar) return;

        try {

            await eliminarSalon(salon._id);

            if (form.id === salon._id) {
                limpiarFormulario();
            }

        } catch (err) {

            setError(err.message);

        }

    }

    const columnas = [
        { clave: "nombre", titulo: "Salón" },
        { clave: "tipo", titulo: "Tipo" },
        { clave: "capacidad", titulo: "Capacidad" }
    ];

    return (

        <MainLayout>

            <h1>Salones</h1>

            <p className="subtitulo-pagina">
                Administra los espacios disponibles y su capacidad.
            </p>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Nombre o número del salón"
                    value={form.nombre}
                    onChange={e => setForm({ ...form, nombre: e.target.value })}
                />

                <select
                    value={form.tipo}
                    onChange={e => setForm({ ...form, tipo: e.target.value })}
                >

                    {TIPOS.map(t => (
                        <option key={t} value={t}>{t}</option>
                    ))}

                </select>

                <input
                    type="number"
                    min="1"
                    placeholder="Capacidad"
                    value={form.capacidad}
                    onChange={e => setForm({ ...form, capacidad: e.target.value })}
                />

                <button type="submit" disabled={enviando}>
                    {enviando ? "Guardando..." : editando ? "Guardar cambios" : "Agregar salón"}
                </button>

                {editando && (
                    <button type="button" onClick={limpiarFormulario}>
                        Cancelar
                    </button>
                )}

            </form>

            {error && <p style={{ color: "#dc2626" }}>{error}</p>}

            <div className="listaSalones">

                {cargando ? (
                    <p>Cargando salones...</p>
                ) : (
                    <Tabla
                        columnas={columnas}
                        datos={salones}
                        onEditar={handleEditar}
                        onEliminar={handleEliminar}
                        vacioTexto="No hay salones registrados"
                    />
                )}

            </div>

        </MainLayout>

    );

}

export default Salones;
