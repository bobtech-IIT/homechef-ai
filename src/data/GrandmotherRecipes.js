/**
 * 🍛 HomeChef AI v2 - Heirloom Grandmother Recipe Database
 * Contains authentic, traditional, lesser-known Indian regional recipes.
 * All recipes are structured for home cooking with basic kitchen infrastructure.
 */

export const GRANDMOTHER_RECIPES = [
  // --- GUJARAT (Strictly Vegetarian) ---
  {
    id: "guj_001",
    name: "Undhiyu",
    region: "Gujarat",
    category: "grandmother",
    description: "A slow-cooked winter vegetable casserole featuring raw bananas, purple yam, and fenugreek dumplings (methi muthia) steamed to perfection.",
    ingredients: [
      "Raw banana (2, cubed)",
      "Purple yam/suran (200g, cubed)",
      "Baby brinjal (8-10, slit)",
      "Flat beans/valor papdi (200g)",
      "Fresh green garlic paste (2 tbsp)",
      "Fresh coriander (1 cup, chopped)",
      "Grated coconut (4 tbsp)",
      "Whole wheat flour (1 cup for muthia)",
      "Methi/Fenugreek leaves (1 cup for muthia)"
    ],
    steps: [
      "Prepare methi muthia: Combine chopped methi, wheat flour, spices, a pinch of soda, and water. Shape into small dumplings and fry till golden.",
      "Masala Paste: Grind fresh coriander, green garlic paste, coconut, sesame seeds, ginger, and green chilies.",
      "Stuff the baby brinjals and slit potatoes with a portion of the masala paste.",
      "In a heavy-bottomed pan, heat oil, add carom seeds (ajwain), flat beans, and all remaining chopped root vegetables.",
      "Add the stuffed vegetables and gently lay the fried muthias on top.",
      "Cover tightly and slow-cook on low flame for 45 minutes without stirring. Let the steam do the work."
    ],
    cookTime: "75 mins",
    difficulty: "Hard",
    tags: ["vegetarian", "winter", "festive", "traditional"],
    isVegetarian: true,
    story: "Undhiyu gets its name from 'Undhu', meaning upside down. Traditionally, it was cooked underground in clay pots turned upside down with charcoal on top."
  },
  {
    id: "guj_002",
    name: "Dal Dhokli",
    region: "Gujarat",
    category: "grandmother",
    description: "Spiced whole-wheat ribbon pasta simmered inside a sweet, sour, and spicy cooked arhar dal soup.",
    ingredients: [
      "Arhar/Toor Dal (1 cup)",
      "Whole wheat flour (1 cup)",
      "Peanuts (2 tbsp)",
      "Jaggery/Gud (2 tbsp)",
      "Kokum (4 pieces)",
      "Mustard seeds, Hing, curry leaves",
      "Kashmiri red chili, turmeric, salt"
    ],
    steps: [
      "Pressure cook arhar dal with peanuts until completely mushy. Whisk thoroughly.",
      "Prepare the dough: Knead whole wheat flour, turmeric, chili powder, ajwain, salt, and oil into a firm dough. Roll into large thin rotis and cut into diamond shapes (dhoklis).",
      "Bring the whisked dal to a boil. Add jaggery, kokum, ginger paste, red chili powder, and salt.",
      "Gently slide the raw wheat diamonds one by one into the boiling dal.",
      "Simmer on low-medium flame for 15 minutes, stirring occasionally to prevent sticking.",
      "Heat ghee, temper with mustard seeds, cumin, curry leaves, and Hing. Pour over the dal. Serve hot."
    ],
    cookTime: "40 mins",
    difficulty: "Medium",
    tags: ["vegetarian", "comfort food", "sweet & sour", "staple"],
    isVegetarian: true,
    story: "Considered the ultimate one-pot meal in Gujarati households, combining protein and carbohydrates seamlessly."
  },

  // --- PUNJAB ---
  {
    id: "pun_001",
    name: "Maa Ki Dal (Slow Cooked Black Lentils)",
    region: "Punjab",
    category: "grandmother",
    description: "Traditional whole black gram and red kidney beans simmered overnight on slow coals, creamed with fresh homemade white butter.",
    ingredients: [
      "Whole Black Urad Dal (1 cup)",
      "Rajma/Red Kidney Beans (1/4 cup)",
      "Tomatoes (3, finely chopped)",
      "Onion (1, finely chopped)",
      "Ginger-garlic paste (2 tbsp)",
      "Fresh cream/Malai (4 tbsp)",
      "White Butter/Makhan (3 tbsp)",
      "Kashmiri chili powder, garam masala"
    ],
    steps: [
      "Soak urad dal and rajma overnight. Pressure cook with salt and ginger for 6 whistles till soft.",
      "Heat ghee in a heavy pot. Sauté onions and ginger-garlic paste till dark golden brown.",
      "Add chopped tomatoes and cook until oil separates. Stir in red chili powder.",
      "Pour in the boiled dal. Use a potato masher to mash the dal slightly against the sides of the pot.",
      "Pour 1 cup hot water and simmer on a very low flame for 40 minutes, stirring frequently to build creaminess naturally.",
      "Stir in malai, garam masala, and top with fresh white butter before serving."
    ],
    cookTime: "60 mins",
    difficulty: "Medium",
    tags: ["rich", "comfort food", "slow-cooked", "traditional"],
    isVegetarian: true,
    story: "Unlike restaurant 'Dal Makhani' which uses canned purees and charcoal smoke, authentic Punjabi 'Maa Ki Dal' gets its creamy texture solely from slow simmering."
  },

  // --- MAHARASHTRA ---
  {
    id: "mah_001",
    name: "Pithla Bhakri",
    region: "Maharashtra",
    category: "grandmother",
    description: "A fast, rustic gram flour porridge seasoned with green garlic, served with toasted flatbread made of pearl millet (bajra).",
    ingredients: [
      "Besan/Gram flour (1/2 cup)",
      "Green garlic or garlic cloves (6-8)",
      "Green chilies (3, crushed)",
      "Onion (1, chopped)",
      "Mustard seeds, Hing, turmeric",
      "Bajra flour (1 cup for Bhakri)",
      "Sesame seeds (1 tsp)"
    ],
    steps: [
      "Whisk besan with 2 cups of water, salt, and turmeric till lump-free.",
      "Heat oil. Add mustard seeds, Hing, chopped onion, and crushed garlic-green chili paste. Sauté well.",
      "Pour the besan mixture into the pan. Stir continuously as it thickens.",
      "Cover and steam on low flame for 8 minutes till fully cooked and shiny.",
      "Bhakri: Knead bajra flour with warm water. Pat it down with hands on a board into a round flatbread.",
      "Toasted bajra bhakri on a clay tawa, applying water on top. Serve with hot pithla and raw onion."
    ],
    cookTime: "30 mins",
    difficulty: "Medium",
    tags: ["vegetarian", "rustic", "high-protein", "farmhouse"],
    isVegetarian: true,
    story: "Known as the poor man's feast in rural Maharashtra, this dish was cooked in fields using fresh spring garlic."
  },

  // --- BENGAL ---
  {
    id: "ben_001",
    name: "Thakuma's Shorshe Bata Maach",
    region: "Bengal",
    category: "grandmother",
    description: "Tender Rohu or Hilsa fish steaks simmered in a sharp, pungent, and velvety yellow mustard paste gravy.",
    ingredients: [
      "Fish steaks/Rohu or Katla (4 pieces)",
      "Black mustard seeds (2 tbsp)",
      "Yellow mustard seeds (1 tbsp)",
      "Mustard oil (4 tbsp)",
      "Green chilies (6, slit)",
      "Kalonji/Nigella seeds (1/2 tsp)",
      "Turmeric, salt"
    ],
    steps: [
      "Marinate fish with turmeric and salt. Shallow fry in hot mustard oil till light golden. Set aside.",
      "Grind the mustard seeds with 2 green chilies, salt, and a splash of water into a very smooth, fine paste.",
      "Heat remaining mustard oil. Temper with kalonji and slit green chilies.",
      "Lower the heat. Add mustard paste, a pinch of turmeric, and 1 cup of water. Bring to a gentle boil.",
      "Slide in the fried fish. Simmer covered for 6 minutes till the fish absorbs the mustard pungency.",
      "Drizzle 1 tablespoon of raw mustard oil on top, cover, and let it rest for 2 minutes before serving."
    ],
    cookTime: "25 mins",
    difficulty: "Medium",
    tags: ["non-vegetarian", "fish", "pungent", "delicacy"],
    isVegetarian: false,
    story: "The secret to a non-bitter mustard gravy is grinding the mustard seeds with a pinch of salt and green chili."
  },

  // --- TAMIL NADU ---
  {
    id: "tam_001",
    name: "Kalyana Karamani Kara Kuzhambu",
    region: "Tamil Nadu",
    category: "grandmother",
    description: "A tangy, deeply spiced tamarind-based curry featuring black-eyed peas and country vegetables like small onions and drumsticks.",
    ingredients: [
      "Black-eyed peas/Karamani (1/2 cup, soaked)",
      "Tamarind pulp (gooseberry sized)",
      "Sambar powder (2 tbsp)",
      "Shallots/Small onions (15, peeled)",
      "Drumstick (1, cut into pieces)",
      "Sesame oil/Gingelly oil (3 tbsp)",
      "Mustard, fenugreek seeds, curry leaves"
    ],
    steps: [
      "Boil the karamani (black-eyed peas) until tender. Set aside.",
      "Heat sesame oil in a clay pot. Add mustard seeds, fenugreek seeds, and curry leaves.",
      "Add shallots and garlic cloves. Sauté till translucent, then add drumstick pieces.",
      "Pour in tamarind water, sambar powder, turmeric, and salt. Bring to a boil.",
      "Add the boiled peas. Simmer on low flame for 15 minutes till raw tamarind smell disappears and oil separates on top.",
      "Finish with a tiny piece of jaggery to round out the tanginess. Serve with hot rice and ghee."
    ],
    cookTime: "35 mins",
    difficulty: "Easy",
    tags: ["vegetarian", "tangy", "spicy", "clay-pot"],
    isVegetarian: true,
    story: "Traditionally cooked in 'Man Satti' (clay pots) which gives the gravy an alkaline, earthy balance."
  },

  // --- KERALA ---
  {
    id: "ker_001",
    name: "Ulli Theeyal",
    region: "Kerala",
    category: "grandmother",
    description: "Roasted shallots cooked in a rich, dark brown toasted coconut gravy that balances sweet, tangy, and spicy notes.",
    ingredients: [
      "Shallots/Ulli (20, peeled and halved)",
      "Grated coconut (1 cup)",
      "Tamarind paste (1 tbsp)",
      "Coriander seeds (1 tbsp)",
      "Dry red chilies (4)",
      "Coconut oil (3 tbsp)",
      "Curry leaves, mustard seeds"
    ],
    steps: [
      "In a dry pan, slow-roast grated coconut, coriander seeds, and red chilies until the coconut turns a rich, dark chocolate brown. Grind to a completely smooth, warm paste without water (varutharacha paste).",
      "Heat coconut oil in a pan. Splutter mustard seeds and curry leaves.",
      "Sauté shallots till sweet and golden brown.",
      "Pour in tamarind juice, turmeric, salt, and bring to a simmer.",
      "Stir in the dark roasted coconut paste and cook on low heat for 10 minutes until oil floats on top.",
      "Turn off flame and let it sit. The flavors deepen significantly as it cools."
    ],
    cookTime: "30 mins",
    difficulty: "Medium",
    tags: ["vegetarian", "roasted-coconut", "tangy", "traditional"],
    isVegetarian: true,
    story: "'Theeyal' translates to 'burnt dish' referring to the roasted dark brown color of the coconut paste which must never actually burn but toasted to perfection."
  },

  // --- REST OF INDIA ---
  {
    id: "roi_001",
    name: "Grandma's Special Dal Baati Churma",
    region: "Rest of India",
    category: "grandmother",
    description: "A legendary trio of baked whole-wheat flour rounds (Baati), rich five-lentil stew (Panchmel Dal), and sweet powdered wheat crumble (Churma).",
    ingredients: [
      "Whole wheat flour (2 cups for Baati)",
      "Semolina/Suji (1/2 cup)",
      "Mixed dals - Chana, Toor, Moong, Masoor, Urad (1 cup total)",
      "Ghee (1/2 cup, generous)",
      "Powdered sugar (1/2 cup for Churma)",
      "Cardamom powder, almonds",
      "Spices: cumin, Hing, green chili, ginger"
    ],
    steps: [
      "Baati: Mix wheat flour, suji, ghee, salt, and warm water. Knead into a very tight dough. Shape into small round balls with an indentation in the center.",
      "Bake the baatis on low-medium flame in an oven or gas tandoor until golden brown and cracked. Once baked, immerse them fully in hot melted ghee.",
      "Dal: Pressure cook mixed lentils. Prepare a spicy tempering with ghee, cumin, Hing, ginger-chili paste, tomatoes, and red chili. Simmer cooked dal with tempering.",
      "Churma: Crush 2 hot baked baatis into fine powder. Sauté with ghee, mix with powdered sugar, cardamom, and chopped almonds."
    ],
    cookTime: "60 mins",
    difficulty: "Hard",
    tags: ["vegetarian", "festive", "traditional", "royal"],
    isVegetarian: true,
    story: "Originating in the arid sands of Rajasthan, Baatis were buried under sand dunes during battles to slow-bake in the hot desert sun."
  },
  
  // --- ODISHA (Oriya Heirloom) ---
  {
    id: "ori_001",
    name: "Aparna's Odia Dalma",
    region: "Odisha",
    category: "grandmother",
    description: "The crown jewel of Odisha - split yellow peas and native country vegetables slow-cooked in a clay pot, tempered with pure ghee, whole spices, and roasted bhaja masala.",
    ingredients: [
      "Toor dal / Harada dal (1 cup)",
      "Raw papaya (1 cup, cubed)",
      "Pumpkin / Kakharu (1 cup, cubed)",
      "Yam / Mati Alu (1/2 cup)",
      "Drumstick / Sajana Chhuin (2, cut)",
      "Raw plantain / Kacha Kala (1)",
      "Grated coconut (1/2 cup)",
      "Ghee (2 tbsp)",
      "Panch phutana (1 tsp)",
      "Roasted bhaja masala powder (roasted cumin and red chili powder) (2 tsp)"
    ],
    steps: [
      "Wash dal and parboil it in a deep pot with turmeric, salt, grated ginger, and bay leaves.",
      "Add cubed raw papaya, yam, and plantain. Let it cook for 10 minutes.",
      "Add pumpkin and drumstick pieces, simmer on medium flame until all vegetables and lentils are tender and mushy.",
      "Stir in freshly grated coconut.",
      "Heat ghee in a pan. Splutter panch phutana and dry red chilies. Pour this tempering (chhunka) instantly into the boiling Dalma.",
      "Sprinkle the freshly ground roasted bhaja masala on top, cover tightly, and let the flavors meld before serving."
    ],
    cookTime: "35 mins",
    difficulty: "Easy",
    tags: ["vegetarian", "healthy", "heirloom", "staple"],
    isVegetarian: true,
    story: "Dalma is served daily at the Jagannath Temple in Puri as part of Mahaprasad. It is a completely oil-free, highly nutritious staple of Oriya culture."
  },
  {
    id: "ori_002",
    name: "Thakuma's Machha Besara",
    region: "Odisha",
    category: "grandmother",
    description: "Crispy fried Rohu steaks simmered in a sharp mustard and garlic paste gravy, soured traditionally with dried raw mango slices (ambula).",
    ingredients: [
      "Rohu or Katla fish (4 steaks)",
      "Mustard seeds (2 tbsp)",
      "Cumin seeds (1 tsp)",
      "Garlic cloves (8-10)",
      "Mustard oil (4 tbsp)",
      "Dry raw mango / Ambula (2 pieces, soaked)",
      "Green chilies (3, slit)",
      "Panch phutana (1/2 tsp)",
      "Turmeric, salt"
    ],
    steps: [
      "Marinate fish steaks with salt and turmeric. Shallow fry in mustard oil until crisp and golden brown. Set aside.",
      "Grind mustard seeds, cumin seeds, garlic cloves, and 1 green chili into a velvety smooth mustard paste (Besara).",
      "Heat remaining mustard oil. Temper with panch phutana, curry leaves, and green chilies.",
      "Add turmeric, dilute the mustard paste in 1.5 cups of water, and pour it into the pan. Bring to a gentle boil.",
      "Add the soaked raw mango slices (ambula) to provide the traditional tangy depth.",
      "Gently slide in the fried fish. Simmer on low heat for 8 minutes. Drizzle a spoon of raw mustard oil on top and serve hot."
    ],
    cookTime: "30 mins",
    difficulty: "Medium",
    tags: ["non-vegetarian", "fish", "mustard", "traditional"],
    isVegetarian: false,
    story: "Besara is the unique mustard paste technique of Odisha, combining mustard and garlic to create a sharp flavor distinct from Bengali mustard gravy."
  },
  {
    id: "ori_003",
    name: "Baked Chhena Poda",
    region: "Odisha",
    category: "grandmother",
    description: "The legendary sweet cheese cake of Odisha - fresh cottage cheese kneaded with sugar, cardamom, and cashew nuts, then slow-baked to form a caramelized crust.",
    ingredients: [
      "Fresh Chhena / Paneer (made from cow milk) (500g)",
      "Semolina / Suji (3 tbsp)",
      "Sugar (1 cup)",
      "Cardamom powder (1 tsp)",
      "Cashew nuts and raisins (1/4 cup)",
      "Ghee (2 tbsp)"
    ],
    steps: [
      "Crumble fresh, warm chhena thoroughly using your palms until it becomes completely smooth and light.",
      "Add suji, sugar, cardamom powder, and melted ghee. Knead gently for 10 minutes until sugar dissolves and a batter-like consistency is formed.",
      "Fold in roasted cashew nuts and raisins.",
      "Grease a baking tin with ghee, line it traditionally with sal leaves (or parchment paper), and pour the chhena mixture.",
      "Bake in a preheated oven at 180°C (350°F) for 45 minutes until the top turns deep golden brown and a rich caramelized sugar crust forms.",
      "Let it cool completely, slice, and serve. The flavor is best enjoyed at room temperature."
    ],
    cookTime: "55 mins",
    difficulty: "Hard",
    tags: ["vegetarian", "dessert", "caramel", "delicacy"],
    isVegetarian: true,
    story: "Chhena Poda literally translates to 'Burnt Cheese'. It originated in Nayagarh, Odisha in the early 20th century by sweetmaker Sudarsan Sahu."
  },
  {
    id: "ori_004",
    name: "Chungudi Malai Tarkari",
    region: "Odisha",
    category: "grandmother",
    description: "Sweet freshwater prawns simmered in a mildly spiced, luxurious coconut cream and onion gravy.",
    ingredients: [
      "Freshwater prawns (300g, cleaned)",
      "Grated coconut (1 cup, to extract thick milk)",
      "Onion (2, finely chopped)",
      "Ginger-garlic paste (1 tbsp)",
      "Mustard oil (3 tbsp)",
      "Garam masala (1 tsp)",
      "Bay leaf, cinnamon, green cardamom"
    ],
    steps: [
      "Extract thick coconut milk by grinding grated coconut with warm water and pressing it through a sieve.",
      "Marinate prawns with salt and turmeric. Sauté in mustard oil for just 2 minutes until pink. Set aside.",
      "In the same oil, add whole garam masala (cardamom, cinnamon, bay leaf). Sauté chopped onions till golden brown.",
      "Add ginger-garlic paste and spices, cook until oil separates.",
      "Pour in the fresh coconut milk, bring to a gentle boil, and slide in the prawns.",
      "Simmer covered on low flame for 6 minutes until prawns are tender and gravy is velvety. Serve with steamed rice."
    ],
    cookTime: "25 mins",
    difficulty: "Medium",
    tags: ["non-vegetarian", "seafood", "coconut", "creamy"],
    isVegetarian: false,
    story: "Often prepared during festive celebrations in coastal Odisha districts, showcasing the abundance of fresh delta prawns."
  },
  
  // --- BANGLADESH (East Bengal Heirloom) ---
  {
    id: "bgd_001",
    name: "Dhakai Kacchi Biryani",
    region: "Bangladesh",
    category: "grandmother",
    description: "The pride of Old Dhaka - raw, tender mutton steaks layered with fragrant chinigura or basmati rice, flavored with saffron, yogurt, and pure ghee, slow-cooked in a dough-sealed copper pot.",
    ingredients: [
      "Mutton raw steaks (500g)",
      "Chinigura or Basmati Rice (2.5 cups)",
      "Yogurt (1/2 cup)",
      "Ginger-garlic paste (2 tbsp)",
      "Kacchi Biryani Masala (mace, nutmeg, cardamom, cinnamon) (2 tbsp)",
      "Ghee (4 tbsp)",
      "Saffron soaked in warm milk (1/2 tsp)",
      "Boiled baby potatoes (6, fried in ghee)",
      "Mawa powder (2 tbsp)"
    ],
    steps: [
      "Marinate raw mutton directly in the cooking pot with yogurt, ginger-garlic paste, kacchi biryani spices, salt, and half the ghee. Let it sit for 4 hours.",
      "Parboil rice until only 30% cooked. Drain and set aside.",
      "Arrange the fried baby potatoes on top of the marinated mutton layer in the pot.",
      "Spread the parboiled rice evenly over the mutton and potato layers.",
      "Drizzle saffron milk, remaining ghee, and sprinkle mawa powder on top of the rice layer.",
      "Seal the pot lid airtight with a roll of wheat flour dough (atta). Cook on high heat for 10 minutes, then place on a tawa and dum-cook on low heat for 1.5 hours."
    ],
    cookTime: "110 mins",
    difficulty: "Hard",
    tags: ["non-vegetarian", "mutton", "festive", "traditional"],
    isVegetarian: false,
    story: "Kacchi literally means 'raw' - referring to layering raw meat instead of precooked gravy, allowing the meat juices to steam-flavor the rice naturally."
  },
  {
    id: "bgd_002",
    name: "Sylheti Shatkora Beef",
    region: "Bangladesh",
    category: "grandmother",
    description: "A signature aromatic beef curry from Sylhet, slow-cooked in traditional spices with thick chunks of wild bitter orange (Shatkora) that imparts a tangy citrus note.",
    ingredients: [
      "Beef shank or chuck (500g, cubed)",
      "Sylheti Shatkora fruit (1/2, cut into wedges)",
      "Onion (3, sliced)",
      "Ginger-garlic paste (1.5 tbsp)",
      "Mustard oil (4 tbsp)",
      "Spices: turmeric, chili, coriander, garam masala",
      "Green chilies (4, slit)"
    ],
    steps: [
      "Heat mustard oil in a heavy-bottomed pot. Sauté onions till dark golden brown.",
      "Add ginger-garlic paste, whole spices, and dry powdered spices. Cook with a splash of water till oil separates.",
      "Slide in the beef cubes, seal the pot, and cook on medium flame for 30 minutes in its own juices.",
      "Add the Shatkora wedges and slit green chilies. Shatkora wedges should simmer gently to release their unique oils.",
      "Pour 1 cup of hot water, cover, and slow-cook on low heat for another 45 minutes until beef is tender and gravy is dark and thick."
    ],
    cookTime: "85 mins",
    difficulty: "Medium",
    tags: ["non-vegetarian", "beef", "citrusy", "aromatic"],
    isVegetarian: false,
    story: "Shatkora (Citrus macroptera) is a wild citrus fruit native to Sylhet, prized for its aromatic, slightly bitter, and sour peel."
  },

  // --- KOLKATA (West Bengal Heirloom) ---
  {
    id: "kol_001",
    name: "Kolkata Kosha Mangsho",
    region: "Kolkata",
    category: "grandmother",
    description: "A timeless West Bengal delicacy - mutton slow-cooked over hours in a rich, dark brown caramelized onion and yogurt gravy.",
    ingredients: [
      "Mutton (500g, bone-in)",
      "Onions (4, sliced)",
      "Ginger paste (1.5 tbsp)",
      "Garlic paste (1 tbsp)",
      "Yogurt (1/2 cup)",
      "Mustard oil (5 tbsp)",
      "Kolkata garam masala (cardamom, cinnamon, cloves, nutmeg)",
      "Sugar (1 tsp, for caramelization)"
    ],
    steps: [
      "Marinate mutton with yogurt, ginger paste, garlic paste, mustard oil, turmeric, and chili powder for 2 hours.",
      "Heat mustard oil in a deep iron wok (kadai). Add sugar and let it caramelize to a deep brown color.",
      "Add sliced onions and fry on medium heat until dark brown. Add marinated mutton.",
      "Sauté (bhuno/kosha) the meat continuously on medium-low heat. Keep stirring to prevent sticking. If it gets dry, sprinkle a few drops of hot water.",
      "Continue this bhuno process for 45 minutes until the mutton turns a deep, dark brown and the oil completely separates.",
      "Pour 1 cup of hot water, cover tightly, and slow-simmer until mutton is melt-in-mouth tender. Sprinkle garam masala before serving."
    ],
    cookTime: "75 mins",
    difficulty: "Medium",
    tags: ["non-vegetarian", "mutton", "rich", "traditional"],
    isVegetarian: false,
    story: "The iconic dark color of Kosha Mangsho is achieved solely through onion caramelization and slow frying (koshano) in iron woks, without using artificial food colors."
  },
  {
    id: "kol_002",
    name: "Aamma's Daab Chingri",
    region: "Kolkata",
    category: "grandmother",
    description: "Fresh delta prawns mixed with mustard, poppy seed paste, and tender green coconut pulp, cooked inside a sealed green coconut shell.",
    ingredients: [
      "Fresh prawns (300g, de-veined)",
      "Tender green coconut / Daab (1, with thick pulp)",
      "Mustard seeds paste (2 tbsp)",
      "Poppy seeds / Posto paste (1 tbsp)",
      "Mustard oil (2 tbsp)",
      "Green chilies (4, slit)",
      "Atta / Wheat flour dough (for sealing)"
    ],
    steps: [
      "Scrape the tender white coconut pulp gently from inside the daab and grind it to a smooth paste with mustard oil.",
      "Mix prawns with the mustard paste, posto paste, green coconut pulp paste, slit green chilies, turmeric, and salt.",
      "Stuff this mixture back inside the empty green coconut shell.",
      "Place the cut coconut top back as a lid and seal the edges tightly with wheat flour dough (atta) to make it airtight.",
      "Bake the coconut in a preheated oven or slow-cook over charcoal coals for 30 minutes. Let it rest, crack the seal, and serve."
    ],
    cookTime: "40 mins",
    difficulty: "Hard",
    tags: ["non-vegetarian", "seafood", "steamed", "traditional"],
    isVegetarian: false,
    story: "Daab Chingri showcases the delicate flavor profile of West Bengal, steaming the prawns gently inside the coconut shell to absorb the sweet coconut oil."
  }
];
