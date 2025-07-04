// import { onGetProducts } from "./firebase.js";

// function obtenerCarrito() {
//   return JSON.parse(localStorage.getItem('carrito') || '[]');
// }

// function guardarCarrito(carrito) {
//   localStorage.setItem('carrito', JSON.stringify(carrito));
//   actualizarCantidadCarrito();
// }

// const btnsCarrito = document.querySelectorAll('.agregar-carrito');

// function agregarAlCarrito(id) {
//   console.log(id)
//   fetch('data/productos.json')
//     .then(res => res.json())
//     .then(productos => {
//       let carrito = obtenerCarrito();
//       let producto = productos.find(p => p.id === id);
//       let item = carrito.find(i => i.id === id);
//       if(item) {
//         item.cantidad += 1;
//       } else {
//         carrito.push({ ...producto, cantidad: 1 });
//       }
//       guardarCarrito(carrito);
//       alert('Producto agregado al carrito');
//     });
// }

// // function eliminarDelCarrito(id) {
// //   let carrito = obtenerCarrito();
// //   carrito = carrito.filter(i => i.id !== id);
// //   guardarCarrito(carrito);
// //   mostrarCarrito();
// // }
// function eliminarDelCarrito(id) {
//   let carrito = obtenerCarrito();
//   const index = carrito.findIndex(item => item.id === id);
//   if (index !== -1) {
//     if (carrito[index].cantidad > 1) {
//       carrito[index].cantidad -= 1;
//     } else {
//       carrito.splice(index, 1); // Elimina el producto si solo queda 1 unidad
//     }
//     guardarCarrito(carrito);
//     mostrarCarrito();
//   }
// }

// function mostrarCarrito() {
//   const cont = document.getElementById('carritoContenido');
//   const carrito = obtenerCarrito();
//   if (carrito.length === 0) {
//     cont.innerHTML = '<p>El carrito está vacío.</p>';
//     return;
//   }
//   cont.innerHTML = `
//     <table class="table align-middle">
//       <thead>
//         <tr>
//           <th style="width:60%;">Productos</th>
//           <th style="width:15%;">Cantidad</th>
//           <th style="width:25%;">Acción</th>
//         </tr>
//       </thead>
//       <tbody>
//         ${carrito.map(item => `
//           <tr>
//             <td>${item.nombre}</td>
//             <td>
//               <input 
//                 type="number" 
//                 value="${item.cantidad}" 
//                 min="1" 
//                 style="width: 60px; text-align: center;" 
//                 class="form-control form-control-sm d-inline-block"
//                 onchange="actualizarCantidad(${item.id}, this.value)" 
//               />
//             </td>
//             <td>
//               <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
//             </td>
//           </tr>
//         `).join('')}
//       </tbody>
//     </table>
//   `;
// }

// function actualizarCantidad(id, nuevaCantidad) {
//   let carrito = obtenerCarrito();
//   const index = carrito.findIndex(item => item.id === id);
//   if (index !== -1) {
//     // Asegúrate de que la cantidad sea al menos 1
//     const cantidad = Math.max(1, parseInt(nuevaCantidad, 10) || 1);
//     carrito[index].cantidad = cantidad;
//     guardarCarrito(carrito);
//     mostrarCarrito(); // Vuelve a renderizar el carrito
//   }
// }


// function actualizarCantidadCarrito() {
//   const carrito = obtenerCarrito();
//   document.getElementById('carritoCantidad').textContent = carrito.reduce((a, i) => a + i.cantidad, 0);
// }

// // Mostrar carrito al abrir modal
// document.getElementById('carritoBtn').onclick = mostrarCarrito;

// // Actualiza cantidad en header
// document.addEventListener('DOMContentLoaded', actualizarCantidadCarrito);

import { productosFirebase } from "./products-utils.js";

function obtenerCarrito() {
  return JSON.parse(localStorage.getItem('carrito') || '[]');
}

function guardarCarrito(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCantidadCarrito();
}

function agregarAlCarrito(id) {
  let carrito = obtenerCarrito();
  let producto = productosFirebase.find(p => p.id === id);

  if (!producto) {
    alert('Producto no encontrado');
    return;
  }

  let item = carrito.find(i => i.id === id);
  if (item) {
    item.cantidad += 1;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.name,
      precio: producto.price,
      urlImage: producto.urlImage,
      cantidad: 1
    });
  }
  guardarCarrito(carrito);
  alert('Producto agregado al carrito');
}

function eliminarDelCarrito(id) {
  let carrito = obtenerCarrito();
  const index = carrito.findIndex(item => item.id === id);
  if (index !== -1) {
    if (carrito[index].cantidad > 1) {
      carrito[index].cantidad -= 1;
    } else {
      carrito.splice(index, 1);
    }
    guardarCarrito(carrito);
    mostrarCarrito();
  }
}

function mostrarCarrito() {
  const cont = document.getElementById('carritoContenido');
  const carrito = obtenerCarrito();
  if (carrito.length === 0) {
    cont.innerHTML = '<p>El carrito está vacío.</p>';
    return;
  }
  cont.innerHTML = `
    <table class="table align-middle">
      <thead>
        <tr>
          <th style="width:60%;">Productos</th>
          <th style="width:15%;">Cantidad</th>
          <th style="width:25%;">Acción</th>
        </tr>
      </thead>
      <tbody>
        ${carrito.map(item => `
          <tr>
            <td>${item.nombre}</td>
            <td>
              <input 
                type="number" 
                value="${item.cantidad}" 
                min="1" 
                style="width: 60px; text-align: center;" 
                class="form-control form-control-sm d-inline-block"
                onchange="actualizarCantidad('${item.id}', this.value)" 
              />
            </td>
            <td>
              <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito('${item.id}')">Eliminar</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function actualizarCantidad(id, nuevaCantidad) {
  let carrito = obtenerCarrito();
  const index = carrito.findIndex(item => item.id === id);
  if (index !== -1) {
    const cantidad = Math.max(1, parseInt(nuevaCantidad, 10) || 1);
    carrito[index].cantidad = cantidad;
    guardarCarrito(carrito);
    mostrarCarrito();
  }
}

function actualizarCantidadCarrito() {
  const carrito = obtenerCarrito();
  const cantidad = carrito.reduce((a, i) => a + i.cantidad, 0);
  const badge = document.getElementById('carritoCantidad');
  if (badge) badge.textContent = cantidad;
}

const btnCarrito = document.getElementById('carritoBtn');
if (btnCarrito) btnCarrito.onclick = mostrarCarrito;

document.addEventListener('DOMContentLoaded', actualizarCantidadCarrito);

window.eliminarDelCarrito = eliminarDelCarrito;
window.actualizarCantidad = actualizarCantidad;
window.agregarAlCarrito = agregarAlCarrito;