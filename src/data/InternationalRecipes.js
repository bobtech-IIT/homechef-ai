/**
 * 🍝 HomeChef AI v2 - International Home-Cooking Recipe Database
 * Contains home-cookable, highly-adaptable international recipes 
 * that can be easily cooked in Indian kitchens with locally-available ingredients.
 */

export const INTERNATIONAL_RECIPES = [
  // --- ITALIAN (Home Cookable) ---
  {
    id: "int_ita_001",
    name: "One-Pot Creamy Tomato Basil Pasta 🍅",
    region: "Italian",
    category: "international",
    description: "An incredibly creamy, rich tomato basil pasta made in a single pot. No need to boil pasta separately!",
    ingredients: [
      "Penne or Fusilli pasta (2 cups)",
      "Ripe tomatoes (3, finely chopped)",
      "Tomato paste or ketchup (1 tbsp)",
      "Garlic (4 cloves, finely minced)",
      "Onion (1, sliced thin)",
      "Fresh basil leaves (handful)",
      "Amul fresh cream or cream cheese (3 tbsp)",
      "Olive oil or butter (1 tbsp)",
      "Mixed herbs/Oregano, red chili flakes"
    ],
    steps: [
      "In a deep pot, add raw pasta, chopped tomatoes, onion slices, minced garlic, and basil leaves.",
      "Pour in 3 cups of hot water, salt, black pepper, and olive oil.",
      "Bring to a boil over medium-high heat, stirring occasionally to prevent pasta from sticking.",
      "Once boiling, cover and cook on medium-low for 10-12 minutes until the liquid reduces and pasta is al dente.",
      "Turn off the heat. Stir in the fresh cream, mixed herbs, and red chili flakes.",
      "Let it sit covered for 2 minutes to thicken into a rich, luscious sauce. Garnish with more basil."
    ],
    cookTime: "20 mins",
    difficulty: "Easy",
    tags: ["vegetarian", "one-pot", "kids-friendly", "quick"],
    isVegetarian: true,
    story: "Inspired by the famous Naples one-pot cooking style, modified for Indian stove tops."
  },

  // --- ARABIC / MIDDLE EASTERN ---
  {
    id: "int_ara_001",
    name: "Creamy Golden Hummus & Toasted Pita 🫓",
    region: "Arabic",
    category: "international",
    description: "Silky, velvety chickpea dip infused with garlic, lemon, and rich sesame tahini, served with warm home-toasted pita triangles.",
    ingredients: [
      "White Chickpeas/Kabuli Chana (1 cup, soaked & boiled soft)",
      "Sesame seeds/Til (3 tbsp, to make quick Tahini)",
      "Garlic (3 cloves)",
      "Lemon juice (2 tbsp)",
      "Olive oil (3 tbsp)",
      "Cold ice water (3-4 tbsp)",
      "Roasted cumin powder, red chili powder",
      "Pita bread or thick flat rotis (for serving)"
    ],
    steps: [
      "Make quick Tahini: Dry roast sesame seeds until light cream color. Blend with 1 tbsp olive oil into a smooth paste.",
      "In the blender, add garlic cloves, lemon juice, salt, and tahini. Blend until frothy.",
      "Add the boiled chickpeas (save a few for garnish) and 2 tbsp olive oil. Blend.",
      "Add ice-cold water one tablespoon at a time while blending. This is the secret to getting a creamy white, fluffy texture.",
      "Spread hummus on a shallow plate, create a swirl using back of spoon, and fill the well with olive oil.",
      "Dust with cumin and red chili powder. Serve with warm, toasted pita bread slices."
    ],
    cookTime: "15 mins",
    difficulty: "Easy",
    tags: ["vegetarian", "high-protein", "healthy", "party-starter"],
    isVegetarian: true,
    story: "A staple across Lebanon, Egypt, and Syria, hummus represents the shared joy of dipping bread together."
  },

  // --- CHINESE (Indian-Style) ---
  {
    id: "int_chi_001",
    name: "Street Style Veg Hakka Noodles 🍜",
    region: "Chinese",
    category: "international",
    description: "The absolute classic street-side Indo-Chinese noodles tossed with crisp cabbage, capsicum, carrots, and spicy dark soy sauce.",
    ingredients: [
      "Hakka Noodles pack (1, boiled al dente)",
      "Garlic (6 cloves, finely chopped)",
      "Ginger (1 inch, finely chopped)",
      "Spring onion greens & whites (1/2 cup)",
      "Shredded veggies (1.5 cups: Cabbage, carrot, green capsicum)",
      "Soy sauce (2 tbsp)",
      "Vinegar (1 tsp)",
      "Green chili sauce (1 tbsp)",
      "Black pepper powder, salt, oil"
    ],
    steps: [
      "Boil noodles in salted water, drain, rinse with cold water, and toss with a few drops of oil to prevent sticking.",
      "Heat a large wok or kadhai on high heat until smoking. Add 2 tbsp of oil.",
      "Add finely chopped ginger, garlic, and spring onion whites. Sauté for 30 seconds on high heat.",
      "Add the shredded vegetables. Toss continuously on high heat for 2 minutes. The veggies must stay crunchy.",
      "Add the boiled noodles, soy sauce, green chili sauce, vinegar, black pepper, and salt.",
      "Using two spatulas, toss the noodles vigorously on high heat for 2 minutes to get that smoky charred wok flavor.",
      "Garnish with chopped spring onion greens. Serve piping hot."
    ],
    cookTime: "15 mins",
    difficulty: "Easy",
    tags: ["vegetarian", "street-food", "Indo-Chinese", "crowd-pleaser"],
    isVegetarian: true,
    story: "Born in Kolkata's Chinatown, Indo-Chinese cooking represents the perfect marriage of Chinese cooking techniques and bold Indian spices."
  },

  // --- MEXICAN ---
  {
    id: "int_mex_001",
    name: "Sharma Ji's Veg Quesadillas 🫓🧀",
    region: "Mexican",
    category: "international",
    description: "Crispy, folded flatbreads stuffed with spicy sweetcorn, black beans, bell peppers, and melted gooey cheese.",
    ingredients: [
      "Leftover rotis or flour tortillas (4)",
      "Boiled sweetcorn (1/2 cup)",
      "Boiled black beans or rajma (1/2 cup)",
      "Capsicum & Onion (1/2 cup, chopped)",
      "Chipotle or tomato sauce (2 tbsp)",
      "Mozzarella or processed cheese (1 cup, grated)",
      "Cumin powder, oregano, salt, butter"
    ],
    steps: [
      "In a bowl, mix boiled sweetcorn, black beans/rajma, capsicum, onion, salt, cumin powder, and tomato sauce.",
      "Lay a roti flat on a board. Spread a generous layer of grated cheese on one half.",
      "Spoon 2-3 tablespoons of the sweetcorn bean stuffing over the cheese layer.",
      "Top with another sprinkle of cheese, then fold the roti in half to create a semi-circle pocket.",
      "Heat a tawa on medium-low. Apply butter, place the folded roti, and toast gently on both sides.",
      "Press down with spatula until the roti turns crispy golden brown and the cheese is fully melted. Slice into triangles."
    ],
    cookTime: "15 mins",
    difficulty: "Easy",
    tags: ["vegetarian", "kids-friendly", "leftover-makeover", "cheese-pull"],
    isVegetarian: true,
    story: "Quesadilla comes from the Spanish word 'Queso' meaning cheese. A perfect, fun way to repurpose last night's leftover rotis."
  },

  // --- THAI ---
  {
    id: "int_tha_001",
    name: "Fragrant Thai Green Curry & Jasmine Rice 🥥🌶️",
    region: "Thai",
    category: "international",
    description: "An aromatic coconut-based curry loaded with baby corn, mushrooms, and zucchini, scented with fresh basil and lemon zest.",
    ingredients: [
      "Coconut milk (1 can / 400ml)",
      "Green curry paste (2 tbsp - easily available or homemade)",
      "Vegetables (1.5 cups: baby corn, mushrooms, carrot, beans)",
      "Lemon zest or Kaffir lime leaves (4)",
      "Lemongrass stalk (1 piece, bruised)",
      "Soy sauce (1 tbsp)",
      "Sugar (1 tsp), salt, oil",
      "Basmati or Jasmine rice (for serving)"
    ],
    steps: [
      "Heat 1 tbsp oil in a deep pan. Add Thai green curry paste and sauté on low heat for 1 minute until fragrant.",
      "Pour in half of the coconut milk. Stir well until the oil starts to separate slightly on the edges.",
      "Add lemongrass and chopped vegetables (baby corn, carrots, beans, mushrooms). Sauté for 2 minutes.",
      "Add the remaining coconut milk, 1/2 cup water, lime leaves/zest, and soy sauce. Bring to a gentle simmer.",
      "Cover and simmer on low-medium flame for 8 minutes until the vegetables are cooked but retain their bright colors.",
      "Stir in sugar. Garnish with a handful of fresh basil leaves. Serve warm with steamed rice."
    ],
    cookTime: "25 mins",
    difficulty: "Medium",
    tags: ["vegetarian", "aromatic", "coconut-gravy", "exotic"],
    isVegetarian: true,
    story: "Thai green curry gets its vibrant color and fresh herbal aroma from green bird's eye chilies and sweet Thai basil."
  }
];
