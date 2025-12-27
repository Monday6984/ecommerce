export class Product {
  constructor(id, name, price, image = "") {
    this.id = id;
    this.name = name;
    this.price = Number(price);
    this.image = image;
  }

  formatPrice() {
    return `$${this.price.toFixed(2)}`;
  }
}

// export class Product {
//   constructor(id, name, price) {
//     this.id = id;
//     this.name = name;
//     this.price = Number(price);
//   }
// }
