
const PRICE = 150;

const products = [
  // HOT STARTERS
  { id: 1, name: "Soup of the Day", category: "hot-starter", description: "Fresh soup of the day" },
  { id: 2, name: "Mozzarella Sticks", category: "hot-starter", description: "Golden crispy mozzarella" },
  { id: 3, name: "Halloumi", category: "hot-starter", description: "Grilled halloumi cheese" },
  { id: 4, name: "Chicken Tenders", category: "hot-starter", description: "Crispy chicken strips" },
  { id: 5, name: "Falafel Hummus", category: "hot-starter", description: "Falafel served with hummus" },
  { id: 6, name: "Chicken Samosas", category: "hot-starter", description: "Crispy chicken samosas" },
  { id: 7, name: "Veg Samosa", category: "hot-starter", description: "Vegetable-filled samosas" },
  { id: 8, name: "Onion Rings", category: "hot-starter", description: "Golden crispy onion rings" },
  { id: 9, name: "Chicken Wings", category: "hot-starter", description: "Flavorful chicken wings" },
  { id: 10, name: "Hummus Shawarma Hot Starter", category: "hot-starter", description: "Hummus topped with shawarma" },
  { id: 11, name: "Mixed Hot Starter", category: "hot-starter", description: "A selection of hot starters" },

  // COLD STARTERS
  { id: 12, name: "Hummus", category: "cold-starter", description: "Classic creamy hummus" },
  { id: 13, name: "Baba Ghanooch", category: "cold-starter", description: "Smoky aubergine dip" },
  { id: 14, name: "Moutabel", category: "cold-starter", description: "Creamy smoky aubergine dip" },
  { id: 15, name: "Tzatziki Starter", category: "cold-starter", description: "Refreshing yogurt and cucumber dip" },
  { id: 16, name: "Mixed Cold Starter", category: "cold-starter", description: "A selection of cold starters" },

  // SHAWARMA
  { id: 17, name: "Chicken Shawarma", category: "shawarma", description: "Seasoned chicken shawarma" },
  { id: 18, name: "Beef Shawarma", category: "shawarma", description: "Flavorful beef shawarma" },
  { id: 19, name: "Halloumi", category: "shawarma", description: "Grilled halloumi cheese" },
  { id: 20, name: "Mix Shawarma", category: "shawarma", description: "A delicious chicken and beef mix" },
  { id: 21, name: "Falafel", category: "shawarma", description: "Traditional falafel" },
  { id: 22, name: "BBQ Chicken", category: "shawarma", description: "Chicken with BBQ flavor" },

  // SALADS
  { id: 23, name: "Fattoush Salad", category: "salads", description: "Fresh salad with crispy bread" },
  { id: 24, name: "Tabbouleh Salad", category: "salads", description: "Fresh parsley and bulgur salad" },
  { id: 25, name: "Kings Salad", category: "salads", description: "Fresh mixed salad" },

  // CHIPS & SIDES
  { id: 26, name: "Fries", category: "sides", description: "Golden crispy fries" },
  { id: 27, name: "Peri Fries", category: "sides", description: "Fries with peri seasoning" },
  { id: 28, name: "Rice", category: "sides", description: "Freshly prepared rice" },
  { id: 29, name: "Bulgur", category: "sides", description: "Seasoned bulgur wheat" },
  { id: 30, name: "Fresh Lavash Bread", category: "sides", description: "Fresh lavash bread" },
  { id: 31, name: "Fries & Cheese", category: "sides", description: "Fries topped with cheese" },

  // SHAWARMA LOADED FRIES
  { id: 32, name: "Chicken Loaded Fries", category: "loaded-fries", description: "Fries topped with chicken shawarma" },
  { id: 33, name: "Beef Loaded Fries", category: "loaded-fries", description: "Fries topped with beef shawarma" },
  { id: 34, name: "Lamb Loaded Fries", category: "loaded-fries", description: "Fries topped with lamb" },
  { id: 35, name: "Mixed Loaded Fries", category: "loaded-fries", description: "Fries topped with mixed shawarma" },
  { id: 36, name: "Falafel Loaded Fries", category: "loaded-fries", description: "Fries topped with falafel" },

  // KIDS MEALS
  { id: 37, name: "Kids Nuggets", category: "kids", description: "Chicken nuggets for kids" },
  { id: 38, name: "Mini Chicken", category: "kids", description: "Mini chicken shawarma" },
  { id: 39, name: "Mini Beef", category: "kids", description: "Mini beef shawarma" },
  { id: 40, name: "Mini Lamb", category: "kids", description: "Mini lamb shawarma" },
  { id: 41, name: "Mini Falafel", category: "kids", description: "Mini falafel meal" },
  { id: 42, name: "Mini Mixed", category: "kids", description: "Mini mixed shawarma" }
];

const categoryNames = {
  "hot-starter": "HOT STARTER",
  "cold-starter": "COLD STARTER",
  shawarma: "SHAWARMA",
  salads: "SALAD",
  sides: "CHIPS & SIDES",
  "loaded-fries": "LOADED FRIES",
  kids: "KIDS MEAL"
};

const productGrid = document.getElementById("productGrid");
const categoryNav = document.getElementById("categoryNav");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const mobileCartCount = document.getElementById("mobileCartCount");
const cartTotal = document.getElementById("cartTotal");
const clearCartButton = document.getElementById("clearCart");
const mobileCartButton = document.getElementById("mobileCart");

let selectedCategory = "all";
let cart = [];

function renderProducts() {
  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter(product => product.category === selectedCategory);

  productGrid.innerHTML = filteredProducts.map(product => `
    <article class="product-card">
      <div class="product-info">
        <span class="product-category-label">
          ${categoryNames[product.category]}
        </span>

        <h3 class="product-name">${product.name}</h3>

        <p class="product-description">${product.description}</p>

        <div class="product-bottom">
          <span class="product-price">${PRICE} EGP</span>

          <button
            class="add-btn"
            type="button"
            data-add="${product.id}"
            aria-label="Add ${product.name} to cart"
          >
            + ADD
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

function renderCart() {
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.quantity * PRICE,
    0
  );

  cartCount.textContent = totalQuantity;
  mobileCartCount.textContent = totalQuantity;
  cartTotal.textContent = `${totalPrice} EGP`;

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        <span class="empty-icon">＋</span>
        <p>YOUR CART IS WAITING</p>
        <span>Add something delicious.</span>
      </div>
    `;
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-info">
        <strong>${item.name}</strong>
        <span>${PRICE} EGP each</span>
      </div>

      <div class="cart-item-actions">
        <button
          type="button"
          class="quantity-btn"
          data-decrease="${item.id}"
          aria-label="Remove one ${item.name}"
        >−</button>

        <span class="item-quantity">${item.quantity}</span>

        <button
          type="button"
          class="quantity-btn"
          data-increase="${item.id}"
          aria-label="Add one ${item.name}"
        >+</button>
      </div>

      <strong class="cart-item-total">${item.quantity * PRICE} EGP</strong>
    </div>
  `).join("");
}

function addToCart(productId) {
  const product = products.find(item => item.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
}

function changeQuantity(productId, amount) {
  const item = cart.find(product => product.id === productId);
  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(product => product.id !== productId);
  }

  renderCart();
}

// Category filtering
categoryNav.addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;

  selectedCategory = button.dataset.category;

  categoryNav.querySelectorAll(".category-tab").forEach(tab => {
    tab.classList.toggle("active", tab === button);
  });

  renderProducts();
});

// Add products to cart
productGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-add]");
  if (!button) return;

  addToCart(Number(button.dataset.add));
});

// Increase or decrease cart quantities
cartItems.addEventListener("click", event => {
  const increaseButton = event.target.closest("[data-increase]");
  const decreaseButton = event.target.closest("[data-decrease]");

  if (increaseButton) {
    changeQuantity(Number(increaseButton.dataset.increase), 1);
  }

  if (decreaseButton) {
    changeQuantity(Number(decreaseButton.dataset.decrease), -1);
  }
});

// Clear the entire cart
clearCartButton.addEventListener("click", () => {
  cart = [];
  renderCart();
});

// Scroll to the cart when the mobile bag button is clicked
mobileCartButton.addEventListener("click", () => {
  document.getElementById("cartPanel").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});

// Initial display
renderProducts();
renderCart();
