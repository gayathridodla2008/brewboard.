# BrewBoard: ZeroQueue Canteen Hack 🥪⚡

> **A high-speed, touch-friendly campus canteen ordering & real-time token pickup system designed to eliminate 15-minute lecture break bottlenecks.**

---

## 🎯 Problem Context
College canteens and campus cafes experience massive, chaotic crowding during short 15-minute lecture breaks and lunch hours. Hundreds of hungry students jostle at crowded billing counters simultaneously, resulting in lost order slips, incorrect change calculations, and students missing their next classes while waiting for food. Canteen staff are overwhelmed handling cash and shouting out order numbers in noisy cafeterias, causing immense stress and food wastage.

---

## 💡 The BrewBoard Solution
**BrewBoard** solves campus canteen congestion with a synchronized 3-screen ecosystem:
1. **Student Express Kiosk:** A guest-flow touch kiosk enabling students to customize items and check out in **under 30 seconds**.
2. **Live Canteen Wall Pickup Display:** A high-contrast, large-screen TV display with **Now Preparing** and **Ready for Pickup** columns, featuring dual-tone chime alerts and Web Speech automated announcements.
3. **Kitchen Order Ticket (KOT) Console:** A staff touch tablet interface allowing cooks to advance tickets from *Preparing* to *Ready* with one tap, and toggle sold-out items instantly during peak rush hours.

---

## 🚀 Key Features

### ✅ Core Features (Must-Have)
- **Touch-Friendly Kiosk Menu Interface:**
  - 20 college staple foods (Samosa, Chai, Maggi, Cold Coffee, Vada Pav, Poha, Sandwiches, Dosas).
  - Category filters (*Chai & Drinks*, *Hot Snacks*, *Quick Breakfast*, *Lunch & Meals*).
  - Quick quantity steppers and instant search with tags.
  - Zero-login guest flow designed to complete orders in < 30 seconds.
- **Item Customizer & Dynamic Pricing:**
  - Drink sizes (*Regular*, *Large/Jumbo*) with instant price recalculation.
  - Custom food add-ons (*Extra Cheese*, *Extra Ice Cream Scoop*, *Less Sugar*, *Kadak Brew*, *Oat Milk*, *Peri-Peri Masala*).
- **Quick Digital UPI Mock Checkout:**
  - Dynamic QR code generation with authentic UPI deep link formats.
  - Scanner laser animation, countdown timer, and simulated 1-tap payment approval.
  - Optional 3-second auto-approval mode for hands-free kiosk operation.
- **Digital Sequential Token Dispatcher:**
  - Issues sequential tokens (e.g., `#B-35`, `#B-36`) upon payment.
  - Calculates estimated wait times based on kitchen backlog heuristics.
  - Offline-safe caching in `localStorage` so students never lose their token in basement canteen dead zones.
- **Live Canteen Token Pickup Display:**
  - High-contrast, large-screen dark mode display built for cafeteria LED/TV screens.
  - Two prominent split columns: **Now Preparing** (amber/orange) and **Ready for Pickup** (emerald green).
  - Fullscreen TV presentation mode (`⛶ TV Fullscreen`).
- **Kitchen Order Ticket (KOT) Console:**
  - Touch-optimized order tickets displaying itemized recipes, sizes, and explicit customization badges.
  - One-tap status progression: `Mark Ready & Sound Chime` ➔ `Handed Over to Student (Archive)`.
  - Filter orders by pickup counter (*Beverages*, *Hot Snacks*, *Meals*).

### 🌟 Stretch Features (Good-to-Have)
- **⏰ Lunch Rush Slot Pre-Booking:**
  - Students can pre-schedule pickup for upcoming break times (e.g., `12:45 PM`, `1:15 PM`, `1:45 PM`, `2:15 PM`) to bypass peak rush lines.
- **💳 Campus Student ID Card Wallet:**
  - Simulates an RFID campus smart card with instant tap-to-pay deduction.
  - Shows student name (*Aarav Sharma*), department, and live card balance (*₹450.00*). Includes instant demo top-up.
- **🔊 Audible Token Voice Announcements & Chime:**
  - Synthesizes a dual-tone melodic counter chime using the **Web Audio API** (no external audio files needed).
  - Synthesizes automated voice call-outs (*"Token B-35 is ready for pickup at Counter 1"*) using the **Web Speech API**.
- **📦 Instant Stock & Sold-Out Toggles:**
  - Kitchen staff can mark any menu item as **"Sold Out"** with 1 tap.
  - Immediately broadcasts across the system, disabling the item on the kiosk and displaying a *Sold Out* badge.
- **🔀 Presenter Split Screen View:**
  - Allows judges and evaluators to view the Student Kiosk on the left and Live Wall Display on the right simultaneously on a single monitor.

---

## 🎬 What a Good Demo Looks Like (Hackathon Walkthrough)

To present the exact flow described in the problem brief:

1. **Open the Application:**
   - Open `index.html` in your browser.
2. **Place the Demo Order:**
   - Tap **"Cold Coffee"** (₹40).
   - In the Customizer modal, select **"Extra Vanilla Ice Cream Scoop"** (+₹15). Total dynamically updates to **₹55**.
   - Tap **"Add to Tray"** ➔ Tap **"⚡ Quick Pay & Token"**.
3. **Simulate Digital Payment:**
   - In the UPI QR modal, tap **"Simulate Payment & Get Token (₹55)"**.
   - A digital pickup receipt pops up with **Token #B-35** and notes: *"Offline-Safe: Token saved in device storage for basement dead zones"*.
4. **Inspect the Wall Display:**
   - Tap **"📺 Wall Display"** in the top navigation bar.
   - Observe **Token #B-35** in the **NOW PREPARING** column with preparation timer indicator.
5. **Kitchen Cook Advances the Order:**
   - Tap **"👨‍🍳 Kitchen Console"** in the top navigation bar.
   - Locate ticket **#B-35** (showing `1x Thick Cold Coffee [Regular]` with `★ Extra Vanilla Ice Cream Scoop`).
   - Tap **"🔔 Mark Ready & Sound Chime"**.
6. **Watch the Live Result:**
   - Switch back to **"📺 Wall Display"** (or use **"🔀 Split Demo"** mode):
     - **Token #B-35** instantly slides into the green **READY FOR PICKUP** column!
     - An audible 2-tone melodic chime plays through the speakers.
     - An automated voice announces: *"Token B 35 is ready for pickup at Counter 1 (Beverages)"*.
7. **Shortcut Auto-Demo:**
   - You can also simply click the **"⚡ Auto-Demo"** button in the top navigation bar anytime to trigger this complete sequence in one tap!

---

## 🛠️ Technology Stack & Architecture
- **Frontend:** Vanilla modern ES6+ modules with component controllers (`KioskController`, `WallDisplayController`, `KitchenConsoleController`).
- **Styling:** Tailwind CSS (via CDN) with custom CSS animations (`@keyframes scan`, radar pulses, high-contrast TV display styles).
- **Audio Synthesizer:** Native **Web Audio API** for synthesized melodic chimes + **Web Speech API** (`SpeechSynthesisUtterance`) for voice announcements.
- **Real-Time Cross-Tab Synchronization:** `BroadcastChannel` API with fallback to `window.addEventListener('storage')`. Any order placed or status changed in one tab synchronizes instantly across other open tabs/windows with zero latency!
- **Persistence & Offline Support:** Browser `localStorage` storing `CanteenMenu`, `Orders`, `StudentWallet`, and active `PickupTokens`.

---

## 📂 Project Structure
```
.FSD/
├── index.html            # Master single-page app with role navigation & split demo mode
├── css/
│   └── styles.css        # QR scanning animations, high-contrast TV styling, print layout
├── js/
│   ├── app.js            # Master router, view switcher, and hackathon demo runner
│   ├── audio.js          # Web Audio API chime generator & Web Speech announcement engine
│   ├── data.js           # 20 college canteen staple foods, add-ons, slots, and student wallet
│   ├── kiosk.js          # Student touch kiosk, customizer modal, cart drawer, and UPI QR modal
│   ├── kitchenConsole.js # Kitchen KOT console, 1-tap ticket progression, and stock toggles
│   ├── state.js          # Global state manager, sequential token dispatcher, and BroadcastChannel
│   └── wallDisplay.js    # Canteen wall pickup screen with split Preparing/Ready columns
└── README.md             # Documentation, feature guide, and demo walkthrough
```

---

## 💻 Running the App
Since BrewBoard uses modern browser-native ESM modules and Tailwind CSS CDN:
- **Option 1 (Direct):** Double-click `index.html` or drag it into any modern web browser (Google Chrome, Microsoft Edge, Brave, Firefox, Safari).
- **Option 2 (Local Server):** If you prefer running a static server, run any simple HTTP server:
  - `npx serve .` OR `python -m http.server 3000`
  - Open `http://localhost:3000`

---
*Created for the BrewBoard: ZeroQueue Canteen Hackathon.*
