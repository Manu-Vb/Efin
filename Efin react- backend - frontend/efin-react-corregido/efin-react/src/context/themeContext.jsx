import { createContext, useContext } from "react";

import { useDarkMode } from "../hooks/useDarkMode";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {

    const { oscuro, alternarTema } = useDarkMode();

    return (
        <ThemeContext.Provider value={{ oscuro, alternarTema }}>
            {children}
        </ThemeContext.Provider>
    );

}

export function useTheme() {

    const contexto = useContext(ThemeContext);

    if (!contexto) {
        throw new Error("useTheme debe usarse dentro de un ThemeProvider");
    }

    return contexto;

}
