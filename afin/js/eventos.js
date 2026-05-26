let eventos = getData("eventos");

function agregarEvento(){

    if(!esAdmin()) return alert("Solo admin");

    let evento = document.getElementById("evento").value;
    let fecha = document.getElementById("fecha").value;

    if(!evento || !fecha){
        noti("Complete los campos");
        return;
    }

    eventos.push({
        id: Date.now(),
        evento,
        fecha
    });

    saveData("eventos", eventos);
    mostrarEventos();
}

function eliminarEvento(id){
    if(!confirm("¿Eliminar evento?")) return;
    eventos = eventos.filter(e=>e.id!==id);
    saveData("eventos", eventos);
    render(eventos);
}

function mostrarEventos(){

    let lista = document.getElementById("listaEventos");
    lista.innerHTML="";

    eventos.forEach(e=>{
        lista.innerHTML += `
        <li>
        ${e.evento} - ${e.fecha}
        ${esAdmin() ? `<button onclick="eliminarEvento(${e.id})">X</button>` : ""}
        </li>`;
    });
}

mostrarEventos();