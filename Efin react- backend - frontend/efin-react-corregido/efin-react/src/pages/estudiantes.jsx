import { useMemo, useState } from "react";

import { useData } from "../context/dataContext";

import { normalizarTexto } from "../utils/normalizarTexto";
import { validarDocumento } from "../utils/validarDocumento";
import { exportarJSON } from "../utils/exportarJSON";

import MainLayout from "../layouts/mainLayout";
import Tabla from "../components/tabla";

import "../styles/estudiantes.css";
import "../styles/grupos.css";

const GRUPOS = [
    "6A", "6B", "7A", "7B", "8A", "8B",
    "9A", "9B", "10A", "10B", "11A", "11B"
];

const FORM_VACIO = {
    id: null,
    nombre: "",
    documento: "",
    grupo: GRUPOS[0],
    contacto: ""
};

function Estudiantes() {

    const { estudiantes, cargando, crearEstudiante, actualizarEstudiante, eliminarEstudiante } = useData();

    const [busqueda, setBusqueda] = useState("");
    const [grupoFiltro, setGrupoFiltro] = useState("todos");
    const [form, setForm] = useState(FORM_VACIO);
    const [editando, setEditando] = useState(false);
    const [error, setError] = useState("");
    const [enviando, setEnviando] = useState(false);

    const estudiantesFiltrados = useMemo(() => {

        const texto = normalizarTexto(busqueda);

        return estudiantes.filter(e => {

            const coincideGrupo =
                grupoFiltro === "todos" || e.grupo === grupoFiltro;

            const coincideTexto =
                !texto ||
                normalizarTexto(e.nombre).includes(texto) ||
                normalizarTexto(e.documento).includes(texto);

            return coincideGrupo && coincideTexto;

        });

    }, [estudiantes, busqueda, grupoFiltro]);

    function limpiarFormulario() {
        setForm(FORM_VACIO);
        setEditando(false);
        setError("");
    }

    async function handleSubmit(e) {

        e.preventDefault();

        const nombre = form.nombre.trim();
        const documento = form.documento.trim();
        const contacto = form.contacto.trim();

        if (!nombre || !documento) {
            setError("Nombre y documento son obligatorios");
            return;
        }

        if (!validarDocumento(documento)) {
            setError("El documento debe tener entre 6 y 15 números");
            return;
        }

        setEnviando(true);
        setError("");

        try {

            const datos = { nombre, documento, grupo: form.grupo, contacto };

            if (editando) {
                await actualizarEstudiante(form.id, datos);
            } else {
                await crearEstudiante(datos);
            }

            limpiarFormulario();

        } catch (err) {

            setError(err.message);

        } finally {

            setEnviando(false);

        }

    }

    function handleEditar(estudiante) {
        setForm({ ...estudiante, id: estudiante._id });
        setEditando(true);
        setError("");
    }

    async function handleEliminar(estudiante) {

        const confirmar = window.confirm(
            `¿Eliminar a ${estudiante.nombre}?`
        );

        if (!confirmar) return;

        try {

            await eliminarEstudiante(estudiante._id);

            if (form.id === estudiante._id) {
                limpiarFormulario();
            }

        } catch (err) {

            setError(err.message);

        }

    }

    const columnas = [
        { clave: "nombre", titulo: "Nombre" },
        { clave: "documento", titulo: "Documento" },
        { clave: "grupo", titulo: "Grupo" },
        { clave: "contacto", titulo: "Contacto" }
    ];

    return (

        <MainLayout>

            <h1>Estudiantes</h1>

            <p className="subtitulo-pagina">
                Consulta, agrega y edita la información de los estudiantes matriculados por grupo.
            </p>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Nombre completo"
                    value={form.nombre}
                    onChange={e => setForm({ ...form, nombre: e.target.value })}
                />

                <input
                    type="text"
                    placeholder="Documento"
                    value={form.documento}
                    onChange={e => setForm({ ...form, documento: e.target.value })}
                />

                <select
                    value={form.grupo}
                    onChange={e => setForm({ ...form, grupo: e.target.value })}
                >

                    {GRUPOS.map(g => (
                        <option key={g} value={g}>{g}</option>
                    ))}

                </select>

                <input
                    type="text"
                    placeholder="Contacto (acudiente/teléfono)"
                    value={form.contacto}
                    onChange={e => setForm({ ...form, contacto: e.target.value })}
                />

                <button type="submit" disabled={enviando}>
                    {enviando ? "Guardando..." : editando ? "Guardar cambios" : "Agregar estudiante"}
                </button>

                {editando && (
                    <button type="button" onClick={limpiarFormulario}>
                        Cancelar
                    </button>
                )}

            </form>

            {error && <p style={{ color: "#dc2626" }}>{error}</p>}

            <input
                type="text"
                placeholder="Buscar por nombre o documento..."
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
            />

            <div id="botonesGrupos">

                <button type="button" onClick={() => setGrupoFiltro("todos")}>
                    Todos
                </button>

                {GRUPOS.map(g => (
                    <button
                        key={g}
                        type="button"
                        onClick={() => setGrupoFiltro(g)}
                    >
                        {g}
                    </button>
                ))}

            </div>

            <p id="contador">
                {estudiantesFiltrados.length} estudiante(s) encontrados
            </p>

            <button
                type="button"
                onClick={() => exportarJSON("estudiantes", estudiantesFiltrados)}
            >
                Exportar JSON
            </button>

            {cargando ? (
                <p>Cargando estudiantes...</p>
            ) : (
                <Tabla
                    columnas={columnas}
                    datos={estudiantesFiltrados}
                    onEditar={handleEditar}
                    onEliminar={handleEliminar}
                    filaClaseFn={e => `g${e.grupo}`}
                    vacioTexto="No hay estudiantes registrados"
                />
            )}

        </MainLayout>

    );

}

export default Estudiantes;
