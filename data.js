// BrewBoard - Campus Canteen Menu Data & Initial Configuration

export const INITIAL_MENU = [
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

export const LUNCH_SLOTS = [
  { id: "now", label: "⚡ Prepare Immediately (Break Now)", time: "Immediate", tag: "Fastest" },
  { id: "slot-1", label: "⏰ 12:45 PM - Early Lunch Slot", time: "12:45 PM", tag: "Slot Available" },
  { id: "slot-2", label: "⏰ 1:15 PM - Main Lecture Break", time: "1:15 PM", tag: "Popular Rush" },
  { id: "slot-3", label: "⏰ 1:45 PM - Afternoon Break", time: "1:45 PM", tag: "Slot Available" },
  { id: "slot-4", label: "⏰ 2:15 PM - Post-Lab Lunch", time: "2:15 PM", tag: "Light Crowd" }
];

export const CATEGORIES = [
  { id: "all", label: "All Items", icon: "sparkles" },
  { id: "beverages", label: "Chai & Drinks", icon: "coffee" },
  { id: "snacks", label: "Hot Snacks & Maggi", icon: "flame" },
  { id: "breakfast", label: "Quick Breakfast", icon: "sun" },
  { id: "meals", label: "Lunch & Meals", icon: "utensils" }
];

export const INITIAL_STUDENT_WALLET = {
  studentName: "Aarav Sharma",
  studentId: "STU-2026-8842",
  department: "Computer Engineering (3rd Year)",
  balance: 450.00,
  cardLast4: "8842"
};
