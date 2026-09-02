// ==========================================
// SHREE HARIKRUSHNA SUPERMART
// Stable Store JavaScript
// ==========================================

const products = [
  // GROCERY
  {
    id: 1,
    name: "Aashirvaad Atta",
    category: "Grocery & Kitchen",
    price: 299,
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

  // DAIRY
  {
    id: 5,
    name: "Amul Butter",
    category: "Dairy",
    price: 58,
    unit: "100 g",
    image: "🧈"
  },
  {
    id: 6,
    name: "Amul Cheese",
    category: "Dairy",
    price: 145,
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

  // BAKERY
  {
    id: 9,
    name: "Sandwich Bread",
    category: "Bakery",
    price: 40,
    unit: "400 g",
    image: "🍞"
  },
  {
    id: 10,
    name: "Premium Cookies",
    category: "Bakery",
    price: 60,
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
    price: 220,
    unit: "500 g",
    image: "🍰"
  },

  // SNACKS
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
    unit: "55 g",
    image: "🌽"
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

  // BEVERAGES
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

  // HOUSEHOLD
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
    price: 210,
    unit: "1 kg",
    image: "🧺"
  },
  {
    id: 23,
    name: "Harpic Toilet Cleaner",
    category: "Household Essentials",
    price: 105,
    unit: "500 ml",
    image: "🧴"
  },
  {
    id: 24,
    name: "Colin Glass Cleaner",
    category: "Household Essentials",
    price: 105,
    unit: "500 ml",
    image: "✨"
  }
];


// ==========================================
// VARIABLES
// ==========================================

let cart = {};
let currentCategory = "All Products";
let currentSearch = "";


// ==========================================
// SAFE LOCAL STORAGE
// ==========================================

function loadCart() {
  try {
    const saved = localStorage.getItem("supermartCart");

    if (saved) {
      cart = JSON.parse(saved) || {};
    } else {
      cart = {};
    }
  } catch (error) {
    cart = {};
  }
}


function saveCart() {
  try {
    localStorage.setItem("supermartCart", JSON.stringify(cart));
  } catch (error) {
    console.log("Cart could not be saved.");
  }
}


// ==========================================
// GET HTML ELEMENTS
// ==========================================

function getProductsGrid() {
  return document.getElementById("productsGrid");
}

function getSearchInput() {
  return document.getElementById("searchInput");
}

function getNoProductsMessage() {
  return document.getElementById("noProducts");
}


// ==========================================
// SEARCH SUGGESTION BOX
// ==========================================

function createSearchSuggestions() {

  const input = getSearchInput();

  if (!input) return null;

  let box = document.getElementById("searchSuggestions");

  if (!box) {

    box = document.createElement("div");

    box.id = "searchSuggestions";

    box.className = "search-suggestions";

    const parent = input.parentElement;

    if (parent) {
      parent.appendChild(box);
    }
  }

  return box;
}


// ==========================================
// PRODUCT FILTER
// ==========================================

function getFilteredProducts() {

  let result = products;

  // Category filter
  if (
    currentCategory &&
    currentCategory !== "All Products"
  ) {
    result = result.filter(
      product => product.category === currentCategory
    );
  }

  // Search filter
  if (currentSearch.trim() !== "") {

    const search = currentSearch
      .toLowerCase()
      .trim();

    result = result.filter(product => {

      return (
        product.name.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search)
      );

    });
  }

  return result;
}


// ==========================================
// RENDER PRODUCTS
// ==========================================

function renderProducts(list = null) {

  const grid = getProductsGrid();

  if (!grid) {
    console.log("productsGrid not found");
    return;
  }

  const productsToShow =
    list !== null
      ? list
      : getFilteredProducts();

  grid.innerHTML = "";

  const noProducts = getNoProductsMessage();

  if (noProducts) {
    noProducts.style.display =
      productsToShow.length === 0
        ? "block"
        : "none";
  }

  productsToShow.forEach(product => {

    const quantity = Number(cart[product.id] || 0);

    const card = document.createElement("div");

    card.className = "product-card";

    card.dataset.productId = product.id;

    card.innerHTML = `

      <div class="product-image">
        ${product.image}
      </div>

      <div class="product-info">

        <h3>${product.name}</h3>

        <p class="product-unit">
          ${product.unit}
        </p>

        <div class="product-bottom">

          <div class="product-price">
            ₹${product.price}
          </div>

          ${
            quantity > 0

              ? `

                <div class="quantity-control">

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

              `

              : `

                <button
                  type="button"
                  class="add-btn"
                  onclick="addToCart(${product.id})"
                >
                  ADD
                </button>

              `
          }

        </div>

      </div>

    `;

    grid.appendChild(card);

  });

  updateProductCount(productsToShow.length);
}


// ==========================================
// PRODUCT COUNT
// ==========================================

function updateProductCount(count) {

  const headings =
    document.querySelectorAll("h2");

  headings.forEach(heading => {

    if (
      heading.textContent
        .toLowerCase()
        .includes("popular products")
    ) {

      let countElement =
        heading.parentElement
          ?.querySelector(".product-count");

      if (!countElement) {

        countElement =
          document.createElement("span");

        countElement.className =
          "product-count";

        countElement.style.marginLeft = "8px";

        countElement.style.fontSize = "14px";

        countElement.style.fontWeight = "500";

        countElement.style.opacity = "0.65";

        heading.appendChild(countElement);
      }

      countElement.textContent =
        `(${count} products)`;
    }

  });
}


// ==========================================
// CATEGORY FILTER
// ==========================================

function filterCategory(category) {

  currentCategory = category;

  currentSearch = "";

  const input = getSearchInput();

  if (input) {
    input.value = "";
  }

  hideSuggestions();

  renderProducts();

  scrollToProducts();

}


// ==========================================
// RESET PRODUCTS
// ==========================================

function resetProducts() {

  currentCategory = "All Products";

  currentSearch = "";

  const input = getSearchInput();

  if (input) {
    input.value = "";
  }

  hideSuggestions();

  renderProducts();

}


// ==========================================
// SEARCH
// ==========================================

function searchProducts(value) {

  currentSearch = value;

  const results =
    getFilteredProducts();

  renderProducts(results);

  showSuggestions(results);
}


// ==========================================
// SHOW SEARCH SUGGESTIONS
// ==========================================

function showSuggestions(results) {

  const box =
    createSearchSuggestions();

  if (!box) return;

  box.innerHTML = "";

  const search =
    currentSearch.trim();

  if (search === "") {

    box.style.display = "none";

    return;
  }

  if (results.length === 0) {

    box.innerHTML = `
      <div class="suggestion-empty">
        No product found
      </div>
    `;

    box.style.display = "block";

    return;
  }


  results.slice(0, 8).forEach(product => {

    const item =
      document.createElement("div");

    item.className =
      "search-suggestion-item";

    item.innerHTML = `

      <span class="suggestion-image">
        ${product.image}
      </span>

      <span class="suggestion-info">

        <strong>
          ${product.name}
        </strong>

        <small>
          ${product.unit} · ₹${product.price}
        </small>

      </span>

    `;

    item.addEventListener(
      "click",
      function () {

        const input =
          getSearchInput();

        if (input) {
          input.value =
            product.name;
        }

        currentSearch =
          product.name;

        box.style.display =
          "none";

        // Show only exact product
        renderProducts([product]);

        // Scroll to exact product
        setTimeout(() => {

          const card =
            document.querySelector(
              `[data-product-id="${product.id}"]`
            );

          if (card) {

            card.scrollIntoView({
              behavior: "smooth",
              block: "center"
            });

            card.classList.add(
              "product-selected"
            );

            setTimeout(() => {

              card.classList.remove(
                "product-selected"
              );

            }, 1800);

          }

        }, 100);

      }
    );

    box.appendChild(item);

  });

  box.style.display =
    "block";
}


// ==========================================
// HIDE SUGGESTIONS
// ==========================================

function hideSuggestions() {

  const box =
    document.getElementById(
      "searchSuggestions"
    );

  if (box) {
    box.style.display = "none";
  }

}


// ==========================================
// CLEAR SEARCH
// ==========================================

function clearSearch() {

  currentSearch = "";

  currentCategory =
    "All Products";

  const input =
    getSearchInput();

  if (input) {
    input.value = "";
  }

  hideSuggestions();

  renderProducts();

}


// ==========================================
// CART - ADD
// ==========================================

function addToCart(productId) {

  const id = String(productId);

  cart[id] =
    Number(cart[id] || 0) + 1;

  saveCart();

  renderProducts();

  updateCartUI();

}


// ==========================================
// CART - REMOVE
// ==========================================

function removeFromCart(productId) {

  const id = String(productId);

  if (!cart[id]) return;

  cart[id] =
    Number(cart[id]) - 1;

  if (cart[id] <= 0) {
    delete cart[id];
  }

  saveCart();

  renderProducts();

  updateCartUI();

}


// ==========================================
// CART TOTAL ITEMS
// ==========================================

function getCartItemCount() {

  return Object.values(cart)
    .reduce(
      (total, quantity) =>
        total + Number(quantity),
      0
    );

}


// ==========================================
// CART SUBTOTAL
// ==========================================

function getCartSubtotal() {

  return Object.entries(cart)
    .reduce(
      (total, [id, quantity]) => {

        const product =
          products.find(
            p => p.id === Number(id)
          );

        if (!product) {
          return total;
        }

        return (
          total +
          product.price *
          Number(quantity)
        );

      },
      0
    );

}


// ==========================================
// UPDATE CART UI
// ==========================================

function updateCartUI() {

  const itemCount =
    getCartItemCount();

  const subtotal =
    getCartSubtotal();


  // Header cart count
  const headerCount =
    document.getElementById(
      "cartCount"
    );

  if (headerCount) {
    headerCount.textContent =
      itemCount;
  }


  // Bottom cart bar
  const bottomBar =
    document.getElementById(
      "bottomCartBar"
    );

  const bottomCount =
    document.getElementById(
      "bottomCartCount"
    );

  const bottomTotal =
    document.getElementById(
      "bottomCartTotal"
    );

  if (bottomCount) {
    bottomCount.textContent =
      itemCount;
  }

  if (bottomTotal) {
    bottomTotal.textContent =
      `₹${subtotal}`;
  }

  if (bottomBar) {

    bottomBar.style.display =
      itemCount > 0
        ? "flex"
        : "none";

  }

}


// ==========================================
// OPEN CART
// ==========================================

function openCart() {

  const modal =
    document.getElementById(
      "cartModal"
    );

  if (!modal) return;

  renderCart();

  modal.style.display =
    "flex";

  document.body.style.overflow =
    "hidden";

}


// ==========================================
// CLOSE CART
// ==========================================

function closeCart() {

  const modal =
    document.getElementById(
      "cartModal"
    );

  if (!modal) return;

  modal.style.display =
    "none";

  document.body.style.overflow =
    "";

}


// ==========================================
// CLOSE CART WHEN CLICKING OUTSIDE
// ==========================================

function closeCartOutside(event) {

  const modal =
    document.getElementById(
      "cartModal"
    );

  if (
    modal &&
    event.target === modal
  ) {
    closeCart();
  }

}


// ==========================================
// RENDER CART
// ==========================================

function renderCart() {

  const container =
    document.getElementById(
      "cartItems"
    );

  if (!container) return;

  container.innerHTML = "";

  const entries =
    Object.entries(cart);


  if (entries.length === 0) {

    container.innerHTML = `
      <div class="empty-cart">
        <div style="font-size:50px;">
          🛒
        </div>

        <h3>
          Your cart is empty
        </h3>

        <p>
          Add some products to continue.
        </p>
      </div>
    `;

  } else {

    entries.forEach(
      ([id, quantity]) => {

        const product =
          products.find(
            p => p.id === Number(id)
          );

        if (!product) return;

        const item =
          document.createElement("div");

        item.className =
          "cart-item";

        item.innerHTML = `

          <div class="cart-item-image">
            ${product.image}
          </div>

          <div class="cart-item-info">

            <h4>
              ${product.name}
            </h4>

            <p>
              ${product.unit}
            </p>

            <strong>
              ₹${product.price}
            </strong>

          </div>

          <div class="cart-item-controls">

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

        `;

        container.appendChild(item);

      }
    );

  }


  const subtotal =
    getCartSubtotal();

  const delivery =
    subtotal >= 500
      ? 0
      : subtotal > 0
        ? null
        : 0;

  const total =
    delivery === null
      ? subtotal
      : subtotal + delivery;


  const subtotalElement =
    document.getElementById(
      "cartSubtotal"
    );

  const deliveryElement =
    document.getElementById(
      "cartDelivery"
    );

  const totalElement =
    document.getElementById(
      "cartTotal"
    );


  if (subtotalElement) {

    subtotalElement.textContent =
      `₹${subtotal}`;

  }


  if (deliveryElement) {

    deliveryElement.textContent =
      delivery === 0
        ? "FREE"
        : "Calculated at checkout";

  }


  if (totalElement) {

    totalElement.textContent =
      delivery === null
        ? `₹${subtotal} + delivery`
        : `₹${total}`;

  }

}


// ==========================================
// CHECKOUT
// ==========================================

function checkout() {

  if (getCartItemCount() === 0) {

    alert(
      "Your cart is empty."
    );

    return;
  }

  alert(
    "Checkout system will be connected next."
  );

}


// ==========================================
// SCROLL TO PRODUCTS
// ==========================================

function scrollToProducts() {

  const grid =
    getProductsGrid();

  if (!grid) return;

  const section =
    grid.closest("section");

  if (section) {

    section.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  } else {

    grid.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }

}


// ==========================================
// INITIALIZE SEARCH
// ==========================================

function initializeSearch() {

  const input =
    getSearchInput();

  if (!input) {
    console.log(
      "Search input not found."
    );
    return;
  }

  createSearchSuggestions();


  input.addEventListener(
    "input",
    function () {

      searchProducts(
        input.value
      );

    }
  );


  input.addEventListener(
    "focus",
    function () {

      if (
        input.value.trim() !== ""
      ) {

        showSuggestions(
          getFilteredProducts()
        );

      }

    }
  );


  document.addEventListener(
    "click",
    function (event) {

      const box =
        document.getElementById(
          "searchSuggestions"
        );

      if (!box) return;

      if (
        event.target !== input &&
        !box.contains(event.target)
      ) {

        hideSuggestions();

      }

    }
  );

}


// ==========================================
// INITIALIZE WEBSITE
// ==========================================

function initializeStore() {

  
  loadCart();
  initializeSearch();
  renderProducts();
  updateCartUI();

  console.log("Shree Harikrishna Supermart loaded successfully.");
}


// Start website
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeStore);
} else {
  initializeStore();
}


// Fix category names
const originalFilterCategory = filterCategory;

function filterCategory(category) {

  const categoryMap = {
    all: "All Products",
    grocery: "Grocery & Kitchen",
    dairy: "Dairy",
    bakery: "Bakery",
    snacks: "Snacks",
    beverages: "Beverages",
    household: "Household Essentials"
  };

  currentCategory =
    categoryMap[category] || category;

  currentSearch = "";

  const input = getSearchInput();

  if (input) {
    input.value = "";
  }

  hideSuggestions();

  document
    .querySelectorAll(".category-card")
    .forEach(card => {
      card.classList.remove("active");
    });

  const activeCard =
    document.querySelector(
      `[data-category="${category}"]`
    );

  if (activeCard) {
    activeCard.classList.add("active");
  }

  renderProducts();
  scrollToProducts();
}
