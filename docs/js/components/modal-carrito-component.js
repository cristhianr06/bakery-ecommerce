class ModalCarritoComponent extends HTMLElement{
    connectedCallback() {
        this.innerHTML = `
        <div class="modal fade" id="carritoModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Carrito de compras</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body" id="carritoContenido">
          <!-- Productos en carrito por JS -->
        </div>
        <div class="modal-footer">
          <a href="checkout.html" class="btn btn-success">Procesar compra</a>
        </div>
      </div>
    </div>
  </div>
        `
    }
}
customElements.define('modal-carrito', ModalCarritoComponent)