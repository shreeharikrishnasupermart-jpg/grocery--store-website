// ==========================================
// SHREE HARIKRUSHNA SUPERMART
// MAIN JAVASCRIPT
// ==========================================


// ==========================================
// PRODUCTS
// ==========================================

const products = [

  // GROCERY & KITCHEN
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

  // DAIRY
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

  // BAKERY
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

  // HOUSEHOLD ESSENTIALS
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


// ==========================================
// CART
// ==========================================

let cart =
  JSON.parse(localStorage.getItem("supermartCart")) || [];


// ==========================================
// CURRENT FILTER
// ==========================================

let currentCategory = "All Products";


// ==========================================
// DOM ELEMENTS
// ==========================================

const productsGrid =
  document.getElementById("productsGrid");

const noProducts =
  document.getElementById("noProducts");

const searchInput =
  document.getElementById("searchInput");

const searchSuggestions =
  document.getElementById("searchSuggestions");


// ==========================================
// RENDER PRODUCTS
// ==========================================

function renderProducts(list = products) {

  if (!productsGrid) return;

  productsGrid.innerHTML = "";

  if (list.length === 0) {

    if (noProducts) {
      noProducts.style.display = "block";
    }

    return;
  }

  if (noProducts) {
    noProducts.style.display = "none";
  }


  list.forEach(product => {

    const cartItem =
      cart.find(item => item.id === product.id);

    const quantity =
      cartItem ? cartItem.quantity : 0;


    const card =
      document.createElement("div");

    // VERY IMPORTANT:
    // Every product gets its own ID
    card.className = "product-card";

    card.dataset.productId = product.id;


    card.innerHTML = `

      <div class="product-image">
        <span>${product.image}</span>
      </div>

      <div class="product-info">

        <h3>${product.name}</h3>

        <p class="product-unit">
          ${product.unit}
        </p>

        <div class="product-bottom">

          <strong>
            ₹${product.price}
          </strong>

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

                <button
                  onclick="decreaseQuantity(${product.id})">

                  −

                </button>

                <span>
                  ${quantity}
                </span>

                <button
                  onclick="increaseQuantity(${product.id})">

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
// SMART SEARCH
// ==========================================

function searchProducts() {

  if (!searchInput) return;

  const query =
    searchInput.value
      .trim()
      .toLowerCase();


  // EMPTY SEARCH
  if (query === "") {

    hideSuggestions();

    renderCurrentProducts();

    return;
  }


  // SEARCH PRODUCTS
  const results =
    products.filter(product => {

      const name =
        product.name.toLowerCase();

      const category =
        product.category.toLowerCase();

      const unit =
        product.unit.toLowerCase();


      return (
        name.includes(query) ||
        category.includes(query) ||
        unit.includes(query)
      );

    });


  // SHOW SEARCH RESULTS
  renderProducts(results);


  // SHOW SUGGESTIONS
  showSuggestions(results);

}


// ==========================================
// SHOW SUGGESTIONS
// ==========================================

function showSuggestions(results) {

  if (!searchSuggestions) return;

  searchSuggestions.innerHTML = "";


  // NO RESULT
  if (results.length === 0) {

    searchSuggestions.innerHTML = `

      <div class="no-search-result">

        <span>🔍</span>

        <div>

          <strong>
            No products found
          </strong>

          <small>
            Try another product name
          </small>

        </div>

      </div>

    `;

    searchSuggestions.style.display = "block";

    return;
  }


  // MAX 6 SUGGESTIONS
  const suggestions =
    results.slice(0, 6);


  suggestions.forEach(product => {

    const suggestion =
      document.createElement("div");


    suggestion.className =
      "search-suggestion";


    suggestion.innerHTML = `

      <div class="suggestion-image">
        ${product.image}
      </div>

      <div class="suggestion-info">

        <strong>
          ${product.name}
        </strong>

        <small>
          ${product.unit} • ₹${product.price}
        </small>

      </div>

      <div class="suggestion-arrow">
        →
      </div>

    `;


    // ======================================
    // TAP SUGGESTION
    // ======================================

    suggestion.addEventListener(
      "click",
      function() {

        // Put product name in search
        searchInput.value =
          product.name;


        // Close suggestions
        hideSuggestions();


        // IMPORTANT:
        // Render ALL search results,
        // not just one product
        renderProducts(results);


        // Wait until cards are created
        setTimeout(() => {

          const selectedCard =
            document.querySelector(
              `[data-product-id="${product.id}"]`
            );


          if (selectedCard) {

            // Directly scroll to exact product
            selectedCard.scrollIntoView({

              behavior: "smooth",

              block: "center"

            });


            // Highlight product
            selectedCard.classList.add(
              "product-selected"
            );


            // Remove highlight
            setTimeout(() => {

              selectedCard.classList.remove(
                "product-selected"
              );

            }, 1800);

          }

        }, 100);

      }
    );


    searchSuggestions.appendChild(
      suggestion
    );

  });


  searchSuggestions.style.display =
    "block";

}


// ==========================================
// HIDE SUGGESTIONS
// ==========================================

function hideSuggestions() {

  if (!searchSuggestions) return;

  searchSuggestions.innerHTML = "";

  searchSuggestions.style.display =
    "none";

}


// ==========================================
// SEARCH INPUT EVENT
// ==========================================

if (searchInput) {

  searchInput.addEventListener(
    "input",
    searchProducts
  );

}


// ==========================================
// CLOSE SEARCH WHEN CLICK OUTSIDE
// ==========================================

document.addEventListener(
  "click",
  function(event) {

    if (
      searchInput &&
      searchSuggestions &&
      !searchInput.contains(event.target) &&
      !searchSuggestions.contains(event.target)
    ) {

      hideSuggestions();

    }

  }
);


// ==========================================
// CLEAR SEARCH
// ==========================================

function clearSearch() {

  if (searchInput) {
    searchInput.value = "";
  }

  hideSuggestions();

  currentCategory =
    "All Products";

  renderProducts(products);

}


// ==========================================
// CURRENT PRODUCTS
// ==========================================

function renderCurrentProducts() {

  if (
    currentCategory ===
    "All Products"
  ) {

    renderProducts(products);

    return;
  }


  const filtered =
    products.filter(
      product =>
        product.category ===
        currentCategory
    );


  renderProducts(filtered);

}


// ==========================================
// CATEGORY FILTER
// ==========================================

function filterCategory(category) {

  currentCategory = category;


  // Remove active from all
  document
    .querySelectorAll(".category-card")
    .forEach(card => {

      card.classList.remove("active");

    });


  // Add active to selected
  document
    .querySelectorAll(".category-card")
    .forEach(card => {

      if (
        card.innerText.trim() ===
        category
      ) {

        card.classList.add("active");

      }

    });


  // Clear search
  if (searchInput) {

    searchInput.value = "";

  }


  hideSuggestions();


  // Render category
  renderCurrentProducts();

}


// ==========================================
// RESET PRODUCTS
// ==========================================

function resetProducts() {

  currentCategory =
    "All Products";

  if (searchInput) {
    searchInput.value = "";
  }

  hideSuggestions();

  renderProducts(products);

}


// ==========================================
// SCROLL TO PRODUCTS
// ==========================================

function scrollToProducts() {

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


// ==========================================
// ADD TO CART
// ==========================================

function addToCart(productId) {

  const existing =
    cart.find(
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

  renderCurrentProducts();

}


// ==========================================
// INCREASE
// ==========================================

function increaseQuantity(productId) {

  const item =
    cart.find(
      item => item.id === productId
    );


  if (item) {

    item.quantity += 1;

  }


  saveCart();

  updateCartUI();

  renderCurrentProducts();

}


// ==========================================
// DECREASE
// ==========================================

function decreaseQuantity(productId) {

  const item =
    cart.find(
      item => item.id === productId
    );


  if (!item) return;


  item.quantity -= 1;


  if (item.quantity <= 0) {

    cart =
      cart.filter(
        item => item.id !== productId
      );

  }


  saveCart();

  updateCartUI();

  renderCurrentProducts();

}


// ==========================================
// REMOVE
// ==========================================

function removeFromCart(productId) {

  cart =
    cart.filter(
      item => item.id !== productId
    );


  saveCart();

  updateCartUI();

  renderCurrentProducts();

}


// ==========================================
// SAVE CART
// ==========================================

function saveCart() {

  localStorage.setItem(
    "supermartCart",
    JSON.stringify(cart)
  );

}


// ==========================================
// CART UI
// ==========================================

function updateCartUI() {

  const totalItems =
    cart.reduce(
      (sum, item) =>
        sum + item.quantity,
      0
    );


  const totalPrice =
    cart.reduce(
      (sum, item) => {

        const product =
          products.find(
            p => p.id === item.id
          );


        return (
          sum +
          (
            product
              ? product.price *
                item.quantity
              : 0
          )
        );

      },
      0
    );


  // HEADER COUNT
  const headerCartCount =
    document.getElementById(
      "cartCount"
    );


  if (headerCartCount) {

    headerCartCount.textContent =
      totalItems;

  }


  // BOTTOM CART
  const bottomCart =
    document.getElementById(
      "bottomCart"
    );


  const bottomCartItems =
    document.getElementById(
      "bottomCartItems"
    );


  const bottomCartTotal =
    document.getElementById(
      "bottomCartTotal"
    );


  if (bottomCart) {

    bottomCart.style.display =
      totalItems > 0
        ? "flex"
        : "none";

  }


  if (bottomCartItems) {

    bottomCartItems.textContent =
      `${totalItems} item${
        totalItems !== 1
          ? "s"
          : ""
      }`;

  }


  if (bottomCartTotal) {

    bottomCartTotal.textContent =
      `₹${totalPrice}`;

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


  modal.style.display =
    "flex";


  renderCart();

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

}


// ==========================================
// CLOSE CART OUTSIDE
// ==========================================

function closeCartOutside(event) {

  if (
    event.target.id ===
    "cartModal"
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


  if (!container) return;


  container.innerHTML = "";


  if (cart.length === 0) {

    container.innerHTML = `

      <div class="empty-cart">

        🛒

        <h3>
          Your cart is empty
        </h3>

        <p>
          Add some products to continue.
        </p>

      </div>

    `;

  }


  let subtotal = 0;


  cart.forEach(item => {

    const product =
      products.find(
        p => p.id === item.id
      );


    if (!product) return;


    const itemTotal =
      product.price *
      item.quantity;


    subtotal += itemTotal;


    const div =
      document.createElement("div");


    div.className =
      "cart-item";


    div.innerHTML = `

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

      <div class="cart-item-right">

        <div class="quantity-control">

          <button
            onclick="decreaseQuantity(${product.id})">

            −

          </button>

          <span>
            ${item.quantity}
          </span>

          <button
            onclick="increaseQuantity(${product.id})">

            +

          </button>

        </div>

        <strong>
          ₹${itemTotal}
        </strong>

      </div>

    `;


    container.appendChild(div);

  });


  // DELIVERY
  const delivery =
    subtotal >= 500
      ? "FREE"
      : "Calculated at checkout";


  if (subtotalElement) {

    subtotalElement.textContent =
      `₹${subtotal}`;

  }


  if (deliveryElement) {

    deliveryElement.textContent =
      delivery;

  }


  if (totalElement) {

    totalElement.textContent =
      `₹${subtotal}`;

  }

}


// ==========================================
// CHECKOUT
// ==========================================

function checkout() {

  if (cart.length === 0) {

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
// INITIAL LOAD
// ==========================================

document.addEventListener(
  "DOMContentLoaded",
  function() {

    renderProducts(products);

    updateCartUI();

  }
);
