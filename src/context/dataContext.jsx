import { createContext, useContext, useEffect, useState } from "react";

import { useAuth } from "./authContext";
import { getData, crearItem, actualizarItem, eliminarItem } from "../services/storage";

const DataContext = createContext(null);

export function DataProvider({ children }) {

    const { estaLogueado, esAdmin } = useAuth();

    const [datos, setDatos] = useState({
        estudiantes: [],
        eventos: [],
        salones: [],
        usuarios: []
    });

    const [cargando, setCargando] = useState(true);

    async function recargar(coleccion) {

        try {

            const lista = await getData(coleccion);

            setDatos(actual => ({ ...actual, [coleccion]: lista }));

        } catch (error) {

            console.error(`Error al cargar ${coleccion}:`, error.message);

        }

    }

    async function recargarTodo() {

        setCargando(true);

        const colecciones = esAdmin
            ? ["estudiantes", "eventos", "salones", "usuarios"]
            : ["estudiantes", "eventos", "salones"];

        await Promise.all(colecciones.map(recargar));

        setCargando(false);

    }

    useEffect(() => {

        if (estaLogueado) {
            recargarTodo();
        } else {
            setDatos({ estudiantes: [], eventos: [], salones: [], usuarios: [] });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [estaLogueado, esAdmin]);

    function generarAcciones(coleccion) {

        return {

            crear: async item => {
                await crearItem(coleccion, item);
                await recargar(coleccion);
            },

            actualizar: async (id, item) => {
                await actualizarItem(coleccion, id, item);
                await recargar(coleccion);
            },

            eliminar: async id => {
                await eliminarItem(coleccion, id);
                await recargar(coleccion);
            }

        };

    }

    const accionesEstudiantes = generarAcciones("estudiantes");
    const accionesEventos = generarAcciones("eventos");
    const accionesSalones = generarAcciones("salones");
    const accionesUsuarios = generarAcciones("usuarios");

    const valor = {

        cargando,

        estudiantes: datos.estudiantes,
        eventos: datos.eventos,
        salones: datos.salones,
        usuarios: datos.usuarios,

        crearEstudiante: accionesEstudiantes.crear,
        actualizarEstudiante: accionesEstudiantes.actualizar,
        eliminarEstudiante: accionesEstudiantes.eliminar,

        crearEvento: accionesEventos.crear,
        actualizarEvento: accionesEventos.actualizar,
        eliminarEvento: accionesEventos.eliminar,

        crearSalon: accionesSalones.crear,
        actualizarSalon: accionesSalones.actualizar,
        eliminarSalon: accionesSalones.eliminar,

        crearUsuario: accionesUsuarios.crear,
        actualizarUsuario: accionesUsuarios.actualizar,
        eliminarUsuario: accionesUsuarios.eliminar

    };

    return (
        <DataContext.Provider value={valor}>
            {children}
        </DataContext.Provider>
    );

}

export function useData() {

    const contexto = useContext(DataContext);

    if (!contexto) {
        throw new Error("useData debe usarse dentro de un DataProvider");
    }

    return contexto;

}
