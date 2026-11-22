// BrewBoard - Touch-Friendly Kiosk Menu & Student Ordering Interface

import { CATEGORIES, LUNCH_SLOTS } from './data.js';
import { state } from './state.js';
import { audio } from './audio.js';

export class KioskController {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.selectedCategory = 'all';
    this.searchQuery = '';
    this.cart = [];
    this.selectedSlot = 'now';
    this.customizingItem = null;
    this.activeReceiptOrder = null;
    this.autoApproveTimer = null;

    this.init();
  }

  init() {
    this.render();
    this.bindEvents();

    // Subscribe to state changes (stock toggle, wallet change, order updates)
    state.subscribe((event) => {
      if (event.type === 'STOCK_TOGGLED' || event.type === 'DEMO_RESET') {
        this.renderMenuGrid();
      } else if (event.type === 'WALLET_UPDATED') {
        this.updateWalletBadge();
      } else if (event.type === 'ORDER_STATUS_CHANGED' && this.activeReceiptOrder) {
        if (this.activeReceiptOrder.id === event.orderId) {
          this.activeReceiptOrder = event.order;
          this.renderReceiptModal();
        }
      }
    });

    // Check if there was a recent order in this session to display
    const myOrders = state.getMyTokenOrders();
    if (myOrders.length > 0 && myOrders[0].status !== 'COLLECTED') {
      this.activeReceiptOrder = myOrders[0];
    }
  }

  render() {
    this.container.innerHTML = `
      <div class="kiosk-layout flex flex-col min-h-screen bg-slate-950 text-slate-100 pb-28">
        
        <!-- Kiosk Header Bar -->
        <header class="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 sm:px-6 shadow-lg">
          <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <div class="flex items-center gap-3">
              <div class="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20 text-white font-black text-xl tracking-tighter">
                BB
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <h1 class="font-extrabold text-xl sm:text-2xl tracking-tight text-white flex items-center gap-2">
                    BrewBoard <span class="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 font-semibold uppercase tracking-wider">ZeroQueue</span>
                  </h1>
                </div>
                <p class="text-xs text-slate-400">Campus Express Food & Beverage Kiosk • Tap, Pay & Collect</p>
              </div>
            </div>

            <!-- Header Quick Stats & Active Token Banner -->
            <div class="flex items-center gap-3">
              <div id="walletBadge" class="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs">
                <!-- Dynamically populated -->
              </div>
              ${this.activeReceiptOrder ? `
                <button id="btnOpenActiveReceipt" class="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-semibold hover:bg-emerald-500/25 transition">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  Active Token: <strong class="text-white">${this.activeReceiptOrder.token}</strong>
                </button>
              ` : ''}
            </div>
          </div>
        </header>

        <!-- Kiosk Rush Hour Alert / Info Banner -->
        <div class="bg-gradient-to-r from-orange-950/60 via-amber-950/40 to-slate-900 border-b border-amber-900/30 px-4 py-2 text-xs">
          <div class="max-w-7xl mx-auto flex items-center justify-between gap-4 text-amber-200/90">
            <div class="flex items-center gap-2">
              <span class="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span><strong>15-Min Break Rush Mode Active:</strong> Quick 30-second guest checkout enabled. No login needed!</span>
            </div>
            <div class="hidden md:flex items-center gap-3 text-slate-400">
              <span>Avg Prep Time: <strong class="text-amber-300">~3.5 mins</strong></span>
              <span>•</span>
              <span>Campus Subsidized: <strong class="text-emerald-400">0% Extra Tax</strong></span>
            </div>
          </div>
        </div>

        <main class="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full flex-1">
          
          <!-- Category Pills & Search -->
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            
            <!-- Category Tabs -->
            <div class="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none no-scrollbar">
              ${CATEGORIES.map(cat => `
                <button 
                  data-cat="${cat.id}"
                  class="cat-pill whitespace-nowrap px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 border ${
                    this.selectedCategory === cat.id 
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white border-transparent shadow-lg shadow-orange-500/25 scale-[1.02]' 
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
                  }"
                >
                  <span>${cat.label}</span>
                </button>
              `).join('')}
            </div>

            <!-- Search input -->
            <div class="relative w-full md:w-72">
              <input 
                id="kioskSearchInput"
                type="text" 
                placeholder="Search Samosa, Chai, Maggi..." 
                value="${this.searchQuery}"
                class="w-full px-4 py-2.5 pl-10 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 transition"
              />
              <svg class="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              ${this.searchQuery ? `
                <button id="btnClearSearch" class="absolute right-3 top-2.5 text-slate-400 hover:text-white">
                  ✕
                </button>
              ` : ''}
            </div>

          </div>

          <!-- Menu Cards Grid -->
          <div id="kioskMenuGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            <!-- Dynamically populated -->
          </div>

        </main>

        <!-- Sticky Bottom Cart Bar (Appears when cart has items) -->
        <div id="stickyCartBar" class="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 px-4 py-3 sm:px-6 shadow-2xl transition-all duration-300 ${this.cart.length === 0 ? 'translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}">
          <div class="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div class="flex items-center gap-3 cursor-pointer" id="btnToggleCartDrawer">
              <div class="relative w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                </svg>
                <span id="cartCountBadge" class="absolute -top-1.5 -right-1.5 bg-amber-400 text-slate-950 font-black text-xs px-2 py-0.5 rounded-full shadow-md">
                  0
                </span>
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-xs uppercase tracking-wider text-slate-400 font-semibold">Your Quick Order</span>
                  <span class="text-xs text-orange-400 font-medium">Tap to review ↗</span>
                </div>
                <div class="text-xl font-black text-white">
                  ₹<span id="cartTotalSum">0</span>
                  <span class="text-xs text-slate-400 font-normal ml-1">(incl. add-ons)</span>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <button id="btnQuickPayDirect" class="px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 active:scale-95 text-white font-bold text-base shadow-lg shadow-orange-500/25 flex items-center gap-2 transition">
                <span>⚡ Quick Pay & Token</span>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Customizer Modal Container -->
        <div id="customizerModalContainer"></div>

        <!-- Cart Drawer Modal Container -->
        <div id="cartDrawerContainer"></div>

        <!-- Mock UPI / Card Payment Modal Container -->
        <div id="paymentModalContainer"></div>

        <!-- Digital Pickup Token Receipt Modal Container -->
        <div id="receiptModalContainer"></div>

      </div>
    `;

    this.renderMenuGrid();
    this.updateWalletBadge();
    this.renderCartUI();
  }

  updateWalletBadge() {
    const badge = document.getElementById('walletBadge');
    if (!badge) return;
    const wallet = state.getWallet();
    badge.innerHTML = `
      <div class="w-6 h-6 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-xs">
        ID
      </div>
      <div>
        <div class="text-[10px] text-slate-400 font-semibold leading-tight">${wallet.studentName}</div>
        <div class="text-xs font-bold text-emerald-400 leading-tight">Bal: ₹${wallet.balance.toFixed(2)}</div>
      </div>
    `;
  }

  renderMenuGrid() {
    const grid = document.getElementById('kioskMenuGrid');
    if (!grid) return;

    const menu = state.getMenu();
    let filtered = menu;

    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(i => i.category === this.selectedCategory);
    }

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      filtered = filtered.filter(i => 
        i.name.toLowerCase().includes(q) || 
        i.description.toLowerCase().includes(q) ||
        (i.tag && i.tag.toLowerCase().includes(q))
      );
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-16 text-center text-slate-400">
          <div class="text-4xl mb-3">🔍</div>
          <h3 class="text-lg font-bold text-white mb-1">No items found</h3>
          <p class="text-sm">Try searching for something else like "Chai", "Puff", or "Samosa"</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(item => {
      const isSoldOut = !item.inStock;
      const cartItem = this.cart.find(c => c.id === item.id);
      const cartCount = cartItem ? cartItem.quantity : 0;

      return `
        <div class="group relative rounded-3xl bg-slate-900 border ${isSoldOut ? 'border-red-950/60 opacity-60' : 'border-slate-800 hover:border-slate-700'} overflow-hidden flex flex-col shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/5">
          
          <!-- Image Section -->
          <div class="relative h-44 w-full bg-slate-800 overflow-hidden">
            <img 
              src="${item.image}" 
              alt="${item.name}" 
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${isSoldOut ? 'grayscale' : ''}"
              loading="lazy"
              onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60'"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
            
            <!-- Veg & Tag Badges -->
            <div class="absolute top-3 left-3 flex items-center gap-1.5">
              <span class="w-5 h-5 rounded-md bg-slate-900/80 backdrop-blur-md border border-slate-700/80 flex items-center justify-center p-0.5">
                <span class="w-2.5 h-2.5 rounded-full ${item.isVeg ? 'bg-emerald-500' : 'bg-red-500'}"></span>
              </span>
              ${item.tag ? `
                <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-orange-500/90 text-white backdrop-blur-md shadow-sm">
                  ${item.tag}
                </span>
              ` : ''}
            </div>

            <!-- Prep Time Badge -->
            <div class="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-md bg-slate-900/85 backdrop-blur-md text-[11px] font-semibold text-amber-300 border border-slate-700">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>${item.prepTime}m</span>
            </div>

            <!-- Out of Stock Overlay -->
            ${isSoldOut ? `
              <div class="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center">
                <span class="px-3 py-1 rounded-full bg-red-600 text-white font-extrabold text-xs uppercase tracking-widest shadow-lg">
                  Sold Out
                </span>
              </div>
            ` : ''}
          </div>

          <!-- Content Section -->
          <div class="p-4 flex-1 flex flex-col justify-between">
            <div>
              <div class="flex items-start justify-between gap-2 mb-1">
                <h3 class="font-bold text-base text-white group-hover:text-orange-400 transition leading-snug">
                  ${item.name}
                </h3>
              </div>
              <p class="text-xs text-slate-400 line-clamp-2 mb-3">
                ${item.description}
              </p>
            </div>

            <div class="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
              <div>
                <span class="text-xs text-slate-500">From</span>
                <div class="text-lg font-black text-white">₹${item.price}</div>
              </div>

              ${isSoldOut ? `
                <button disabled class="px-4 py-2 rounded-xl bg-slate-800 text-slate-500 font-semibold text-xs cursor-not-allowed">
                  Unavailable
                </button>
              ` : `
                <div class="flex items-center gap-1.5">
                  <button 
                    data-customize="${item.id}"
                    class="btn-customize px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 font-semibold text-xs border border-slate-700 transition flex items-center gap-1"
                  >
                    <span>Custom</span>
                    <span class="text-[10px] text-orange-400">+</span>
                  </button>
                  <button 
                    data-quickadd="${item.id}"
                    class="btn-quick-add px-3.5 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 active:scale-95 text-white font-bold text-xs shadow-md shadow-orange-500/20 transition flex items-center gap-1"
                  >
                    <span>+ Add</span>
                  </button>
                </div>
              `}
            </div>

          </div>

        </div>
      `;
    }).join('');
  }

  bindEvents() {
    // Category pill clicks
    this.container.addEventListener('click', (e) => {
      const catBtn = e.target.closest('.cat-pill');
      if (catBtn) {
        this.selectedCategory = catBtn.dataset.cat;
        this.render();
        audio.playTapSound();
        return;
      }

      // Quick Add (1 tap, default options)
      const quickAddBtn = e.target.closest('.btn-quick-add');
      if (quickAddBtn) {
        const itemId = quickAddBtn.dataset.quickadd;
        this.handleQuickAdd(itemId);
        return;
      }

      // Customize Modal
      const customizeBtn = e.target.closest('.btn-customize');
      if (customizeBtn) {
        const itemId = customizeBtn.dataset.customize;
        this.openCustomizerModal(itemId);
        return;
      }

      // Toggle Cart Drawer
      const toggleCartBtn = e.target.closest('#btnToggleCartDrawer');
      if (toggleCartBtn) {
        this.openCartDrawer();
        return;
      }

      // Quick Pay Direct
      const quickPayBtn = e.target.closest('#btnQuickPayDirect');
      if (quickPayBtn) {
        this.openPaymentModal();
        return;
      }

      // Open active receipt
      const activeReceiptBtn = e.target.closest('#btnOpenActiveReceipt');
      if (activeReceiptBtn) {
        this.renderReceiptModal();
        return;
      }

      // Clear search
      const clearSearchBtn = e.target.closest('#btnClearSearch');
      if (clearSearchBtn) {
        this.searchQuery = '';
        this.render();
        return;
      }
    });

    // Search input
    this.container.addEventListener('input', (e) => {
      if (e.target.id === 'kioskSearchInput') {
        this.searchQuery = e.target.value;
        this.renderMenuGrid();
      }
    });
  }

  handleQuickAdd(itemId) {
    const menu = state.getMenu();
    const item = menu.find(i => i.id === itemId);
    if (!item || !item.inStock) return;

    audio.playTapSound();

    const existingIndex = this.cart.findIndex(
      c => c.id === item.id && (!c.addOns || c.addOns.length === 0) && (!c.selectedSize || c.selectedSize.label === 'Regular')
    );

    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += 1;
    } else {
      this.cart.push({
        cartItemId: `cart-${Date.now()}-${Math.random()}`,
        id: item.id,
        name: item.name,
        basePrice: item.price,
        selectedSize: item.customizations?.sizes ? item.customizations.sizes[0] : { label: 'Regular', price: 0 },
        addOns: [],
        quantity: 1,
        prepTime: item.prepTime,
        counter: item.counter
      });
    }

    this.renderCartUI();
  }

  // --- ITEM CUSTOMIZER MODAL ---
  openCustomizerModal(itemId) {
    const menu = state.getMenu();
    const item = menu.find(i => i.id === itemId);
    if (!item) return;

    audio.playTapSound();
    this.customizingItem = {
      ...item,
      selectedSize: item.customizations?.sizes ? item.customizations.sizes[0] : { label: 'Regular', price: 0 },
      selectedAddOns: [],
      quantity: 1
    };

    const container = document.getElementById('customizerModalContainer');
    if (!container) return;

    const sizes = item.customizations?.sizes || [{ label: 'Regular', price: 0 }];
    const addOns = item.customizations?.addOns || [];

    const calculateCurrentTotal = () => {
      const base = item.price;
      const sizeAdd = this.customizingItem.selectedSize?.price || 0;
      const addOnsTotal = this.customizingItem.selectedAddOns.reduce((s, a) => s + (a.price || 0), 0);
      return (base + sizeAdd + addOnsTotal) * this.customizingItem.quantity;
    };

    container.innerHTML = `
      <div id="customizerBackdrop" class="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
        <div class="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
          
          <!-- Header with Image & Title -->
          <div class="relative h-44 w-full bg-slate-800 overflow-hidden">
            <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
            
            <button id="btnCloseCustomizer" class="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-slate-800 transition">
              ✕
            </button>

            <div class="absolute bottom-4 left-5 right-5">
              <span class="text-xs uppercase font-bold text-orange-400 tracking-wider">Item Customizer</span>
              <h2 class="text-xl font-black text-white">${item.name}</h2>
              <p class="text-xs text-slate-300">Base Price: ₹${item.price} • Prep: ~${item.prepTime} mins</p>
            </div>
          </div>

          <!-- Body with Size & Addon Selectors -->
          <div class="p-5 overflow-y-auto space-y-5 flex-1">
            
            <!-- Sizes -->
            ${sizes.length > 1 ? `
              <div>
                <label class="block text-xs uppercase tracking-wider font-bold text-slate-400 mb-2">
                  Select Size / Portion
                </label>
                <div class="grid grid-cols-2 gap-2">
                  ${sizes.map((s, idx) => `
                    <label class="custom-size-option flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition ${idx === 0 ? 'bg-orange-500/10 border-orange-500/50 text-white' : 'bg-slate-800/60 border-slate-700/60 text-slate-300'}">
                      <div class="flex items-center gap-2">
                        <input type="radio" name="customSize" value="${s.label}" data-price="${s.price}" ${idx === 0 ? 'checked' : ''} class="accent-orange-500">
                        <span class="text-sm font-semibold">${s.label}</span>
                      </div>
                      <span class="text-xs font-bold ${s.price > 0 ? 'text-orange-400' : 'text-slate-400'}">${s.price > 0 ? `+₹${s.price}` : 'Free'}</span>
                    </label>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <!-- Add-ons -->
            ${addOns.length > 0 ? `
              <div>
                <label class="block text-xs uppercase tracking-wider font-bold text-slate-400 mb-2">
                  Add-Ons & Custom Preferences
                </label>
                <div class="space-y-2">
                  ${addOns.map(addon => `
                    <label class="custom-addon-option flex items-center justify-between p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 cursor-pointer hover:border-slate-600 transition">
                      <div class="flex items-center gap-3">
                        <input type="checkbox" name="customAddon" value="${addon.id}" data-label="${addon.label}" data-price="${addon.price}" class="w-4 h-4 rounded accent-orange-500">
                        <span class="text-sm font-medium text-slate-200">${addon.label}</span>
                      </div>
                      <span class="text-xs font-bold ${addon.price > 0 ? 'text-orange-400' : 'text-emerald-400'}">${addon.price > 0 ? `+₹${addon.price}` : 'Free'}</span>
                    </label>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <!-- Quantity Stepper -->
            <div class="pt-2 flex items-center justify-between">
              <span class="text-xs uppercase tracking-wider font-bold text-slate-400">Quantity</span>
              <div class="flex items-center gap-3 bg-slate-800 p-1.5 rounded-2xl border border-slate-700">
                <button id="btnCustomQtyMinus" class="w-8 h-8 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold flex items-center justify-center transition active:scale-95">
                  -
                </button>
                <span id="customQtyDisplay" class="w-8 text-center font-bold text-white text-base">1</span>
                <button id="btnCustomQtyPlus" class="w-8 h-8 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold flex items-center justify-center transition active:scale-95">
                  +
                </button>
              </div>
            </div>

          </div>

          <!-- Footer with Dynamic Price & Add Button -->
          <div class="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between gap-3">
            <div>
              <div class="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Total Price</div>
              <div class="text-2xl font-black text-white">₹<span id="customTotalDisplay">${calculateCurrentTotal()}</span></div>
            </div>
            <button id="btnConfirmCustomAdd" class="px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 active:scale-95 text-white font-bold text-sm shadow-lg shadow-orange-500/25 transition flex items-center gap-2">
              <span>Add to Tray</span>
              <span>•</span>
              <span id="customBtnPrice">₹${calculateCurrentTotal()}</span>
            </button>
          </div>

        </div>
      </div>
    `;

    // Dynamic price recalculation bindings
    const updateModalPrice = () => {
      const total = calculateCurrentTotal();
      document.getElementById('customTotalDisplay').textContent = total;
      document.getElementById('customBtnPrice').textContent = `₹${total}`;
    };

    // Close
    const closeBtn = document.getElementById('btnCloseCustomizer');
    const backdrop = document.getElementById('customizerBackdrop');
    const close = () => { container.innerHTML = ''; };
    closeBtn.addEventListener('click', close);
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) close();
    });

    // Size changes
    const sizeRadios = container.querySelectorAll('input[name="customSize"]');
    sizeRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        audio.playTapSound();
        const selected = sizes.find(s => s.label === radio.value);
        this.customizingItem.selectedSize = selected;
        // update option styles
        container.querySelectorAll('.custom-size-option').forEach(el => {
          el.classList.remove('bg-orange-500/10', 'border-orange-500/50', 'text-white');
          el.classList.add('bg-slate-800/60', 'border-slate-700/60', 'text-slate-300');
        });
        radio.closest('.custom-size-option').classList.add('bg-orange-500/10', 'border-orange-500/50', 'text-white');
        updateModalPrice();
      });
    });

    // Add-on checkboxes
    const addonChecks = container.querySelectorAll('input[name="customAddon"]');
    addonChecks.forEach(check => {
      check.addEventListener('change', () => {
        audio.playTapSound();
        const addonId = check.value;
        const addonDef = addOns.find(a => a.id === addonId);
        if (check.checked) {
          if (!this.customizingItem.selectedAddOns.some(a => a.id === addonId)) {
            this.customizingItem.selectedAddOns.push(addonDef);
          }
          check.closest('.custom-addon-option').classList.add('border-orange-500/50', 'bg-orange-500/5');
        } else {
          this.customizingItem.selectedAddOns = this.customizingItem.selectedAddOns.filter(a => a.id !== addonId);
          check.closest('.custom-addon-option').classList.remove('border-orange-500/50', 'bg-orange-500/5');
        }
        updateModalPrice();
      });
    });

    // Quantity buttons
    const qtyDisplay = document.getElementById('customQtyDisplay');
    document.getElementById('btnCustomQtyMinus').addEventListener('click', () => {
      if (this.customizingItem.quantity > 1) {
        this.customizingItem.quantity -= 1;
        qtyDisplay.textContent = this.customizingItem.quantity;
        updateModalPrice();
      }
    });
    document.getElementById('btnCustomQtyPlus').addEventListener('click', () => {
      if (this.customizingItem.quantity < 20) {
        this.customizingItem.quantity += 1;
        qtyDisplay.textContent = this.customizingItem.quantity;
        updateModalPrice();
      }
    });

    // Confirm button
    document.getElementById('btnConfirmCustomAdd').addEventListener('click', () => {
      audio.playTapSound();
      this.cart.push({
        cartItemId: `cart-${Date.now()}-${Math.random()}`,
        id: item.id,
        name: item.name,
        basePrice: item.price,
        selectedSize: this.customizingItem.selectedSize,
        addOns: [...this.customizingItem.selectedAddOns],
        quantity: this.customizingItem.quantity,
        prepTime: item.prepTime,
        counter: item.counter
      });
      container.innerHTML = '';
      this.renderCartUI();
    });
  }

  // --- CART CALCULATION & UI ---
  renderCartUI() {
    const totalCount = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalSum = this.calculateCartTotal();

    const countBadge = document.getElementById('cartCountBadge');
    const totalSumEl = document.getElementById('cartTotalSum');
    const stickyBar = document.getElementById('stickyCartBar');

    if (countBadge) countBadge.textContent = totalCount;
    if (totalSumEl) totalSumEl.textContent = totalSum;

    if (stickyBar) {
      if (totalCount > 0) {
        stickyBar.classList.remove('translate-y-full', 'opacity-0', 'pointer-events-none');
        stickyBar.classList.add('translate-y-0', 'opacity-100');
      } else {
        stickyBar.classList.add('translate-y-full', 'opacity-0', 'pointer-events-none');
        stickyBar.classList.remove('translate-y-0', 'opacity-100');
      }
    }
  }

  calculateCartTotal() {
    return this.cart.reduce((sum, item) => {
      const sizePrice = item.selectedSize?.price || 0;
      const addOnsTotal = (item.addOns || []).reduce((aSum, a) => aSum + (a.price || 0), 0);
      return sum + ((item.basePrice + sizePrice + addOnsTotal) * item.quantity);
    }, 0);
  }

  // --- CART DRAWER MODAL ---
  openCartDrawer() {
    const container = document.getElementById('cartDrawerContainer');
    if (!container) return;

    audio.playTapSound();
    const totalSum = this.calculateCartTotal();

    container.innerHTML = `
      <div id="cartDrawerBackdrop" class="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex justify-end animate-in fade-in duration-200">
        <div class="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl overflow-hidden">
          
          <!-- Drawer Header -->
          <div class="p-5 border-b border-slate-800 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold">
                🛒
              </div>
              <h2 class="text-lg font-black text-white">Your Tray & Order</h2>
            </div>
            <button id="btnCloseCartDrawer" class="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition">
              ✕
            </button>
          </div>

          <!-- Drawer Items List -->
          <div class="p-5 overflow-y-auto space-y-3 flex-1">
            ${this.cart.length === 0 ? `
              <div class="py-12 text-center text-slate-500">
                <div class="text-3xl mb-2">🍽️</div>
                <p>Your tray is currently empty.</p>
              </div>
            ` : this.cart.map((c, index) => {
              const itemTotal = (c.basePrice + (c.selectedSize?.price || 0) + (c.addOns || []).reduce((s, a) => s + a.price, 0)) * c.quantity;
              return `
                <div class="p-3.5 rounded-2xl bg-slate-800/70 border border-slate-700/60 flex items-start justify-between gap-3">
                  <div class="flex-1">
                    <div class="flex items-center gap-2">
                      <h4 class="font-bold text-sm text-white">${c.name}</h4>
                      <span class="text-[10px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-300 font-semibold">${c.selectedSize?.label || 'Regular'}</span>
                    </div>
                    ${c.addOns && c.addOns.length > 0 ? `
                      <div class="mt-1 flex flex-wrap gap-1">
                        ${c.addOns.map(a => `
                          <span class="text-[10px] px-1.5 py-0.5 rounded-md bg-orange-500/10 text-orange-300 border border-orange-500/20">
                            + ${a.label}
                          </span>
                        `).join('')}
                      </div>
                    ` : ''}
                    <div class="mt-2 text-xs font-bold text-amber-400">
                      ₹${itemTotal}
                    </div>
                  </div>

                  <!-- Item Quantity Controls -->
                  <div class="flex items-center gap-2 bg-slate-900/90 px-2 py-1 rounded-xl border border-slate-700/80">
                    <button data-cart-minus="${index}" class="text-slate-400 hover:text-white font-bold text-sm px-1">-</button>
                    <span class="text-xs font-bold text-white w-4 text-center">${c.quantity}</span>
                    <button data-cart-plus="${index}" class="text-slate-400 hover:text-white font-bold text-sm px-1">+</button>
                  </div>
                </div>
              `;
            }).join('')}

            <!-- Pre-Booking Lunch Rush Slot (Stretch Feature) -->
            <div class="pt-3 border-t border-slate-800">
              <label class="block text-xs uppercase tracking-wider font-bold text-amber-400 mb-2 flex items-center gap-1.5">
                <span>⏰ Lunch Rush Slot Pre-Booking</span>
                <span class="text-[10px] font-normal text-slate-400">(Avoid the line)</span>
              </label>
              <select id="selectLunchSlot" class="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-medium text-slate-200 focus:outline-none focus:border-amber-400">
                ${LUNCH_SLOTS.map(slot => `
                  <option value="${slot.time}" ${this.selectedSlot === slot.time ? 'selected' : ''}>
                    ${slot.label} [${slot.tag}]
                  </option>
                `).join('')}
              </select>
            </div>

          </div>

          <!-- Drawer Footer & Checkout -->
          <div class="p-5 bg-slate-900 border-t border-slate-800 space-y-3">
            <div class="space-y-1.5 text-xs text-slate-400">
              <div class="flex justify-between">
                <span>Items Subtotal</span>
                <span class="text-slate-200 font-semibold">₹${totalSum}</span>
              </div>
              <div class="flex justify-between">
                <span>Campus Canteen Tax & Subsidy</span>
                <span class="text-emerald-400 font-semibold">₹0.00 (Zero Extra)</span>
              </div>
              <div class="flex justify-between text-base font-black text-white pt-2 border-t border-slate-800">
                <span>Grand Total</span>
                <span class="text-orange-400">₹${totalSum}</span>
              </div>
            </div>

            <button 
              id="btnProceedPayment" 
              ${this.cart.length === 0 ? 'disabled' : ''}
              class="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 active:scale-95 text-white font-black text-sm shadow-xl shadow-orange-500/25 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Proceed to Quick Pay</span>
              <span>(₹${totalSum})</span>
            </button>
          </div>

        </div>
      </div>
    `;

    // Drawer Event Listeners
    const closeBtn = document.getElementById('btnCloseCartDrawer');
    const backdrop = document.getElementById('cartDrawerBackdrop');
    const close = () => { container.innerHTML = ''; };
    closeBtn.addEventListener('click', close);
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) close();
    });

    // Slot selector
    const slotSelect = document.getElementById('selectLunchSlot');
    slotSelect.addEventListener('change', (e) => {
      this.selectedSlot = e.target.value;
    });

    // Quantity plus/minus
    container.addEventListener('click', (e) => {
      const minusBtn = e.target.closest('[data-cart-minus]');
      if (minusBtn) {
        const idx = parseInt(minusBtn.dataset.cartMinus, 10);
        if (this.cart[idx].quantity > 1) {
          this.cart[idx].quantity -= 1;
        } else {
          this.cart.splice(idx, 1);
        }
        this.renderCartUI();
        this.openCartDrawer();
        return;
      }

      const plusBtn = e.target.closest('[data-cart-plus]');
      if (plusBtn) {
        const idx = parseInt(plusBtn.dataset.cartPlus, 10);
        this.cart[idx].quantity += 1;
        this.renderCartUI();
        this.openCartDrawer();
        return;
      }

      const proceedBtn = e.target.closest('#btnProceedPayment');
      if (proceedBtn) {
        close();
        this.openPaymentModal();
        return;
      }
    });
  }

  // --- DIGITAL MOCK UPI & STUDENT ID WALLET MODAL ---
  openPaymentModal() {
    if (this.cart.length === 0) return;

    const totalSum = this.calculateCartTotal();
    const wallet = state.getWallet();
    const container = document.getElementById('paymentModalContainer');
    if (!container) return;

    audio.playTapSound();

    let activePaymentTab = 'upi'; // 'upi' or 'wallet'
    let autoApprovalCountdown = 3;

    const renderPaymentContent = () => {
      container.innerHTML = `
        <div id="paymentBackdrop" class="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div class="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
            
            <!-- Modal Header -->
            <div class="p-5 border-b border-slate-800 flex items-center justify-between">
              <div>
                <span class="text-xs uppercase tracking-wider font-bold text-orange-400">ZeroQueue Checkout</span>
                <h3 class="text-lg font-black text-white">Pay ₹${totalSum}</h3>
              </div>
              <button id="btnClosePayment" class="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition">
                ✕
              </button>
            </div>

            <!-- Payment Method Tabs -->
            <div class="grid grid-cols-2 p-2 bg-slate-950/60 border-b border-slate-800 gap-1">
              <button id="tabUpi" class="py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 ${activePaymentTab === 'upi' ? 'bg-orange-500 text-white shadow-md' : 'text-slate-400 hover:text-white'}">
                <span>📱 Mock UPI QR</span>
              </button>
              <button id="tabWallet" class="py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 ${activePaymentTab === 'wallet' ? 'bg-orange-500 text-white shadow-md' : 'text-slate-400 hover:text-white'}">
                <span>💳 Student ID Card</span>
              </button>
            </div>

            <!-- Tab Body -->
            <div class="p-6">
              
              ${activePaymentTab === 'upi' ? `
                <!-- UPI QR Code View -->
                <div class="flex flex-col items-center text-center">
                  
                  <!-- QR Code Frame with Animated Scanner Bar -->
                  <div class="relative p-3.5 bg-white rounded-3xl shadow-2xl border-4 border-orange-500/30 mb-4 group overflow-hidden">
                    <img 
                      src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=canteen@campus&pn=CampusCanteen&am=${totalSum}&cu=INR" 
                      alt="UPI QR Code" 
                      class="w-44 h-44 rounded-xl"
                    />
                    <!-- Scanning laser line animation -->
                    <div class="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent top-0 animate-[scan_2s_ease-in-out_infinite] pointer-events-none"></div>
                  </div>

                  <div class="flex items-center gap-2 mb-3">
                    <span class="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">GPay</span>
                    <span class="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">PhonePe</span>
                    <span class="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">Paytm</span>
                    <span class="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">BHIM</span>
                  </div>

                  <p class="text-xs text-slate-400 mb-5">
                    Scan with any UPI App or tap button below to simulate instant payment confirmation.
                  </p>

                  <!-- 1-Tap Payment Simulator -->
                  <button id="btnSimulateUpiPay" class="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 active:scale-95 text-white font-black text-sm shadow-xl shadow-emerald-500/25 transition flex items-center justify-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Simulate Payment & Get Token (₹${totalSum})</span>
                  </button>

                  <div class="mt-3 flex items-center gap-2 text-[11px] text-slate-500">
                    <input type="checkbox" id="chkAutoPay" class="rounded accent-emerald-500">
                    <label for="chkAutoPay" class="cursor-pointer">Auto-confirm payment in 3s (Hands-free kiosk mode)</label>
                  </div>

                </div>
              ` : `
                <!-- Campus Student Card Wallet View (Stretch Feature) -->
                <div class="flex flex-col items-center">
                  
                  <!-- Virtual Student ID Card -->
                  <div class="w-full p-5 rounded-2xl bg-gradient-to-tr from-slate-800 via-indigo-950 to-slate-800 border border-indigo-500/40 shadow-2xl relative overflow-hidden mb-5">
                    <div class="flex items-center justify-between mb-4">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-amber-400"></div>
                        <span class="text-[11px] font-black uppercase tracking-widest text-indigo-300">CAMPUS SMART CARD</span>
                      </div>
                      <span class="text-xs font-mono text-slate-400">RFID TAP-READY</span>
                    </div>

                    <!-- Chip Icon -->
                    <div class="w-9 h-7 rounded-md bg-amber-300/80 border border-amber-400 mb-3 flex items-center justify-center text-[10px] font-bold text-amber-950">
                      CHIP
                    </div>

                    <div class="mb-3">
                      <div class="text-[10px] text-slate-400 uppercase tracking-wider">Student Name</div>
                      <div class="text-sm font-black text-white">${wallet.studentName}</div>
                      <div class="text-xs text-indigo-300 font-mono">${wallet.studentId} • ${wallet.department}</div>
                    </div>

                    <div class="pt-3 border-t border-indigo-900/50 flex items-center justify-between">
                      <div>
                        <div class="text-[10px] text-slate-400 uppercase">Available Card Balance</div>
                        <div class="text-lg font-black ${wallet.balance >= totalSum ? 'text-emerald-400' : 'text-red-400'}">
                          ₹${wallet.balance.toFixed(2)}
                        </div>
                      </div>
                      <div class="text-right">
                        <div class="text-[10px] text-slate-400 uppercase">Deduction</div>
                        <div class="text-sm font-bold text-amber-400">-₹${totalSum}</div>
                      </div>
                    </div>
                  </div>

                  ${wallet.balance >= totalSum ? `
                    <button id="btnPayWithWallet" class="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active:scale-95 text-white font-black text-sm shadow-xl shadow-indigo-500/25 transition flex items-center justify-center gap-2">
                      <span>💳 Tap Student Card to Pay ₹${totalSum}</span>
                    </button>
                  ` : `
                    <div class="w-full space-y-2">
                      <div class="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 text-center font-medium">
                        Insufficient balance (Needs ₹${totalSum}, balance is ₹${wallet.balance.toFixed(2)})
                      </div>
                      <button id="btnTopUpWallet" class="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition">
                        + Quick Top-Up ₹200 (Demo Reload)
                      </button>
                    </div>
                  `}

                </div>
              `}

            </div>

          </div>
        </div>
      `;

      // Event bindings inside modal
      const closeBtn = document.getElementById('btnClosePayment');
      const backdrop = document.getElementById('paymentBackdrop');
      const close = () => {
        if (this.autoApproveTimer) clearInterval(this.autoApproveTimer);
        container.innerHTML = '';
      };
      closeBtn.addEventListener('click', close);
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) close();
      });

      // Tabs
      document.getElementById('tabUpi')?.addEventListener('click', () => {
        activePaymentTab = 'upi';
        renderPaymentContent();
      });
      document.getElementById('tabWallet')?.addEventListener('click', () => {
        activePaymentTab = 'wallet';
        renderPaymentContent();
      });

      // Simulate UPI Pay
      document.getElementById('btnSimulateUpiPay')?.addEventListener('click', () => {
        this.processSuccessfulOrder("UPI Mock QR");
      });

      // Auto Pay Checkbox
      const autoPayChk = document.getElementById('chkAutoPay');
      autoPayChk?.addEventListener('change', (e) => {
        if (e.target.checked) {
          let count = 3;
          const btn = document.getElementById('btnSimulateUpiPay');
          btn.innerHTML = `<span>Auto-approving in ${count}s...</span>`;
          this.autoApproveTimer = setInterval(() => {
            count -= 1;
            if (count <= 0) {
              clearInterval(this.autoApproveTimer);
              this.processSuccessfulOrder("UPI Mock QR (Auto)");
            } else {
              btn.innerHTML = `<span>Auto-approving in ${count}s...</span>`;
            }
          }, 1000);
        } else {
          if (this.autoApproveTimer) clearInterval(this.autoApproveTimer);
          document.getElementById('btnSimulateUpiPay').innerHTML = `
            <span>Simulate Payment & Get Token (₹${totalSum})</span>
          `;
        }
      });

      // Wallet pay
      document.getElementById('btnPayWithWallet')?.addEventListener('click', () => {
        this.processSuccessfulOrder("Campus ID Card");
      });

      // Wallet top-up
      document.getElementById('btnTopUpWallet')?.addEventListener('click', () => {
        state.topUpWallet(200);
        renderPaymentContent();
      });
    };

    renderPaymentContent();
  }

  processSuccessfulOrder(paymentMethod) {
    if (this.autoApproveTimer) clearInterval(this.autoApproveTimer);

    // Create the order in global state
    const order = state.createOrder({
      items: this.cart,
      paymentMethod,
      slot: this.selectedSlot,
      studentName: "Student Guest"
    });

    audio.playReadyChime();

    // Clear cart
    this.cart = [];
    this.renderCartUI();

    // Close payment modal
    document.getElementById('paymentModalContainer').innerHTML = '';

    // Show digital pickup token receipt
    this.activeReceiptOrder = order;
    this.renderReceiptModal();
  }

  // --- DIGITAL PICKUP TOKEN RECEIPT MODAL ---
  renderReceiptModal() {
    if (!this.activeReceiptOrder) return;

    const order = this.activeReceiptOrder;
    const container = document.getElementById('receiptModalContainer');
    if (!container) return;

    const isReady = order.status === 'READY';
    const isCollected = order.status === 'COLLECTED';

    container.innerHTML = `
      <div id="receiptBackdrop" class="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
        <div class="w-full max-w-md bg-slate-900 border ${isReady ? 'border-emerald-500/50 shadow-emerald-500/20' : 'border-slate-800'} rounded-3xl shadow-2xl overflow-hidden flex flex-col">
          
          <!-- Header Banner -->
          <div class="p-5 ${isReady ? 'bg-gradient-to-r from-emerald-600 to-teal-600' : 'bg-gradient-to-r from-orange-600 to-amber-600'} text-white flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="text-xl">${isReady ? '🎉' : '⏳'}</span>
              <span class="text-xs uppercase font-extrabold tracking-wider">
                ${isReady ? 'Ready for Pickup!' : 'Order Placed & Preparing'}
              </span>
            </div>
            <button id="btnCloseReceipt" class="w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition">
              ✕
            </button>
          </div>

          <!-- Token Card Content -->
          <div class="p-6 text-center space-y-5">
            
            <!-- Big Token Number -->
            <div class="py-3 px-6 rounded-3xl ${isReady ? 'bg-emerald-500/10 border-2 border-emerald-500' : 'bg-slate-800/80 border border-slate-700'} inline-block mx-auto">
              <span class="text-xs uppercase tracking-widest text-slate-400 font-bold block mb-1">Your Token Number</span>
              <div class="text-5xl font-black ${isReady ? 'text-emerald-400 animate-pulse' : 'text-orange-400'} tracking-tight">
                ${order.token}
              </div>
            </div>

            <!-- Counter Details -->
            <div class="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between text-left">
              <div>
                <div class="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Collection Counter</div>
                <div class="text-sm font-extrabold text-white">${order.counter}</div>
              </div>
              <div class="text-right">
                <div class="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Scheduled Slot</div>
                <div class="text-sm font-extrabold text-amber-400">${order.slot}</div>
              </div>
            </div>

            <!-- Live Status Progress Steps -->
            <div class="flex items-center justify-between px-2 pt-2">
              
              <!-- Step 1: Paid -->
              <div class="flex flex-col items-center">
                <div class="w-8 h-8 rounded-full bg-emerald-500 text-slate-950 font-black text-xs flex items-center justify-center">
                  ✓
                </div>
                <span class="text-[10px] font-semibold text-emerald-400 mt-1">Paid</span>
              </div>

              <div class="h-0.5 flex-1 mx-2 ${order.status !== 'PLACED' ? 'bg-emerald-500' : 'bg-slate-700'}"></div>

              <!-- Step 2: Preparing -->
              <div class="flex flex-col items-center">
                <div class="w-8 h-8 rounded-full ${order.status === 'PREPARING' ? 'bg-amber-500 text-slate-950 animate-pulse font-black' : (isReady || isCollected ? 'bg-emerald-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-500')} text-xs flex items-center justify-center">
                  ${isReady || isCollected ? '✓' : '🍳'}
                </div>
                <span class="text-[10px] font-semibold ${order.status === 'PREPARING' ? 'text-amber-400' : (isReady || isCollected ? 'text-emerald-400' : 'text-slate-500')} mt-1">
                  ${order.status === 'PREPARING' ? 'Cooking' : 'Prepared'}
                </span>
              </div>

              <div class="h-0.5 flex-1 mx-2 ${isReady || isCollected ? 'bg-emerald-500' : 'bg-slate-700'}"></div>

              <!-- Step 3: Ready -->
              <div class="flex flex-col items-center">
                <div class="w-8 h-8 rounded-full ${isReady ? 'bg-emerald-500 text-slate-950 font-black ring-4 ring-emerald-500/30' : (isCollected ? 'bg-emerald-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-500')} text-xs flex items-center justify-center">
                  🔔
                </div>
                <span class="text-[10px] font-semibold ${isReady ? 'text-emerald-400 font-bold' : (isCollected ? 'text-emerald-400' : 'text-slate-500')} mt-1">
                  Ready
                </span>
              </div>

            </div>

            <!-- Items Ordered List -->
            <div class="text-left bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800 space-y-1.5 max-h-36 overflow-y-auto">
              <div class="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Order Details (${order.paymentMethod})</div>
              ${order.items.map(it => `
                <div class="flex justify-between text-xs text-slate-300">
                  <span>${it.quantity}x ${it.name} <span class="text-slate-500">(${it.size})</span></span>
                  <span class="font-bold text-slate-200">₹${(it.basePrice + it.sizePrice + (it.addOns || []).reduce((s, a) => s + a.price, 0)) * it.quantity}</span>
                </div>
              `).join('')}
              <div class="pt-1 border-t border-slate-800 flex justify-between text-xs font-bold text-white">
                <span>Total Paid</span>
                <span class="text-orange-400">₹${order.totalAmount}</span>
              </div>
            </div>

            <!-- Offline Caching Badge -->
            <div class="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 bg-slate-800/40 py-2 rounded-xl border border-slate-800">
              <span class="text-emerald-400">🛡️</span>
              <span><strong>Offline-Safe:</strong> Token saved in device storage for basement cafeteria dead zones.</span>
            </div>

            <!-- Actions -->
            <div class="space-y-2">
              <button id="btnSwitchToWallBoard" class="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-white font-bold text-xs border border-slate-700 transition flex items-center justify-center gap-2">
                <span>📺 Open Canteen Wall Display Board</span>
                <span class="text-orange-400">↗</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    `;

    // Bindings
    const closeBtn = document.getElementById('btnCloseReceipt');
    const backdrop = document.getElementById('receiptBackdrop');
    const close = () => { container.innerHTML = ''; };
    closeBtn.addEventListener('click', close);
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) close();
    });

    document.getElementById('btnSwitchToWallBoard')?.addEventListener('click', () => {
      close();
      window.dispatchEvent(new CustomEvent('SWITCH_VIEW', { detail: { view: 'wall' } }));
    });
  }
}
