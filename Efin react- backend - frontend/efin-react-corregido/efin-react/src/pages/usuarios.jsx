import { useState } from "react";

import { useAuth } from "../context/authContext";
import { useData } from "../context/dataContext";

import MainLayout from "../layouts/mainLayout";
import Tabla from "../components/tabla";

import "../styles/usuarios.css";

const ROLES = ["admin", "profesor"];

const FORM_VACIO = {
    id: null,
    nombre: "",
    usuario: "",
    password: "",
    rol: ROLES[1]
};

function Usuarios() {

    const { sesion, esAdmin } = useAuth();
    const { usuarios, cargando, crearUsuario, actualizarUsuario, eliminarUsuario } = useData();

    const [form, setForm] = useState(FORM_VACIO);
    const [editando, setEditando] = useState(false);
    const [error, setError] = useState("");
    const [verPassword, setVerPassword] = useState(false);
    const [enviando, setEnviando] = useState(false);

    function limpiarFormulario() {
        setForm(FORM_VACIO);
        setEditando(false);
        setError("");
        setVerPassword(false);
    }

    async function handleSubmit(e) {

        e.preventDefault();

        const nombre = form.nombre.trim();
        const usuario = form.usuario.trim();
        const password = form.password.trim();

        if (!nombre || !usuario || (!editando && !password)) {
            setError("Nombre, usuario y contraseña son obligatorios");
            return;
        }

        setEnviando(true);
        setError("");

        try {

            if (editando) {

                const cambios = { nombre, usuario, rol: form.rol };

                if (password) {
                    cambios.password = password;
                }

                await actualizarUsuario(form.id, cambios);

            } else {

                await crearUsuario({ nombre, usuario, password, rol: form.rol });

            }

            limpiarFormulario();

        } catch (err) {

            setError(err.message);

        } finally {

            setEnviando(false);

        }

    }

    function handleEditar(usuarioFila) {
        setForm({ ...usuarioFila, id: usuarioFila._id, password: "" });
        setEditando(true);
        setError("");
    }

    async function handleEliminar(usuarioFila) {

        if (usuarioFila._id === sesion?.id) {
            setError("No puedes eliminar tu propia cuenta");
            return;
        }

        const confirmar = window.confirm(
            `¿Eliminar al usuario "${usuarioFila.nombre}"?`
        );

        if (!confirmar) return;

        try {

            await eliminarUsuario(usuarioFila._id);

            if (form.id === usuarioFila._id) {
                limpiarFormulario();
            }

        } catch (err) {

            setError(err.message);

        }

    }

    if (!esAdmin) {

        return (
            <MainLayout>
                <h1>Usuarios</h1>
                <p>Solo un administrador puede gestionar los usuarios.</p>
            </MainLayout>
        );

    }

    const columnas = [
        { clave: "nombre", titulo: "Nombre" },
        { clave: "usuario", titulo: "Usuario" },
        { clave: "rol", titulo: "Rol" }
    ];

    return (

        <MainLayout>

            <h1>Usuarios</h1>

            <p className="subtitulo-pagina">
                Gestiona las cuentas de acceso y los roles del sistema.
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
                    placeholder="Usuario"
                    value={form.usuario}
                    onChange={e => setForm({ ...form, usuario: e.target.value })}
                />

                <input
                    type={verPassword ? "text" : "password"}
                    placeholder={editando ? "Nueva contraseña (opcional)" : "Contraseña"}
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                />

                <button type="button" onClick={() => setVerPassword(!verPassword)}>
                    {verPassword ? "Ocultar" : "Ver"}
                </button>

                <select
                    value={form.rol}
                    onChange={e => setForm({ ...form, rol: e.target.value })}
                >

                    {ROLES.map(r => (
                        <option key={r} value={r}>{r}</option>
                    ))}

                </select>

                <button type="submit" disabled={enviando}>
                    {enviando ? "Guardando..." : editando ? "Guardar cambios" : "Agregar usuario"}
                </button>

                {editando && (
                    <button type="button" onClick={limpiarFormulario}>
                        Cancelar
                    </button>
                )}

            </form>

            {error && <p style={{ color: "#dc2626" }}>{error}</p>}

            {cargando ? (
                <p>Cargando usuarios...</p>
            ) : (
                <Tabla
                    columnas={columnas}
                    datos={usuarios}
                    onEditar={handleEditar}
                    onEliminar={handleEliminar}
                    vacioTexto="No hay usuarios registrados"
                />
            )}

        </MainLayout>

    );

}

export default Usuarios;
