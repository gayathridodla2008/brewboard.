// BrewBoard - Live Canteen Token Pickup Display (Wall Screen / Big TV Board)

import { state } from './state.js';
import { audio } from './audio.js';

export class WallDisplayController {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.lastAnnouncedToken = null;
    this.recentlyReadyToken = null;
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
        if (event.type === 'ORDER_STATUS_CHANGED' && event.newStatus === 'READY') {
          this.recentlyReadyToken = event.order.token;
          // Trigger audible announcement and chime
          audio.announceOrderReady(event.order.token, event.order.counter || "Counter 1");
          this.lastAnnouncedToken = event.order;
        }
        this.updateBoard();
      }
    });

    // Periodic refresh of timers
    setInterval(() => {
      this.updateBoardTimers();
    }, 15000);
  }

  render() {
    this.container.innerHTML = `
      <div class="wall-display-layout min-h-screen bg-slate-950 text-slate-100 flex flex-col p-4 sm:p-6 lg:p-8 select-none">
        
        <!-- Large Screen Header -->
        <header class="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
          
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center shadow-xl shadow-orange-500/20 text-white font-black text-2xl">
              BB
            </div>
            <div>
              <div class="flex items-center gap-3">
                <h1 class="text-2xl sm:text-4xl font-black tracking-tight text-white uppercase">
                  CANTEEN ORDER STATUS
                </h1>
                <span class="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs sm:text-sm font-black uppercase tracking-wider flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                  LIVE QUEUE
                </span>
              </div>
              <p class="text-xs sm:text-sm text-slate-400 font-medium">Campus Food Court & Cafe • Digital Wall Pickup Display</p>
            </div>
          </div>

          <!-- Wall Controls & Cafeteria Metrics -->
          <div class="flex items-center gap-3 sm:gap-4 flex-wrap">
            
            <!-- Cafeteria Status Indicator -->
            <div class="hidden md:flex items-center gap-3 px-4 py-2 rounded-2xl bg-slate-900 border border-slate-800 text-xs">
              <div>
                <span class="text-slate-500 uppercase text-[10px] block">Rush Status</span>
                <span class="font-bold text-amber-400 flex items-center gap-1">
                  <span>🔥 Peak Break Rush</span>
                </span>
              </div>
              <div class="h-6 w-px bg-slate-800"></div>
              <div>
                <span class="text-slate-500 uppercase text-[10px] block">Avg Prep Time</span>
                <span class="font-bold text-slate-200">~3.5 mins</span>
              </div>
            </div>

            <!-- Voice Announcement Control -->
            <button id="btnToggleVoice" class="px-3.5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-300 flex items-center gap-2 transition active:scale-95">
              <span id="voiceIcon">🔊</span>
              <span id="voiceStatusText">Voice: ON</span>
            </button>

            <!-- Replay Last Voice Announcement -->
            <button id="btnReplayAudio" class="px-3.5 py-2.5 rounded-2xl bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-xs font-bold text-orange-400 flex items-center gap-2 transition active:scale-95">
              <span>🔔 Test Chime / Announce</span>
            </button>

            <!-- Fullscreen TV mode -->
            <button id="btnToggleFullscreen" class="px-3.5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-300 flex items-center gap-2 transition active:scale-95">
              <span>⛶ TV Fullscreen</span>
            </button>

          </div>

        </header>

        <!-- Main Split Board (High-Contrast 2 Columns) -->
        <main class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 flex-1 py-6 sm:py-8">
          
          <!-- Column 1: Now Preparing (Yellow/Orange High-Contrast) -->
          <section class="flex flex-col rounded-3xl bg-slate-900/60 border-2 border-amber-500/30 overflow-hidden shadow-2xl">
            
            <div class="bg-gradient-to-r from-amber-600/90 to-orange-600/90 px-6 py-4 flex items-center justify-between text-white shadow-lg">
              <div class="flex items-center gap-3">
                <span class="w-3.5 h-3.5 rounded-full bg-white animate-pulse"></span>
                <h2 class="text-xl sm:text-2xl font-black tracking-wide uppercase">
                  NOW PREPARING
                </h2>
              </div>
              <span id="preparingCountBadge" class="text-sm font-black bg-black/30 px-3 py-1 rounded-xl">
                0 In Queue
              </span>
            </div>

            <div id="preparingTokensList" class="p-6 flex-1 overflow-y-auto space-y-4 max-h-[65vh]">
              <!-- Dynamically populated -->
            </div>

          </section>

          <!-- Column 2: Ready for Pickup (Green High-Contrast) -->
          <section class="flex flex-col rounded-3xl bg-slate-900/60 border-2 border-emerald-500/40 overflow-hidden shadow-2xl">
            
            <div class="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 flex items-center justify-between text-white shadow-lg">
              <div class="flex items-center gap-3">
                <span class="w-3.5 h-3.5 rounded-full bg-white animate-ping"></span>
                <h2 class="text-xl sm:text-2xl font-black tracking-wide uppercase">
                  READY FOR PICKUP
                </h2>
              </div>
              <span id="readyCountBadge" class="text-sm font-black bg-black/30 px-3 py-1 rounded-xl">
                0 Ready
              </span>
            </div>

            <div id="readyTokensList" class="p-6 flex-1 overflow-y-auto space-y-4 max-h-[65vh]">
              <!-- Dynamically populated -->
            </div>

          </section>

        </main>

        <!-- Wall Footer Ticker Bar -->
        <footer class="mt-auto pt-4 border-t border-slate-900 text-slate-500 text-xs flex flex-wrap items-center justify-between gap-4">
          <div class="flex items-center gap-2">
            <span class="text-amber-400 font-bold">Tip for Students:</span>
            <span>Show your digital token on your mobile screen at the designated pickup counter when your number flashes green.</span>
          </div>
          <div class="flex items-center gap-4 text-[11px]">
            <span>BrewBoard v1.0 • Multi-Display Real-Time Engine</span>
          </div>
        </footer>

      </div>
    `;

    this.updateBoard();
  }

  updateBoard() {
    const orders = state.getOrders();

    const preparingOrders = orders.filter(o => o.status === 'PREPARING');
    const readyOrders = orders.filter(o => o.status === 'READY');

    const prepList = document.getElementById('preparingTokensList');
    const readyList = document.getElementById('readyTokensList');
    const prepBadge = document.getElementById('preparingCountBadge');
    const readyBadge = document.getElementById('readyCountBadge');

    if (prepBadge) prepBadge.textContent = `${preparingOrders.length} In Queue`;
    if (readyBadge) readyBadge.textContent = `${readyOrders.length} Ready`;

    // Populate Preparing Column
    if (prepList) {
      if (preparingOrders.length === 0) {
        prepList.innerHTML = `
          <div class="h-full py-16 flex flex-col items-center justify-center text-slate-500">
            <span class="text-4xl mb-3">☕</span>
            <p class="text-base font-semibold text-slate-400">All caught up!</p>
            <p class="text-xs">No orders currently in the kitchen queue.</p>
          </div>
        `;
      } else {
        prepList.innerHTML = preparingOrders.map(o => {
          const elapsedMins = Math.max(1, Math.round((Date.now() - o.createdAt) / 60000));
          const itemsSummary = o.items.map(i => `${i.quantity}x ${i.name}`).join(', ');

          return `
            <div class="p-5 rounded-2xl bg-slate-800/80 border border-amber-500/30 flex items-center justify-between gap-4 shadow-lg hover:border-amber-400/50 transition">
              <div class="flex items-center gap-4">
                <div class="px-4 py-3 rounded-2xl bg-amber-500/10 border border-amber-500/40 text-amber-400 font-black text-3xl sm:text-4xl tracking-tight">
                  ${o.token}
                </div>
                <div>
                  <div class="flex items-center gap-2 mb-1">
                    <span class="text-xs uppercase font-extrabold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60">
                      ${o.counter}
                    </span>
                    ${o.slot !== 'Immediate' ? `
                      <span class="text-xs font-semibold text-orange-300 bg-orange-950/60 px-2 py-0.5 rounded">
                        Slot: ${o.slot}
                      </span>
                    ` : ''}
                  </div>
                  <div class="text-sm font-semibold text-slate-200 line-clamp-1">
                    ${itemsSummary}
                  </div>
                </div>
              </div>

              <div class="text-right">
                <div class="text-[10px] uppercase font-bold text-slate-400">Cooking</div>
                <div class="text-sm font-bold text-amber-400 flex items-center gap-1 justify-end">
                  <span class="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                  <span>~${o.estimatedPrepTime}m prep</span>
                </div>
              </div>
            </div>
          `;
        }).join('');
      }
    }

    // Populate Ready for Pickup Column
    if (readyList) {
      if (readyOrders.length === 0) {
        readyList.innerHTML = `
          <div class="h-full py-16 flex flex-col items-center justify-center text-slate-500">
            <span class="text-4xl mb-3">🔔</span>
            <p class="text-base font-semibold text-slate-400">No ready orders waiting</p>
            <p class="text-xs">Prepared orders will flash here with an audible chime.</p>
          </div>
        `;
      } else {
        readyList.innerHTML = readyOrders.map(o => {
          const isRecentlyReady = this.recentlyReadyToken === o.token;
          const itemsSummary = o.items.map(i => `${i.quantity}x ${i.name}`).join(', ');

          return `
            <div class="p-5 rounded-2xl bg-slate-800/90 border-2 ${isRecentlyReady ? 'border-emerald-400 shadow-xl shadow-emerald-500/30 scale-[1.02] animate-bounce-once' : 'border-emerald-500/40'} flex items-center justify-between gap-4 transition-all duration-300">
              <div class="flex items-center gap-4">
                <div class="px-5 py-3 rounded-2xl bg-emerald-500 text-slate-950 font-black text-4xl sm:text-5xl tracking-tight shadow-md">
                  ${o.token}
                </div>
                <div>
                  <div class="flex items-center gap-2 mb-1">
                    <span class="text-xs uppercase font-black text-emerald-300 bg-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-700">
                      ${o.counter.toUpperCase()}
                    </span>
                    <span class="text-xs font-extrabold text-white">
                      PLEASE COLLECT
                    </span>
                  </div>
                  <div class="text-sm font-bold text-slate-200 line-clamp-1">
                    ${itemsSummary}
                  </div>
                </div>
              </div>

              <div class="text-right">
                <button 
                  data-manual-announce="${o.token}" 
                  data-counter="${o.counter}"
                  class="btn-call-token px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-bold border border-emerald-500/40 transition flex items-center gap-1.5"
                  title="Announce via Voice Speaker"
                >
                  <span>🔊 Call Again</span>
                </button>
              </div>
            </div>
          `;
        }).join('');
      }
    }
  }

  updateBoardTimers() {
    this.updateBoard();
  }

  bindEvents() {
    // Voice Toggle
    const btnToggleVoice = document.getElementById('btnToggleVoice');
    btnToggleVoice?.addEventListener('click', () => {
      const isVoiceOn = audio.toggleVoice();
      const statusText = document.getElementById('voiceStatusText');
      const icon = document.getElementById('voiceIcon');
      if (statusText) statusText.textContent = isVoiceOn ? 'Voice: ON' : 'Voice: OFF';
      if (icon) icon.textContent = isVoiceOn ? '🔊' : '🔇';
    });

    // Test Chime / Announce
    const btnReplay = document.getElementById('btnReplayAudio');
    btnReplay?.addEventListener('click', () => {
      if (this.lastAnnouncedToken) {
        audio.announceOrderReady(this.lastAnnouncedToken.token, this.lastAnnouncedToken.counter);
      } else {
        audio.announceOrderReady("#B-35", "Counter 1 (Beverages)");
      }
    });

    // Fullscreen toggle
    const btnFullscreen = document.getElementById('btnToggleFullscreen');
    btnFullscreen?.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
        }
      }
    });

    // Individual token "Call Again" button
    this.container.addEventListener('click', (e) => {
      const callBtn = e.target.closest('.btn-call-token');
      if (callBtn) {
        const token = callBtn.dataset.manualAnnounce;
        const counter = callBtn.dataset.counter;
        audio.announceOrderReady(token, counter);
      }
    });
  }
}
