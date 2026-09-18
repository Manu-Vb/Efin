export function validarDocumento(documento){

    return /^[0-9]{6,15}$/.test(documento);

}