import { obtenerToken } from "./auth";

const API_URL = import.meta.env.VITE_API_URL;

function encabezados() {

    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${obtenerToken()}`
    };

}

async function manejarRespuesta(respuesta) {

    const datos = await respuesta.json().catch(() => ({}));

    if (!respuesta.ok) {
        throw new Error(datos.mensaje || "Ocurrió un error inesperado");
    }

    return datos;

}

export async function getData(coleccion) {

    const respuesta = await fetch(`${API_URL}/${coleccion}`, {
        headers: encabezados()
    });

    return manejarRespuesta(respuesta);

}

export async function crearItem(coleccion, datos) {

    const respuesta = await fetch(`${API_URL}/${coleccion}`, {
        method: "POST",
        headers: encabezados(),
        body: JSON.stringify(datos)
    });

    return manejarRespuesta(respuesta);

}

export async function actualizarItem(coleccion, id, datos) {

    const respuesta = await fetch(`${API_URL}/${coleccion}/${id}`, {
        method: "PUT",
        headers: encabezados(),
        body: JSON.stringify(datos)
    });

    return manejarRespuesta(respuesta);

}

export async function eliminarItem(coleccion, id) {

    const respuesta = await fetch(`${API_URL}/${coleccion}/${id}`, {
        method: "DELETE",
        headers: encabezados()
    });

    return manejarRespuesta(respuesta);

}
