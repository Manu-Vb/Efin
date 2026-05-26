let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

if(usuarios.length === 0){
    usuarios.push({user:"admin", pass:"1234", rol:"admin"});
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function login(){

    let u = user.value;
    let p = pass.value;

    let encontrado = usuarios.find(x=>x.user===u && x.pass===p);

    if(encontrado){
        localStorage.setItem("sesion", JSON.stringify(encontrado));
        window.location.href="index.html";
    }else{
        alert("Datos incorrectos");
    }
}