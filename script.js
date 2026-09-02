/* =========================================================
   SHREE HARIKRISHNA SUPERMART
   STORE WEBSITE JAVASCRIPT
   ========================================================= */


/* ================= PRODUCT DATA ================= */

const products = [

  // GROCERY
  {
    id: 1,
    name: "Aashirvaad Atta",
    weight: "5 kg",
    price: 285,
    mrp: 320,
    category: "grocery",
    emoji: "🌾",
    badge: "Popular"
  },

  {
    id: 2,
    name: "Tata Salt",
    weight: "1 kg",
    price: 28,
    mrp: 30,
    category: "grocery",
    emoji: "🧂"
  },

  {
    id: 3,
    name: "Fortune Sunflower Oil",
    weight: "1 L",
    price: 145,
    mrp: 165,
    category: "grocery",
    emoji: "🫗"
  },

  {
    id: 4,
    name: "Tata Tea",
    weight: "250 g",
    price: 125,
    mrp: 145,
    category: "grocery",
    emoji: "🍵"
  },


  // DAIRY
  {
    id: 5,
    name: "Amul Butter",
    weight: "100 g",
    price: 58,
    mrp: 60,
    category: "dairy",
    emoji: "🧈",
    badge: "Popular"
  },

  {
    id: 6,
    name: "Amul Cheese",
    weight: "200 g",
    price: 125,
    mrp: 140,
    category: "dairy",
    emoji: "🧀"
  },

  {
    id: 7,
    name: "Amul Fresh Cream",
    weight: "250 ml",
    price: 68,
    mrp: 75,
    category: "dairy",
    emoji: "🥛"
  },

  {
    id: 8,
    name: "Amul Paneer",
    weight: "200 g",
    price: 90,
    mrp: 95,
    category: "dairy",
    emoji: "🧀"
  },


  // BAKERY
  {
    id: 9,
    name: "Sandwich Bread",
    weight: "400 g",
    price: 40,
    mrp: 45,
    category: "bakery",
    emoji: "🍞",
    badge: "Fresh"
  },

  {
    id: 10,
    name: "Premium Cookies",
    weight: "200 g",
    price: 55,
    mrp: 65,
    category: "bakery",
    emoji: "🍪"
  },

  {
    id: 11,
    name: "Pav Bhaji Pav",
    weight: "6 pcs",
    price: 30,
    mrp: 35,
    category: "bakery",
    emoji: "🥯"
  },

  {
    id: 12,
    name: "Chocolate Cake",
    weight: "500 g",
    price: 250,
    mrp: 280,
    category: "bakery",
    emoji: "🍰",
    badge: "Special"
  },


  // SNACKS
  {
    id: 13,
    name: "Lay's Classic",
    weight: "50 g",
    price: 20,
    mrp: 20,
    category: "snacks",
    emoji: "🥔"
  },

  {
    id: 14,
    name: "Kurkure Masala",
    weight: "90 g",
    price: 20,
    mrp: 20,
    category: "snacks",
    emoji: "🌽"
  },

  {
    id: 15,
    name: "Parle-G Biscuits",
    weight: "250 g",
    price: 25,
    mrp: 30,
    category: "snacks",
    emoji: "🍪"
  },

  {
    id: 16,
    name: "Bhujia Sev",
    weight: "200 g",
    price: 55,
    mrp: 65,
    category: "snacks",
    emoji: "🥨"
  },


  // BEVERAGES
  {
    id: 17,
    name: "Coca-Cola",
    weight: "750 ml",
    price: 40,
    mrp: 45,
    category: "beverages",
    emoji: "🥤"
  },

  {
    id: 18,
    name: "Sprite",
    weight: "750 ml",
    price: 40,
    mrp: 45,
    category: "beverages",
    emoji: "🥤"
  },

  {
    id: 19,
    name: "Real Fruit Juice",
    weight: "1 L",
    price: 110,
    mrp: 120,
    category: "beverages",
    emoji: "🧃"
  },

  {
    id: 20,
    name: "Packaged Drinking Water",
    weight: "1 L",
    price: 20,
    mrp: 20,
    category: "beverages",
    emoji: "💧"
  },


  // HOUSEHOLD
  {
    id: 21,
    name: "Vim Dishwash Bar",
    weight: "200 g",
    price: 25,
    mrp: 30,
    category: "household",
    emoji: "🧼"
  },

  {
    id: 22,
    name: "Surf Excel Matic",
    weight: "2 kg",
    price: 360,
    mrp: 400,
    category: "household",
    emoji: "🧺"
  },

  {
    id: 23,
    name: "Harpic Toilet Cleaner",
    weight: "500 ml",
    price: 95,
    mrp: 110,
    category: "household",
    emoji: "🧴"
  },

  {
    id: 24,
    name: "Colin Glass Cleaner",
    weight: "500 ml",
    price: 105,
    mrp: 120,
    category: "household",
    emoji: "✨"
  }

];


/* ================= CART ================= */

let cart = JSON.parse(
  localStorage.getItem("supermartCart")
) || {};


/* ================= STATE ================= */

let currentCategory = "all";

let currentSearch = "";


/* ================= SAVE CART ================= */

function saveCart() {

  localStorage.setItem(
    "supermartCart",
    JSON.stringify(cart)
  );

}


/* ================= GET PRODUCT ================= */

function getProduct(id) {

  return products.find(
    product => product.id === Number(id)
  );

}


/* ================= CART QUANTITY ================= */

function getQuantity(id) {

  return cart[id] || 0;

}


/* ================= ADD PRODUCT ================= */

function addToCart(id) {

  id = Number(id);

  if (!cart[id]) {
    cart[id] = 0;
  }

  cart[id]++;

  saveCart();

  renderProducts();

  updateCartUI();

}


/* ================= REMOVE PRODUCT ================= */

function removeFromCart(id) {

  id = Number(id);

  if (!cart[id]) {
    return;
  }

  cart[id]--;

  if (cart[id] <= 0) {
    delete cart[id];
  }

  saveCart();

  renderProducts();

  updateCartUI();

}


/* ================= PRODUCT CARD ================= */

function createProductCard(product) {

  const quantity = getQuantity(product.id);

  const discount =
    product.mrp > product.price
      ? Math.round(
          ((product.mrp - product.price) /
            product.mrp) * 100
        )
      : 0;


  let actionButton = "";


  if (quantity === 0) {

    actionButton = `
      <button
        class="add-button"
        onclick="addToCart(${product.id})"
      >
        ADD
      </button>
    `;

  } else {

    actionButton = `
      <div class="quantity-control">

        <button
          onclick="removeFromCart(${product.id})"
          aria-label="Decrease quantity"
        >
          −
        </button>

        <span>
          ${quantity}
        </span>

        <button
          onclick="addToCart(${product.id})"
          aria-label="Increase quantity"
        >
          +
        </button>

      </div>
    `;

  }


  return `

    <article class="product-card">

      <div class="product-image">

        ${
          product.badge
            ? `<span class="product-badge">
                ${product.badge}
              </span>`
            : ""
        }

        <div class="product-emoji">
          ${product.emoji}
        </div>

      </div>


      <div class="product-info">

        <div class="product-name">
          ${product.name}
        </div>

        <div class="product-weight">
          ${product.weight}
        </div>


        <div class="product-bottom">

          <div>

            <span class="product-price">
              ₹${product.price}
            </span>

            ${
              product.mrp > product.price
                ? `
                  <span class="product-mrp">
                    ₹${product.mrp}
                  </span>
                `
                : ""
            }

          </div>


          ${actionButton}

        </div>

      </div>

    </article>

  `;

}


/* ================= RENDER PRODUCTS ================= */

function renderProducts() {

  const grid =
    document.getElementById("productsGrid");

  const noProducts =
    document.getElementById("noProducts");

  const title =
    document.getElementById("productsTitle");

  const count =
    document.getElementById("productCount");


  let filteredProducts =
    products.filter(product => {

      const categoryMatch =
        currentCategory === "all" ||
        product.category === currentCategory;


      const searchMatch =
        product.name
          .toLowerCase()
          .includes(
            currentSearch.toLowerCase()
          );


      return categoryMatch && searchMatch;

    });


  grid.innerHTML = filteredProducts
    .map(createProductCard)
    .join("");


  count.textContent =
    `${filteredProducts.length} products`;


  if (currentSearch) {

    title.textContent =
      `Search Results`;

  } else if (currentCategory === "all") {

    title.textContent =
      "Popular Products";

  } else {

    title.textContent =
      getCategoryName(currentCategory);

  }


  if (filteredProducts.length === 0) {

    grid.style.display = "none";

    noProducts.style.display = "block";

  } else {

    grid.style.display = "grid";

    noProducts.style.display = "none";

  }

}


/* ================= CATEGORY NAME ================= */

function getCategoryName(category) {

  const names = {

    grocery: "Grocery & Kitchen",

    dairy: "Dairy",

    bakery: "Bakery",

    snacks: "Snacks",

    beverages: "Beverages",

    household: "Household Essentials"

  };

  return names[category] || "Products";

}


/* ================= FILTER CATEGORY ================= */

function filterCategory(category) {

  currentCategory = category;

  currentSearch = "";

  const searchInput =
    document.getElementById("searchInput");

  const clearButton =
    document.getElementById("clearSearch");


  searchInput.value = "";

  clearButton.classList.remove("show");


  document
    .querySelectorAll(".category-card")
    .forEach(card => {

      card.classList.toggle(
        "active",
        card.dataset.category === category
      );

    });


  renderProducts();

  scrollToProducts();

}


/* ================= SEARCH ================= */

function setupSearch() {

  const input =
    document.getElementById("searchInput");

  const clearButton =
    document.getElementById("clearSearch");


  input.addEventListener(
    "input",
    function () {

      currentSearch =
        this.value.trim();

      clearButton.classList.toggle(
        "show",
        currentSearch.length > 0
      );

      renderProducts();

    }
  );

}


/* ================= CLEAR SEARCH ================= */

function clearSearch() {

  const input =
    document.getElementById("searchInput");

  const clearButton =
    document.getElementById("clearSearch");


  input.value = "";

  currentSearch = "";

  clearButton.classList.remove("show");

  renderProducts();

  input.focus();

}


/* ================= RESET PRODUCTS ================= */

function resetProducts() {

  currentCategory = "all";

  currentSearch = "";

  document.getElementById(
    "searchInput"
  ).value = "";

  document.getElementById(
    "clearSearch"
  ).classList.remove("show");


  document
    .querySelectorAll(".category-card")
    .forEach(card => {

      card.classList.toggle(
        "active",
        card.dataset.category === "all"
      );

    });


  renderProducts();

}


/* ================= SCROLL PRODUCTS ================= */

function scrollToProducts() {

  const section =
    document.getElementById("productsSection");

  if (!section) return;

  section.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

}


/* ================= CART TOTALS ================= */

function getCartItemsCount() {

  return Object.values(cart)
    .reduce(
      (total, quantity) =>
        total + quantity,
      0
    );

}


function getCartSubtotal() {

  return Object.entries(cart)
    .reduce(
      (total, [id, quantity]) => {

        const product =
          getProduct(id);

        if (!product) {
          return total;
        }

        return total +
          product.price * quantity;

      },
      0
    );

}


/* ================= UPDATE CART UI ================= */

function updateCartUI() {

  const itemCount =
    getCartItemsCount();

  const subtotal =
    getCartSubtotal();


  const headerCount =
    document.getElementById(
      "headerCartCount"
    );

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


  headerCount.textContent =
    itemCount;


  if (itemCount > 0) {

    bottomCart.style.display =
      "flex";

    bottomItems.textContent =
      `${itemCount} ${
        itemCount === 1
          ? "item"
          : "items"
      }`;

    bottomTotal.textContent =
      `₹${subtotal}`;

  } else {

    bottomCart.style.display =
      "none";

  }

}


/* ================= OPEN CART ================= */

function openCart() {

  const overlay =
    document.getElementById(
      "cartOverlay"
    );

  overlay.classList.add("show");

  document.body.style.overflow =
    "hidden";

  renderCart();

}


/* ================= CLOSE CART ================= */

function closeCart() {

  const overlay =
    document.getElementById(
      "cartOverlay"
    );

  overlay.classList.remove("show");

  document.body.style.overflow =
    "";

}


/* ================= CLOSE OUTSIDE ================= */

function closeCartOutside(event) {

  if (
    event.target.id ===
    "cartOverlay"
  ) {

    closeCart();

  }

}


/* ================= RENDER CART ================= */

function renderCart() {

  const cartItems =
    document.getElementById(
      "cartItems"
    );

  const emptyCart =
    document.getElementById(
      "emptyCart"
    );

  const cartSummary =
    document.getElementById(
      "cartSummary"
    );


  const entries =
    Object.entries(cart)
      .filter(
        ([id, quantity]) =>
          quantity > 0 &&
          getProduct(id)
      );


  if (entries.length === 0) {

    cartItems.innerHTML = "";

    emptyCart.style.display =
      "block";

    cartSummary.style.display =
      "none";

    return;

  }


  emptyCart.style.display =
    "none";

  cartSummary.style.display =
    "block";


  cartItems.innerHTML =
    entries.map(
      ([id, quantity]) => {

        const product =
          getProduct(id);

        const total =
          product.price * quantity;


        return `

          <div class="cart-item">

            <div class="cart-item-image">
              ${product.emoji}
            </div>


            <div class="cart-item-info">

              <div class="cart-item-name">
                ${product.name}
              </div>

              <div class="cart-item-price">
                ₹${product.price}
                × ${quantity}
              </div>

              <div class="cart-item-total">
                ₹${total}
              </div>

            </div>


            <div class="cart-quantity">

              <button
                onclick="removeFromCart(${product.id}); renderCart();"
              >
                −
              </button>

              <span>
                ${quantity}
              </span>

              <button
                onclick="addToCart(${product.id}); renderCart();"
              >
                +
              </button>

            </div>

          </div>

        `;

      }
    ).join("");


  const subtotal =
    getCartSubtotal();


  document.getElementById(
    "cartSubtotal"
  ).textContent =
    `₹${subtotal}`;


  const delivery =
    subtotal >= 500
      ? 0
      : "Calculated at checkout";


  document.getElementById(
    "cartDelivery"
  ).textContent =
    delivery === 0
      ? "FREE"
      : delivery;


  document.getElementById(
    "cartTotal"
  ).textContent =
    delivery === 0
      ? `₹${subtotal}`
      : `₹${subtotal}`;

}


/* ================= CHECKOUT ================= */

function checkout() {

  const count =
    getCartItemsCount();

  if (count === 0) {

    alert(
      "Your cart is empty."
    );

    return;

  }


  alert(
    "Checkout system will be connected next."
  );

}


/* ================= INITIALIZE ================= */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    renderProducts();

    updateCartUI();

    setupSearch();

  }
);
