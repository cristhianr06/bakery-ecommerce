// js/main.js
document.addEventListener('DOMContentLoaded', () => {
  // Cargar productos destacados en index.html
  if(document.getElementById('bestSelling')) {
    fetch('data/productos.json')
      .then(res => res.json())
      .then(productos => {
        let destacados = productos.filter(p => p.destacado);
        mostrarProductos(destacados, 'bestSelling');
      });
  }

  // Cargar productos por categoría en productos.html
  if(document.getElementById('listaProductos')) {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('cat');
    fetch('data/productos.json')
      .then(res => res.json())
      .then(productos => {
        let filtrados = cat ? productos.filter(p => p.categoria === cat) : productos;
        document.getElementById('tituloCategoria').textContent = cat ? cat.charAt(0).toUpperCase() + cat.slice(1) : 'Productos';
        mostrarProductos(filtrados, 'listaProductos');
      });
  }
});

function mostrarProductos(productos, contenedorId) {
  const contenedor = document.getElementById(contenedorId);
  contenedor.innerHTML = '';
  productos.forEach(prod => {
    const col = document.createElement('div');
    col.className = 'col-md-3 mb-4';
    col.innerHTML = `
      <div class="card h-100">
        <img src="img/${prod.imagen}" class="card-img-top" alt="${prod.nombre}">
        <div class="card-body">
          <h5 class="card-title">${prod.nombre}</h5>
          <p class="card-text">${prod.descripcion}</p>
          <p class="card-text"><strong>$${prod.precio.toFixed(3)} COP</strong></p>
          <button class="btn btn-primary" onclick="agregarAlCarrito(${prod.id})">Agregar al carrito</button>
        </div>
      </div>
    `;
    contenedor.appendChild(col);
  });
}
