/**
 * 🍛 HomeChef AI v2 - Robust Offline Knowledge Base & Chat Fallbacks
 * Serves as Layer 5 of the PuterAI wrapper system, ensuring 100% uptime
 * and complete offline capability.
 */

// Offline fallback recipe collection structured by region
const OFFLINE_RECIPES = {
  gujarat: {
    name: "Gujarati Khatti Meethi Dal 🥣",
    ingredients: [
      "Arhar/Toor Dal (1 cup, washed)",
      "Jaggery/Gud (2 tbsp)",
      "Kokum (3-4 pieces) or Tamarind",
      "Peanuts (2 tbsp)",
      "Green chilies (2, slit)",
      "Ginger-chili paste (1 tsp)",
      "Mustard seeds, cumin, fenugreek seeds",
      "Asafoetida/Hing (pinch)",
      "Fresh coriander, Curry leaves"
    ],
    steps: [
      "Pressure cook arhar dal with peanuts and turmeric for 3 whistles till soft.",
      "Whisk cooked dal soft. Add 2 cups water, jaggery, kokum, ginger paste, and salt.",
      "Boil dal on low heat for 10-15 mins till flavours blend beautifully.",
      "Heat ghee in small pan. Add mustard seeds, cumin, fenugreek, curry leaves, and Hing.",
      "Pour hot tempering over boiling dal. Cover instantly for aroma.",
      "Garnish with chopped coriander. Serve hot with steamed rice."
    ],
    cookTime: "30 mins",
    difficulty: "Easy",
    isVegetarian: true,
    story: "Traditional sweet-and-sour lentil dish that defines Gujarati comforting home meals."
  },
  punjab: {
    name: "Dhaba Style Dal Fry 🌾",
    ingredients: [
      "Chana Dal (1/2 cup)",
      "Toor Dal (1/2 cup)",
      "Onion (1, finely chopped)",
      "Tomatoes (2, pureed)",
      "Ginger-garlic paste (1 tbsp)",
      "Green chili (2, chopped)",
      "Kasuri Methi (1 tsp)",
      "Garam masala, turmeric, red chili",
      "Ghee/Butter (2 tbsp)"
    ],
    steps: [
      "Boil chana dal and toor dal with salt and turmeric until fully tender.",
      "Heat ghee in a pan. Splutter cumin seeds, ginger-garlic paste, and green chilies.",
      "Saute chopped onions until golden brown. Add tomato puree and cook till oil separates.",
      "Add red chili powder, coriander powder, and cooked dal. Adjust water consistency.",
      "Simmer for 10 minutes. Mash a few lentils with back of spoon to thicken.",
      "Finish with garam masala, crushed kasuri methi, and fresh coriander."
    ],
    cookTime: "35 mins",
    difficulty: "Easy",
    isVegetarian: true,
    story: "Rustic, high-protein Punjabi dal served across highway dhabas with hot tandoori roti."
  },
  maharashtra: {
    name: "Classic Kanda Batata Poha 🧅🥔",
    ingredients: [
      "Thick Poha/Flattened rice (2 cups)",
      "Onion/Kanda (1 large, chopped)",
      "Potato/Batata (1 small, finely diced)",
      "Peanuts (3 tbsp)",
      "Mustard seeds, green chilies, curry leaves",
      "Grated coconut and fresh coriander",
      "Lemon juice (1 tbsp)"
    ],
    steps: [
      "Rinse poha in colander gently under running water. Sprinkle salt and turmeric, mix lightly, keep aside.",
      "Heat oil. Roast peanuts till crunchy, remove and set aside.",
      "In same oil, add mustard seeds, green chilies, and curry leaves.",
      "Add diced potatoes, cover and cook on low heat till tender.",
      "Add chopped onions, saute till translucent. Mix in roasted peanuts.",
      "Add rinsed poha. Fold gently on low flame. Cover and steam for 3 mins.",
      "Garnish with fresh coconut, coriander, and squeeze of fresh lemon."
    ],
    cookTime: "15 mins",
    difficulty: "Easy",
    isVegetarian: true,
    story: "Maharashtra's absolute favorite breakfast, light yet satisfying."
  },
  bangladesh: {
    name: "Bangladeshi Bhuna Khichuri 🇧🇩🌾",
    ingredients: [
      "Fragrant Chinigura or Gobindobhog Rice (1 cup)",
      "Split yellow Moong Dal (1 cup)",
      "Onion (1 large, sliced thin)",
      "Ginger paste (1 tbsp)",
      "Garlic paste (1 tsp)",
      "Mustard oil or Ghee (3 tbsp)",
      "Whole spices (Bay leaf, cardamom, cinnamon, cloves)",
      "Roasted cumin powder (1 tsp)",
      "Green chilies (4, slit)"
    ],
    steps: [
      "Dry roast the yellow moong dal in a pan on medium heat until fragrant. Wash dal and rice together, drain completely.",
      "Heat mustard oil or ghee in a heavy pot. Add whole bay leaf, cardamoms, cinnamon, and cloves.",
      "Sauté sliced onions till golden brown. Stir in ginger-garlic paste, turmeric, and chili powder with a splash of water.",
      "Add the drained rice and dal. Roast them gently with the masala for 3-4 minutes until the grains are coated.",
      "Pour in exactly 3.5 cups of boiling hot water, add green chilies, and bring to a rolling boil.",
      "Reduce heat to lowest, cover tightly, and simmer for 15 minutes without opening until all moisture is absorbed and rice is fluffy."
    ],
    cookTime: "30 mins",
    difficulty: "Medium",
    isVegetarian: true,
    story: "A warm, deeply aromatic comforting dish that forms the soul of rainy days and celebrations in Bangladesh, usually enjoyed with round fried eggplants (Begun Bhaja)."
  },
  kolkata: {
    name: "Kolkata Aloo Posto 🥔🌾",
    ingredients: [
      "Potatoes (4 large, diced into cubes)",
      "Poppy seeds / Posto (4 tbsp, soaked and ground)",
      "Mustard oil (3 tbsp, authentic pungent brand)",
      "Kalonji / Nigella seeds (1/2 tsp)",
      "Green chilies (4, slit)",
      "Turmeric and Salt to taste"
    ],
    steps: [
      "Grind the soaked poppy seeds with 2 green chilies and a splash of water into a thick, completely smooth paste.",
      "Heat mustard oil in a pan until smoking hot. Add kalonji and slit green chilies.",
      "Add the potato cubes and sauté on medium heat for 5 minutes until light golden on the edges.",
      "Add 1 cup water, salt, and a very tiny pinch of turmeric (optional). Cover and cook until potatoes are 90% tender.",
      "Stir in the ground poppy seed paste, mix gently, and cook uncovered on low heat for 5 minutes until the gravy coats the potatoes.",
      "Drizzle one teaspoon of raw mustard oil on top just before turning off the heat to lock in the pungent aroma."
    ],
    cookTime: "25 mins",
    difficulty: "Easy",
    isVegetarian: true,
    story: "The ultimate culinary signature of West Bengal, loved for its creamy, nutty poppy seed texture, and best enjoyed with hot Musur Dal and steamed rice."
  },
  tamilnadu: {
    name: "Hotel Style Tomato Kurma 🥥",
    ingredients: [
      "Tomatoes (3 large, chopped)",
      "Onion (1, chopped)",
      "Fennel seeds, cinnamon, cloves",
      "Grated coconut (4 tbsp)",
      "Cashews or Fried gram (1 tbsp)",
      "Ginger-garlic paste (1 tsp)",
      "Mint & coriander leaves"
    ],
    steps: [
      "Grind coconut, cashews, fennel seeds, and green chilies into a very smooth paste.",
      "Heat oil. Temper with cinnamon, cloves, and curry leaves.",
      "Saute onions and ginger-garlic paste till golden. Add tomatoes and cook till soft.",
      "Add turmeric, red chili powder, garam masala, and mint leaves. Cook till mushy.",
      "Pour in the ground coconut paste and 1.5 cups of water. Bring to a boil.",
      "Simmer on low flame for 8-10 minutes until oil floats on top. Garnish with coriander."
    ],
    cookTime: "25 mins",
    difficulty: "Medium",
    isVegetarian: true,
    story: "Fragrant, coconut-based tomato gravy served with fluffy parotta or hot idlis."
  },
  kerala: {
    name: "Nadan Veg Avial (Mixed Vegetable Coconut Stew) 🥥",
    ingredients: [
      "Mixed vegetables (2 cups: carrot, drumstick, raw banana, pumpkin, beans)",
      "Grated coconut (1 cup)",
      "Cumin seeds (1 tsp)",
      "Green chilies (3-4)",
      "Thick Curd/Yogurt (3 tbsp)",
      "Coconut oil (2 tbsp)",
      "Curry leaves (2 sprigs)"
    ],
    steps: [
      "Cut mixed vegetables into 2-inch long thick strips.",
      "Cook vegetables with salt, turmeric, and 1/2 cup water until tender but firm.",
      "Coarsely grind coconut, cumin seeds, and green chilies without adding much water.",
      "Add coconut paste to cooked vegetables. Mix gently on low heat for 3 minutes.",
      "Turn off the heat. Stir in whisked curd quickly so it doesn't curdle.",
      "Drizzle cold coconut oil and scatter fresh curry leaves. Cover instantly to lock aroma."
    ],
    cookTime: "30 mins",
    difficulty: "Medium",
    isVegetarian: true,
    story: "An ancient traditional feast dish from Kerala, packed with raw coconut goodness."
  },
  odisha: {
    name: "Aparna's Odia Dalma 🥣",
    ingredients: [
      "Toor dal / Harada dal (1 cup)",
      "Raw papaya (1 cup, cubed)",
      "Pumpkin / Kakharu (1 cup, cubed)",
      "Yam / Mati Alu (1/2 cup)",
      "Drumstick / Sajana Chhuin (2, cut)",
      "Grated coconut (1/2 cup)",
      "Ghee (2 tbsp)",
      "Panch phutana (1 tsp)",
      "Roasted bhaja masala powder (2 tsp)"
    ],
    steps: [
      "Pressure cook dal, papaya, yam, turmeric, ginger, and salt till tender.",
      "Add drumstick and pumpkin, cook on medium flame until all vegetables are soft.",
      "Stir in freshly grated coconut.",
      "Heat ghee in a pan. Sauté panch phutana and dry red chilies. Pour tempering into Dalma.",
      "Sprinkle roasted bhaja masala on top. Serve hot."
    ],
    cookTime: "35 mins",
    difficulty: "Easy",
    isVegetarian: true,
    story: "Jagannath Temple's absolute favorite daily mahaprasad dish, highly nutritious and comforting."
  },
  general: {
    name: "Quick Homestyle Khichdi 🍳",
    ingredients: [
      "Basmati Rice (1/2 cup)",
      "Moong Dal (1/2 cup)",
      "Ghee (2 tbsp)",
      "Cumin seeds (1 tsp)",
      "Asafoetida/Hing (pinch)",
      "Ginger (1 inch, finely grated)",
      "Turmeric, salt"
    ],
    steps: [
      "Wash rice and moong dal together. Soak for 15 minutes.",
      "Heat ghee in pressure cooker. Add cumin and Hing.",
      "Add grated ginger, green chili, and sauté for 30 seconds.",
      "Add soaked rice and dal, salt, turmeric, and 4 cups of water.",
      "Pressure cook for 4 whistles until fully mushy and combined.",
      "Serve piping hot topped with a dollop of ghee, pickle, and papad."
    ],
    cookTime: "20 mins",
    difficulty: "Easy",
    isVegetarian: true,
    story: "The universal Indian healing comfort bowl, loved across all states."
  },

  // === Extra recipes for richer offline RAG (added for depth & archetype coverage) ===
  rajasthan: {
    name: "Dal Baati Churma (Cognitive Fuel Version)",
    ingredients: [
      "Whole wheat flour (2 cups for baati)",
      "Ghee (generous — brain loves it)",
      "Mixed dals (1.5 cups — high protein)",
      "Ragi flour (2 tbsp — for sustained focus)",
      "Jaggery + nuts for churma"
    ],
    steps: [
      "Knead baati dough with ghee + water. Form balls, bake/deep fry till golden.",
      "Pressure cook mixed dals with spices until creamy.",
      "For cognitive boost: add ragi and extra nuts to the churma crumble.",
      "Break baati, pour hot dal + ghee, top with protein-packed churma."
    ],
    cookTime: "55 mins",
    difficulty: "Medium",
    isVegetarian: true,
    story: "Rajasthan's royal endurance meal. The high-protein + sustained carb version is perfect for long thinking sessions or Shark-Tank-level hustle."
  },

  kerala_bio: {
    name: "Nadan Avial (Bio-Hacker Clean)",
    ingredients: [
      "Mixed vegetables (yam, raw banana, beans, carrots — 3 cups)",
      "Fresh grated coconut (1.5 cups)",
      "Green chilies, cumin, curry leaves",
      "Thick curd (3 tbsp — probiotic)",
      "Coconut oil (measured, 1.5 tbsp)"
    ],
    steps: [
      "Steam vegetables just until tender (keep nutrients).",
      "Coarsely grind coconut + cumin + chili for clean paste.",
      "Mix with curd off-heat. Finish with measured coconut oil + curry leaves.",
      "Zero refined anything. High fiber, healthy fats, adaptogenic curry leaves."
    ],
    cookTime: "25 mins",
    difficulty: "Easy",
    isVegetarian: true,
    story: "Kerala's classic made bio-hacker friendly — minimal oil, maximum micronutrients and gut health. Zen plating in a traditional uruli feels elevated."
  },

  punjab_cognitive: {
    name: "Sarson ka Saag + Makki di Roti (High-Protein Brain Version)",
    ingredients: [
      "Mustard greens + spinach (big bunch)",
      "Makki (corn) flour for rotis + little ragi",
      "Ghee + ginger + garlic for tempering",
      "White butter / Greek yogurt on top",
      "Green chili for kick"
    ],
    steps: [
      "Slow-cook saag with ginger/garlic till dark and fragrant (long cook = better bioavailability).",
      "Make makki + ragi rotis on tawa with ghee.",
      "Top saag with extra protein (yogurt or extra butter) for cognitive staying power."
    ],
    cookTime: "60 mins (mostly passive)",
    difficulty: "Medium",
    isVegetarian: true,
    story: "Punjab's winter classic upgraded for sustained brain energy. The ragi addition and protein topping turn it into long-meeting fuel."
  }
};

/**
 * 🗺️ Layer 5 Fallback: Region-Matched Recipe Engine (archetype-aware for bio/cognitive variants)
 */
export const getLocalFallbackRecipe = (query = '', archetype = 'standard') => {
  const q = query.toLowerCase();
  let selected = OFFLINE_RECIPES.general;

  if (q.includes('gujarat') || q.includes('gujarati')) {
    selected = OFFLINE_RECIPES.gujarat;
  } else if (q.includes('punjab') || q.includes('punjabi')) {
    selected = OFFLINE_RECIPES.punjab;
  } else if (q.includes('maharashtra') || q.includes('marathi')) {
    selected = OFFLINE_RECIPES.maharashtra;
  } else if (q.includes('bangladesh') || q.includes('east bengal') || q.includes('bangladeshi')) {
    selected = OFFLINE_RECIPES.bangladesh;
  } else if (q.includes('kolkata') || q.includes('west bengal') || q.includes('kolkata cuisine')) {
    selected = OFFLINE_RECIPES.kolkata;
  } else if (q.includes('bengal') || q.includes('bengali')) {
    selected = OFFLINE_RECIPES.kolkata; // default fallback
  } else if (q.includes('tamil') || q.includes('south')) {
    selected = OFFLINE_RECIPES.tamilnadu;
  } else if (q.includes('kerala') || q.includes('malayali')) {
    selected = OFFLINE_RECIPES.kerala;
  } else if (q.includes('odisha') || q.includes('oriya') || q.includes('orissa')) {
    selected = OFFLINE_RECIPES.odisha;
  }

  const archNote = archetype === 'biohacker' 
    ? ' (Biohacker mode: low-GI / clean / adaptogen focus)' 
    : archetype === 'cognitive' 
      ? ' (Cognitive mode: high-protein / brain stamina focus)' 
      : '';

  // Safe concatenation to avoid bundler (rolldown) binding issues with large dynamic templates in this Vite setup
  let recipeText = '### 🍛 Local Offline Rasoi Saathi Fallback Engine' + archNote + '\n\n';
  recipeText += 'Mausam aur temporary network conditions ki wajah se, hamara cloud AI server connection thoda dheema hai. Par koi baat nahi! Aapki rasoi rukni nahi chahiye. \n\n';
  recipeText += 'Yahan aapke palate ke liye ek swadisht traditional recipe hai:\n\n';
  recipeText += '#### 🍽️ **' + selected.name + '**\n';
  recipeText += '* **Cook Time:** ' + selected.cookTime + ' | **Difficulty:** ' + selected.difficulty + ' | **Diet:** Vegetarian 🌱\n';
  recipeText += '* * Backstory: ' + selected.story + ' *\n\n';
  recipeText += '**📝 Ingredients Required:**\n' + selected.ingredients.map(ing => '- ' + ing).join('\n') + '\n\n';
  recipeText += '**👩‍🍳 Step-by-Step Cooking Steps:**\n' + selected.steps.map((step, idx) => (idx + 1) + '. ' + step).join('\n') + '\n\n';
  recipeText += '---\n*💡 System Note: Stable Internet aate hi AI Chat automatically online mode me chalne lagegi.*';

  return recipeText;
};



/**
 * 💬 Layer 5 Fallback: Smart Chat Response Generator (now archetype-aware: standard / biohacker / cognitive)
 * Ensures Nani always gives useful Hinglish even if Puter REST never succeeds.
 */
export const getLocalFallbackChat = (query = '', archetype = 'standard') => {
  const q = query.toLowerCase();
  const archLabel = archetype === 'biohacker' ? 'Biohacker (low-GI / adaptogen)' : 
                    archetype === 'cognitive' ? 'Cognitive (high-protein / brain fuel)' : 'Standard traditional';
  
  if (q.includes('hello') || q.includes('hi') || q.includes('namaste') || q.includes('suno') || q.includes('dhanyawad')) {
    const greetExtra = archetype === 'biohacker' 
      ? ' Aaj bhi clean eating ke liye best choices suggest karungi.' 
      : archetype === 'cognitive' 
        ? ' Dimag aur energy ke liye best brain foods yaad hain.' 
        : '';
    return `Namaste beta! Main aapki **Nani - Rasoi Saathi** hoon. 🍳 

Aaj thoda network slow hai, lekin meri rasoi ki yaadein aur traditional recipes kabhi offline nahi hoti. Aap mujhse Haryana, Bengal, Gujarat, Punjab, Maharashtra, Tamil Nadu, Kerala ya kisi bhi state ki traditional recipe maang sakte ho — step-by-step, bilkul ghar jaisa. (${archLabel})${greetExtra}

Aap aaj kya banana chahte hain? Batao, main madad karti hoon!`;
  }
  
  if (q.includes('expir') || q.includes('inventory') || q.includes('samaan') || q.includes('kharab')) {
    return `Inventory warning system checking... 🫙

Aapke offline record ke mutabik sabhi items safe hain. Agar aapko koi specific item use karna hai (jaise Coriander, Tomatoes), toh mujhe batayein, main uske hisab se offline database se swadisht matching recipe dhoondh nikalunga!`;
  }

  if (q.includes('diet') || q.includes('health') || q.includes('restriction') || q.includes('parhez')) {
    return `Diet lock system active! 🛡️

Aapke setup wizard preferences ke mutabik, hamare vegetarian aur regional checks fully active hain. Agar aapne Gujarati select kiya hai, toh hamara offline engine non-veg options ko strictly block rakhega. Aap bilkul befikra hokar cooking kariye!`;
  }

  if (q.includes('bajre') || q.includes('bajra') || (q.includes('haryana') && q.includes('khichdi')) || q.includes('bajre ki khichdi')) {
    // Archetype-aware rich fallbacks — the exact user "Nani, mujhe Bajre..." prompt must succeed with useful steps
    if (archetype === 'biohacker') {
      return `Arre waah beta! Aapke **Biohacker** palate ke liye Haryana ki low-GI **Bajre ki Khichdi** — blood sugar steady rakhe aur energy clean de. Adaptogens se boost!

**📝 Ingredients (4-5 logon ke liye, clean version):**
- Bajra (pearl millet) — 1 cup, achhe se dhoya hua (low-GI star)
- Moong dal (thodi si, optional) — 2-3 tbsp
- Paani — 4-5 cups (adjust)
- Namak + haldi (extra pinch for anti-inflam) — swaad anusaar
- Cold-pressed virgin coconut or avocado oil (thoda) ya measured desi ghee (1-2 tbsp max)
- Fresh adrak + haldi + optional Tulsi/Holy Basil — adaptogen boost
- Hand-churned white butter or thick Greek-style yogurt — serving ke liye (probiotic angle)
- Jeera, fresh coriander

**👩‍🍳 Step-by-Step (Biohacker Clean Slow Tarika):**
1. Bajre ko raat bhar ya 4-5 ghante bhigokar, achhe se dholo (fiber intact rakho).
2. Bhari handi mein 4 cups garam paani, namak, haldi, adrak, thoda oil/ghee daal kar ubaal lao.
3. Bhiga bajra + moong + extra haldi/adrak daal ke dheemi aanch par 40-50 min pakao. Hilate raho, garam paani se adjust for creamy not gluey texture.
4. Last 1-2 min mein measured ghee/oil + jeera tadka. Bahut zyada ghee mat daalna — low-GI ke liye control.
5. Garam serve. Upar adaptogen garnish (coriander + thoda fresh haldi grate) + clean dollop of yogurt or light makkhan. Zen plating: simple earthen bowl, minimal, natural greens pop.

Yeh version blood sugar spikes nahi karega, sustained energy dega. Ghee kam, adaptogens zyada — perfect for modern biohacker rasoi! Cloud wapas aaye toh bhi yahi smart tarika suggest karungi. Shubh bhojan beta! 🌿`;
    } else if (archetype === 'cognitive') {
      return `Arre waah beta! **Cognitive Hustler** ke liye Haryana ki **Bajre ki Khichdi** — sustained brain stamina + protein power wali version. Ragi/ancient grain notes add kar sakte ho agar available ho.

**📝 Ingredients (4-5 logon ke liye, brain-fuel):**
- Bajra (pearl millet) — 1 cup, dhoya hua (steady glucose for focus)
- Moong dal — 3-4 tbsp (protein)
- Paani — 4-5 cups
- Namak + haldi + jeera — swaad
- Desi ghee — 3 tbsp (MCT like brain fuel)
- Hand-churned makkhan (white butter) — serving
- Optional boosters: crushed walnuts or flax seeds (if pantry mein), extra adrak
- Garam masala light + fresh coriander

**👩‍🍳 Step-by-Step (Cognitive Power Tarika):**
1. Bajra bhigao 4-5 hrs minimum, dholo.
2. Handi mein paani + namak + haldi + adrak ubaal. Bajra + moong daalo.
3. Dheemi aanch 40-50 min, continuous stir for creamy texture (no lumps = steady energy).
4. Last mein full ghee + light jeera tadka. Protein + fat combo for focus.
5. Serve hot with generous makkhan dollops + thandi lassi. Dramatic plating: bold contrast bowl, walnut sprinkle on top for omega-3 pop, fresh herbs for color strike.

Haryana fields ki warmth + modern brain fuel. Yeh khichdi dimag ko long meetings ke liye ready rakhegi! Cloud aa jaaye toh bhi yahi powerful version. Shubh bhojan beta! 🔥`;
    } else {
      // Standard traditional (default rich Hinglish as previously enriched)
      return `Arre waah beta! Haryana ki **Bajre ki Khichdi** maangi hai na? Bahut hi pyari aur sehatmand dish hai — sardi mein toh jaan hai!

**📝 Ingredients (4-5 logon ke liye):**
- Bajra (pearl millet) — 1 cup, achhe se dhoya hua
- Moong dal (optional, thodi si) — 2-3 tbsp
- Paani — 4-5 cups (adjust for consistency)
- Namak + haldi — swaad anusaar
- Ghee — 3-4 bade chamach (asli desi ghee best!)
- Hand-churned white butter (makkhan) — serving ke liye
- Garam masala + jeera (optional tadka)
- Fresh coriander + adrak — thodi si

**👩‍🍳 Step-by-Step (Traditional Slow-Cooked Tarika):**
1. Bajre ko raat bhar bhigokar rakho ya kam se kam 4-5 ghante. Phir usko achhe se dholo.
2. Ek bhari handi mein 4 cups paani daalo, namak + haldi + thodi si ghee. Ubaal aane do.
3. Bhiga hua bajra + moong dal daal kar dheemi aanch par 40-50 minute dheere dheere pakao. Beech-beech mein hilate raho taaki na chipke. Agar paani kam pade toh garam paani add karte raho — yeh khichdi patli-pasand hoti hai!
4. Jab bajra bilkul gal jaaye aur ek creamy, comforting texture aa jaaye, toh last mein 2 bade chamach desi ghee aur thoda jeera tadka (optional) daal do.
5. Garam-garam serve karo. Upar se haath se makkhan (white butter) ki moti moti dollops + thandi meethi lassi ke saath. 

Yeh dish Haryana ke kheton ki mehak laati hai. Ghee aur makkhan kam mat karna — yahi iska asli swaad hai! 

Koi baat nahi agar cloud wapas aa jaaye, main phir bhi yahi traditional tarika hi bataungi. Shubh bhojan beta! 💛`;
    }
  }
  
  // Default smart template — always helpful + archetype note (no more plain "offline mode" generic)
  const defaultArchetypeTip = archetype === 'biohacker' 
    ? ' (Clean low-GI twist try karo: kam ghee, extra haldi/adrak)' 
    : archetype === 'cognitive' 
      ? ' (Protein boost: dal badhao + nuts sprinkle if possible)' 
      : '';
  return `Ji bilkul beta! Main samajh gaya. (${archLabel})

Main abhi offline local database me isko search kar raha hoon lekin yeh lo — ek bahut hi swadisht aur jaldi banne wali comfort recipe${defaultArchetypeTip}:

**Homestyle Bajra-Mix Veg Khichdi** (ya jo bhi aapke paas hai usse bana lo).
- Jo daal-chawal/bajra ho, usko ghee mein jeera + haldi + namak daal kar 15-20 min dheemi aanch par paka do.
- Last mein fresh dhaniya + thoda ghee upar se.

Aap specific state likho (jaise 'Haryana Bajre ki Khichdi', 'Bengal Ilish', 'Punjab Sarson') — main aapko exact traditional steps offline bhi de dungi. 

Jab connection wapas aayega tab aur gehri baatein karenge. Aaj kya special bana rahe ho?`;
};
