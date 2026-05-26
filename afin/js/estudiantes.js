let estudiantes = getData("estudiantes");

function normalizar (texto){
    return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function guardar(){

    let n = nombre.value;
    let d = doc.value;
    let g = grupo.value;

    if(!n||!d||!g){ noti("Complete los campos"); return;}

    estudiantes.push({id:Date.now(),n,d,g});

    saveData("estudiantes",estudiantes);
    render(estudiantes);
}

function resaltar(texto, busqueda){

    if(!busqueda) return texto;

    let regex = new RegExp(`(${busqueda})`, "gi");
    return texto.replace(regex, "<mark>$1</mark>");
}

function render(data){

    let t = document.querySelector("#tabla tbody");
    t.innerHTML="";

    if(data.length === 0){

        t.innerHTML = `
        <tr>
            <td colspan="4">No se encontraron resultados</td>
        </tr>
        `;

        return;
    }
    data.forEach(e=>{
        t.innerHTML+=`
        <tr>
        <td>${resaltar(e.n, buscar.value)}</td>
        <td>${e.d}</td>
        <td>${e.g}</td>
        <td><button onclick="eliminar(${e.id})">X</button></td>
        </tr>`;
    });
}

function eliminar(id){
    if(!confirm("¿Eliminar estudiante?")) return;
    estudiantes = estudiantes.filter(e=>e.id!==id);
    saveData("estudiantes", estudiantes);
    render(estudiantes);
   
}

function buscar(){
    
    let texto =
    normalizar(document.getElementById("buscar").value.trim());

    if(texto === ""){
        render(estudiantes);
        return;
    }

    let filtrados = estudiantes.filter(e => {
        let nombre = normalizar(e.n || "");
        let doc = normalizar(e.d || "");
        let grupo = normalizar(e.g || "");

        return nombre.includes(texto) ||
               doc.includes(texto) ||
               grupo.includes(texto);
    });

    render(filtrados);

}

function exportar(){
    let blob=new Blob([JSON.stringify(estudiantes)],{type:"app/json"});
    let a=document.createElement("a");
    a.href=URL.createObjectURL(blob);
    a.download="estudiantes.json";
    a.click();
}

render(estudiantes);

function bloquear(){

    if(!esAdmin()){
        document.querySelectorAll("button").forEach(b=>{
            if(b.innerText !== "Exportar"){
                b.style.display = "none";
            }
        });
    }
}

bloquear();