const ventanaOtroSitio = document.getElementById('OtroSitio');
const abrirOtroSitio = () => {
    ventanaOtroSitio.classList.remove('down');
}
const cerrarOtroSitio = () => {
    ventanaOtroSitio.classList.add('down');
}

const listarApp = () => {
    document.getElementById('ListaApp').classList.remove("down");
}

const salirLista = () =>{
    document.getElementById('ListaApp').classList.add('down');
}

eliminarCuenta = (id, idCuenta) => {
	swal({
		title: "¿Está seguro de eliminar la cuenta?",
		text: "Se borrará la información de la cuenta.",
		icon: "warning",
		buttons: true,
		dangerMode: true,
	}).then((OK) => {
			if (OK) {
				$.ajax({
					url: `/eliminar-cuenta/${idCuenta}`,
					success: (res) => {
						console.log(res);
					}
				});
				swal("¡La cuenta fue eliminada!", {
					icon: "success",
				}).then((ok) => {
					if (ok) {
						location.href = "/securitybox/"+id;
					}
				});
			} else {
				swal("El cuenta no se eliminó.");
			}
		});
}

actualizarSitio = (id, idSitio) => {
	swal({
		title: "¿Está seguro de actualizar el sitio?",
		icon: "warning",
		buttons: true,
		dangerMode: true,
	}).then((OK) => {
			if (OK) {
				document.getElementById('App-'+idSitio).action = `/actualizar-sitio/${idSitio}`;
                document.getElementById('App-'+idSitio).submit();
				swal("El sitio fue actualizado.", {
					icon: "success",
				}).then((ok) => {
					if (ok) {
						location.href = "/securitybox/"+id;
					}
				});
			} else {
				swal("El sitio no se actualizó.");
			}
		});
}

eliminarSitio = (id, idSitio) => {
	swal({
		title: "¿Está seguro de eliminar el sitio?",
		text: "Se borrarán permanentemente las cuentas que tengan este sitio.",
		icon: "warning",
		buttons: true,
		dangerMode: true,
	}).then((OK) => {
			if (OK) {
				$.ajax({
					url: `/eliminar-sitio/${idSitio}`,
					success: (res) => {
						console.log(res);
					}
				});
				swal("¡El sitio fue eliminado!", {
					icon: "success",
				}).then((ok) => {
					if (ok) {
						location.href = "/securitybox/"+id;
					}
				});
			} else {
				swal("El sitio no se eliminó.");
			}
		});
}

/* VIEW EDITAR CUENTA */
const seleccionarOpcion = (sitio) => {
	document.getElementById('sitioCambiar').value = sitio;
}

/* BUSQUEDA DE CUENTAS */
const buscar = (id) => {
	let form = document.getElementById('Fbusqueda');
	let sitios = document.getElementById('busca').value;
	form.action = '/securitybox-busca/'+id;
	form.submit();
	if(sitios == 'todos'){
		location.href = "/securitybox/"+id
	}
}

document.querySelector("#btn").addEventListener("click",function(){
    $longitud = 10; //numero de caracteres
    $clave = generarClave($longitud); 
    document.querySelector("#result").innerHTML = $clave;
  });
  
  
  /* Generador de claves  */
  function generarClave(long)
  {
      /*caracteres permitidos*/
      let caracteres = "Aa0BbCc1DdEe2FfGgHh3IiJj4KkLl5MmNn6OoPp7QqRr8SsTt9UuVv*WwXxYyZz$#",
          clave = '',
          numero;
  
      /*creacion de clave*/
      for(let i=0;i<long;i++)
      {
          numero = getNumero( 0, caracteres.length );
          clave += caracteres.substring( numero, numero + 1 );
      }
      return clave;
  }
  
  
  /*Función para generar un numero aleatorio*/
  function getNumero(min,max)
  {
      return Math.floor( Math.random() * ( max - min ) ) + min;
  }

  var cont = 0;
  function mostrarBotones(){
	let ops = document.getElementById("optionsMv");
	if(cont==0){
		ops.classList.add("mostrarMv");
		cont=1;
	} else {
		ops.classList.remove("mostrarMv");
		cont=0;
	}
  }