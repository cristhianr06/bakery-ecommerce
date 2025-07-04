import {
  deleteProduct,
  onGetProducts,
  getProduct,
  updateProduct,
} from "./firebase.js";

const containerInventory = document.querySelector("#list-inventory");
const formProducts = document.querySelector("#form-products");
const infoForm = document.querySelector("#info-form");

let id = "";

window.addEventListener("DOMContentLoaded", async () => {
  onGetProducts((productosSnapshot) => {
    TotalProductos(productosSnapshot);
  });
});

//Cargar productos en tabla
function TotalProductos(productosSnapshot) {
  let html = "";
  productosSnapshot.forEach((doc) => {
    const product = doc.data();
    html += `
    <tr>
      <td>${product.name}</td>
      <td class="d-grid gap-2 d-md-block">
        <button class="btn btn-danger btn-delete" type="button" data-id="${doc.id}">Borrar</button>
        <button class="btn btn-success btn-edit" type="button" data-bs-toggle="modal" data-bs-target="#form-modal-products" data-id="${doc.id}">Editar</button>
      </td>
    </tr>
      `;
  });
  containerInventory.innerHTML = html;

  const btnsEdit = containerInventory.querySelectorAll(".btn-edit");
  const btnsDeletes = containerInventory.querySelectorAll(".btn-delete");

  //Eliminar producto
  btnsDeletes.forEach((btn) => {
    btn.addEventListener("click", ({ target: { dataset } }) => {
      deleteProduct(dataset.id);
    });
  });

  //Editar producto
  btnsEdit.forEach((btn) => {
    btn.addEventListener("click", async ({ target: { dataset } }) => {
      const doc = await getProduct(dataset.id);
      const producto = doc.data();
      const priceFormat = producto.price.toLocaleString("es-CO");

      formProducts["product-name"].value = producto.name;
      formProducts["product-description"].value = producto.description;
      formProducts["product-price"].value = priceFormat;
      formProducts["product-category"].value = producto.category;
      formProducts["product-image"].value = producto.urlImage;
      formProducts["product-featured"].checked = producto.featured;

      id = dataset.id;
      infoForm.textContent = "";
    });
  });
}
formProducts.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("enviado");

  const productName = formProducts["product-name"];
  const productDescription = formProducts["product-description"];
  const productPrice = formProducts["product-price"];
  const productCategory = formProducts["product-category"];
  const productImage = formProducts["product-image"];
  const prodcutFeatured = formProducts["product-featured"];

  let priceValue = productPrice.value.replace(/\D/g, "");

  updateProduct(id, {
    name: productName.value,
    description: productDescription.value,
    price: Number(priceValue),
    category: productCategory.value,
    urlImage: productImage.value,
    featured: prodcutFeatured.checked,
  });
  infoForm.textContent = "Producto Actualizado";
});

const priceInput = document.querySelector('#product-price');

priceInput.addEventListener('input', function(e) {
  // Elimina todo lo que no sea dígito
  let value = e.target.value.replace(/\D/g, '');
  // Aplica puntos como separador de miles
  value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  e.target.value = value;
});
