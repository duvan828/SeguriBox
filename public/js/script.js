let boton = document.getElementById("icono");
let boton1 = document.getElementById("inicio");
let boton2 = document.getElementById("acd");
let boton3 = document.getElementById("cont");
let enlaces = document.getElementById("enlaces");
let cuerpo = document.getElementById("cuerpo");
let contador = 0;

boton.addEventListener("click", accionMenu = (e) => {
    e.preventDefault();
    if(contador==0){
        enlaces.className = ("enlaces dos");
        cuerpo.className = ("ocultarScroll");
        contador=1;
    } else {
        enlaces.classList.remove("dos");
        enlaces.className = ("enlaces uno");
        cuerpo.className = ("mostrarScroll");
        contador=0;
    }
});
boton1.addEventListener("click", accionMenu = (e) => {
        enlaces.classList.remove("dos");
        enlaces.className = ("enlaces uno");
        cuerpo.className = ("mostrarScroll");
        contador=0;
});
boton2.addEventListener("click", accionMenu = (e) => {
        enlaces.classList.remove("dos");
        enlaces.className = ("enlaces uno");
        cuerpo.className = ("mostrarScroll");
        contador=0;
});
boton3.addEventListener("click", accionMenu = (e) => {
        enlaces.classList.remove("dos");
        enlaces.className = ("enlaces uno");
        cuerpo.className = ("mostrarScroll");
        contador=0;
});

let botonInicioSesion = document.getElementById("iniciar");
let botonCerrarInicio = document.getElementById("salirInicio");
let ventanaInicio = document.getElementById("ventanaInicio");

// function abrirSesion(){
//     botonInicioSesion.addEventListener("click", (e) =>{
//         e.preventDefault();
//         ventanaInicio.className = ("inicioSesion dos");
//         cuerpo.className = ("ocultarScroll");
//     });
// }



// botonCerrarInicio.addEventListener("click",  (e) => {
//     e.preventDefault();
//     ventanaInicio.classList.remove("dos");
//     ventanaInicio.className = ("inicioSesion uno");
//     cuerpo.className = ("mostrarScroll");
// });