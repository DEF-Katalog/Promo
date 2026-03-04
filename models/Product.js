export class Product {
  constructor(name, description, imageUrl = "") {
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.variants = [];
  }

  addVariant(variant) {
    this.variants.push(variant);
  }
}
