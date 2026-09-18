const API_URL = import.meta.env.VITE_API_URL;

export async function login(usuario, password) {

    try {

        const respuesta = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usuario, password })
        });

        if (!respuesta.ok) {
            return false;
        }

        const datos = await respuesta.json();

        localStorage.setItem("token", datos.token);
        localStorage.setItem("sesion", JSON.stringify(datos.usuario));

        return true;

    } catch (error) {

        console.error("Error al iniciar sesión:", error);
        return false;

    }

}

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("sesion");
}

export function usuarioActivo() {

    const guardado = localStorage.getItem("sesion");

    return guardado ? JSON.parse(guardado) : null;

}

export function estaLogueado() {
    return usuarioActivo() !== null;
}

export function esAdmin() {
    return usuarioActivo()?.rol === "admin";
}

export function obtenerToken() {
    return localStorage.getItem("token");
}
