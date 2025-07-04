import { saveProduct } from "./firebase.js";

const formProducts = document.querySelector('#form-products');

formProducts.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("enviado");

    const productName = formProducts['product-name']
    const productDescription = formProducts['product-description']
    const productPrice = formProducts['product-price']
    const productCategory = formProducts['product-category']
    const productImage = formProducts['product-image']
    const prodcutFeatured = formProducts['product-featured']

    let priceValue = productPrice.value.replace(/\D/g, '')

    saveProduct(productName.value, productDescription.value, Number(priceValue), productCategory.value, productImage.value, prodcutFeatured.checked);
    formProducts.reset();
})

const priceInput = document.querySelector('#product-price');

priceInput.addEventListener('input', function(e) {
  // Elimina todo lo que no sea dígito
  let value = e.target.value.replace(/\D/g, '');
  // Aplica puntos como separador de miles
  value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  e.target.value = value;
});


