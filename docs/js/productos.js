import { onGetProducts } from "./firebase.js";
import { agregarAlCarrito } from "./carrito.js";

export let productosFirebase = [];
const loadingDiv = document.getElementById('loading');
const withoutProducts = document.querySelector('#without-products')

// Función para renderizar productos
function renderizarProductos({ productosSnapshot, filtro, contenedor, loadingDiv }) {
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
        <div class="col mt-4" data-aos="zoom-in">
          <div class="card h-100 d-flex flex-column mb-4 rounded-3 shadow card-product">
            <div class="image-wrapper"><img src="${product.urlImage}" class="card-img-top" alt="${product.name}" ></div>
            <div class="card-body d-flex flex-column">
              <h5 class="card-product-title">${product.name}</h5>
              <p class="card-product-subtitle">${product.description}</p>
              <span class="card-text text-center card-product-price">$${priceFormat} COP</span>
              <button class="btn btn-success py-2 agregar-carrito" data-id="${doc.id}"><i class="bi bi-cart-plus-fill me-2"></i>Agregar al carrito</button>
            </div>
          </div>
        </div>
      `;
    }
  });
  contenedor.innerHTML = html;

  if (loadingDiv) {
    loadingDiv.style.display = 'none';
  }

  if(html === ''){
    withoutProducts.style.display = 'block';
    const params = new URLSearchParams(window.location.search);
    const categoria = params.get("cat");
    let text = document.querySelector('#text-without-products')
    text.textContent = `Lo sentimos en el momento no tenemos ${categoria}`
  }

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
        loadingDiv
      });
    }

    // Mostrar productos destacados si existe contenedor
    if (containerFeatured) {
      renderizarProductos({
        productosSnapshot,
        filtro: (product) => product.featured,
        contenedor: containerFeatured,
        loadingDiv
      });
    }
  });
});
