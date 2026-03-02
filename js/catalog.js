import ProductService from "./services/ProductService.js";

const productService = new ProductService();

productService.listen((data) => {

  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  if (!data) {
    if (!data || Object.keys(data).length === 0) {
  productList.innerHTML = "<p>Belum ada produk.</p>";
  return;
}

Object.values(data).forEach(product => {

  let variantHTML = "";

  if (Array.isArray(product.variants)) {
    product.variants.forEach(variant => {
      variantHTML += `
        <p>${variant.size || "-"} - 
        Rp ${Number(variant.price || 0).toLocaleString("id-ID")}</p>`;
    });
  }

  productList.innerHTML += `
    <div class="card">
      <img src="${product.images?.[0] || 'https://via.placeholder.com/200'}" width="200"><br><br>
      <h3>${product.name || "Tanpa Nama"}</h3>
      <p>${product.description || ""}</p>
      ${variantHTML}
    </div>
  `;
});
