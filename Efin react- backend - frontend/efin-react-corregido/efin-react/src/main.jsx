import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import { AuthProvider } from "./context/authContext";
import { ThemeProvider } from "./context/themeContext";
import { DataProvider } from "./context/dataContext";

import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthProvider>
        <ThemeProvider>
            <DataProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </DataProvider>
        </ThemeProvider>
    </AuthProvider>
);
