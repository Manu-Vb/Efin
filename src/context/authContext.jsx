import { createContext, useContext, useState } from "react";

import {
    login as loginService,
    logout as logoutService,
    usuarioActivo
} from "../services/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

    const [sesion, setSesion] = useState(() => usuarioActivo());

    async function login(usuario, password) {

        const exito = await loginService(usuario, password);

        if (exito) {
            setSesion(usuarioActivo());
        }

        return exito;

    }

    function logout() {
        logoutService();
        setSesion(null);
    }

    const valor = {
        sesion,
        login,
        logout,
        estaLogueado: sesion !== null,
        esAdmin: sesion?.rol === "admin"
    };

    return (
        <AuthContext.Provider value={valor}>
            {children}
        </AuthContext.Provider>
    );

}

export function useAuth() {

    const contexto = useContext(AuthContext);

    if (!contexto) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }

    return contexto;

}
