function obtenerSesion(){
    return JSON.parse(localStorage.getItem("sesion"));
}

function esAdmin(){
    return obtenerSesion()?.rol === "admin";
}

function cerrarSesion(){
    localStorage.removeItem("sesion");
    window.location.href="login.html";
}

function modoOscuro(){

    let tema = document.documentElement.getAttribute("data-theme");

    if(tema === "dark"){

        document.documentElement.setAttribute("data-theme","light");

        localStorage.setItem("tema","light");

    }else{

        document.documentElement.setAttribute("data-theme","dark");

        localStorage.setItem("tema","dark");
    }
}

/* mantener tema */

document.addEventListener("DOMContentLoaded", ()=>{

    let temaGuardado = localStorage.getItem("tema");

    if(temaGuardado){

        document.documentElement.setAttribute(
            "data-theme",
            temaGuardado
        );
    }
});