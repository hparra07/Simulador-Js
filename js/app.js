// CARRITO ------------------------------------ //
const misProductos = [
    { id: 1, nombre: "Banana", precio: 80, imagen: "imagenes/bananas.jpg" },
    { id: 2, nombre: "Cebolla morada", precio: 100, imagen: "imagenes/cebolla_morada.jpg" },
    { id: 3, nombre: "Choclo amarillo", precio: 90, imagen: "imagenes/choclo.jpg" },
    { id: 4, nombre: "Espinaca", precio: 50, imagen: "imagenes/espinaca.jpg" },
    { id: 5, nombre: "Maple de huevos blancos", precio: 150, imagen: "imagenes/huevos_blancos.jpg" },
    { id: 6, nombre: "Maple de huevos colorados", precio: 180, imagen: "imagenes/huevos_colorados.jpeg" },
    { id: 7, nombre: "Lechuga criolla", precio: 70, imagen: "imagenes/lechuga_criolla.jpg" },
    { id: 8, nombre: "Lechuga francesa", precio: 80, imagen: "imagenes/lechuga_francesa.jpg" },
    { id: 9, nombre: "Lechuga mantecosa", precio: 60, imagen: "imagenes/lechuga_mantecosa.jpg" },
    { id: 10, nombre: "Lechuga repollada", precio: 80, imagen: "imagenes/lechuga_repollada.jpg" },
    { id: 11, nombre: "Morron amarillo", precio: 150, imagen: "imagenes/morron_amarillo.jpg" },
    { id: 12, nombre: "Morron rojo", precio: 150, imagen: "imagenes/morron_rojo.jpg" },
    { id: 13, nombre: "Morron verde", precio: 150, imagen: "imagenes/morron_verde.jpg" },
    { id: 14, nombre: "Palta", precio: 90, imagen: "imagenes/palta.jpg" },
    { id: 15, nombre: "Papa blanca", precio: 60, imagen: "imagenes/papa_blanca.jpg" },
    { id: 16, nombre: "Papa negra", precio: 50, imagen: "imagenes/papa_negra.jpg" },
    { id: 17, nombre: "Papines", precio: 90, imagen: "imagenes/papines.png" },
    { id: 18, nombre: "Remolacha", precio: 90, imagen: "imagenes/remolacha.jpg" },
    { id: 19, nombre: "Tomate cherry", precio: 120, imagen: "imagenes/tomate-cherry.jpg" },
    { id: 20, nombre: "Tomate perita", precio: 80, imagen: "imagenes/tomate_perita.jpg" }
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
                        <img src="${itemImagen}" alt="" width="50px" height="50px">
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