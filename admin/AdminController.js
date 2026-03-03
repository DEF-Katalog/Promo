import { Product } from "../models/Product.js";
import { Variant } from "../models/Variant.js";
import { ProductService } from "../services/ProductService.js";

const variantContainer = document.getElementById("variantContainer");
const addVariantBtn = document.getElementById("addVariantBtn");
const saveProductBtn = document.getElementById("saveProductBtn");
const productList = document.getElementById("productList");

addVariantBtn.addEventListener("click", () => {
  const variantDiv = document.createElement("div");

  variantDiv.innerHTML = `
    <input type="text" placeholder="Nama Varian" class="variantName">
    <input type="number" placeholder="Harga" class="variantPrice">
    <br><br>
  `;

  variantContainer.appendChild(variantDiv);
});

saveProductBtn.addEventListener("click", async () => {
  const name = document.getElementById("productName").value;
  const desc = document.getElementById("productDesc").value;

  const product = new Product(name, desc);

  const variantNames = document.querySelectorAll(".variantName");
  const variantPrices = document.querySelectorAll(".variantPrice");

  variantNames.forEach((input, index) => {
    const variant = new Variant(
      input.value,
      variantPrices[index].value
    );
    product.addVariant(variant);
  });

  const productId = await ProductService.saveProduct(product);

  alert("Produk berhasil disimpan dengan ID: " + productId);
  loadProducts();
});

async function loadProducts() {
  const products = await ProductService.getAllProducts();

  productList.innerHTML = "";

  products.forEach(product => {
    const div = document.createElement("div");

    div.innerHTML = `
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p>Total Varian: ${product.variants?.length || 0}</p>
      <hr>
    `;

    productList.appendChild(div);
  });
}
  loadProducts();
