
const PRICE = 150;

const products = [
  {
    id: "chicken-roll",
    name: "Chicken Shawerma Roll",
    category: "chicken",
    label: "CHICKEN SHAWERMA",
    description: "Tender grilled chicken, wrapped and served fresh.",
    image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "meat-roll",
    name: "Meat Shawerma Roll",
    category: "meat",
    label: "MEAT SHAWERMA",
    description: "Juicy seasoned meat, fresh vegetables and warm bread.",
    image: "https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "grilled-1kg",
    name: "Grilled Chicken — 1 Kilo",
    category: "grilled",
    label: "GRILLED CHICKEN",
    description: "Flame-grilled chicken, family-size portion.",
    image: "https://images.unsplash.com/photo-1532634896-26909d0d4b09?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "grilled-half",
    name: "Grilled Chicken — 1/2 Kilo",
    category: "grilled",
    label: "GRILLED CHICKEN",
    description: "Half-kilo portion, seasoned and grilled.",
    image: "https://images.unsplash.com/photo-1532634896-26909d0d4b09?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "grilled-quarter",
    name: "Grilled Chicken — 1/4 Kilo",
    category: "grilled",
    label: "GRILLED CHICKEN",
    description: "Quarter-kilo portion, fresh off the grill.",
    image: "https://images.unsplash.com/photo-1532634896-26909d0d4b09?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "chicken-meal",
    name: "Chicken Meal",
    category: "meals",
    label: "SIGNATURE MEALS",
    description: "A satisfying chicken meal with delicious sides.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "meat-meal",
    name: "Meat Meal",
    category: "meals",
    label: "SIGNATURE MEALS",
    description: "A rich meat meal, served with tasty sides.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85"
  }
];

const cart = new Map();

const productGrid = document.getElementById("productGrid");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");
const mobileCartCount = document.getElementById("mobileCartCount");

function renderProducts(category = "all") {
  const filtered = category === "all"
    ? products
    : products.filter(product => product.category === category);

  productGrid.innerHTML = filtered.map((product, index) => `
    <article class="product-card" style="animation-delay:${index * 60}ms">
      <div class="product-image">
        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
          onerror="this.onerror=null;this.src='https://placehold.co/800x500/242320/e8dfd2?text=SHAWERMA';"
        >
        <span class="product-category">${product.label}</span>
      </div>
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="product-bottom">
          <span class="price">${PRICE} <small>EGP</small></span>
          <button class="add-btn" data-add="${product.id}">
            + ADD TO CART
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

function addToCart(id) {
  cart.set(id, (cart.get(id) || 0) + 1);
  renderCart();
}

function changeQuantity(id, amount) {
  const next = (cart.get(id) || 0) + amount;

  if (next <= 0) {
    cart.delete(id);
  } else {
    cart.set(id, next);
  }

  renderCart();
}

function removeItem(id) {
  cart.delete(id);
  renderCart();
}

function renderCart() {
  const entries = [...cart.entries()];
  const totalItems = entries.reduce(
    (sum, [, quantity]) => sum + quantity, 0
  );
  const totalPrice = totalItems * PRICE;

  cartCount.textContent = totalItems;
  mobileCartCount.textContent = totalItems;
  cartTotal.textContent =
    `${totalPrice.toLocaleString("en-US")} EGP`;

  if (entries.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        <span class="empty-icon">＋</span>
        <p>YOUR CART IS WAITING</p>
        <span>Add something delicious.</span>
      </div>
    `;
    return;
  }

  cartItems.innerHTML = entries.map(([id, quantity]) => {
    const product = products.find(item => item.id === id);

    return `
      <div class="cart-item">
        <div>
          <h4>${product.name}</h4>
          <span class="item-price">${PRICE} EGP each</span>
        </div>
        <div class="cart-item-actions">
          <button class="qty-btn"
            data-decrease="${id}"
            aria-label="Decrease quantity">−</button>
          <span class="qty">${quantity}</span>
          <button class="qty-btn"
            data-increase="${id}"
            aria-label="Increase quantity">+</button>
          <button class="remove-btn"
            data-remove="${id}"
            aria-label="Remove item">×</button>
        </div>
      </div>
    `;
  }).join("");
}

document.getElementById("categoryNav").addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;

  document.querySelectorAll(".category-tab").forEach(tab => {
    tab.classList.toggle("active", tab === button);
  });

  renderProducts(button.dataset.category);
});

productGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-add]");
  if (button) addToCart(button.dataset.add);
});

cartItems.addEventListener("click", event => {
  const button = event.target.closest("button");
  if (!button) return;

  if (button.dataset.increase) {
    changeQuantity(button.dataset.increase, 1);
  } else if (button.dataset.decrease) {
    changeQuantity(button.dataset.decrease, -1);
  } else if (button.dataset.remove) {
    removeItem(button.dataset.remove);
  }
});

document.getElementById("clearCart").addEventListener("click", () => {
  cart.clear();
  renderCart();
});

document.getElementById("mobileCart").addEventListener("click", () => {
  document.getElementById("cartPanel").scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
});

// Mouse-responsive 3D background.
let mouseX = 0;
let mouseY = 0;
let frameRequested = false;

document.addEventListener("pointermove", event => {
  mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
  mouseY = (event.clientY / window.innerHeight - 0.5) * 2;

  if (!frameRequested) {
    frameRequested = true;
    requestAnimationFrame(updateParallax);
  }
});

function updateParallax() {
  document.querySelectorAll("[data-depth]").forEach(element => {
    const depth = Number(element.dataset.depth);
    const x = mouseX * depth;
    const y = mouseY * depth;

    element.style.transform =
      `translate3d(${x}px, ${y}px, ${depth / 2}px)`;
  });

  frameRequested = false;
}

renderProducts();
renderCart();
