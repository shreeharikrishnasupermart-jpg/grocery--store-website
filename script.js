// ============================================
// SHREE HARIKRISHNA SUPERMART
// PRODUCT + SEARCH + CART SYSTEM
// ============================================

const products = [
  // GROCERY & KITCHEN
  { id: 1, name: "Aashirvaad Atta", category: "grocery", price: 299, weight: "5 kg", image: "🌾" },
  { id: 2, name: "Tata Salt", category: "grocery", price: 28, weight: "1 kg", image: "🧂" },
  { id: 3, name: "Fortune Sunflower Oil", category: "grocery", price: 145, weight: "1 L", image: "🫗" },
  { id: 4, name: "Tata Tea", category: "grocery", price: 125, weight: "250 g", image: "🍵" },

  // DAIRY
  { id: 5, name: "Amul Butter", category: "dairy", price: 58, weight: "100 g", image: "🧈" },
  { id: 6, name: "Amul Cheese", category: "dairy", price: 145, weight: "200 g", image: "🧀" },
  { id: 7, name: "Amul Fresh Cream", category: "dairy", price: 70, weight: "250 ml", image: "🥛" },
  { id: 8, name: "Amul Paneer", category: "dairy", price: 90, weight: "200 g", image: "🧀" },

  // BAKERY
  { id: 9, name: "Sandwich Bread", category: "bakery", price: 40, weight: "400 g", image: "🍞" },
  { id: 10, name: "Premium Cookies", category: "bakery", price: 60, weight: "200 g", image: "🍪" },
  { id: 11, name: "Pav Bhaji Pav", category: "bakery", price: 35, weight: "6 pcs", image: "🥖" },
  { id: 12, name: "Chocolate Cake", category: "bakery", price: 220, weight: "500 g", image: "🍰" },

  // SNACKS
  { id: 13, name: "Lay's Classic", category: "snacks", price: 20, weight: "52 g", image: "🥔" },
  { id: 14, name: "Kurkure Masala", category: "snacks", price: 20, weight: "55 g", image: "🌽" },
  { id: 15, name: "Parle-G Biscuits", category: "snacks", price: 10, weight: "79 g", image: "🍪" },
  { id: 16, name: "Bhujia Sev", category: "snacks", price: 55, weight: "200 g", image: "🥨" },

  // BEVERAGES
  { id: 17, name: "Coca-Cola", category: "beverages", price: 40, weight: "750 ml", image: "🥤" },
  { id: 18, name: "Sprite", category: "beverages", price: 40, weight: "750 ml", image: "🥤" },
  { id: 19, name: "Real Fruit Juice", category: "beverages", price: 110, weight: "1 L", image: "🧃" },
  { id: 20, name: "Packaged Drinking Water", category: "beverages", price: 20, weight: "1 L", image: "💧" },

  // HOUSEHOLD
  { id: 21, name: "Vim Dishwash Bar", category: "household", price: 25, weight: "200 g", image: "🧼" },
  { id: 22, name: "Surf Excel Matic", category: "household", price: 210, weight: "1 kg", image: "🧺" },
  { id: 23, name: "Harpic Toilet Cleaner", category: "household", price: 105, weight: "500 ml", image: "🧴" },
  { id: 24, name: "Colin Glass Cleaner", category: "household", price: 105, weight: "500 ml", image: "✨" }
];


// ============================================
// VARIABLES
// ============================================

let cart = {};
let currentCategory = "all";
let currentSearch = "";


// ============================================
// CART STORAGE
// ============================================

function loadCart() {
  try {
    const saved = localStorage.getItem("supermartCart");

    if (saved) {
      cart = JSON.parse(saved) || {};
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
    console.log("Cart storage error");
  }
}


// ============================================
// RENDER PRODUCTS
// ============================================

function renderProducts() {

  const grid =
    document.getElementById("productsGrid");

  if (!grid) {
    console.error("productsGrid not found");
    return;
  }

  let filteredProducts = products;


  // CATEGORY
  if (currentCategory !== "all") {

    filteredProducts =
      filteredProducts.filter(
        product =>
          product.category === currentCategory
      );

  }


  // SEARCH
  if (currentSearch.trim() !== "") {

    const search =
      currentSearch
        .toLowerCase()
        .trim();

    filteredProducts =
      filteredProducts.filter(
        product =>
          product.name
            .toLowerCase()
            .includes(search)
      );

  }


  grid.innerHTML = "";


  // NO PRODUCTS
  const noProducts =
    document.getElementById("noProducts");

  if (filteredProducts.length === 0) {

    if (noProducts) {
      noProducts.style.display = "block";
    }

  } else {

    if (noProducts) {
      noProducts.style.display = "none";
    }

  }


  // PRODUCT COUNT
  const productCount =
    document.getElementById("productCount");

  if (productCount) {

    productCount.textContent =
      `${filteredProducts.length} products`;

  }


  // CREATE PRODUCT CARDS
  filteredProducts.forEach(product => {

    const quantity =
      Number(cart[product.id] || 0);


    const card =
      document.createElement("div");

    card.className =
      "product-card";

    card.dataset.productId =
      product.id;


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
                  class="add-button"
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

}


// ============================================
// CATEGORY FILTER
// ============================================

function filterCategory(category) {

  currentCategory = category;

  currentSearch = "";


  const input =
    document.getElementById("searchInput");

  if (input) {
    input.value = "";
  }


  // ACTIVE CATEGORY
  document
    .querySelectorAll(".category-card")
    .forEach(card => {

      card.classList.remove("active");

    });


  const activeCard =
    document.querySelector(
      `.category-card[data-category="${category}"]`
    );

  if (activeCard) {
    activeCard.classList.add("active");
  }


  renderProducts();

}


// ============================================
// RESET PRODUCTS
// ============================================

function resetProducts() {

  currentCategory = "all";
  currentSearch = "";


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

      card.classList.remove("active");

    });


  const allCard =
    document.querySelector(
      '.category-card[data-category="all"]'
    );

  if (allCard) {
    allCard.classList.add("active");
  }


  renderProducts();

}


// ============================================
// SEARCH
// ============================================

function searchProducts(value) {

  currentSearch = value;


  const clearButton =
    document.getElementById("clearSearch");

  if (clearButton) {

    if (value.trim() !== "") {
      clearButton.classList.add("show");
    } else {
      clearButton.classList.remove("show");
    }

  }


  renderProducts();

  showSearchSuggestions();

}


// ============================================
// SEARCH SUGGESTIONS
// ============================================

function showSearchSuggestions() {

  const input =
    document.getElementById("searchInput");

  if (!input) return;


  let box =
    document.getElementById(
      "searchSuggestions"
    );


  if (!box) {

    box =
      document.createElement("div");

    box.id =
      "searchSuggestions";

    box.style.position = "absolute";
    box.style.left = "0";
    box.style.right = "0";
    box.style.top = "100%";
    box.style.zIndex = "5000";
    box.style.background = "#ffffff";
    box.style.border = "1px solid #eeeeee";
    box.style.borderRadius = "12px";
    box.style.marginTop = "6px";
    box.style.boxShadow =
      "0 8px 25px rgba(0,0,0,0.12)";
    box.style.overflow = "hidden";


    const parent =
      input.closest(".search-box");

    if (parent) {

      parent.style.position =
        "relative";

      parent.appendChild(box);

    }

  }


  const search =
    currentSearch
      .toLowerCase()
      .trim();


  if (search === "") {

    box.style.display = "none";
    return;

  }


  const results =
    products
      .filter(product =>
        product.name
          .toLowerCase()
          .includes(search)
      )
      .slice(0, 8);


  box.innerHTML = "";


  if (results.length === 0) {

    box.innerHTML = `
      <div style="
        padding:16px;
        color:#777;
      ">
        No product found
      </div>
    `;

    box.style.display = "block";

    return;

  }


  results.forEach(product => {

    const item =
      document.createElement("button");

    item.type = "button";

    item.style.width = "100%";
    item.style.display = "flex";
    item.style.alignItems = "center";
    item.style.gap = "12px";
    item.style.padding = "12px 15px";
    item.style.background = "#fff";
    item.style.border = "0";
    item.style.borderBottom =
      "1px solid #eeeeee";
    item.style.textAlign = "left";


    item.innerHTML = `

      <span style="
        width:42px;
        height:42px;
        display:flex;
        align-items:center;
        justify-content:center;
        background:#fff1e6;
        border-radius:10px;
        font-size:24px;
      ">
        ${product.image}
      </span>

      <span>

        <strong style="
          display:block;
          color:#222;
        ">
          ${product.name}
        </strong>

        <small style="
          color:#777;
        ">
          ${product.weight} • ₹${product.price}
        </small>

      </span>

    `;


    item.addEventListener(
      "click",
      function () {

        input.value =
          product.name;

        currentSearch =
          product.name;

        box.style.display =
          "none";


        renderProducts();


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


            card.style.boxShadow =
              "0 0 0 4px rgba(255,107,0,0.35)";


            setTimeout(() => {

              card.style.boxShadow = "";

            }, 1800);

          }

        }, 100);

      }
    );


    box.appendChild(item);

  });


  box.style.display = "block";

}


// ============================================
// CLEAR SEARCH
// ============================================

function clearSearch() {

  currentSearch = "";

  currentCategory = "all";


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


  const suggestions =
    document.getElementById(
      "searchSuggestions"
    );

  if (suggestions) {
    suggestions.style.display = "none";
  }


  renderProducts();

}


// ============================================
// ADD TO CART
// ============================================

function addToCart(productId) {

  const id =
    String(productId);


  cart[id] =
    Number(cart[id] || 0) + 1;


  saveCart();

  renderProducts();

  updateCartUI();

}


// ============================================
// REMOVE FROM CART
// ============================================

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

  updateCartUI();

}


// ============================================
// CART COUNT
// ============================================

function getCartItems() {

  return Object.values(cart)
    .reduce(
      (total, quantity) =>
        total + Number(quantity),
      0
    );

}


// ============================================
// CART SUBTOTAL
// ============================================

function getCartSubtotal() {

  return Object.entries(cart)
    .reduce(
      (total, [id, quantity]) => {

        const product =
          products.find(
            item =>
              item.id === Number(id)
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


// ============================================
// UPDATE CART UI
// ============================================

function updateCartUI() {

  const itemCount =
    getCartItems();

  const subtotal =
    getCartSubtotal();


  // HEADER
  const headerCount =
    document.getElementById(
      "headerCartCount"
    );

  if (headerCount) {
    headerCount.textContent =
      itemCount;
  }


  // BOTTOM CART
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


  if (bottomItems) {

    bottomItems.textContent =
      `${itemCount} ${
        itemCount === 1
          ? "item"
          : "items"
      }`;

  }


  if (bottomTotal) {

    bottomTotal.textContent =
      `₹${subtotal}`;

  }


  if (bottomCart) {

    bottomCart.style.display =
      itemCount > 0
        ? "flex"
        : "none";

  }

}


// ============================================
// OPEN CART
// ============================================

function openCart() {

  const overlay =
    document.getElementById(
      "cartOverlay"
    );

  if (!overlay) return;


  renderCart();


  overlay.classList.add("show");

  document.body.style.overflow =
    "hidden";

}


// ============================================
// CLOSE CART
// ============================================

function closeCart() {

  const overlay =
    document.getElementById(
      "cartOverlay"
    );

  if (!overlay) return;


  overlay.classList.remove("show");

  document.body.style.overflow =
    "";

}


// ============================================
// CLOSE CART OUTSIDE
// ============================================

function closeCartOutside(event) {

  if (
    event.target &&
    event.target.id ===
      "cartOverlay"
  ) {

    closeCart();

  }

}


// ============================================
// RENDER CART
// ============================================

function renderCart() {

  const container =
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


  if (!container) return;


  container.innerHTML = "";


  const entries =
    Object.entries(cart);


  if (entries.length === 0) {

    if (emptyCart) {
      emptyCart.style.display = "block";
    }

    if (cartSummary) {
      cartSummary.style.display = "none";
    }

    return;

  }


  if (emptyCart) {
    emptyCart.style.display = "none";
  }

  if (cartSummary) {
    cartSummary.style.display = "block";
  }


  entries.forEach(
    ([id, quantity]) => {

      const product =
        products.find(
          item =>
            item.id === Number(id)
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

          <div class="cart-item-name">
            ${product.name}
          </div>

          <div class="cart-item-price">
            ${product.weight} • ₹${product.price}
          </div>

          <div class="cart-item-total">
            ₹${product.price * quantity}
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

      `;


      container.appendChild(item);

    }
  );


  const subtotal =
    getCartSubtotal();


  const delivery =
    subtotal >= 500
      ? 0
      : null;


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
      delivery === 0
        ? `₹${subtotal}`
        : `₹${subtotal}`;

  }

}


// ============================================
// CHECKOUT
// ============================================

function checkout() {

  if (getCartItems() === 0) {

    alert(
      "Your cart is empty."
    );

    return;

  }


  alert(
    "Checkout system will be connected next."
  );

}


// ============================================
// SCROLL TO PRODUCTS
// ============================================

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


// ============================================
// INITIALIZE
// ============================================

function initializeStore() {

  loadCart();

  renderProducts();

  updateCartUI();


  const input =
    document.getElementById(
      "searchInput"
    );


  if (input) {

    input.addEventListener(
      "input",
      function () {

        searchProducts(
          input.value
        );

      }
    );

  }


  console.log(
    "Shree Harikrishna Supermart loaded successfully."
  );

}


// ============================================
// START
// ============================================

if (
  document.readyState === "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    initializeStore
  );

} else {

  initializeStore();

} 
