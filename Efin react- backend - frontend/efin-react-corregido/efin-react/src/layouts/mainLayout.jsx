import { Navigate } from "react-router-dom";

import { useAuth } from "../context/authContext";
import { useTheme } from "../context/themeContext";

import Layout from "../components/layout";

function MainLayout({ children }) {

    const { sesion, estaLogueado } = useAuth();
    const { oscuro, alternarTema } = useTheme();

    if (!estaLogueado) {
        return <Navigate to="/" replace />;
    }

    return (

        <Layout usuario={sesion ? `${sesion.nombre} (${sesion.rol})` : ""}>

            <button
                type="button"
                onClick={alternarTema}
                style={{ float: "right" }}
            >
                {oscuro ? "☀️ Modo claro" : "🌙 Modo oscuro"}
            </button>

            {children}

        </Layout>

    );

}

export default MainLayout;
