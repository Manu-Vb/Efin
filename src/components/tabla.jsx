function Tabla({ columnas, datos, onEditar, onEliminar, vacioTexto, filaClaseFn }) {

    const tieneAcciones = Boolean(onEditar || onEliminar);

    if (!datos || datos.length === 0) {

        return (
            <p>{vacioTexto || "No hay registros para mostrar"}</p>
        );

    }

    return (

        <table>

            <thead>

                <tr>

                    {columnas.map(col => (
                        <th key={col.clave}>{col.titulo}</th>
                    ))}

                    {tieneAcciones && <th>Acciones</th>}

                </tr>

            </thead>

            <tbody>

                {datos.map(fila => (

                    <tr
                        key={fila._id || fila.id}
                        className={filaClaseFn ? filaClaseFn(fila) : undefined}
                    >

                        {columnas.map(col => (
                            <td key={col.clave}>
                                {col.render ? col.render(fila) : fila[col.clave]}
                            </td>
                        ))}

                        {tieneAcciones && (
                            <td>

                                {onEditar && (
                                    <button
                                        type="button"
                                        onClick={() => onEditar(fila)}
                                    >
                                        Editar
                                    </button>
                                )}

                                {onEliminar && (
                                    <button
                                        type="button"
                                        onClick={() => onEliminar(fila)}
                                    >
                                        Eliminar
                                    </button>
                                )}

                            </td>
                        )}

                    </tr>

                ))}

            </tbody>

        </table>

    );

}

export default Tabla;
