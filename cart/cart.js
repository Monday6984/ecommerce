import { CartItem } from "./cartItem.js";

export class Cart {
  constructor() {
    this.items = new Map(); // key: productId, value: CartItem
  }

  // addItem(product, quantity = 1) {
  //   if (this.items.has(product.id)) {
  //     const existingItem = this.items.get(product.id);
  //     existingItem.quantity += quantity;
  //   } else {
  //     this.items.set(product.id, new CartItem(product, quantity));
  //   }
  // }

  addItem(product, quantity = 1) {
    if (!product || typeof product.price !== "number") {
      throw new Error("Cart.addItem expects a valid product");
    }

    if (typeof quantity !== "number" || quantity <= 0) {
      throw new Error("Cart.addItem expects a valid quantity");
    }

    if (this.items.has(product.id)) {
      this.items.get(product.id).quantity += quantity;
    } else {
      this.items.set(product.id, new CartItem(product, quantity));
    }
  }

  /* ✅ NEW:Increase Quantity */
  increaseQuantity(productId) {
    const item = this.items.get(productId);
    if (!item) return;
    item.quantity++;
  }

  /* ✅ NEW: Decrease Quantity */
  decreaseQuantity(productId) {
    const item = this.items.get(productId);
    if (!item) return;

    item.quantity--;

    if (item.quantity <= 0) {
      this.items.delete(productId);
    }
  }

  removeItem(productId) {
    this.items.delete(productId);
  }

  // getTotal() {
  //   let total = 0;
  //   for (const item of this.items.values()) {
  //     total += item.getTotal();
  //   }
  //   return total;
  // }

  /* ✅ VERY IMPORTANT FOR UI */
  getItems() {
    return Array.from(this.items.values());
  }

  getTotal() {
    let total = 0;

    for (const item of this.items.values()) {
      const itemTotal = item.getTotal();
      if (!Number.isFinite(itemTotal)) {
        throw new Error("Cart contains invalid item total");
      }
      total += itemTotal;
    }

    return total;
  }

  getItemCount() {
    let count = 0;
    for (const item of this.items.values()) {
      count += item.quantity;
    }
    return count;
  }
}
