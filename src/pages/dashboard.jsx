import { useMemo } from "react";

import { useAuth } from "../context/authContext";
import { useData } from "../context/dataContext";

import { contarGrupos } from "../utils/contarGrupos";

import MainLayout from "../layouts/mainLayout";
import Card from "../components/card";

import "../styles/dashboard.css";

function Dashboard() {

    const { logout, sesion } = useAuth();
    const { estudiantes, eventos, salones } = useData();

    const fechaHoy = new Date().toLocaleDateString("es-CO", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    const grupoTop = useMemo(() => {

        if (estudiantes.length === 0) return "N/A";

        const grupos = contarGrupos(estudiantes);

        let mayor = "N/A";
        let cantidad = 0;

        for (const g in grupos) {
            if (grupos[g] > cantidad) {
                cantidad = grupos[g];
                mayor = g;
            }
        }

        return `${mayor} (${cantidad} estudiantes)`;

    }, [estudiantes]);

    return (

        <MainLayout>

            <p className="bienvenida">
                Bienvenido/a, {sesion?.nombre || sesion?.usuario} · {fechaHoy}
            </p>

            <button onClick={logout}>
                Cerrar sesión
            </button>

            <div className="dashboard">

                <Card titulo="Estudiantes" valor={estudiantes.length} />
                <Card titulo="Eventos" valor={eventos.length} />
                <Card titulo="Salones" valor={salones.length} />
                <Card titulo="Grupo con más estudiantes" valor={grupoTop} />

            </div>

        </MainLayout>

    );

}

export default Dashboard;
