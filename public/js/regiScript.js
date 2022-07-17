let seccionPersona = document.getElementById("datosPersona");
let seccionCorreo =  document.getElementById("datosCorreo");
let siguiente = document.getElementById("siguiente");
let volver = document.getElementById("volver");
let btnGuardar = document.getElementById("terminar");

let inputNombre = document.getElementById("nombre");
let inputApellido = document.getElementById("apellido");
let inputTipoDocumento = document.getElementById("documentos");
let inputDocumento = document.getElementById("nDocumento");
let inputFechaNa = document.getElementById("fecha");
let inputGenero = document.getElementsByName("genero");
let inputUsuario = document.getElementById("usuario");
let inputCorreo = document.getElementById("correo");
let inputContraseña = document.getElementById("contraseña");
let inputContraseñaConfir = document.getElementById("contraseñaconfi");

let ventanaConfirm = document.getElementById("ventanaConfirm");


let tieneMayuscula = (mensaje) => {
    let upperLower = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

  for(let i=0;i<upperLower.length;i++){
    if (mensaje.indexOf(upperLower.charAt(i))!=-1) {
        return true;
    }
  }
  return false;
}

let tieneNumero = (mensaje) =>{
    let number = "1234567890";
    for(let i=0;i<number.length;i++){
    if (mensaje.indexOf(number.charAt(i))!=-1) {
        return true;
    }
  }
  return false;
}

let tieneCaracter = (mensaje) =>{
    let especiales = String(".-,_<>#$%&/@=+*?¡¿?!");
    for(let i=0;i<especiales.length;i++){
    if (mensaje.indexOf(especiales.charAt(i))!=-1) {
        return true;
    }
  }
  return false;
}




let info1 = document.getElementById("info1");
let info2 = document.getElementById("info2");
let info3 = document.getElementById("info3");
let info4 = document.getElementById("info4");
let icon1 = document.getElementById("icon1");
let icon2 = document.getElementById("icon2");
let icon3 = document.getElementById("icon3");
let icon4 = document.getElementById("icon4");

let mensajeContraseña = ()=>{
    let pass = inputContraseña.value;
    if(pass.length>=8){
        info1.style = "color: #0cba06";
        inputContraseña.style = "outline: 1.5px solid #0cba06";
        icon1.classList.remove("bi-x-circle");
        icon1.classList.add("bi-check-circle");
        inputContraseñaConfir.disabled = false;
    } else {
        info1.style = "color: #ba0606";
        icon1.classList.remove("bi-check-circle");
        icon1.classList.add("bi-x-circle");
        inputContraseñaConfir.disabled = true;
    }
    if(tieneMayuscula(pass)){
        info2.style = "color: #0cba06";
        icon2.classList.remove("bi-x-circle");
        icon2.classList.add("bi-check-circle");
        inputContraseñaConfir.disabled = false;
    } else {
        info2.style = "color: #ba0606";
        icon2.classList.remove("bi-check-circle");
        icon2.classList.add("bi-x-circle");
        inputContraseñaConfir.disabled = true;
    }

    if(tieneNumero(pass)){
        info3.style = "color: #0cba06";
        icon3.classList.remove("bi-x-circle");
        icon3.classList.add("bi-check-circle");
        inputContraseñaConfir.disabled = false;
    } else {
        info3.style = "color: #ba0606";
        icon3.classList.remove("bi-check-circle");
        icon3.classList.add("bi-x-circle");
        inputContraseñaConfir.disabled = true;
    }

    if(tieneCaracter(pass)){
        info4.style = "color: #0cba06";
        icon4.classList.remove("bi-x-circle");
        icon4.classList.add("bi-check-circle");
        inputContraseñaConfir.disabled = false;
    } else {
        info4.style = "color: #ba0606";
        icon4.classList.remove("bi-check-circle");
        icon4.classList.add("bi-x-circle");
        inputContraseñaConfir.disabled = true;
    }

    if(pass===""){
        info1.style = "color: #ba0606";
        info2.style = "color: #ba0606";
        info3.style = "color: #ba0606";
        info4.style = "color: #ba0606";
        inputContraseña.style = "outline: 1.5px solid #ba0606";
        icon1.classList.remove("bi-check-circle");
        icon1.classList.add("bi-x-circle");
        icon2.classList.remove("bi-check-circle");
        icon2.classList.add("bi-x-circle");
        icon3.classList.remove("bi-check-circle");
        icon3.classList.add("bi-x-circle");
        icon4.classList.remove("bi-check-circle");
        icon4.classList.add("bi-x-circle");
    }
};

let verificarContra = () =>{
    if(inputContraseña.value === inputContraseñaConfir.value){
        inputContraseñaConfir.style = "outline: 1.5px solid #0cba06";
        btnGuardar.disabled = false;
    } else {
        inputContraseñaConfir.style = "outline: 1.5px solid #ba0606";
        btnGuardar.disabled = true;
    }
}

let verificarCorreo = () =>{
    if(inputCorreo.value != "" && inputCorreo.value.includes('@') && inputCorreo.value.includes('.')){
        inputCorreo.style = "outline: 1.5px solid #0cba06";
        inputContraseña.disabled = false;
    } else {
        inputCorreo.style = "outline: 1.5px solid #ba0606";
        inputContraseña.disabled = true;
    }
}

const aplicarLimites=()=>{
    let fecha = document.getElementById('fecha');
    let today = new Date().toLocaleDateString().replaceAll('/', '-').split('-').reverse();
    let m = today[1].length == 2 ? today[1] : "0"+today[1];
    today = today[0]+'-'+m+'-'+today[2];
    let minimum = "1900-01-01";
    fecha.max = today;
    fecha.min = minimum;
}
