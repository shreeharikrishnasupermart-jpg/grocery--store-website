<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Shree Harikrishna Supermart</title>

  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
    }

    body {
      background: #f8f8f8;
      color: #222;
    }

    /* HEADER */
    header {
      background: white;
      padding: 16px;
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: 0 2px 10px rgba(0,0,0,0.08);
    }

    .header-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
    }

    .logo {
      font-size: 20px;
      font-weight: bold;
      color: #222;
    }

    .cart {
      background: #ff6b00;
      color: white;
      padding: 10px 14px;
      border-radius: 12px;
      font-weight: bold;
      white-space: nowrap;
    }

    /* HERO */
    .hero {
      margin: 18px;
      padding: 30px 20px;
      border-radius: 20px;
      background: linear-gradient(135deg, #fff1e6, #ffe0c2);
    }

    .hero h1 {
      font-size: 29px;
      margin-bottom: 10px;
    }

    .hero p {
      color: #555;
      line-height: 1.5;
      margin-bottom: 20px;
      font-size: 17px;
    }

    .shop-btn {
      display: inline-block;
      background: #ff6b00;
      color: white;
      padding: 13px 20px;
      border-radius: 11px;
      text-decoration: none;
      font-weight: bold;
    }

    /* SEARCH */
    .search-box {
      margin: 18px;
    }

    .search-box input {
      width: 100%;
      padding: 16px;
      border: 1px solid #ddd;
      border-radius: 14px;
      font-size: 16px;
      outline: none;
      background: white;
    }

    .search-box input:focus {
      border-color: #ff6b00;
    }

    /* SECTIONS */
    .section {
      padding: 10px 18px 25px;
    }

    .section h2 {
      margin-bottom: 16px;
      font-size: 25px;
    }

    /* CATEGORIES */
    .categories {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 14px;
    }

    .category {
      background: white;
      padding: 18px 10px;
      border-radius: 18px;
      text-align: center;
      box-shadow: 0 3px 12px rgba(0,0,0,0.06);
      transition: 0.2s;
      cursor: pointer;
      min-height: 155px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .category:hover {
      transform: translateY(-3px);
    }

    .category-image {
      width: 95px;
      height: 95px;
      border-radius: 22px;
      background: #fff1e6;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 55px;
      margin-bottom: 12px;
    }

    .category h3 {
      font-size: 17px;
      line-height: 1.3;
    }

    /* PRODUCTS */
    .products {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 14px;
    }

    .product {
      background: white;
      border-radius: 16px;
      padding: 12px;
      box-shadow: 0 3px 12px rgba(0,0,0,0.06);
    }

    .product-image {
      height: 120px;
      background: #fff4eb;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 50px;
      margin-bottom: 10px;
    }

    .product h3 {
      font-size: 15px;
      margin-bottom: 7px;
    }

    .price {
      font-size: 18px;
      font-weight: bold;
      color: #ff6b00;
      margin-bottom: 10px;
    }

    .add-btn {
      width: 100%;
      border: none;
      background: #ff6b00;
      color: white;
      padding: 10px;
      border-radius: 9px;
      font-weight: bold;
      cursor: pointer;
    }

    .add-btn:active {
      transform: scale(0.97);
    }

    /* DELIVERY */
    .delivery {
      margin: 5px 18px 25px;
      background: white;
      padding: 20px;
      border-radius: 16px;
      box-shadow: 0 3px 12px rgba(0,0,0,0.06);
    }

    .delivery h2 {
      margin-bottom: 8px;
    }

    .delivery p {
      color: #555;
      line-height: 1.5;
    }

    /* FOOTER */
    footer {
      background: #222;
      color: white;
      padding: 28px 18px;
      text-align: center;
      margin-top: 20px;
    }

    footer h3 {
      margin-bottom: 10px;
    }

    footer p {
      margin: 7px 0;
      color: #ddd;
    }

    /* DESKTOP */
    @media (min-width: 700px) {

      .categories {
        grid-template-columns: repeat(4, 1fr);
      }

      .products {
        grid-template-columns: repeat(4, 1fr);
      }

      .hero,
      .search-box,
      .section,
      .delivery {
        max-width: 1100px;
        margin-left: auto;
        margin-right: auto;
      }

      .category-image {
        width: 120px;
        height: 120px;
      }
    }
  </style>
</head>

<body>

  <!-- HEADER -->
  <header>
    <div class="header-top">

      <div class="logo">
        🏪 Shree Harikrishna Supermart
      </div>

      <div class="cart">
        🛒 Cart <span id="cartCount">0</span>
      </div>

    </div>
  </header>


  <!-- HERO -->
  <section class="hero">

    <h1>Your Local Supermart 🛒</h1>

    <p>
      Grocery, Bakery, Snacks & Beverages delivered to your doorstep.
    </p>

    <a href="#products" class="shop-btn">
      Shop Now
    </a>

  </section>


  <!-- SEARCH -->
  <div class="search-box">

    <input
      type="text"
      placeholder="🔎 Search grocery, bakery, snacks..."
    >

  </div>


  <!-- CATEGORIES -->
  <section class="section">

    <h2>Shop by Category</h2>

    <div class="categories">

      <div class="category">
        <div class="category-image">🍟</div>
        <h3>Chips &<br>Namkeen</h3>
      </div>

      <div class="category">
        <div class="category-image">🍫</div>
        <h3>Sweets &<br>Chocolates</h3>
      </div>

      <div class="category">
        <div class="category-image">🥤</div>
        <h3>Drinks &<br>Juices</h3>
      </div>

      <div class="category">
        <div class="category-image">☕</div>
        <h3>Tea &<br>Coffee</h3>
      </div>

      <div class="category">
        <div class="category-image">🍜</div>
        <h3>Instant<br>Food</h3>
      </div>

      <div class="category">
        <div class="category-image">🥫</div>
        <h3>Sauces &<br>Spreads</h3>
      </div>

      <div class="category">
        <div class="category-image">🍦</div>
        <h3>Ice Creams<br>& More</h3>
      </div>

      <div class="category">
        <div class="category-image">🍞</div>
        <h3>Bakery<br>Products</h3>
      </div>

    </div>

  </section>


  <!-- PRODUCTS -->
  <section class="section" id="products">

    <h2>Popular Products</h2>

    <div class="products">

      <div class="product">

        <div class="product-image">
          🍟
        </div>

        <h3>Lay's Chips</h3>

        <div class="price">
          ₹20
        </div>

        <button class="add-btn" onclick="addToCart()">
          Add to Cart
        </button>

      </div>


      <div class="product">

        <div class="product-image">
          🍪
        </div>

        <h3>Parle-G Biscuits</h3>

        <div class="price">
          ₹10
        </div>

        <button class="add-btn" onclick="addToCart()">
          Add to Cart
        </button>

      </div>


      <div class="product">

        <div class="product-image">
          🍞
        </div>

        <h3>Fresh Bread</h3>

        <div class="price">
          ₹40
        </div>

        <button class="add-btn" onclick="addToCart()">
          Add to Cart
        </button>

      </div>


      <div class="product">

        <div class="product-image">
          🍫
        </div>

        <h3>Chocolate</h3>

        <div class="price">
          ₹20
        </div>

        <button class="add-btn" onclick="addToCart()">
          Add to Cart
        </button>

      </div>

    </div>

  </section>


  <!-- DELIVERY -->
  <section class="delivery">

    <h2>🚴 Home Delivery</h2>

    <p>
      Order your daily essentials online and get them delivered
      to your doorstep.
    </p>

  </section>


  <!-- FOOTER -->
  <footer>

    <h3>Shree Harikrishna Supermart</h3>

    <p>Grocery • Bakery • Snacks • Beverages</p>

    <p>📍 Surat, Gujarat</p>

    <p>📞 Contact us for orders</p>

  </footer>


  <!-- CART SCRIPT -->
  <script>

    let cartCount = 0;

    function addToCart() {

      cartCount++;

      document.getElementById("cartCount").innerText = cartCount;

    }

  </script>

</body>
</html>
