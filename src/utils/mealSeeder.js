/**
 * 🍛 HomeChef AI v2 - Dynamic Weekly Meal Seeding Engine
 * Extracts monolithic seeding logic from v1.
 * Matches regional palate, diet, and enforces strict locks (e.g. Gujarati = Vegetarian).
 */

import { GRANDMOTHER_RECIPES } from '../data/GrandmotherRecipes';
import { INTERNATIONAL_RECIPES } from '../data/InternationalRecipes';

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

const DEFAULT_BREAKFASTS = [
  { name: "Poha Batata 🧅🥔", isVegetarian: true },
  { name: "Rava Upma 🌾", isVegetarian: true },
  { name: "Masala Idli Fry 🍳", isVegetarian: true },
  { name: "Methi Thepla 🫓", isVegetarian: true },
  { name: "Paneer Bhurji Toast 🍞", isVegetarian: true },
  { name: "Besan Chilla 🌱", isVegetarian: true },
  { name: "Homestyle Oats Porridge 🥣", isVegetarian: true }
];

const DEFAULT_SNACKS = [
  { name: "Masala Chai & Rusk ☕", isVegetarian: true },
  { name: "Roasted Makhana 🪷", isVegetarian: true },
  { name: "Dhokla Pieces 🫓", isVegetarian: true },
  { name: "Bhel Puri Bowl 🌽", isVegetarian: true },
  { name: "Paneer Pakora 🧀", isVegetarian: true },
  { name: "Sprouted Moong Salad 🥗", isVegetarian: true },
  { name: "Samosa & Green Chutney 🌶️", isVegetarian: true }
];

const VEGAN_BREAKFASTS = [
  { name: "Poha Batata 🧅🥔", isVegetarian: true },
  { name: "Rava Upma 🌾", isVegetarian: true },
  { name: "Masala Idli Fry 🌱", isVegetarian: true },
  { name: "Methi Thepla (No Ghee) 🫓", isVegetarian: true },
  { name: "Tofu Bhurji Toast 🍞", isVegetarian: true },
  { name: "Besan Chilla 🌱", isVegetarian: true },
  { name: "Oats Porridge (Almond Milk) 🥣", isVegetarian: true }
];

const VEGAN_SNACKS = [
  { name: "Black Tea / Ginger Chai (No Milk) ☕", isVegetarian: true },
  { name: "Roasted Makhana 🪷", isVegetarian: true },
  { name: "Dhokla Pieces 🫓", isVegetarian: true },
  { name: "Bhel Puri Bowl 🌽", isVegetarian: true },
  { name: "Aloo Tikki 🌱", isVegetarian: true },
  { name: "Sprouted Moong Salad 🥗", isVegetarian: true },
  { name: "Samosa & Green Chutney 🌶️", isVegetarian: true }
];

const isVeganRecipe = (recipe) => {
  const nonVeganKeywords = ['ghee', 'butter', 'milk', 'paneer', 'curd', 'yogurt', 'cream', 'dahi', 'honey', 'egg', 'chicken', 'mutton', 'fish', 'beef', 'cheese', 'malai', 'makhani', 'khoya', 'buttermilk'];
  const nameMatch = nonVeganKeywords.some(keyword => recipe.name.toLowerCase().includes(keyword));
  const ingMatch = recipe.ingredients && recipe.ingredients.some(ing => {
    const ingStr = typeof ing === 'string' ? ing : (ing.name || '');
    return nonVeganKeywords.some(keyword => ingStr.toLowerCase().includes(keyword));
  });
  return !nameMatch && !ingMatch;
};

// Helper: Shuffle array
const shuffle = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

/**
 * 🚀 Core Seeding Function
 */
export const seedWeeklyMenu = (profile) => {
  let { regionalPalate = 'general', dietType = 'Vegetarian 🌱' } = profile;
  
  // Normalize Oriya / Orissa and Bengal palates
  const normalizedPalate = regionalPalate.toLowerCase();
  let targetPalate = normalizedPalate;
  if (normalizedPalate === 'orissa' || normalizedPalate === 'oriya') {
    targetPalate = 'odisha';
  } else if (normalizedPalate === 'bengal') {
    targetPalate = 'kolkata'; // default fallback for Bengal
  }

  // Strict lock checks
  const isGujarati = targetPalate === 'gujarat';
  const isVegan = dietType.toLowerCase().includes('vegan');
  const isStrictVeg = isVegan || isGujarati || dietType.toLowerCase().includes('veg');

  // Filter regional & international recipes by vegetarian lock
  const filterVeg = (recipeList) => {
    let list = recipeList;
    if (isStrictVeg) {
      list = list.filter(r => r.isVegetarian);
    }
    if (isVegan) {
      list = list.filter(isVeganRecipe);
    }
    return list;
  };

  const availableGrandmother = filterVeg(GRANDMOTHER_RECIPES);
  const availableInternational = filterVeg(INTERNATIONAL_RECIPES);

  // Region-matched recipes first
  const regionMatched = availableGrandmother.filter(r => r.region.toLowerCase() === targetPalate);
  const otherRegions = availableGrandmother.filter(r => r.region.toLowerCase() !== targetPalate);

  // Pool for main meals (Lunch/Dinner) - Heavily prioritize matched regional recipes
  let mainMealPool = [];
  if (regionMatched.length > 0) {
    // Fill the core pool with matched regional dishes so they appear primarily
    while (mainMealPool.length < 8) {
      mainMealPool = [...mainMealPool, ...regionMatched];
    }
  } else {
    mainMealPool = [...availableGrandmother];
  }
  
  // Add variety with matched international options
  mainMealPool = [...mainMealPool, ...availableInternational];
  mainMealPool = shuffle(mainMealPool);

  const plan = {};
  let mealPoolIndex = 0;
  const breakfastsList = isVegan ? VEGAN_BREAKFASTS : DEFAULT_BREAKFASTS;
  const snacksList = isVegan ? VEGAN_SNACKS : DEFAULT_SNACKS;

  DAYS.forEach((day, idx) => {
    // Select breakfast & snack from static lists
    const breakfast = breakfastsList[idx % breakfastsList.length];
    const snack = snacksList[idx % snacksList.length];

    // Select lunch & dinner, ensuring variety
    let lunch = mainMealPool[mealPoolIndex % mainMealPool.length];
    mealPoolIndex++;
    let dinner = mainMealPool[mealPoolIndex % mainMealPool.length];
    mealPoolIndex++;

    // Ensure lunch and dinner are not the same recipe on the same day
    if (lunch.id === dinner.id) {
      dinner = mainMealPool[(mealPoolIndex + 1) % mainMealPool.length];
      mealPoolIndex++;
    }

    plan[day] = {
      breakfast: { name: breakfast.name, isVegetarian: true, category: 'breakfast' },
      lunch: { 
        id: lunch.id || `local_l_${idx}`,
        name: lunch.name, 
        isVegetarian: lunch.isVegetarian, 
        category: 'lunch',
        region: lunch.region || 'Indian',
        ingredients: lunch.ingredients || [],
        steps: lunch.steps || []
      },
      snack: { name: snack.name, isVegetarian: true, category: 'snack' },
      dinner: { 
        id: dinner.id || `local_d_${idx}`,
        name: dinner.name, 
        isVegetarian: dinner.isVegetarian, 
        category: 'dinner',
        region: dinner.region || 'Indian',
        ingredients: dinner.ingredients || [],
        steps: dinner.steps || []
      }
    };
  });

  return plan;
};
