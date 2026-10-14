```javascript
/* =========================================
   SHAWERMA RESTAURANT
   Complete JavaScript
========================================= */

"use strict";

// =========================================
// 1. MENU DATA
// All products cost 150 EGP
// =========================================

const PRICE = 150;

const products = [
  {
    id: 1,
    name: "Chicken Shawerma Roll",
    category: "chicken",
    description: "Juicy chicken shawerma wrapped in fresh bread.",
    image:
      "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 2,
    name: "Meat Shawerma Roll",
    category: "meat",
    description: "Delicious seasoned meat shawerma in fresh bread.",
    image:
      "https://images.unsplash.com/photo-1544020778-9d9f7c3a8e6a?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 3,
    name: "Grilled Chicken - 1 KG",
    category: "grilled",
    description: "A full kilogram of grilled chicken.",
    image:
      "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 4,
    name: "Grilled Chicken - 1/2 KG",
    category: "grilled",
    description: "Half a kilogram of grilled chicken.",
    image:
      "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 5,
    name: "Grilled Chicken - 1/4 KG",
    category: "grilled",
    description: "A quarter kilogram of grilled chicken.",
    image:
      "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 6,
    name: "Chicken Shawerma Meal",
    category: "meals",
    description: "A tasty chicken shawerma meal.",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 7,
    name: "Meat Shawerma Meal",
    category: "meals",
    description: "A flavorful meat shawerma meal.",
    image:
      "https://images.unsplash.com/photo-1544020778-9d9f7c3a8e6a?auto=format&fit=crop&w=700&q=85"
  }
];

// =========================================
// 2. CART DATA
// =========================================

let cart = [];
let activeCategory = "all";

// =========================================
// 3. FIND HTML ELEMENTS
// =========================================

const productGrid = document.getElementById("productGrid");
const cartPanel = document.getElementById("cartPanel");

// =========================================
// 4. FORMAT EGYPTIAN POUNDS
// =========================================

function formatPrice(amount) {
  return `${amount.toLocaleString("en-EG")} EGP`;
}

// =========================================
// 5. DISPLAY PRODUCTS
// =========================================

function renderProducts() {
  if (!productGrid) {
    console.error('Could not find an element with id="productGrid".');
    return;
  }

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter(
          (product) => product.category === activeCategory
        );

  productGrid.innerHTML = "";

  if (filteredProducts.length === 0) {
    productGrid.innerHTML = `
      <p class="empty-cart">No products found in this category.</p>
    `;
    return;
  }

  filteredProducts.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";

    card.innerHTML = `
      <div class="product-image">
        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
        >
      </div>

      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.description}</p>

        <div class="product-bottom">
          <span class="price">${formatPrice(PRICE)}</span>

          <button
            class="add-to-cart"
            type="button"
            data-add="${product.id}"
          >
            + Add
          </button>
        </div>
      </div>
    `;

    productGrid.appendChild(card);
  });
}

// =========================================
// 6. ADD PRODUCT TO CART
// =========================================

function addToCart(productId) {
  const product = products.find(
    (item) => item.id === Number(productId)
  );

  if (!product) return;

  const existingItem = cart.find(
    (item) => item.id === product.id
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: PRICE,
      quantity: 1
    });
  }

  renderCart();
  showToast(`${product.name} added to cart`);
}

// =========================================
// 7. CHANGE PRODUCT QUANTITY
// =========================================

function changeQuantity(productId, amount) {
  const item = cart.find(
    (product) => product.id === Number(productId)
  );

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(
      (product) => product.id !== Number(productId)
    );
  }

  renderCart();
}

// =========================================
// 8. REMOVE PRODUCT
// =========================================

function removeFromCart(productId) {
  cart = cart.filter(
    (item) => item.id !== Number(productId)
  );

  renderCart();
}

// =========================================
// 9. CALCULATE TOTAL
// =========================================

function calculateTotal() {
  return cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}

function calculateItemCount() {
  return cart.reduce(
    (total, item) => total + item.quantity,
    0
  );
}

// =========================================
// 10. DISPLAY CART
// =========================================

function renderCart() {
  if (!cartPanel) {
    console.error('Could not find an element with id="cartPanel".');
    return;
  }

  const total = calculateTotal();
  const count = calculateItemCount();

  cartPanel.innerHTML = `
    <h2>
      Your Cart
      <span class="cart-count">(${count})</span>
    </h2>

    ${
      cart.length === 0
        ? `
          <p class="empty-cart">
            Your cart is empty. Add something delicious!
          </p>
        `
        : `
          <div class="cart-items">
            ${cart
              .map(
                (item) => `
                  <div class="cart-item">
                    <div>
                      <h3>${item.name}</h3>
                      <p>
                        ${formatPrice(item.price)} each
                      </p>
                    </div>

                    <div class="cart-controls">
                      <button
                        type="button"
                        data-decrease="${item.id}"
                        aria-label="Decrease ${item.name} quantity"
                      >−</button>

                      <span>${item.quantity}</span>

                      <button
                        type="button"
                        data-increase="${item.id}"
                        aria-label="Increase ${item.name} quantity"
                      >+</button>

                      <button
                        type="button"
                        class="remove-item"
                        data-remove="${item.id}"
                        aria-label="Remove ${item.name}"
                      >×</button>
                    </div>

                    <strong>
                      ${formatPrice(item.price * item.quantity)}
                    </strong>
                  </div>
                `
              )
              .join("")}
          </div>
        `
    }

    <div class="cart-total">
      <span>Total</span>
      <span>${formatPrice(total)}</span>
    </div>
  `;
}

// =========================================
// 11. CATEGORY FILTERS
// =========================================

function setCategory(category) {
  activeCategory = category;
  renderProducts();

  document
    .querySelectorAll(
      ".category-tabs button, .categories button, " +
      ".category-filters button, .category-btn, .filter-btn"
    )
    .forEach((button) => {
      const buttonCategory =
        button.dataset.category ||
        button.dataset.filter ||
        button.getAttribute("data-category");

      button.classList.toggle(
        "active",
        buttonCategory === category ||
          (category === "all" &&
            button.textContent.trim().toLowerCase() === "all")
      );
    });
}

// =========================================
// 12. CLICK HANDLING
// =========================================

// Event delegation keeps the buttons working
// after products and cart contents are rendered.

document.addEventListener("click", (event) => {
  const addButton = event.target.closest("[data-add]");

  if (addButton) {
    addToCart(addButton.dataset.add);
    return;
  }

  const increaseButton = event.target.closest("[data-increase]");

  if (increaseButton) {
    changeQuantity(increaseButton.dataset.increase, 1);
    return;
  }

  const decreaseButton = event.target.closest("[data-decrease]");

  if (decreaseButton) {
    changeQuantity(decreaseButton.dataset.decrease, -1);
    return;
  }

  const removeButton = event.target.closest("[data-remove]");

  if (removeButton) {
    removeFromCart(removeButton.dataset.remove);
    return;
  }

  const categoryButton = event.target.closest(
    ".category-tabs button, .categories button, " +
    ".category-filters button, .category-btn, .filter-btn"
  );

  if (categoryButton) {
    const category =
      categoryButton.dataset.category ||
      categoryButton.dataset.filter ||
      (categoryButton.textContent.trim().toLowerCase() === "all"
        ? "all"
        : null);

    if (category) {
      setCategory(category);
    }
  }
});

// =========================================
// 13. SMALL TOAST MESSAGE
// =========================================

let toastTimeout;

function showToast(message) {
  let toast = document.getElementById("toastMessage");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toastMessage";

    Object.assign(toast.style, {
      position: "fixed",
      bottom: "25px",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: "9999",
      maxWidth: "90%",
      padding: "12px 20px",
      borderRadius: "12px",
      background: "#e7b65c",
      color: "#17120a",
      fontWeight: "800",
      fontSize: "14px",
      textAlign: "center",
      boxShadow: "0 8px 25px rgba(0,0,0,.3)",
      opacity: "0",
      transition: "opacity .25s ease"
    });

    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.opacity = "1";

  clearTimeout(toastTimeout);

  toastTimeout = setTimeout(() => {
    toast.style.opacity = "0";
  }, 2000);
}

// =========================================
// 14. INTERACTIVE 3D FOOD PARALLAX
// =========================================

const floatingFoods = document.querySelectorAll(".floating-food");

let pointerX = 0;
let pointerY = 0;
let parallaxFrame = null;

function updateParallax() {
  floatingFoods.forEach((food) => {
    const depth = Number(food.dataset.depth || 15);

    const moveX = pointerX * (depth / 100);
    const moveY = pointerY * (depth / 100);

    food.style.marginLeft = `${moveX}px`;
    food.style.marginTop = `${moveY}px`;
  });

  parallaxFrame = null;
}

document.addEventListener("pointermove", (event) => {
  // Disable the mouse effect on touch-sized screens.
  if (window.innerWidth <= 720) return;

  pointerX = (event.clientX / window.innerWidth - 0.5) * 30;
  pointerY = (event.clientY / window.innerHeight - 0.5) * 30;

  if (parallaxFrame === null) {
    parallaxFrame = requestAnimationFrame(updateParallax);
  }
});

// =========================================
// 15. START THE WEBSITE
// =========================================

renderProducts();
renderCart();

console.log("Shawerma menu loaded successfully!");
```
