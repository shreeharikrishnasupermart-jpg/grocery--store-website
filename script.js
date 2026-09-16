/* =====================================================
   SHREE HARIKRISHNA SUPERMART
   MAIN WEBSITE SCRIPT
===================================================== */


/* =====================================================
   DELIVERY CONFIGURATION
   Future distance/API integration માટે તૈયાર
===================================================== */

const DELIVERY_CONFIG = {
  radiusKm: 3,
  freeDeliveryAbove: 500,

  shopMapsUrl:
    "https://maps.app.goo.gl/cnSDqA9XqGoD3yGy8",

  chargeRules: []
};


/* =====================================================
   CART STORAGE
===================================================== */

const CART_KEY = "shreeHarikrishnaCart";

let cart = loadCart();

let currentCategory = "all";


function loadCart() {

  try {

    const saved =
      JSON.parse(
        localStorage.getItem(CART_KEY)
      );

    if (!Array.isArray(saved)) {
      return [];
    }

    return saved
      .filter(item =>
        item &&
        Number.isFinite(Number(item.id)) &&
        Number.isFinite(Number(item.quantity)) &&
        Number(item.quantity) > 0
      )
      .map(item => ({
        id: Number(item.id),
        quantity: Math.floor(Number(item.quantity))
      }));

  } catch (error) {

    return [];

  }
}


function saveCart() {

  localStorage.setItem(
    CART_KEY,
    JSON.stringify(cart)
  );

}


/* =====================================================
   GENERAL HELPERS
===================================================== */

function formatPrice(price) {

  return "₹" +
    Number(price).toLocaleString("en-IN");

}


function getProduct(id) {

  return products.find(
    product =>
      Number(product.id) === Number(id)
  );

}


function getCartQuantity(id) {

  const item =
    cart.find(
      item =>
        Number(item.id) === Number(id)
    );

  return item
    ? item.quantity
    : 0;

}


function getCategoryName(category) {

  const names = {

    all: "All Products",

    grocery:
      "Grocery & Kitchen",

    dairy:
      "Dairy",

    bakery:
      "Bakery",

    snacks:
      "Snacks",

    beverages:
      "Beverages",

    household:
      "Household Essentials"

  };

  return names[category] || "Products";

}


/* =====================================================
   HOME NAVIGATION
===================================================== */

function goHome() {

  closeCategoryPage();

  currentCategory = "all";

  updateCategoryButtons();

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
    clearButton.style.display =
      "none";
  }

  const suggestions =
    document.getElementById(
      "searchSuggestions"
    );

  if (suggestions) {
    suggestions.innerHTML = "";
    suggestions.style.display =
      "none";
  }

  renderProducts();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


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


/* =====================================================
   CATEGORY BUTTONS
===================================================== */

function updateCategoryButtons() {

  document
    .querySelectorAll(".category-card")
    .forEach(card => {

      card.classList.toggle(
        "active",
        card.dataset.category ===
          currentCategory
      );

    });

}


/*
   IMPORTANT:
   Category click હવે direct full-screen
   category page ખોલશે.
*/

function filterCategory(category) {

  currentCategory = category;

  updateCategoryButtons();

  openCategoryPage(category);

}


/* =====================================================
   PRODUCT FILTERING
===================================================== */

function getSearchTerm() {

  const input =
    document.getElementById(
      "searchInput"
    );

  return input
    ? input.value
        .trim()
        .toLowerCase()
    : "";

}


function getFilteredProducts() {

  const searchTerm =
    getSearchTerm();

  return products.filter(product => {

    const categoryMatch =
      currentCategory === "all" ||
      product.category ===
        currentCategory;

    const name =
      String(product.name || "")
        .toLowerCase();

    const brand =
      String(product.brand || "")
        .toLowerCase();

    const searchMatch =
      !searchTerm ||
      name.includes(searchTerm) ||
      brand.includes(searchTerm);

    return (
      categoryMatch &&
      searchMatch
    );

  });

}


/* =====================================================
   PRODUCT CARD
===================================================== */

function createProductCard(product) {

  const quantity =
    getCartQuantity(product.id);

  const mrp =
    Number(product.mrp) || 0;

  const price =
    Number(product.price) || 0;

  const stock =
    Number(product.stock) || 0;

  const calculatedDiscount =
    mrp > price
      ? Math.round(
          ((mrp - price) / mrp) * 100
        )
      : 0;

  const discount =
    Number(product.discount) ||
    calculatedDiscount;

  let imageHTML = "";

  if (product.image) {

    imageHTML = `
      <img
        src="${product.image}"
        alt="${product.name}"
        loading="lazy"
      >
    `;

  } else {

    imageHTML = `
      <span class="product-emoji">
        🛒
      </span>
    `;

  }


  let actionHTML = "";


  /* OUT OF STOCK */

  if (stock <= 0) {

    actionHTML = `
      <button
        class="add-button disabled"
        type="button"
        disabled
      >
        OUT OF STOCK
      </button>
    `;

  }


  /* ALREADY IN CART */

  else if (quantity > 0) {

    actionHTML = `
      <div class="quantity-control">

        <button
          type="button"
          aria-label="Decrease quantity"
          onclick="changeQuantity(${product.id}, -1)"
        >
          −
        </button>

        <span>
          ${quantity}
        </span>

        <button
          type="button"
          aria-label="Increase quantity"
          onclick="changeQuantity(${product.id}, 1)"
        >
          +
        </button>

      </div>
    `;

  }


  /* ADD */

  else {

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
    <article class="product-card">

      <div class="product-image">

        ${imageHTML}

        ${
          discount > 0
            ? `
              <span class="discount-badge">
                ${discount}% OFF
              </span>
            `
            : ""
        }

      </div>


      <div class="product-info">

        <span class="product-brand">
          ${product.brand || ""}
        </span>


        <h3 class="product-name">
          ${product.name}
        </h3>


        <span class="product-unit">
          ${product.unit || ""}
        </span>


        <div class="product-bottom">

          <div class="price-box">

            <strong class="product-price">
              ${formatPrice(price)}
            </strong>

            ${
              mrp > price
                ? `
                  <del>
                    ${formatPrice(mrp)}
                  </del>
                `
                : ""
            }

          </div>


          ${actionHTML}

        </div>

      </div>

    </article>
  `;

}


/* =====================================================
   HOME PRODUCT RENDER
===================================================== */

function renderProducts() {

  const grid =
    document.getElementById(
      "productsGrid"
    );

  if (!grid) {
    return;
  }

  const noProducts =
    document.getElementById(
      "noProducts"
    );

  const count =
    document.getElementById(
      "productCount"
    );

  const title =
    document.getElementById(
      "productsTitle"
    );


  const filtered =
    getFilteredProducts();


  grid.innerHTML =
    filtered
      .map(createProductCard)
      .join("");


  if (count) {

    count.textContent =
      `${filtered.length} ${
        filtered.length === 1
          ? "product"
          : "products"
      }`;

  }


  if (title) {

    title.textContent =
      currentCategory === "all"
        ? "Popular Products"
        : getCategoryName(
            currentCategory
          );

  }


  if (noProducts) {

    noProducts.hidden =
      filtered.length !== 0;

  }


  updateCartUI();

}


/* =====================================================
   FULL CATEGORY PAGE
===================================================== */

function openCategoryPage(category) {

  currentCategory = category;

  updateCategoryButtons();


  const page =
    document.getElementById(
      "categoryPage"
    );

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


  if (!page || !grid) {
    return;
  }


  const filtered =
    products.filter(product =>
      category === "all" ||
      product.category === category
    );


  if (title) {

    title.textContent =
      getCategoryName(category);

  }


  if (count) {

    count.textContent =
      `${filtered.length} ${
        filtered.length === 1
          ? "product"
          : "products"
      }`;

  }


  grid.innerHTML =
    filtered
      .map(createProductCard)
      .join("");


  page.classList.add("open");

  page.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.classList.add(
    "category-open"
  );


  updateCartUI();

}


function closeCategoryPage() {

  const page =
    document.getElementById(
      "categoryPage"
    );

  if (!page) {
    return;
 
