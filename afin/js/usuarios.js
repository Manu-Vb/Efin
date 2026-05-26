let usuarios = getData("usuarios");

if(!esAdmin()){
    alert("Acceso denegado");
    window.location.href="../index.html";
}

function crear(){

    let u = user.value;
    let p = pass.value;
    let r = rol.value;

    if(!u || !p){
        noti("Complete los campos");
        return;
    }

    usuarios.push({user:u, pass:p, rol:r});
    saveData("usuarios", usuarios);

    mostrar();
}

function eliminarUsuario(i){
    if(!confirm("¿Eliminar usuario?")) return;
    usuarios = usuarios.filter(e=>e.id!==id);
    saveData("usuarios", usuarios);
    render(usuarios);
}

function mostrar(){

    lista.innerHTML="";

    usuarios.forEach((u,i)=>{
        lista.innerHTML += `
        <li>
        ${u.user} - ${u.rol}
        <button onclick="eliminarUsuario(${i})">X</button>
        </li>`;
    });
}

mostrar();