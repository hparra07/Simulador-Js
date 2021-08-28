// BUSCADOR ----------------------------------- //

function mostrar() {
    alert("Ups! Pronto tendremos esta información disponible")
}
let buscar = $('#buscador').on('click', mostrar)

// CARGAR PRODUCTOS DESTACADOS ---------------- // 

const URL = "js/productos.JSON"
const contenedorProductos = $('#contenedorProductos')

$.getJSON(URL, (response, status) => {
    if (status === "success") {
        response.forEach(function(producto) {
            contenedorProductos.append(`
                    <div class="item selfie col-lg-3 col-md-4 col-6 col-sm">
                        <figure>
                            <img src="${producto.imagen}" alt="" width="200px" height="150px">
                            <figcaption>
                                <p>${producto.nombre} (${producto.promocion})</p>
                            </figcaption>
                        </figure>
                    </div>
            `)
        })
    }
}).fail((error) => {
    console.log(error)
}).always(() => {
    console.log("Tarea finalizada");
})