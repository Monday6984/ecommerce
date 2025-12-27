import { Product } from "./product.js";

export class ProductList {
  constructor() {
    this.products = [];
  }

  addProduct(product) {
    this.products.push(product);
  }

  getProductsById(id) {
    return this.products.find((product) => product.id === id);
  }

  getAllProducts() {
    return [...this.products]; // Return a copy of the products array
  }
}
