export function formatearFecha(fecha){

    return new Date(fecha).toLocaleDateString(
        "es-CO",
        {
            year:"numeric",
            month:"2-digit",
            day:"2-digit"
        }
    );

}