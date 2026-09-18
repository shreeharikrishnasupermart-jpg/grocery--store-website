/* =====================================================
   SHREE HARIKRISHNA SUPERMART
   COMPLETE WEBSITE SCRIPT
===================================================== */


/* ================= BASIC SETTINGS ================= */

const CART_KEY = "shreeHarikrishnaCart";

let cart = [];
let currentCategory = "all";
let currentDetailProductId = null;

/* ================= LOAD CART ================= */

try {
  const savedCart = localStorage.getItem(CART_KEY);

  cart = savedCart
    ? JSON.parse(savedCart)
    : [];

  if (!Array.isArray(cart)) {
    cart = [];
  }
} catch (error) {
  cart = [];
}


/* ================= HELPER FUNCTIONS ================= */

function saveCart() {
  localStorage.setItem(
    CART_KEY,
    JSON.stringify(cart)
  );
}


function formatPrice(price) {
  return "₹" + Number(price).toLocaleString("en-IN");
}


function getProduct(id) {
  return products.find(
    product => Number(product.id) === Number(id)
  );
}


function getCartQuantity(id) {
  const item = cart.find(
    item => Number(item.id) === Number(id)
  );

  return item ? Number(item.quantity) : 0;
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


/* ================= HOME ================= */

function goHome() {
  closeCategoryPage();

  currentCategory = "all";

  updateCategoryButtons();

  const input = document.getElementById("searchInput");

  if (input) {
    input.value = "";
  }

  const suggestions =
    document.getElementById("searchSuggestions");

  if (suggestions) {
    suggestions.innerHTML = "";
    suggestions.style.display = "none";
  }

  renderProducts();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


function scrollToProducts() {
  const section =
    document.getElementById("productsSection");

  if (section) {
    section.scrollIntoView({
      behavior: "smooth"
    });
  }
}


/* ================= CATEGORY BUTTONS ================= */

function updateCategoryButtons() {
  document
    .querySelectorAll(".category-card")
    .forEach(card => {
      card.classList.toggle(
        "active",
        card.dataset.category === currentCategory
      );
    });
}


function filterCategory(category) {
  currentCategory = category;

  updateCategoryButtons();

  openCategoryPage(category);
}


/* ================= SEARCH FILTER ================= */

function getSearchTerm() {
  const input =
    document.getElementById("searchInput");

  return input
    ? input.value.trim().toLowerCase()
    : "";
}


function getFilteredProducts() {
  const searchTerm = getSearchTerm();

  return products.filter(product => {
    const categoryMatch =
      currentCategory === "all" ||
      product.category === currentCategory;

    const name =
      String(product.name || "").toLowerCase();

    const brand =
      String(product.brand || "").toLowerCase();

    const searchMatch =
      !searchTerm ||
      name.includes(searchTerm) ||
      brand.includes(searchTerm);

    return categoryMatch && searchMatch;
  });
}


/* ================= PRODUCT IMAGE ================= */

function getProductImage(product) {
  if (product.image && product.image.trim() !== "") {
    return `
      <img
        src="${product.image}"
        alt="${product.name}"
        loading="lazy"
      >
    `;
  }

  return `
    <span class="product-emoji">🛒</span>
  `;
}


/* ================= PRODUCT CARD ================= */

function createProductCard(product) {
  const quantity = getCartQuantity(product.id);

  const price = Number(product.price) || 0;
  const mrp = Number(product.mrp) || 0;
  const stock = Number(product.stock) || 0;

  let discount = Number(product.discount) || 0;

  if (!discount && mrp > price) {
    discount = Math.round(
      ((mrp - price) / mrp) * 100
    );
  }

  let actionHTML = "";

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
  } else if (quantity > 0) {
    actionHTML = `
      <div class="quantity-control">

        <button
          type="button"
          onclick="event.stopPropagation(); changeQuantity(${product.id}, 1)"
        >
          −
        </button>

        <span>${quantity}</span>

        <button
          type="button"
          onclick="event.stopPropagation(); changeQuantity(${product.id}, -1)"
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
        onclick="event.stopPropagation(); addToCart(${product.id})"
      >
        ADD
      </button>
    `;
  }

  return `
    <article
      class="product-card"
      onclick="openProductDetail(${product.id})"
    >
      <div class="product-image">

        ${getProductImage(product)}

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


/* ================= HOME PRODUCTS ================= */

function renderProducts() {
  const grid =
    document.getElementById("productsGrid");

  if (!grid) {
    return;
  }

  const filteredProducts =
    getFilteredProducts();

  grid.innerHTML =
    filteredProducts
      .map(createProductCard)
      .join("");


  const count =
    document.getElementById("productCount");

  if (count) {
    count.textContent =
      `${filteredProducts.length} ${
        filteredProducts.length === 1
          ? "product"
          : "products"
      }`;
  }


  const title =
    document.getElementById("productsTitle");

  if (title) {
    title.textContent =
      currentCategory === "all"
        ? "Popular Products"
        : getCategoryName(currentCategory);
  }


  const noProducts =
    document.getElementById("noProducts");

  if (noProducts) {
    noProducts.hidden =
      filteredProducts.length !== 0;
  }

  updateCartUI();
}

/* ================= PRODUCT DETAIL ================= */

function openProductDetail(id) {
  const product = getProduct(id);

  if (!product) {
    return;
  }

  currentDetailProductId = Number(id);

  const page = document.getElementById("productDetailPage");

  if (!page) {
    return;
  }

  const price = Number(product.price) || 0;
  const mrp = Number(product.mrp) || 0;
  const stock = Number(product.stock) || 0;

  let discount = Number(product.discount) || 0;

  if (!discount && mrp > price) {
    discount = Math.round(
      ((mrp - price) / mrp) * 100
    );
  }

  const detailBrand =
    document.getElementById("detailBrand");

  const detailName =
    document.getElementById("detailName");

  const detailUnit =
    document.getElementById("detailUnit");

  const detailPrice =
    document.getElementById("detailPrice");

  const detailMrp =
    document.getElementById("detailMrp");

  const detailDiscount =
    document.getElementById("detailDiscount");

  const detailDiscountText =
    document.getElementById("detailDiscountText");

  const detailImage =
    document.getElementById("detailImage");

  const detailDescription =
    document.getElementById("detailDescription");

  const quantityControl =
    document.getElementById("detailQuantityControl");

  const quantity =
    document.getElementById("detailQuantity");

  const addButton =
    document.getElementById("detailAddButton");

  if (detailBrand) {
    detailBrand.textContent =
      product.brand || "";
  }

  if (detailName) {
    detailName.textContent =
      product.name || "";
  }

  if (detailUnit) {
    detailUnit.textContent =
      product.unit || "";
  }

  if (detailPrice) {
    detailPrice.textContent =
      formatPrice(price);
  }

  if (detailMrp) {
    if (mrp > price) {
      detailMrp.textContent =
        formatPrice(mrp);
      detailMrp.style.display = "inline";
    } else {
      detailMrp.style.display = "none";
    }
  }

  if (detailDiscount) {
    detailDiscount.innerHTML =
      discount > 0
        ? `<span class="discount-badge">${discount}% OFF</span>`
        : "";
  }

  if (detailDiscountText) {
    detailDiscountText.textContent =
      discount > 0
        ? `${discount}% OFF`
        : "";
  }

  if (detailImage) {
    detailImage.innerHTML =
      getProductImage(product);
  }

  if (detailDescription) {
    detailDescription.textContent =
      product.description ||
      `${product.name} available at Shree Harikrishna Supermart.`;
  }

  const cartQuantity =
    getCartQuantity(product.id);

  if (quantity) {
    quantity.textContent =
      cartQuantity;
  }

  if (stock <= 0) {
    if (quantityControl) {
      quantityControl.style.display = "none";
    }

    if (addButton) {
      addButton.style.display = "block";
      addButton.disabled = true;
      addButton.textContent = "OUT OF STOCK";
    }
  } else if (cartQuantity > 0) {
    if (quantityControl) {
      quantityControl.style.display = "flex";
    }

    if (addButton) {
      addButton.style.display = "none";
    }
  } else {
    if (quantityControl) {
      quantityControl.style.display = "none";
    }

    if (addButton) {
      addButton.style.display = "block";
      addButton.disabled = false;
      addButton.textContent = "ADD TO CART";
    }
  }

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


function closeProductDetail() {
  const page =
    document.getElementById("productDetailPage");

  if (!page) {
    return;
  }

  page.classList.remove("open");

  page.setAttribute(
    "aria-hidden",
    "true"
  );

  currentDetailProductId = null;

  const categoryPage =
    document.getElementById("categoryPage");

  if (
    categoryPage &&
    categoryPage.classList.contains("open")
  ) {
    document.body.classList.add(
      "category-open"
    );
  } else {
    document.body.classList.remove(
      "category-open"
    );
  }
}


function updateDetailCartCount() {
  const count =
    document.getElementById("detailCartCount");

  if (count) {
    count.textContent =
      getCartItemCount();
  }
}


function addDetailProductToCart() {
  if (!currentDetailProductId) {
    return;
  }

  addToCart(
    currentDetailProductId
  );

  openProductDetail(
    currentDetailProductId
  );
}


function changeDetailQuantity(change) {
  if (!currentDetailProductId) {
    return;
  }

  const product =
    getProduct(currentDetailProductId);

  if (!product) {
    return;
  }

  const currentQuantity =
    getCartQuantity(
      currentDetailProductId
    );

  if (
    change > 0 &&
    currentQuantity === 0
  ) {
    addToCart(
      currentDetailProductId
    );
  } else if (
    change > 0
  ) {
    changeQuantity(
      currentDetailProductId,
      1
    );
  } else if (
    change < 0 &&
    currentQuantity > 0
  ) {
    changeQuantity(
      currentDetailProductId,
      -1
    );
  }

  openProductDetail(
    currentDetailProductId
  );
}
/* ================= FULL CATEGORY PAGE ================= */

function openCategoryPage(category) {
  currentCategory = category;

  updateCategoryButtons();

  const page =
    document.getElementById("categoryPage");

  const grid =
    document.getElementById("categoryProductsGrid");

  const title =
    document.getElementById("categoryPageTitle");

  const count =
    document.getElementById("categoryPageCount");

  if (!page || !grid) {
    return;
  }

  const categoryProducts =
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
      `${categoryProducts.length} ${
        categoryProducts.length === 1
          ? "product"
          : "products"
      }`;
  }

  grid.innerHTML =
    categoryProducts
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
    document.getElementById("categoryPage");

  if (!page) {
    return;
  }

  page.classList.remove("open");

  page.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.classList.remove(
    "category-open"
  );
}


function renderCategoryProducts() {
  const page =
    document.getElementById("categoryPage");

  const grid =
    document.getElementById("categoryProductsGrid");

  if (!page || !grid) {
    return;
  }

  if (!page.classList.contains("open")) {
    return;
  }

  const categoryProducts =
    products.filter(product =>
      currentCategory === "all" ||
      product.category === currentCategory
    );

  grid.innerHTML =
    categoryProducts
      .map(createProductCard)
      .join("");
}


/* ================= ADD TO CART ================= */

function addToCart(id) {
  const product = getProduct(id);

  if (!product) {
    return;
  }

  const stock = Number(product.stock) || 0;

  if (stock <= 0) {
    return;
  }

  const existingItem =
    cart.find(
      item => Number(item.id) === Number(id)
    );

  if (existingItem) {
    if (existingItem.quantity < stock) {
      existingItem.quantity++;
    }
  } else {
    cart.push({
      id: Number(id),
      quantity: 1
    });
  }

  saveCart();

  refreshWebsite();
}


/* ================= CHANGE QUANTITY ================= */

function changeQuantity(id, change) {
  const product = getProduct(id);

  if (!product) {
    return;
  }

  const item =
    cart.find(
      item => Number(item.id) === Number(id)
    );

  if (!item) {
    return;
  }

  const stock = Number(product.stock) || 0;

  item.quantity += Number(change);

  if (stock > 0 && item.quantity > stock) {
    item.quantity = stock;
  }

  if (item.quantity <= 0) {
    cart = cart.filter(
      item => Number(item.id) !== Number(id)
    );
  }

  saveCart();

  refreshWebsite();

  renderCart();
}


/* ================= REMOVE FROM CART ================= */

function removeFromCart(id) {
  cart = cart.filter(
    item => Number(item.id) !== Number(id)
  );

  saveCart();

  refreshWebsite();

  renderCart();
}


/* ================= CART CALCULATIONS ================= */

function getCartItems() {
  return cart
    .map(item => {
      const product = getProduct(item.id);

      if (!product) {
        return null;
      }

      return {
        ...product,
        quantity: Number(item.quantity)
      };
    })
    .filter(Boolean);
}


function getCartTotal() {
  return getCartItems().reduce(
    (total, item) =>
      total +
      Number(item.price) * Number(item.quantity),
    0
  );
}


function getCartItemCount() {
  return cart.reduce(
    (total, item) =>
      total + Number(item.quantity),
    0
  );
}


/* ================= CART UI ================= */

function updateCartUI() {
  const itemCount = getCartItemCount();
  const total = getCartTotal();

  const headerCount =
    document.getElementById("headerCartCount");

  const categoryCount =
    document.getElementById("categoryCartCount");

  const bottomCart =
    document.getElementById("bottomCart");

  const bottomItems =
    document.getElementById("bottomCartItems");

  const bottomTotal =
    document.getElementById("bottomCartTotal");

  if (headerCount) {
    headerCount.textContent = itemCount;
  }

  if (categoryCount) {
    categoryCount.textContent = itemCount;
  }

  if (bottomItems) {
    bottomItems.textContent =
      `${itemCount} ${
        itemCount === 1 ? "item" : "items"
      }`;
  }

  if (bottomTotal) {
    bottomTotal.textContent =
      formatPrice(total);
  }

  if (bottomCart) {
    bottomCart.hidden = itemCount === 0;
  }
}


/* ================= RENDER CART ================= */

function renderCart() {
  const cartItems =
    document.getElementById("cartItems");

  const emptyCart =
    document.getElementById("emptyCart");

  const summary =
    document.getElementById("cartSummary");

  const subtotal =
    document.getElementById("cartSubtotal");

  const total =
    document.getElementById("cartTotal");

  if (!cartItems) {
    return;
  }

  const items = getCartItems();

  if (items.length === 0) {
    cartItems.innerHTML = "";

    if (emptyCart) {
      emptyCart.style.display = "block";
    }

    if (summary) {
      summary.style.display = "none";
    }

    return;
  }

  if (emptyCart) {
    emptyCart.style.display = "none";
  }

  if (summary) {
    summary.style.display = "block";
  }

  cartItems.innerHTML =
    items.map(item => {
      const image = item.image
        ? `
          <img
            src="${item.image}"
            alt="${item.name}"
          >
        `
        : `
          <span>🛒</span>
        `;

      return `
        <div class="cart-item">

          <div class="cart-item-image">
            ${image}
          </div>

          <div class="cart-item-details">

            <strong>${item.name}</strong>

            <span>${item.unit || ""}</span>

            <b>${formatPrice(item.price)}</b>

            <div class="cart-quantity">

              <button
                type="button"
                onclick="changeQuantity(${item.id}, -1)"
              >
                −
              </button>

              <span>${item.quantity}</span>

              <button
                type="button"
                onclick="changeQuantity(${item.id}, 1)"
              >
                +
              </button>

            </div>

          </div>

          <button
            class="remove-cart-item"
            type="button"
            onclick="removeFromCart(${item.id})"
          >
            ×
          </button>

        </div>
      `;
    }).join("");


  const amount = getCartTotal();

  if (subtotal) {
    subtotal.textContent =
      formatPrice(amount);
  }

  if (total) {
    total.textContent =
      formatPrice(amount);
  }
}


/* ================= OPEN CART ================= */

function openCart() {
  const overlay =
    document.getElementById("cartOverlay");

  if (!overlay) {
    return;
  }

  renderCart();

  overlay.classList.add("open");

  overlay.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.classList.add(
    "cart-open"
  );
}


/* ================= CLOSE CART ================= */

function closeCart() {
  const overlay =
    document.getElementById("cartOverlay");

  if (!overlay) {
    return;
  }

  overlay.classList.remove("open");

  overlay.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.classList.remove(
    "cart-open"
  );
}


function closeCartOutside(event) {
  if (
    event.target &&
    event.target.id === "cartOverlay"
  ) {
    closeCart();
  }
}


/* ================= SEARCH ================= */

function setupSearch() {
  const input =
    document.getElementById("searchInput");

  const clearButton =
    document.getElementById("clearSearch");

  const suggestions =
    document.getElementById("searchSuggestions");

  if (!input) {
    return;
  }

  input.addEventListener("input", () => {
    currentCategory = "all";

    updateCategoryButtons();

    renderProducts();

    if (clearButton) {
      clearButton.style.display =
        input.value ? "block" : "none";
    }

    if (!suggestions) {
      return;
    }

    const term =
      input.value.trim().toLowerCase();

    if (!term) {
      suggestions.innerHTML = "";
      suggestions.style.display = "none";
      return;
    }

    const matches =
      products
        .filter(product => {
          const name =
            String(product.name || "")
              .toLowerCase();

          const brand =
            String(product.brand || "")
              .toLowerCase();

          return (
            name.includes(term) ||
            brand.includes(term)
          );
        })
        .slice(0, 5);

    if (matches.length === 0) {
      suggestions.innerHTML = "";
      suggestions.style.display = "none";
      return;
    }

    suggestions.innerHTML =
      matches.map(product => `
        <button
          type="button"
          onclick="selectSuggestion(${product.id})"
        >
          ${product.name}
        </button>
      `).join("");

    suggestions.style.display = "block";
  });


  input.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      closeCategoryPage();

      const suggestionsBox =
        document.getElementById(
          "searchSuggestions"
        );

      if (suggestionsBox) {
        suggestionsBox.style.display = "none";
      }

      scrollToProducts();
    }
  });
}


function selectSuggestion(id) {
  const product = getProduct(id);

  if (!product) {
    return;
  }

  const input =
    document.getElementById("searchInput");

  const suggestions =
    document.getElementById("searchSuggestions");

  if (input) {
    input.value = product.name;
  }

  if (suggestions) {
    suggestions.style.display = "none";
  }

  currentCategory = "all";

  updateCategoryButtons();

  closeCategoryPage();

  renderProducts();

  scrollToProducts();
}


function clearSearch() {
  const input =
    document.getElementById("searchInput");

  const clearButton =
    document.getElementById("clearSearch");

  const suggestions =
    document.getElementById("searchSuggestions");

  if (input) {
    input.value = "";
  }

  if (clearButton) {
    clearButton.style.display = "none";
  }

  if (suggestions) {
    suggestions.innerHTML = "";
    suggestions.style.display = "none";
  }

  currentCategory = "all";

  updateCategoryButtons();

  renderProducts();
}


/* ================= RESET ================= */

function resetProducts() {
  clearSearch();

  closeCategoryPage();

  currentCategory = "all";

  updateCategoryButtons();

  renderProducts();
}


/* ================= FUTURE DELIVERY SYSTEM ================= */

const DELIVERY_CONFIG = {
  radiusKm: 3,
  freeDeliveryAbove: 500,
  shopMapsUrl:
    "https://maps.app.goo.gl/cnSDqA9XqGoD3yGy8"
};


function getDeliveryQuote(subtotal, distanceKm) {
  const amount = Number(subtotal) || 0;
  const distance = Number(distanceKm);

  if (!Number.isFinite(distance)) {
    return {
      available: null,
      charge: null,
      message:
        "Delivery charge will be calculated at checkout."
    };
  }

  if (distance > DELIVERY_CONFIG.radiusKm) {
    return {
      available: false,
      charge: null,
      message:
        "Delivery is available within 3 km."
    };
  }

  if (
    amount >= DELIVERY_CONFIG.freeDeliveryAbove
  ) {
    return {
      available: true,
      charge: 0,
      message: "FREE delivery"
    };
  }

  return {
    available: true,
    charge: null,
    message:
      "Delivery charge will be calculated from distance."
  };
}


/* ================= REFRESH WEBSITE ================= */

function refreshWebsite() {
  renderProducts();
  renderCategoryProducts();
  updateCartUI();
}


/* ================= CHECKOUT ================= */

function checkout() {
  if (getCartItemCount() === 0) {
    return;
  }

  alert(
    "Checkout and delivery calculation will be connected next."
  );
}


/* ================= ESC KEY ================= */

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeCart();
    closeCategoryPage();
  }
});


/* ================= START ================= */

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderCart();
  updateCartUI();
  setupSearch();
  updateCategoryButtons();
});
