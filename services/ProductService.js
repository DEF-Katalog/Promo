import { db } from "../firebase.js";
import { ref, push, set } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";

export class ProductService {

  static async saveProduct(product) {
    const productRef = push(ref(db, "products"));
    await set(productRef, product);
    return productRef.key;
  }

}
