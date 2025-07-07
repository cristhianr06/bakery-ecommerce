import { onGetProducts } from "./firebase.js";
import { agregarAlCarrito } from "./carrito.js";

export let productosFirebase = [];

// Función para renderizar productos
function renderizarProductos({ productosSnapshot, filtro, contenedor }) {
  productosFirebase = [];
  let html = "";
  productosSnapshot.forEach((doc) => {
    const product = doc.data();
    //productosFirebase.push({ ...product, id: doc.id }); //Forma con operador spread
    let nuevoProducto = {
      name: product.name,
      description: product.description,
      price: product.price,
      urlImage: product.urlImage,
      category: product.category,
      featured: product.featured,
      id: doc.id,
    };
    productosFirebase.push(nuevoProducto);

    if (filtro(product)) {
      const priceFormat = product.price.toLocaleString("es-CO");
      html += `
        <div class="col" data-aos="zoom-in">
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
  contenedor.innerHTML = html;

  // Asignar eventos a los botones
  const botones = contenedor.querySelectorAll(".agregar-carrito");
  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      const idProducto = boton.getAttribute("data-id");
      agregarAlCarrito(idProducto);
    });
  });
}

// Código principal para mostrar productos según la página
window.addEventListener("DOMContentLoaded", () => {
  const containerProducts = document.querySelector("#list-products");
  const containerFeatured = document.querySelector("#featured-products");
  const tituloCategoria = document.querySelector("#tituloCategoria");

  const params = new URLSearchParams(window.location.search);
  const categoria = params.get("cat");

  onGetProducts((productosSnapshot) => {
    // Mostrar productos por categoría si existe contenedor
    if (containerProducts) {
      if (tituloCategoria) {
        tituloCategoria.textContent = categoria ? categoria : "Productos";
      }
      renderizarProductos({
        productosSnapshot,
        filtro: categoria
          ? (product) => product.category === categoria
          : () => true,
        contenedor: containerProducts,
      });
    }

    // Mostrar productos destacados si existe contenedor
    if (containerFeatured) {
      renderizarProductos({
        productosSnapshot,
        filtro: (product) => product.featured,
        contenedor: containerFeatured,
      });
    }
  });
});
