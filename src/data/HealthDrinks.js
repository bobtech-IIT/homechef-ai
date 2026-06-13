/**
 * 🍵 Nani's Heirloom Health Drinks & Nuskhe Database
 * 100% natural, home-cookable remedies passed down through generations.
 * Prepared easily in a standard Mixi, Juicer, or NutriBullet.
 */

export const HEALTH_DRINKS = [
  // --- WEIGHT LOSS (Wajan Kam) ---
  {
    id: "hd_001",
    name: "Dadima's Lauki-Ginger Fat Buster",
    category: "Weight Loss 🌱",
    objective: "Accelerate metabolism, flush out toxins, and improve digestive health.",
    equipment: "Mixer / Juicer / NutriBullet",
    symptoms: ["weight loss", "belly fat", "obesity", "metabolism", "detox", "digestion", "acidity", "gas"],
    ingredients: [
      "Bottle Gourd / Lauki (1.5 cups, peeled and cubed)",
      "Fresh Mint / Pudina (1/2 cup)",
      "Ginger / Adrak (1 inch slice)",
      "Lemon Juice (2 tbsp)",
      "Black Salt / Kala Namak (1/2 tsp)",
      "Roasted Cumin Powder (1/2 tsp)"
    ],
    recipe: [
      "Ensure the Lauki is fresh and NOT bitter (taste a tiny piece first!).",
      "Add Lauki cubes, ginger, and fresh mint leaves into your Mixi jar.",
      "Pour 1/2 cup of chilled water and blend on high speed until completely smooth.",
      "Strain the juice through a sieve into a glass (keep some pulp if you prefer high fiber).",
      "Squeeze fresh lemon juice, stir in black salt and roasted cumin powder.",
      "Drink fresh on an empty stomach in the morning for best metabolic results."
    ],
    story: "Lauki is 92% water and packed with fiber. Nani always said that drinking fresh Lauki juice cools the liver and melts away stubborn belly fat organically."
  },
  {
    id: "hd_002",
    name: "Fennel & Chia Metabo-Boost",
    category: "Weight Loss 🌱",
    objective: "Control appetite cravings, stabilize gut flora, and boost natural calorie burn.",
    equipment: "Mixer / Blender",
    symptoms: ["appetite", "hunger", "weight loss", "metabolism", "constipation", "bloating", "digestion"],
    ingredients: [
      "Fennel Seeds / Saunf (1 tbsp, soaked overnight)",
      "Chia Seeds or Sabja (1 tbsp, soaked in water for 15 mins)",
      "Organic Honey (1 tsp)",
      "Cinnamon Powder (pinch)",
      "Warm Water (1.5 cups)"
    ],
    recipe: [
      "Blend the soaked fennel seeds along with the soaking water and a pinch of cinnamon in a NutriBullet till smooth.",
      "Pour the warm water into the mixture and pulse once.",
      "Strain into a tall glass.",
      "Stir in the fully bloomed chia/sabja seeds and a spoonful of honey.",
      "Stir gently and sip slowly before breakfast."
    ],
    story: "Fennel seeds are high in antioxidants and suppress sudden hunger pangs. Soaked Sabja adds cooling gelatinous fiber that keeps the gut satisfied for hours."
  },

  // --- SUGAR CONTROL (Chini Niyantran) ---
  {
    id: "hd_003",
    name: "Karela-Amla Diabetic Armor",
    category: "Sugar Control 🩸",
    objective: "Help regulate blood glucose levels and purify blood channels naturally.",
    equipment: "Mixer / Juicer",
    symptoms: ["diabetes", "sugar spikes", "glucose", "insulin", "blood purifier", "amla", "karela"],
    ingredients: [
      "Bitter Gourd / Karela (1 small, seeds removed and cubed)",
      "Indian Gooseberry / Amla (2, deseeded)",
      "Cucumber / Kheera (1/2 cup, cubed)",
      "Black Pepper Powder (pinch)",
      "Roasted Cumin Powder (1/2 tsp)",
      "Black Salt (pinch)"
    ],
    recipe: [
      "Deseed the bitter gourd and soak the cubes in salt-water for 10 minutes to reduce bitterness.",
      "Place karela cubes, amla chunks, and cucumber in the blender.",
      "Add 1/2 cup of cold water and blend thoroughly into a smooth green paste.",
      "Filter the green pulp using a clean muslin cloth or fine strainer, squeezing out the pure extract.",
      "Add a pinch of black pepper, roasted cumin, and black salt.",
      "Drink 50ml fresh at dawn to activate pancreatic health."
    ],
    story: "Bitter gourd contains polypeptide-p, an insulin-like compound, while Amla supplies vitamin C which heals cell lining and improves metabolic insulin reception."
  },
  {
    id: "hd_004",
    name: "Methi-Neem Bitter Shield",
    category: "Sugar Control 🩸",
    objective: "Improve insulin sensitivity, reduce sugar spikes, and detoxify the lymphatic system.",
    equipment: "NutriBullet / Mixi",
    symptoms: ["sugar spikes", "insulin", "diabetes", "detox", "lymphatic", "blood purifier", "neem", "methi"],
    ingredients: [
      "Fenugreek Seeds / Methi (1 tsp, soaked overnight)",
      "Fresh Neem Leaves (4-5 tender leaves)",
      "Fresh Coriander / Dhania (1/2 cup)",
      "Ginger (1/2 inch)",
      "Lemon Juice (1 tbsp)"
    ],
    recipe: [
      "Drain the soaked methi seeds (save the bitter water).",
      "Place methi seeds, fresh neem leaves, coriander, and ginger in your blender.",
      "Add 1/2 cup of the saved methi water and blend on high speed for 1 minute.",
      "Strain the thick dark green juice into a small shot glass.",
      "Mix with lemon juice to balance the intense herbal notes and drink immediately."
    ],
    story: "A classic bitter Dadima remedy. Neem purifies the blood while soluble fenugreek fiber slows down carbohydrate absorption and balances glucose digestion."
  },

  // --- STAY COOLER IN HEAT (Garmi Se Rahat) ---
  {
    id: "hd_005",
    name: "Traditional Sattu Jaljeera Cooler",
    category: "Stay Cooler ☀️",
    objective: "Instantly lower core body temperature, rehydrate, and provide lasting energy.",
    equipment: "Hand Whisk / Blender",
    symptoms: ["heat", "summer", "dehydration", "energy", "cooling", "sunstroke", "acidity", "sattu"],
    ingredients: [
      "Roasted Bengal Gram Flour / Chana Sattu (3 tbsp)",
      "Chilled Water (1.5 cups)",
      "Fresh Mint Paste (1 tsp)",
      "Black Salt / Kala Namak (1/2 tsp)",
      "Lemon Juice (1.5 tbsp)",
      "Roasted Cumin Powder (1/2 tsp)"
    ],
    recipe: [
      "In a deep jug or blender, add the roasted Chana Sattu powder.",
      "Slowly pour chilled water while whisking continuously to prevent any lumps.",
      "Blend or whisk in the fresh mint paste, lemon juice, black salt, and roasted cumin.",
      "Pour into a tall copper glass, top with a fresh mint leaf, and enjoy."
    ],
    story: "Roasted Sattu is Bihar's native coolant. Unlike sugar-loaded commercial sodas, Sattu acts as a natural AC for the stomach, preventing heatstroke and retaining body hydration."
  },
  {
    id: "hd_006",
    name: "Refreshing Gond Katira Rose Aash",
    category: "Stay Cooler ☀️",
    objective: "Deeply cool the gastrointestinal tract and prevent heat rashes/nosebleeds during peak summer.",
    equipment: "Hand Shaker / Whisk",
    symptoms: ["heat stroke", "heat rash", "nosebleed", "summer", "cooling", "gond katira", "rose"],
    ingredients: [
      "Tragacanth Gum / Gond Katira (1 piece, soaked in water overnight)",
      "Chilled Milk or Fresh Curd (1 cup)",
      "Organic Rose Syrup or Rooh Afza (1.5 tbsp)",
      "Fennel Seed Powder (pinch)",
      "Crushed Ice"
    ],
    recipe: [
      "Soak a single crystal of Gond Katira in a bowl of water overnight. It will swell into a large bowl of transparent jelly.",
      "Drain the excess water from the jelly.",
      "Whisk chilled curd or milk with the rose syrup and a pinch of fennel powder in a shaker.",
      "Add 3 tablespoons of the puffed Gond Katira jelly into a serving glass.",
      "Pour the rose milk/lassi over the jelly, top with crushed ice, and mix with a spoon."
    ],
    story: "Gond Katira is a naturally occurring plant gum with immense cooling properties. In dry North Indian summers, Nani always fed this to children to prevent nosebleeds."
  },

  // --- IMMUNITY & COUGH SHIELD (Pratirodhak) ---
  {
    id: "hd_007",
    name: "Nani's Kadha for Immunity & Cough Shield",
    category: "Immunity 🛡️",
    objective: "Relieve sore throat, chest congestion, and strengthen immune response.",
    equipment: "Saucepan / NutriBullet (for spice crush)",
    symptoms: ["cough", "cold", "flu", "fever", "throat infection", "congestion", "immunity", "ginger", "tulsi"],
    ingredients: [
      "Fresh Holy Basil / Tulsi Leaves (10-12 leaves)",
      "Ginger / Adrak (1 inch, crushed)",
      "Black Pepper / Kali Mirch (4-5 crushed peppercorns)",
      "Cloves / Laung (2-3 pieces)",
      "Cinnamon Stick / Dalchini (1 inch)",
      "Raw Honey or Jaggery (1 tbsp)",
      "Water (2 cups)"
    ],
    recipe: [
      "Coarsely crush the black pepper, cloves, and ginger in a mortar pestle or quick blender pulse.",
      "In a saucepan, bring 2 cups of water to a boil.",
      "Add the crushed spices, cinnamon stick, and fresh Tulsi leaves.",
      "Reduce heat and simmer uncovered until the water reduces to 1 cup (takes about 8-10 minutes).",
      "Strain the warm aromatic herbal concentrate into a cup.",
      "Allow to cool slightly, stir in raw honey or jaggery, and sip slowly while warm."
    ],
    story: "This time-tested Ayurvedic decoction has guarded Indian families for centuries against seasonal coughs. Tulsi is antiviral, while black pepper and ginger melt chest congestion instantly."
  },
  {
    id: "hd_008",
    name: "Throat-Soothe Mulethi & Ginger Shot",
    category: "Immunity 🛡️",
    objective: "Instant relief from throat tickle, dry hacking cough, and vocal hoarseness.",
    equipment: "NutriBullet / Mixer",
    symptoms: ["throat tickle", "dry cough", "hoarse voice", "sore throat", "tonsils", "pharyngitis"],
    ingredients: [
      "Licorice Root / Mulethi Powder (1/2 tsp)",
      "Ginger juice (1 tbsp, extracted by grating ginger)",
      "Raw Honey (1 tbsp)",
      "Warm Water (1/2 cup)",
      "Turmeric / Haldi (pinch)"
    ],
    recipe: [
      "Add Mulethi powder, fresh ginger juice, honey, warm water, and a pinch of turmeric in a blender jar.",
      "Pulse for 15 seconds until completely mixed and smooth.",
      "Pour into a small glass and gargle slightly before swallowing slowly.",
      "Take this right before sleeping. Avoid drinking water immediately afterwards."
    ],
    story: "Mulethi acts as a demulcent, creating a thin protective coating over dry throat linings to stop hacking cough fits instantly."
  },

  // --- DIGESTIVE HEALTH & ACIDITY (Pachan) ---
  {
    id: "hd_009",
    name: "Triple-Seed Acid Flush Coolant",
    category: "Digestive Health 🥬",
    objective: "Neutralize stomach acidity, cure heartburn, and prevent abdominal gas.",
    equipment: "Mixer / NutriBullet",
    symptoms: ["acidity", "heartburn", "indigestion", "bloating", "gas", "stomach pain", "acid reflux"],
    ingredients: [
      "Cumin Seeds / Jeera (1/2 tsp)",
      "Coriander Seeds / Dhania (1/2 tsp)",
      "Fennel Seeds / Saunf (1/2 tsp)",
      "Fresh Mint / Pudina (6-8 leaves)",
      "Chilled Water (1.5 cups)",
      "Black Salt (pinch)"
    ],
    recipe: [
      "Soak cumin, coriander, and fennel seeds in a cup of water overnight.",
      "In the morning, pour the seeds and the soaking water into your NutriBullet jar.",
      "Add fresh mint leaves and blend on high speed for 30 seconds until fully pulverized.",
      "Strain through a fine mesh strainer into a glass.",
      "Add a tiny pinch of black salt, stir, and drink cold to soothe immediate stomach burns."
    ],
    story: "The 'Jeera-Dhania-Saunf' trinity is Nani's ultimate prescription for neutralizing excess acid. It acts faster than modern store-bought antacids."
  },
  {
    id: "hd_010",
    name: " Rustic Ajwain-Hing Digestive Elixir",
    category: "Digestive Health 🥬",
    objective: "Instantly relieve stomach bloating, painful gas locks, and heavy indigestion.",
    equipment: "Blender / Shaker",
    symptoms: ["bloating", "gas", "indigestion", "constipation", "stomach ache", "heaviness"],
    ingredients: [
      "Carom Seeds / Ajwain (1 tsp, boiled in water and cooled)",
      "Asafoetida / Hing (pinch)",
      "Black Salt / Kala Namak (1/2 tsp)",
      "Lemon Juice (1 tbsp)",
      "Warm Water (1 cup)"
    ],
    recipe: [
      "Blend the boiled and cooled Ajwain water with a pinch of Hing, black salt, and lemon juice for 10 seconds.",
      "Pour into a mug and drink warm after heavy festive meals."
    ],
    story: "Ajwain contains thymol, which stimulates gastric juices, while Hing is a powerful anti-flatulent that expels trapped stomach gases."
  },

  // --- SLEEP & STRESS RELIEF (Nidra & Shanti) ---
  {
    id: "hd_011",
    name: "Dadima's Golden Haldi-Badam Potion",
    category: "Sleep & Stress 💆",
    objective: "Calm the central nervous system, cure insomnia, and reduce bodily inflammation.",
    equipment: "Saucepan / NutriBullet",
    symptoms: ["insomnia", "sleeplessness", "stress", "anxiety", "body pain", "inflammation", "joint pain"],
    ingredients: [
      "Almonds / Badam (5-6 pieces, soaked and peeled)",
      "Organic Turmeric / Haldi (1/2 tsp)",
      "Freshly Grated Nutmeg / Jaiphal (small pinch)",
      "Cardamom Powder (pinch)",
      "Hot Milk or Almond Milk (1 cup)",
      "Honey or Jaggery (1 tsp)"
    ],
    recipe: [
      "Grind the soaked and peeled almonds with a splash of milk in your NutriBullet to form a completely smooth, fine paste.",
      "In a saucepan, bring the remaining milk to a gentle simmer.",
      "Stir in the almond paste, organic turmeric, and cardamom powder. Simmer for 3 minutes.",
      "Turn off the heat and add a tiny pinch of freshly grated nutmeg (Jaiphal).",
      "Pour into your favorite cup, sweeten with honey or jaggery, and drink warm 30 minutes before bedtime."
    ],
    story: "Jaiphal (Nutmeg) acts as a natural sedative when paired with warm milk. Nani always said that warm turmeric-almond milk heals the joints and induces deep, dreamless sleep."
  },

  // --- SKIN & HAIR GLOW (Saundarya) ---
  {
    id: "hd_012",
    name: "Spiced Amla-Spinach Glow Nectar",
    category: "Skin & Hair Glow ✨",
    objective: "Flush out blood impurities, reverse hair thinning, and clear skin acne naturally.",
    equipment: "Mixer / Juicer / NutriBullet",
    symptoms: ["acne", "hair fall", "dull skin", "hair thinning", "toxins", "blood purifier", "amla", "spinach"],
    ingredients: [
      "Indian Gooseberry / Amla (2, deseeded)",
      "Baby Spinach Leaves / Palak (1 cup, thoroughly washed)",
      "Fresh Cucumber / Kheera (1/2 cup)",
      "Fresh Ginger (1/2 inch)",
      "Black Pepper (pinch)",
      "Warm Water (1/2 cup)"
    ],
    recipe: [
      "Put deseeded amla pieces, spinach leaves, cucumber chunks, and ginger in the NutriBullet.",
      "Add 1/2 cup water and blend on high for 45 seconds until completely smooth.",
      "Strain through a strainer, extracting every drop of green nectar.",
      "Sprinkle a pinch of black pepper to aid nutrient absorption, and drink fresh in the morning."
    ],
    story: "Amla is the richest natural source of Vitamin C which boosts collagen, while iron-rich spinach purifies blood channels for beautiful skin and strong hair roots."
  }
];
