import { useState } from "react";

import { useAuth } from "../context/authContext";
import AuthLayout from "../layouts/authLayout";

function Login() {

    const { login } = useAuth();

    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [verPassword, setVerPassword] = useState(false);
    const [recordar, setRecordar] = useState(false);
    const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });
    const [cargando, setCargando] = useState(false);

    function mostrarMensaje(texto, tipo) {
        setMensaje({ texto, tipo });
    }

    async function handleSubmit(e) {

        e.preventDefault();

        const usuarioLimpio = usuario.trim();
        const passwordLimpio = password.trim();

        if (!usuarioLimpio || !passwordLimpio) {
            mostrarMensaje("Completa todos los campos", "error");
            return;
        }

        setCargando(true);

        const exito = await login(usuarioLimpio, passwordLimpio);

        setCargando(false);

        if (exito) {
            mostrarMensaje("Inicio de sesión correcto", "ok");
        } else {
            mostrarMensaje("Usuario o contraseña incorrectos", "error");
        }

    }

    return (

        <AuthLayout>

            <div className="login-card">

                <div className="logo-box">
                    <img
                        src="/img/logotipo definitivo.jpg"
                        className="logo"
                        alt="EFIN"
                    />
                </div>

                <h1>EFIN</h1>

                <p className="subtitle">
                    Inicia sesión para continuar
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <i className="fa-solid fa-user"></i>
                        <input
                            type="text"
                            placeholder="Usuario"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            autoComplete="username"
                        />
                    </div>

                    <div className="input-group">
                        <i className="fa-solid fa-lock"></i>
                        <input
                            type={verPassword ? "text" : "password"}
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                        />
                        <button
                            type="button"
                            className="toggle-pass"
                            onClick={() => setVerPassword(!verPassword)}
                        >
                            <i className={verPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}></i>
                        </button>
                    </div>

                    <div className="extras">

                        <label className="remember">
                            <input
                                type="checkbox"
                                checked={recordar}
                                onChange={(e) => setRecordar(e.target.checked)}
                            />
                            {" "}Recordarme
                        </label>

                        <a href="#" className="forgot">
                            ¿Olvidaste tu contraseña?
                        </a>

                    </div>

                    <button
                        type="submit"
                        className="btn-login"
                        disabled={cargando}
                    >
                        {cargando ? "Ingresando..." : "Ingresar"}
                    </button>

                </form>

                {mensaje.texto && (
                    <p id="mensajeLogin" className={`mensaje ${mensaje.tipo}`}>
                        {mensaje.texto}
                    </p>
                )}

                <p className="footer-login">
                    EFIN &copy; {new Date().getFullYear()}
                </p>

            </div>

        </AuthLayout>

    );

}

export default Login;
