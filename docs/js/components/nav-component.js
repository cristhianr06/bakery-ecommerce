class NavComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav class="navbar navbar-expand-lg navbar-light bg-white py-3 border-bottom menu-sticky navbar-bakery">
    <div class="container">
      <a class="navbar-brand fw-bold" href="index.html"><img src="images/Logos/Logo-Bakery-white.png" alt=""
          class="bakery-logo"></a>
      <button class="navbar-toggler shadow-none bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto align-items-center">
          <li class="nav-item"><a class="nav-link text-light" href="index.html">Inicio</a></li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle text-light" href="#" id="categoriasDropdown"
              data-bs-toggle="dropdown">Productos</a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="/bakery-ecommerce/productos.html?cat=pasteles">Pasteles</a></li>
              <li><a class="dropdown-item" href="/bakery-ecommerce/productos.html?cat=galletas">Galletas</a></li>
              <li><a class="dropdown-item" href="/bakery-ecommerce/productos.html?cat=postres">Postres</a></li>
              <li><a class="dropdown-item" href="/bakery-ecommerce/productos.html?cat=pan">Pan</a></li>
            </ul>
          </li>
          <li class="nav-item"><a class="nav-link text-light" href="acerca.html">Acerca de</a></li>
          <li class="nav-item"><a class="nav-link text-light" href="contacto.html">Contacto</a></li>
          <li class="nav-item mx-1">
            <a class="nav-link position-relative text-light" href="#" id="carritoBtn" data-bs-toggle="modal"
              data-bs-target="#carritoModal">
              <i class="bi bi-cart-fill" style="font-size:22px;"></i>
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger p-2"
                style="font-size:12px;" id="carritoCantidad">0</span>
            </a>
          </li>
          <li class="nav-item mx-1">
            <a class="nav-link position-relative text-light" href="inventario.html" id="config-product">
              <i class="bi bi-gear-fill"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
    `;
  }
}
customElements.define('my-nav', NavComponent);
