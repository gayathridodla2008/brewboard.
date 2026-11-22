// BrewBoard - Canteen Kitchen Order Ticket (KOT) Console & Staff Manager

import { state } from './state.js';
import { audio } from './audio.js';

export class KitchenConsoleController {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.selectedCounterFilter = 'all';
    this.activeStatusFilter = 'all'; // 'all', 'PREPARING', 'READY'
    this.isStockManagerOpen = false;

    this.init();
  }

  init() {
    this.render();
    this.bindEvents();

    // Subscribe to state updates
    state.subscribe((event) => {
      if (
        event.type === 'ORDER_CREATED' ||
        event.type === 'ORDER_STATUS_CHANGED' ||
        event.type === 'DEMO_RESET' ||
        event.type === 'STORAGE_SYNC'
      ) {
        this.renderTicketList();
        this.updateHeaderCounts();
      } else if (event.type === 'STOCK_TOGGLED') {
        if (this.isStockManagerOpen) {
          this.renderStockList();
        }
      }
    });

    // Refresh timers periodically
    setInterval(() => {
      this.renderTicketList();
    }, 20000);
  }

  render() {
    this.container.innerHTML = `
      <div class="kitchen-layout min-h-screen bg-slate-950 text-slate-100 flex flex-col p-4 sm:p-6 pb-20">
        
        <!-- Kitchen Header -->
        <header class="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-orange-600 flex items-center justify-center text-white text-xl font-black shadow-lg shadow-orange-600/30">
              👨‍🍳
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h1 class="text-xl sm:text-2xl font-black text-white tracking-tight">KITCHEN KOT CONSOLE</h1>
                <span class="text-xs px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 font-bold uppercase">
                  Staff Touch Tablet
                </span>
              </div>
              <p class="text-xs text-slate-400">Advance order tickets with one tap • Manage rush hour stock</p>
            </div>
          </div>

          <!-- Staff Header Action Buttons -->
          <div class="flex items-center gap-3">
            <!-- Stock Sold-Out Manager Toggle -->
            <button id="btnOpenStockManager" class="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-white font-bold text-xs border border-slate-700 flex items-center gap-2 transition shadow-md">
              <span>📦 Stock & Sold-Out Toggles</span>
            </button>
          </div>
        </header>

        <!-- Filter Controls Bar -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 my-4">
          
          <!-- Status Tabs -->
          <div class="flex items-center gap-2">
            <button data-status="all" class="kot-status-btn px-4 py-2 rounded-xl text-xs font-bold transition border ${this.activeStatusFilter === 'all' ? 'bg-orange-500 text-white border-transparent' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'}">
              All Active Tickets
            </button>
            <button data-status="PREPARING" class="kot-status-btn px-4 py-2 rounded-xl text-xs font-bold transition border ${this.activeStatusFilter === 'PREPARING' ? 'bg-amber-500 text-slate-950 font-black border-transparent' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'}">
              🟡 Now Cooking (<span id="kotCountPrep">0</span>)
            </button>
            <button data-status="READY" class="kot-status-btn px-4 py-2 rounded-xl text-xs font-bold transition border ${this.activeStatusFilter === 'READY' ? 'bg-emerald-500 text-slate-950 font-black border-transparent' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'}">
              🟢 Ready for Pickup (<span id="kotCountReady">0</span>)
            </button>
          </div>

          <!-- Counter Selector Dropdown -->
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold text-slate-400">Filter Counter:</span>
            <select id="selectKotCounter" class="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200 focus:outline-none focus:border-orange-500">
              <option value="all">All Kitchen Counters</option>
              <option value="Counter 1">Counter 1 (Beverages)</option>
              <option value="Counter 2">Counter 2 (Hot Snacks)</option>
              <option value="Counter 3">Counter 3 (Meals & South)</option>
            </select>
          </div>

        </div>

        <!-- Order Tickets Grid -->
        <main id="kotTicketsGrid" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 flex-1">
          <!-- Dynamically populated -->
        </main>

        <!-- Stock / Sold-Out Management Modal Container -->
        <div id="stockManagerContainer"></div>

      </div>
    `;

    this.renderTicketList();
    this.updateHeaderCounts();
  }

  updateHeaderCounts() {
    const orders = state.getOrders().filter(o => o.status !== 'COLLECTED');
    const prepCount = orders.filter(o => o.status === 'PREPARING').length;
    const readyCount = orders.filter(o => o.status === 'READY').length;

    const prepEl = document.getElementById('kotCountPrep');
    const readyEl = document.getElementById('kotCountReady');
    if (prepEl) prepEl.textContent = prepCount;
    if (readyEl) readyEl.textContent = readyCount;
  }

  renderTicketList() {
    const grid = document.getElementById('kotTicketsGrid');
    if (!grid) return;

    let orders = state.getOrders().filter(o => o.status !== 'COLLECTED');

    if (this.activeStatusFilter !== 'all') {
      orders = orders.filter(o => o.status === this.activeStatusFilter);
    }

    if (this.selectedCounterFilter !== 'all') {
      orders = orders.filter(o => o.counter.includes(this.selectedCounterFilter));
    }

    if (orders.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-16 text-center text-slate-500">
          <div class="text-4xl mb-2">📋</div>
          <h3 class="text-lg font-bold text-white mb-1">No Kitchen Tickets Pending</h3>
          <p class="text-xs">New student kiosk orders will appear here in real-time.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = orders.map(o => {
      const isPreparing = o.status === 'PREPARING';
      const isReady = o.status === 'READY';
      const elapsedMins = Math.max(0, Math.floor((Date.now() - o.createdAt) / 60000));

      return `
        <div class="rounded-3xl bg-slate-900 border-2 ${isReady ? 'border-emerald-500/50' : 'border-amber-500/40'} p-5 flex flex-col justify-between shadow-xl transition hover:shadow-2xl">
          
          <!-- Ticket Header -->
          <div>
            <div class="flex items-start justify-between gap-3 mb-3 pb-3 border-b border-slate-800">
              <div class="flex items-center gap-3">
                <span class="px-3.5 py-2 rounded-2xl ${isReady ? 'bg-emerald-500 text-slate-950 font-black' : 'bg-amber-500/20 text-amber-400 border border-amber-500/40 font-black'} text-2xl tracking-tight">
                  ${o.token}
                </span>
                <div>
                  <div class="text-xs uppercase font-extrabold text-slate-300">${o.counter}</div>
                  <div class="text-[11px] text-slate-500 font-medium">Placed ${elapsedMins}m ago • ${o.paymentMethod}</div>
                </div>
              </div>

              <!-- Status badge -->
              <span class="text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${isReady ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'}">
                ${isReady ? 'Ready' : 'Cooking'}
              </span>
            </div>

            <!-- Lunch Rush Slot Alert -->
            ${o.slot && o.slot !== 'Immediate' ? `
              <div class="mb-3 px-3 py-1.5 rounded-xl bg-orange-950/60 border border-orange-800/60 text-xs font-bold text-orange-300 flex items-center gap-1.5">
                <span>⏰ Scheduled Slot:</span>
                <span>${o.slot}</span>
              </div>
            ` : ''}

            <!-- Items & Customizations Checklist -->
            <div class="space-y-3 mb-4">
              ${o.items.map(item => `
                <div class="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <span class="w-6 h-6 rounded-lg bg-orange-500 text-white font-bold text-xs flex items-center justify-center">
                        ${item.quantity}x
                      </span>
                      <strong class="text-sm font-bold text-white">${item.name}</strong>
                    </div>
                    <span class="text-xs font-semibold px-2 py-0.5 rounded bg-slate-700 text-slate-300">
                      ${item.size}
                    </span>
                  </div>

                  <!-- Explicit Customization & Add-on tags -->
                  ${item.addOns && item.addOns.length > 0 ? `
                    <div class="mt-2 pl-8 flex flex-wrap gap-1.5">
                      ${item.addOns.map(a => `
                        <span class="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                          <span>★</span>
                          <span>${a.label}</span>
                        </span>
                      `).join('')}
                    </div>
                  ` : ''}
                </div>
              `).join('')}
            </div>
          </div>

          <!-- One-Tap Action Buttons -->
          <div class="pt-3 border-t border-slate-800 flex items-center gap-2">
            ${isPreparing ? `
              <button 
                data-advance-ready="${o.id}"
                class="flex-1 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 active:scale-95 text-white font-black text-xs shadow-lg shadow-emerald-500/25 transition flex items-center justify-center gap-2"
              >
                <span>🔔 Mark Ready & Sound Chime</span>
              </button>
            ` : `
              <button 
                data-advance-collected="${o.id}"
                class="flex-1 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-emerald-400 font-bold text-xs border border-emerald-500/30 transition flex items-center justify-center gap-2"
              >
                <span>✓ Handed Over to Student (Archive)</span>
              </button>
            `}
          </div>

        </div>
      `;
    }).join('');
  }

  bindEvents() {
    // Status Filter Tabs
    this.container.addEventListener('click', (e) => {
      const statusBtn = e.target.closest('.kot-status-btn');
      if (statusBtn) {
        this.activeStatusFilter = statusBtn.dataset.status;
        this.render();
        return;
      }

      // Mark Ready Action
      const readyBtn = e.target.closest('[data-advance-ready]');
      if (readyBtn) {
        const orderId = readyBtn.dataset.advanceReady;
        state.updateOrderStatus(orderId, 'READY');
        this.renderTicketList();
        this.updateHeaderCounts();
        return;
      }

      // Mark Collected Action
      const collectedBtn = e.target.closest('[data-advance-collected]');
      if (collectedBtn) {
        const orderId = collectedBtn.dataset.advanceCollected;
        state.updateOrderStatus(orderId, 'COLLECTED');
        this.renderTicketList();
        this.updateHeaderCounts();
        return;
      }

      // Open Stock Manager
      const openStockBtn = e.target.closest('#btnOpenStockManager');
      if (openStockBtn) {
        this.openStockManager();
        return;
      }
    });

    // Counter Selector
    this.container.addEventListener('change', (e) => {
      if (e.target.id === 'selectKotCounter') {
        this.selectedCounterFilter = e.target.value;
        this.renderTicketList();
      }
    });
  }

  // --- ITEM STOCK SOLD-OUT MANAGER (STRETCH FEATURE) ---
  openStockManager() {
    this.isStockManagerOpen = true;
    const container = document.getElementById('stockManagerContainer');
    if (!container) return;

    audio.playTapSound();

    container.innerHTML = `
      <div id="stockBackdrop" class="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
        <div class="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
          
          <div class="p-5 border-b border-slate-800 flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <span class="text-2xl">📦</span>
              <div>
                <h3 class="text-lg font-black text-white">Item Stock & Rush Hour Toggles</h3>
                <p class="text-xs text-slate-400">Toggle items 'Out of Stock' instantly when inventory runs out during rush hour.</p>
              </div>
            </div>
            <button id="btnCloseStockManager" class="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition">
              ✕
            </button>
          </div>

          <div id="stockListScroll" class="p-5 overflow-y-auto space-y-2 flex-1">
            <!-- Dynamically populated -->
          </div>

          <div class="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Any changes broadcast immediately to all student kiosk screens.</span>
            <button id="btnDoneStock" class="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold transition">
              Done
            </button>
          </div>

        </div>
      </div>
    `;

    this.renderStockList();

    const closeBtn = document.getElementById('btnCloseStockManager');
    const doneBtn = document.getElementById('btnDoneStock');
    const backdrop = document.getElementById('stockBackdrop');

    const close = () => {
      this.isStockManagerOpen = false;
      container.innerHTML = '';
    };

    closeBtn.addEventListener('click', close);
    doneBtn.addEventListener('click', close);
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) close();
    });
  }

  renderStockList() {
    const list = document.getElementById('stockListScroll');
    if (!list) return;

    const menu = state.getMenu();

    list.innerHTML = menu.map(item => `
      <div class="p-3.5 rounded-2xl bg-slate-800/70 border ${item.inStock ? 'border-slate-700/60' : 'border-red-950 bg-red-950/20'} flex items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <img src="${item.image}" alt="${item.name}" class="w-12 h-12 rounded-xl object-cover" />
          <div>
            <div class="flex items-center gap-2">
              <h4 class="font-bold text-sm text-white">${item.name}</h4>
              <span class="text-xs text-slate-400 font-semibold">₹${item.price}</span>
            </div>
            <div class="text-[11px] text-slate-400">${item.counter}</div>
          </div>
        </div>

        <!-- 1-Tap Toggle Button -->
        <button 
          data-toggle-stock="${item.id}"
          class="px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${item.inStock ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30' : 'bg-red-600 text-white shadow-md'}"
        >
          <span>${item.inStock ? '✓ IN STOCK' : '✕ SOLD OUT'}</span>
        </button>
      </div>
    `).join('');

    // Bind stock toggle clicks
    list.querySelectorAll('[data-toggle-stock]').forEach(btn => {
      btn.addEventListener('click', () => {
        const itemId = btn.dataset.toggleStock;
        audio.playTapSound();
        state.toggleItemStock(itemId);
        this.renderStockList();
      });
    });
  }
}
