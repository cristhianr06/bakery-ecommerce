// js/carrito.js
function obtenerCarrito() {
  return JSON.parse(localStorage.getItem('carrito') || '[]');
}

function guardarCarrito(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCantidadCarrito();
}

function agregarAlCarrito(id) {
  fetch('data/productos.json')
    .then(res => res.json())
    .then(productos => {
      let carrito = obtenerCarrito();
      let producto = productos.find(p => p.id === id);
      let item = carrito.find(i => i.id === id);
      if(item) {
        item.cantidad += 1;
      } else {
        carrito.push({ ...producto, cantidad: 1 });
      }
      guardarCarrito(carrito);
      alert('Producto agregado al carrito');
    });
}

function eliminarDelCarrito(id) {
  let carrito = obtenerCarrito();
  carrito = carrito.filter(i => i.id !== id);
  guardarCarrito(carrito);
  mostrarCarrito();
}

function mostrarCarrito() {
  const cont = document.getElementById('carritoContenido');
  const carrito = obtenerCarrito();
  if(carrito.length === 0) {
    cont.innerHTML = '<p>El carrito está vacío.</p>';
    return;
  }
  cont.innerHTML = carrito.map(item => `
    <div class="d-flex justify-content-between align-items-center mb-2">
      <span>${item.nombre} x${item.cantidad}</span>
      <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
    </div>
  `).join('');
}

function actualizarCantidadCarrito() {
  const carrito = obtenerCarrito();
  document.getElementById('carritoCantidad').textContent = carrito.reduce((a, i) => a + i.cantidad, 0);
}

// Mostrar carrito al abrir modal
document.getElementById('carritoBtn').onclick = mostrarCarrito;

// Actualiza cantidad en header
document.addEventListener('DOMContentLoaded', actualizarCantidadCarrito);
