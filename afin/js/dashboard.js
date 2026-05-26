function cargarDashboard(){

    let est = getData("estudiantes");
    let eve = getData("eventos");
    let sal = getData("salones");

    document.getElementById("totalEstudiantes").textContent = est.length;
    document.getElementById("totalEventos").textContent = eve.length;
    document.getElementById("totalSalones").textContent = sal.length;

    let grupos = {};

est.forEach(e => {

    let grupo = e.g || e.grupo;

    if(grupo){

        if(!grupos[grupo]){
            grupos[grupo] = 0;
        }

        grupos[grupo]++;
    }
});

let grupoMayor = "N/A";
let cantidadMayor = 0;

for(let grupo in grupos){

    if(grupos[grupo] > cantidadMayor){

        cantidadMayor = grupos[grupo];
        grupoMayor = grupo;
    }
}

document.getElementById("grupoTop").textContent =
`${grupoMayor} (${cantidadMayor} estudiantes)`;

}

cargarDashboard();

let sesion = obtenerSesion();

document.getElementById("usuarioActivo").textContent = `Usuario ${sesion.user} (${sesion.rol})`;

function modoOscuro(){
    document.body.classList.toggle("dark");
}