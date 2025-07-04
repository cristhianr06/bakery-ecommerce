// import { onGetProducts } from "./firebase.js";

// const containerFeatured = document.querySelector("#listaProductos");

// window.addEventListener("DOMContentLoaded", async () => {
  
//   onGetProducts((productosSnapshot) => {
//     let html = "";

//     productosSnapshot.forEach((doc) => {
//       const product = doc.data();
//       const priceFormat = product.price.toLocaleString('es-CO');
//       if (product.featured) {
//         html += `
//           <div class="col">
//           <div class="card mb-4 rounded-3 shadow" data-aos="zoom-in" data-aos-offset="200">
//           <img src="${product.urlImage}" class="card-img-top" alt="${product.name}">
//           <div class="card-body">
//             <h5 class="card-product-title">${product.name}</h5>
//             <p class="card-product-subtitle">${product.description}</p>
//             <p class="card-text"><strong>$${priceFormat} COP</strong></p>
//             <button class="btn btn-success agregar-carrito" data-id="${doc.id}">Agregar al carrito</button>
//           </div>
//         </div>
//         </div> 
//         `;
//       }
//     });
//     containerFeatured.innerHTML = html;
//   });
// });

import { onGetProducts } from "./firebase.js";
import { renderizarProductos } from "./products-utils.js";

const containerFeatured = document.querySelector("#bestSelling");

window.addEventListener("DOMContentLoaded", async () => {
  onGetProducts((productosSnapshot) => {
    renderizarProductos({
      productosSnapshot,
      filtro: (product) => product.featured,
      contenedor: containerFeatured
    });
  });
});
