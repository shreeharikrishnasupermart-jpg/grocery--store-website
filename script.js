/* =========================================================
   SHREE HARIKRISHNA SUPERMART
   PRODUCT + SEARCH + CART SYSTEM
   ========================================================= */


/* ================= PRODUCT DATA ================= */

const products = [

  // GROCERY & KITCHEN
  {
    id: 1,
    name: "Aashirvaad Atta",
    category: "grocery",
    price: 299,
    weight: "5 kg",
    image: "🌾"
  },
  {
    id: 2,
    name: "Tata Salt",
    category: "grocery",
    price: 28,
    weight: "1 kg",
    image: "🧂"
  },
  {
    id: 3,
    name: "Fortune Sunflower Oil",
    category: "grocery",
    price: 145,
    weight: "1 L",
    image: "🫗"
  },
  {
    id: 4,
    name: "Tata Tea",
    category: "grocery",
    price: 125,
    weight: "250 g",
    image: "🍵"
  },


  // DAIRY
  {
    id: 5,
    name: "Amul Butter",
    category: "dairy",
    price: 58,
    weight: "100 g",
    image: "🧈"
  },
  {
    id: 6,
    name: "Amul Cheese",
    category: "dairy",
    price: 145,
    weight: "200 g",
    image: "🧀"
  },
  {
    id: 7,
    name: "Amul Fresh Cream",
    category: "dairy",
    price: 70,
    weight: "250 ml",
    image: "🥛"
  },
  {
    id: 8,
    name: "Amul Paneer",
    category: "dairy",
    price: 90,
    weight: "200 g",
    image: "🧀"
  },


  // BAKERY
  {
    id: 9,
    name: "Sandwich Bread",
    category: "bakery",
    price: 40,
    weight: "400 g",
    image: "🍞"
  },
  {
    id: 10,
    name: "Premium Cookies",
    category: "bakery",
    price: 60,
    weight: "200 g",
    image: "🍪"
  },
  {
    id: 11,
    name: "Pav Bhaji Pav",
    category: "bakery",
    price: 35,
    weight: "6 pcs",
    image: "🥖"
  },
  {
    id: 12,
    name: "Chocolate Cake",
    category: "bakery",
    price: 220,
    weight: "500 g",
    image: "🍰"
  },


  // SNACKS
  {
    id: 13,
    name: "Lay's Classic",
    category: "snacks",
    price: 20,
    weight: "52 g",
    image: "🥔"
  },
  {
    id: 14,
    name: "Kurkure Masala",
    category: "snacks",
    price: 20,
    weight: "55 g",
    image: "🌽"
  },
  {
    id: 15,
    name: "Parle-G Biscuits",
    category: "snacks",
    price: 10,
    weight: "79 g",
    image: "🍪"
  },
  {
    id: 16,
    name: "Bhujia Sev",
    category: "snacks",
    price: 55,
    weight: "200 g",
    image: "🥨"
  },


  // BEVERAGES
  {
    id: 17,
    name: "Coca-Cola",
    category: "beverages",
    price: 40,
    weight: "750 ml",
    image: "🥤"
  },
  {
    id: 18,
    name: "Sprite",
    category: "beverages",
    price: 40,
    weight: "750 ml",
    image: "🥤"
  },
  {
    id: 19,
    name: "Real Fruit Juice",
    category: "beverages",
    price: 110,
    weight: "1 L",
    image: "🧃"
  },
  {
    id: 20,
    name: "Packaged Drinking Water",
    category: "beverages",
    price: 20,
    weight: "1 L",
    image: "💧"
  },


  // HOUSEHOLD
  {
    id: 21,
    name: "Vim Dishwash Bar",
    category: "household",
    price: 25,
    weight: "200 g",
    image: "🧼"
  },
  {
    id: 22,
    name: "Surf Excel Matic",
    category: "household",
    price: 210,
    weight: "1 kg",
    image: "🧺"
  },
  {
    id: 23,
    name: "Harpic Toilet Cleaner",
    category: "household",
    price: 105,
    weight: "500 ml",
    image: "🧴"
  },
  {
    id: 24,
    name: "Colin Glass Cleaner",
    category: "household",
    price: 105,
    weight: "500 ml",
    image: "✨"
  }

];


/* ================= STATE ================= */

let cart = {};

let currentCategory = "all";

let currentSearch = "";


/* ================= CATEGORY NAMES ================= */

const categoryNames = {
  all: "All Products",
  grocery: "Grocery & Kitchen",
  dairy: "Dairy",
  bakery: "Bakery",
  snacks: "Snacks",
  beverages: "Beverages",
  household: "Household Essentials"
};


/* ================= CART STORAGE ================= */

function loadCart() {

  try {

    const saved =
      localStorage.getItem("supermartCart");

    if (saved) {

      const parsed =
        JSON.parse(saved);

      if (
        parsed &&
        typeof parsed === "object"
      ) {
        cart = parsed;
      }

    }

  } catch (error) {

    cart = {};

  }

}


function saveCart() {

  try {

    localStorage.setItem(
      "supermartCart",
      JSON.stringify(cart)
    );

  } catch (error) {

    console.log("Cart storage unavailable");

  }

}


/* ================= FILTER PRODUCTS ================= */

function getFilteredProducts() {

  let result = [...products];


  if (currentCategory !== "all") {

    result =
      result.filter(product =>
        product.category === currentCategory
      );

  }


  const search =
    currentSearch
      .trim()
      .toLowerCase();


  if (search !== "") {

    result =
      result.filter(product =>

        product.name
          .toLowerCase()
          .includes(search)

      );

  }


  return result;

}


/* ================= PRODUCT CARD ================= */

function createProductCard(product) {

  const quantity =
    Number(cart[product.id] || 0);


  const card =
    document.createElement("div");

  card.className =
    "product-card";

  card.dataset.productId =
    product.id;


  const quantityHTML =
    quantity > 0

      ? `
        <div class="quantity-control">

          <button
            type="button"
            onclick="removeFromCart(${product.id})"
            aria-label="Decrease quantity"
          >
            −
          </button>

          <span>${quantity}</span>

          <button
            type="button"
            onclick="addToCart(${product.id})"
            aria-label="Increase quantity"
          >
            +
          </button>

        </div>
      `

      : `
        <button
          type="button"
          class="add-button"
          onclick="addToCart(${product.id})"
        >
          ADD
        </button>
      `;


  card.innerHTML = `

    <div class="product-image">

      <span class="product-emoji">
        ${product.image}
      </span>

    </div>


    <div class="product-info">

      <div class="product-name">
        ${product.name}
      </div>

      <div class="product-weight">
        ${product.weight}
      </div>

      <div class="product-bottom">

        <div class="product-price">
          ₹${product.price}
        </div>

        ${quantityHTML}

      </div>

    </div>

  `;


  return card;

}


/* ================= RENDER MAIN PRODUCTS ================= */

function renderMainProducts() {

  const grid =
    document.getElementById("productsGrid");

  if (!grid) return;


  const filtered =
    getFilteredProducts();


  grid.innerHTML = "";


  filtered.forEach(product => {

    grid.appendChild(
      createProductCard(product)
    );

  });


  const count =
    document.getElementById("productCount");

  if (count) {

    count.textContent =
      `${filtered.length} products`;

  }


  const title =
    document.getElementById("productsTitle");

  if (title) {

    if (currentSearch.trim() !== "") {

      title.textContent =
        "Search Results";

    } else {

      title.textContent =
        currentCategory === "all"
          ? "Popular Products"
          : categoryNames[currentCategory];

    }

  }


  const noProducts =
    document.getElementById("noProducts");

  if (noProducts) {

    noProducts.style.display =
      filtered.length === 0
        ? "block"
        : "none";

  }

}


/* ================= RENDER CATEGORY PAGE ================= */

function renderCategoryProducts() {

  const grid =
    document.getElementById(
      "categoryProductsGrid"
    );

  if (!grid) return;


  const filtered =
    getFilteredProducts();


  grid.innerHTML = "";


  filtered.forEach(product => {

    grid.appendChild(
      createProductCard(product)
    );

  });


  const count =
    document.getElementById(
      "categoryPageCount"
    );

  if (count) {

    count.textContent =
      `${filtered.length} products`;

  }

}


/* ================= RENDER EVERYTHING ================= */

function renderProducts() {

  renderMainProducts();

  const categoryPage =
    document.getElementById("categoryPage");

  if (
    categoryPage &&
    categoryPage.classList.contains("show")
  ) {

    renderCategoryProducts();

  }

  updateCartUI();

}


/* ================= CATEGORY FILTER ================= */

function filterCategory(category) {

  currentCategory =
    category;

  currentSearch =
    "";


  const input =
    document.getElementById("searchInput");

  if (input) {
    input.value = "";
  }


  const clearButton =
    document.getElementById("clearSearch");

  if (clearButton) {
    clearButton.classList.remove("show");
  }


  document
    .querySelectorAll(".category-card")
    .forEach(card => {

      card.classList.toggle(
        "active",
        card.dataset.category === category
      );

    });


  openCategoryPage(category);

}


/* ================= OPEN CATEGORY PAGE ================= */

function openCategoryPage(category) {

  const page =
    document.getElementById("categoryPage");

  const title =
    document.getElementById("categoryPageTitle");

  if (!page) return;


  currentCategory =
    category;


  if (title) {

    title.textContent =
      categoryNames[category] ||
      "Products";

  }


  page.classList.add("show");

  page.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.classList.add(
    "no-scroll"
  );


  renderCategoryProducts();


  page.scrollTop = 0;

}


/* ================= CLOSE CATEGORY PAGE ================= */

function closeCategoryPage() {

  const page =
    document.getElementById("categoryPage");

  if (!page) return;


  page.classList.remove("show");

  page.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.classList.remove(
    "no-scroll"
  );


  currentCategory =
    "all";

  currentSearch =
    "";


  const input =
    document.getElementById("searchInput");

  if (input) {
    input.value = "";
  }


  const clearButton =
    document.getElementById("clearSearch");

  if (clearButton) {
    clearButton.classList.remove("show");
  }


  document
    .querySelectorAll(".category-card")
    .forEach(card => {

      card.classList.toggle(
        "active",
        card.dataset.category === "all"
      );

    });


  renderMainProducts();

  updateCartUI();

}


/* ================= ADD TO CART ================= */

function addToCart(productId) {

  const product =
    products.find(
      item => item.id === Number(productId)
    );

  if (!product) return;


  const id =
    String(product.id);


  cart[id] =
    Number(cart[id] || 0) + 1;


  saveCart();

  renderProducts();

}


/* ================= REMOVE FROM CART ================= */

function removeFromCart(productId) {

  const id =
    String(productId);


  if (!cart[id]) return;


  cart[id] =
    Number(cart[id]) - 1;


  if (cart[id] <= 0) {

    delete cart[id];

  }


  saveCart();

  renderProducts();

}


/* ================= CART TOTALS ================= */

function getCartItemCount() {

  return Object.values(cart)
    .reduce(
      (total, quantity) =>
        total + Number(quantity || 0),
      0
    );

}


function getCartSubtotal() {

  return products.reduce(

    (total, product) => {

      const quantity =
        Number(
          cart[String(product.id)] || 0
        );

      return total +
        (product.price * quantity);

    },

    0

  );

}


/* ================= UPDATE CART UI ================= */

function updateCartUI() {

  const itemCount =
    getCartItemCount();

  const subtotal =
    getCartSubtotal();


  const headerCount =
    document.getElementById(
      "headerCartCount"
    );

  if (headerCount) {

    headerCount.textContent =
      itemCount;

  }


  const bottomCart =
    document.getElementById(
      "bottomCart"
    );

  if (bottomCart) {

    bottomCart.style.display =
      itemCount > 0
        ? "flex"
        : "none";

  }


  const bottomItems =
    document.getElementById(
      "bottomCartItems"
    );

  if (bottomItems) {

    bottomItems.textContent =
      `${itemCount} ${
        itemCount === 1
          ? "item"
          : "items"
      }`;

  }


  const bottomTotal =
    document.getElementById(
      "bottomCartTotal"
    );

  if (bottomTotal) {

    bottomTotal.textContent =
      `₹${subtotal}`;

  }


  renderCart();

}


/* ================= OPEN CART ================= */

function openCart() {

  const overlay =
    document.getElementById(
      "cartOverlay"
    );

  if (!overlay) return;


  renderCart();


  overlay.classList.add("show");

  document.body.classList.add(
    "no-scroll"
  );

}


/* ================= CLOSE CART ================= */

function closeCart() {

  const overlay =
    document.getElementById(
      "cartOverlay"
    );

  if (!overlay) return;


  overlay.classList.remove("show");

  document.body.classList.remove(
    "no-scroll"
  );

}


/* ================= CLOSE CART OUTSIDE ================= */

function closeCartOutside(event) {

  if (
    event.target &&
    event.target.id === "cartOverlay"
  ) {

    closeCart();

  }

}


/* ================= RENDER CART ================= */

function renderCart() {

  const container =
    document.getElementById(
      "cartItems"
    );

  const empty =
    document.getElementById(
      "emptyCart"
    );

  const summary =
    document.getElementById(
      "cartSummary"
    );


  if (
    !container ||
    !empty ||
    !summary
  ) {
    return;
  }


  container.innerHTML = "";


  const itemCount =
    getCartItemCount();


  if (itemCount === 0) {

    empty.style.display =
      "block";

    summary.style.display =
      "none";

    return;

  }


  empty.style.display =
    "none";

  summary.style.display =
    "block";


  products.forEach(product => {

    const quantity =
      Number(
        cart[String(product.id)] || 0
      );


    if (quantity <= 0) return;


    const item =
      document.createElement("div");

    item.className =
      "cart-item";


    const itemTotal =
      product.price * quantity;


    item.innerHTML = `

      <div class="cart-item-image">
        ${product.image}
      </div>


      <div class="cart-item-info">

        <div class="cart-item-name">
          ${product.name}
        </div>

        <div class="cart-item-price">
          ₹${product.price} • ${product.weight}
        </div>

        <div class="cart-item-total">
          ₹${itemTotal}
        </div>

      </div>


      <div class="cart-quantity">

        <button
          type="button"
          onclick="removeFromCart(${product.id})"
        >
          −
        </button>

        <span>
          ${quantity}
        </span>

        <button
          type="button"
          onclick="addToCart(${product.id})"
        >
          +
        </button>

      </div>

    `;


    container.appendChild(item);

  });


  const subtotal =
    getCartSubtotal();


  const subtotalElement =
    document.getElementById(
      "cartSubtotal"
    );

  if (subtotalElement) {

    subtotalElement.textContent =
      `₹${subtotal}`;

  }


  const totalElement =
    document.getElementById(
      "cartTotal"
    );

  if (totalElement) {

    totalElement.textContent =
      `₹${subtotal}`;

  }


  const deliveryElement =
    document.getElementById(
      "cartDelivery"
    );

  if (deliveryElement) {

    deliveryElement.textContent =
      subtotal >= 500
        ? "FREE"
        : "Calculated at checkout";

  }

}


/* ================= SEARCH ================= */

function searchProducts(value) {

  currentSearch =
    value || "";


  const clearButton =
    document.getElementById(
      "clearSearch"
    );

  if (clearButton) {

    clearButton.classList.toggle(
      "show",
      currentSearch.trim() !== ""
    );

  }


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

    renderMainProducts();

  }


  updateCartUI();

}


/* ================= CLEAR SEARCH ================= */

function clearSearch() {

  currentSearch =
    "";


  const input =
    document.getElementById(
      "searchInput"
    );

  if (input) {
    input.value = "";
  }


  const clearButton =
    document.getElementById(
      "clearSearch"
    );

  if (clearButton) {
    clearButton.classList.remove("show");
  }


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

    renderMainProducts();

  }


  updateCartUI();

}


/* ================= RESET ================= */

function resetProducts() {

  currentCategory =
    "all";

  currentSearch =
    "";


  const input =
    document.getElementById(
      "searchInput"
    );

  if (input) {
    input.value = "";
  }


  const clearButton =
    document.getElementById(
      "clearSearch"
    );

  if (clearButton) {
    clearButton.classList.remove("show");
  }


  document
    .querySelectorAll(".category-card")
    .forEach(card => {

      card.classList.toggle(
        "active",
        card.dataset.category === "all"
      );

    });


  const categoryPage =
    document.getElementById(
      "categoryPage"
    );


  if (
    categoryPage &&
    categoryPage.classList.contains("show")
  ) {

    closeCategoryPage();

  } else {

    renderProducts();

  }

}


/* ================= SCROLL ================= */

function scrollToProducts() {

  const section =
    document.getElementById(
      "productsSection"
    );

  if (section) {

    section.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }

}


/* ================= CHECKOUT ================= */

function checkout() {

  const itemCount =
    getCartItemCount();


  if (itemCount === 0) {

    alert(
      "Your cart is empty. Please add products first."
    );

    return;

  }


  /*
    Checkout integration will be connected later.

    For now we only confirm that the cart
    contains products.
  */

  alert(
    "Checkout is ready. Online order/payment integration will be connected next."
  );

}


/* ================= INITIALIZE ================= */

function initializeStore() {

  loadCart();

  renderProducts();

}


/* ================= DOM READY ================= */

document.addEventListener(
  "DOMContentLoaded",
  initializeStore
);


/* ================= ESCAPE KEY ================= */

document.addEventListener(
  "keydown",
  event => {

    if (event.key !== "Escape") {
      return;
    }


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
);
