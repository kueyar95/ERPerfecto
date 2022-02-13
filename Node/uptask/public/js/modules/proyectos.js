import Swal from "sweetalert2";
import axios from "axios";

const btnEliminar = document.querySelector('#eliminarProyecto');
if(btnEliminar){
	btnEliminar.addEventListener('click',(e) =>{
		const urlProyecto = e.target.dataset.proyectoUrl;
		//console.log(urlProyecto);
		Swal.fire({
			title: '¿Estás seguro de eliminar el proyecto?',
			text: "¡No podrás revertir este cambio!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: '¡Si, elimínalo!',
			cancelButtonText: 'Cancelar'
		  }).then((result) => {
			if (result.isConfirmed) {
				//Enviar petición a axios
				const url = `${location.origin}/proyectos/${urlProyecto}`;
				axios.delete(url, {params: {urlProyecto}})
					.then(function(res) {
						Swal.fire(
							'¡Eliminado!',
							res.data,
							'success'
						);
						
						//Redireccionar al inicio
						setTimeout(() => {
							window.location.href = '/'
						},3000);
					})
					.catch(() => {
						Swal.fire({
							icon: 'error',
							title: 'Hubo un error',
							text: 'No se pudo eliminar el proyecto'
						})
					})
			}
		})
	});
}
export default btnEliminar;
