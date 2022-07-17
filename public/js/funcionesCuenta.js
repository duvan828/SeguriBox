const ventana = document.getElementById('ventanaImg');
const abrirVentanaImg = () => {
    ventana.classList.remove('down');
}
const cerrarVentanaImg = () => {
    ventana.classList.add('down');
}

const mostrar = () => {
    const img = document.getElementById('myImage').value;
    console.log(img.json());
}

const getCambiosCuentaSB = (id) =>{
    const cambio = document.getElementById('cambios');
    swal({
        title: "¿Está seguro de actualizar los datos?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((OK) => {
            if (OK) {
                cambio.action = `/guardar-cambios/${id}`;
                cambio.submit();
                swal("La cuenta se actualizará.", {
                    icon: "success",
                });
            } else {
                swal("La cuenta no se actualizó.");
            }
        });
}

const getEliminarCuentaSB = (id) =>{
    swal({
        title: "¿Está seguro eliminar su Cuenta?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((OK) => {
            if (OK) {
                location.href = `/eliminar/${id}`;
                swal("¡La cuenta se ha eliminado!.", {
                    icon: "success",
                });
            } else {
                swal("La cuenta no se eliminó.");
            }
        });
}

document.getElementById("file").onchange=function(e){
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function() {
        let preview = document.getElementById("preview");
        imagen = document.createElement('img');
        imagen.src = reader.result;
        imagen.style.width = "200px";
        preview.innerHTML = "";
        preview.append(imagen);
    }
}