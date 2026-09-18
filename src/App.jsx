import { Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Estudiantes from "./pages/estudiantes";
import Eventos from "./pages/eventos";
import Salones from "./pages/salones";
import Usuarios from "./pages/usuarios";

function App() {

    return (

        <Routes>

            <Route
                path="/"
                element={<Login />}
            />

            <Route
                path="/dashboard"
                element={<Dashboard />}
            />

            <Route
                path="/estudiantes"
                element={<Estudiantes />}
            />

            <Route
                path="/eventos"
                element={<Eventos />}
            />

            <Route
                path="/salones"
                element={<Salones />}
            />

            <Route
                path="/usuarios"
                element={<Usuarios />}
            />

        </Routes>

    );

}

export default App;
