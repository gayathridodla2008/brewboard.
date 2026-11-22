// BrewBoard - Master Application Router & Hackathon Demo Orchestrator

import { KioskController } from './kiosk.js';
import { WallDisplayController } from './wallDisplay.js';
import { KitchenConsoleController } from './kitchenConsole.js';
import { state } from './state.js';
import { audio } from './audio.js';

class BrewBoardApp {
  constructor() {
    this.currentView = 'kiosk'; // 'kiosk', 'wall', 'kitchen', 'split'
    this.kioskCtrl = null;
    this.wallCtrl = null;
    this.kitchenCtrl = null;

    this.init();
  }

  init() {
    this.bindGlobalNavigation();
    this.switchView('kiosk');

    // Listen for cross-view navigation requests
    window.addEventListener('SWITCH_VIEW', (e) => {
      if (e.detail?.view) {
        this.switchView(e.detail.view);
      }
    });

    // Check URL query parameters for view override (e.g. index.html?view=wall)
    const urlParams = new URLSearchParams(window.location.search);
    const viewParam = urlParams.get('view');
    if (viewParam && ['kiosk', 'wall', 'kitchen', 'split'].includes(viewParam)) {
      this.switchView(viewParam);
    }
  }

  bindGlobalNavigation() {
    const navButtons = document.querySelectorAll('[data-view-target]');
    navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetView = btn.dataset.viewTarget;
        audio.playTapSound();
        this.switchView(targetView);
      });
    });

    // Quick Hackathon Demo Runner (Cold Coffee + Extra Ice Cream -> Pay UPI -> Token #35)
    const btnDemoFlow = document.getElementById('btnRunDemoFlow');
    btnDemoFlow?.addEventListener('click', () => {
      this.runHackathonDemoFlow();
    });

    // Reset Demo Data
    const btnResetDemo = document.getElementById('btnResetDemoData');
    btnResetDemo?.addEventListener('click', () => {
      if (confirm('Reset demo orders and queue to initial state?')) {
        audio.playTapSound();
        state.resetToDemo();
        alert('BrewBoard reset to initial demo state!');
      }
    });

    // Audio Test Chime
    const btnTestAudio = document.getElementById('btnTestAudioChime');
    btnTestAudio?.addEventListener('click', () => {
      audio.announceOrderReady("#B-35", "Counter 1 (Beverages)");
    });
  }

  switchView(viewName) {
    this.currentView = viewName;

    // Update active nav button styling
    document.querySelectorAll('[data-view-target]').forEach(btn => {
      const isCurrent = btn.dataset.viewTarget === viewName;
      if (isCurrent) {
        btn.classList.add('bg-orange-500', 'text-white', 'shadow-md');
        btn.classList.remove('text-slate-400', 'hover:text-white');
      } else {
        btn.classList.remove('bg-orange-500', 'text-white', 'shadow-md');
        btn.classList.add('text-slate-400', 'hover:text-white');
      }
    });

    const singleContainer = document.getElementById('singleViewContainer');
    const splitContainer = document.getElementById('splitContainer');

    if (viewName === 'split') {
      singleContainer.classList.add('hidden');
      splitContainer.classList.remove('hidden');

      // Initialize both views side by side
      if (!this.kioskCtrl) this.kioskCtrl = new KioskController('splitKioskView');
      if (!this.wallCtrl) this.wallCtrl = new WallDisplayController('splitWallView');
      return;
    }

    // Single view mode
    singleContainer.classList.remove('hidden');
    splitContainer.classList.add('hidden');

    if (viewName === 'kiosk') {
      this.kioskCtrl = new KioskController('singleViewContainer');
    } else if (viewName === 'wall') {
      this.wallCtrl = new WallDisplayController('singleViewContainer');
    } else if (viewName === 'kitchen') {
      this.kitchenCtrl = new KitchenConsoleController('singleViewContainer');
    }
  }

  // --- ONE-TAP HACKATHON DEMO FLOW ---
  // Matches "What a Good Demo Looks Like" from Problem Brief:
  // "The student taps 'Cold Coffee' (₹40), selects 'Extra Ice Cream' (+₹15), and clicks 'Quick Pay'.
  // A mock UPI QR appears; clicking 'Pay Now' simulates payment and issues Token #35.
  // The presenter switches to the Canteen Wall Screen, where Token #35 appears in 'Preparing'.
  // The canteen cook taps 'Ready', moving Token #35 to the green 'Ready for Pickup' column with an audible chime."
  runHackathonDemoFlow() {
    audio.playTapSound();

    // 1. Create Cold Coffee + Extra Ice cream order directly
    const coldCoffeeItem = {
      id: "item-1",
      name: "Thick Cold Coffee",
      basePrice: 40,
      selectedSize: { label: "Regular", price: 0 },
      addOns: [{ id: "ice-cream", label: "Extra Vanilla Ice Cream Scoop", price: 15 }],
      quantity: 1,
      prepTime: 3,
      counter: "Counter 1 (Beverages)"
    };

    const newOrder = state.createOrder({
      items: [coldCoffeeItem],
      paymentMethod: "UPI Mock QR",
      slot: "Immediate",
      studentName: "Hackathon Demo"
    });

    audio.playReadyChime();

    // Switch to Wall Screen so judges see it immediately in "Now Preparing"
    this.switchView('wall');

    // Notify presenter
    const notification = document.createElement('div');
    notification.className = "fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-2xl border border-emerald-400 flex items-center gap-3 animate-bounce";
    notification.innerHTML = `
      <div class="text-2xl">🎉</div>
      <div>
        <div class="font-extrabold text-sm">Demo Order Dispatched!</div>
        <div class="text-xs">Cold Coffee + Ice Cream (₹55) placed as <strong>${newOrder.token}</strong> in Preparing column!</div>
      </div>
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 5000);
  }
}

// Bootstrap once DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.brewBoard = new BrewBoardApp();
});
