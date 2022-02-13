import axios from "axios";
import Swal from "sweetalert2";
import {actualizarAvance} from '../functions/avance'

const tareas = document.querySelector('.listadoPendientes');

if(tareas){
    tareas.addEventListener('click',(e)=>{
        if(e.target.classList.contains('fa-circle-check')){
            const icono = e.target;
            const idTarea = icono.parentElement.parentElement.dataset.tarea;

            //Request hacia /tareas/:id
            const url = `${location.origin}/tareas/${idTarea}`;

            axios.patch(url, {idTarea})
                .then(function(res){
                    if(res.status === 200){
                        icono.classList.toggle('completo');
                        actualizarAvance();
                    }
                })
        }
        if(e.target.classList.contains('fa-trash-can')){
            const tareaHTML = e.target.parentElement.parentElement,
            idTarea = tareaHTML.dataset.tarea;
            Swal.fire({
                title: '¿Estás seguro de eliminar esta tarea?',
                text: "¡No podrás revertir este cambio!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '¡Si, elimínalo!',
                cancelButtonText: 'Cancelar'
              }).then((result) => {
                  if(result.value){
                    const url = `${location.origin}/tareas/${idTarea}`;
                    //Enviar el delete con axios
                    axios.delete(url,{params: {idTarea}})
                        .then(function(res){
                            if(res.status === 200){
                                //Eliminar nodo con la tarea
                                tareaHTML.parentElement.removeChild(tareaHTML);

                                Swal.fire(
                                    'Acción completada',
                                    res.data,
                                    'success'
                                )
                            }
                        });

                  }
              });

        }
    });
}

export default tareas;