function getData(key){
    return JSON.parse(localStorage.getItem(key)) || [];
}

function saveData(key,data){
    localStorage.setItem(key, JSON.stringify(data));
}

function noti(texto){

    let n = document.createElement("div");

    n.className = "noti";
    n.innerText = texto;

    document.body.appendChild(n);

    setTimeout(() =>{
        n.remove();
    }, 2000);
}