import { useEffect, useState } from "react";

const CLAVE_TEMA = "efin-tema-oscuro";

export function useDarkMode() {

    const [oscuro, setOscuro] = useState(() => {

        const guardado = localStorage.getItem(CLAVE_TEMA);

        if (guardado !== null) {
            return guardado === "true";
        }

        return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;

    });

    useEffect(() => {

        document.documentElement.dataset.tema = oscuro ? "oscuro" : "claro";

        localStorage.setItem(CLAVE_TEMA, String(oscuro));

    }, [oscuro]);

    function alternarTema() {
        setOscuro(valor => !valor);
    }

    return { oscuro, alternarTema };

}
