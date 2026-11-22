// BrewBoard - Global State Management & Cross-Tab Synchronization

import { INITIAL_MENU, INITIAL_STUDENT_WALLET } from './data.js';

const STORAGE_KEYS = {
  ORDERS: 'brewboard_orders_v1',
  MENU: 'brewboard_menu_v1',
  WALLET: 'brewboard_wallet_v1',
  TOKEN_SEQ: 'brewboard_token_seq_v1',
  MY_ORDERS: 'brewboard_my_tokens_v1'
};

class StateManager {
  constructor() {
    this.broadcastChannel = null;
    this.listeners = new Set();
    this.initBroadcast();
    this.initStorage();
  }

  initBroadcast() {
    try {
      if ('BroadcastChannel' in window) {
        this.broadcastChannel = new BroadcastChannel('brewboard_sync_channel');
        this.broadcastChannel.onmessage = (event) => {
          this.handleBroadcastMessage(event.data);
        };
      }
    } catch (e) {
      console.warn("BroadcastChannel unavailable, relying on localStorage events");
    }

    // Storage event fallback for cross-window sync
    window.addEventListener('storage', (e) => {
      if (e.key && e.key.startsWith('brewboard_')) {
        this.notifyListeners({ type: 'STORAGE_SYNC', key: e.key });
      }
    });
  }

  handleBroadcastMessage(data) {
    this.notifyListeners(data);
  }

  broadcast(message) {
    if (this.broadcastChannel) {
      try {
        this.broadcastChannel.postMessage(message);
      } catch (e) {
        console.warn("Broadcast postMessage error:", e);
      }
    }
    // Also notify local listeners
    this.notifyListeners(message);
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notifyListeners(eventData) {
    this.listeners.forEach(fn => {
      try {
        fn(eventData);
      } catch (err) {
        console.error("Listener error:", err);
      }
    });
  }

  initStorage() {
    // Menu items
    if (!localStorage.getItem(STORAGE_KEYS.MENU)) {
      localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(INITIAL_MENU));
    }

    // Student wallet
    if (!localStorage.getItem(STORAGE_KEYS.WALLET)) {
      localStorage.setItem(STORAGE_KEYS.WALLET, JSON.stringify(INITIAL_STUDENT_WALLET));
    }

    // Token sequence starting point (e.g. 34 so the next demo order generates #B-35 as in problem brief!)
    if (!localStorage.getItem(STORAGE_KEYS.TOKEN_SEQ)) {
      localStorage.setItem(STORAGE_KEYS.TOKEN_SEQ, "34");
    }

    // Seed realistic initial orders if empty
    if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
      this.seedInitialOrders();
    }
  }

  seedInitialOrders() {
    const now = Date.now();
    const seededOrders = [
      {
        id: "ord-seed-1",
        token: "#B-32",
        counter: "Counter 2 (Hot Snacks)",
        customerName: "Rohan K.",
        slot: "Immediate",
        paymentMethod: "UPI Mock QR",
        status: "READY",
        createdAt: now - 360000, // 6 mins ago
        readyAt: now - 60000,
        estimatedPrepTime: 4,
        totalAmount: 90,
        items: [
          {
            name: "Cheese Butter Maggi",
            quantity: 1,
            size: "Standard Bowl",
            price: 45,
            addOns: [{ label: "Extra Cheddar Cheese Layer", price: 15 }]
          },
          {
            name: "Cutting Chai",
            quantity: 2,
            size: "Single Cutting",
            price: 15,
            addOns: [{ label: "Kadak (Extra Strong Brew)", price: 0 }]
          }
        ]
      },
      {
        id: "ord-seed-2",
        token: "#B-33",
        counter: "Counter 1 (Beverages)",
        customerName: "Pooja V.",
        slot: "Immediate",
        paymentMethod: "Campus ID Card",
        status: "READY",
        createdAt: now - 300000, // 5 mins ago
        readyAt: now - 30000,
        estimatedPrepTime: 3,
        totalAmount: 60,
        items: [
          {
            name: "Masala Chai",
            quantity: 2,
            size: "Double Cup",
            price: 25,
            addOns: [{ label: "Extra Crushed Ginger (Adrak)", price: 5 }]
          },
          {
            name: "Indori Poha with Crispy Sev",
            quantity: 1,
            size: "Regular Bowl",
            price: 30,
            addOns: []
          }
        ]
      },
      {
        id: "ord-seed-3",
        token: "#B-34",
        counter: "Counter 2 (Hot Snacks)",
        customerName: "Divyansh M.",
        slot: "Immediate",
        paymentMethod: "UPI Mock QR",
        status: "PREPARING",
        createdAt: now - 120000, // 2 mins ago
        readyAt: null,
        estimatedPrepTime: 5,
        totalAmount: 80,
        items: [
          {
            name: "Bombay Butter Vada Pav",
            quantity: 2,
            size: "Duo Combo (2 Vada Pavs)",
            price: 25,
            addOns: [{ label: "Melted Cheese Slice Inside", price: 15 }]
          },
          {
            name: "Warm Veggie Puff Pastry",
            quantity: 2,
            size: "Standard Puff",
            price: 20,
            addOns: []
          }
        ]
      }
    ];

    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(seededOrders));
  }

  // --- GETTERS ---
  getMenu() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MENU);
      return data ? JSON.parse(data) : INITIAL_MENU;
    } catch (e) {
      return INITIAL_MENU;
    }
  }

  getOrders() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  getWallet() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.WALLET);
      return data ? JSON.parse(data) : INITIAL_STUDENT_WALLET;
    } catch (e) {
      return INITIAL_STUDENT_WALLET;
    }
  }

  getMyTokenOrders() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MY_ORDERS);
      const myTokenList = data ? JSON.parse(data) : [];
      const allOrders = this.getOrders();
      return allOrders.filter(o => myTokenList.includes(o.id));
    } catch (e) {
      return [];
    }
  }

  // --- ORDER DISPATCHER ---
  getNextTokenNumber() {
    let current = parseInt(localStorage.getItem(STORAGE_KEYS.TOKEN_SEQ) || "34", 10);
    const next = current + 1;
    localStorage.setItem(STORAGE_KEYS.TOKEN_SEQ, next.toString());
    return `#B-${next}`;
  }

  createOrder({ items, paymentMethod, slot = "Immediate", studentName = "Student Guest" }) {
    const orders = this.getOrders();
    const token = this.getNextTokenNumber();
    
    // Calculate total amount
    const totalAmount = items.reduce((sum, item) => {
      const addOnsTotal = (item.addOns || []).reduce((aSum, a) => aSum + (a.price || 0), 0);
      return sum + ((item.basePrice + (item.sizePrice || 0) + addOnsTotal) * item.quantity);
    }, 0);

    // Heuristic estimated prep duration: max item prep time + 1 min queue factor
    const maxItemPrep = Math.max(...items.map(i => i.prepTime || 3), 2);
    const activePreparingCount = orders.filter(o => o.status === 'PREPARING').length;
    const estimatedPrepTime = maxItemPrep + Math.floor(activePreparingCount * 0.7);

    // Primary counter assignment
    const primaryCounter = items[0]?.counter || "Counter 2 (Hot Snacks)";

    const newOrder = {
      id: `ord-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      token,
      counter: primaryCounter,
      customerName: studentName,
      slot: slot,
      paymentMethod,
      status: "PREPARING", // Initial state
      createdAt: Date.now(),
      readyAt: null,
      collectedAt: null,
      estimatedPrepTime,
      totalAmount,
      items: items.map(i => ({
        id: i.id,
        name: i.name,
        quantity: i.quantity,
        size: i.selectedSize?.label || "Regular",
        sizePrice: i.selectedSize?.price || 0,
        basePrice: i.basePrice || i.price,
        addOns: i.addOns || [],
        prepTime: i.prepTime || 3,
        counter: i.counter || "Counter 1"
      }))
    };

    orders.unshift(newOrder);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));

    // Save to user's local token receipts list for offline retrieval
    try {
      const myTokens = JSON.parse(localStorage.getItem(STORAGE_KEYS.MY_ORDERS) || "[]");
      myTokens.unshift(newOrder.id);
      localStorage.setItem(STORAGE_KEYS.MY_ORDERS, JSON.stringify(myTokens.slice(0, 10)));
    } catch (e) {
      // ignore
    }

    // Deduct student wallet if paid with campus card
    if (paymentMethod === "Campus ID Card") {
      this.deductWallet(totalAmount);
    }

    // Broadcast creation
    this.broadcast({
      type: 'ORDER_CREATED',
      order: newOrder
    });

    return newOrder;
  }

  updateOrderStatus(orderId, newStatus) {
    const orders = this.getOrders();
    const orderIndex = orders.findIndex(o => o.id === orderId);
    if (orderIndex === -1) return null;

    const order = orders[orderIndex];
    order.status = newStatus;
    
    if (newStatus === 'READY') {
      order.readyAt = Date.now();
    } else if (newStatus === 'COLLECTED') {
      order.collectedAt = Date.now();
    }

    orders[orderIndex] = order;
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));

    this.broadcast({
      type: 'ORDER_STATUS_CHANGED',
      orderId,
      newStatus,
      order
    });

    return order;
  }

  // --- STOCK / INVENTORY MANAGEMENT ---
  toggleItemStock(itemId) {
    const menu = this.getMenu();
    const item = menu.find(i => i.id === itemId);
    if (!item) return null;

    item.inStock = !item.inStock;
    localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(menu));

    this.broadcast({
      type: 'STOCK_TOGGLED',
      itemId,
      inStock: item.inStock,
      itemName: item.name
    });

    return item;
  }

  // --- WALLET DEDUCTION ---
  deductWallet(amount) {
    const wallet = this.getWallet();
    wallet.balance = Math.max(0, wallet.balance - amount);
    localStorage.setItem(STORAGE_KEYS.WALLET, JSON.stringify(wallet));

    this.broadcast({
      type: 'WALLET_UPDATED',
      wallet
    });

    return wallet;
  }

  topUpWallet(amount = 200) {
    const wallet = this.getWallet();
    wallet.balance += amount;
    localStorage.setItem(STORAGE_KEYS.WALLET, JSON.stringify(wallet));

    this.broadcast({
      type: 'WALLET_UPDATED',
      wallet
    });

    return wallet;
  }

  // --- RESET DEMO ---
  resetToDemo() {
    localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(INITIAL_MENU));
    localStorage.setItem(STORAGE_KEYS.WALLET, JSON.stringify(INITIAL_STUDENT_WALLET));
    localStorage.setItem(STORAGE_KEYS.TOKEN_SEQ, "34");
    localStorage.setItem(STORAGE_KEYS.MY_ORDERS, "[]");
    this.seedInitialOrders();

    this.broadcast({
      type: 'DEMO_RESET'
    });
  }
}

export const state = new StateManager();
