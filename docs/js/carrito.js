import { productosFirebase } from "./productos.js";

function obtenerCarrito() {
  return JSON.parse(localStorage.getItem('carrito') || '[]');
}

function guardarCarrito(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCantidadCarrito();
}

export function agregarAlCarrito(id) {
  let carrito = obtenerCarrito();
  let findProduct = productosFirebase.find(producto => producto.id === id);

  if (!findProduct) {
    alert('Producto no encontrado');
    return;
  }

  let findProductoCarrito = carrito.find(productoCarrito => productoCarrito.id === id);
  if (findProductoCarrito) {
    findProductoCarrito.cantidad += 1;
  } else {
    carrito.push({
      id: findProduct.id,
      nombre: findProduct.name,
      precio: findProduct.price,
      urlImage: findProduct.urlImage,
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
                class="form-control form-control-sm d-inline-block cantidad-input" data-id="${item.id}" 
              />
            </td>
            <td>
              <button class="btn btn-danger btn-sm btn-eliminar" data-id="${item.id}">Eliminar</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  //onclick="eliminarDelCarrito('${item.id}')" data-id="${item.id}
  //Evento para eliminar del carriot
  let botonesEliminar = cont.querySelectorAll('.btn-eliminar')
  botonesEliminar.forEach(btn => {
    btn.addEventListener('click', ({target: {dataset}}) =>{
      let id = dataset.id
      eliminarDelCarrito(id)
    })
  })

  //Evento input, actualiza cantidad onchange="actualizarCantidad('${item.id}', this.value)
  let inputsCantidad = cont.querySelectorAll('.cantidad-input')
  inputsCantidad.forEach(input => {
    input.addEventListener('change', ({target}) => {
      let id = target.dataset.id
      let value = target.value
      actualizarCantidad(id, value)
    })
  })
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

// window.eliminarDelCarrito = eliminarDelCarrito;
// window.actualizarCantidad = actualizarCantidad;
// window.agregarAlCarrito = agregarAlCarrito;