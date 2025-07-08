class FooterComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
       <footer class="border-top py-4 container-footer">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-2 mb-2 mb-md-0 text-center text-md-start"><img src="images/Logos/Logo-Bakery-white.png" alt="" width="150px"></div>
        <div class="col-md-8 text-center mt-4">
          <a href="index.html" class="text-light mx-2">Inicio</a>
          <a href="productos.html" class="text-light mx-2">Productos</a>
          <a href="acerca.html" class="text-light mx-2">Acerca de</a>
          <a href="contacto.html" class="text-light mx-2">Contacto</a>
        </div>
        <div class="col-md-2 text-center text-md-end mt-4">
          <a href="#" class="text-light mx-1"><i class="bi bi-facebook"></i></a>
          <a href="#" class="text-light mx-1"><i class="bi bi-instagram"></i></a>
          <a href="#" class="text-light mx-1"><i class="bi bi-youtube"></i></a>
        </div>
      </div>
      <div class="text-center text-light mt-2" style="font-size:0.9em;">© 2025 Bakery Dulce & Saludable.</div>
    </div>
  </footer>
    `;
  }
}
customElements.define('my-footer', FooterComponent);