function mostrarCheckout() {
  const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
  const tbody = document.querySelector('#tablaCheckout tbody');
  const totalElem = document.getElementById('checkoutTotal');
  tbody.innerHTML = '';
  let total = 0;

  if (carrito.length === 0) {
    tbody.innerHTML = `<tr><td colspan="3" class="text-center text-muted">Tu carrito está vacío.</td></tr>`;
    totalElem.textContent = '$0.00';
    return;
  }

  carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;
    tbody.innerHTML += `
      <tr>
        <td>${item.nombre}</td>
        <td class="text-center">${item.cantidad}</td>
        <td class="text-end">$${subtotal.toFixed(3)} COP</td>
      </tr>
    `;
  });
  totalElem.textContent = '$' + total.toFixed(3) + ' COP';
}

document.addEventListener('DOMContentLoaded', mostrarCheckout);
