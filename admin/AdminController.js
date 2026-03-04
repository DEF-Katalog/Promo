import { Product } from "../models/Product.js";
import { Variant } from "../models/Variant.js";
import { ProductService } from "../services/ProductService.js";

import { AdminUI } from "./AdminUI.js";
import { AdminState } from "./AdminState.js";
import { AdminValidator } from "./AdminValidator.js";

const addVariantBtn = document.getElementById("addVariantBtn");
const saveProductBtn = document.getElementById("saveProductBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");

/* ===============================
   LOAD PRODUK
=================================*/
async function loadProducts() {
  const products = await ProductService.getAllProducts();

  AdminUI.renderProducts(
    products,
    handleEdit,
    handleDelete
  );
}

/* ===============================
   HANDLE SAVE / UPDATE
=================================*/
saveProductBtn.addEventListener("click", async () => {

  const formData = AdminUI.getFormData();

  // VALIDASI
  const errors = AdminValidator.validate(formData);

  if (Object.keys(errors).length > 0) {
    AdminUI.showErrors(errors);
    return;
  }

  const fileInput = document.getElementById("productImage");
   let imageUrl = "";

   if (fileInput.files[0]) {
     imageUrl = await ProductService.uploadImage(fileInput.files[0]);
   }

   const product = new Product(formData.name, formData.desc, imageUrl);

  formData.variants.forEach(v => {
    product.addVariant(
      new Variant(v.name, Number(v.price))
    );
  });

  if (AdminState.editMode) {
    await ProductService.updateProduct(
      AdminState.currentEditId,
      product
    );
  } else {
    await ProductService.saveProduct(product);
  }

  AdminState.reset();
  AdminUI.resetForm();
  loadProducts();
});

/* ===============================
   HANDLE EDIT
=================================*/
async function handleEdit(id) {
  const product = await ProductService.getProductById(id);

  AdminState.setEditMode(id);
  AdminUI.fillForm(product);

  // Attach formatter ulang setelah render ulang input
  AdminUI.attachPriceFormatter();
}

/* ===============================
   HANDLE DELETE
=================================*/
async function handleDelete(id) {
  await ProductService.deleteProduct(id);
  loadProducts();
}

/* ===============================
   HANDLE CANCEL
=================================*/
cancelEditBtn.addEventListener("click", () => {
  AdminState.reset();
  AdminUI.resetForm();
});

/* ===============================
   ADD VARIANT BUTTON
=================================*/
addVariantBtn.addEventListener("click", () => {

  const container = document.getElementById("variantContainer");

  const div = document.createElement("div");
  div.innerHTML = `
    <input type="text" placeholder="Nama Varian" class="variantName">
    <input type="text" placeholder="Harga" class="variantPrice">
    <br><br>
  `;

  container.appendChild(div);

  // Attach formatter setiap tambah varian
  AdminUI.attachPriceFormatter();
});

/* ===============================
   INIT
=================================*/
loadProducts();
AdminUI.attachPriceFormatter();
AdminUI.attachImagePreview();
