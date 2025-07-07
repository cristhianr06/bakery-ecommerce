function mostrarCheckout() {
  const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
  const tbody = document.querySelector('#tablaCheckout tbody');
  const totalElem = document.getElementById('checkoutTotal');
  const btnPedido = document.querySelector('#btnConfirmarPedido');

  if(tbody){
    tbody.innerHTML = '';
  let total = 0;

  if (carrito.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" class="text-center text-muted">Tu carrito está vacío.</td></tr>`;
    totalElem.textContent = '$0.00';
    if (btnPedido) btnPedido.style.display = 'none';
    return;
  } else {
    if (btnPedido) btnPedido.style.display = 'inline-block';
  }

  carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;
    tbody.innerHTML += `
      <tr>
        <td>${item.nombre}</td>
        <td class="text-center">
          <div class="d-flex justify-content-center align-items-center">
            <button class="btn btn-danger btn-sm btn-restar" data-id="${item.id}">-</button>
            <input type="number" min="1" value="${item.cantidad}" style="width:50px; text-align:center;" class="mx-1 input-cantidad"
              data-id="${item.id}">
            <button class="btn btn-primary btn-sm btn-sumar" data-id="${item.id}">+</button>
          </div>
        </td>
        <td class="text-end">$${subtotal.toLocaleString('es-CO')} COP</td>
      </tr>
    `;
  });
  totalElem.textContent = '$' + total.toLocaleString('es-CO') + ' COP';
  }
  
  let btnsSumar = tbody.querySelectorAll('.btn-sumar')
  btnsSumar.forEach(btn => {
    btn.addEventListener('click', ({target: {dataset}}) => {
      let id = dataset.id
      agregarUnidadCheckout(id)
    })
  })

  let btnsRestar = tbody.querySelectorAll('.btn-restar')
  btnsRestar.forEach(btn => {
    btn.addEventListener('click', ({target: {dataset}}) => {
      let id = dataset.id
      eliminarUnidadCheckout(id)
    })
  })
}

function obtenerCarrito() {
  return JSON.parse(localStorage.getItem('carrito') || '[]');
}

function guardarCarrito(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function eliminarUnidadCheckout(id) {
  let carrito = obtenerCarrito();
  const index = carrito.findIndex(item => item.id === id);
  if (index !== -1) {
    if (carrito[index].cantidad > 1) {
      carrito[index].cantidad -= 1;
    } else {
      carrito.splice(index, 1);
    }
    guardarCarrito(carrito);
    mostrarCheckout();
  }
  actualizarCantidadCarrito()
}

function agregarUnidadCheckout(id) {
  let carrito = obtenerCarrito();
  const index = carrito.findIndex(item => item.id === id);
  if (index !== -1) {
    carrito[index].cantidad += 1;
    guardarCarrito(carrito);
    mostrarCheckout();
  }
  actualizarCantidadCarrito()
}

function cambiarCantidadCheckout(id, nuevaCantidad) {
  let carrito = obtenerCarrito();
  const index = carrito.findIndex(item => item.id === id);
  if (index !== -1) {
    const cantidad = Math.max(1, parseInt(nuevaCantidad, 10) || 1);
    carrito[index].cantidad = cantidad;
    guardarCarrito(carrito);
    mostrarCheckout();
  }
  actualizarCantidadCarrito()
}

function eliminarProductoCheckout(id) {
  let carrito = obtenerCarrito();
  carrito = carrito.filter(item => item.id !== id);
  guardarCarrito(carrito);
  mostrarCheckout();
  actualizarCantidadCarrito()
}

function actualizarCantidadCarrito() {
  const carrito = obtenerCarrito();
  const cantidad = carrito.reduce((a, i) => a + i.cantidad, 0);
  const badge = document.getElementById('carritoCantidad');
  if (badge) badge.textContent = cantidad;
}

// Funciones para los botones inline
// window.eliminarUnidadCheckout = eliminarUnidadCheckout;
// window.agregarUnidadCheckout = agregarUnidadCheckout;
// window.cambiarCantidadCheckout = cambiarCantidadCheckout;
// window.eliminarProductoCheckout = eliminarProductoCheckout;

document.addEventListener('DOMContentLoaded', mostrarCheckout);
