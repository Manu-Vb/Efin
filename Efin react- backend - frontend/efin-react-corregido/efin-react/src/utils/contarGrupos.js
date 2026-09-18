export function contarGrupos(estudiantes){
    const grupos={};
    estudiantes.forEach(e=>{
        grupos[e.grupo]=(grupos[e.grupo]||0)+1;
    });

    return grupos;

}