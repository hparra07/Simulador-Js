// CARRITO ------------------------------------ //
const misProductos = [
    { id: 1, nombre: "Zapatillas Nike Air Max 200", precio: 17.999, imagen: "imagenes/zapa1.jpg" },
    { id: 2, nombre: "Zapatillas Nike Downshifter 11", precio: 21.999, imagen: "imagenes/zapa2.jpg" },
    { id: 3, nombre: "Zapatillas Nike Air Max Infinity 2", precio: 20.999, imagen: "imagenes/zapa3.jpg" },
    { id: 4, nombre: "Zapatillas Nike Quest 4", precio: 15.499, imagen: "imagenes/zapa4.jpg" },
    { id: 5, nombre: "Zapatillas Nike Air Max Infinity 2", precio: 20.999, imagen: "imagenes/zapa5.jpg" },
    { id: 6, nombre: "Zapatillas Nike Air Zoom Pegasus 38", precio: 24.999, imagen: "imagenes/zapa6.jpg"},
    { id: 7, nombre: "Zapatillas Nike Zoom Prevail", precio: 19.999, imagen: "imagenes/zapa7.jpg" },
    { id: 8, nombre: "Zapatillas Nike Court Vision Lo Canvas", precio: 13.499, imagen: "imagenes/zapa8.jpg" },
    { id: 9, nombre: "Zapatillas Nike Revolution 5", precio: 14.299, imagen: "imagenes/zapa9.jpg" },
    { id: 10, nombre: "Zapatillas Nike React Miler 2", precio: 25.999, imagen: "imagenes/zapa10.jpg" },
    { id: 11, nombre: "Zapatillas Nike Renew Run", precio: 16.499, imagen: "imagenes/zapa11.jpg" },
    { id: 12, nombre: "Zapatillas Nike Revolution 5", precio: 12.499, imagen: "imagenes/zapa12.jpg" },
    { id: 13, nombre: "Zapatillas Nike React Miler", precio: 26.399, imagen: "imagenes/zapa13.jpg" },
    { id: 14, nombre: "Zapatillas Nike Renew Run 2", precio: 17.999, imagen: "imagenes/zapa14.jpg" },
    { id: 15, nombre: "Zapatillas Nike React Miler 2", precio: 25.999, imagen: "imagenes/zapa15.jpg" },
    { id: 16, nombre: "Zapatillas Nike Downshifter 11", precio: 13.499, imagen: "imagenes/zapa16.jpg" },
    { id: 17, nombre: "Zapatillas Nike Renew Run 2", precio: 17.999, imagen: "imagenes/zapa17.jpg" },
    { id: 18, nombre: "Zapatillas Nike Reposto", precio: 16.999, imagen: "imagenes/zapa18.jpg"},
    { id: 19, nombre: "Zapatillas Nike Renew Run 2", precio: 17.999, imagen: "imagenes/zapa19.jpg" },
    { id: 20, nombre: "Zapatillas Nike Downshifter 11", precio: 13.499, imagen: "imagenes/zapa20.jpg" }
]

// INDICAR CANTIDAD DE PRODUCTOS DISPONIBLES ----------- //

function crearProductos(misProductos) {
    let cantProductos = $('.titulo > h3')
    cantProductos.html(`(Tenés ${misProductos.length} productos disponibles)`)
}

crearProductos(misProductos)

//AÑADIR PRODUCTOS ------------------ //

const agregarProductos = document.querySelectorAll('#boton')
agregarProductos.forEach((agregarProducto) => {
    agregarProducto.addEventListener('click', agregarAlClickear)
})

const confirmarCompra = document.querySelector('.confirmarCompra')
confirmarCompra.addEventListener('click', comprar)

const miCarrito = document.querySelector('#carrito')

function agregarAlClickear(event) {
    const button = event.target
    const item = button.closest('.item')

    const itemTitulo = item.querySelector('#titulo').textContent
    const itemPrecio = item.querySelector('#precio').textContent
    const itemImagen = item.querySelector('#imagen').src

    agregarAlCarrito(itemTitulo, itemPrecio, itemImagen)
}

function agregarAlCarrito(itemTitulo, itemPrecio, itemImagen) {

    const elementoCarrito = document.querySelectorAll('.tituloItem')

    for (let i = 0; i < elementoCarrito.length; i++) {
        if (elementoCarrito[i].innerText === itemTitulo) {
            let cantidadElemento = elementoCarrito[i].parentElement.parentElement.parentElement.querySelector('#cantidad')
            cantidadElemento.value++
                actualizarTotalCarrito()
            return
        }

    }

    const filaCarrito = document.createElement('div')

    const contenidoCarrito = `
    <div class="borrar">
    <ul class="carrito" class="list-group mb-3">
        <div class="articulo">
        <li class="list-group-item d-flex justify-content-between lh-condensed">
            <div class="col-sm-4">
                <h6 class="my-0 tituloItem">${itemTitulo}</h6>
                <div class="d-flex align-items-center h-100">
                    <figure>
                        <img src="${itemImagen}" alt="${itemTitulo}" width="50px" height="50px">
                    </figure>
                </div>
            </div>
            <div>
            <input class="col-sm-4" type="number" value="1" id="cantidad">
            <button class="btn btn-danger botonBorrar" type="button">X</button>
        </div>
        <span class="text-muted" id="precio">${itemPrecio}</span>
        </li>
        </div>
    </ul>
    </div>`

    filaCarrito.innerHTML = contenidoCarrito
    miCarrito.append(filaCarrito)

    filaCarrito.querySelector('.botonBorrar').addEventListener('click', borrarItem)

    filaCarrito.querySelector('#cantidad').addEventListener('change', cambiarItem)
    actualizarTotalCarrito()
}

// ACTUALIZAR CARRITO ----------------- //

function actualizarTotalCarrito() {
    let total = 0

    const totalCarrito = document.querySelector('#total')

    const itemsCarrito = document.querySelectorAll('.articulo')

    itemsCarrito.forEach(articulo => {
        const precioItemCarrito = articulo.querySelector('#precio')
        const precioItem = Number(precioItemCarrito.textContent.replace('$', ''))
        const cantidadItem = articulo.querySelector('#cantidad')
        const cantidadItemCarrito = Number(cantidadItem.value)

        total = total + precioItem * cantidadItemCarrito
    })

    totalCarrito.innerHTML = `Total (ARS): $${total}`
}

// BORRAR ITEM DEL CARRITO -------------- //
function borrarItem(event) {
    const clickBoton = event.target

    clickBoton.closest('.borrar').remove()
    actualizarTotalCarrito()
}

// CAMBIAR CANTIDAD DE PRODUCTO ----------- // 
function cambiarItem(event) {
    const tomar = event.target
    if (tomar.value <= 0) {
        tomar.value = 1
    }
    actualizarTotalCarrito()
}

// FINALIZAR COMPRA ----------------------- // 
function comprar() {
    $('.carrito').html('')
    actualizarTotalCarrito()
    alert("Gracias por tu compra! Pronto recibirás el pedido.")
    console.log("Tarea Finalizada");
}


// BUSCADOR ----------------------------------- //

function mostrar() {
    alert("Ups! Pronto tendremos esta información disponible")
}
let buscar = $('#buscador').on('click', mostrar)