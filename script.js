/* =========================================
   SHREE HARIKRISHNA SUPERMART
   Product Database + Cart System
   ========================================= */

let cart = JSON.parse(localStorage.getItem("shreeHarikrishnaCart")) || [];
let currentCategory = "all";

/* ---------- Helpers ---------- */

function saveCart() {
  localStorage.setItem(
    "shreeHarikrishnaCart",
    JSON.stringify(cart)
  );
}

function formatPrice(price) {
  return "₹" + Number(price).toLocaleString("en-IN");
}

function getProduct(id) {
  return products.find(product => product.id === id);
}

function getCartQuantity(id) {
  const item = cart.find(item => item.id === id);
  return item ? item.quantity : 0;
}

/* ---------- Home ---------- */

function goHome() {
  closeCategoryPage();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function scrollToProducts() {
  const section = document.getElementById("productsSection");

  if (section) {
    section.scrollIntoView({
      behavior: "smooth"
    });
  }
}

/* ---------- Product Filtering ---------- */

function getFilteredProducts() {
  const searchInput = document.getElementById("searchInput");

  const searchTerm = searchInput
    ? searchInput.value.trim().toLowerCase()
    : "";

  return products.filter(product => {

    const categoryMatch =
      currentCategory === "all" ||
      product.category === currentCategory;

    const searchMatch =
      !searchTerm ||
      product.name.toLowerCase().includes(searchTerm) ||
      (product.brand || "").toLowerCase().includes(searchTerm);

    return categoryMatch && searchMatch;
  });
}

/* ---------- Product Card ---------- */

function createProductCard(product) {

  const quantity = getCartQuantity(product.id);

  const discount =
    product.discount ||
    (product.mrp > product.price
      ? Math.round(
          ((product.mrp - product.price) / product.mrp) * 100
        )
      : 0);

  const imageHTML = product.image
    ? `<img src="${product.image}" alt="${product.name}" loading="lazy">`
    : `<div class="product-placeholder">🛒</div>`;

  const outOfStock = Number(product.stock) <= 0;

  return `
    <article class="product-card">

      <div class="product-image">
        ${imageHTML}

        ${
          discount > 0
            ? `<span class="discount-badge">${discount}% OFF</span>`
            : ""
        }
      </div>

      <div class="product-info">

        <span class="product-brand">
          ${product.brand || ""}
        </span>

        <h3>${product.name}</h3>

        <span class="product-unit">
          ${product.unit || ""}
        </span>

        <div class="price-row">

          <div class="price-box">
            <strong>${formatPrice(product.price)}</strong>

            ${
              product.mrp > product.price
                ? `<del>${formatPrice(product.mrp)}</del>`
                : ""
            }
          </div>

        </div>

        ${
          outOfStock
            ? `
              <button class="add-button disabled" disabled>
                OUT OF STOCK
              </button>
            `
            : quantity > 0
              ? `
                <div class="quantity-control">

                  <button
                    type="button"
                    onclick="changeQuantity(${product.id}, -1)"
                  >
                    −
                  </button>

                  <span>${quantity}</span>

                  <button
                    type="button"
                    onclick="changeQuantity(${product.id}, 1)"
                  >
                    +
                  </button>

                </div>
              `
              : `
                <button
                  class="add-button"
                  type="button"
                  onclick="addToCart(${product.id})"
                >
                  ADD
                </button>
              `
        }

      </div>

    </article>
  `;
}

/* ---------- Render Products ---------- */

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

  const filtered = getFilteredProducts();

  grid.innerHTML = filtered
    .map(createProductCard)
    .join("");

  if (count) {
    count.textContent =
      `${filtered.length} ${
        filtered.length === 1 ? "product" : "products"
      }`;
  }

  if (title) {

    if (currentCategory === "all") {
      title.textContent = "Popular Products";
    } else {

      const categoryNames = {
        grocery: "Grocery & Kitchen",
        dairy: "Dairy",
        bakery: "Bakery",
        snacks: "Snacks",
        beverages: "Beverages",
        household: "Household Essentials"
      };

      title.textContent =
        categoryNames[currentCategory] || "Products";
    }
  }

  if (noProducts) {
    noProducts.hidden = filtered.length !== 0;
  }

  updateCartUI();
}

/* ---------- Category ---------- */

function filterCategory(category) {

  currentCategory = category;

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

/* ---------- Full Category Page ---------- */

function openCategoryPage(category) {

  currentCategory = category;

  const page =
    document.getElementById("categoryPage");

  const grid =
    document.getElementById("categoryProductsGrid");

  const title =
    document.getElementById("categoryPageTitle");

  const count =
    document.getElementById("categoryPageCount");

  if (!page || !grid) return;

  const filtered =
    products.filter(
      product =>
        category === "all" ||
        product.category === category
    );

  const categoryNames = {
    all: "All Products",
    grocery: "Grocery & Kitchen",
    dairy: "Dairy",
    bakery: "Bakery",
    snacks: "Snacks",
    beverages: "Beverages",
    household: "Household Essentials"
  };

  if (title) {
    title.textContent =
      categoryNames[category] || "Products";
  }

  if (count) {
    count.textContent =
      `${filtered.length} products`;
  }

  grid.innerHTML =
    filtered.map(createProductCard).join("");

  page.classList.add("open");
  page.setAttribute("aria-hidden", "false");

  document.body.classList.add("category-open");

  updateCartUI();
}

function closeCategoryPage() {

  const page =
    document.getElementById("categoryPage");

  if (!page) return;

  page.classList.remove("open");

  page.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.classList.remove(
    "category-open"
  );
}

/* ---------- Cart ---------- */

function addToCart(id) {

  const product = getProduct(id);

  if (!product) return;

  if (Number(product.stock) <= 0) {
    return;
  }

  const existing =
    cart.find(item => item.id === id);

  if (existing) {

    if (
      existing.quantity <
      Number(product.stock)
    ) {
      existing.quantity++;
    }

  } else {

    cart.push({
      id: id,
      quantity: 1
    });

  }

  saveCart();

  renderProducts();

  renderCategoryProducts();

  updateCartUI();
}

function changeQuantity(id, change) {

  const product = getProduct(id);

  const item =
    cart.find(item => item.id === id);

  if (!product || !item) return;

  item.quantity += change;

  if (
    item.quantity >= Number(product.stock)
  ) {
    item.quantity =
      Number(product.stock);
  }

  if (item.quantity <= 0) {
    cart =
      cart.filter(item => item.id !== id);
  }

  saveCart();

  renderProducts();

  renderCategoryProducts();

  renderCart();

  updateCartUI();
}

function removeFromCart(id) {

  cart =
    cart.filter(item => item.id !== id);

  saveCart();

  renderCart();

  renderProducts();

  renderCategoryProducts();

  updateCartUI();
}

/* ---------- Cart Calculations ---------- */

function getCartItems() {

  return cart
    .map(item => {

      const product =
        getProduct(item.id);

      if (!product) return null;

      return {
        ...product,
        quantity: item.quantity
      };

    })
    .filter(Boolean);
}

function getCartTotal() {

  return getCartItems()
    .reduce(
      (total, item) =>
        total +
        Number(item.price) *
        item.quantity,
      0
    );
}

function getCartItemCount() {

  return cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );
}

/* ---------- Cart UI ---------- */

function updateCartUI() {

  const count =
    getCartItemCount();

  const total =
    getCartTotal();

  const headerCount =
    document.getElementById(
      "headerCartCount"
    );

  const categoryCount =
    document.getElementById(
      "categoryCartCount"
    );

  const bottomItems =
    document.getElementById(
      "bottomCartItems"
    );

  const bottomTotal =
    document.getElementById(
      "bottomCartTotal"
    );

  const bottomCart =
    document.getElementById(
      "bottomCart"
    );

  if (headerCount) {
    headerCount.textContent = count;
  }

  if (categoryCount) {
    categoryCount.textContent = count;
  }

  if (bottomItems) {
    bottomItems.textContent =
      `${count} ${
        count === 1 ? "item" : "items"
      }`;
  }

  if (bottomTotal) {
    bottomTotal.textContent =
      formatPrice(total);
  }

  if (bottomCart) {
    bottomCart.hidden =
      count === 0;
  }
}

/* ---------- Render Cart ---------- */

function renderCart() {

  const cartItems =
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

  const subtotal =
    document.getElementById(
      "cartSubtotal"
    );

  const total =
    document.getElementById(
      "cartTotal"
    );

  if (!cartItems) return;

  const items =
    getCartItems();

  if (items.length === 0) {

    cartItems.innerHTML = "";

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

  cartItems.innerHTML =
    items.map(item => {

      return `
        <div class="cart-item">

          <div class="cart-item-image">
            ${
              item.image
                ? `<img src="${item.image}" alt="${item.name}">`
                : "🛒"
            }
          </div>

          <div class="cart-item-details">

            <strong>${item.name}</strong>

            <span>
              ${item.unit || ""}
            </span>

            <b>
              ${formatPrice(item.price)}
            </b>

            <div class="cart-quantity">

              <button
                type="button"
                onclick="changeQuantity(${item.id}, -1)"
              >
                −
              </button>

              <span>
                ${item.quantity}
              </span>

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

  const amount =
    getCartTotal();

  if (subtotal) {
    subtotal.textContent =
      formatPrice(amount);
  }

  if (total) {
    total.textContent =
      formatPrice(amount);
  }
}

/* ---------- Open / Close Cart ---------- */

function openCart() {

  const overlay =
    document.getElementById(
      "cartOverlay"
    );

  if (!overlay) return;

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

function closeCart() {

  const overlay =
    document.getElementById(
      "cartOverlay"
    );

  if (!overlay) return;

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
    event.target.id ===
    "cartOverlay"
  ) {
    closeCart();
  }
}

/* ---------- Search ---------- */

function setupSearch() {

  const input =
    document.getElementById(
      "searchInput"
    );

  const clearButton =
    document.getElementById(
      "clearSearch"
    );

  const suggestions =
    document.getElementById(
      "searchSuggestions"
    );

  if (!input) return;

  input.addEventListener(
    "input",
    () => {

      renderProducts();

      if (clearButton) {
        clearButton.style.display =
          input.value
            ? "block"
            : "none";
      }

      if (!suggestions) return;

      const term =
        input.value
          .trim()
          .toLowerCase();

      if (!term) {
        suggestions.innerHTML = "";
        suggestions.style.display =
          "none";
        return;
      }

      const matches =
        products
          .filter(product =>
            product.name
              .toLowerCase()
              .includes(term)
          )
          .slice(0, 5);

      if (!matches.length) {
        suggestions.innerHTML = "";
        suggestions.style.display =
          "none";
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

      suggestions.style.display =
        "block";

    }
  );

  input.addEventListener(
    "keydown",
    event => {

      if (event.key === "Enter") {

        const section =
          document.getElementById(
            "productsSection"
          );

        if (section) {
          section.scrollIntoView({
            behavior: "smooth"
          });
        }

      }

    }
  );
}

function selectSuggestion(id) {

  const product =
    getProduct(id);

  const input =
    document.getElementById(
      "searchInput"
    );

  const suggestions =
    document.getElementById(
      "searchSuggestions"
    );

  if (!product) return;

  if (input) {
    input.value =
      product.name;
  }

  if (suggestions) {
    suggestions.style.display =
      "none";
  }

  currentCategory = "all";

  renderProducts();

  scrollToProducts();
}

function clearSearch() {

  const input =
    document.getElementById(
      "searchInput"
    );

  const clearButton =
    document.getElementById(
      "clearSearch"
    );

  const suggestions =
    document.getElementById(
      "searchSuggestions"
    );

  if (input) {
    input.value = "";
  }

  if (clearButton) {
    clearButton.style.display =
      "none";
  }

  if (suggestions) {
    suggestions.innerHTML = "";
    suggestions.style.display =
      "none";
  }

  currentCategory = "all";

  renderProducts();
}

/* ---------- Reset ---------- */

function resetProducts() {

  currentCategory = "all";

  clearSearch();

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

/* ---------- Category Product Refresh ---------- */

function renderCategoryProducts() {

  const grid =
    document.getElementById(
      "categoryProductsGrid"
    );

  if (!grid) return;

  if (
    !document
      .getElementById("categoryPage")
      ?.classList.contains("open")
  ) {
    return;
  }

  const filtered =
    products.filter(
      product =>
        currentCategory === "all" ||
        product.category === currentCategory
    );

  grid.innerHTML =
    filtered.map(createProductCard).join("");
}

/* ---------- Checkout ---------- */

function checkout() {

  if (cart.length === 0) {
    return;
  }

  alert(
    "Checkout system will be connected next."
  );
}

/* ---------- Start ---------- */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    renderProducts();

    renderCart();

    updateCartUI();

    setupSearch();

  }
);
