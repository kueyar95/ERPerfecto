//Asignación de variables
    //Variables para capturar el formulario
var formAddProduct = document.getElementById("formAddProduct");
var InputNameProduct = document.getElementById("InputNameProduct");
var InputSKUProduct = document.getElementById("InputSKUProduct");
var InputCatProduct = document.getElementById("InputCatProduct");
var InputDescripProduct = document.getElementById("InputDescripProduct");
var InputPrecioProduct = document.getElementById("InputPrecioProduct");
    //Variables para activar/desactivar los errores debajo de los campos del formulario
var errorNameProduct = document.getElementById("errorNameProduct");
var errorSKUProduct = document.getElementById("errorSKUProduct");
var errorCatProduct = document.getElementById("errorCatProduct");
var errorDescripProduct = document.getElementById("errorDescripProduct");
var errorPrecioProduct = document.getElementById("errorPrecioProduct");
var combo = document.getElementById("inputCategory");

//Toda la programación del JS va dentro de este evento load
window.addEventListener('load', () => {
    //Evento submit para el formulario de addProduct
    formAddProduct.addEventListener('submit', (e) => {
        e.preventDefault();
        //Se añaden todos los input en este array...
        var data = {
            productName: InputNameProduct.value,
            SKUProduct: InputSKUProduct.value,
            idCategory: parseInt(combo.options[combo.selectedIndex].value),
            productDescription: InputDescripProduct.value,
            productPrice: parseInt(InputPrecioProduct.value),
        }
        console.log(data);
        var dataJSON = JSON.stringify(data);
        console.log(JSON.stringify(data));
        //...y se envían por este fetch
        fetch('/inventario/addProduct', {
            method: 'POST', // or 'PUT'
            body: dataJSON,// data can be `string` or {object}!
            headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            }
        }).then(res => res.json())
            .catch(error => console.log(error))
            .then(json => {
                    var keysErrors = Object.getOwnPropertyNames(json);
                    for(var val in keysErrors){
                        if(keysErrors[val] == 'nameProduct'){
                            if(errorNameProduct.classList.contains('d-none')){
                                errorNameProduct.classList.remove('d-none');
                            }
                        }else if(keysErrors[val] == 'skuProduct'){
                            if(errorSKUProduct.classList.contains('d-none')){
                                errorSKUProduct.classList.remove('d-none');
                            }
                        }else if(keysErrors[val] == 'catProduct'){
                            if(errorCatProduct.classList.contains('d-none')){
                                errorCatProduct.classList.remove('d-none');
                            }
                        }else if(keysErrors[val] == 'precioProduct'){
                            if(errorPrecioProduct.classList.contains('d-none')){
                                errorPrecioProduct.classList.remove('d-none');
                            }
                        }
                    }
                    //TODO: Falta agregar el código para sacar las alertas de error una vez se envíen bien los datos
                }
            )

    });
});