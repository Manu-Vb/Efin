let salones = getData("salones");

function asignar(){

    if(!esAdmin()) return alert("Solo admin");

    let salon = document.getElementById("salon").value;
    let grupo = document.getElementById("grupo").value;
    let hora = document.getElementById("hora").value;
    let materia = document.getElementById("materia").value;

    if(!salon || !grupo || !hora || !materia){
        noti("Complete los campos");
        return;
    }

    let ocupado = salones.some(s => s.salon === salon && s.hora === hora);

    if(ocupado){
        alert("Salón ocupado");
        return;
    }

    salones.push({
        id: Date.now(),
        salon,
        grupo,
        hora,
        materia
    });

    saveData("salones", salones);
    mostrarSalones();
}

function eliminarSalon(id){
    if(!confirm("¿Eliminar salon?")) return;
    salones = salones.filter(e=>e.id!==id);
    saveData("salones", salones);
    render(salones);
}

function mostrarSalones(){

    let lista = document.getElementById("listaSalones");
    lista.innerHTML="";

    salones.forEach(s=>{
        lista.innerHTML += `
        <li>
        ${s.salon} | ${s.grupo} | ${s.hora}
        ${esAdmin() ? `<button onclick="eliminarSalon(${s.id})">X</button>` : ""}
        </li>`;
    });
}

mostrarSalones();