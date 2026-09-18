import { Navigate } from "react-router-dom";

import { useAuth } from "../context/authContext";

import "../styles/login.css";

function AuthLayout({ children }) {

    const { estaLogueado } = useAuth();

    if (estaLogueado) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="login-page">
            <div className="login-container">
                {children}
            </div>
        </div>
    );

}

export default AuthLayout;
