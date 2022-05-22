let cliente = {
    mesa: '',
    hora: '',
    pedido: []
};
const categorias = {
    1: 'Comida',
    2: 'Bebidas',
    3: 'Postres'
}

const btnGuardarCliente = document.querySelector('#guardar-cliente');
btnGuardarCliente.addEventListener('click', guardarCliente);

function guardarCliente(){
    const mesa = document.querySelector("#mesa").value;
    const hora = document.querySelector("#hora").value;

    //Revisar si hay campos vacíos
    const camposVacios = [mesa, hora].some(campo => campo === '');
    
    if(camposVacios){
        //Verificar si ya hay alerta
        const existeAlerta = document.querySelector('.invalid-feedback');

        if(!existeAlerta){
            const alerta = document.createElement('div');
            alerta.classList.add('invalid-feedback', 'd-block', 'text-center');
            alerta.textContent = 'Todos los campos son obligatorios';
            document.querySelector('.modal-body form').appendChild(alerta);

            //Eliminar alerta tras 3 seg
            setTimeout(()=>{
                alerta.remove();
            }, 3000);
        }
        return;
    }
    //Asignar datos del formulario a cliente
    cliente = {...cliente, mesa, hora,}

    //Ocultar modal
    const modalFormulario = document.querySelector('#formulario');
    const modalBootstrap = bootstrap.Modal.getInstance(modalFormulario);
    modalBootstrap.hide();
    
    //Mostrar secciones
    mostrarSecciones();

    //Obtener platillos de la API
    obtenerPlatillos();
}

function mostrarSecciones(){
    const seccionesOcultas = document.querySelectorAll('.d-none');
    seccionesOcultas.forEach(seccion => seccion.classList.remove('d-none'));
}

function obtenerPlatillos(){
    const url = 'http://localhost:4000/platillos';
    fetch(url)
        .then( resp => resp.json())
        .then( resultados => mostrarPlatillos(resultados))
        .catch( error => console.log(error));
}

function mostrarPlatillos(platillos){
    const contenido = document.querySelector('#platillos .contenido');
    platillos.forEach(platillo =>{
        const row = document.createElement('div');
        row.classList.add('row', 'py-3', 'border-top');

        const nombre = document.createElement('div');
        nombre.classList.add('col-md-4');
        nombre.textContent = platillo.nombre;

        const precio = document.createElement('div');
        precio.classList.add('col-md-3', 'fw-bold');
        precio.textContent = `$ ${platillo.precio}`;

        const categoria = document.createElement('div');
        categoria.classList.add('col-md-3');
        categoria.textContent = categorias[platillo.categoria];

        const inputCantidad = document.createElement('input');
        inputCantidad.type = 'number';
        inputCantidad.min = 0;
        inputCantidad.id = `producto-${platillo.id}`;
        inputCantidad.classList.add('form-control');
        inputCantidad.value = 0;

        //Función que detecta cantidad y platillo que se agrega
        inputCantidad.onchange = function(){
            const cantidad = parseInt(inputCantidad.value);
            agregarPlatillo({...platillo, cantidad});
        }

        const agregar = document.createElement('div');
        agregar.classList.add('col-md-2');
        agregar.appendChild(inputCantidad);

        row.appendChild(nombre);
        row.appendChild(precio);
        row.appendChild(categoria);
        row.appendChild(agregar);
        contenido.appendChild(row);
    })
}

function agregarPlatillo(producto){
    //Extraer pedido actual
    let { pedido } = cliente;
    
    //Revisar que la cantidad sea mayor que 0
    if(producto.cantidad > 0){

         if(pedido.some( articulo => articulo.id === producto.id)){
             //Artículo existe, actualizar cantidad
             const pedidoActualizado = pedido.map(articulo => {
                 if(articulo.id === producto.id){
                     articulo.cantidad = producto.cantidad;
                 }
                 return articulo;
             });
             //Se asigna el nuevo array a cliente.pedido
             cliente.pedido = [...pedidoActualizado];
         }else{
             //Artículo no existe, lo agregamos al array de pedidos
             cliente.pedido = [...pedido, producto];
         }
    }else{
        //Eliminar platillos cuando su cantidad sea cero
        const resultado = pedido.filter(articulo => articulo.id !== producto.id);
        cliente.pedido = [...resultado];
    }
    //Limpiar código html previo
    limpiarHTML();

    //Mostrar resumen
    actualizarResumen();
}

function actualizarResumen(){
    const contenido = document.querySelector('#resumen .contenido');

    const resumen = document.createElement('div');
    resumen.classList.add('col-md-6', 'card', 'py-5', 'px-3', 'shadow');

    //Información mesa
    const mesa = document.createElement('p');
    mesa.textContent = 'Mesas: ';
    mesa.classList.add('fw-bold');

    const mesaSpan = document.createElement('span');
    mesaSpan.textContent = cliente.mesa;
    mesaSpan.classList.add('fw-normal');

    //Información hora
    const hora = document.createElement('p');
    hora.textContent = 'Hora: ';
    hora.classList.add('fw-bold');

    const horaSpan = document.createElement('span');
    horaSpan.textContent = cliente.hora;
    horaSpan.classList.add('fw-normal');

    //Agregar a elemento padre
    hora.appendChild(horaSpan);
    mesa.appendChild(mesaSpan);

    //Título de la sección
    const heading = document.createElement('h3');
    heading.textContent = 'Platillos Consumidos';
    heading.classList.add('my-4', 'text-center');

    //Iterar sobre array de pedidos
    const grupo = document.createElement('ul');
    grupo.classList.add('list-group');

    const {pedido} = cliente;
    pedido.forEach(articulo => {
        const {nombre, cantidad, precio, id} = articulo;
        const lista = document.createElement('li');
        lista.classList.add('list-group-item');

        const nombreEl = document.createElement('h4');
        nombreEl.classList.add('my-4');
        nombreEl.textContent = nombre;

        const cantidadEl = document.createElement('p');
        cantidadEl.classList.add('fw-bold');
        cantidadEl.textContent = 'Cantidad: ';

        const cantidadValor = document.createElement('span');
        cantidadValor.classList.add('fw-normal');
        cantidadValor.textContent = cantidad;
        cantidadEl.appendChild(cantidadValor);

        const precioEl = document.createElement('p');
        precioEl.classList.add('fw-bold');
        precioEl.textContent = 'Precio: ';

        const precioValor = document.createElement('span');
        precioValor.classList.add('fw-normal');
        precioValor.textContent = `$ ${precio} c/1`;
        precioEl.appendChild(precioValor);

        const subTotal = document.createElement('p');
        subTotal.classList.add('fw-bold');
        subTotal.textContent = 'SubTotal: ';

        const subTotalValor = document.createElement('span');
        subTotalValor.classList.add('fw-normal');
        subTotalValor.textContent = `$ ${precio * cantidad}`;
        subTotal.appendChild(subTotalValor);


        //Agregar elementos a li
        lista.appendChild(nombreEl);
        lista.appendChild(cantidadEl);
        lista.appendChild(precioEl);
        lista.appendChild(subTotal);
        //Agregar lista al grupo principal
        grupo.appendChild(lista);
    })

    //Agregar al contenido
    resumen.appendChild(mesa);
    resumen.appendChild(hora);
    resumen.appendChild(heading);
    resumen.appendChild(grupo);
    contenido.appendChild(resumen);
}

function limpiarHTML() {
    const contenido = document.querySelector('#resumen .contenido');

    while(contenido.firstChild){
        contenido.removeChild(contenido.firstChild);
    }
}