class NavComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav class="navbar navbar-expand-lg navbar-light bg-white py-3 border-bottom sticky-top">
    <div class="container">
      <a class="navbar-brand fw-bold" href="index.html"><img src="images/Logos/Logo-Bakery-color.png" alt=""
          class="bakery-logo"></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto align-items-center">
          <li class="nav-item"><a class="nav-link" href="index.html">Inicio</a></li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="categoriasDropdown"
              data-bs-toggle="dropdown">Productos</a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="productos.html?cat=pasteles">Pasteles</a></li>
              <li><a class="dropdown-item" href="productos.html?cat=galletas">Galletas</a></li>
              <li><a class="dropdown-item" href="productos.html?cat=postres">Postres</a></li>
              <li><a class="dropdown-item" href="productos.html?cat=pan">Pan</a></li>
            </ul>
          </li>
          <li class="nav-item"><a class="nav-link" href="acerca.html">Acerca de</a></li>
          <li class="nav-item"><a class="nav-link" href="contacto.html">Contacto</a></li>
          <li class="nav-item mx-1">
            <a class="nav-link position-relative" href="#" id="carritoBtn" data-bs-toggle="modal"
              data-bs-target="#carritoModal">
              <i class="bi bi-cart"></i>
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style="font-size:10px;" id="carritoCantidad">0</span>
            </a>
          </li>
          <li class="nav-item mx-1">
            <a class="nav-link position-relative" href="#" id="carritoBtn" data-bs-toggle="modal" data-bs-target="#form-modal">
              <i class="bi bi-person"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- Modal -->
<div class="modal fade" id="form-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Login Admin</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form class="col mw-100">
      <div class="col-auto">
        <label for="user-email" class="form-label">Correo</label>
        <input type="email" class="form-control" id="user-email">
      </div>
      <div class="col-auto mt-3">
        <label for="user-password" class="form-label">Contraseña</label>
        <input type="password" class="form-control" id="user-password">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Cancelar</button>
        <button type="submit" class="btn btn-success">Login</button>
      </div>
    </form>
      </div>
    </div>
  </div>
</div>
    `;
  }
}
customElements.define('mi-nav', NavComponent);
