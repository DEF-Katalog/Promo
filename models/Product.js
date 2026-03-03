export class Product {
  constructor(name, description) {
    this.name = name;
    this.description = description;
    this.variants = [];
  }

  addVariant(variant) {
    this.variants.push(variant);
  }
}
