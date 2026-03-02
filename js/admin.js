function addVariant() {

  if (!currentProduct) {
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const image = document.getElementById("image").value;

    if (!name) return alert("Isi nama produk dulu!");

    currentProduct = new Product(name, description, image);
  }

  const size = document.getElementById("size").value;
  const price = document.getElementById("price").value;

  if (!size || !price)
    return alert("Isi ukuran & harga");

  currentProduct.addVariant(size, price);

  document.getElementById("variantPreview").innerHTML +=
    `<div class="variant-box">
      ${size} - Rp ${Number(price).toLocaleString()}
     </div>`;

  document.getElementById("size").value = "";
  document.getElementById("price").value = "";
}
