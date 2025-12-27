// export class CartItem {
//   constructor(product, quantity = 1) {
//     this.product = product;
//     this.quantity = quantity;
//   }

//   getTotal() {
//     return this.product.price * this.quantity;
//   }
// }

export class CartItem {
  constructor(product, quantity = 1) {
    if (!product || typeof product.price !== "number") {
      throw new Error("Invalid product passed to CartItem");
    }

    if (typeof quantity !== "number" || quantity <= 0) {
      throw new Error("Invalid quantity passed to CartItem");
    }

    this.product = product;
    this.quantity = quantity;
  }

  getTotal() {
    return this.product.price * this.quantity;
  }
}
