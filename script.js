// ===============================
// SHREE HARIKRUSHNA SUPERMART
// ===============================

// ---------- PRODUCTS ----------
const products = [
  // Grocery & Kitchen
  {
    id: 1,
    name: "Aashirvaad Atta",
    category: "Grocery & Kitchen",
    price: 250,
    unit: "5 kg",
    image: "🌾"
  },
  {
    id: 2,
    name: "Tata Salt",
    category: "Grocery & Kitchen",
    price: 28,
    unit: "1 kg",
    image: "🧂"
  },
  {
    id: 3,
    name: "Fortune Sunflower Oil",
    category: "Grocery & Kitchen",
    price: 145,
    unit: "1 L",
    image: "🫗"
  },
  {
    id: 4,
    name: "Tata Tea",
    category: "Grocery & Kitchen",
    price: 125,
    unit: "250 g",
    image: "🍵"
  },

  // Dairy
  {
    id: 5,
    name: "Amul Butter",
    category: "Dairy",
    price: 60,
    unit: "100 g",
    image: "🧈"
  },
  {
    id: 6,
    name: "Amul Cheese",
    category: "Dairy",
    price: 140,
    unit: "200 g",
    image: "🧀"
  },
  {
    id: 7,
    name: "Amul Fresh Cream",
    category: "Dairy",
    price: 70,
    unit: "250 ml",
    image: "🥛"
  },
  {
    id: 8,
    name: "Amul Paneer",
    category: "Dairy",
    price: 90,
    unit: "200 g",
    image: "🧀"
  },

  // Bakery
  {
    id: 9,
    name: "Sandwich Bread",
    category: "Bakery",
    price: 45,
    unit: "400 g",
    image: "🍞"
  },
  {
    id: 10,
    name: "Premium Cookies",
    category: "Bakery",
    price: 80,
    unit: "200 g",
    image: "🍪"
  },
  {
    id: 11,
    name: "Pav Bhaji Pav",
    category: "Bakery",
    price: 35,
    unit: "6 pcs",
    image: "🥖"
  },
  {
    id: 12,
    name: "Chocolate Cake",
    category: "Bakery",
    price: 250,
    unit: "500 g",
    image: "🎂"
  },

  // Snacks
  {
    id: 13,
    name: "Lay's Classic",
    category: "Snacks",
    price: 20,
    unit: "52 g",
    image: "🥔"
  },
  {
    id: 14,
    name: "Kurkure Masala",
    category: "Snacks",
    price: 20,
    unit: "90 g",
    image: "🌶️"
  },
  {
    id: 15,
    name: "Parle-G Biscuits",
    category: "Snacks",
    price: 10,
    unit: "79 g",
    image: "🍪"
  },
  {
    id: 16,
    name: "Bhujia Sev",
    category: "Snacks",
    price: 55,
    unit: "200 g",
    image: "🥨"
  },

  // Beverages
  {
    id: 17,
    name: "Coca-Cola",
    category: "Beverages",
    price: 40,
    unit: "750 ml",
    image: "🥤"
  },
  {
    id: 18,
    name: "Sprite",
    category: "Beverages",
    price: 40,
    unit: "750 ml",
    image: "🥤"
  },
  {
    id: 19,
    name: "Real Fruit Juice",
    category: "Beverages",
    price: 110,
    unit: "1 L",
    image: "🧃"
  },
  {
    id: 20,
    name: "Packaged Drinking Water",
    category: "Beverages",
    price: 20,
    unit: "1 L",
    image: "💧"
  },

  // Household Essentials
  {
    id: 21,
    name: "Vim Dishwash Bar",
    category: "Household Essentials",
    price: 25,
    unit: "200 g",
    image: "🧼"
  },
  {
    id: 22,
    name: "Surf Excel Matic",
    category: "Household Essentials",
    price: 220,
    unit: "1 kg",
    image: "🧺"
  },
  {
    id: 23,
    name: "Harpic Toilet Cleaner",
    category: "Household Essentials",
    price: 95,
    unit: "500 ml",
    image: "🧴"
  },
  {
    id: 24,
    name: "Colin Glass Cleaner",
    category: "Household Essentials",
    price: 110,
    unit: "500 ml",
    image: "✨"
  }
];


// ---------- CART ----------
let cart = JSON.parse(localStorage.getItem("supermartCart")) || [];


// ---------- DOM ----------
const productsGrid = document.getElementById("productsGrid");
const noProducts = document.getElementById("noProducts");

const searchInput = document.getElementById("searchInput");
const searchSuggestions = document.getElementById("searchSuggestions");


// ---------- RENDER PRODUCTS ----------
function renderProducts(list = products) {

  productsGrid.innerHTML = "";

  if (list.length === 0) {
    noProducts.style.display = "block";
    return;
  }

  noProducts.style.display = "none";

  list.forEach(product => {

    const cartItem = cart.find(item => item.id === product.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <div class="product-image">
        <span>${product.image}</span>
      </div>

      <div class="product-info">

        <h3>${product.name}</h3>

        <p class="product-unit">${product.unit}</p>

        <div class="product-bottom">

          <strong>₹${product.price}</strong>

          ${
            quantity === 0
            ? `
              <button
                class="add-btn"
                onclick="addToCart(${product.id})">
                ADD
              </button>
            `
            : `
              <div class="quantity-control">

                <button onclick="decreaseQuantity(${product.id})">
                  −
                </button>

                <span>${quantity}</span>

                <button onclick="increaseQuantity(${product.id})">
                  +
                </button>

              </div>
            `
          }

        </div>

      </div>
    `;

    productsGrid.appendChild(card);
  });
}


// ==========================================
// SEARCH SYSTEM
// ==========================================

function searchProducts() {

  const query = searchInput.value
    .trim()
    .toLowerCase();

  // Empty search
  if (query === "") {

    searchSuggestions.innerHTML = "";
    searchSuggestions.style.display = "none";

    renderProducts(products);

    return;
  }

  // Search product
  const results = products.filter(product => {

    const name = product.name.toLowerCase();
    const category = product.category.toLowerCase();
    const unit = product.unit.toLowerCase();

    return (
      name.includes(query) ||
      category.includes(query) ||
      unit.includes(query)
    );
  });

  // Show products
  renderProducts(results);

  // Show suggestions
  showSuggestions(results);
}


// ---------- SUGGESTIONS ----------
function showSuggestions(results) {

  searchSuggestions.innerHTML = "";

  if (results.length === 0) {

    searchSuggestions.style.display = "none";

    return;
  }

  // Maximum 6 suggestions
  const suggestions = results.slice(0, 6);

  suggestions.forEach(product => {

    const suggestion = document.createElement("div");

    suggestion.className = "search-suggestion";

    suggestion.innerHTML = `
      <span class="suggestion-icon">
        ${product.image}
      </span>

      <div class="suggestion-text">
        <strong>${product.name}</strong>
        <small>₹${product.price} • ${product.unit}</small>
      </div>
    `;

    suggestion.addEventListener("click", () => {

      searchInput.value = product.name;

      searchSuggestions.innerHTML = "";
      searchSuggestions.style.display = "none";

      renderProducts([product]);

    });

    searchSuggestions.appendChild(suggestion);
  });

  searchSuggestions.style.display = "block";
}


// ---------- SEARCH EVENT ----------
if (searchInput) {

  searchInput.addEventListener("input", searchProducts);

}


// ---------- CLOSE SUGGESTIONS ----------
document.addEventListener("click", function(event) {

  if (
    searchInput &&
    searchSuggestions &&
    !searchInput.contains(event.target) &&
    !searchSuggestions.contains(event.target)
  ) {

    searchSuggestions.style.display = "none";

  }

});


// ---------- CLEAR SEARCH ----------
function clearSearch() {

  searchInput.value = "";

  searchSuggestions.innerHTML = "";
  searchSuggestions.style.display = "none";

  renderProducts(products);
}


// ==========================================
// CATEGORY FILTER
// ==========================================

function filterCategory(category) {

  // Remove active class
  document
    .querySelectorAll(".category-card")
    .forEach(card => {
      card.classList.remove("active");
    });

  // Find clicked category
  const cards = document.querySelectorAll(".category-card");

  cards.forEach(card => {

    const text = card.innerText.trim();

    if (text === category) {
      card.classList.add("active");
    }

  });

  // Clear search
  if (searchInput) {
    searchInput.value = "";
  }

  if (searchSuggestions) {
    searchSuggestions.innerHTML = "";
    searchSuggestions.style.display = "none";
  }

  // All Products
  if (category === "All Products") {

    renderProducts(products);

    return;
  }

  const filtered = products.filter(
    product => product.category === category
  );

  renderProducts(filtered);
}


// ---------- RESET PRODUCTS ----------
function resetProducts() {

  if (searchInput) {
    searchInput.value = "";
  }

  if (searchSuggestions) {
    searchSuggestions.innerHTML = "";
    searchSuggestions.style.display = "none";
  }

  renderProducts(products);
}


// ---------- SCROLL ----------
function scrollToProducts() {

  const section = document.getElementById("productsSection");

  if (section) {
    section.scrollIntoView({
      behavior: "smooth"
    });
  }
}


// ==========================================
// CART FUNCTIONS
// ==========================================

// ADD
function addToCart(productId) {

  const product = products.find(
    p => p.id === productId
  );

  if (!product) return;

  const existing = cart.find(
    item => item.id === productId
  );

  if (existing) {

    existing.quantity += 1;

  } else {

    cart.push({
      id: productId,
      quantity: 1
    });

  }

  saveCart();

  updateCartUI();

  renderProducts(getCurrentProducts());

}


// INCREASE
function increaseQuantity(productId) {

  const item = cart.find(
    item => item.id === productId
  );

  if (item) {

    item.quantity += 1;

  }

  saveCart();

  updateCartUI();

  renderProducts(getCurrentProducts());

}


// DECREASE
function decreaseQuantity(productId) {

  const item = cart.find(
    item => item.id === productId
  );

  if (!item) return;

  item.quantity -= 1;

  if (item.quantity <= 0) {

    cart = cart.filter(
      item => item.id !== productId
    );

  }

  saveCart();

  updateCartUI();

  renderProducts(getCurrentProducts());

}


// REMOVE
function removeFromCart(productId) {

  cart = cart.filter(
    item => item.id !== productId
  );

  saveCart();

  updateCartUI();

  renderProducts(getCurrentProducts());

}


// ---------- SAVE ----------
function saveCart() {

  localStorage.setItem(
    "supermartCart",
    JSON.stringify(cart)
  );

}


// ==========================================
// CURRENT PRODUCT LIST
// ==========================================

function getCurrentProducts() {

  const query = searchInput
    ? searchInput.value.trim().toLowerCase()
    : "";

  // Search active
  if (query !== "") {

    return products.filter(product => {

      return (
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.unit.toLowerCase().includes(query)
      );

    });

  }

  // Category active
  const activeCategory = document.querySelector(
    ".category-card.active"
  );

  if (
    activeCategory &&
    activeCategory.innerText.trim() !== "All Products"
  ) {

    const category =
      activeCategory.innerText.trim();

    return products.filter(
      product => product.category === category
    );

  }

  return products;
}


// ==========================================
// CART UI
// ==========================================

function updateCartUI() {

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (sum, item) => {

      const product = products.find(
        p => p.id === item.id
      );

      return sum +
        (product ? product.price * item.quantity : 0);

    },
    0
  );


  // Header cart count
  const headerCartCount =
    document.getElementById("cartCount");

  if (headerCartCount) {
    headerCartCount.textContent = totalItems;
  }


  // Bottom cart
  const bottomCart =
    document.getElementById("bottomCart");

  const bottomCartItems =
    document.getElementById("bottomCartItems");

  const bottomCartTotal =
    document.getElementById("bottomCartTotal");


  if (bottomCart) {

    if (totalItems > 0) {

      bottomCart.style.display = "flex";

    } else {

      bottomCart.style.display = "none";

    }

  }


  if (bottomCartItems) {
    bottomCartItems.textContent =
      `${totalItems} item${totalItems !== 1 ? "s" : ""}`;
  }


  if (bottomCartTotal) {
    bottomCartTotal.textContent =
      `₹${totalPrice}`;
  }
}


// ==========================================
// CART MODAL
// ==========================================

function openCart() {

  const modal =
    document.getElementById("cartModal");

  if (!modal) return;

  modal.style.display = "flex";

  renderCart();

}


function closeCart() {

  const modal =
    document.getElementById("cartModal");

  if (!modal) return;

  modal.style.display = "none";

}


function closeCartOutside(event) {

  if (
    event.target.id === "cartModal"
  ) {

    closeCart();

  }

}


// ==========================================
// RENDER CART
// ==========================================

function renderCart() {

  const cartItemsContainer =
    document.getElementById("cartItems");

  const subtotalElement =
    document.getElementById("cartSubtotal");

  const deliveryElement =
    document.getElementById("cartDelivery");

  const totalElement =
    document.getElementById("cartTotal");


  if (!cartItemsContainer) return;


  cartItemsContainer.innerHTML = "";


  if (cart.length === 0) {

    cartItemsContainer.innerHTML = `
      <div class="empty-cart">
        🛒
        <h3>Your cart is empty</h3>
        <p>Add some products to continue.</p>
      </div>
    `;

  }


  let subtotal = 0;


  cart.forEach(item => {

    const product = products.find(
      p => p.id === item.id
    );

    if (!product) return;


    const itemTotal =
      product.price * item.quantity;

    subtotal += itemTotal;


    const div =
      document.createElement("div");

    div.className = "cart-item";


    div.innerHTML = `
      <div class="cart-item-image">
        ${product.image}
      </div>

      <div class="cart-item-info">

        <h4>${product.name}</h4>

        <p>${product.unit}</p>

        <strong>₹${product.price}</strong>

      </div>

      <div class="cart-item-right">

        <div class="quantity-control">

          <button onclick="decreaseQuantity(${product.id})">
            −
          </button>

          <span>${item.quantity}</span>

          <button onclick="increaseQuantity(${product.id})">
            +
          </button>

        </div>

        <strong>
          ₹${itemTotal}
        </strong>

      </div>
    `;


    cartItemsContainer.appendChild(div);

  });


  // Delivery
  let deliveryText = "Calculated at checkout";

  if (subtotal >= 500) {
    deliveryText = "FREE";
  }


  if (subtotalElement) {
    subtotalElement.textContent =
      `₹${subtotal}`;
  }


  if (deliveryElement) {
    deliveryElement.textContent =
      deliveryText;
  }


  if (totalElement) {

    if (subtotal >= 500) {

      totalElement.textContent =
        `₹${subtotal}`;

    } else {

      totalElement.textContent =
        `₹${subtotal}`;

    }

  }

}


// ==========================================
// CHECKOUT
// ==========================================

function checkout() {

  if (cart.length === 0) {

    alert("Your cart is empty.");

    return;
  }

  alert(
    "Checkout system will be connected next."
  );

}


// ==========================================
// INITIAL LOAD
// ==========================================

document.addEventListener(
  "DOMContentLoaded",
  function () {

    renderProducts(products);

    updateCartUI();

  }
);
