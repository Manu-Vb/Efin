import { Link } from "react-router-dom";

import "../styles/sidebar.css";

function Menu() {

    return (

        <nav className="menu">

            <Link to="/dashboard">Inicio</Link>

            <Link to="/estudiantes">Estudiantes</Link>

            <Link to="/eventos">Eventos</Link>

            <Link to="/salones">Salones</Link>

            <Link to="/usuarios">Usuarios</Link>

        </nav>

    );

}

export default Menu;