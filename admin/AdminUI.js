export const AdminUI = {

  getFormData() {
    const name = document.getElementById("productName").value;
    const desc = document.getElementById("productDesc").value;

    const variantNames = document.querySelectorAll(".variantName");
    const variantPrices = document.querySelectorAll(".variantPrice");

    const variants = [];

    variantNames.forEach((input, index) => {
      variants.push({
        name: input.value,
        price: variantPrices[index].value
      });
    });

    return { name, desc, variants };
  },

  resetForm() {
    document.getElementById("productName").value = "";
    document.getElementById("productDesc").value = "";
    document.getElementById("variantContainer").innerHTML = "";

    document.getElementById("saveProductBtn").textContent = "Simpan Produk";
    document.getElementById("cancelEditBtn").style.display = "none";
  },

  fillForm(product) {
    document.getElementById("productName").value = product.name;
    document.getElementById("productDesc").value = product.description;

    const container = document.getElementById("variantContainer");
    container.innerHTML = "";

    product.variants.forEach(v => {
      const div = document.createElement("div");

      div.innerHTML = `
        <input type="text" class="variantName" value="${v.name}">
        <input type="number" class="variantPrice" value="${v.price}">
        <br><br>
      `;

      container.appendChild(div);
    });

    document.getElementById("saveProductBtn").textContent = "Update Produk";
    document.getElementById("cancelEditBtn").style.display = "inline-block";
  },

  renderProducts(products, onEdit, onDelete) {
    const list = document.getElementById("productList");
    list.innerHTML = "";

    products.forEach(product => {
      const div = document.createElement("div");
      div.classList.add("product-card");

      div.innerHTML = `
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <button class="editBtn">Edit</button>
        <button class="deleteBtn">Delete</button>
        <hr>
      `;

      div.querySelector(".editBtn").onclick = () => onEdit(product.id);
      div.querySelector(".deleteBtn").onclick = () => onDelete(product.id);

      list.appendChild(div);
    });
  }
};
