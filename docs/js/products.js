// import { onGetProducts } from "./firebase.js";

// const containerProducts = document.querySelector("#listaProductos")
// const tituloCategoria = document.querySelector('#tituloCategoria')

// window.addEventListener("DOMContentLoaded", async () => {
//   const params = new URLSearchParams(window.location.search);
//   const categoria = params.get('cat');

//   onGetProducts((productosSnapshot) => {
//     mostrarProductosPorCategoria(productosSnapshot, categoria);
//   })
// });

// //Productos
// function mostrarProductosPorCategoria(productosSnapshot, categoria) {
//   let html = "";
//   if(categoria){
//     tituloCategoria.textContent = `Productos de ${categoria}`
//   }else{
//     tituloCategoria.textContent = `Productos`
//   }
  

//   productosSnapshot.forEach((doc) => {
//     const product = doc.data();
//     console.log(doc.id)
//     if (!categoria || product.category === categoria) {
//       const priceFormat = product.price.toLocaleString('es-CO');
//       html += `
//         <div class="col">
//           <div class="card mb-4 rounded-3 shadow" data-aos="zoom-in" data-aos-offset="200">
//             <img src="${product.urlImage}" class="card-img-top" alt="${product.name}">
//             <div class="card-body">
//               <h5 class="card-product-title">${product.name}</h5>
//               <p class="card-product-subtitle">${product.description}</p>
//               <p class="card-text"><strong>$${priceFormat} COP</strong></p>
//               <button class="btn btn-success agregar-carrito" data-id="${doc.id}">Agregar al carrito</button>
//             </div>
//           </div>
//         </div>
//       `;
//     }
//   });

//   containerProducts.innerHTML = html;
// }

import { onGetProducts } from "./firebase.js";
import { renderizarProductos } from "./products-utils.js";

const containerProducts = document.querySelector("#listaProductos");
const tituloCategoria = document.querySelector('#tituloCategoria');

window.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const categoria = params.get('cat');

  onGetProducts((productosSnapshot) => {
    if(tituloCategoria){
      if (categoria) {
      tituloCategoria.textContent = `${categoria}`;
    } else {
      tituloCategoria.textContent = `Productos`;
    }
    }
    renderizarProductos({
      productosSnapshot,
      filtro: categoria 
        ? (product) => product.category === categoria 
        : () => true,
      contenedor: containerProducts
    });
  });
});
