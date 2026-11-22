// BrewBoard Unified Bundle - Zero-Dependency Browser Runtime
// Supports both direct file:// double-click and http:// localhost hosting

(function() {
  'use strict';

  // ==========================================
  // 1. DATA & CONFIGURATION
  // ==========================================
  const INITIAL_MENU = [
    {
      id: "item-1",
      name: "Thick Cold Coffee",
      category: "beverages",
      price: 40,
      prepTime: 3,
      isVeg: true,
      tag: "Bestseller",
      description: "Rich, chilled, frothy blended coffee topped with cocoa dust.",
      image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500&auto=format&fit=crop&q=60",
      inStock: true,
      counter: "Counter 1 (Beverages)",
      customizations: {
        sizes: [
          { label: "Regular", price: 0 },
          { label: "Large (Jumbo)", price: 20 }
        ],
        addOns: [
          { id: "ice-cream", label: "Extra Vanilla Ice Cream Scoop", price: 15 },
          { id: "choco-syrup", label: "Double Chocolate Drizzle", price: 10 },
          { id: "less-sugar", label: "Less Sugar", price: 0 },
          { id: "oat-milk", label: "Oat Milk Alternative", price: 15 }
        ]
      }
    },
    {
      id: "item-2",
      name: "Cutting Chai",
      category: "beverages",
      price: 15,
      prepTime: 2,
      isVeg: true,
      tag: "Campus Classic",
      description: "Brewed strong with fresh crushed ginger and aromatic green cardamom.",
      image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&auto=format&fit=crop&q=60",
      inStock: true,
      counter: "Counter 1 (Beverages)",
      customizations: {
        sizes: [
          { label: "Single Cutting", price: 0 },
          { label: "Double Cup", price: 12 }
        ],
        addOns: [
          { id: "extra-ginger", label: "Extra Crushed Ginger (Adrak)", price: 5 },
          { id: "less-sugar", label: "Less Sugar / Feeka", price: 0 },
          { id: "strong-kadak", label: "Kadak (Extra Strong Brew)", price: 0 }
        ]
      }
    },
    {
      id: "item-3",
      name: "Crispy Samosa (2 pcs)",
      category: "snacks",
      price: 25,
      prepTime: 2,
      isVeg: true,
      tag: "Quick Pick",
      description: "Golden flaky pastry stuffed with spicy herbed potato-pea masala.",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=60",
      inStock: true,
      counter: "Counter 2 (Hot Snacks)",
      customizations: {
        sizes: [
          { label: "Regular (2 pcs)", price: 0 },
          { label: "Snack Box (4 pcs)", price: 22 }
        ],
        addOns: [
          { id: "mint-chutney", label: "Extra Spicy Green Chutney", price: 5 },
          { id: "fried-chilly", label: "Extra Fried Salted Chillies", price: 5 },
          { id: "extra-pav", label: "Add 1 Butter Pav", price: 10 }
        ]
      }
    },
    {
      id: "item-4",
      name: "Cheese Butter Maggi",
      category: "snacks",
      price: 45,
      prepTime: 4,
      isVeg: true,
      tag: "Student Favorite",
      description: "Street-style steaming Maggi loaded with butter and melting grated cheese.",
      image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?w=500&auto=format&fit=crop&q=60",
      inStock: true,
      counter: "Counter 2 (Hot Snacks)",
      customizations: {
        sizes: [
          { label: "Standard Bowl", price: 0 },
          { label: "Double Block Monster", price: 25 }
        ],
        addOns: [
          { id: "extra-cheese", label: "Extra Cheddar Cheese Layer", price: 15 },
          { id: "extra-veggies", label: "Corn & Capsicum Mix", price: 10 },
          { id: "extra-spicy", label: "Peri-Peri Masala Kick", price: 5 }
        ]
      }
    },
    {
      id: "item-5",
      name: "Bombay Butter Vada Pav",
      category: "snacks",
      price: 25,
      prepTime: 2,
      isVeg: true,
      tag: "Campus Classic",
      description: "Crispy spiced potato dumpling in butter-toasted pav with dry garlic chutney.",
      image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500&auto=format&fit=crop&q=60",
      inStock: true,
      counter: "Counter 2 (Hot Snacks)",
      customizations: {
        sizes: [
          { label: "Single Vada Pav", price: 0 },
          { label: "Duo Combo (2 Vada Pavs)", price: 20 }
        ],
        addOns: [
          { id: "cheese-slice", label: "Melted Cheese Slice Inside", price: 15 },
          { id: "extra-dry-garlic", label: "Extra Lasun Chutney (Spicy)", price: 5 }
        ]
      }
    },
    {
      id: "item-6",
      name: "Bombay Grilled Sandwich",
      category: "meals",
      price: 55,
      prepTime: 5,
      isVeg: true,
      tag: "Bestseller",
      description: "Triple-decker sandwich with cucumber, beetroot, potato, butter, and chaat masala.",
      image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&auto=format&fit=crop&q=60",
      inStock: true,
      counter: "Counter 2 (Hot Snacks)",
      customizations: {
        sizes: [
          { label: "Regular 4-Triangle", price: 0 },
          { label: "Jumbo Cheese Grill", price: 25 }
        ],
        addOns: [
          { id: "extra-cheese", label: "Extra Melted Cheese Layer", price: 20 },
          { id: "mayo-spread", label: "Garlic Mayo Spread", price: 10 },
          { id: "less-spicy", label: "Mild / Less Green Chutney", price: 0 }
        ]
      }
    },
    {
      id: "item-7",
      name: "Masala Dosa with Chutneys",
      category: "breakfast",
      price: 60,
      prepTime: 6,
      isVeg: true,
      tag: "Chef Special",
      description: "Crisp golden crepe filled with tempered potato mash, served with sambar & coconut chutney.",
      image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500&auto=format&fit=crop&q=60",
      inStock: true,
      counter: "Counter 3 (Meals & South)",
      customizations: {
        sizes: [
          { label: "Standard Dosa", price: 0 },
          { label: "Paper Butter Roast (Large)", price: 20 }
        ],
        addOns: [
          { id: "extra-ghee", label: "Pure Desi Ghee Topping", price: 15 },
          { id: "cheese-dosa", label: "Grated Mozzarella Stuffing", price: 20 },
          { id: "extra-sambar", label: "Extra Hot Sambar Bowl", price: 10 }
        ]
      }
    },
    {
      id: "item-8",
      name: "Steamed Idli Sambar (3 pcs)",
      category: "breakfast",
      price: 40,
      prepTime: 2,
      isVeg: true,
      tag: "Healthy & Fast",
      description: "Soft pillowy fermented rice cakes served with hot lentil sambar and fresh coconut dip.",
      image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60",
      inStock: true,
      counter: "Counter 3 (Meals & South)",
      customizations: {
        sizes: [
          { label: "Plate of 3 pcs", price: 0 },
          { label: "Idli-Vada Combo (2 Idli + 1 Medu Vada)", price: 15 }
        ],
        addOns: [
          { id: "podi-ghee", label: "Gunpowder (Podi) & Ghee Dip", price: 15 },
          { id: "extra-chutney", label: "Double Coconut Chutney", price: 5 }
        ]
      }
    },
    {
      id: "item-9",
      name: "Indori Poha with Crispy Sev",
      category: "breakfast",
      price: 30,
      prepTime: 2,
      isVeg: true,
      tag: "Quick Pick",
      description: "Light turmeric flattened rice with mustard, roasted peanuts, fresh coriander, and lemon.",
      image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=500&auto=format&fit=crop&q=60",
      inStock: true,
      counter: "Counter 3 (Meals & South)",
      customizations: {
        sizes: [
          { label: "Regular Bowl", price: 0 },
          { label: "Heavy Morning Bowl", price: 15 }
        ],
        addOns: [
          { id: "extra-sev", label: "Double Ratlami Sev & Pomegranate", price: 5 },
          { id: "spicy-boiled-chana", label: "Tari Chana Curry Gravy on Top", price: 10 }
        ]
      }
    },
    {
      id: "item-10",
      name: "Irani Bun Maska with Jam",
      category: "breakfast",
      price: 25,
      prepTime: 2,
      isVeg: true,
      tag: "Campus Classic",
      description: "Pillow-soft sweet bun generously smeared with salted Amul butter and mixed fruit jam.",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=60",
      inStock: true,
      counter: "Counter 1 (Beverages)",
      customizations: {
        sizes: [
          { label: "Single Bun", price: 0 },
          { label: "Toasted Crispy Bun", price: 5 }
        ],
        addOns: [
          { id: "extra-butter", label: "Extra Amul Butter Swirl", price: 10 },
          { id: "cheese-slice", label: "Add Cheese Slice", price: 15 }
        ]
      }
    },
    {
      id: "item-11",
      name: "Paneer Tikka Kathi Roll",
      category: "meals",
      price: 75,
      prepTime: 7,
      isVeg: true,
      tag: "Chef Special",
      description: "Smoky tandoori paneer cubes wrapped in flaky paratha with mint mayo and pickled onions.",
      image: "https://images.unsplash.com/photo-1626777553635-be322b7f75d5?w=500&auto=format&fit=crop&q=60",
      inStock: true,
      counter: "Counter 2 (Hot Snacks)",
      customizations: {
        sizes: [
          { label: "Single Roll", price: 0 },
          { label: "Double Paneer Filling", price: 30 }
        ],
        addOns: [
          { id: "cheese-roll", label: "Grated Mozzarella Inside", price: 15 },
          { id: "extra-mint", label: "Spicy Tandoori Mayo Dip", price: 10 },
          { id: "whole-wheat", label: "Whole Wheat Roti Base", price: 5 }
        ]
      }
    },
    {
      id: "item-12",
      name: "Warm Veggie Puff Pastry",
      category: "snacks",
      price: 20,
      prepTime: 1,
      isVeg: true,
      tag: "Instant 60s",
      description: "Flaky golden bakery puff stuffed with lightly curried carrots, beans, and potatoes.",
      image: "https://images.unsplash.com/photo-1621996346565-e3d5d6281691?w=500&auto=format&fit=crop&q=60",
      inStock: true,
      counter: "Counter 2 (Hot Snacks)",
      customizations: {
        sizes: [
          { label: "Standard Puff", price: 0 }
        ],
        addOns: [
          { id: "cheese-in-puff", label: "Stuffed Cheese Slice & Toasted", price: 15 },
          { id: "schezwan-dip", label: "Schezwan Sauce Sachet", price: 5 }
        ]
      }
    },
    {
      id: "item-13",
      name: "Paneer Stuffed Puff",
      category: "snacks",
      price: 30,
      prepTime: 1,
      isVeg: true,
      tag: "Hot Seller",
      description: "Freshly baked puff with spicy cottage cheese chunks and roasted cumin seasoning.",
      image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=500&auto=format&fit=crop&q=60",
      inStock: true,
      counter: "Counter 2 (Hot Snacks)",
      customizations: {
        sizes: [
          { label: "Standard Puff", price: 0 }
        ],
        addOns: [
          { id: "toasted-butter", label: "Butter Toasted on Tawa", price: 5 },
          { id: "extra-mayo", label: "Tandoori Mayo Drizzle", price: 8 }
        ]
      }
    },
    {
      id: "item-14",
      name: "Amritsari Chole Kulche Bowl",
      category: "meals",
      price: 70,
      prepTime: 5,
      isVeg: true,
      tag: "Bestseller",
      description: "Spicy tangy chickpea curry served with 2 warm soft butter-brushed tandoori kulchas.",
      image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=500&auto=format&fit=crop&q=60",
      inStock: true,
      counter: "Counter 3 (Meals & South)",
      customizations: {
        sizes: [
          { label: "Bowl with 2 Kulchas", price: 0 },
          { label: "Combo with 3 Kulchas + Buttermilk", price: 30 }
        ],
        addOns: [
          { id: "extra-kulcha", label: "1 Extra Butter Kulcha", price: 15 },
          { id: "extra-raita", label: "Boondi Raita Bowl", price: 15 },
          { id: "extra-butter", label: "Amul Butter Cube on Chole", price: 10 }
        ]
      }
    },
    {
      id: "item-15",
      name: "Authentic South Filter Coffee",
      category: "beverages",
      price: 25,
      prepTime: 2,
      isVeg: true,
      tag: "Campus Classic",
      description: "Decoction brewed fresh in brass filters with piping hot frothy cow milk.",
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=60",
      inStock: true,
      counter: "Counter 1 (Beverages)",
      customizations: {
        sizes: [
          { label: "Standard Tumbler", price: 0 },
          { label: "Big Davara Tumbler", price: 15 }
        ],
        addOns: [
          { id: "strong-decoction", label: "Extra Strong Decoction", price: 0 },
          { id: "less-sugar", label: "Zero Added Sugar", price: 0 }
        ]
      }
    },
    {
      id: "item-16",
      name: "Lemon Mint Ice Cooler",
      category: "beverages",
      price: 30,
      prepTime: 2,
      isVeg: true,
      tag: "Refreshing",
      description: "Freshly squeezed lemon juice, crushed garden mint, black salt, and chilled soda fizz.",
      image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop&q=60",
      inStock: true,
      counter: "Counter 1 (Beverages)",
      customizations: {
        sizes: [
          { label: "300ml Cup", price: 0 },
          { label: "500ml Jumbo Mason", price: 15 }
        ],
        addOns: [
          { id: "sweet-salted", label: "Sweet & Salted Balance", price: 0 },
          { id: "chia-seeds", label: "Add Sabja (Chia) Seeds", price: 10 }
        ]
      }
    },
    {
      id: "item-17",
      name: "Crispy Medu Vada (2 pcs)",
      category: "breakfast",
      price: 35,
      prepTime: 3,
      isVeg: true,
      tag: "Hot & Crispy",
      description: "Golden crunchy black-gram lentil fritters tempered with peppercorns and curry leaves.",
      image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=500&auto=format&fit=crop&q=60",
      inStock: true,
      counter: "Counter 3 (Meals & South)",
      customizations: {
        sizes: [
          { label: "2 Pieces", price: 0 },
          { label: "Sambar Dip Plate (Soaked Vadas)", price: 10 }
        ],
        addOns: [
          { id: "extra-sambar", label: "Extra Sambar Bowl", price: 10 },
          { id: "coconut-chutney", label: "Spicy Coconut Chutney", price: 5 }
        ]
      }
    },
    {
      id: "item-18",
      name: "Cheese Chilly Toast",
      category: "snacks",
      price: 50,
      prepTime: 4,
      isVeg: true,
      tag: "Crowd Favorite",
      description: "Toasted white bread coated with melted cheese, chopped green peppers, and chili flakes.",
      image: "https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?w=500&auto=format&fit=crop&q=60",
      inStock: true,
      counter: "Counter 2 (Hot Snacks)",
      customizations: {
        sizes: [
          { label: "2 Big Slices", price: 0 },
          { label: "Double Cheese Stack (4 Slices)", price: 40 }
        ],
        addOns: [
          { id: "extra-jalapeno", label: "Pickled Jalapenos on top", price: 10 },
          { id: "oregano-sprinkle", label: "Extra Oregano & Herbs", price: 0 }
        ]
      }
    },
    {
      id: "item-19",
      name: "Rajma Masala with Jeera Rice",
      category: "meals",
      price: 65,
      prepTime: 4,
      isVeg: true,
      tag: "Lunch Rush Hit",
      description: "Home-style simmered red kidney beans in tomato onion gravy over aromatic cumin rice.",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=60",
      inStock: true,
      counter: "Counter 3 (Meals & South)",
      customizations: {
        sizes: [
          { label: "Standard Bento Box", price: 0 },
          { label: "Double Rice & Curry Jumbo", price: 25 }
        ],
        addOns: [
          { id: "extra-curd", label: "Cup of Sweet Curd / Dahi", price: 15 },
          { id: "papad-pickle", label: "Roasted Papad & Spicy Achar", price: 10 }
        ]
      }
    },
    {
      id: "item-20",
      name: "Kulhad Badam Milk (Hot / Cold)",
      category: "beverages",
      price: 35,
      prepTime: 2,
      isVeg: true,
      tag: "Campus Classic",
      description: "Slow-simmered almond saffron milk garnished with pistachio flakes in an earthen kulhad.",
      image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=500&auto=format&fit=crop&q=60",
      inStock: true,
      counter: "Counter 1 (Beverages)",
      customizations: {
        sizes: [
          { label: "Hot in Earthen Kulhad", price: 0 },
          { label: "Chilled Badam Frappe", price: 5 }
        ],
        addOns: [
          { id: "extra-nuts", label: "Extra Pistachio & Almond Crunch", price: 10 },
          { id: "kesar-strand", label: "Extra Kashmiri Kesar Touch", price: 10 }
        ]
      }
    }
  ];

  const LUNCH_SLOTS = [
    { id: "now", label: "⚡ Prepare Immediately (Break Now)", time: "Immediate", tag: "Fastest" },
    { id: "slot-1", label: "⏰ 12:45 PM - Early Lunch Slot", time: "12:45 PM", tag: "Slot Available" },
    { id: "slot-2", label: "⏰ 1:15 PM - Main Lecture Break", time: "1:15 PM", tag: "Popular Rush" },
    { id: "slot-3", label: "⏰ 1:45 PM - Afternoon Break", time: "1:45 PM", tag: "Slot Available" },
    { id: "slot-4", label: "⏰ 2:15 PM - Post-Lab Lunch", time: "2:15 PM", tag: "Light Crowd" }
  ];

  const CATEGORIES = [
    { id: "all", label: "All Items", icon: "sparkles" },
    { id: "beverages", label: "Chai & Drinks", icon: "coffee" },
    { id: "snacks", label: "Hot Snacks & Maggi", icon: "flame" },
    { id: "breakfast", label: "Quick Breakfast", icon: "sun" },
    { id: "meals", label: "Lunch & Meals", icon: "utensils" }
  ];

  const INITIAL_STUDENT_WALLET = {
    studentName: "Aarav Sharma",
    studentId: "STU-2026-8842",
    department: "Computer Engineering (3rd Year)",
    balance: 450.00,
    cardLast4: "8842"
  };

  // ==========================================
  // 2. AUDIO & SPEECH SYNTHESIZER
  // ==========================================
  class AudioManager {
    constructor() {
      this.audioCtx = null;
      this.speechSynth = window.speechSynthesis || null;
      this.isMuted = false;
      this.isVoiceEnabled = true;
      this.selectedVoice = null;

      if (this.speechSynth) {
        if (this.speechSynth.onvoiceschanged !== undefined) {
          this.speechSynth.onvoiceschanged = () => this.initVoice();
        }
        this.initVoice();
      }
    }

    ensureAudioContext() {
      if (!this.audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          this.audioCtx = new AudioContextClass();
        }
      }
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
    }

    initVoice() {
      if (!this.speechSynth) return;
      const voices = this.speechSynth.getVoices();
      this.selectedVoice = voices.find(v => v.lang.includes('en-IN')) ||
                           voices.find(v => v.lang.includes('en-US') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Zira'))) ||
                           voices.find(v => v.lang.startsWith('en')) ||
                           voices[0] || null;
    }

    playReadyChime() {
      if (this.isMuted) return;
      try {
        this.ensureAudioContext();
        if (!this.audioCtx) return;

        const now = this.audioCtx.currentTime;

        const osc1 = this.audioCtx.createOscillator();
        const gain1 = this.audioCtx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(783.99, now); // G5
        gain1.gain.setValueAtTime(0.3, now);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        osc1.connect(gain1);
        gain1.connect(this.audioCtx.destination);
        osc1.start(now);
        osc1.stop(now + 0.6);

        const osc2 = this.audioCtx.createOscillator();
        const gain2 = this.audioCtx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(1046.50, now + 0.18); // C6
        gain2.gain.setValueAtTime(0.35, now + 0.18);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
        osc2.connect(gain2);
        gain2.connect(this.audioCtx.destination);
        osc2.start(now + 0.18);
        osc2.stop(now + 0.9);

        const osc3 = this.audioCtx.createOscillator();
        const gain3 = this.audioCtx.createGain();
        osc3.type = 'triangle';
        osc3.frequency.setValueAtTime(523.25, now + 0.18); // C5
        gain3.gain.setValueAtTime(0.15, now + 0.18);
        gain3.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
        osc3.connect(gain3);
        gain3.connect(this.audioCtx.destination);
        osc3.start(now + 0.18);
        osc3.stop(now + 0.8);
      } catch (e) {
        console.warn("Chime error:", e);
      }
    }

    playTapSound() {
      if (this.isMuted) return;
      try {
        this.ensureAudioContext();
        if (!this.audioCtx) return;
        const now = this.audioCtx.currentTime;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(1320, now + 0.08);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.08);
      } catch (e) {}
    }

    announceOrderReady(token, counter = "Counter 1") {
      this.playReadyChime();
      if (!this.isVoiceEnabled || this.isMuted || !this.speechSynth) return;

      const cleanToken = token.replace('#', 'Token ').replace('-', ' ');
      const speechText = `${cleanToken} is ready for pickup at ${counter}.`;

      setTimeout(() => {
        try {
          if (this.speechSynth.speaking) {
            this.speechSynth.cancel();
          }
          const utterance = new SpeechSynthesisUtterance(speechText);
          utterance.rate = 0.95;
          utterance.pitch = 1.05;
          if (this.selectedVoice) {
            utterance.voice = this.selectedVoice;
          }
          this.speechSynth.speak(utterance);
        } catch (err) {
          console.warn("Speech error:", err);
        }
      }, 450);
    }

    toggleMute() {
      this.isMuted = !this.isMuted;
      return this.isMuted;
    }

    toggleVoice() {
      this.isVoiceEnabled = !this.isVoiceEnabled;
      return this.isVoiceEnabled;
    }
  }

  const audio = new AudioManager();

  // ==========================================
  // 3. GLOBAL STATE & REAL-TIME SYNC
  // ==========================================
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
        console.warn("BroadcastChannel not available");
      }

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
        } catch (e) {}
      }
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
      if (!localStorage.getItem(STORAGE_KEYS.MENU)) {
        localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(INITIAL_MENU));
      }
      if (!localStorage.getItem(STORAGE_KEYS.WALLET)) {
        localStorage.setItem(STORAGE_KEYS.WALLET, JSON.stringify(INITIAL_STUDENT_WALLET));
      }
      if (!localStorage.getItem(STORAGE_KEYS.TOKEN_SEQ)) {
        localStorage.setItem(STORAGE_KEYS.TOKEN_SEQ, "34");
      }
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
          createdAt: now - 360000,
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
          createdAt: now - 300000,
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
          createdAt: now - 120000,
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

    getNextTokenNumber() {
      let current = parseInt(localStorage.getItem(STORAGE_KEYS.TOKEN_SEQ) || "34", 10);
      const next = current + 1;
      localStorage.setItem(STORAGE_KEYS.TOKEN_SEQ, next.toString());
      return `#B-${next}`;
    }

    createOrder({ items, paymentMethod, slot = "Immediate", studentName = "Student Guest" }) {
      const orders = this.getOrders();
      const token = this.getNextTokenNumber();
      
      const totalAmount = items.reduce((sum, item) => {
        const addOnsTotal = (item.addOns || []).reduce((aSum, a) => aSum + (a.price || 0), 0);
        return sum + ((item.basePrice + (item.sizePrice || 0) + addOnsTotal) * item.quantity);
      }, 0);

      const maxItemPrep = Math.max(...items.map(i => i.prepTime || 3), 2);
      const activePreparingCount = orders.filter(o => o.status === 'PREPARING').length;
      const estimatedPrepTime = maxItemPrep + Math.floor(activePreparingCount * 0.7);

      const primaryCounter = items[0]?.counter || "Counter 2 (Hot Snacks)";

      const newOrder = {
        id: `ord-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        token,
        counter: primaryCounter,
        customerName: studentName,
        slot: slot,
        paymentMethod,
        status: "PREPARING",
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

      try {
        const myTokens = JSON.parse(localStorage.getItem(STORAGE_KEYS.MY_ORDERS) || "[]");
        myTokens.unshift(newOrder.id);
        localStorage.setItem(STORAGE_KEYS.MY_ORDERS, JSON.stringify(myTokens.slice(0, 10)));
      } catch (e) {}

      if (paymentMethod === "Campus ID Card") {
        this.deductWallet(totalAmount);
      }

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

  const state = new StateManager();

  // ==========================================
  // 4. STUDENT KIOSK CONTROLLER
  // ==========================================
  class KioskController {
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

      const myOrders = state.getMyTokenOrders();
      if (myOrders.length > 0 && myOrders[0].status !== 'COLLECTED') {
        this.activeReceiptOrder = myOrders[0];
      }
    }

    render() {
      this.container.innerHTML = `
        <div class="kiosk-layout flex flex-col min-h-screen bg-slate-950 text-slate-100 pb-28">
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

              <div class="flex items-center gap-3">
                <div id="walletBadge" class="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs"></div>
                ${this.activeReceiptOrder ? `
                  <button id="btnOpenActiveReceipt" class="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-semibold hover:bg-emerald-500/25 transition">
                    <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    Active Token: <strong class="text-white">${this.activeReceiptOrder.token}</strong>
                  </button>
                ` : ''}
              </div>
            </div>
          </header>

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
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
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
              </div>
            </div>

            <div id="kioskMenuGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5"></div>
          </main>

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
                  </div>
                </div>
              </div>

              <button id="btnQuickPayDirect" class="px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 active:scale-95 text-white font-bold text-base shadow-lg shadow-orange-500/25 flex items-center gap-2 transition">
                <span>⚡ Quick Pay & Token</span>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </button>
            </div>
          </div>

          <div id="customizerModalContainer"></div>
          <div id="cartDrawerContainer"></div>
          <div id="paymentModalContainer"></div>
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
        <div class="w-6 h-6 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-xs">ID</div>
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

        return `
          <div class="group relative rounded-3xl bg-slate-900 border ${isSoldOut ? 'border-red-950/60 opacity-60' : 'border-slate-800 hover:border-slate-700'} overflow-hidden flex flex-col shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/5">
            <div class="relative h-44 w-full bg-slate-800 overflow-hidden">
              <img 
                src="${item.image}" 
                alt="${item.name}" 
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${isSoldOut ? 'grayscale' : ''}"
                loading="lazy"
                onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60'"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
              
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

              <div class="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-md bg-slate-900/85 backdrop-blur-md text-[11px] font-semibold text-amber-300 border border-slate-700">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>${item.prepTime}m</span>
              </div>

              ${isSoldOut ? `
                <div class="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center">
                  <span class="px-3 py-1 rounded-full bg-red-600 text-white font-extrabold text-xs uppercase tracking-widest shadow-lg">
                    Sold Out
                  </span>
                </div>
              ` : ''}
            </div>

            <div class="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 class="font-bold text-base text-white group-hover:text-orange-400 transition leading-snug mb-1">
                  ${item.name}
                </h3>
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
      this.container.addEventListener('click', (e) => {
        const catBtn = e.target.closest('.cat-pill');
        if (catBtn) {
          this.selectedCategory = catBtn.dataset.cat;
          this.render();
          audio.playTapSound();
          return;
        }

        const quickAddBtn = e.target.closest('.btn-quick-add');
        if (quickAddBtn) {
          this.handleQuickAdd(quickAddBtn.dataset.quickadd);
          return;
        }

        const customizeBtn = e.target.closest('.btn-customize');
        if (customizeBtn) {
          this.openCustomizerModal(customizeBtn.dataset.customize);
          return;
        }

        const toggleCartBtn = e.target.closest('#btnToggleCartDrawer');
        if (toggleCartBtn) {
          this.openCartDrawer();
          return;
        }

        const quickPayBtn = e.target.closest('#btnQuickPayDirect');
        if (quickPayBtn) {
          this.openPaymentModal();
          return;
        }

        const activeReceiptBtn = e.target.closest('#btnOpenActiveReceipt');
        if (activeReceiptBtn) {
          this.renderReceiptModal();
          return;
        }
      });

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

            <div class="p-5 overflow-y-auto space-y-5 flex-1">
              ${sizes.length > 1 ? `
                <div>
                  <label class="block text-xs uppercase tracking-wider font-bold text-slate-400 mb-2">Select Size</label>
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

              ${addOns.length > 0 ? `
                <div>
                  <label class="block text-xs uppercase tracking-wider font-bold text-slate-400 mb-2">Add-Ons & Preferences</label>
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

              <div class="pt-2 flex items-center justify-between">
                <span class="text-xs uppercase tracking-wider font-bold text-slate-400">Quantity</span>
                <div class="flex items-center gap-3 bg-slate-800 p-1.5 rounded-2xl border border-slate-700">
                  <button id="btnCustomQtyMinus" class="w-8 h-8 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold flex items-center justify-center transition active:scale-95">-</button>
                  <span id="customQtyDisplay" class="w-8 text-center font-bold text-white text-base">1</span>
                  <button id="btnCustomQtyPlus" class="w-8 h-8 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold flex items-center justify-center transition active:scale-95">+</button>
                </div>
              </div>
            </div>

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

      const updateModalPrice = () => {
        const total = calculateCurrentTotal();
        document.getElementById('customTotalDisplay').textContent = total;
        document.getElementById('customBtnPrice').textContent = `₹${total}`;
      };

      const closeBtn = document.getElementById('btnCloseCustomizer');
      const backdrop = document.getElementById('customizerBackdrop');
      const close = () => { container.innerHTML = ''; };
      closeBtn.addEventListener('click', close);
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) close();
      });

      const sizeRadios = container.querySelectorAll('input[name="customSize"]');
      sizeRadios.forEach(radio => {
        radio.addEventListener('change', () => {
          audio.playTapSound();
          const selected = sizes.find(s => s.label === radio.value);
          this.customizingItem.selectedSize = selected;
          container.querySelectorAll('.custom-size-option').forEach(el => {
            el.classList.remove('bg-orange-500/10', 'border-orange-500/50', 'text-white');
            el.classList.add('bg-slate-800/60', 'border-slate-700/60', 'text-slate-300');
          });
          radio.closest('.custom-size-option').classList.add('bg-orange-500/10', 'border-orange-500/50', 'text-white');
          updateModalPrice();
        });
      });

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

    openCartDrawer() {
      const container = document.getElementById('cartDrawerContainer');
      if (!container) return;

      audio.playTapSound();
      const totalSum = this.calculateCartTotal();

      container.innerHTML = `
        <div id="cartDrawerBackdrop" class="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex justify-end animate-in fade-in duration-200">
          <div class="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl overflow-hidden">
            <div class="p-5 border-b border-slate-800 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold">🛒</div>
                <h2 class="text-lg font-black text-white">Your Tray & Order</h2>
              </div>
              <button id="btnCloseCartDrawer" class="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition">✕</button>
            </div>

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
                            <span class="text-[10px] px-1.5 py-0.5 rounded-md bg-orange-500/10 text-orange-300 border border-orange-500/20">+ ${a.label}</span>
                          `).join('')}
                        </div>
                      ` : ''}
                      <div class="mt-2 text-xs font-bold text-amber-400">₹${itemTotal}</div>
                    </div>

                    <div class="flex items-center gap-2 bg-slate-900/90 px-2 py-1 rounded-xl border border-slate-700/80">
                      <button data-cart-minus="${index}" class="text-slate-400 hover:text-white font-bold text-sm px-1">-</button>
                      <span class="text-xs font-bold text-white w-4 text-center">${c.quantity}</span>
                      <button data-cart-plus="${index}" class="text-slate-400 hover:text-white font-bold text-sm px-1">+</button>
                    </div>
                  </div>
                `;
              }).join('')}

              <div class="pt-3 border-t border-slate-800">
                <label class="block text-xs uppercase tracking-wider font-bold text-amber-400 mb-2 flex items-center gap-1.5">
                  <span>⏰ Lunch Rush Slot Pre-Booking</span>
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

            <div class="p-5 bg-slate-900 border-t border-slate-800 space-y-3">
              <div class="space-y-1.5 text-xs text-slate-400">
                <div class="flex justify-between">
                  <span>Items Subtotal</span>
                  <span class="text-slate-200 font-semibold">₹${totalSum}</span>
                </div>
                <div class="flex justify-between">
                  <span>Campus Subsidy (0% Tax)</span>
                  <span class="text-emerald-400 font-semibold">₹0.00</span>
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
                <span>Proceed to Quick Pay (₹${totalSum})</span>
              </button>
            </div>
          </div>
        </div>
      `;

      const closeBtn = document.getElementById('btnCloseCartDrawer');
      const backdrop = document.getElementById('cartDrawerBackdrop');
      const close = () => { container.innerHTML = ''; };
      closeBtn.addEventListener('click', close);
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) close();
      });

      const slotSelect = document.getElementById('selectLunchSlot');
      slotSelect?.addEventListener('change', (e) => {
        this.selectedSlot = e.target.value;
      });

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

    openPaymentModal() {
      if (this.cart.length === 0) return;

      const totalSum = this.calculateCartTotal();
      const wallet = state.getWallet();
      const container = document.getElementById('paymentModalContainer');
      if (!container) return;

      audio.playTapSound();
      let activePaymentTab = 'upi';

      const renderPaymentContent = () => {
        container.innerHTML = `
          <div id="paymentBackdrop" class="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div class="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
              <div class="p-5 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <span class="text-xs uppercase tracking-wider font-bold text-orange-400">ZeroQueue Checkout</span>
                  <h3 class="text-lg font-black text-white">Pay ₹${totalSum}</h3>
                </div>
                <button id="btnClosePayment" class="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition">✕</button>
              </div>

              <div class="grid grid-cols-2 p-2 bg-slate-950/60 border-b border-slate-800 gap-1">
                <button id="tabUpi" class="py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 ${activePaymentTab === 'upi' ? 'bg-orange-500 text-white shadow-md' : 'text-slate-400 hover:text-white'}">
                  <span>📱 Mock UPI QR</span>
                </button>
                <button id="tabWallet" class="py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 ${activePaymentTab === 'wallet' ? 'bg-orange-500 text-white shadow-md' : 'text-slate-400 hover:text-white'}">
                  <span>💳 Student ID Card</span>
                </button>
              </div>

              <div class="p-6">
                ${activePaymentTab === 'upi' ? `
                  <div class="flex flex-col items-center text-center">
                    <div class="relative p-3.5 bg-white rounded-3xl shadow-2xl border-4 border-orange-500/30 mb-4 group overflow-hidden">
                      <img 
                        src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=canteen@campus&pn=CampusCanteen&am=${totalSum}&cu=INR" 
                        alt="UPI QR Code" 
                        class="w-44 h-44 rounded-xl"
                      />
                      <div class="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent top-0 animate-[scan_2s_ease-in-out_infinite] pointer-events-none"></div>
                    </div>

                    <div class="flex items-center gap-2 mb-3">
                      <span class="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">GPay</span>
                      <span class="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">PhonePe</span>
                      <span class="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">Paytm</span>
                      <span class="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">BHIM</span>
                    </div>

                    <p class="text-xs text-slate-400 mb-5">Scan with any UPI App or tap button below to simulate instant payment.</p>

                    <button id="btnSimulateUpiPay" class="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 active:scale-95 text-white font-black text-sm shadow-xl shadow-emerald-500/25 transition flex items-center justify-center gap-2">
                      <span>Simulate Payment & Get Token (₹${totalSum})</span>
                    </button>

                    <div class="mt-3 flex items-center gap-2 text-[11px] text-slate-500">
                      <input type="checkbox" id="chkAutoPay" class="rounded accent-emerald-500">
                      <label for="chkAutoPay" class="cursor-pointer">Auto-confirm in 3s (Hands-free kiosk mode)</label>
                    </div>
                  </div>
                ` : `
                  <div class="flex flex-col items-center">
                    <div class="w-full p-5 rounded-2xl bg-gradient-to-tr from-slate-800 via-indigo-950 to-slate-800 border border-indigo-500/40 shadow-2xl relative overflow-hidden mb-5">
                      <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-2">
                          <div class="w-3 h-3 rounded-full bg-amber-400"></div>
                          <span class="text-[11px] font-black uppercase tracking-widest text-indigo-300">CAMPUS SMART CARD</span>
                        </div>
                        <span class="text-xs font-mono text-slate-400">RFID TAP-READY</span>
                      </div>

                      <div class="w-9 h-7 rounded-md bg-amber-300/80 border border-amber-400 mb-3 flex items-center justify-center text-[10px] font-bold text-amber-950">CHIP</div>

                      <div class="mb-3">
                        <div class="text-[10px] text-slate-400 uppercase tracking-wider">Student Name</div>
                        <div class="text-sm font-black text-white">${wallet.studentName}</div>
                        <div class="text-xs text-indigo-300 font-mono">${wallet.studentId} • ${wallet.department}</div>
                      </div>

                      <div class="pt-3 border-t border-indigo-900/50 flex items-center justify-between">
                        <div>
                          <div class="text-[10px] text-slate-400 uppercase">Available Card Balance</div>
                          <div class="text-lg font-black ${wallet.balance >= totalSum ? 'text-emerald-400' : 'text-red-400'}">₹${wallet.balance.toFixed(2)}</div>
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
                          Insufficient balance (Needs ₹${totalSum}, has ₹${wallet.balance.toFixed(2)})
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

        document.getElementById('tabUpi')?.addEventListener('click', () => {
          activePaymentTab = 'upi';
          renderPaymentContent();
        });
        document.getElementById('tabWallet')?.addEventListener('click', () => {
          activePaymentTab = 'wallet';
          renderPaymentContent();
        });

        document.getElementById('btnSimulateUpiPay')?.addEventListener('click', () => {
          this.processSuccessfulOrder("UPI Mock QR");
        });

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

        document.getElementById('btnPayWithWallet')?.addEventListener('click', () => {
          this.processSuccessfulOrder("Campus ID Card");
        });

        document.getElementById('btnTopUpWallet')?.addEventListener('click', () => {
          state.topUpWallet(200);
          renderPaymentContent();
        });
      };

      renderPaymentContent();
    }

    processSuccessfulOrder(paymentMethod) {
      if (this.autoApproveTimer) clearInterval(this.autoApproveTimer);

      const order = state.createOrder({
        items: this.cart,
        paymentMethod,
        slot: this.selectedSlot,
        studentName: "Student Guest"
      });

      audio.playReadyChime();

      this.cart = [];
      this.renderCartUI();

      document.getElementById('paymentModalContainer').innerHTML = '';
      this.activeReceiptOrder = order;
      this.renderReceiptModal();
    }

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
            <div class="p-5 ${isReady ? 'bg-gradient-to-r from-emerald-600 to-teal-600' : 'bg-gradient-to-r from-orange-600 to-amber-600'} text-white flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="text-xl">${isReady ? '🎉' : '⏳'}</span>
                <span class="text-xs uppercase font-extrabold tracking-wider">
                  ${isReady ? 'Ready for Pickup!' : 'Order Placed & Preparing'}
                </span>
              </div>
              <button id="btnCloseReceipt" class="w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition">✕</button>
            </div>

            <div class="p-6 text-center space-y-5">
              <div class="py-3 px-6 rounded-3xl ${isReady ? 'bg-emerald-500/10 border-2 border-emerald-500' : 'bg-slate-800/80 border border-slate-700'} inline-block mx-auto">
                <span class="text-xs uppercase tracking-widest text-slate-400 font-bold block mb-1">Your Token Number</span>
                <div class="text-5xl font-black ${isReady ? 'text-emerald-400 animate-pulse' : 'text-orange-400'} tracking-tight">
                  ${order.token}
                </div>
              </div>

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

              <div class="flex items-center justify-between px-2 pt-2">
                <div class="flex flex-col items-center">
                  <div class="w-8 h-8 rounded-full bg-emerald-500 text-slate-950 font-black text-xs flex items-center justify-center">✓</div>
                  <span class="text-[10px] font-semibold text-emerald-400 mt-1">Paid</span>
                </div>
                <div class="h-0.5 flex-1 mx-2 bg-emerald-500"></div>
                <div class="flex flex-col items-center">
                  <div class="w-8 h-8 rounded-full ${order.status === 'PREPARING' ? 'bg-amber-500 text-slate-950 animate-pulse font-black' : (isReady || isCollected ? 'bg-emerald-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-500')} text-xs flex items-center justify-center">
                    ${isReady || isCollected ? '✓' : '🍳'}
                  </div>
                  <span class="text-[10px] font-semibold ${order.status === 'PREPARING' ? 'text-amber-400' : 'text-emerald-400'} mt-1">Cooking</span>
                </div>
                <div class="h-0.5 flex-1 mx-2 ${isReady || isCollected ? 'bg-emerald-500' : 'bg-slate-700'}"></div>
                <div class="flex flex-col items-center">
                  <div class="w-8 h-8 rounded-full ${isReady ? 'bg-emerald-500 text-slate-950 font-black ring-4 ring-emerald-500/30' : 'bg-slate-800 text-slate-500'} text-xs flex items-center justify-center">🔔</div>
                  <span class="text-[10px] font-semibold ${isReady ? 'text-emerald-400 font-bold' : 'text-slate-500'} mt-1">Ready</span>
                </div>
              </div>

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

              <div class="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 bg-slate-800/40 py-2 rounded-xl border border-slate-800">
                <span class="text-emerald-400">🛡️</span>
                <span><strong>Offline-Safe:</strong> Token cached for basement dead zones.</span>
              </div>

              <button id="btnSwitchToWallBoard" class="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-white font-bold text-xs border border-slate-700 transition flex items-center justify-center gap-2">
                <span>📺 View Live on Canteen Wall Board</span>
                <span class="text-orange-400">↗</span>
              </button>
            </div>
          </div>
        </div>
      `;

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

  // ==========================================
  // 5. CANTEEN WALL DISPLAY CONTROLLER
  // ==========================================
  class WallDisplayController {
    constructor(containerId) {
      this.container = document.getElementById(containerId);
      this.lastAnnouncedToken = null;
      this.recentlyReadyToken = null;
      this.init();
    }

    init() {
      this.render();
      this.bindEvents();

      state.subscribe((event) => {
        if (
          event.type === 'ORDER_CREATED' ||
          event.type === 'ORDER_STATUS_CHANGED' ||
          event.type === 'DEMO_RESET' ||
          event.type === 'STORAGE_SYNC'
        ) {
          if (event.type === 'ORDER_STATUS_CHANGED' && event.newStatus === 'READY') {
            this.recentlyReadyToken = event.order.token;
            audio.announceOrderReady(event.order.token, event.order.counter || "Counter 1");
            this.lastAnnouncedToken = event.order;
          }
          this.updateBoard();
        }
      });

      setInterval(() => {
        this.updateBoard();
      }, 15000);
    }

    render() {
      this.container.innerHTML = `
        <div class="wall-display-layout min-h-screen bg-slate-950 text-slate-100 flex flex-col p-4 sm:p-6 lg:p-8 select-none">
          <header class="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center shadow-xl shadow-orange-500/20 text-white font-black text-2xl">
                BB
              </div>
              <div>
                <div class="flex items-center gap-3">
                  <h1 class="text-2xl sm:text-4xl font-black tracking-tight text-white uppercase">CANTEEN ORDER STATUS</h1>
                  <span class="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs sm:text-sm font-black uppercase tracking-wider flex items-center gap-1.5">
                    <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                    LIVE QUEUE
                  </span>
                </div>
                <p class="text-xs sm:text-sm text-slate-400 font-medium">Campus Food Court & Cafe • Digital Wall Pickup Display</p>
              </div>
            </div>

            <div class="flex items-center gap-3 sm:gap-4 flex-wrap">
              <div class="hidden md:flex items-center gap-3 px-4 py-2 rounded-2xl bg-slate-900 border border-slate-800 text-xs">
                <div>
                  <span class="text-slate-500 uppercase text-[10px] block">Rush Status</span>
                  <span class="font-bold text-amber-400">🔥 Peak Break Rush</span>
                </div>
                <div class="h-6 w-px bg-slate-800"></div>
                <div>
                  <span class="text-slate-500 uppercase text-[10px] block">Avg Prep Time</span>
                  <span class="font-bold text-slate-200">~3.5 mins</span>
                </div>
              </div>

              <button id="btnToggleVoice" class="px-3.5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-300 flex items-center gap-2 transition active:scale-95">
                <span id="voiceIcon">🔊</span>
                <span id="voiceStatusText">Voice: ON</span>
              </button>

              <button id="btnReplayAudio" class="px-3.5 py-2.5 rounded-2xl bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-xs font-bold text-orange-400 flex items-center gap-2 transition active:scale-95">
                <span>🔔 Test Chime</span>
              </button>

              <button id="btnToggleFullscreen" class="px-3.5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-300 flex items-center gap-2 transition active:scale-95">
                <span>⛶ TV Fullscreen</span>
              </button>
            </div>
          </header>

          <main class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 flex-1 py-6 sm:py-8">
            <section class="flex flex-col rounded-3xl bg-slate-900/60 border-2 border-amber-500/30 overflow-hidden shadow-2xl">
              <div class="bg-gradient-to-r from-amber-600/90 to-orange-600/90 px-6 py-4 flex items-center justify-between text-white shadow-lg">
                <div class="flex items-center gap-3">
                  <span class="w-3.5 h-3.5 rounded-full bg-white animate-pulse"></span>
                  <h2 class="text-xl sm:text-2xl font-black tracking-wide uppercase">NOW PREPARING</h2>
                </div>
                <span id="preparingCountBadge" class="text-sm font-black bg-black/30 px-3 py-1 rounded-xl">0 In Queue</span>
              </div>
              <div id="preparingTokensList" class="p-6 flex-1 overflow-y-auto space-y-4 max-h-[65vh]"></div>
            </section>

            <section class="flex flex-col rounded-3xl bg-slate-900/60 border-2 border-emerald-500/40 overflow-hidden shadow-2xl">
              <div class="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 flex items-center justify-between text-white shadow-lg">
                <div class="flex items-center gap-3">
                  <span class="w-3.5 h-3.5 rounded-full bg-white animate-ping"></span>
                  <h2 class="text-xl sm:text-2xl font-black tracking-wide uppercase">READY FOR PICKUP</h2>
                </div>
                <span id="readyCountBadge" class="text-sm font-black bg-black/30 px-3 py-1 rounded-xl">0 Ready</span>
              </div>
              <div id="readyTokensList" class="p-6 flex-1 overflow-y-auto space-y-4 max-h-[65vh]"></div>
            </section>
          </main>

          <footer class="mt-auto pt-4 border-t border-slate-900 text-slate-500 text-xs flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center gap-2">
              <span class="text-amber-400 font-bold">Tip:</span>
              <span>Present your digital token on your mobile screen when your number flashes green.</span>
            </div>
            <div>BrewBoard v1.0 • Multi-Display Real-Time Engine</div>
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
            const itemsSummary = o.items.map(i => `${i.quantity}x ${i.name}`).join(', ');
            return `
              <div class="p-5 rounded-2xl bg-slate-800/80 border border-amber-500/30 flex items-center justify-between gap-4 shadow-lg hover:border-amber-400/50 transition">
                <div class="flex items-center gap-4">
                  <div class="px-4 py-3 rounded-2xl bg-amber-500/10 border border-amber-500/40 text-amber-400 font-black text-3xl sm:text-4xl tracking-tight">
                    ${o.token}
                  </div>
                  <div>
                    <div class="flex items-center gap-2 mb-1">
                      <span class="text-xs uppercase font-extrabold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60">${o.counter}</span>
                      ${o.slot !== 'Immediate' ? `<span class="text-xs font-semibold text-orange-300 bg-orange-950/60 px-2 py-0.5 rounded">Slot: ${o.slot}</span>` : ''}
                    </div>
                    <div class="text-sm font-semibold text-slate-200 line-clamp-1">${itemsSummary}</div>
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
                      <span class="text-xs uppercase font-black text-emerald-300 bg-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-700">${o.counter.toUpperCase()}</span>
                      <span class="text-xs font-extrabold text-white">PLEASE COLLECT</span>
                    </div>
                    <div class="text-sm font-bold text-slate-200 line-clamp-1">${itemsSummary}</div>
                  </div>
                </div>

                <div class="text-right">
                  <button 
                    data-manual-announce="${o.token}" 
                    data-counter="${o.counter}"
                    class="btn-call-token px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-bold border border-emerald-500/40 transition flex items-center gap-1.5"
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

    bindEvents() {
      document.getElementById('btnToggleVoice')?.addEventListener('click', () => {
        const isVoiceOn = audio.toggleVoice();
        const statusText = document.getElementById('voiceStatusText');
        const icon = document.getElementById('voiceIcon');
        if (statusText) statusText.textContent = isVoiceOn ? 'Voice: ON' : 'Voice: OFF';
        if (icon) icon.textContent = isVoiceOn ? '🔊' : '🔇';
      });

      document.getElementById('btnReplayAudio')?.addEventListener('click', () => {
        if (this.lastAnnouncedToken) {
          audio.announceOrderReady(this.lastAnnouncedToken.token, this.lastAnnouncedToken.counter);
        } else {
          audio.announceOrderReady("#B-35", "Counter 1 (Beverages)");
        }
      });

      document.getElementById('btnToggleFullscreen')?.addEventListener('click', () => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
        }
      });

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

  // ==========================================
  // 6. KITCHEN KOT CONSOLE CONTROLLER
  // ==========================================
  class KitchenConsoleController {
    constructor(containerId) {
      this.container = document.getElementById(containerId);
      this.selectedCounterFilter = 'all';
      this.activeStatusFilter = 'all';
      this.isStockManagerOpen = false;

      this.init();
    }

    init() {
      this.render();
      this.bindEvents();

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

      setInterval(() => {
        this.renderTicketList();
      }, 20000);
    }

    render() {
      this.container.innerHTML = `
        <div class="kitchen-layout min-h-screen bg-slate-950 text-slate-100 flex flex-col p-4 sm:p-6 pb-20">
          <header class="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-2xl bg-orange-600 flex items-center justify-center text-white text-xl font-black shadow-lg shadow-orange-600/30">
                👨‍🍳
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <h1 class="text-xl sm:text-2xl font-black text-white tracking-tight">KITCHEN KOT CONSOLE</h1>
                  <span class="text-xs px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 font-bold uppercase">Staff Tablet</span>
                </div>
                <p class="text-xs text-slate-400">Advance order tickets with one tap • Manage rush hour stock</p>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <button id="btnOpenStockManager" class="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-white font-bold text-xs border border-slate-700 flex items-center gap-2 transition shadow-md">
                <span>📦 Stock & Sold-Out Toggles</span>
              </button>
            </div>
          </header>

          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 my-4">
            <div class="flex items-center gap-2">
              <button data-status="all" class="kot-status-btn px-4 py-2 rounded-xl text-xs font-bold transition border ${this.activeStatusFilter === 'all' ? 'bg-orange-500 text-white border-transparent' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'}">All Tickets</button>
              <button data-status="PREPARING" class="kot-status-btn px-4 py-2 rounded-xl text-xs font-bold transition border ${this.activeStatusFilter === 'PREPARING' ? 'bg-amber-500 text-slate-950 font-black border-transparent' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'}">
                🟡 Cooking (<span id="kotCountPrep">0</span>)
              </button>
              <button data-status="READY" class="kot-status-btn px-4 py-2 rounded-xl text-xs font-bold transition border ${this.activeStatusFilter === 'READY' ? 'bg-emerald-500 text-slate-950 font-black border-transparent' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'}">
                🟢 Ready (<span id="kotCountReady">0</span>)
              </button>
            </div>

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

          <main id="kotTicketsGrid" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 flex-1"></main>

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

                <span class="text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${isReady ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'}">
                  ${isReady ? 'Ready' : 'Cooking'}
                </span>
              </div>

              ${o.slot && o.slot !== 'Immediate' ? `
                <div class="mb-3 px-3 py-1.5 rounded-xl bg-orange-950/60 border border-orange-800/60 text-xs font-bold text-orange-300 flex items-center gap-1.5">
                  <span>⏰ Scheduled Slot:</span>
                  <span>${o.slot}</span>
                </div>
              ` : ''}

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
                      <span class="text-xs font-semibold px-2 py-0.5 rounded bg-slate-700 text-slate-300">${item.size}</span>
                    </div>

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
      this.container.addEventListener('click', (e) => {
        const statusBtn = e.target.closest('.kot-status-btn');
        if (statusBtn) {
          this.activeStatusFilter = statusBtn.dataset.status;
          this.render();
          return;
        }

        const readyBtn = e.target.closest('[data-advance-ready]');
        if (readyBtn) {
          state.updateOrderStatus(readyBtn.dataset.advanceReady, 'READY');
          this.renderTicketList();
          this.updateHeaderCounts();
          return;
        }

        const collectedBtn = e.target.closest('[data-advance-collected]');
        if (collectedBtn) {
          state.updateOrderStatus(collectedBtn.dataset.advanceCollected, 'COLLECTED');
          this.renderTicketList();
          this.updateHeaderCounts();
          return;
        }

        const openStockBtn = e.target.closest('#btnOpenStockManager');
        if (openStockBtn) {
          this.openStockManager();
          return;
        }
      });

      this.container.addEventListener('change', (e) => {
        if (e.target.id === 'selectKotCounter') {
          this.selectedCounterFilter = e.target.value;
          this.renderTicketList();
        }
      });
    }

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
                  <p class="text-xs text-slate-400">Toggle items 'Out of Stock' instantly when inventory runs out.</p>
                </div>
              </div>
              <button id="btnCloseStockManager" class="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition">✕</button>
            </div>

            <div id="stockListScroll" class="p-5 overflow-y-auto space-y-2 flex-1"></div>

            <div class="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Changes broadcast immediately to all student kiosk screens.</span>
              <button id="btnDoneStock" class="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold transition">Done</button>
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

          <button 
            data-toggle-stock="${item.id}"
            class="px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${item.inStock ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30' : 'bg-red-600 text-white shadow-md'}"
          >
            <span>${item.inStock ? '✓ IN STOCK' : '✕ SOLD OUT'}</span>
          </button>
        </div>
      `).join('');

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

  // ==========================================
  // 7. MASTER APP ORCHESTRATOR
  // ==========================================
  class BrewBoardApp {
    constructor() {
      this.currentView = 'kiosk';
      this.kioskCtrl = null;
      this.wallCtrl = null;
      this.kitchenCtrl = null;

      this.init();
    }

    init() {
      this.bindGlobalNavigation();
      this.switchView('kiosk');

      window.addEventListener('SWITCH_VIEW', (e) => {
        if (e.detail?.view) {
          this.switchView(e.detail.view);
        }
      });

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

      document.getElementById('btnRunDemoFlow')?.addEventListener('click', () => {
        this.runHackathonDemoFlow();
      });

      document.getElementById('btnResetDemoData')?.addEventListener('click', () => {
        if (confirm('Reset demo orders and queue to initial state?')) {
          audio.playTapSound();
          state.resetToDemo();
          alert('BrewBoard reset to initial demo state!');
        }
      });

      document.getElementById('btnTestAudioChime')?.addEventListener('click', () => {
        audio.announceOrderReady("#B-35", "Counter 1 (Beverages)");
      });
    }

    switchView(viewName) {
      this.currentView = viewName;

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

        if (!this.kioskCtrl) this.kioskCtrl = new KioskController('splitKioskView');
        if (!this.wallCtrl) this.wallCtrl = new WallDisplayController('splitWallView');
        return;
      }

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

    runHackathonDemoFlow() {
      audio.playTapSound();

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
      this.switchView('wall');

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

  // Export to window for global access
  window.BrewBoard = {
    audio,
    state,
    KioskController,
    WallDisplayController,
    KitchenConsoleController,
    BrewBoardApp
  };

  document.addEventListener('DOMContentLoaded', () => {
    window.brewBoard = new BrewBoardApp();
  });

})();
