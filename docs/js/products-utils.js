export let productosFirebase = [];

export function renderizarProductos({
  productosSnapshot,
  filtro = () => true,
  contenedor,
  onAfterRender = () => {},
}) {
  productosFirebase = [];
  let html = "";

  productosSnapshot.forEach((doc) => {
    const product = doc.data();
    productosFirebase.push({ ...product, id: doc.id });
    if (filtro(product)) {
      const priceFormat = product.price.toLocaleString("es-CO");
      html += `
        <div class="col">
          <div class="card mb-4 rounded-3 shadow">
            <img src="${product.urlImage}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
              <h5 class="card-product-title">${product.name}</h5>
              <p class="card-product-subtitle">${product.description}</p>
              <p class="card-text"><strong>$${priceFormat} COP</strong></p>
              <button class="btn btn-success agregar-carrito" data-id="${doc.id}">Agregar al carrito</button>
            </div>
          </div>
        </div>
      `;
    }
  });

  if (contenedor) {
    contenedor.innerHTML = html;
    // Asigna eventos a los botones de carrito
    const botonesCarrito = contenedor.querySelectorAll(".agregar-carrito");
    botonesCarrito.forEach((boton) => {
      boton.addEventListener("click", function () {
        const idProducto = this.getAttribute("data-id");
        if (window.agregarAlCarrito) window.agregarAlCarrito(idProducto);
      });
    });
  }

  onAfterRender();
}
