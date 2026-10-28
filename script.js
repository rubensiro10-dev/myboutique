/**
 * Ruben's Boutique — Main JavaScript Application
 * High-performance, modular script powering the boutique catalog,
 * shopping cart drawer, live search & filtering, quick view modal,
 * order processing, WhatsApp integration, and interactive UI.
 */

// ==========================================================================
// 1. Boutique Product Catalog Data
// ==========================================================================
const BOUTIQUE_PRODUCTS = [
  {
    id: "prod-curtains-luxury",
    name: "Luxury Jacquard Blackout Curtains",
    category: "curtains",
    categoryLabel: "Curtains & Rods",
    price: 4500,
    oldPrice: 5800,
    rating: 4.9,
    reviews: 38,
    image: "curtain.webp",
    badge: "Bestseller",
    shortDesc: "Heavyweight premium drape with blackout lining and elegant metallic grommets.",
    description: "Upgrade your living space with our handcrafted luxury Jacquard curtains. Engineered with thermal insulation and superior blackout fabric, they keep rooms cool during hot days and retain warmth in the evening while adding royal sophistication.",
    features: ["100% Light Blackout", "Thermal & Noise Insulating", "Premium Jacquard Weave", "Custom length available"]
  },
  {
    id: "prod-curtain-rod-brass",
    name: "Double Antique Brass Curtain Rod Set",
    category: "curtains",
    categoryLabel: "Curtains & Rods",
    price: 3200,
    oldPrice: 3900,
    rating: 4.8,
    reviews: 24,
    image: "rod.webp",
    badge: "Durable",
    shortDesc: "Heavy-duty stainless steel core with antique brass finish and ornate finials.",
    description: "Designed to hold both heavy drapes and sheer curtains simultaneously. Features rust-resistant electroplating, adjustable telescoping brackets, and timeless sculpted finials.",
    features: ["Holds up to 25kg", "Telescopic 1.8m - 3.6m", "Includes brackets & anchors", "Double-track support"]
  },
  {
    id: "prod-egyptian-bedding",
    name: "Egyptian Cotton Duvet & Sheet Set",
    category: "beddings",
    categoryLabel: "Beddings",
    price: 6800,
    oldPrice: 8500,
    rating: 5.0,
    reviews: 52,
    image: "bedding.webp",
    badge: "Popular",
    shortDesc: "Silky 800-thread-count Egyptian cotton sheet set with matching duvet cover.",
    description: "Experience 5-star hotel luxury at home. Breathable, hypoallergenic, and ultra-soft against the skin. Includes 1 fitted sheet, 1 flat sheet, 1 duvet cover, and 4 embroidered pillowcases.",
    features: ["800 Thread Count", "100% Long-Staple Cotton", "Breathable & Hypoallergenic", "Colorfast & Wash-Durable"]
  },
  {
    id: "prod-velvet-cushions",
    name: "Plush Velvet Accent Pillow Set",
    category: "beddings",
    categoryLabel: "Beddings",
    price: 2400,
    oldPrice: 2900,
    rating: 4.7,
    reviews: 19,
    image: "pillows.webp",
    badge: "Trending",
    shortDesc: "Set of 2 luxury velvet throw pillows with hypoallergenic memory microfibers.",
    description: "Add texture and a pop of rich color to your sofa or bed. Made from stain-resistant dutch velvet with invisible zippers for easy cleaning.",
    features: ["Set of 2 Pillows (45x45 cm)", "Ultra-soft Dutch Velvet", "Concealed Zippers", "Plush Microfiber Filling"]
  },
  {
    id: "prod-persian-carpet",
    name: "Vintage Floral Persian Area Carpet",
    category: "carpets",
    categoryLabel: "Carpets & Mats",
    price: 12500,
    oldPrice: 15500,
    rating: 4.9,
    reviews: 41,
    image: "carpets.webp",
    badge: "Luxury Pick",
    shortDesc: "High-density woven silk-touch carpet with non-shed fibers and non-slip backing.",
    description: "A showpiece carpet combining timeless Middle Eastern artistry with modern easy-clean technology. Water-repellent, pet-friendly, and extraordinarily soft underfoot.",
    features: ["Size: 200cm x 300cm", "Non-shedding pile", "Stain & spill resistant", "Safe for heated floors"]
  },
  {
    id: "prod-coir-doormat",
    name: "Heavy-Duty Embossed Welcome Doormat",
    category: "carpets",
    categoryLabel: "Carpets & Mats",
    price: 1600,
    oldPrice: 2000,
    rating: 4.8,
    reviews: 29,
    image: "doormat.webp",
    badge: "Eco-Friendly",
    shortDesc: "Natural coconut coir mat with durable rubber backing for all-weather entryways.",
    description: "Scrapes off mud, grit, and moisture effortlessly before guests enter. Built with heavy vulcanized rubber base to prevent slipping and curling at the edges.",
    features: ["Natural coconut husk coir", "Non-skid rubber base", "All-weather outdoor/indoor", "Easy hose-down cleaning"]
  },
  {
    id: "prod-gold-necklace",
    name: "18K Gold Plated Statement Necklace",
    category: "jewellery",
    categoryLabel: "Jewellery",
    price: 3500,
    oldPrice: 4500,
    rating: 4.9,
    reviews: 33,
    image: "jewellery.webp",
    badge: "Handcrafted",
    shortDesc: "Tarnish-resistant 18K gold-plated pendant necklace with cubic zirconia accents.",
    description: "A signature statement piece designed for both evening galas and chic daily wear. Triple-layered electroplating ensures long-lasting brilliance without skin irritation.",
    features: ["Hypoallergenic & Lead/Nickel Free", "18K Gold PVD Coating", "Adjustable 45-50cm Chain", "Gift Box Included"]
  },
  {
    id: "prod-beaded-bracelet",
    name: "Artisan Gemstone Charm Bracelet Set",
    category: "jewellery",
    categoryLabel: "Jewellery",
    price: 2200,
    oldPrice: 2800,
    rating: 4.8,
    reviews: 27,
    image: "bracelets.webp",
    badge: "New Arrival",
    shortDesc: "Handcrafted natural stone beaded bracelets with gold-tone accents.",
    description: "Stackable luxury bracelets strung with genuine semi-precious stones and finished with durable elastic cords that comfortably fit any wrist size.",
    features: ["Set of 3 stackable bracelets", "Natural polished stones", "Durable stretch cord", "Handmade in Kenya"]
  }
];

// ==========================================================================
// 2. Shopping Cart Store (LocalStorage Synced)
// ==========================================================================
class CartStore {
  constructor() {
    this.storageKey = "rubens_boutique_cart";
    this.cart = this.loadCart();
    this.listeners = [];
  }

  loadCart() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn("Could not load cart from localStorage", e);
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.cart));
    } catch (e) {
      console.warn("Could not save cart to localStorage", e);
    }
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    listener(this.cart);
  }

  notify() {
    this.listeners.forEach((listener) => listener(this.cart));
  }

  addItem(productId, quantity = 1) {
    const existing = this.cart.find((item) => item.productId === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.cart.push({ productId, quantity });
    }
    this.saveCart();
    return true;
  }

  updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }
    const item = this.cart.find((item) => item.productId === productId);
    if (item) {
      item.quantity = quantity;
      this.saveCart();
    }
  }

  removeItem(productId) {
    this.cart = this.cart.filter((item) => item.productId !== productId);
    this.saveCart();
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
  }

  getCount() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  getSubtotal() {
    return this.cart.reduce((total, item) => {
      const product = BOUTIQUE_PRODUCTS.find((p) => p.id === item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  }

  getItemsWithDetails() {
    return this.cart
      .map((item) => {
        const product = BOUTIQUE_PRODUCTS.find((p) => p.id === item.productId);
        if (!product) return null;
        return {
          ...product,
          quantity: item.quantity,
          lineTotal: product.price * item.quantity
        };
      })
      .filter(Boolean);
  }
}

const boutiqueCart = new CartStore();

// ==========================================================================
// 3. Currency & Utility Helpers
// ==========================================================================
function formatCurrency(amount) {
  return "KSh " + Number(amount).toLocaleString("en-KE");
}

function showToast(message, type = "success") {
  let container = document.getElementById("boutique-toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "boutique-toast-container";
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast-item toast-${type}`;
  const icon = type === "success" 
    ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`
    : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;

  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span class="toast-text">${message}</span>
    <button class="toast-close" aria-label="Close">&times;</button>
  `;

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add("toast-visible");
  });

  const removeToast = () => {
    toast.classList.remove("toast-visible");
    setTimeout(() => toast.remove(), 300);
  };

  toast.querySelector(".toast-close").addEventListener("click", removeToast);
  setTimeout(removeToast, 4000);
}

// ==========================================================================
// 4. Cart Drawer UI Component
// ==========================================================================
function setupCartDrawer() {
  // If drawer does not exist in DOM, build it dynamically
  let drawer = document.getElementById("cartDrawer");
  if (!drawer) {
    drawer = document.createElement("div");
    drawer.id = "cartDrawer";
    drawer.className = "cart-drawer-overlay";
    drawer.innerHTML = `
      <div class="cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping Cart">
        <div class="cart-drawer-header">
          <div class="cart-title-wrapper">
            <h3>Your Shopping Cart</h3>
            <span class="cart-items-count" id="cartHeaderBadge">0 items</span>
          </div>
          <button class="cart-close-btn" id="closeCartBtn" aria-label="Close cart">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <div class="cart-drawer-body" id="cartDrawerItems">
          <!-- Rendered items go here -->
        </div>

        <div class="cart-drawer-footer" id="cartDrawerFooter">
          <div class="cart-summary-line">
            <span>Subtotal:</span>
            <span class="cart-subtotal-price" id="cartSubtotal">KSh 0</span>
          </div>
          <p class="cart-shipping-note">Free standard delivery in Nairobi & Kajiado on orders over KSh 5,000.</p>
          <div class="cart-action-buttons">
            <a href="order.html" class="btn btn-primary btn-block checkout-btn" id="proceedCheckoutBtn">
              Proceed to Order Form
            </a>
            <button class="btn btn-outline btn-block" id="continueShoppingBtn">Continue Browsing</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(drawer);
  }

  const closeCartBtn = document.getElementById("closeCartBtn");
  const continueShoppingBtn = document.getElementById("continueShoppingBtn");

  const openDrawer = () => {
    drawer.classList.add("active");
    document.body.classList.add("modal-open");
  };

  const closeDrawer = () => {
    drawer.classList.remove("active");
    document.body.classList.remove("modal-open");
  };

  if (closeCartBtn) closeCartBtn.addEventListener("click", closeDrawer);
  if (continueShoppingBtn) continueShoppingBtn.addEventListener("click", closeDrawer);

  drawer.addEventListener("click", (e) => {
    if (e.target === drawer) closeDrawer();
  });

  // Attach all cart toggle triggers (buttons with .cart-trigger)
  document.querySelectorAll(".cart-toggle-btn, .cart-nav-link").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openDrawer();
    });
  });

  // Subscribe cart store to update drawer UI
  boutiqueCart.subscribe((cart) => {
    renderCartDrawerUI(cart);
    updateCartBadges(boutiqueCart.getCount());
  });

  // Expose global opener
  window.openBoutiqueCart = openDrawer;
  window.closeBoutiqueCart = closeDrawer;
}

function updateCartBadges(count) {
  document.querySelectorAll(".cart-count-badge").forEach((badge) => {
    badge.textContent = count;
    badge.style.display = count > 0 ? "inline-flex" : "none";
  });
  const headerBadge = document.getElementById("cartHeaderBadge");
  if (headerBadge) {
    headerBadge.textContent = `${count} ${count === 1 ? "item" : "items"}`;
  }
}

function renderCartDrawerUI() {
  const container = document.getElementById("cartDrawerItems");
  const footer = document.getElementById("cartDrawerFooter");
  const subtotalEl = document.getElementById("cartSubtotal");
  if (!container) return;

  const items = boutiqueCart.getItemsWithDetails();

  if (items.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-state">
        <div class="cart-empty-icon">🛍️</div>
        <h4>Your cart is empty</h4>
        <p>Explore Ruben's boutique collection of luxury curtains, beddings, carpets, and jewellery.</p>
        <a href="shop.html" class="btn btn-primary" onclick="window.closeBoutiqueCart()">Start Shopping</a>
      </div>
    `;
    if (footer) footer.style.display = "none";
    return;
  }

  if (footer) footer.style.display = "block";
  if (subtotalEl) subtotalEl.textContent = formatCurrency(boutiqueCart.getSubtotal());

  container.innerHTML = items
    .map(
      (item) => `
    <div class="cart-item-row" data-id="${item.id}">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='curtain.webp'">
      <div class="cart-item-info">
        <h5 class="cart-item-title">${item.name}</h5>
        <span class="cart-item-price">${formatCurrency(item.price)}</span>
        <div class="cart-qty-control">
          <button class="qty-btn minus-btn" data-id="${item.id}" aria-label="Decrease quantity">−</button>
          <span class="qty-number">${item.quantity}</span>
          <button class="qty-btn plus-btn" data-id="${item.id}" aria-label="Increase quantity">+</button>
          <button class="item-remove-btn" data-id="${item.id}" title="Remove item" aria-label="Remove item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
          </button>
        </div>
      </div>
    </div>
  `
    )
    .join("");

  // Attach event listeners for controls
  container.querySelectorAll(".plus-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      const item = boutiqueCart.cart.find((i) => i.productId === id);
      if (item) boutiqueCart.updateQuantity(id, item.quantity + 1);
    });
  });

  container.querySelectorAll(".minus-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      const item = boutiqueCart.cart.find((i) => i.productId === id);
      if (item) boutiqueCart.updateQuantity(id, item.quantity - 1);
    });
  });

  container.querySelectorAll(".item-remove-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      boutiqueCart.removeItem(id);
      showToast("Item removed from cart", "info");
    });
  });
}

// ==========================================================================
// 5. Quick View Product Modal
// ==========================================================================
function setupQuickViewModal() {
  let modal = document.getElementById("quickViewModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "quickViewModal";
    modal.className = "modal-overlay";
    modal.innerHTML = `
      <div class="modal-dialog quickview-dialog" role="dialog" aria-modal="true">
        <button class="modal-close-btn" id="closeQuickViewBtn" aria-label="Close modal">&times;</button>
        <div class="quickview-body" id="quickViewContent">
          <!-- Dynamically populated -->
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  const closeBtn = document.getElementById("closeQuickViewBtn");
  const closeModal = () => {
    modal.classList.remove("active");
    document.body.classList.remove("modal-open");
  };

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  window.openQuickView = function (productId) {
    const product = BOUTIQUE_PRODUCTS.find((p) => p.id === productId);
    if (!product) return;

    const content = document.getElementById("quickViewContent");
    content.innerHTML = `
      <div class="quickview-grid">
        <div class="quickview-media">
          <img src="${product.image}" alt="${product.name}" class="quickview-main-image" onerror="this.src='curtain.webp'">
          ${product.badge ? `<span class="product-badge badge-overlay">${product.badge}</span>` : ""}
        </div>
        <div class="quickview-details">
          <span class="product-category-tag">${product.categoryLabel}</span>
          <h2 class="quickview-title">${product.name}</h2>
          
          <div class="quickview-rating">
            <div class="stars">★★★★★</div>
            <span class="rating-text">${product.rating} (${product.reviews} customer reviews)</span>
          </div>

          <div class="quickview-pricing">
            <span class="current-price">${formatCurrency(product.price)}</span>
            ${product.oldPrice ? `<span class="old-price">${formatCurrency(product.oldPrice)}</span>` : ""}
            <span class="save-tag">In Stock & Ready for Delivery</span>
          </div>

          <p class="quickview-description">${product.description}</p>

          <div class="quickview-features">
            <h4>Key Highlights:</h4>
            <ul>
              ${product.features.map((f) => `<li><span class="bullet-check">✓</span> ${f}</li>`).join("")}
            </ul>
          </div>

          <div class="quickview-actions">
            <div class="quantity-selector">
              <button type="button" class="qv-qty-btn" id="qvMinusBtn">−</button>
              <input type="number" id="qvQtyInput" value="1" min="1" max="50">
              <button type="button" class="qv-qty-btn" id="qvPlusBtn">+</button>
            </div>
            <button class="btn btn-primary qv-add-btn" id="qvAddToCartBtn">
              Add to Cart
            </button>
            <a href="order.html?item=${encodeURIComponent(product.name)}" class="btn btn-secondary qv-order-btn">
              Direct Order
            </a>
          </div>

          <div class="quickview-trust-meta">
            <span>🛡️ Quality Guaranteed</span>
            <span>🚚 Same Day Dispatch in Nairobi</span>
            <span>🔄 7-Day Exchange</span>
          </div>
        </div>
      </div>
    `;

    // Hook up modal quantity buttons
    const qvMinus = document.getElementById("qvMinusBtn");
    const qvPlus = document.getElementById("qvPlusBtn");
    const qvInput = document.getElementById("qvQtyInput");
    const qvAdd = document.getElementById("qvAddToCartBtn");

    if (qvMinus && qvPlus && qvInput) {
      qvMinus.addEventListener("click", () => {
        let val = parseInt(qvInput.value, 10) || 1;
        if (val > 1) qvInput.value = val - 1;
      });
      qvPlus.addEventListener("click", () => {
        let val = parseInt(qvInput.value, 10) || 1;
        qvInput.value = val + 1;
      });
    }

    if (qvAdd && qvInput) {
      qvAdd.addEventListener("click", () => {
        const qty = parseInt(qvInput.value, 10) || 1;
        boutiqueCart.addItem(product.id, qty);
        closeModal();
        showToast(`Added ${qty} × ${product.name} to your cart!`);
        window.openBoutiqueCart();
      });
    }

    modal.classList.add("active");
    document.body.classList.add("modal-open");
  };
}

// ==========================================================================
// 6. Shop Catalog & Filtering Logic
// ==========================================================================
function initShopCatalog() {
  const gridContainer = document.getElementById("shopProductsGrid");
  if (!gridContainer) return;

  const searchInput = document.getElementById("shopSearchInput");
  const sortSelect = document.getElementById("shopSortSelect");
  const categoryFilters = document.querySelectorAll(".filter-pill");
  const resultsCount = document.getElementById("shopResultsCount");

  let activeCategory = "all";
  let activeSearch = "";
  let activeSort = "featured";

  // Check URL params for pre-selected category
  const urlParams = new URLSearchParams(window.location.search);
  const paramCat = urlParams.get("category");
  if (paramCat) {
    activeCategory = paramCat.toLowerCase();
    categoryFilters.forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-category") === activeCategory);
    });
  }

  function getFilteredProducts() {
    let list = [...BOUTIQUE_PRODUCTS];

    // Filter by Category
    if (activeCategory !== "all") {
      list = list.filter((p) => p.category === activeCategory);
    }

    // Filter by Search
    if (activeSearch.trim()) {
      const q = activeSearch.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDesc.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q)
      );
    }

    // Sort
    if (activeSort === "price-low") {
      list.sort((a, b) => a.price - b.price);
    } else if (activeSort === "price-high") {
      list.sort((a, b) => b.price - a.price);
    } else if (activeSort === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    } else if (activeSort === "name-asc") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }

  function renderGrid() {
    const products = getFilteredProducts();

    if (resultsCount) {
      resultsCount.textContent = `Showing ${products.length} of ${BOUTIQUE_PRODUCTS.length} luxury items`;
    }

    if (products.length === 0) {
      gridContainer.innerHTML = `
        <div class="no-products-found">
          <div class="no-results-icon">🔍</div>
          <h3>No matching items found</h3>
          <p>Try refining your search keyword or clearing the active category filters.</p>
          <button class="btn btn-outline" id="resetFiltersBtn">Reset All Filters</button>
        </div>
      `;
      const resetBtn = document.getElementById("resetFiltersBtn");
      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          activeCategory = "all";
          activeSearch = "";
          if (searchInput) searchInput.value = "";
          categoryFilters.forEach((btn) => btn.classList.toggle("active", btn.getAttribute("data-category") === "all"));
          renderGrid();
        });
      }
      return;
    }

    gridContainer.innerHTML = products
      .map(
        (product) => `
      <article class="product-card" data-id="${product.id}">
        <div class="product-card-media">
          <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='curtain.webp'">
          ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
          <div class="product-card-overlay">
            <button class="quick-view-action" onclick="window.openQuickView('${product.id}')" title="Quick Preview">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              Quick View
            </button>
          </div>
        </div>
        <div class="product-card-content">
          <span class="product-category">${product.categoryLabel}</span>
          <h3 class="product-title" onclick="window.openQuickView('${product.id}')">${product.name}</h3>
          <p class="product-short-desc">${product.shortDesc}</p>
          
          <div class="product-rating">
            <span class="stars">★★★★★</span>
            <span class="score">${product.rating}</span>
            <span class="count">(${product.reviews})</span>
          </div>

          <div class="product-card-footer">
            <div class="pricing-block">
              <span class="price-current">${formatCurrency(product.price)}</span>
              ${product.oldPrice ? `<span class="price-old">${formatCurrency(product.oldPrice)}</span>` : ""}
            </div>
            <button class="btn btn-sm btn-primary add-to-cart-action" data-id="${product.id}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              Add
            </button>
          </div>
        </div>
      </article>
    `
      )
      .join("");

    // Attach Add to cart clicks
    gridContainer.querySelectorAll(".add-to-cart-action").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-id");
        const prod = BOUTIQUE_PRODUCTS.find((p) => p.id === id);
        if (prod) {
          boutiqueCart.addItem(prod.id, 1);
          showToast(`"${prod.name}" added to cart!`);
          // Animated button feedback
          btn.innerHTML = `✓ Added`;
          btn.classList.add("btn-added");
          setTimeout(() => {
            btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg> Add`;
            btn.classList.remove("btn-added");
          }, 1200);
        }
      });
    });
  }

  // Category filters
  categoryFilters.forEach((button) => {
    button.addEventListener("click", () => {
      categoryFilters.forEach((b) => b.classList.remove("active"));
      button.classList.add("active");
      activeCategory = button.getAttribute("data-category");
      renderGrid();
    });
  });

  // Search input debounced
  let debounceTimeout;
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        activeSearch = e.target.value;
        renderGrid();
      }, 250);
    });
  }

  // Sort select
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      activeSort = e.target.value;
      renderGrid();
    });
  }

  // Initial render
  renderGrid();
}

// ==========================================================================
// 7. Order Form & Checkout Integration
// ==========================================================================
function initOrderForm() {
  const form = document.getElementById("boutiqueOrderForm");
  if (!form) return;

  const cartSummaryBox = document.getElementById("orderCartSummary");
  const itemSelect = document.getElementById("item");
  const dateInput = document.getElementById("date");

  // Prevent past dates in date picker
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.min = today;
    if (!dateInput.value) dateInput.value = today;
  }

  // Pre-fill selected item from URL query parameter if available
  const urlParams = new URLSearchParams(window.location.search);
  const requestedItem = urlParams.get("item");
  if (requestedItem && itemSelect) {
    for (let opt of itemSelect.options) {
      if (opt.text.toLowerCase().includes(requestedItem.toLowerCase())) {
        opt.selected = true;
        break;
      }
    }
  }

  // Render Cart sync summary if cart has items
  function updateOrderCartDisplay() {
    if (!cartSummaryBox) return;
    const items = boutiqueCart.getItemsWithDetails();

    if (items.length > 0) {
      const subtotal = boutiqueCart.getSubtotal();
      const shipping = subtotal >= 5000 ? 0 : 500;
      const total = subtotal + shipping;

      cartSummaryBox.innerHTML = `
        <div class="order-summary-card">
          <div class="order-summary-header">
            <h4>Cart Order Breakdown (${items.length} items)</h4>
            <a href="shop.html" class="edit-cart-link">Modify Items</a>
          </div>
          <div class="order-summary-items">
            ${items
              .map(
                (i) => `
              <div class="summary-item-line">
                <span class="item-title">${i.quantity}× ${i.name}</span>
                <span class="item-price">${formatCurrency(i.lineTotal)}</span>
              </div>
            `
              )
              .join("")}
          </div>
          <div class="summary-totals">
            <div class="total-row">
              <span>Subtotal:</span>
              <span>${formatCurrency(subtotal)}</span>
            </div>
            <div class="total-row">
              <span>Delivery (Nairobi / Kajiado):</span>
              <span>${shipping === 0 ? "FREE" : formatCurrency(shipping)}</span>
            </div>
            <div class="total-row total-highlight">
              <strong>Grand Total:</strong>
              <strong class="grand-total-val">${formatCurrency(total)}</strong>
            </div>
          </div>
          <div class="order-cart-notice">
            <span>✨ Your cart items will be attached to this order request automatically.</span>
          </div>
        </div>
      `;
      cartSummaryBox.style.display = "block";
    } else {
      cartSummaryBox.innerHTML = `
        <div class="order-summary-card empty-cart-note">
          <p>💡 Tip: You can browse our <a href="shop.html">Shop Catalog</a> and add specific items to your cart, or specify a custom request below.</p>
        </div>
      `;
      cartSummaryBox.style.display = "block";
    }
  }

  boutiqueCart.subscribe(updateOrderCartDisplay);

  // Form submit handler with validation, Order Reference ID generator, and WhatsApp integration
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Field extraction & validation
    const nameEl = document.getElementById("name");
    const phoneEl = document.getElementById("phone");
    const emailEl = document.getElementById("email");
    const dateEl = document.getElementById("date");
    const itemEl = document.getElementById("item");
    const locationEl = document.getElementById("location");
    const notesEl = document.getElementById("notes");
    const paymentEl = document.querySelector('input[name="paymentMethod"]:checked');

    let isValid = true;

    // Helper for validation errors
    const validateField = (el, condition, errorMsg) => {
      const parent = el.closest(".form-group");
      let errEl = parent ? parent.querySelector(".field-error-msg") : null;
      if (!condition) {
        if (!errEl && parent) {
          errEl = document.createElement("span");
          errEl.className = "field-error-msg";
          parent.appendChild(errEl);
        }
        if (errEl) errEl.textContent = errorMsg;
        el.classList.add("input-error");
        isValid = false;
      } else {
        if (errEl) errEl.textContent = "";
        el.classList.remove("input-error");
      }
    };

    validateField(nameEl, nameEl.value.trim().length >= 2, "Please enter your full name.");
    
    // Kenyan/International Phone validation
    const phoneVal = phoneEl.value.trim();
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,15}$/;
    validateField(phoneEl, phoneRegex.test(phoneVal) && phoneVal.length >= 9, "Please enter a valid phone number (e.g. 0712345678 or +254...).");

    // Email validation
    const emailVal = emailEl.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    validateField(emailEl, emailRegex.test(emailVal), "Please enter a valid email address.");

    // Date validation
    validateField(dateEl, !!dateEl.value, "Please select your preferred delivery or viewing date.");

    // Item selection
    const cartItems = boutiqueCart.getItemsWithDetails();
    if (cartItems.length === 0) {
      validateField(itemEl, itemEl.value !== "", "Please select an item category or add products to your cart.");
    }

    if (!isValid) {
      showToast("Please correct the highlighted fields before submitting.", "error");
      return;
    }

    // Generate Unique Order Reference
    const orderId = "RB-" + Math.floor(100000 + Math.random() * 900000);
    const orderData = {
      orderId,
      name: nameEl.value.trim(),
      phone: phoneEl.value.trim(),
      email: emailEl.value.trim(),
      date: dateEl.value,
      categoryItem: itemEl ? itemEl.value : "Boutique Items",
      location: locationEl ? locationEl.value.trim() : "Not specified",
      notes: notesEl ? notesEl.value.trim() : "",
      paymentMethod: paymentEl ? paymentEl.value : "M-PESA / Cash on Delivery",
      cartItems: cartItems,
      subtotal: boutiqueCart.getSubtotal(),
      datePlaced: new Date().toLocaleString()
    };

    // Save order in local storage for order confirmation persistence
    try {
      const existingOrders = JSON.parse(localStorage.getItem("rubens_boutique_orders") || "[]");
      existingOrders.unshift(orderData);
      localStorage.setItem("rubens_boutique_orders", JSON.stringify(existingOrders));
    } catch (e) {
      console.warn("Could not save order locally", e);
    }

    // Display Confirmation Modal
    showOrderSuccessModal(orderData);

    // Clear cart once order is confirmed
    boutiqueCart.clearCart();
    form.reset();
  });
}

function showOrderSuccessModal(order) {
  let modal = document.getElementById("orderSuccessModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "orderSuccessModal";
    modal.className = "modal-overlay active";
    document.body.appendChild(modal);
  }

  // Build WhatsApp pre-filled text
  let waSummary = `Hello Ruben's Boutique, I just placed an order on your website!%0A%0A`;
  waSummary += `*Order Ref:* ${order.orderId}%0A`;
  waSummary += `*Customer:* ${order.name}%0A`;
  waSummary += `*Phone:* ${order.phone}%0A`;
  waSummary += `*Delivery Date:* ${order.date}%0A`;
  waSummary += `*Delivery Area:* ${order.location}%0A`;
  if (order.cartItems && order.cartItems.length > 0) {
    waSummary += `%0A*Items Ordered:*%0A`;
    order.cartItems.forEach((i) => {
      waSummary += `• ${i.quantity}x ${i.name} (KSh ${i.lineTotal.toLocaleString()})%0A`;
    });
    waSummary += `*Total Amount:* KSh ${order.subtotal.toLocaleString()}%0A`;
  } else {
    waSummary += `*Requested Category:* ${order.categoryItem}%0A`;
  }
  if (order.notes) waSummary += `*Special Requests:* ${order.notes}%0A`;

  const waUrl = `https://wa.me/254712345678?text=${waSummary}`;

  modal.innerHTML = `
    <div class="modal-dialog order-confirm-dialog" role="dialog" aria-modal="true">
      <div class="order-confirm-badge">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <h2>Order Successfully Reserved!</h2>
      <p class="order-ref-code">Reference Code: <strong>${order.orderId}</strong></p>
      <p class="order-confirm-desc">
        Thank you, <strong>${order.name}</strong>. We have received your order request for 
        <strong>${order.date}</strong>. Our customer care representative will contact you via 
        <strong>${order.phone}</strong> to confirm delivery & tailoring specifics.
      </p>

      <div class="order-modal-actions">
        <a href="${waUrl}" target="_blank" rel="noopener" class="btn btn-whatsapp btn-block">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.299.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.2.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.174.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.13.332.203.043.072.043.419-.101.824z"/></svg>
          Confirm Quickly via WhatsApp
        </a>
        <button class="btn btn-outline btn-block" id="closeOrderSuccessBtn">Close & Continue Shopping</button>
      </div>
    </div>
  `;

  modal.classList.add("active");
  document.body.classList.add("modal-open");

  document.getElementById("closeOrderSuccessBtn").addEventListener("click", () => {
    modal.classList.remove("active");
    document.body.classList.remove("modal-open");
    window.location.href = "shop.html";
  });
}

// ==========================================================================
// 8. Contact Form & FAQ Accordion
// ==========================================================================
function initContactPage() {
  const form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("fullname") || document.getElementById("name");
      const email = document.getElementById("email");
      const message = document.getElementById("message");

      if (!name || !name.value.trim()) {
        showToast("Please enter your name.", "error");
        return;
      }
      if (!email || !email.value.trim() || !email.value.includes("@")) {
        showToast("Please enter a valid email address.", "error");
        return;
      }
      if (!message || !message.value.trim()) {
        showToast("Please enter your message.", "error");
        return;
      }

      showToast("Thank you! Your message has been sent. We'll reply within 24 hours.", "success");
      form.reset();
    });
  }

  // FAQ Accordion
  const accordionItems = document.querySelectorAll(".faq-item");
  accordionItems.forEach((item) => {
    const header = item.querySelector(".faq-question");
    if (header) {
      header.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");
        // Close other items
        accordionItems.forEach((other) => other.classList.remove("open"));
        if (!isOpen) {
          item.classList.add("open");
        }
      });
    }
  });
}

// ==========================================================================
// 9. Mobile Navigation & Sticky Header & Global Polish
// ==========================================================================
function initNavigation() {
  const mobileToggle = document.getElementById("mobileNavToggle");
  const navMenu = document.querySelector("nav");
  const header = document.querySelector("header");

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      mobileToggle.classList.toggle("open");
      navMenu.classList.toggle("nav-open");
      document.body.classList.toggle("nav-active");
    });

    // Close menu when clicking link
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileToggle.classList.remove("open");
        navMenu.classList.remove("nav-open");
        document.body.classList.remove("nav-active");
      });
    });
  }

  // Sticky header shadow effect
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 30) {
        header.classList.add("header-scrolled");
      } else {
        header.classList.remove("header-scrolled");
      }
    });
  }

  // Newsletter subscription
  const newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      if (input && input.value.includes("@")) {
        showToast("✨ Subscribed to Ruben's Boutique VIP newsletter!", "success");
        input.value = "";
      } else {
        showToast("Please enter a valid email address.", "error");
      }
    });
  }

  // Back to top floating button
  let backToTopBtn = document.getElementById("backToTopBtn");
  if (!backToTopBtn) {
    backToTopBtn = document.createElement("button");
    backToTopBtn.id = "backToTopBtn";
    backToTopBtn.className = "back-to-top";
    backToTopBtn.setAttribute("aria-label", "Scroll to top");
    backToTopBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>`;
    document.body.appendChild(backToTopBtn);

    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

// ==========================================================================
// 10. Application Entry Point
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  setupCartDrawer();
  setupQuickViewModal();
  initNavigation();
  initShopCatalog();
  initOrderForm();
  initContactPage();
});
