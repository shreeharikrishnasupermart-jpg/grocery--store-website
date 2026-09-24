/* =====================================================
   SHREE HARIKRISHNA SUPERMART
   GOOGLE SHEET PRODUCT SYSTEM
===================================================== */


/* ================= GOOGLE SHEET ================= */

const GOOGLE_SHEET_ID =
  "1bjYs8h44yAfE0nMmolVgfpH8r5eThuV8a3R8jqDpAvI";

const GOOGLE_SHEET_CSV_URL =
  `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/export?format=csv`;


/* ================= BASIC SETTINGS ================= */

const CART_KEY = "shreeHarikrishnaCart";

let products = [];

let cart = [];

let currentCategory = "all";

let selectedProductId = null;

let deliveryCharge = 0;

let locationDistance = null;


/* ================= DELIVERY ================= */

const DELIVERY_CONFIG = {

  shopLat: 21.225238,

  shopLng: 72.897410,

  radiusKm: 3,

  freeDeliveryAbove: 500,

  charges: [
    {
      maxKm: 1,
      charge: 10
    },
    {
      maxKm: 2,
      charge: 20
    },
    {
      maxKm: 3,
      charge: 30
    }
  ]

};


/* ================= CATEGORIES ================= */

const categoryData = [

  ["all", "🛍️", "All"],

  ["grocery", "🌾", "Grocery"],

  ["dairy", "🥛", "Dairy"],

  ["bakery", "🍞", "Bakery"],

  ["snacks", "🍿", "Snacks"],

  ["beverages", "🥤", "Beverages"],

  ["household", "🧹", "Household"]

];


/* ================= START WEBSITE ================= */

document.addEventListener(
  "DOMContentLoaded",
  init
);


async function init() {

  cart = loadCart();

  renderCategories();

  updateCartUI();

  setupSearch();

  await loadProductsFromGoogleSheet();

  renderProducts();

  renderCart();

}


/* =====================================================
   GOOGLE SHEET
===================================================== */

async function loadProductsFromGoogleSheet() {

  const status =
    document.getElementById(
      "productStatus"
    );

  status.textContent =
    "Loading products from Google Sheet...";


  try {

    const response =
      await fetch(
        GOOGLE_SHEET_CSV_URL + "&t=" + Date.now()
      );


    if (!response.ok) {

      throw new Error(
        "Google Sheet could not be loaded"
      );

    }


    const csvText =
      await response.text();


    const rows =
      parseCSV(csvText);


    if (rows.length < 2) {

      throw new Error(
        "No products found in Google Sheet"
      );

    }


    const headers =
      rows[0].map(
        header =>
          header
            .trim()
            .toLowerCase()
      );


    const sheetProducts =
      rows
        .slice(1)
        .map(row => {

          const product = {};

          headers.forEach(
            (header, index) => {

              product[header] =
                (
                  row[index] || ""
                ).trim();

            }

          );

          return product;

        })


        .filter(product => {

          return (
            product.id &&
            product.name
          );

        })


        .map(product => {

          const mrp =
            Number(product.mrp) || 0;

          const price =
            Number(product.price) || 0;

          return {

            id: String(product.id),

            name: product.name,

            category:
              String(
                product.category ||
                "grocery"
              )
              .toLowerCase()
              .trim(),

            brand:
              product.brand || "",

            unit:
              product.unit || "",

            price:
              price,

            mrp:
              mrp || price,

            stock:
              Number(product.stock) || 0,

            image:
              product.image || "",

            discount:
              calculateDiscount(
                mrp,
                price
              )

          };

        });


    if (
      sheetProducts.length === 0
    ) {

      throw new Error(
        "No valid products found"
      );

    }


    /* ================= IMPORTANT =================
       Google Sheet becomes the ONLY product database
    ================================================= */

    products.length = 0;

    products.push(
      ...sheetProducts
    );


    status.textContent =
      `${products.length} products loaded`;


    console.log(
      "Google Sheet loaded:",
      products.length,
      "products"
    );


  } catch (error) {

    console.error(
      "Google Sheet Error:",
      error
    );


    status.textContent =
      "Google Sheet could not be loaded.";


    showToast(
      "Google Sheet load failed"
    );

  }

}


/* =====================================================
   CSV PARSER
===================================================== */

function parseCSV(text) {

  const rows = [];

  let row = [];

  let value = "";

  let insideQuotes = false;


  for (
    let i = 0;
    i < text.length;
    i++
  ) {

    const char =
      text[i];

    const nextChar =
      text[i + 1];


    if (
      char === '"' &&
      insideQuotes &&
      nextChar === '"'
    ) {

      value += '"';

      i++;

    }


    else if (
      char === '"'
    ) {

      insideQuotes =
        !insideQuotes;

    }


    else if (
      char === "," &&
      !insideQuotes
    ) {

      row.push(value);

      value = "";

    }


    else if (
      (
        char === "\n" ||
        char === "\r"
      ) &&
      !insideQuotes
    ) {

      if (
        char === "\r" &&
        nextChar === "\n"
      ) {

        i++;

      }


      row.push(value);

      rows.push(row);

      row = [];

      value = "";

    }


    else {

      value += char;

    }

  }


  if (
    value.length ||
    row.length
  ) {

    row.push(value);

    rows.push(row);

  }


  return rows.filter(
    r =>
      r.some(
        value =>
          String(value).trim() !== ""
      )
  );

}


/* =====================================================
   HELPERS
===================================================== */

function calculateDiscount(
  mrp,
  price
) {

  if (
    !mrp ||
    !price ||
    price >= mrp
  ) {

    return 0;

  }


  return Math.round(
    ((mrp - price) / mrp) * 100
  );

}


function formatNumber(value) {

  return Number(
    value || 0
  ).toLocaleString(
    "en-IN"
  );

}


function escapeHTML(value) {

  return String(
    value ?? ""
  )

    .replace(
      /&/g,
      "&amp;"
    )

    .replace(
      /</g,
      "&lt;"
    )

    .replace(
      />/g,
      "&gt;"
    )

    .replace(
      /"/g,
      "&quot;"
    )

    .replace(
      /'/g,
      "&#039;"
    );

}


function escapeAttr(value) {

  return escapeHTML(value);

}


/* =====================================================
   SEARCH
===================================================== */

function setupSearch() {

  const input =
    document.getElementById(
      "searchInput"
    );


  input.addEventListener(
    "input",
    function () {

      renderProducts();

    }
  );

}


/* =====================================================
   CATEGORIES
===================================================== */

function renderCategories() {

  const container =
    document.getElementById(
      "categories"
    );


  container.innerHTML =
    categoryData
      .map(
        category => {

          const id =
            category[0];

          const icon =
            category[1];

          const name =
            category[2];


          return `

            <button
              class="category ${
                currentCategory === id
                  ? "active"
                  : ""
              }"
              onclick="filterCategory('${id}')"
            >

              <span>
                ${icon}
              </span>

              <span>
                ${name}
              </span>

            </button>

          `;

        }
      )
      .join("");

}


function filterCategory(
  category
) {

  currentCategory =
    category;


  renderCategories();

  renderProducts();


  document
    .getElementById(
      "products"
    )
    .scrollIntoView({
      behavior: "smooth"
    });

}


/* =====================================================
   FILTER PRODUCTS
===================================================== */

function getFilteredProducts() {

  const input =
    document.getElementById(
      "searchInput"
    );


  const search =
    input.value
      .trim()
      .toLowerCase();


  return products.filter(
    product => {

      const categoryMatch =
        currentCategory === "all" ||
        product.category ===
          currentCategory;


      const searchMatch =
        !search ||

        product.name
          .toLowerCase()
          .includes(search) ||

        product.brand
          .toLowerCase()
          .includes(search) ||

        product.category
          .toLowerCase()
          .includes(search);


      return (
        categoryMatch &&
        searchMatch
      );

    }
  );

}


/* =====================================================
   RENDER PRODUCTS
===================================================== */

function renderProducts() {

  const grid =
    document.getElementById(
      "productGrid"
    );


  const title =
    document.getElementById(
      "productsTitle"
    );


  const category =
    categoryData.find(
      item =>
        item[0] ===
        currentCategory
    );


  title.textContent =
    currentCategory === "all"
      ? "All Products"
      : (
          category
            ? category[2]
            : "Products"
        );


  if (
    products.length === 0
  ) {

    grid.innerHTML = `

      <div class="empty">

        Products are loading...

      </div>

    `;

    return;

  }


  const filtered =
    getFilteredProducts();


  if (
    filtered.length === 0
  ) {

    grid.innerHTML = `

      <div class="empty">

        No products found.

      </div>

    `;

    return;

  }


  grid.innerHTML =
    filtered
      .map(
        createProductCard
      )
      .join("");

}


/* =====================================================
   PRODUCT CARD
===================================================== */

function createProductCard(
  product
) {

  const quantity =
    getCartQty(
      product.id
    );


  const outOfStock =
    product.stock <= 0;


  return `

    <article
      class="product-card"
    >


      <div
        class="product-image"
        onclick="openProduct('${escapeAttr(product.id)}')"
      >

        ${
          product.image

            ? `

              <img
                src="${escapeAttr(product.image)}"
                alt="${escapeAttr(product.name)}"
                loading="lazy"
                onerror="
                  this.style.display='none';
                "
              >

            `

            : "🛍️"
        }

      </div>



      <div class="product-info">


        <div class="product-brand">

          ${escapeHTML(
            product.brand
          )}

        </div>


        <div class="product-name">

          ${escapeHTML(
            product.name
          )}

        </div>


        <div class="product-unit">

          ${escapeHTML(
            product.unit
          )}

        </div>



        <div class="price-row">

          <span class="price">

            ₹${formatNumber(
              product.price
            )}

          </span>


          ${
            product.mrp >
            product.price

              ? `

                <span class="mrp">

                  ₹${formatNumber(
                    product.mrp
                  )}

                </span>

              `

              : ""
          }


          ${
            product.discount

              ? `

                <span class="discount">

                  ${
                    product.discount
                  }% OFF

                </span>

              `

              : ""
          }

        </div>



        <div class="card-bottom">

          ${
            outOfStock

              ? `

                <span class="stock-out">

                  Out of stock

                </span>

              `

              : quantity > 0

              ? quantityControl(
                  product.id,
                  quantity
                )

              : `

                <button
                  class="add-btn"
                  onclick="
                    addToCart('${escapeAttr(product.id)}')
                  "
                >

                  ADD

                </button>

              `
          }

        </div>


      </div>

    </article>

  `;

}


/* =====================================================
   QUANTITY CONTROL
===================================================== */

function quantityControl(
  id,
  quantity
) {

  return `

    <div class="qty">

      <button
        onclick="
          changeQty('${escapeAttr(id)}', -1)
        "
      >
        −
      </button>


      <span>
        ${quantity}
      </span>


      <button
        onclick="
          changeQty('${escapeAttr(id)}', 1)
        "
      >
        +
      </button>

    </div>

  `;

}


/* =====================================================
   PRODUCT DETAIL
===================================================== */

function openProduct(id) {

  const product =
    products.find(
      item =>
        String(item.id) ===
        String(id)
    );


  if (!product) {
    return;
  }


  selectedProductId =
    id;


  const quantity =
    getCartQty(
      product.id
    );


  document.getElementById(
    "productDetail"
  ).innerHTML = `

    <div class="detail">


      <div class="detail-image">

        ${
          product.image

            ? `

              <img
                src="${escapeAttr(product.image)}"
                alt="${escapeAttr(product.name)}"
              >

            `

            : "🛍️"
        }

      </div>



      <div>


        <div class="product-brand">

          ${escapeHTML(
            product.brand
          )}

        </div>


        <h2>

          ${escapeHTML(
            product.name
          )}

        </h2>


        <div class="product-unit">

          ${escapeHTML(
            product.unit
          )}

        </div>


        <div class="detail-price">

          ₹${formatNumber(
            product.price
          )}

        </div>


        ${
          product.mrp >
          product.price

            ? `

              <div class="mrp">

                MRP ₹${formatNumber(
                  product.mrp
                )}

              </div>

            `

            : ""
        }


        <p>

          Available at
          Shree Harikrishna Supermart.

        </p>


        ${
          product.stock <= 0

            ? `

              <div class="stock-out">

                Out of stock

              </div>

            `

            : quantity > 0

            ? quantityControl(
                product.id,
                quantity
              )

            : `

              <button
                class="add-btn"
                onclick="
                  addToCart('${escapeAttr(product.id)}')
                "
              >

                ADD TO CART

              </button>

            `
        }


      </div>


    </div>

  `;


  document
    .getElementById(
      "productModal"
    )
    .classList.remove(
      "hidden"
    );

}


function closeProduct() {

  document
    .getElementById(
      "productModal"
    )
    .classList.add(
      "hidden"
    );

}


/* =====================================================
   CART
===================================================== */

function loadCart() {

  try {

    return (
      JSON.parse(
        localStorage.getItem(
          CART_KEY
        )
      ) || []
    );

  } catch {

    return [];

  }

}


function saveCart() {

  localStorage.setItem(
    CART_KEY,
    JSON.stringify(cart)
  );

}


function getCartQty(id) {

  const item =
    cart.find(
      cartItem =>
        String(cartItem.id) ===
        String(id)
    );


  return item
    ? item.qty
    : 0;

}


/* =====================================================
   ADD TO CART
===================================================== */

function addToCart(id) {

  const product =
    products.find(
      item =>
        String(item.id) ===
        String(id)
    );


  if (
    !product ||
    product.stock <= 0
  ) {

    return;

  }


  const existing =
    cart.find(
      item =>
        String(item.id) ===
        String(id)
    );


  if (existing) {

    if (
      existing.qty <
      product.stock
    ) {

      existing.qty++;

    } else {

      showToast(
        "Maximum available stock reached"
      );

    }

  } else {

    cart.push({

      id: String(id),

      qty: 1

    });

  }


  saveCart();

  updateCartUI();

  renderProducts();

  renderCart();

  showToast(
    "Added to cart"
  );

}


/* =====================================================
   CHANGE QUANTITY
===================================================== */

function changeQty(
  id,
  amount
) {

  const product =
    products.find(
      item =>
        String(item.id) ===
        String(id)
    );


  const item =
    cart.find(
      cartItem =>
        String(cartItem.id) ===
        String(id)
    );


  if (
    !product ||
    !item
  ) {

    return;

  }


  item.qty += amount;


  if (
    item.qty <= 0
  ) {

    cart =
      cart.filter(
        cartItem =>
          String(cartItem.id) !==
          String(id)
      );

  }


  if (
    item.qty >
    product.stock
  ) {

    item.qty =
      product.stock;


    showToast(
      "Maximum available stock reached"
    );

  }


  saveCart();

  updateCartUI();

  renderProducts();

  renderCart();


  if (
    !document
      .getElementById(
        "productModal"
      )
      .classList.contains(
        "hidden"
      )
  ) {

    openProduct(id);

  }

}


/* =====================================================
   CART COUNT
===================================================== */

function updateCartUI() {

  const count =
    cart.reduce(
      (
        total,
        item
      ) =>
        total +
        item.qty,
      0
    );


  document.getElementById(
    "cartCount"
  ).textContent =
    count;

}


/* =====================================================
   OPEN CART
===================================================== */

function openCart() {

  renderCart();


  document
    .getElementById(
      "cartModal"
    )
    .classList.remove(
      "hidden"
    );

}


function closeCart() {

  document
    .getElementById(
      "cartModal"
    )
    .classList.add(
      "hidden"
    );

}


/* =====================================================
   RENDER CART
===================================================== */

function renderCart() {

  const itemsBox =
    document.getElementById(
      "cartItems"
    );


  const summaryBox =
    document.getElementById(
      "cartSummary"
    );


  if (
    cart.length === 0
  ) {

    itemsBox.innerHTML = `

      <div class="empty">

        🛒

        <br><br>

        Your cart is empty.

      </div>

    `;


    summaryBox.innerHTML =
      "";

    return;

  }


  itemsBox.innerHTML =
    cart
      .map(
        item => {

          const product =
            products.find(
              product =>
                String(
                  product.id
                ) ===
                String(
                  item.id
                )
            );


          if (!product) {
            return "";
          }


          return `

            <div class="cart-item">


              <div class="cart-thumb">

                ${
                  product.image

                    ? `

                      <img
                        src="${escapeAttr(product.image)}"
                        alt=""
                      >

                    `

                    : "🛍️"
                }

              </div>


              <div>

                <div class="cart-item-name">

                  ${escapeHTML(
                    product.name
                  )}

                </div>


                <div class="cart-item-unit">

                  ${escapeHTML(
                    product.unit
                  )}

                </div>


                <div class="cart-item-price">

                  ₹${formatNumber(
                    product.price *
                    item.qty
                  )}

                </div>

              </div>


              ${
                quantityControl(
                  product.id,
                  item.qty
                )
              }


            </div>

          `;

        }
      )
      .join("");


  const subtotal =
    cart.reduce(
      (
        total,
        item
      ) => {

        const product =
          products.find(
            p =>
              String(p.id) ===
              String(item.id)
          );


        if (!product) {
          return total;
        }


        return (
          total +
          product.price *
          item.qty
        );

      },
      0
    );


  if (
    subtotal >=
    DELIVERY_CONFIG.freeDeliveryAbove
  ) {

    deliveryCharge = 0;

  }

  else if (
    locationDistance !== null &&
    locationDistance <=
      DELIVERY_CONFIG.radiusKm
  ) {

    deliveryCharge =
      getDeliveryCharge(
        locationDistance
      );

  }

  else {

    deliveryCharge = 0;

  }


  const total =
    subtotal +
    deliveryCharge;


  summaryBox.innerHTML = `

    <div class="summary-row">

      <span>
        Subtotal
      </span>

      <strong>
        ₹${formatNumber(
          subtotal
        )}
      </strong>

    </div>


    <div class="summary-row">

      <span>
        Delivery
      </span>

      <strong
        class="${
          deliveryCharge === 0
            ? "free"
            : ""
        }"
      >

        ${
          deliveryCharge === 0
            ? "FREE"
            : "₹" +
              formatNumber(
                deliveryCharge
              )
        }

      </strong>

    </div>


    <div class="summary-row total">

      <span>
        Total
      </span>

      <strong>
        ₹${formatNumber(
          total
        )}
      </strong>

    </div>


    ${
      subtotal < 500

        ? `

          <div class="free">

            Add ₹${formatNumber(
              500 - subtotal
            )}
            more for FREE delivery.

          </div>

        `

        : `

          <div class="free">

            🎉 Free delivery unlocked!

          </div>

        `
    }

  `;

}


/* =====================================================
   DELIVERY CHARGE
===================================================== */

function getDeliveryCharge(
  distance
) {

  const tier =
    DELIVERY_CONFIG.charges.find(
      item =>
        distance <=
        item.maxKm
    );


  return tier
    ? tier.charge
    : 30;

}


/* =====================================================
   CHECKOUT
===================================================== */

function checkout() {

  if (
    cart.length === 0
  ) {

    showToast(
      "Your cart is empty"
    );

    return;

  }


  if (
    locationDistance === null
  ) {

    showToast(
      "Please check your delivery location first"
    );

    return;

  }


  if (
    locationDistance > 3
  ) {

    showToast(
      "Sorry, your location is outside 3 km"
    );

    return;

  }


  const subtotal =
    cart.reduce(
      (
        total,
        item
      ) => {

        const product =
          products.find(
            p =>
              String(p.id) ===
              String(item.id)
          );


        return (
          total +
          (
            product
              ? product.price *
                item.qty
              : 0
          )
        );

      },
      0
    );


  if (
    subtotal >= 500
  ) {

    deliveryCharge = 0;

  }


  const total =
    subtotal +
    deliveryCharge;


  alert(

    "Order ready!\n\n" +

    "Subtotal: ₹" +
    subtotal +

    "\nDelivery: " +

    (
      deliveryCharge === 0
        ? "FREE"
        : "₹" +
          deliveryCharge
    ) +

    "\nTotal: ₹" +
    total

  );

}


/* =====================================================
   LOCATION CHECK
===================================================== */

function checkLocation() {

  if (
    !navigator.geolocation
  ) {

    showToast(
      "Location is not supported"
    );

    return;

  }


  showToast(
    "Checking your location..."
  );


  navigator.geolocation.getCurrentPosition(

    function(position) {

      const latitude =
        position.coords.latitude;

      const longitude =
        position.coords.longitude;


      const distance =
        haversineKm(

          DELIVERY_CONFIG.shopLat,

          DELIVERY_CONFIG.shopLng,

          latitude,

          longitude

        );


      locationDistance =
        distance;


      const locationText =
        document.getElementById(
          "locationText"
        );


      if (
        distance <= 3
      ) {

        locationText.textContent =
          `Delivery available · ${distance.toFixed(2)} km from store`;


        showToast(
          "Delivery available"
        );

      }


      else {

        locationText.textContent =
          `Outside delivery area · ${distance.toFixed(2)} km from store`;


        showToast(
          "Delivery available only within 3 km"
        );

      }


      renderCart();

    },


    function() {

      showToast(
        "Please allow location permission"
      );

    }

  );

}


/* =====================================================
   DISTANCE CALCULATION
===================================================== */

function haversineKm(
  lat1,
  lon1,
  lat2,
  lon2
) {

  const R = 6371;


  const dLat =
    toRadians(
      lat2 - lat1
    );


  const dLon =
    toRadians(
      lon2 - lon1
    );


  const a =

    Math.sin(
      dLat / 2
    ) ** 2

    +

    Math.cos(
      toRadians(lat1)
    )

    *

    Math.cos(
      toRadians(lat2)
    )

    *

    Math.sin(
      dLon / 2
    ) ** 2;


  return (

    R *

    2 *

    Math.atan2(

      Math.sqrt(a),

      Math.sqrt(
        1 - a
      )

    )

  );

}


function toRadians(
  value
) {

  return (
    value *
    Math.PI /
    180
  );

}


/* =====================================================
   HOME
===================================================== */

function goHome() {

  currentCategory =
    "all";


  document.getElementById(
    "searchInput"
  ).value =
    "";


  renderCategories();

  renderProducts();


  window.scrollTo({

    top: 0,

    behavior: "smooth"

  });

}


/* =====================================================
   TOAST
===================================================== */

function showToast(
  message
) {

  const toast =
    document.getElementById(
      "toast"
    );


  toast.textContent =
    message;


  toast.classList.add(
    "show"
  );


  clearTimeout(
    window.toastTimer
  );


  window.toastTimer =
    setTimeout(
      function() {

        toast.classList.remove(
          "show"
        );

      },
      2200
    );

} 
