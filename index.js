// import { Cart, CartItem } from "./cart/index.js";
// import { Product, ProductList } from "./product/index.js";
// import { formatCurrency } from "./utils/index.js";

// // Create a product list and add some products
// const productList = new ProductList();
// productList.addProduct(new Product(1, "Laptop", 999.99));
// productList.addProduct(new Product(2, "Smartphone", 499.99));
// productList.addProduct(new Product(3, "Headphones", 199.99));

// // Create a cart and add some items
// const cart = new Cart();
// cart.addItem(productList.getProductsById(1), 1); // Laptop
// cart.addItem(productList.getProductsById(2), 2); // 2 Smartphones

// // Display cart total
// console.log("Cart Summary:");
// console.log(`Cart Items: ${cart.getItemCount()}`);
// console.log(`cart Total: ${formatCurrency(cart.getTotal())}`);

// // Add more functionality as needed
// cart.addItem(productList.getProductsById(3), 1); // Add Headphones
// console.log("Updated Cart Summary:");
// console.log(`Cart Items: ${cart.getItemCount()}`);
// console.log(`Cart Total: ${formatCurrency(cart.getTotal())}`);

//

import { Cart } from "./cart/index.js";
import { Product, ProductList } from "./product/index.js";
import { formatCurrency } from "./utils/index.js";

/* =====================
   STATE
===================== */
const productList = new ProductList();
const cart = new Cart();

/* =====================
   DOM ELEMENTS
===================== */
const productListEl = document.getElementById("product-list");
const cartItemsEl = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");

/* =====================
   INITIAL DATA
===================== */
productList.addProduct(
  new Product(
    1,
    "Laptop",
    500,
    "https://www.dict.com.na/wp-content/uploads/2024/02/DICT-Apple-MacBook-Air-15-Laptop-01.jpg"
  )
);
productList.addProduct(
  new Product(
    2,
    "Smartphone",
    499,
    "https://cdn.mos.cms.futurecdn.net/o2QR532EoNCFnrvjuia6r6.jpg"
  )
);
productList.addProduct(
  new Product(
    3,
    "Headphones",
    199,
    "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/13/6587814/1.jpg?6892"
  )
);

/* =====================
   RENDER PRODUCTS
===================== */
function renderProducts() {
  productListEl.innerHTML = "";

  productList.getAllProducts().forEach((product) => {
    const div = document.createElement("div");
    div.className = "product";

    div.innerHTML = `
    <img 
        src="${product.image || "./assets/images/placeholder.png"}"
        alt="${product.name}"
        style="width:100%; max-width:200px; object-fit:cover;"
      />

      <h4>${product.name}</h4>
      <p>${formatCurrency(product.price)}</p>
      <button data-id="${product.id}">Add to Cart</button>
    `;

    productListEl.appendChild(div);
  });
}

/* =====================
   RENDER CART (✔ Map-safe)
===================== */
function renderCart() {
  cartItemsEl.innerHTML = "";

  // IMPORTANT: use Map values
  for (const item of cart.items.values()) {
    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <span>${item.product.name}</span>

      <div>
        <button data-action="decrease" data-id="${item.product.id}">−</button>
        <strong>${item.quantity}</strong>
        <button data-action="increase" data-id="${item.product.id}">+</button>
        <button data-action="remove" data-id="${item.product.id}">🗑</button>
      </div>

      <span>${formatCurrency(item.getTotal())}</span>
    `;

    cartItemsEl.appendChild(div);
  }

  cartTotalEl.textContent = formatCurrency(cart.getTotal());
}

/* =====================
   EVENTS
===================== */

// Add to cart
productListEl.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") return;

  const productId = Number(e.target.dataset.id);
  const product = productList.getProductsById(productId);

  if (!product) return;

  cart.addItem(product, 1);
  renderCart();
});

// Cart controls (+ − remove)
cartItemsEl.addEventListener("click", (e) => {
  const action = e.target.dataset.action;
  const productId = Number(e.target.dataset.id);

  if (!action || !productId) return;

  switch (action) {
    case "increase":
      cart.increaseQuantity(productId);
      break;

    case "decrease":
      cart.decreaseQuantity(productId);
      break;

    case "remove":
      cart.removeItem(productId);
      break;
  }

  renderCart();
});

/* =====================
   INIT
===================== */
renderProducts();
renderCart();
