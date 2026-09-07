/* =========================================================
   SHREE HARIKRISHNA SUPERMART
   Main Website JavaScript
========================================================= */


/* =========================================================
   PRODUCT DATA
========================================================= */

const products = [

  /* ================= GROCERY ================= */

  {
    id: 1,
    name: "Aashirvaad Atta",
    weight: "5 kg",
    price: 285,
    category: "grocery",
    emoji: "🌾"
  },

  {
    id: 2,
    name: "Tata Salt",
    weight: "1 kg",
    price: 28,
    category: "grocery",
    emoji: "🧂"
  },

  {
    id: 3,
    name: "Fortune Sunflower Oil",
    weight: "1 L",
    price: 145,
    category: "grocery",
    emoji: "🫗"
  },

  {
    id: 4,
    name: "Tata Tea",
    weight: "250 g",
    price: 125,
    category: "grocery",
    emoji: "🍵"
  },


  /* ================= DAIRY ================= */

  {
    id: 5,
    name: "Amul Butter",
    weight: "100 g",
    price: 58,
    category: "dairy",
    emoji: "🧈"
  },

  {
    id: 6,
    name: "Amul Cheese",
    weight: "200 g",
    price: 145,
    category: "dairy",
    emoji: "🧀"
  },

  {
    id: 7,
    name: "Amul Fresh Cream",
    weight: "250 ml",
    price: 72,
    category: "dairy",
    emoji: "🥛"
  },

  {
    id: 8,
    name: "Amul Paneer",
    weight: "200 g",
    price: 90,
    category: "dairy",
    emoji: "🧀"
  },


  /* ================= BAKERY ================= */

  {
    id: 9,
    name: "Sandwich Bread",
    weight: "400 g",
    price: 45,
    category: "bakery",
    emoji: "🍞"
  },

  {
    id: 10,
    name: "Premium Cookies",
    weight: "200 g",
    price: 85,
    category: "bakery",
    emoji: "🍪"
  },

  {
    id: 11,
    name: "Pav Bhaji Pav",
    weight: "6 pcs",
    price: 30,
    category: "bakery",
    emoji: "🥯"
  },

  {
    id: 12,
    name: "Chocolate Cake",
    weight: "500 g",
    price: 280,
    category: "bakery",
    emoji: "🍰"
  },


  /* ================= SNACKS ================= */

  {
    id: 13,
    name: "Lay's Classic",
    weight: "52 g",
    price: 20,
    category: "snacks",
    emoji: "🥔"
  },

  {
    id: 14,
    name: "Kurkure Masala",
    weight: "90 g",
    price: 20,
    category: "snacks",
    emoji: "🌽"
  },

  {
    id: 15,
    name: "Parle-G Biscuits",
    weight: "800 g",
    price: 80,
    category: "snacks",
    emoji: "🍪"
  },

  {
    id: 16,
    name: "Bhujia Sev",
    weight: "200 g",
    price: 65,
    category: "snacks",
    emoji: "🥨"
  },


  /* ================= BEVERAGES ================= */

  {
    id: 17,
    name: "Coca-Cola",
    weight: "750 ml",
    price: 40,
    category: "beverages",
    emoji: "🥤"
  },

  {
    id: 18,
    name: "Sprite",
    weight: "750 ml",
    price: 40,
    category: "beverages",
    emoji: "🥤"
  },

  {
    id: 19,
    name: "Real Fruit Juice",
    weight: "1 L",
    price: 120,
    category: "beverages",
    emoji: "🧃"
  },

  {
    id: 20,
    name: "Packaged Drinking Water",
    weight: "1 L",
    price: 20,
    category: "beverages",
    emoji: "💧"
  },


  /* ================= HOUSEHOLD ================= */

  {
    id: 21,
    name: "Vim Dishwash Bar",
    weight: "300 g",
    price: 35,
    category: "household",
    emoji: "🧼"
  },

  {
    id: 22,
    name: "Surf Excel Matic",
    weight: "2 kg",
    price: 310,
    category: "household",
    emoji: "🧺"
  },

  {
    id: 23,
    name: "Harpic Toilet Cleaner",
    weight: "500 ml",
    price: 105,
    category: "household",
    emoji: "🧴"
  },

  {
    id: 24,
    name: "Colin Glass Cleaner",
    weight: "500 ml",
    price: 105,
    category: "household",
    emoji: "✨"
  }

];


/* =========================================================
   STATE
========================================================= */

let cart = {};
let currentCategory = "all";
let currentSearch = "";

const CART_STORAGE_KEY = "shree_harikrishna_cart";


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  loadCart();

  setupSearch();

  renderProducts();

  updateCartUI();

});


/* =========================================================
   CART STORAGE
========================================================= */

function saveCart() {

  try {

    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(cart)
    );

  } catch (error) {

    console.warn("Could not save cart.", error);

  }

}


function loadCart() {

  try {

    const savedCart =
      localStorage.getItem(CART_STORAGE_KEY);

    if (!savedCart) {
      cart = {};
      return;
    }

    const parsedCart = JSON.parse(savedCart);

    if (
      parsedCart &&
      typeof parsedCart === "object"
    ) {

      cart = parsedCart;

    } else {

      cart = {};

    }

  } catch (error) {

    cart = {};

  }

}


/* =========================================================
   PRODUCT HELPERS
========================================================= */

function getProductById(id) {

  return products.find(
    product => Number(product.id) === Number(id)
  );

}


function getCategoryName(category) {

  const names = {

    all: "All Products",

    grocery: "Grocery & Kitchen",

    dairy: "Dairy",

    bakery: "Bakery",

    snacks: "Snacks",

    beverages: "Beverages",

    household: "Household Essentials"

  };

  return names[category] || "Products";

}


function getFilteredProducts() {

  let result = [...products];


  /* CATEGORY FILTER */

  if (currentCategory !== "all") {

    result = result.filter(
      product =>
        product.category === currentCategory
    );

  }


  /* SEARCH FILTER */

  if (currentSearch.trim()) {

    const search =
      currentSearch.trim().toLowerCase();

    result = result.filter(product => {

      const name =
        product.name.toLowerCase();

      const weight =
        product.weight.toLowerCase();

      const category =
        getCategoryName(product.category)
          .toLowerCase();

      return (
        name.includes(search) ||
        weight.includes(search) ||
        category.includes(search)
      );

    });

  }

  return result;

}


/* =========================================================
   PRODUCT CARD
========================================================= */

function createProductCard(product) {

  const quantity =
    Number(cart[product.id]) || 0;


  let actionHTML;


  if (quantity > 0) {

    actionHTML = `
      <div class="quantity-control">

        <button
          type="button"
          onclick="changeQuantity(${product.id}, -1)"
          aria-label="Decrease quantity"
        >
          −
        </button>

        <span>${quantity}</span>

        <button
          type="button"
          onclick="changeQuantity(${product.id}, 1)"
          aria-label="Increase quantity"
        >
          +
        </button>

      </div>
    `;

  } else {

    actionHTML = `
      <button
        class="add-button"
        type="button"
        onclick="addToCart(${product.id})"
      >
        ADD
      </button>
    `;

  }


  return `

    <article
      class="product-card"
      data-product-id="${product.id}"
    >

      <div class="product-image">

        <span class="product-emoji">
          ${product.emoji}
        </span>

      </div>


      <div class="product-info">

        <h3 class="product-name">
          ${escapeHTML(product.name)}
        </h3>

        <p class="product-weight">
          ${escapeHTML(product.weight)}
        </p>


        <div class="product-bottom">

          <strong class="product-price">
            ₹${formatPrice(product.price)}
          </strong>

          ${actionHTML}

        </div>

      </div>

    </article>

  `;

}


/* =========================================================
   RENDER MAIN PRODUCTS
========================================================= */

function renderProducts() {

  const grid =
    document.getElementById("productsGrid");

  const noProducts =
    document.getElementById("noProducts");

  const count =
    document.getElementById("productCount");

  const title =
    document.getElementById("productsTitle");


  if (!grid) return;


  const filtered =
    getFilteredProducts();


  grid.innerHTML =
    filtered.map(createProductCard).join("");


  if (count) {

    count.textContent =
      `${filtered.length} ${
        filtered.length === 1
          ? "product"
          : "products"
      }`;

  }


  if (title) {

    if (currentSearch.trim()) {

      title.textContent =
        `Search results`;

    } else if (currentCategory !== "all") {

      title.textContent =
        getCategoryName(currentCategory);

    } else {

      title.textContent =
        "Popular Products";

    }

  }


  if (noProducts) {

    noProducts.hidden =
      filtered.length !== 0;

  }

}


/* =========================================================
   RENDER CATEGORY PAGE
========================================================= */

function renderCategoryProducts() {

  const grid =
    document.getElementById(
      "categoryProductsGrid"
    );

  const title =
    document.getElementById(
      "categoryPageTitle"
    );

  const count =
    document.getElementById(
      "categoryPageCount"
    );


  if (!grid) return;


  const categoryProducts =
    products.filter(
      product =>
        product.category === currentCategory
    );


  grid.innerHTML =
    categoryProducts
      .map(createProductCard)
      .join("");


  if (title) {

    title.textContent =
      getCategoryName(currentCategory);

  }


  if (count) {

    count.textContent =
      `${categoryProducts.length} ${
        categoryProducts.length === 1
          ? "product"
          : "products"
      }`;

  }

}


/* =========================================================
   CATEGORY FILTER
========================================================= */

function filterCategory(category) {

  currentCategory = category;

  currentSearch = "";


  const searchInput =
    document.getElementById("searchInput");

  if (searchInput) {

    searchInput.value = "";

  }


  hideSearchSuggestions();

  updateClearButton();


  /* ALL PRODUCTS */

  if (category === "all") {

    closeCategoryPage();

    updateCategoryButtons();

    renderProducts();

    scrollToProducts();

    return;

  }


  /* OPEN FULL CATEGORY PAGE */

  openCategoryPage(category);

}


/* =========================================================
   CATEGORY BUTTON UI
========================================================= */

function updateCategoryButtons() {

  document
    .querySelectorAll(".category-card")
    .forEach(button => {

      const category =
        button.dataset.category;

      button.classList.toggle(
        "active",
        category === currentCategory
      );

    });

}


/* =========================================================
   OPEN CATEGORY PAGE
========================================================= */

function openCategoryPage(category) {

  currentCategory = category;

  currentSearch = "";


  const page =
    document.getElementById("categoryPage");

  if (!page) return;


  const searchInput =
    document.getElementById("searchInput");

  if (searchInput) {

    searchInput.value = "";

  }


  hideSearchSuggestions();

  updateClearButton();

  updateCategoryButtons();

  renderCategoryProducts();


  page.classList.add("show");

  page.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.style.overflow = "hidden";


  updateCartUI();

}


/* =========================================================
   CLOSE CATEGORY PAGE
========================================================= */

function closeCategoryPage() {

  const page =
    document.getElementById("categoryPage");

  if (!page) return;


  page.classList.remove("show");

  page.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.style.overflow = "";


  currentCategory = "all";

  currentSearch = "";


  const searchInput =
    document.getElementById("searchInput");

  if (searchInput) {

    searchInput.value = "";

  }


  hideSearchSuggestions();

  updateClearButton();

  updateCategoryButtons();

  renderProducts();

}


/* =========================================================
   HOME
========================================================= */

function goHome() {

  closeCategoryPage();

  closeCart();

  currentCategory = "all";

  currentSearch = "";


  const input =
    document.getElementById("searchInput");

  if (input) {

    input.value = "";

  }


  hideSearchSuggestions();

  updateClearButton();

  updateCategoryButtons();

  renderProducts();


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* =========================================================
   SEARCH SETUP
========================================================= */

function setupSearch() {

  const input =
    document.getElementById("searchInput");

  if (!input) return;


  input.addEventListener(
    "input",
    handleSearchInput
  );


  input.addEventListener(
    "focus",
    () => {

      if (input.value.trim()) {

        renderSearchSuggestions();

      }

    }
  );


  input.addEventListener(
    "keydown",
    event => {

      if (event.key === "Escape") {

        clearSearch();

      }

    }
  );


  document.addEventListener(
    "click",
    event => {

      const box =
        document.getElementById("searchBox");

      if (
        box &&
        !box.contains(event.target)
      ) {

        hideSearchSuggestions();

      }

    }
  );

}


/* =========================================================
   SEARCH INPUT
========================================================= */

function handleSearchInput(event) {

  const value =
    event.target.value;

  currentSearch = value;


  /* Searching means All Products */

  currentCategory = "all";

  updateCategoryButtons();

  renderProducts();

  updateClearButton();

  renderSearchSuggestions();

}


/* =========================================================
   SEARCH SUGGESTIONS
========================================================= */

function renderSearchSuggestions() {

  const container =
    document.getElementById(
      "searchSuggestions"
    );

  const input =
    document.getElementById("searchInput");


  if (!container || !input) return;


  const query =
    input.value.trim().toLowerCase();


  if (!query) {

    hideSearchSuggestions();

    return;

  }


  const matches =
    products
      .filter(product => {

        const name =
          product.name.toLowerCase();

        const category =
          getCategoryName(product.category)
            .toLowerCase();

        return (
          name.includes(query) ||
          category.includes(query)
        );

      })
      .slice(0, 7);


  if (!matches.length) {

    container.innerHTML = `

      <div class="suggestion-item">

        <div class="suggestion-image">
          🔍
        </div>

        <div class="suggestion-info">

          <span class="suggestion-name">
            No products found
          </span>

          <span class="suggestion-meta">
            Try another search
          </span>

        </div>

      </div>

    `;

    container.classList.add("show");

    return;

  }


  container.innerHTML =
    matches.map(product => `

      <button
        type="button"
        class="suggestion-item"
        onclick="selectSearchSuggestion(${product.id})"
      >

        <span class="suggestion-image">
          ${product.emoji}
        </span>

        <span class="suggestion-info">

          <span class="suggestion-name">
            ${escapeHTML(product.name)}
          </span>

          <span class="suggestion-meta">
            ${escapeHTML(product.weight)}
            • ₹${formatPrice(product.price)}
          </span>

        </span>

      </button>

    `).join("");


  container.classList.add("show");

}


/* =========================================================
   SELECT SEARCH SUGGESTION
========================================================= */

function selectSearchSuggestion(id) {

  const product =
    getProductById(id);

  if (!product) return;


  currentCategory = "all";

  currentSearch = product.name;


  const input =
    document.getElementById("searchInput");

  if (input) {

    input.value =
      product.name;

  }


  hideSearchSuggestions();

  updateClearButton();

  updateCategoryButtons();

  renderProducts();


  const productsSection =
    document.getElementById(
      "productsSection"
    );

  if (productsSection) {

    productsSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }

}


/* =========================================================
   CLEAR SEARCH
========================================================= */

function clearSearch() {

  currentSearch = "";

  currentCategory = "all";


  const input =
    document.getElementById("searchInput");

  if (input) {

    input.value = "";

  }


  hideSearchSuggestions();

  updateClearButton();

  updateCategoryButtons();

  renderProducts();


  if (input) {

    input.focus();

  }

}


/* =========================================================
   CLEAR BUTTON
========================================================= */

function updateClearButton() {

  const button =
    document.getElementById(
      "clearSearch"
    );

  if (!button) return;


  button.style.display =
    currentSearch.trim()
      ? "flex"
      : "none";

}


/* =========================================================
   HIDE SEARCH SUGGESTIONS
========================================================= */

function hideSearchSuggestions() {

  const container =
    document.getElementById(
      "searchSuggestions"
    );

  if (!container) return;

  container.classList.remove("show");

}


/* =========================================================
   RESET PRODUCTS
========================================================= */

function resetProducts() {

  currentCategory = "all";

  currentSearch = "";


  const input =
    document.getElementById("searchInput");

  if (input) {

    input.value = "";

  }


  hideSearchSuggestions();

  updateClearButton();

  updateCategoryButtons();

  renderProducts();

}


/* =========================================================
   ADD TO CART
========================================================= */

function addToCart(id) {

  const product =
    getProductById(id);

  if (!product) return;


  const current =
    Number(cart[id]) || 0;


  cart[id] =
    current + 1;


  saveCart();

  updateCartUI();

  refreshProductCards();

}


/* =========================================================
   CHANGE QUANTITY
========================================================= */

function changeQuantity(id, change) {

  const current =
    Number(cart[id]) || 0;


  const newQuantity =
    current + Number(change);


  if (newQuantity <= 0) {

    delete cart[id];

  } else {

    cart[id] =
      newQuantity;

  }


  saveCart();

  updateCartUI();

  refreshProductCards();

}


/* =========================================================
   REMOVE PRODUCT
========================================================= */

function removeFromCart(id) {

  delete cart[id];

  saveCart();

  updateCartUI();

  refreshProductCards();

  renderCart();

}


/* =========================================================
   REFRESH PRODUCT CARDS
========================================================= */

function refreshProductCards() {

  const categoryPage =
    document.getElementById(
      "categoryPage"
    );


  if (
    categoryPage &&
    categoryPage.classList.contains("show")
  ) {

    renderCategoryProducts();

  } else {

    renderProducts();

  }

}


/* =========================================================
   CART TOTAL QUANTITY
========================================================= */

function getCartItemCount() {

  return Object.values(cart)
    .reduce(
      (total, quantity) =>
        total + Number(quantity || 0),
      0
    );

}


/* =========================================================
   CART SUBTOTAL
========================================================= */

function getCartSubtotal() {

  return Object.entries(cart)
    .reduce(
      (total, [id, quantity]) => {

        const product =
          getProductById(id);

        if (!product) {
          return total;
        }

        return (
          total +
          product.price *
          Number(quantity || 0)
        );

      },
      0
    );

}


/* =========================================================
   UPDATE CART UI
========================================================= */

function updateCartUI() {

  const count =
    getCartItemCount();

  const subtotal =
    getCartSubtotal();


  /* HEADER */

  const headerCount =
    document.getElementById(
      "headerCartCount"
    );

  if (headerCount) {

    headerCount.textContent =
      count;

  }


  /* CATEGORY HEADER */

  const categoryCount =
    document.getElementById(
      "categoryCartCount"
    );

  if (categoryCount) {

    categoryCount.textContent =
      count;

  }


  /* BOTTOM CART */

  const bottomCart =
    document.getElementById(
      "bottomCart"
    );

  const bottomItems =
    document.getElementById(
      "bottomCartItems"
    );

  const bottomTotal =
    document.getElementById(
      "bottomCartTotal"
    );


  if (bottomCart) {

    bottomCart.hidden =
      count === 0;

  }


  if (bottomItems) {

    bottomItems.textContent =
      `${count} ${
        count === 1
          ? "item"
          : "items"
      }`;

  }


  if (bottomTotal) {

    bottomTotal.textContent =
      `₹${formatPrice(subtotal)}`;

  }


  /* CART SUMMARY */

  const subtotalElement =
    document.getElementById(
      "cartSubtotal"
    );

  const totalElement =
    document.getElementById(
      "cartTotal"
    );


  if (subtotalElement) {

    subtotalElement.textContent =
      `₹${formatPrice(subtotal)}`;

  }


  if (totalElement) {

    totalElement.textContent =
      `₹${formatPrice(subtotal)}`;

  }

}


/* =========================================================
   OPEN CART
========================================================= */

function openCart() {

  const overlay =
    document.getElementById(
      "cartOverlay"
    );

  if (!overlay) return;


  renderCart();

  updateCartUI();


  overlay.classList.add("show");

  overlay.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.style.overflow =
    "hidden";

}


/* =========================================================
   CLOSE CART
========================================================= */

function closeCart() {

  const overlay =
    document.getElementById(
      "cartOverlay"
    );

  if (!overlay) return;


  overlay.classList.remove("show");

  overlay.setAttribute(
    "aria-hidden",
    "true"
  );


  const categoryPage =
    document.getElementById(
      "categoryPage"
    );


  if (
    categoryPage &&
    categoryPage.classList.contains("show")
  ) {

    document.body.style.overflow =
      "hidden";

  } else {

    document.body.style.overflow =
      "";

  }

}


/* =========================================================
   CLOSE CART OUTSIDE
========================================================= */

function closeCartOutside(event) {

  if (
    event.target &&
    event.target.id === "cartOverlay"
  ) {

    closeCart();

  }

}


/* =========================================================
   RENDER CART
========================================================= */

function renderCart() {

  const itemsContainer =
    document.getElementById(
      "cartItems"
    );

  const emptyCart =
    document.getElementById(
      "emptyCart"
    );

  const summary =
    document.getElementById(
      "cartSummary"
    );


  if (!itemsContainer) return;


  const entries =
    Object.entries(cart)
      .filter(
        ([, quantity]) =>
          Number(quantity) > 0
      );


  if (!entries.length) {

    itemsContainer.innerHTML = "";

    if (emptyCart) {
      emptyCart.style.display =
        "block";
    }

    if (summary) {
      summary.style.display =
        "none";
    }

    return;

  }


  if (emptyCart) {
    emptyCart.style.display =
      "none";
  }

  if (summary) {
    summary.style.display =
      "block";
  }


  itemsContainer.innerHTML =
    entries.map(([id, quantity]) => {

      const product =
        getProductById(id);

      if (!product) return "";


      const qty =
        Number(quantity);

      const itemTotal =
        product.price * qty;


      return `

        <div class="cart-item">

          <div class="cart-item-image">
            ${product.emoji}
          </div>


          <div class="cart-item-info">

            <div class="cart-item-name">
              ${escapeHTML(product.name)}
            </div>

            <div class="cart-item-weight">
              ${escapeHTML(product.weight)}
            </div>

            <div class="cart-item-price">
              ₹${formatPrice(itemTotal)}
            </div>

          </div>


          <div class="cart-item-controls">

            <button
              type="button"
              onclick="changeQuantity(${product.id}, -1)"
              aria-label="Decrease quantity"
            >
              −
            </button>

            <span>
              ${qty}
            </span>

            <button
              type="button"
              onclick="changeQuantity(${product.id}, 1)"
              aria-label="Increase quantity"
            >
              +
            </button>

          </div>

        </div>

      `;

    }).join("");


  updateCartUI();

}


/* =========================================================
   CHECKOUT
========================================================= */

function checkout() {

  const count =
    getCartItemCount();

  const subtotal =
    getCartSubtotal();


  if (count === 0) {

    alert(
      "Your cart is empty. Please add some products first."
    );

    return;

  }


  alert(
    `Order summary\n\n` +
    `Items: ${count}\n` +
    `Subtotal: ₹${formatPrice(subtotal)}\n\n` +
    `Checkout system will be connected next.`
  );

}


/* =========================================================
   SCROLL TO PRODUCTS
========================================================= */

function scrollToProducts() {

  const section =
    document.getElementById(
      "productsSection"
    );

  if (!section) return;


  section.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

}


/* =========================================================
   FORMAT PRICE
========================================================= */

function formatPrice(value) {

  return Number(value || 0)
    .toLocaleString("en-IN");

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


/* =========================================================
   KEYBOARD
========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (event.key === "Escape") {

      const cartOverlay =
        document.getElementById(
          "cartOverlay"
        );

      if (
        cartOverlay &&
        cartOverlay.classList.contains("show")
      ) {

        closeCart();

        return;

      }


      const categoryPage =
        document.getElementById(
          "categoryPage"
        );

      if (
        categoryPage &&
        categoryPage.classList.contains("show")
      ) {

        closeCategoryPage();

      }

    }

  }
);
