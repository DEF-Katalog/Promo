import { db } from "../firebase.js";
import { ref, push, set, onValue }
from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";

export default class ProductService {

  save(product) {
    const productRef = ref(db, "products");
    push(productRef, product);
  }

  update(id, product) {
    set(ref(db, "products/" + id), product);
  }

  listen(callback) {
    const productRef = ref(db, "products");
    onValue(productRef, (snapshot) => {
      callback(snapshot.val());
    });
  }
}
