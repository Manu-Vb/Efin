export function exportarJSON(nombre,data){

    const blob = new Blob(
        [JSON.stringify(data,null,2)],
        {type:"application/json"}
    );

    const enlace = document.createElement("a");

    enlace.href = URL.createObjectURL(blob);

    enlace.download = nombre + ".json";

    enlace.click();

}