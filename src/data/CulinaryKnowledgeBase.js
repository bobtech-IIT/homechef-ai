// --- Culinary Knowledge Base: V4 Offline Gastronomical Matrix ---
// Focus states: West Bengal, Punjab, Delhi, Maharashtra, Odisha (Orissa)
// Focus diets: Vegetarian, Non-Vegetarian, Jain Special
// Languages: English, Bengali, Hindi, Hinglish, Oriya

export const CULINARY_KNOWLEDGE_BASE = {
  "West Bengal": {
    "Non-Vegetarian": {
      "Spicy Feast 🌶️": {
        "Lunch/Dinner 🍽️": [
          {
            title: "Bengali Shorshe Maach (Mustard Fish Curry)",
            time: "25 MINS",
            complexity: "MEDIUM",
            tag: "TRADITIONAL FISH",
            ingredients: [
              "Fresh River Fish Steaks (500g, Rohu or Hilsa)",
              "Yellow & Black Mustard Seeds (3 tbsp, soaked)",
              "Mustard Oil (4 tbsp, for pungent aroma)",
              "Turmeric Powder (1 tsp)",
              "Green Chilies (5 split)",
              "Kalonji / Nigella Seeds (1/2 tsp)",
              "Salt to taste"
            ],
            steps: [
              "Clean and pat dry the fish steaks. Marinate with 1/2 tsp turmeric powder and 1 tsp salt for 10 minutes.",
              "Grind the soaked mustard seeds with 2 green chilies and a pinch of salt to a super-smooth paste.",
              "Heat mustard oil in a heavy pan until smoky. Shallow fry the fish steaks lightly on both sides for 2 minutes, then remove and set aside.",
              "In the same hot oil, temper with Kalonji seeds and 2 split green chilies until they splutter.",
              "Mix the mustard paste with 1/2 cup warm water, pour it into the pan, and bring to a gentle simmer on low heat.",
              "Slide in the fried fish steaks, cover, and simmer for 5-6 minutes until the pungent gravy thickens.",
              "Drizzle 1 tbsp raw mustard oil on top, add the remaining split green chilies, cover, and let it rest for 2 minutes before serving."
            ],
            chatResponse: {
              "English": "Here is your authentic Bengali Shorshe Maach! It is a spicy, pungent mustard fish curry perfect with hot steamed Basmati rice.",
              "Bengali": "Aha, aponar jonne Shorshe Maach ready! Gorom bhater sathe eita sheerah lagbe. Ekbar kheye dekhun!",
              "Hindi": "Aapke liye swadisht Bengali Mustard Fish Curry taiyar hai! Sarso aur hari mirch ke masaledar flavor ke saath ise garam chawal ke saath parosein.",
              "Hinglish": "Bengali style Shorshe Maach ready hai! Garam rice ke saath iska spicy aur pungent flavor bilkul zabardast lagta hai.",
              "Oriya": "Apana nka pain tasty Odisha-style Shorshe Machha prastuta karichi! Garam bhata sahita eha bahut bhala lagiba."
            }
          },
          {
            title: "Kosha Mangsho (Bengali Slow-Cooked Mutton)",
            time: "50 MINS",
            complexity: "ELABORATE",
            tag: "CHEF SPECIAL",
            ingredients: [
              "Goat Mutton (500g, cubed)",
              "Onions (3, finely sliced)",
              "Ginger-Garlic Paste (2 tbsp)",
              "Mustard Oil (4 tbsp)",
              "Yogurt (1/2 cup)",
              "Spices: Turmeric, Kashmiri chili, Bengali Garam Masala",
              "Potatoes (2, halved)"
            ],
            steps: [
              "Marinate mutton with yogurt, mustard oil, ginger-garlic paste, and spices for 1 hour.",
              "Heat mustard oil in a deep kadhai until smoking hot. Sauté sliced onions slowly until dark caramelized brown.",
              "Add marinated mutton and sauté (Bhuno/Kashano) on medium-high heat for 20 minutes until oil separates.",
              "Pour in 2 cups of warm water, add potato halves, and cover. Slow cook or pressure cook for 5 whistles until meat is fork-tender.",
              "Reduce the gravy on high heat until it thickens into a rich, dark brown coat over the mutton.",
              "Sprinkle fresh home-ground Bengali garam masala and a drizzle of raw ghee before serving with soft luchis or paratha."
            ],
            chatResponse: {
              "English": "Enjoy this rich, dark Kosha Mangsho! Slowly cooked to perfection for a melt-in-the-mouth texture.",
              "Bengali": "Aponar jonne khub bhalo Kosha Mangsho ready korechi! Gorom luchi ba ruti diye khub sundor lagbe.",
              "Hindi": "Swadisht aur rich Kosha Mangsho taiyar hai! Dheemi aanch par pakaya gaya naram mutton jo muh me ghul jaye.",
              "Hinglish": "Rich aur spicy Kosha Mangsho ready hai! Iska dark caramelized flavor aur soft cooked mutton bilkul chef special hai.",
              "Oriya": "Apana nka pain tasty Mutton Kasa ready karichi! Luchi ba roti sahita eha khub swadist lagiba."
            }
          }
        ],
        "Breakfast/Snacks ☕": [
          {
            title: "Egg Kathi Roll (Kolkata Street Style)",
            time: "15 MINS",
            complexity: "EASY",
            tag: "STREET SPECIAL",
            ingredients: [
              "Flour Tortilla / Paratha (2)",
              "Eggs (2)",
              "Onion (1, sliced thin)",
              "Green Chilies (2, chopped)",
              "Lemon juice & Chaat Masala",
              "Mustard Oil (1 tbsp)"
            ],
            steps: [
              "Roll out a thin layered wheat paratha and cook on a tawa until light brown spots appear.",
              "Whisk an egg with salt and green chilies. Pour it over the hot tawa, and press the paratha flat onto the wet egg.",
              "Flip and cook until the egg is completely set and golden brown.",
              "Place the egg-lined paratha on a plate. Lay sliced onions, chopped chilies, chaat masala, and a squeeze of fresh lemon juice down the center.",
              "Roll it tightly in paper and serve immediately with hot tea."
            ],
            chatResponse: {
              "English": "Here is a hot Calcutta Street Style Egg Kathi Roll! Crispy, tangy, and perfect for quick bites.",
              "Bengali": "Gorom gorom Egg Kathi Roll ready! Rasta-style swadisht and spicy.",
              "Hindi": "Masaledar Kolkata style Egg Roll taiyar hai! Shaam ki chai ke saath behad lajawab.",
              "Hinglish": "Kolkata street-style Egg Kathi Roll ready hai! Crispy paratha aur tangy onions ka combo chai ke sath best hai.",
              "Oriya": "Egg Kathi Roll prastuta karichi! Eha khub tasty and crispy achhi."
            }
          }
        ]
      },
      "Light Comfort 🥣": {
        "Lunch/Dinner 🍽️": [
          {
            title: "Homestyle Rui Macher Jhol (Light Fish Curry)",
            time: "25 MINS",
            complexity: "EASY",
            tag: "COMFORT FOOD",
            ingredients: [
              "Rui Fish Steaks (500g)",
              "Potato (1, cut into wedges)",
              "Pointed Gourd / Potol (3, halved)",
              "Mustard Oil (2 tbsp)",
              "Cumin seeds (1/2 tsp)",
              "Turmeric, cumin & coriander powder"
            ],
            steps: [
              "Marinate fish steaks with salt and turmeric for 5 minutes, then shallow fry in mustard oil and set aside.",
              "Lightly fry the potato wedges and pointed gourd halves in the same oil, then drain.",
              "Temper the remaining oil with cumin seeds and split green chilies.",
              "Mix turmeric, cumin, and coriander powders with a splash of water, pour into the pan, and sauté for 2 minutes.",
              "Add 2 cups of warm water, salt, fried vegetables, and bring to a boil.",
              "Slide in the fried fish and simmer on low heat for 10 minutes until vegetables are tender and the gravy is light and flavorful."
            ],
            chatResponse: {
              "English": "Enjoy this comforting, light Rui Macher Jhol! It is easy on the stomach and highly nutritious.",
              "Bengali": "Niramish and halka Rui Macher Jhol ready! Gorom bhat aar lebu diye khele khub aram pabe.",
              "Hindi": "Halka aur paushtik Rui Macher Jhol taiyar hai! Pet ke liye behad comforting aur swadisht.",
              "Hinglish": "Homestyle halka Rui Macher Jhol ready hai! Potatoes aur green chilies ke sath iska light flavor pet ke liye best comfort food hai.",
              "Oriya": "Swadist Machha Jholo ready karichi! Eha bahut light and healthy achhi."
            }
          }
        ],
        "Breakfast/Snacks ☕": [
          {
            title: "Chirer Polao (Bengali Poha)",
            time: "15 MINS",
            complexity: "EASY",
            tag: "LIGHT BREAKFAST",
            ingredients: [
              "Flattened Rice / Poha (2 cups, rinsed)",
              "Green peas & Raisins (1/4 cup)",
              "Ghee (1 tbsp)",
              "Peanuts (2 tbsp, roasted)",
              "Turmeric & Sugar to taste"
            ],
            steps: [
              "Rinse flattened rice in a colander and spread it out to dry for 10 minutes to keep it fluffy.",
              "Heat ghee in a pan, fry peanuts until crunchy, then set aside.",
              "In the same ghee, add mustard seeds, curry leaves, green peas, and raisins. Sauté for 2 minutes.",
              "Add turmeric powder, salt, a pinch of sugar, and slide in the fluffy poha.",
              "Toss gently on low heat for 5 minutes, garnish with fried peanuts, and serve warm."
            ],
            chatResponse: {
              "English": "A light and sweetish Chirer Polao is ready for breakfast! Highly energetic and easy to digest.",
              "Bengali": "Halka o gorom Chirer Polao ready! Sakaler jolkhabare eita darun hobe.",
              "Hindi": "Halka aur thoda meetha Chirer Polao taiyar hai! Subah ke nashte ke liye ekdum light aur healthy.",
              "Hinglish": "Bengali style Chirer Polao ready hai! Thoda sweet and savory flavour, peanuts aur raisins ke sath breakfast ke liye perfect comfort food hai.",
              "Oriya": "Chuda Upma / Polao prastuta karichi! Eha khub light and tasty breakfast achhi."
            }
          }
        ]
      }
    },
    "Vegetarian": {
      "Spicy Feast 🌶️": {
        "Lunch/Dinner 🍽️": [
          {
            title: "Bengali Dhokar Dalna (Lentil Cake Curry)",
            time: "35 MINS",
            complexity: "MEDIUM",
            tag: "FESTIVE VEG",
            ingredients: [
              "Chana Dal (1 cup, soaked and ground)",
              "Ginger paste (1 tbsp)",
              "Tomato puree (1/2 cup)",
              "Mustard Oil (3 tbsp)",
              "Bengali Garam Masala (1 tsp)",
              "Cumin & Hing (Asafoetida)"
            ],
            steps: [
              "Sauté the ground chana dal paste in a pan with cumin, ginger, and a pinch of Hing until it leaves the sides.",
              "Spread the warm paste onto a greased plate, level it to 1/2 inch thickness, and let it cool completely.",
              "Cut into diamond shapes (Dhokas) and deep-fry or shallow-fry in hot oil until golden brown.",
              "For the gravy: Heat oil, temper with cumin seeds and a bay leaf. Add ginger paste, tomato puree, and basic spices, cooking until oil separates.",
              "Add 1.5 cups of warm water, salt, a pinch of sugar, and slide in the fried lentil cakes.",
              "Simmer for 5 minutes until the cakes absorb the rich, spiced gravy. Sprinkle garam masala and serve hot."
            ],
            chatResponse: {
              "English": "Here is the royal Bengali Dhokar Dalna! Spiced lentil cakes simmered in a rich ginger-cumin gravy.",
              "Bengali": "Niramish diner shobcheye bhalo Dhokar Dalna ready! Luchi ba gorom bhater sathe kheye dekhun.",
              "Hindi": "Swadisht Dhokar Dalna taiyar hai! Masaledar dal ki tikkiyon ko rich ginger-cumin tamatar gravy me pakaya gaya hai.",
              "Hinglish": "Authentic Dhokar Dalna ready hai! Fried lentil cakes ko rich tomato-cumin gravy me simmer kiya gaya hai. Roti ya rice ke sath best festive veg meal hai.",
              "Oriya": "Tasty Dhokar Dalna prastuta karichi! Swadist lentil gravy sahita roti bhala lagiba."
            }
          }
        ],
        "Breakfast/Snacks ☕": [
          {
            title: "Luchi & Alur Dom (Puris & Potato Gravy)",
            time: "30 MINS",
            complexity: "MEDIUM",
            tag: "BENGALI CLASSIC",
            ingredients: [
              "Refined Flour / Maida (2 cups)",
              "Ghee (for deep frying)",
              "Boiled Potatoes (4-5, cubed)",
              "Ginger-Tomato Paste (3 tbsp)",
              "Bengali Garam Masala (1 tsp)"
            ],
            steps: [
              "Knead flour with salt, 2 tbsp ghee, and warm water into a soft dough. Rest covered for 15 minutes.",
              "Prick boiled potatoes with a fork and shallow fry in a little ghee until golden brown.",
              "Sauté ginger-tomato paste in 1 tbsp ghee with cumin, turmeric, and chili powders until oil separates.",
              "Add potatoes, salt, a pinch of sugar, and 1 cup of water. Simmer covered for 10 minutes until thick.",
              "Roll the dough into small thin rounds and deep-fry in hot ghee until puffed and white.",
              "Serve hot Luchis with the rich, aromatic Alur Dom."
            ],
            chatResponse: {
              "English": "Classic Luchi and Alur Dom is ready! Fluffy white puris with rich potato gravy.",
              "Bengali": "Gheeye bhaja gorom Luchi aar Alur Dom! Sakaler jolkhabar ekdom jome jabe.",
              "Hindi": "Garam Luchi aur swadisht Alur Dom taiyar hai! Subah ka ekdum shaandar nashta.",
              "Hinglish": "Hot puffed Luchi aur spicy Alur Dom ready hai! Subah ke breakfast ke liye isse badiya aur tasty treat ho hi nahi sakti.",
              "Oriya": "Luchi sahita Aloo Dum ready karichi! Garam garam khub swadist lagiba."
            }
          }
        ]
      },
      "Light Comfort 🥣": {
        "Lunch/Dinner 🍽️": [
          {
            title: "Comforting Aloo Posto & Biulir Dal",
            time: "25 MINS",
            complexity: "EASY",
            tag: "HOMESTYLE COMFORT",
            ingredients: [
              "Potatoes (3, cut into small cubes)",
              "Poppy Seeds / Posto (4 tbsp, ground to smooth paste)",
              "Mustard Oil (2 tbsp)",
              "Kalonji / Nigella seeds (1/2 tsp)",
              "Green Chilies (4, split)",
              "Salt to taste"
            ],
            steps: [
              "Soak poppy seeds (Posto) in warm water for 20 minutes, then grind with 2 green chilies into a thick, smooth paste.",
              "Heat mustard oil in a pan until smoking. Temper with Kalonji and split green chilies.",
              "Add cubed potatoes and sauté on medium heat for 5 minutes until the edges are golden.",
              "Add salt and 1/2 cup of water. Cover and cook on low heat until potatoes are 90% tender.",
              "Pour in the posto paste, stir well to coat, and cook on low flame for 3 minutes.",
              "Drizzle 1 tsp raw mustard oil on top, turn off the heat, cover, and let steam for 2 minutes before serving."
            ],
            chatResponse: {
              "English": "Here is the ultimate Bengali comfort food: Aloo Posto! Potato cubes cooked in a rich, nutty poppy seed paste.",
              "Bengali": "Gorom bhat aar Aloo Posto! Niramish o halka khabarer moddhe eita sera.",
              "Hindi": "Comforting Aloo Posto taiyar hai! Halka aur behad swadisht poppy seed paste potato curry.",
              "Hinglish": "Garam rice ke sath Aloo Posto ready hai! Poppy seed (Khas Khas) paste me cooked potatoes ka creamy, nutty taste sabka favorite hai.",
              "Oriya": "Aloo Posto prastuta karichi! Gobindobhog bhata sahita eha amruta tulya lagiba."
            }
          }
        ],
        "Breakfast/Snacks ☕": [
          {
            title: "Suji Halwa & Puffed Luchis",
            time: "20 MINS",
            complexity: "EASY",
            tag: "SIMPLE SWEET",
            ingredients: [
              "Semolina / Suji (1 cup)",
              "Sugar (1/2 cup)",
              "Ghee (3 tbsp)",
              "Cardamom Powder (1/2 tsp)",
              "Flour for Luchis"
            ],
            steps: [
              "Roast semolina (Suji) dry in a pan until fragrant and light golden, then remove.",
              "Melt ghee in the pan, return the Suji, and sauté for 2 minutes on low flame.",
              "Pour in 2 cups of warm water mixed with sugar and cardamom powder. Stir continuously to prevent lumps.",
              "Cook on medium-low heat until the halwa thickens and leaves the sides of the pan.",
              "Roll dough and deep-fry a few soft white luchis to pair with the sweet warm halwa."
            ],
            chatResponse: {
              "English": "Sweet Suji Halwa and puffed Luchis are ready! A classic, comforting Sunday breakfast combo.",
              "Bengali": "Gorom Suji o Luchi ready! Mukh-mishti jolkhabarer shobcheye sahaj choice.",
              "Hindi": "Garam Suji ka Halwa aur naram Luchi taiyar hai! Subah ke nashte me meetha aur namkeen ka perfect mel.",
              "Hinglish": "Suji Halwa aur Luchi combo ready hai! Ghee me roasted sweet halwa aur soft puffed puris ka pairing breakfast ko perfect bana deta hai.",
              "Oriya": "Suji Halwa o Luchi ready karichi! Sakala jolkhaba pain eha khub swadist achhi."
            }
          }
        ]
      }
    },
    "Jain Special": {
      "Spicy Feast 🌶️": {
        "Lunch/Dinner 🍽️": [
          {
            title: "Jain Chanar Dalna (No Onion/Garlic Cottage Cheese)",
            time: "30 MINS",
            complexity: "MEDIUM",
            tag: "JAIN SPECIAL",
            ingredients: [
              "Homemade Cottage Cheese / Paneer (200g, cubed)",
              "Tomato Puree (1/2 cup)",
              "Fennel Powder / Saunf (1/2 tsp)",
              "Ghee (2 tbsp)",
              "Spices: Turmeric, cumin, red chili, garam masala",
              "Hing (a pinch)"
            ],
            steps: [
              "Lightly pan-fry the paneer cubes in 1 tsp ghee until light golden-brown, then soak in warm salt water to keep soft.",
              "Heat remaining ghee in a pan. Temper with cumin seeds, a bay leaf, and a pinch of Hing.",
              "Add tomato puree and spices, cooking on medium-low heat until the ghee separates.",
              "Stir in turmeric, red chili, fennel, and cumin powders along with salt.",
              "Add 1 cup of warm water, bring to a gentle boil, and slide in the soft paneer cubes.",
              "Simmer covered for 8 minutes until the gravy thickens. Garnish with chopped coriander and serve warm with phulkas."
            ],
            chatResponse: {
              "English": "Enjoy this rich Jain Chanar Dalna! Prepared carefully without onion, garlic, or root vegetables.",
              "Bengali": "Niramish Jain Chanar Dalna ready! Bina peyaj-rosun e ato swadist ranna khele bar bar khete chaiben.",
              "Hindi": "Swadisht Jain Chanar Dalna taiyar hai! Bina pyaaz aur lehsun ke ghee me pakaya gaya naram paneer.",
              "Hinglish": "Jain special Chanar Dalna ready hai! Ghee aur tomato gravy me cooked soft paneer cubes (no onion, no garlic) parantha ke sath best lagte hain.",
              "Oriya": "Jain Chanar Dalna prastuta karichi! Bina piaja-rasuna re eha khub swadist prastuta hoichhi."
            }
          }
        ],
        "Breakfast/Snacks ☕": [
          {
            title: "Jain Radhaballabhi & Cholar Dal",
            time: "25 MINS",
            complexity: "MEDIUM",
            tag: "JAIN FEAST",
            ingredients: [
              "Refined flour (2 cups)",
              "Split Black Gram / Biulir Dal (1/2 cup, soaked and ground)",
              "Bengal Gram / Chana Dal (1 cup)",
              "Ghee (for frying)",
              "Fennel powder, cumin seeds & Hing"
            ],
            steps: [
              "Sauté ground black gram paste with fennel powder and Hing until dry. Let cool to form the stuffing.",
              "Knead flour with salt, warm water, and ghee into a smooth dough.",
              "Stuff small dough balls with the dal stuffing, roll carefully, and deep-fry in hot ghee until puffed.",
              "Boil chana dal with turmeric and salt. Temper with cumin, dry chilies, Hing, and coconut shards in ghee (omit root spices).",
              "Serve hot stuffed Radhaballabhis with sweet coconut Cholar Dal."
            ],
            chatResponse: {
              "English": "A festive Jain breakfast is ready! Stuffed Radhaballabhi with sweet coconut-tempered Cholar Dal.",
              "Bengali": "Jain pochondo moton Radhaballabhi o Cholar Dal ready! Gorom gorom bhalobasa diye banano.",
              "Hindi": "Shaandar Jain Radhaballabhi aur Cholar Dal taiyar hai! Bina pyaaz lehsun ka ekdum shuddh nashta.",
              "Hinglish": "Jain style stuffed Radhaballabhi aur coconut Cholar Dal ready hai! Subah ke breakfast ke liye ekdum high-class shuddh traditional meal.",
              "Oriya": "Radhaballabhi sahita Chana Dal ready karichi! Eha khub swadist o niramish achhi."
            }
          }
        ]
      },
      "Light Comfort 🥣": {
        "Lunch/Dinner 🍽️": [
          {
            title: "Jain Pepe Ghonto (Grated Raw Papaya)",
            time: "20 MINS",
            complexity: "EASY",
            tag: "JAIN LIGHT",
            ingredients: [
              "Raw Papaya (1, peeled and grated)",
              "Tomato (1, chopped)",
              "Ghee (1 tbsp)",
              "Cumin seeds & Hing",
              "Turmeric & Coriander powder",
              "Roasted Peanuts (2 tbsp)"
            ],
            steps: [
              "Heat ghee in a pan. Temper with cumin seeds and a pinch of Hing.",
              "Add grated raw papaya and sauté on medium heat for 3 minutes.",
              "Add chopped tomatoes, salt, turmeric, and coriander powders. Mix well.",
              "Cover and cook on low heat for 12 minutes (no water needed; it cooks in its own steam) until tender.",
              "Stir in roasted crunchy peanuts and fresh coriander leaves before turning off the heat."
            ],
            chatResponse: {
              "English": "Enjoy this light and healthy Jain Pepe Ghonto! Extremely digestible and full of nutrients.",
              "Bengali": "Sastho-kor Pepe Ghonto ready! Gorom ruti ba phulkas er sathe darun hobe.",
              "Hindi": "Halka aur paushtik Jain Pepe Ghonto taiyar hai! Pet ke liye behad light aur healthy sabzi.",
              "Hinglish": "Jain style Pepe Ghonto ready hai! Grated raw papaya ko light ghee aur spices me cook kiya gaya hai. Roti ke sath behad light aur comforting meal hai.",
              "Oriya": "Jain Raw Papaya / Pepe Ghonto ready karichi! Eha khub light o tasty achhi."
            }
          }
        ],
        "Breakfast/Snacks ☕": [
          {
            title: "Jain Suji Upma",
            time: "15 MINS",
            complexity: "EASY",
            tag: "LIGHT DIGESTIBLE",
            ingredients: [
              "Semolina / Suji (1 cup, roasted)",
              "Mustard seeds (1/2 tsp)",
              "Curry leaves (1 sprig)",
              "Peanuts (2 tbsp)",
              "Ghee (1 tbsp)",
              "Salt to taste"
            ],
            steps: [
              "Dry roast semolina (Suji) until fragrant, then transfer to a plate.",
              "Heat ghee in a pan, fry peanuts until crunchy, then add mustard seeds and curry leaves until they splutter.",
              "Pour in 2.5 cups of water, add salt, and bring to a rolling boil.",
              "Gradually add the roasted Suji while stirring constantly to prevent lumps.",
              "Simmer on low heat for 3 minutes until all water is absorbed. Garnish with chopped coriander and serve warm."
            ],
            chatResponse: {
              "English": "A warm, fluffy Jain Suji Upma is ready for breakfast! Light, healthy, and quick to cook.",
              "Bengali": "Gorom gorom Suji Upma ready! Sakaler niramish jolkhabare khub sahaj choice.",
              "Hindi": "Halka aur naram Jain Suji Upma taiyar hai! Subah ke nashte ke liye ekdum light aur digestible.",
              "Hinglish": "Jain style Suji Upma ready hai! Fluffy, low oil and light breakfast option, jo subah pet ko active rakhta hai.",
              "Oriya": "Suji Upma ready karichi! Eha khub light o healthy breakfast achhi."
            }
          }
        ]
      }
    }
  },
  "Punjab": {
    "Non-Vegetarian": {
      "Spicy Feast 🌶️": {
        "Lunch/Dinner 🍽️": [
          {
            title: "Butter Chicken (Amritsari Style)",
            time: "35 MINS",
            complexity: "ELABORATE",
            tag: "PUNJABI FEAST",
            ingredients: [
              "Chicken cubes (500g)",
              "Yogurt (1/2 cup)",
              "Ginger-Garlic Paste (2 tbsp)",
              "Tomato Puree (1.5 cups)",
              "Butter (50g)",
              "Fresh Cream (3 tbsp)",
              "Kasuri Methi (1 tbsp)",
              "Kashmiri Chili Powder (2 tbsp)"
            ],
            steps: [
              "Marinate chicken chunks with yogurt, ginger-garlic paste, salt, and 1 tbsp chili powder for 30 minutes.",
              "Sear chicken in a hot pan with butter until cooked and lightly charred on the edges, then set aside.",
              "Melt remaining butter, cook tomato puree and basic spices for 10 minutes.",
              "Blend gravy until silky-smooth, pour back, and stir in fresh cream and butter.",
              "Slide in seared chicken, simmer for 5 minutes, and finish with crushed Kasuri Methi."
            ],
            chatResponse: {
              "English": "Here is your rich, authentic Amritsari Butter Chicken! Creamy, sweet, and spicy.",
              "Bengali": "Darun swadisht Butter Chicken ready! Gorom butter naan ba ruti diye jome jabe.",
              "Hindi": "Shaandar Butter Chicken taiyar hai! Rich creamy tamatar aur makkhan ki gravy me cooked naram chicken.",
              "Hinglish": "Amritsari style Butter Chicken ready hai! Rich butter, cream aur tomato gravy me cooked seared chicken (chef special) tandoori roti ke sath best hai.",
              "Oriya": "Tasty Butter Chicken ready karichi! Roti o Naan sahita eha khub bhala lagiba."
            }
          }
        ],
        "Breakfast/Snacks ☕": [
          {
            title: "Chicken Kheema Pav",
            time: "20 MINS",
            complexity: "MEDIUM",
            tag: "PUNJABI SNACK",
            ingredients: [
              "Minced Chicken / Kheema (300g)",
              "Onion & Tomato (finely chopped)",
              "Ginger-Garlic Paste (1 tbsp)",
              "Butter & Pav Buns",
              "Spices: Garam Masala, green chilies"
            ],
            steps: [
              "Sauté chopped onions and ginger-garlic paste in butter until golden brown.",
              "Add minced chicken, chopped tomatoes, chilies, and garam masala. Bhuno on high heat for 5 minutes.",
              "Pour in 1/2 cup water, cover, and cook on low heat for 12 minutes until dry and fragrant.",
              "Toast pav buns with a generous amount of butter on the tawa.",
              "Serve hot minced chicken kheema garnished with coriander and lemon alongside toasted pavs."
            ],
            chatResponse: {
              "English": "Spicy Chicken Kheema Pav is ready! A high-protein, incredibly flavorful Punjabi snack.",
              "Bengali": "Masaledar Chicken Kheema Pav ready! Jhal jhal sakaler ba bikeler jolkhabar.",
              "Hindi": "Masaledar Chicken Kheema Pav taiyar hai! Subah ke nashte ya shaam ke snacks ke liye ekdum shaandar.",
              "Hinglish": "Spicy Chicken Kheema Pav ready hai! Butter se toasted soft buns aur minced chicken kheema ka combo bilkul delicious hai.",
              "Oriya": "Chicken Kheema Pav prastuta karichi! Eha khub spicy o high-protein achhi."
            }
          }
        ]
      },
      "Light Comfort 🥣": {
        "Lunch/Dinner 🍽️": [
          {
            title: "Homestyle Tariwala Chicken & Rice",
            time: "30 MINS",
            complexity: "EASY",
            tag: "PUNJABI COMFORT",
            ingredients: [
              "Chicken pieces (500g)",
              "Onions (2, finely sliced)",
              "Tomato (1, chopped)",
              "Ginger-Garlic Paste (1 tbsp)",
              "Whole Spices: Cumin, black cardamom, bay leaf",
              "Mustard Oil (3 tbsp)"
            ],
            steps: [
              "Heat oil in a cooker. Sauté whole spices and sliced onions until translucent and golden brown.",
              "Add ginger-garlic paste, chicken pieces, and sauté (Bhuno) for 5 minutes on medium-high heat.",
              "Stir in chopped tomatoes, turmeric, coriander, and chili powders. Cook until tomatoes are mushy.",
              "Pour in 2 cups of warm water, close lid, and pressure cook for 3 whistles.",
              "Let steam release naturally. Serve the light, flavorful homestyle chicken soup with warm steamed rice."
            ],
            chatResponse: {
              "English": "Enjoy this comforting, light Punjabi Tariwala Chicken with steamed Basmati rice!",
              "Bengali": "Gharer moshlay banano halka Tariwala Chicken ready! Bhaater sathe khub bhalo comfort khabar.",
              "Hindi": "Halka aur homestyle Tariwala Chicken aur garam chawal taiyar hai! Pet ke liye comforting aur swadisht.",
              "Hinglish": "Comforting homestyle Tariwala Chicken ready hai! Light spiced red gravy chicken and steamed basmati rice is a perfect weekend family comfort meal.",
              "Oriya": "Tariwala Chicken o Bhata ready karichi! Eha khub light o tasty achhi."
            }
          }
        ],
        "Breakfast/Snacks ☕": [
          {
            title: "Egg Bhurji Pav (Masala Scrambled Eggs)",
            time: "15 MINS",
            complexity: "EASY",
            tag: "QUICK START",
            ingredients: [
              "Eggs (3)",
              "Onion (1, chopped)",
              "Tomato (1, chopped)",
              "Green Chilies (2, chopped)",
              "Butter (2 tbsp)",
              "Pav Buns"
            ],
            steps: [
              "Melt butter in a pan, sauté chopped onions and green chilies until soft.",
              "Add chopped tomatoes, salt, and turmeric, cooking for 2 minutes.",
              "Crack the eggs directly into the pan, scrambling them continuously on medium-low heat.",
              "Cook for 3-4 minutes until eggs are soft and fully scrambled. Garnish with fresh coriander.",
              "Toast pav buns in butter on the tawa and serve immediately alongside the bhurji."
            ],
            chatResponse: {
              "English": "Quick and soft Egg Bhurji Pav is ready for breakfast! Highly energetic and delicious.",
              "Bengali": "Gorom o naram Dim er Bhurji aar Pav ready! Sakaler sahaj jolkhabar.",
              "Hindi": "Garam aur naram Egg Bhurji Pav taiyar hai! Subah ke nashte ke liye ekdum jhatpat aur healthy.",
              "Hinglish": "Jhatpat Egg Bhurji Pav ready hai! Spicy scrambled eggs and hot buttered pavs breakfast ke liye fast and high-protein option hai.",
              "Oriya": "Egg Bhurji sahita Pav ready karichi! Eha khub tasty o quick achhi."
            }
          }
        ]
      }
    },
    "Vegetarian": {
      "Spicy Feast 🌶️": {
        "Lunch/Dinner 🍽️": [
          {
            title: "Dal Makhani & Paneer Butter Masala",
            time: "40 MINS",
            complexity: "ELABORATE",
            tag: "PUNJABI CLASSIC",
            ingredients: [
              "Black Lentils / Urad Dal (1 cup, soaked overnight)",
              "Paneer (200g, cubed)",
              "Tomato Puree (1.5 cups)",
              "Ghee & Butter (4 tbsp)",
              "Fresh Cream (4 tbsp)",
              "Ginger-Garlic Paste (2 tbsp)"
            ],
            steps: [
              "Pressure cook the soaked black lentils with salt and water for 5 whistles until completely soft.",
              "Melt 2 tbsp butter in a pot, cook ginger-garlic paste and tomato puree. Pour in the cooked dal and mash lightly.",
              "Simmer the dal on low heat for 20 minutes, adding butter and cream slowly to get a rich, creamy texture.",
              "In another pan, sauté paneer cubes in butter, add tomato puree, cashew paste, and Kashmiri chili, cooking until ghee separates.",
              "Serve creamy Dal makhani alongside hot Paneer butter masala and garlic naan."
            ],
            chatResponse: {
              "English": "Here is the ultimate Punjabi vegetarian feast: Creamy Dal Makhani and rich Paneer Butter Masala!",
              "Bengali": "Gorom Dal Makhani o Paneer Butter Masala ready! Aponar jonne dhaba style swad.",
              "Hindi": "Shaandar Punjabi Veg Feast taiyar hai! Creamy Dal Makhani aur butter paneer, ghar par bilkul dhaba style flavor.",
              "Hinglish": "Dhaba style creamy Dal Makhani aur rich Paneer Butter Masala ready hai! Is rich combo ko garlic naan ke sath enjoy karein.",
              "Oriya": "Dal Makhani o Paneer Butter Masala ready karichi! Naan sahita eha amruta lagiba."
            }
          }
        ],
        "Breakfast/Snacks ☕": [
          {
            title: "Amritsari Aloo Paratha (Stuffed Flatbread)",
            time: "20 MINS",
            complexity: "MEDIUM",
            tag: "PUNJABI PARATHA",
            ingredients: [
              "Whole Wheat Flour / Atta (2 cups)",
              "Potatoes (3, boiled and mashed)",
              "Green Chilies & Coriander (chopped)",
              "Ajwain / Carom seeds (1/2 tsp)",
              "Ghee / Butter for roasting"
            ],
            steps: [
              "Knead wheat flour into a soft, pliable dough and rest for 10 minutes.",
              "Mix mashed potatoes, green chilies, coriander, salt, cumin powder, and ajwain together.",
              "Stuff a ball of dough with a large scoop of the spiced potato stuffing, pleating the edges to seal.",
              "Roll carefully into a flatbread, and roast on a hot griddle (Tawa) applying pure ghee on both sides.",
              "Cook until golden brown and crispy on the outside. Serve hot with curd and fresh butter."
            ],
            chatResponse: {
              "English": "Hot and crispy Amritsari Aloo Paratha is ready! Packed with spiced potato mash and topped with fresh butter.",
              "Bengali": "Moshladar gorom Aloo Paratha ready! Doi aar makhon diye khele mon bhore jabe.",
              "Hindi": "Garam aur crispy Amritsari Aloo Paratha taiyar hai! Subah ka ekdum shaandar aur swadisht nashta.",
              "Hinglish": "Amritsari style Aloo Paratha ready hai! Garam paratha par dher sara white butter aur curd subah ka mood shandar bana dega.",
              "Oriya": "Aloo Paratha ready karichi! Dahi o butter sahita eha khub swadist lagiba."
            }
          }
        ]
      },
      "Light Comfort 🥣": {
        "Lunch/Dinner 🍽️": [
          {
            title: "Comforting Rajma Chawal & Yogurt",
            time: "30 MINS",
            complexity: "EASY",
            tag: "PUNJABI COMFORT",
            ingredients: [
              "Red Kidney Beans / Rajma (1 cup, soaked overnight)",
              "Onion & Tomato Puree (1 cup)",
              "Ginger-Garlic Paste (1 tbsp)",
              "Pure Ghee (2 tbsp)",
              "Garam Masala & Kashmiri chili"
            ],
            steps: [
              "Pressure cook the soaked kidney beans (Rajma) with salt and water for 5 whistles until completely soft.",
              "Heat ghee in a pan. Sauté chopped onions and ginger-garlic paste until brown.",
              "Add tomato puree, chili powder, and Rajma masala, cooking until oil separates on the edges.",
              "Pour in the cooked kidney beans along with the cooking water.",
              "Simmer on low-medium heat for 15 minutes, mashing a few beans to make the gravy thick and creamy.",
              "Serve hot with steamed long-grain Basmati rice and yogurt."
            ],
            chatResponse: {
              "English": "Classic homestyle Rajma Chawal is ready! The absolute comfort king of Punjabi households.",
              "Bengali": "Gharer chacha Rajma Chawal ready! Gorom bhat aar peyaj diye kheye dekhun.",
              "Hindi": "Homestyle Rajma Chawal taiyar hai! Punjabi rasoi ka sabse comforting aur favorite khana.",
              "Hinglish": "Garam homestyle Rajma Chawal ready hai! Slow cooked kidney beans aur basmati rice ke sath raw onions and curd is pure comfort food.",
              "Oriya": "Rajma Chawal prastuta karichi! Eha khub tasty o comforting achhi."
            }
          }
        ],
        "Breakfast/Snacks ☕": [
          {
            title: "Paneer stuffed chilla (Lentil Pancake)",
            time: "15 MINS",
            complexity: "EASY",
            tag: "HIGH PROTEIN",
            ingredients: [
              "Moong Dal Flour / Batter (2 cups)",
              "Grated Cottage Cheese / Paneer (100g)",
              "Ginger & Green chilies (chopped)",
              "Coriander leaves (chopped)",
              "Ghee (for roasting)"
            ],
            steps: [
              "Mix moong dal batter with salt, a pinch of turmeric, and green chilies.",
              "Grate paneer and mix with chopped coriander, ginger, salt, and cumin powder.",
              "Heat a non-stick tawa, spread a ladle of batter into a thin circular pancake (Chilla).",
              "Drizzle ghee around the edges and cook on low-medium flame until crispy and golden.",
              "Place a generous scoop of the spiced paneer in the center, fold, and serve hot with mint chutney."
            ],
            chatResponse: {
              "English": "A light and high-protein Paneer stuffed chilla is ready! Extremely nutritious and digestible.",
              "Bengali": "Sastho-kor Paneer stuffed Chilla ready! Pudina chutney diye khele khub sundor lagbe.",
              "Hindi": "Healthy Paneer stuffed Chilla taiyar hai! Paushtik moong dal aur naram paneer nashte ke liye best.",
              "Hinglish": "High-protein Paneer stuffed Chilla ready hai! Moong dal pancake aur grated paneer filling breakfast ke liye ekdum healthy and digestible choice hai.",
              "Oriya": "Paneer stuffed chilla prastuta karichi! Mint chutney sahita eha bahut tasty achhi."
            }
          }
        ]
      }
    },
    "Jain Special": {
      "Spicy Feast 🌶️": {
        "Lunch/Dinner 🍽️": [
          {
            title: "Jain Shahi Paneer & Phulka (No Onion/Garlic/Roots)",
            time: "25 MINS",
            complexity: "MEDIUM",
            tag: "JAIN SHAHI",
            ingredients: [
              "Paneer (200g, cubed)",
              "Tomato Puree (1 cup)",
              "Cashew Paste (2 tbsp)",
              "Ghee (2 tbsp)",
              "Spices: Kashmiri chili, turmeric, salt, garam masala",
              "Hing & Cumin seeds"
            ],
            steps: [
              "Heat ghee in a pan. Temper with cumin seeds and a pinch of Hing.",
              "Add tomato puree and cook on medium flame for 5 minutes until it thickens.",
              "Stir in cashew paste, turmeric, chili powder, and cook until the ghee separates.",
              "Pour in 1/2 cup warm water and milk, bring to a gentle boil, and add paneer cubes.",
              "Simmer covered on low heat for 8 minutes. Garnish with fresh coriander and serve hot with soft phulkas."
            ],
            chatResponse: {
              "English": "Royal Jain Shahi Paneer is ready! A rich, creamy cashew-tomato gravy paneer prepared without onion or root vegetables.",
              "Bengali": "Khub swadisht Jain Shahi Paneer ready! Ruti ba porotar sathe darun lagbe.",
              "Hindi": "Shuddh Jain Shahi Paneer taiyar hai! Kaju aur tamatar ki rich sweet gravy bina lehsun pyaaz ke.",
              "Hinglish": "Jain style Shahi Paneer ready hai! Cashew aur tomato gravy me cooked soft paneer cubes (no onion, garlic) garam phulkas ke sath best tasty feast hai.",
              "Oriya": "Jain Shahi Paneer ready karichi! Eha khub swadist o shuddh achhi."
            }
          }
        ],
        "Breakfast/Snacks ☕": [
          {
            title: "Jain Paneer Paratha & Curd",
            time: "20 MINS",
            complexity: "MEDIUM",
            tag: "JAIN PARATHA",
            ingredients: [
              "Whole wheat flour (2 cups)",
              "Grated Paneer (150g)",
              "Green chilies & Coriander (chopped)",
              "Carom seeds / Ajwain (1/2 tsp)",
              "Ghee (for roasting)"
            ],
            steps: [
              "Knead wheat flour with salt, warm water, and 1 tsp ghee into a soft dough.",
              "Mix grated paneer, chopped green chilies, coriander, salt, and ajwain together (avoid ginger/roots).",
              "Stuff a dough ball with the paneer stuffing, roll carefully, and roast on tawa.",
              "Apply pure cow ghee on both sides, roasting until golden and crispy.",
              "Serve hot with a cup of fresh, plain curd."
            ],
            chatResponse: {
              "English": "Healthy Jain Paneer Paratha is ready! Protein-packed stuffed flatbread served with fresh curd.",
              "Bengali": "Niramish Jain Paneer Paratha ready! Gorom doi diye khele khub sundor lagbe.",
              "Hindi": "Garam Jain Paneer Paratha taiyar hai! Subah ke nashte ke liye ekdum healthy aur shuddh choice.",
              "Hinglish": "Jain style Paneer Paratha ready hai! Grated paneer stuffing aur pure ghee se cooked paratha fresh curd ke sath super protein-rich breakfast hai.",
              "Oriya": "Paneer Paratha sahita dahi ready karichi! Eha khub swadist o nutritious achhi."
            }
          }
        ]
      },
      "Light Comfort 🥣": {
        "Lunch/Dinner 🍽️": [
          {
            title: "Comforting Jain Kadhi Khichdi",
            time: "20 MINS",
            complexity: "EASY",
            tag: "JAIN COMFORT",
            ingredients: [
              "Moong Dal Khichdi (1 cup, cooked soft)",
              "Yogurt / Sour Curd (1/2 cup)",
              "Gram Flour / Besan (2 tbsp)",
              "Ghee (1 tbsp)",
              "Mustard seeds, cumin, curry leaves, Hing"
            ],
            steps: [
              "Whisk yogurt, besan, salt, turmeric, and 2 cups of water together into a smooth batter.",
              "Cook the yogurt batter in a pot on medium flame, stirring continuously until it boils and thickens.",
              "For tempering: Heat ghee, let mustard and cumin seeds crackle, add green chilies, curry leaves, and a pinch of Hing.",
              "Pour the hot ghee tempering into the bubbling kadhi and simmer for 5 minutes.",
              "Serve the warm, tangy kadhi over soft, comforting Moong dal khichdi."
            ],
            chatResponse: {
              "English": "Light and comforting Jain Kadhi Khichdi is ready! Highly digestible and comforting for the stomach.",
              "Bengali": "Jain pochondo moton halka Kadhi Khichri ready! Sorir gorom e khele aram pabe.",
              "Hindi": "Halki aur comforting Jain Kadhi Khichdi taiyar hai! Pet ke liye behad light aur digestible comfort food.",
              "Hinglish": "Jain style Kadhi Khichdi ready hai! Plain soft khichdi aur tangy spiced buttermilk kadhi (no garlic, onion) digestion ke liye ultimate comfort food combo hai.",
              "Oriya": "Jain Kadhi Khichdi prastuta karichi! Eha khub light o stomach friendly achhi."
            }
          }
        ],
        "Breakfast/Snacks ☕": [
          {
            title: "Jain Poha (No Onion/Garlic/Potato)",
            time: "15 MINS",
            complexity: "EASY",
            tag: "JAIN LIGHT",
            ingredients: [
              "Flattened Rice / Poha (2 cups, rinsed)",
              "Peanuts (2 tbsp)",
              "Mustard seeds & Curry leaves",
              "Green Peas (1/4 cup)",
              "Ghee (1 tbsp)",
              "Turmeric & Lemon juice"
            ],
            steps: [
              "Rinse flattened rice (Poha) in a colander, toss with a pinch of turmeric and salt, and let it rest.",
              "Heat ghee in a pan, fry peanuts until crunchy, and set aside.",
              "In the same ghee, add mustard seeds and curry leaves until they splutter, then sauté green peas for 2 minutes.",
              "Slide in the fluffy poha and toss gently on low heat for 5 minutes.",
              "Squeeze fresh lemon juice on top, toss, garnish with fried peanuts, and serve warm."
            ],
            chatResponse: {
              "English": "Fluffy Jain Poha is ready! Made without onion, garlic, or root potatoes for a quick and light breakfast.",
              "Bengali": " Gorom o halka Jain Poha ready! Sakaler chhotpoto jolkhabar.",
              "Hindi": "Halka aur shuddh Jain Poha taiyar hai! Subah ke jhatpat nashte ke liye ekdum soft aur tasty.",
              "Hinglish": "Jain style Poha ready hai! Peanuts aur green peas ke sath prepared fluffy light breakfast, jo bahut fast digest hota hai.",
              "Oriya": "Jain Poha prastuta karichi! Peanuts o peas sahita eha bahut tasty achhi."
            }
          }
        ]
      }
    }
  },
  "Delhi": {
    "Non-Vegetarian": {
      "Spicy Feast 🌶️": {
        "Lunch/Dinner 🍽️": [
          {
            title: "Mughlai Chicken Korma & Roti",
            time: "40 MINS",
            complexity: "ELABORATE",
            tag: "MUGHLAI SPL",
            ingredients: [
              "Chicken pieces (500g)",
              "Onions (3, sliced thin & fried golden)",
              "Ginger-Garlic Paste (2 tbsp)",
              "Yogurt (1/2 cup)",
              "Cashew-Almond Paste (2 tbsp)",
              "Ghee (3 tbsp)",
              "Spices: Cardamom, cinnamon, mace, garam masala"
            ],
            steps: [
              "Marinate chicken with yogurt, ginger-garlic paste, and aromatic ground spices for 30 minutes.",
              "Crush the fried golden onions (Birista) roughly with your hands and set aside.",
              "Heat ghee in a pot, add whole spices (cardamom, cinnamon, bay leaf) until aromatic.",
              "Slide in the marinated chicken and sauté (Bhuno) on high flame for 5-7 minutes until dry.",
              "Add cashew paste, crushed fried onions, and 1 cup of warm water. Cover and simmer on low heat for 20 minutes until chicken is tender.",
              "Sprinkle korma spices and a drop of kewra water. Serve hot with soft rotis."
            ],
            chatResponse: {
              "English": "Here is your royal Mughlai Chicken Korma! Rich, aromatic cashew-almond gravy with caramelized onions.",
              "Bengali": "Mughlai style Chicken Korma ready! Gorom ruti ba paratha diye khete darun swad.",
              "Hindi": "Mughlai Chicken Korma taiyar hai! Kaju aur badam ki rich gravy aur khushbudar masalo ka dum.",
              "Hinglish": "Purani Delhi style Mughlai Chicken Korma ready hai! Fried caramelized onions aur rich cashew gravy ka taste bilkul authentic hai.",
              "Oriya": "Mughlai Chicken Korma ready karichi! Roti sahita eha khub swadist lagiba."
            }
          }
        ],
        "Breakfast/Snacks ☕": [
          {
            title: "Delhi Style Chicken Tikka (Pan Seared)",
            time: "20 MINS",
            complexity: "MEDIUM",
            tag: "SPICY SNACK",
            ingredients: [
              "Boneless Chicken cubes (300g)",
              "Yogurt / Hung Curd (3 tbsp)",
              "Tandoori Masala & Kashmiri chili",
              "Ginger-Garlic Paste (1 tbsp)",
              "Butter (for basting)",
              "Lemon juice"
            ],
            steps: [
              "Marinate chicken cubes with hung curd, ginger-garlic paste, salt, chili, and tandoori masala for 30 minutes.",
              "Heat a heavy cast-iron pan or griddle and brush with oil/ghee.",
              "Place marinated chicken pieces on the hot pan, leaving space between them. Sear on high heat for 3 minutes.",
              "Flip, brush with melted butter, and cook the other side for 4 minutes until charred on the edges.",
              "Remove, sprinkle chaat masala and fresh coriander, and serve hot with mint chutney and lemon wedges."
            ],
            chatResponse: {
              "English": "Pan-seared Delhi style Chicken Tikka is ready! Juicy, smoky, and highly spiced.",
              "Bengali": "Smoky o spicy Chicken Tikka ready! Bikeler jhatpat and swadisht treat.",
              "Hindi": "Chatpata Chicken Tikka taiyar hai! Tawa par pakaya gaya juicy aur masaledar tikka chane ki chatni ke saath.",
              "Hinglish": "Tandoori style Chicken Tikka ready hai! Pan-seared smoky chicken cubes (high-protein) evening tea ke sath best chatpata snack hai.",
              "Oriya": "Juicy Chicken Tikka prastuta karichi! Eha khub smoky o spicy achhi."
            }
          }
        ]
      },
      "Light Comfort 🥣": {
        "Lunch/Dinner 🍽️": [
          {
            title: "Delhi Homestyle Egg Curry & Jeera Rice",
            time: "25 MINS",
            complexity: "EASY",
            tag: "DELHI COMFORT",
            ingredients: [
              "Boiled Eggs (4)",
              "Onions & Tomatoes (finely chopped)",
              "Ginger-Garlic Paste (1 tbsp)",
              "Refined Oil (2 tbsp)",
              "Cumin seeds & Coriander",
              "Basmati Rice (for Jeera Rice)"
            ],
            steps: [
              "Prick boiled eggs with a toothpick, shallow fry lightly in a pinch of turmeric and oil, then set aside.",
              "In the remaining oil, sauté cumin seeds and chopped onions until golden brown.",
              "Add ginger-garlic paste and tomatoes, cooking until soft and mushy.",
              "Stir in basic spices (turmeric, chili, coriander powder) and 1.5 cups of warm water. Bring to a boil.",
              "Slide in the fried eggs, cover, and simmer on low-medium flame for 8 minutes.",
              "Garnish with chopped coriander. Cook cumin-tempered Basmati rice (Jeera Rice) and serve warm together."
            ],
            chatResponse: {
              "English": "Homestyle Egg Curry with Jeera Rice is ready! Highly comforting and perfect for a quick, warm family lunch.",
              "Bengali": "Gharer chacha Dim er Dalna aar Jeera Bhat ready! Bhaater sathe khub bhalo comfort meal.",
              "Hindi": "Homestyle Egg Curry aur Jeera Rice taiyar hai! Subah ke lunch ke liye behad comforting aur jhatpat.",
              "Hinglish": "Homestyle Egg Curry aur Jeera Rice ready hai! Light onion-tomato gravy eggs and cumin basmati rice is a perfect comforting family lunch option.",
              "Oriya": "Egg Curry o Jeera Bhat ready karichi! Eha khub light o swadist achhi."
            }
          }
        ],
        "Breakfast/Snacks ☕": [
          {
            title: "Masala Omelette & Buttered Toast",
            time: "10 MINS",
            complexity: "EASY",
            tag: "QUICK breakfast",
            ingredients: [
              "Eggs (2)",
              "Onion (1/2, chopped)",
              "Tomato (1/2, chopped)",
              "Green Chilies (2, chopped)",
              "Butter (1 tbsp)",
              "Bread slices (2)"
            ],
            steps: [
              "Crack eggs into a bowl, add chopped onions, tomatoes, green chilies, salt, and whisk vigorously until frothy.",
              "Melt butter in a pan, pour in the egg mixture, and spread evenly.",
              "Cook on medium-low flame for 2 minutes, flip carefully, and cook the other side for 1 minute.",
              "Toast bread slices with butter on the griddle until crispy.",
              "Serve the hot fluffy omelette folded alongside golden buttered toast."
            ],
            chatResponse: {
              "English": "A hot, fluffy Delhi street-style Masala Omelette is ready for breakfast! Tangy, savory, and quick to cook.",
              "Bengali": "Fluffy and spicy Masala Omelette aar Toast ready! Sakaler jhatpat jolkhabar.",
              "Hindi": "Masala Omelette aur buttered toast taiyar hai! Subah ka ekdum fast aur high-protein nashta.",
              "Hinglish": "Delhi style double egg Masala Omelette and hot toast ready hai! High-protein, spicy and filling breakfast jo 10 minutes me ban jata hai.",
              "Oriya": "Egg Masala Omelette sahita Toast ready karichi! Eha khub tasty o quick breakfast achhi."
            }
          }
        ]
      }
    },
    "Vegetarian": {
      "Spicy Feast 🌶️": {
        "Lunch/Dinner 🍽️": [
          {
            title: "Delhi Chole Bhature (Dilli Style Chickpeas)",
            time: "35 MINS",
            complexity: "ELABORATE",
            tag: "DELHI LEGEND",
            ingredients: [
              "Chickpeas / Kabuli Chana (1 cup, soaked & boiled with tea bags)",
              "Onions & Tomato Puree (1 cup)",
              "Chole Masala (2 tbsp)",
              "Ginger Juliennes & Green chilies",
              "Maida / Flour for Bhaturas",
              "Oil (for deep frying)"
            ],
            steps: [
              "Boil chickpeas with black tea bags, black cardamom, and salt until soft and dark brown.",
              "Knead Maida with yogurt, oil, and warm water into a soft dough and let ferment for 1 hour.",
              "Heat oil in a pan, sauté chopped onions and ginger-garlic paste until dark golden-brown.",
              "Add tomato puree, Chole masala, and red chili, cooking until oil separates.",
              "Pour in the dark chickpeas, mash a few to thicken the gravy, and simmer covered for 15 minutes.",
              "Roll Bhatura dough into large oval disks and deep-fry in smoking hot oil until puffed like balls. Serve hot."
            ],
            chatResponse: {
              "English": "Behold the legendary Dilli wale Chole Bhature! Spicy, dark chickpeas paired with hot puffed fried flatbreads.",
              "Bengali": "Purani Delhi style Chole Bhature ready! Jhal jhal o swadisht, thik dhaba style flavor.",
              "Hindi": "Masaledar Delhi style Chole Bhature taiyar hai! Subah ka ekdum shaandar aur swadisht heavy nashta.",
              "Hinglish": "Dilli wale black Chole Bhature ready hai! Tangy spiced dark chickpeas aur fluffy deep-fried bhaturas ka pairing is a total culinary dream.",
              "Oriya": "Delhi style Chole Bhature ready karichi! Bhatura sahita eha khub swadist lagiba."
            }
          }
        ],
        "Breakfast/Snacks ☕": [
          {
            title: "Delhi Samosa Chaat (Street Style)",
            time: "15 MINS",
            complexity: "EASY",
            tag: "STREET CHAAT",
            ingredients: [
              "Crispy Potato Samosas (2)",
              "Boiled Chickpeas / Ragda (1 cup)",
              "Yogurt (sweetened, 1/2 cup)",
              "Sweet Tamarind & Green Mint Chutney",
              "Chaat Masala, Onions & Sev"
            ],
            steps: [
              "Place warm potato samosas in a shallow bowl and crush them lightly with your thumb.",
              "Pour hot boiled spiced chickpeas (chole) generously over the crushed samosas.",
              "Drizzle chilled sweetened yogurt, green mint chutney, and tangy red tamarind chutney on top.",
              "Sprinkle chopped onions, sev, fresh coriander, and a generous pinch of chaat masala.",
              "Serve immediately with a spoon as a delicious street-style chaat."
            ],
            chatResponse: {
              "English": "Delhi Street Style Samosa Chaat is ready! Tangy, sweet, spicy, and crunchily satisfying.",
              "Bengali": "Bikeler chatpoto Samosa Chaat ready! Tok, jhal, aar meetha combo.",
              "Hindi": "Chatpata Samosa Chaat taiyar hai! Subah ke snacks ya shaam ke nashte ke liye ekdum lajawab.",
              "Hinglish": "Delhi street-style Samosa Chaat ready hai! Sweet curd, green-red chutney, onions aur sev ke sath crushed samosa chaat is the best spicy treat.",
              "Oriya": "Samosa Chaat prastuta karichi! Eha khub tangy o sweet-spicy achhi."
            }
          }
        ]
      },
      "Light Comfort <ul>": {
        "Lunch/Dinner 🍽️": [
          {
            title: "Delhi Homestyle Dal Tadka & Roti",
            time: "20 MINS",
            complexity: "EASY",
            tag: "DAILY COMFORT",
            ingredients: [
              "Toor / Arhar Dal (1 cup)",
              "Cumin seeds (1 tsp)",
              "Ghee (2 tbsp)",
              "Hing (a pinch)",
              "Garlic (4 cloves, chopped)",
              "Tomatoes & Onions (chopped)"
            ],
            steps: [
              "Pressure cook washed yellow split peas (Toor dal) with turmeric, salt, and water for 3 whistles.",
              "Whisk the cooked dal lightly for a smooth, cohesive consistency.",
              "Heat ghee in a pan. Sauté chopped onions, garlic, and tomatoes until soft and cooked.",
              "Pour the cooked dal into the tomato-garlic masala and simmer for 5 minutes.",
              "For final tadka: Heat ghee, crackle cumin seeds, add dried red chilies, a pinch of Hing, and pour sizzling over the dal. Serve hot with soft rotis."
            ],
            chatResponse: {
              "English": "Homestyle Dal Tadka with soft wheat rotis is ready! A daily, light, digestible vegetarian comfort dinner.",
              "Bengali": "Gharer chacha Dal Fry o Phulka ready! Gorom gorom bhalobasa diye banano comfort meal.",
              "Hindi": "Comforting Dal Tadka aur naram Roti taiyar hai! Subah ke dinner ke liye ekdum light aur healthy.",
              "Hinglish": "Daily comfort homestyle Dal Tadka aur soft Rotis ready hai! Ghee-cumin tempered yellow lentils are light, digestible and protein-rich.",
              "Oriya": "Dal Tadka o Roti ready karichi! Eha khub light o stomach friendly dinner achhi."
            }
          }
        ],
        "Breakfast/Snacks ☕": [
          {
            title: "Moong Dal Chilla (Lentil Crepe)",
            time: "15 MINS",
            complexity: "EASY",
            tag: "DIET LIGHT",
            ingredients: [
              "Yellow Moong Dal (1 cup, soaked and ground to batter)",
              "Green chilies & Ginger paste (1 tsp)",
              "Oil / Ghee (for roasting)",
              "Coriander leaves (chopped)",
              "Salt to taste"
            ],
            steps: [
              "Soak moong dal for 2 hours, grind with ginger and green chilies to a smooth pouring consistency.",
              "Stir salt and fresh chopped coriander into the yellow batter.",
              "Heat a flat non-stick griddle (Tawa), pour a ladle of batter, and spread thinly in circular motions.",
              "Drizzle ghee around the edges and cook on medium flame until crispy and golden.",
              "Flip, cook the other side for 1 minute, fold, and serve hot with green mint chutney."
            ],
            chatResponse: {
              "English": "A light and healthy Moong Dal Chilla is ready! Highly nutritious, low calorie, and gluten-free.",
              "Bengali": "Sastho-kor Moong Dal Chilla ready! Pudina chutney diye jolkhabarer shobcheye bhalo choice.",
              "Hindi": "Healthy Moong Dal Chilla taiyar hai! Subah ke jhatpat nashte ke liye ekdum light aur paushtik.",
              "Hinglish": "Healthy Moong Dal Chilla ready hai! Soaked moong dal crepe (low oil, gluten-free) morning breakfast ke liye super light and energetic choice hai.",
              "Oriya": "Moong Dal Chilla ready karichi! Mint chutney sahita eha khub healthy achhi."
            }
          }
        ]
      }
    },
    "Jain Special": {
      "Spicy Feast 🌶️": {
        "Lunch/Dinner 🍽️": [
          {
            title: "Jain Paneer Tikka Masala & Roti",
            time: "30 MINS",
            complexity: "MEDIUM",
            tag: "JAIN FEAST",
            ingredients: [
              "Paneer cubes (200g)",
              "Tomato Puree (1 cup)",
              "Cashew Paste (2 tbsp)",
              "Ghee (2 tbsp)",
              "Spices: Turmeric, chili, garam masala, Hing",
              "Yogurt (for marinade)"
            ],
            steps: [
              "Marinate paneer cubes with yogurt, Hing, tandoori spices, and salt for 15 minutes, then pan-sear until golden-brown.",
              "Heat ghee in a pan, temper with cumin seeds and a pinch of Hing.",
              "Add tomato puree, cashew paste, salt, basic spices, and sauté until ghee separates.",
              "Pour in 1/2 cup warm water, bring to a simmer, and add seared paneer cubes.",
              "Simmer covered for 8 minutes until the gravy is thick and rich. Serve hot with soft phulkas."
            ],
            chatResponse: {
              "English": "Enjoy this rich Jain Paneer Tikka Masala with soft phulkas! Rich Cashew-tomato gravy paneer prepared without onion, garlic, or root vegetables.",
              "Bengali": "Niramish Jain Paneer Tikka Masala ready! Bina peyaj-rosun e ato swadist kheye bar bar banate chaiben.",
              "Hindi": "Shuddh Jain Paneer Tikka Masala taiyar hai! Kaju aur tamatar ki rich spiced gravy bina lehsun pyaaz ke.",
              "Hinglish": "Jain style Paneer Tikka Masala ready hai! Cashew gravy and seared paneer cubes (no onion, garlic) tandoori roti ke sath best shuddh tasty dinner option hai.",
              "Oriya": "Jain Paneer Tikka Masala ready karichi! Eha khub tasty o shuddh achhi."
            }
          }
        ],
        "Breakfast/Snacks ☕": [
          {
            title: "Jain Paneer Chilla (Cottage Cheese Lentil Crepe)",
            time: "15 MINS",
            complexity: "EASY",
            tag: "JAIN PROTEIN",
            ingredients: [
              "Moong Dal Batter (2 cups)",
              "Grated Cottage Cheese / Paneer (100g)",
              "Green chilies & Coriander (chopped)",
              "Ghee (for roasting)",
              "Salt & Cumin powder"
            ],
            steps: [
              "Whisk Moong dal batter with salt, cumin powder, and chopped green chilies.",
              "Grate paneer, mix with chopped coriander, cumin powder, and salt (avoid ginger/roots).",
              "Heat tawa, spread batter into a thin crepe. Drizzle ghee around the edges.",
              "Cook until golden-brown, place a large scoop of paneer in the center, fold, and serve warm with mint chutney."
            ],
            chatResponse: {
              "English": "High-protein Jain Paneer Chilla is ready! Light, nutritious moong dal pancake stuffed with spiced grated paneer.",
              "Bengali": "Niramish o sastho-kor Jain Paneer Chilla ready! Sakalerjolkhabare eita darun hobe.",
              "Hindi": "Healthy Jain Paneer Chilla taiyar hai! Paushtik moong dal aur naram paneer subah ke shuddh nashte ke liye best.",
              "Hinglish": "Jain style Paneer stuffed Moong Dal Chilla ready hai! Protein-rich and gluten-free chilla mint chutney ke sath subah ka perfect healthy and shuddh start hai.",
              "Oriya": "Jain Paneer Chilla ready karichi! Mint chutney sahita eha khub tasty achhi."
            }
          }
        ]
      },
      "Light Comfort 🥣": {
        "Lunch/Dinner 🍽️": [
          {
            title: "Jain Yellow Dal Fry & Jeera Rice (Omit Garlic/Roots)",
            time: "20 MINS",
            complexity: "EASY",
            tag: "JAIN DAILY",
            ingredients: [
              "Toor / Arhar Dal (1 cup)",
              "Mustard & Cumin seeds",
              "Ghee (1.5 tbsp)",
              "Hing (a pinch)",
              "Tomatoes (chopped)",
              "Coriander leaves"
            ],
            steps: [
              "Pressure cook washed yellow split peas (Toor dal) with turmeric, salt, and water for 3 whistles.",
              "Whisk the cooked dal lightly for a smooth consistency.",
              "Heat ghee in a pan. Temper with mustard seeds, cumin seeds, green chilies, and a pinch of Hing.",
              "Add chopped tomatoes, salt, and basic spices. Sauté until tomatoes are mushy.",
              "Pour in the cooked dal, mix well, and simmer for 5 minutes. Garnish with chopped coriander and serve with steamed rice."
            ],
            chatResponse: {
              "English": "Homestyle Jain Dal Fry with steamed rice is ready! Light, comforting, and prepared strictly without root vegetables.",
              "Bengali": "Gorom gorom Jain Dal Fry o Bhaat ready! Sorir o pet er shanti.",
              "Hindi": "Halki aur shuddh Jain Dal Fry aur garam chawal taiyar hai! Pet ke liye comfort aur digest karne me behad sahaj.",
              "Hinglish": "Jain style yellow Dal Fry and steamed Rice ready hai! Ghee-Hing tempered yellow lentils (no garlic, onion) are very light and comforting for family meals.",
              "Oriya": "Jain Dal Fry o Bhata ready karichi! Eha khub light o stomach friendly achhi."
            }
          }
        ],
        "Breakfast/Snacks ☕": [
          {
            title: "Jain Puffed Rice Upma (Kurmura Poha)",
            time: "10 MINS",
            complexity: "EASY",
            tag: "JAIN LIGHT",
            ingredients: [
              "Puffed Rice / Kurmura (3 cups, washed and drained)",
              "Mustard seeds & Curry leaves",
              "Ghee (1 tbsp)",
              "Peanuts (2 tbsp)",
              "Turmeric, salt & lemon juice"
            ],
            steps: [
              "Rinse puffed rice in water quickly, squeeze dry, and set aside in a bowl.",
              "Heat ghee in a pan. Fry peanuts until golden-brown, then add mustard seeds and curry leaves.",
              "Add green peas, turmeric powder, and salt. Sauté for 2 minutes.",
              "Add the washed puffed rice and toss gently on low heat for 3 minutes.",
              "Squeeze fresh lemon juice on top, toss, and serve immediately."
            ],
            chatResponse: {
              "English": "Light and fluffy Jain Puffed Rice Upma is ready! Made without onion, garlic, or root potatoes for a quick breakfast.",
              "Bengali": "Halka and gorom Kurmura Upma ready! Sakaler jolkhabare chhotpoto choice.",
              "Hindi": "Halka aur swadisht Jain Puffed Rice Upma taiyar hai! Subah ke jhatpat nashte ke liye ekdum light aur crisp.",
              "Hinglish": "Jain style Kurmura Poha ready hai! Puffed rice Crepe cooked with ghee, peanuts and peas (no roots) breakfast ke liye ekdum light, fast and digestible choice hai.",
              "Oriya": "Puffed Rice Upma / Mudhi Upma ready karichi! Eha khub tasty o light breakfast achhi."
            }
          }
        ]
      }
    }
  },
  "Maharashtra": {
    "Non-Vegetarian": {
      "Spicy Feast 🌶️": {
        "Lunch/Dinner 🍽️": [
          {
            title: "Malvani Fish Curry & Bhakri",
            time: "30 MINS",
            complexity: "MEDIUM",
            tag: "KONKAN SPECIAL",
            ingredients: [
              "Fresh Fish Steaks (500g, Pomfret or Surmai)",
              "Grated Coconut (1 cup)",
              "Malvani Spice Blend (2 tbsp)",
              "Kokum pods (4, soaked)",
              "Coconut Oil (3 tbsp)",
              "Green Chilies & Coriander"
            ],
            steps: [
              "Marinate fish steaks with salt and turmeric powder for 10 minutes.",
              "Grind grated coconut, green chilies, and Malvani spices with water to a smooth paste.",
              "Heat coconut oil in a clay pot, sauté green chilies, then pour in the coconut-spice paste.",
              "Add 1 cup of warm water and soaked Kokum pods, bringing to a gentle boil on low heat.",
              "Slide in the fish steaks, cover, and cook on low flame for 6-8 minutes until tender.",
              "Serve the hot Konkan-style fish curry with soft rice flour flatbreads (Bhakri)."
            ],
            chatResponse: {
              "English": "Here is your fiery Malvani Fish Curry with soft Bhakri! Spiced with authentic Konkan ground coconut and tangy Kokum.",
              "Bengali": "Masaledar Malvani Fish Curry ready! Khub jhal o swadisht coconut-based gravy.",
              "Hindi": "Masaledar Malvani Fish Curry aur soft Bhakri taiyar hai! Kokum ke khattepan aur nariyal ke flavor ka ekdum Konkan style test.",
              "Hinglish": "Konkan style spicy Malvani Fish Curry ready hai! Rich coconut, Malvani masala aur sour kokum gravy cooked with fresh fish steaks bhakri ke sath best taste deta hai.",
              "Oriya": "Malvani Fish Curry o Bhakri ready karichi! Eha khub spicy o traditional achhi."
            }
          }
        ],
        "Breakfast/Snacks ☕": [
          {
            title: "Marathi Kolhapuri Egg Bhurji Pav",
            time: "15 MINS",
            complexity: "EASY",
            tag: "SPICY SCRAMBLE",
            ingredients: [
              "Eggs (3)",
              "Onions (1, finely chopped)",
              "Kolhapuri Kanda Lasun Masala (1 tbsp)",
              "Butter (2 tbsp)",
              "Pav Buns"
            ],
            steps: [
              "Melt butter in a pan, sauté chopped onions and green chilies until brown.",
              "Add Kolhapuri Kanda Lasun Masala (onion-garlic spice) and sauté for 1 minute.",
              "Crack the eggs into the pan, scrambling them continuously on medium-low flame.",
              "Cook for 3 minutes until scrambled and aromatic. Garnish with coriander.",
              "Toast pav buns with butter and serve immediately with the spicy bhurji."
            ],
            chatResponse: {
              "English": "Fiery Kolhapuri Egg Bhurji Pav is ready for breakfast! Highly energetic and intensely spiced.",
              "Bengali": "Jhal jhal Kolhapuri Egg Bhurji ready! Bikeler and gorom jolkhabarer treat.",
              "Hindi": "Kolhapuri Egg Bhurji aur pav taiyar hai! Subah ke nashte me ekdum teekha aur masaledar dhumaka.",
              "Hinglish": "Spicy Kolhapuri Egg Bhurji ready hai! Kolhapuri Kanda Lasun masala se cooked scrambled eggs aur buttery pavs breakfast ke liye fast and high-protein option hai.",
              "Oriya": "Kolhapuri Egg Bhurji o Pav ready karichi! Eha khub spicy o quick breakfast achhi."
            }
          }
        ]
      },
      "Light Comfort 🥣": {
        "Lunch/Dinner 🍽️": [
          {
            title: "Homestyle Egg Rassa & Rice",
            time: "25 MINS",
            complexity: "EASY",
            tag: "MAHARASHTRIAN",
            ingredients: [
              "Boiled Eggs (4)",
              "Onions (2, finely sliced)",
              "Grated Coconut (1/2 cup)",
              "Ginger-Garlic Paste (1 tbsp)",
              "Refined Oil (2 tbsp)",
              "Goda Masala & Turmeric"
            ],
            steps: [
              "Shallow fry boiled eggs in a pinch of turmeric and oil, then set aside.",
              "Roast sliced onions and grated coconut dry in a pan until brown, then grind to a smooth paste (Watan).",
              "Heat oil, sauté ginger-garlic paste, Watan paste, and Goda Masala until oil separates.",
              "Pour in 2 cups of warm water, salt, and bring to a gentle boil.",
              "Slide in the fried eggs, cover, and simmer on low heat for 8 minutes.",
              "Serve this aromatic, comforting egg curry warm with steamed long-grain rice."
            ],
            chatResponse: {
              "English": "Homestyle Egg Rassa with steamed rice is ready! Flavored with roasted onion-coconut paste.",
              "Bengali": "Aromatic Egg Rassa o Bhaat ready! Gharer chacha comfort khabar.",
              "Hindi": "Homestyle Egg Rassa aur chawal taiyar hai! Goda Masala aur roasted nariyal ke flavor ki light curry.",
              "Hinglish": "Aromatic Egg Rassa aur steamed Rice ready hai! Watan (roasted onion-coconut) paste and Goda Masala se cooked egg curry is a highly comforting Maharashtrian lunch.",
              "Oriya": "Egg Rassa o Bhata ready karichi! Eha khub light o swadist dinner achhi."
            }
          }
        ],
        "Breakfast/Snacks ☕": [
          {
            title: "Kanda Poha & Solkadhi",
            time: "15 MINS",
            complexity: "EASY",
            tag: "DAILY START",
            ingredients: [
              "Flattened Rice / Poha (2 cups)",
              "Onions (1, finely chopped)",
              "Peanuts (2 tbsp)",
              "Mustard seeds & Curry leaves",
              "Turmeric, salt & lemon juice",
              "Solkadhi (for serving)"
            ],
            steps: [
              "Rinse flattened rice (Poha) in a colander, toss with salt and turmeric, and let it rest.",
              "Heat oil in a pan, fry peanuts until crunchy, then add mustard seeds and curry leaves.",
              "Add chopped onions and green chilies. Sauté until onions are soft and translucent.",
              "Slide in the fluffy poha, toss gently on low flame for 5 minutes.",
              "Squeeze fresh lemon juice, toss, garnish with grated coconut and serve with a glass of cool Solkadhi."
            ],
            chatResponse: {
              "English": "Classic Kanda Poha with a glass of refreshing Solkadhi is ready for breakfast! Light, healthy, and digestively soothing.",
              "Bengali": "Gorom Kanda Poha o Solkadhi ready! Sakalerjolkhabare eita sorir ke thanda rakhbe.",
              "Hindi": "Fluffy Kanda Poha aur refreshing Solkadhi taiyar hai! Subah ka ekdum light aur energetic breakfast.",
              "Hinglish": "Classic Marathi Kanda Poha and Solkadhi ready hai! Chopped onions, peanuts aur lemon juice se cooked poha paired with cool pink solkadhi is a pure morning delight.",
              "Oriya": "Kanda Poha sahita Solkadhi ready karichi! Eha khub light o refreshing breakfast achhi."
            }
          }
        ]
      }
    },
    "Vegetarian": {
      "Spicy Feast 🌶️": {
        "Lunch/Dinner 🍽️": [
          {
            title: "Bharli Vangi (Stuffed Eggplant Curry)",
            time: "30 MINS",
            complexity: "MEDIUM",
            tag: "MAHARASHTRIAN",
            ingredients: [
              "Small Brinjals / Eggplants (4-5)",
              "Roasted Peanuts (1/2 cup, ground)",
              "Sesame seeds (1 tbsp)",
              "Grated Coconut (4 tbsp)",
              "Refined Oil (3 tbsp)",
              "Marathi Goda Masala (2 tbsp)",
              "Hing & Cumin seeds"
            ],
            steps: [
              "Slit small brinjals crosswise from the base, keeping the stems intact.",
              "Mix ground peanuts, toasted sesame seeds, coconut, Goda Masala, tamarind paste, salt, and cumin together to form a thick stuffing.",
              "Stuff the slit brinjals generously with the peanut-coconut spice mixture.",
              "Heat oil in a pan, temper with cumin seeds and Hing. Sauté the stuffed brinjals gently for 5 minutes.",
              "Add remaining stuffing paste, 1 cup of warm water, cover, and cook on low heat for 15 minutes until brinjals are tender and the gravy releases oil."
            ],
            chatResponse: {
              "English": "Authentic Marathi Bharli Vangi is ready! Small brinjals stuffed with a rich, spiced peanut-sesame-coconut paste.",
              "Bengali": "Masaledar Stuffed Brinjal (Bharli Vangi) ready! Ruti ba porotar sathe darun lagbe.",
              "Hindi": "Swadisht Marathi Bharli Vangi taiyar hai! Mungfali aur nariyal ke masaledar paste se stuffed naram baingan.",
              "Hinglish": "Marathi style Bharli Vangi ready hai! Spiced peanut, sesame and coconut paste se stuffed small eggplants jowar bhakri ya chapati ke sath best festive veg dinner option hai.",
              "Oriya": "Tasty Bharli Vangi prastuta karichi! Roti sahita eha khub swadist lagiba."
            }
          }
        ],
        "Breakfast/Snacks ☕": [
          {
            title: "Marathi Pav Bhaji (Street Style)",
            time: "30 MINS",
            complexity: "MEDIUM",
            tag: "STREET LEGEND",
            ingredients: [
              "Mixed Vegetables: Potato, peas, cauliflower (2 cups, boiled)",
              "Onion & Tomato (finely chopped)",
              "Pav Bhaji Masala (2 tbsp)",
              "Butter (50g)",
              "Pav Buns",
              "Lemon juice & Coriander"
            ],
            steps: [
              "Pressure cook potatoes, green peas, and cauliflower, then mash them thoroughly while warm.",
              "Melt 2 tbsp butter in a flat pan, sauté chopped onions and ginger-garlic paste until golden brown.",
              "Add chopped tomatoes, salt, and Pav Bhaji Masala. Sauté until tomatoes are mushy.",
              "Pour in the mashed vegetables along with a splash of water, mixing vigorously.",
              "Simmer on medium flame for 10 minutes, mashing continuously to get a thick cohesive bhaji. Stir in fresh butter.",
              "Toast pav buns with butter on the tawa and serve hot garnished with raw onions and lemon."
            ],
            chatResponse: {
              "English": "Here is the ultimate Mumbai Street Style Pav Bhaji! Thick, spiced mashed vegetables topped with fresh butter and served with hot buns.",
              "Bengali": "Mumbai-style butter Pav Bhaji ready! Sakaler jolkhabar ekdom jome jabe.",
              "Hindi": "Garam aur chatpati Mumbai Pav Bhaji taiyar hai! Dher saare makkhan aur garam buttery buns ke saath subah ya shaam ka shaandar nashta.",
              "Hinglish": "Mumbai street-style butter Pav Bhaji ready hai! Spiced mashed vegetables, melted butter aur toasted pavs ka pairing sabka favorite snack hai.",
              "Oriya": "Pav Bhaji prastuta karichi! Butter sahita eha khub swadist o tasty achhi."
            }
          }
        ]
      },
      "Light Comfort 🥣": {
        "Lunch/Dinner 🍽️": [
          {
            title: "Pithla Bhakri & Garlic Thecha",
            time: "20 MINS",
            complexity: "EASY",
            tag: "MAHARASHTRIAN",
            ingredients: [
              "Gram Flour / Besan (1 cup)",
              "Green chilies & Garlic (chopped)",
              "Mustard seeds (1/2 tsp)",
              "Oil (2 tbsp)",
              "Hing (a pinch)",
              "Bhakri flour (for Jowar Bhakri)"
            ],
            steps: [
              "Whisk gram flour (Besan) with salt, turmeric, and 2.5 cups of water into a smooth lump-free batter.",
              "Heat oil in a pan. Temper with mustard seeds, chopped green chilies, garlic, and a pinch of Hing.",
              "Sauté chopped onions until soft. Gradually pour in the besan batter while stirring constantly.",
              "Cook on low heat, cover, and steam-cook for 10 minutes until the gram flour is fully cooked and thick.",
              "Garnish with coriander. Serve warm with soft jowar bhakri and spicy garlic-chili paste (Thecha)."
            ],
            chatResponse: {
              "English": "Homestyle Pithla Bhakri with spicy Thecha is ready! A daily, light, digestible Maharashtrian comfort meal.",
              "Bengali": "Gharer chacha Pithla Bhakri ready! Gorom gorom simple comfort food.",
              "Hindi": "Comforting Pithla Bhakri aur teekha Thecha taiyar hai! Subah ke dinner ke liye ekdum light aur shuddh gaon ka swad.",
              "Hinglish": "Daily comfort Pithla Bhakri ready hai! Gram flour batter cooked with garlic, mustard and green chilies served with jowar bhakri is extremely light and highly digestible.",
              "Oriya": "Pithla Bhakri ready karichi! Eha khub light o stomach friendly dinner achhi."
            }
          }
        ],
        "Breakfast/Snacks ☕": [
          {
            title: "Sabudana Khichdi (Sago Pearl Pilaf)",
            time: "15 MINS",
            complexity: "EASY",
            tag: "FASTING LIGHT",
            ingredients: [
              "Sago Pearls / Sabudana (1.5 cups, soaked overnight)",
              "Roasted Peanuts (1/2 cup, crushed)",
              "Potato (1, cut into tiny cubes)",
              "Ghee (1.5 tbsp)",
              "Cumin seeds (1 tsp)",
              "Green Chilies (chopped)"
            ],
            steps: [
              "Ensure sabudana is soaked perfectly and is soft to touch, then toss with crushed roasted peanuts, salt, and sugar.",
              "Heat ghee in a pan, fry tiny potato cubes until cooked and crispy, then drain.",
              "In the remaining ghee, temper with cumin seeds and split green chilies.",
              "Slide in the sabudana-peanut mixture and cook on low heat, stirring gently to prevent sticking.",
              "Cover and steam-cook for 5 minutes on low flame until the pearls turn translucent. Serve hot."
            ],
            chatResponse: {
              "English": "Light and fluffy Sabudana Khichdi is ready! Perfect, non-sticky sago pearls for a quick, gluten-free breakfast.",
              "Bengali": "Niramish o gorom Sabudana Khichri ready! Jolkhabare khete khub swadist o halka.",
              "Hindi": "Healthy aur non-sticky Sabudana Khichdi taiyar hai! Subah ke jhatpat nashte ke liye ekdum soft aur energetic.",
              "Hinglish": "Fasting special Sabudana Khichdi ready hai! Ghee-cumin tempered non-sticky sago pearls with crunchy roasted peanuts is highly digestible and gluten-free.",
              "Oriya": "Sabudana Khichdi ready karichi! Peanuts o potatoes sahita eha khub light o tasty achhi."
            }
          }
        ]
      }
    },
    "Jain Special": {
      "Spicy Feast 🌶️": {
        "Lunch/Dinner 🍽️": [
          {
            title: "Jain Stuffed Vangi & Phulka (No Roots/Garlic)",
            time: "30 MINS",
            complexity: "MEDIUM",
            tag: "JAIN SHAHI",
            ingredients: [
              "Small Brinjals (4-5)",
              "Roasted Peanuts (1/2 cup, ground)",
              "Sesame seeds (1 tbsp)",
              "Marathi Goda Masala (1.5 tbsp)",
              "Ghee (2 tbsp)",
              "Hing & Cumin seeds"
            ],
            steps: [
              "Slit small brinjals crosswise, keeping stems intact.",
              "Mix ground peanuts, toasted sesame seeds, Goda Masala, salt, tamarind paste, and a pinch of Hing to form a stuffing.",
              "Stuff the brinjals carefully with the peanut-sesame mixture.",
              "Heat ghee in a pan, temper with cumin seeds and a pinch of Hing (omit garlic/roots).",
              "Sauté stuffed brinjals for 5 minutes, add remaining peanut paste, 1 cup of warm water, cover, and simmer for 15 minutes until tender."
            ],
            chatResponse: {
              "English": "Royal Jain Bharli Vangi with soft phulkas is ready! Small brinjals stuffed with peanut-sesame paste prepared without onion, garlic, or root vegetables.",
              "Bengali": "Niramish o swadisht Jain Bharli Vangi ready! Gorom gorom phulkas er sathe darun hobe.",
              "Hindi": "Shuddh Jain Bharli Vangi taiyar hai! Mungfali aur nariyal ke masaledar stuffing se prepared soft baingan bina lehsun pyaaz ke.",
              "Hinglish": "Jain style Stuffed Vangi ready hai! Spiced peanut filling stuffed in small eggplants (no roots, onion, garlic) soft phulkas ke sath best shuddh tasty veg dinner option hai.",
              "Oriya": "Jain Bharli Vangi ready karichi! Eha khub swadist o shuddh achhi."
            }
          }
        ],
        "Breakfast/Snacks ☕": [
          {
            title: "Jain Sabudana Vada (Sago Fritters)",
            time: "20 MINS",
            complexity: "MEDIUM",
            tag: "JAIN DEEPFRY",
            ingredients: [
              "Soaked Sabudana (2 cups)",
              "Roasted Peanuts (1/2 cup, ground)",
              "Coriander & Green chilies (chopped)",
              "Ghee / Oil (for frying)",
              "Salt & Cumin seeds"
            ],
            steps: [
              "Mix soft soaked sabudana with ground peanuts, chopped green chilies, coriander, salt, and cumin seeds (avoid potato/roots).",
              "Mash a small portion of the mixture to form a cohesive dough.",
              "Divide into small balls, flatten them slightly between your palms to form patties.",
              "Heat oil/ghee in a deep frying pan (Kadhai).",
              "Deep fry the patties on medium-high heat until golden-brown and crispy on both sides. Serve hot with green chutney."
            ],
            chatResponse: {
              "English": "Crispy Jain Sabudana Vadas are ready for breakfast! Crunchy sago fritters prepared without potato/roots.",
              "Bengali": "Moshladar o crispy Jain Sabudana Vada ready! Bikeler and jolkhabarer treat.",
              "Hindi": "Garam aur crispy Jain Sabudana Vada taiyar hai! Subah ke shuddh nashte ke liye ekdum jhatpat aur crunchy choice.",
              "Hinglish": "Jain style crispy Sabudana Vada ready hai! Potato-free sago patties fried to golden perfection, mint chutney ke sath subah ka perfect shuddh start hai.",
              "Oriya": "Sabudana Vada ready karichi! Mint chutney sahita eha khub tasty o crispy achhi."
            }
          }
        ]
      },
      "Light Comfort 🥣": {
        "Lunch/Dinner 🍽️": [
          {
            title: "Jain Pithla & Rice (Omit Onion/Garlic/Roots)",
            time: "20 MINS",
            complexity: "EASY",
            tag: "JAIN COMFORT",
            ingredients: [
              "Gram Flour / Besan (1 cup)",
              "Mustard seeds (1/2 tsp)",
              "Ghee (1.5 tbsp)",
              "Hing (a pinch)",
              "Green chilies & Coriander",
              "Turmeric & Salt"
            ],
            steps: [
              "Whisk gram flour with salt, turmeric, and 2.5 cups of water into a smooth batter.",
              "Heat ghee in a pan. Temper with mustard seeds, green chilies, and a pinch of Hing (omit garlic/roots).",
              "Gradually pour in the besan batter while stirring continuously to prevent lumps.",
              "Cook on low heat, cover, and steam-cook for 10 minutes until gram flour is thick and cooked.",
              "Serve this warm, comforting Pithla over warm steamed rice."
            ],
            chatResponse: {
              "English": "Homestyle Jain Pithla with steamed rice is ready! Light, comforting, and prepared strictly without onion, garlic, or root vegetables.",
              "Bengali": "Gorom gorom Jain Pithla o Bhaat ready! Sorir o pet er shanti.",
              "Hindi": "Halki aur shuddh Jain Pithla aur chawal taiyar hai! Pet ke liye comfort aur digest karne me behad sahaj.",
              "Hinglish": "Jain style yellow Pithla and steamed Rice ready hai! Ghee-Hing tempered gram flour (no garlic, onion) is very light and comforting for family comfort meals.",
              "Oriya": "Jain Pithla o Bhata ready karichi! Eha khub light o stomach friendly achhi."
            }
          }
        ],
        "Breakfast/Snacks ☕": [
          {
            title: "Jain Sabudana Khichdi (Omit Potato/Roots)",
            time: "15 MINS",
            complexity: "EASY",
            tag: "FASTING JAIN",
            ingredients: [
              "Soaked Sabudana (1.5 cups)",
              "Roasted Peanuts (1/2 cup, ground)",
              "Green Peas (1/4 cup)",
              "Ghee (1 tbsp)",
              "Cumin seeds & Green chilies"
            ],
            steps: [
              "Toss soaked sabudana with ground roasted peanuts, salt, and a pinch of sugar.",
              "Heat ghee in a pan. Temper with cumin seeds and split green chilies.",
              "Add green peas and sauté for 2 minutes (avoid potatoes/roots).",
              "Slide in the sabudana-peanut mixture, tossing gently on low heat.",
              "Cover and steam-cook for 5 minutes until the sago pearls are translucent and soft. Serve warm."
            ],
            chatResponse: {
              "English": "Fluffy Jain Sabudana Khichdi is ready! Prepared without potato or root vegetables for a quick and light breakfast.",
              "Bengali": "Gorom o halka Jain Sabudana Khichri ready! Jolkhabare khete khub swadist.",
              "Hindi": "Halka aur shuddh Jain Sabudana Khichdi taiyar hai! Subah ke jhatpat nashte ke liye ekdum soft aur non-sticky.",
              "Hinglish": "Jain style Sabudana Khichdi ready hai! Potato-free sago pearls cooked with ghee, peanuts and peas (no roots) breakfast ke liye ekdum light, fast and digestible choice hai.",
              "Oriya": "Jain Sabudana Khichdi ready karichi! Peanuts o peas sahita eha bahut tasty achhi."
            }
          }
        ]
      }
    }
  },
  "Odisha": {
    "Vegetarian": {
      "Spicy Feast 🌶️": {
        "Lunch/Dinner 🍽️": [
          {
            title: "Odisha Dalma (Spiced Lentil Veg Stew)",
            time: "30 MINS",
            complexity: "MEDIUM",
            tag: "ODIA TRADITION",
            ingredients: [
              "Toor Dal (1 cup)",
              "Mixed Vegetables: Raw banana, papaya, pumpkin, eggplant (2 cups, cubed)",
              "Ghee (2 tbsp)",
              "Pancha Phutana / Five spice blend (1 tsp)",
              "Ginger paste (1 tbsp)",
              "Roasted Cumin-Chili Powder / Bhaja Masala (1.5 tsp)",
              "Coconut Shards (1/4 cup)"
            ],
            steps: [
              "Pressure cook washed dal and cubed vegetables together with turmeric, salt, ginger paste, and 3 cups of water for 3 whistles until vegetables are soft.",
              "Whisk lightly, ensuring vegetables remain in soft chunks.",
              "Heat ghee in a pan. Temper with Pancha Phutana seeds, dry red chilies, and a bay leaf.",
              "Pour the hot ghee tempering into the dal-vegetable stew and stir.",
              "Stir in roasted cumin-chili powder (Odia Bhaja Masala) and fresh coconut shards.",
              "Simmer for 3 minutes and serve hot with steamed rice or flatbreads."
            ],
            chatResponse: {
              "English": "Here is your authentic Odisha Dalma! A nutritious, spiced lentil and vegetable stew packed with traditional Odia Bhaja Masala.",
              "Bengali": "Darun swadisht Odia Dalma ready! Gorom gorom dal-er moddhe shobcheye bhalo sastho-kor ranna.",
              "Hindi": "Shaandar Odia Dalma taiyar hai! Traditional pancha phutana aur ghee ka tadka lagakar banai gayi dal aur sabziyo ki gravy.",
              "Hinglish": "Odia special Dalma ready hai! Traditional pancha phutana and ghee tempered yellow lentils and seasonal veggies is a highly nutritious and authentic Odia main course.",
              "Oriya": "Apana nka pain tasty Odisha traditional Dalma ready karichi! Arua anna o ghee sahita Dalma prastuta hoichhi."
            }
          }
        ],
        "Breakfast/Snacks ☕": [
          {
            title: "Odia Suji Kakara Pitha",
            time: "25 MINS",
            complexity: "MEDIUM",
            tag: "ODIA SWEET",
            ingredients: [
              "Semolina / Suji (1 cup)",
              "Grated Coconut (1 cup)",
              "Jaggery / Guda (1/2 cup)",
              "Cardamom Powder (1/2 tsp)",
              "Ghee / Oil (for deep frying)"
            ],
            steps: [
              "Sauté grated coconut with jaggery and cardamom powder in a pan until it turns golden-brown and sticky. Let cool to form the stuffing.",
              "Boil 2 cups of water with a pinch of salt, 1 tsp ghee, and 1 tbsp sugar.",
              "Gradually add semolina (Suji) while stirring constantly on low heat to form a smooth, soft dough.",
              "Allow the dough to cool slightly, then knead well while warm.",
              "Divide into balls, stuff with the sweet coconut-jaggery mixture, flatten slightly, and deep-fry in hot oil until golden-brown and crispy."
            ],
            chatResponse: {
              "English": "Sweet and crispy Odia Suji Kakara Pitha is ready! Perfect crispy semolina fritter stuffed with jaggery coconut.",
              "Bengali": "Gorom and mishti Odia Kakara Pitha ready! Jolkhabar ba evening snack er darun treat.",
              "Hindi": "Shaandar Odia Suji Kakara Pitha taiyar hai! Crispy sweet semolina wrap stuffed with coconut-jaggery.",
              "Hinglish": "Odia traditional Suji Kakara Pitha ready hai! Sweet jaggery-coconut filled crispy semolina fritters subah ka best traditional sweet breakfast option hai.",
              "Oriya": "Tasty Suji Kakara Pitha ready karichi! Garam garam Kakara khub swadist lagiba."
            }
          }
        ]
      },
      "Light Comfort 🥣": {
        "Lunch/Dinner 🍽️": [
          {
            title: "Odia Santula & Phulka (Light Steeved Veg)",
            time: "20 MINS",
            complexity: "EASY",
            tag: "ODIA LIGHT",
            ingredients: [
              "Mixed Vegetables: Raw papaya, raw banana, eggplant, pointed gourd, potato (2 cups, sliced)",
              "Milk (1/2 cup)",
              "Pancha Phutana (1/2 tsp)",
              "Oil (1 tbsp)",
              "Ginger (1 tsp, crushed)",
              "Green chilies & Garlic"
            ],
            steps: [
              "Boil the sliced vegetables with salt, turmeric, and 1 cup of water until they are 80% tender.",
              "Heat oil in a pan, temper with Pancha Phutana seeds, crushed ginger, garlic, and green chilies.",
              "Add the boiled vegetables along with the cooking water and sauté on medium-high heat.",
              "Pour in the milk and bring to a gentle boil (milk keeps the gravy light and creamy).",
              "Simmer covered on low heat for 5 minutes until vegetables are fully tender, and serve with soft phulkas."
            ],
            chatResponse: {
              "English": "Enjoy this comforting, light Odia Santula with soft phulkas! Easy on the stomach and highly nutritious.",
              "Bengali": "Niramish o gorom Odia Santula ready! Gorom gorom ruti-r sathe darun comfort khabar.",
              "Hindi": "Halka aur paushtik Odia Santula taiyar hai! Pet ke liye comforting aur bilkul low-oil healthy sabzi.",
              "Hinglish": "Comforting Odia Santula ready hai! Light spiced milk-based vegetable stew is highly digestible and perfect comfort dinner for elders.",
              "Oriya": "Apona nka pain swadist Odisha Santula ready karichi! Eha khub light o healthy achhi."
            }
          }
        ],
        "Breakfast/Snacks ☕": [
          {
            title: "Odia Chakuli Pitha (Odia Dosa)",
            time: "15 MINS",
            complexity: "EASY",
            tag: "ODIA START",
            ingredients: [
              "Rice & Black Gram batter (2 cups, fermented)",
              "Oil / Ghee (for roasting)",
              "Ginger (optional, grated)",
              "Fennel seeds (1/2 tsp)"
            ],
            steps: [
              "Mix fermented rice-dal batter with salt and fennel seeds.",
              "Heat a flat non-stick griddle (Tawa), pour a ladle of batter, and spread into a medium-thick circle.",
              "Drizzle ghee around the edges and cook on medium-low flame.",
              "Cook until golden-brown and crispy on the bottom, then flip and cook the other side for 1 minute.",
              "Serve hot Chakuli Pitha with warm dalma or sweet coconut chutney."
            ],
            chatResponse: {
              "English": "Crispy, soft Odia Chakuli Pitha is ready for breakfast! A traditional fermented crepe easy on the stomach.",
              "Bengali": " Gorom Chakuli Pitha ready! Doi ba cholar dal diye jolkhabarer shobcheye bhalo choice.",
              "Hindi": "Garam aur naram Odia Chakuli Pitha taiyar hai! Subah ke shuddh nashte ke liye ekdum light aur digestible.",
              "Hinglish": "Traditional Odia Chakuli Pitha ready hai! Soft rice-dal crepes served with sweet coconut chutney morning breakfast ke liye super light and healthy choice hai.",
              "Oriya": "Garam garam Chakuli Pitha sahita coconut chutney ready karichi! Subha sakala jolkhaba."
            }
          }
        ]
      }
    },
    "Non-Vegetarian": {
      "Spicy Feast 🌶️": {
        "Lunch/Dinner 🍽️": [
          {
            title: "Odia Machha Besara (Mustard Fish Curry)",
            time: "25 MINS",
            complexity: "MEDIUM",
            tag: "ODIA CLASSIC",
            ingredients: [
              "Fresh Fish Steaks (500g, Rohu)",
              "Mustard paste (Odia style with garlic & cumin, 3 tbsp)",
              "Mustard Oil (4 tbsp)",
              "Ambula / Dried Mango slice (2, soaked)",
              "Pancha Phutana (1/2 tsp)",
              "Turmeric & Green chilies"
            ],
            steps: [
              "Marinate fish steaks with salt and turmeric powder for 10 minutes.",
              "Shallow fry the fish steaks lightly in hot mustard oil on both sides, then set aside.",
              "In the remaining oil, temper with Pancha Phutana seeds, dry red chilies, and split green chilies.",
              "Mix the Odia mustard-garlic-cumin paste with 1/2 cup warm water, pour it into the pan, and bring to a simmer.",
              "Add soaked Ambula (dried mango) slices for that signature tangy Odia kick.",
              "Slide in the fried fish steaks, cover, and cook on low heat for 5 minutes until the gravy coats the fish. Serve hot with steamed rice."
            ],
            chatResponse: {
              "English": "Here is your authentic Odia Machha Besara! A tangy, pungent mustard fish curry spiced with local Pancha Phutana and sour Ambula.",
              "Bengali": "Odia style Machha Besara ready! Tok-jhal mustard gravy bhater sathe darun lagbe.",
              "Hindi": "Odia style Machha Besara taiyar hai! Mustard-garlic paste aur ambula ke khatte flavor ke saath authentic fish curry.",
              "Hinglish": "Odia street style Machha Besara ready hai! Pungent mustard paste, local pancha phutana and dried sour mango (ambula) cooked with Rohu fish is incredibly delicious.",
              "Oriya": "Odia Machha Besara o Bhata ready karichi! Garam bhata sahita Besara bhala lagiba."
            }
          }
        ],
        "Breakfast/Snacks ☕": [
          {
            title: "Odia Egg Chakuli Roll",
            time: "15 MINS",
            complexity: "EASY",
            tag: "ODIA SNACK",
            ingredients: [
              "Chakuli batter (2 ladles)",
              "Eggs (2)",
              "Onions & Green chilies (chopped)",
              "Lemon juice & Chaat Masala",
              "Ghee (1 tbsp)"
            ],
            steps: [
              "Pour chakuli batter onto a hot tawa and spread to make a medium-thick crepe.",
              "Whisk egg with salt and chopped chilies. Pour over the chakuli crepe while it is wet.",
              "Flip, drizzle ghee, and cook until the egg is completely golden-brown and set.",
              "Top with raw chopped onions, fresh coriander, chaat masala, and a squeeze of fresh lemon juice.",
              "Roll tightly and serve immediately with hot tea."
            ],
            chatResponse: {
              "English": "A hot Odia Egg Chakuli Roll is ready! A nutritious, street-style savory snack.",
              "Bengali": "Gorom and spicy Egg Chakuli Roll ready! Bikeler fast and tasty treat.",
              "Hindi": "Masaledar Odia Egg Chakuli Roll taiyar hai! Subah ya shaam ke nashte ke liye ekdum heavy and energetic.",
              "Hinglish": "Odia style Egg Chakuli Roll ready hai! Fluffy chakuli crepe and masala scrambled egg roll is a highly energetic high-protein snack option.",
              "Oriya": "Egg Chakuli Roll prastuta karichi! Eha khub tasty o quick snack achhi."
            }
          }
        ]
      },
      "Light Comfort 🥣": {
        "Lunch/Dinner 🍽️": [
          {
            title: "Odia Homestyle Egg Curry & Bhat",
            time: "25 MINS",
            complexity: "EASY",
            tag: "ODIA COMFORT",
            ingredients: [
              "Boiled Eggs (4)",
              "Onions & Tomatoes (finely chopped)",
              "Pancha Phutana (1/2 tsp)",
              "Refined Oil (2 tbsp)",
              "Ginger-Garlic Paste (1 tsp)",
              "Turmeric & Chili powder"
            ],
            steps: [
              "Prick boiled eggs, fry lightly in a pinch of turmeric and oil, then set aside.",
              "Heat oil, temper with Pancha Phutana seeds.",
              "Sauté chopped onions and ginger-garlic paste until brown, then add tomatoes and cook until mushy.",
              "Stir in basic homestyle spices and 1.5 cups of warm water. Bring to a boil.",
              "Slide in the fried eggs, cover, and cook on low-medium flame for 8 minutes until light and flavorful.",
              "Serve warm with steamed rice."
            ],
            chatResponse: {
              "English": "Homestyle Odia Egg Curry with steamed rice is ready! Light, comforting, and perfect for daily lunch.",
              "Bengali": "Gharer chacha Dim er Jhol o Bhaat ready! Bhaater sathe khub comforting lagbe.",
              "Hindi": "Homestyle Odia Egg Curry aur chawal taiyar hai! Pancha phutana ke flavor ki light masaledar curry.",
              "Hinglish": "Homestyle Odia Egg Curry and Rice ready hai! Light pancha phutana tempered onion-tomato gravy eggs and steamed rice is a perfect quick comfort lunch option.",
              "Oriya": "Egg Curry o Bhata ready karichi! Eha khub light o stomach friendly achhi."
            }
          }
        ],
        "Breakfast/Snacks ☕": [
          {
            title: "Odia Egg Omelette & Chakuli Pitha",
            time: "10 MINS",
            complexity: "EASY",
            tag: "QUICK breakfast",
            ingredients: [
              "Eggs (2)",
              "Chakuli batter (2 ladles)",
              "Onion & Green chilies (chopped)",
              "Butter (1 tbsp)"
            ],
            steps: [
              "Whisk eggs with chopped onions, green chilies, salt, and cumin powder.",
              "Melt butter in a pan, pour in the egg batter, and fry a fluffy masala omelette.",
              "Spread chakuli batter on a tawa and roast a soft, fluffy Chakuli Pitha.",
              "Serve the hot fluffy omelette folded alongside the warm Chakuli Pitha."
            ],
            chatResponse: {
              "English": "A hot, fluffy egg omelette and soft Chakuli Pitha are ready for breakfast! Quick, healthy, and high-protein.",
              "Bengali": "Dim er Omelette o gorom Chakuli ready! Sakaler chhotpoto jolkhabar.",
              "Hindi": "Masala Omelette aur soft Chakuli Pitha taiyar hai! Subah ka ekdum fast aur high-protein nashta.",
              "Hinglish": "Odia style Masala Omelette and hot Chakuli Pitha ready hai! High-protein, spicy and filling breakfast jo 10 minutes me ban jata hai.",
              "Oriya": "Omelette sahita Chakuli Pitha ready karichi! Garam garam khub swadist lagiba."
            }
          }
        ]
      }
    },
    "Jain Special": {
      "Spicy Feast 🌶️": {
        "Lunch/Dinner 🍽️": [
          {
            title: "Jain Odia Dalma (Omit Roots/Alliums)",
            time: "30 MINS",
            complexity: "MEDIUM",
            tag: "JAIN DALMA",
            ingredients: [
              "Toor Dal (1 cup)",
              "Mixed Vegetables: Raw banana, raw papaya, pumpkin, eggplant (2 cups, cubed)",
              "Ghee (2 tbsp)",
              "Pancha Phutana (1 tsp)",
              "Hing (a pinch)",
              "Bhaja Masala (1.5 tsp)",
              "Coconut Shards (1/4 cup)"
            ],
            steps: [
              "Pressure cook washed dal and cubed vegetables (raw papaya, raw banana, pumpkin, eggplant - avoid potatoes/roots) with turmeric, salt, and 3 cups of water for 3 whistles.",
              "Whisk lightly, ensuring vegetables remain soft but intact.",
              "Heat ghee in a pan. Temper with Pancha Phutana seeds, dry red chilies, and a pinch of Hing.",
              "Pour the hot ghee tempering into the dal-vegetable stew.",
              "Stir in roasted cumin-chili powder (Odia Bhaja Masala) and fresh coconut shards.",
              "Simmer for 3 minutes and serve hot with steamed rice or phulkas."
            ],
            chatResponse: {
              "English": "A shuddh Jain Odisha Dalma is ready! Rich lentil-vegetable stew preparedstrictly without root vegetables, onion, or garlic.",
              "Bengali": "Niramish Jain Odia Dalma ready! Gorom gorom sastho-kor ranna.",
              "Hindi": "Shuddh Jain Odia Dalma taiyar hai! Bina pyaaz aur root veggies ke banaya gaya nutritious aur swadisht lentil stew.",
              "Hinglish": "Jain style Odia Dalma ready hai! Traditional pancha phutana and ghee tempered yellow lentils and green veggies (no roots) is highly nutritious and shuddh.",
              "Oriya": "Jain traditional Dalma ready karichi! Arua anna o Dalma prastuta hoichhi."
            }
          }
        ],
        "Breakfast/Snacks ☕": [
          {
            title: "Jain Suji Manda Pitha",
            time: "25 MINS",
            complexity: "MEDIUM",
            tag: "JAIN SWEET",
            ingredients: [
              "Semolina / Suji (1 cup)",
              "Grated Coconut (1 cup)",
              "Sugar / Jaggery (1/2 cup)",
              "Cardamom Powder (1/2 tsp)",
              "Ghee (for roasting)"
            ],
            steps: [
              "Sauté grated coconut with sugar and cardamom powder in a pan until it turns golden-brown. Let cool.",
              "Boil 2 cups of water with a pinch of salt, 1 tsp ghee, and 1 tbsp sugar.",
              "Add semolina slowly while stirring constantly to form a soft dough, then knead well while warm.",
              "Divide into balls, stuff with the sweet coconut mixture, flatten, and deep-fry or steam-cook until done."
            ],
            chatResponse: {
              "English": "Sweet and soft Jain Suji Manda Pitha is ready! A delicious steamed semolina dessert stuffed with jaggery coconut.",
              "Bengali": "Niramish gorom Suji Manda Pitha ready!jolkhabare khete khub swadist.",
              "Hindi": "Shaandar Jain Suji Manda Pitha taiyar hai! Subah ke shuddh nashte ke liye ekdum sweet aur soft choice.",
              "Hinglish": "Jain style sweet Manda Pitha ready hai! Cardamom-coconut filled steamed semolina dumplings morning breakfast ke liye super light and shuddh choice.",
              "Oriya": "Suji Manda Pitha ready karichi! Eha khub tasty o niramish sweets achhi."
            }
          }
        ]
      },
      "Light Comfort 🥣": {
        "Lunch/Dinner 🍽️": [
          {
            title: "Jain Odia Santula (Omit Onion/Garlic/Roots)",
            time: "20 MINS",
            complexity: "EASY",
            tag: "JAIN COMFORT",
            ingredients: [
              "Mixed Vegetables: Raw papaya, raw banana, pointed gourd, pumpkin (2 cups, sliced)",
              "Milk (1/2 cup)",
              "Pancha Phutana (1/2 tsp)",
              "Ghee (1 tbsp)",
              "Hing (a pinch)",
              "Green chilies & Coriander"
            ],
            steps: [
              "Boil sliced vegetables (raw papaya, raw banana, pointed gourd, pumpkin - avoid potato/roots) with salt, turmeric, and 1 cup of water until tender.",
              "Heat ghee in a pan. Temper with Pancha Phutana seeds, green chilies, and a pinch of Hing.",
              "Add the boiled vegetables and cook on medium heat.",
              "Pour in the milk and bring to a gentle boil.",
              "Simmer covered on low heat for 5 minutes until fully tender, and serve with soft phulkas."
            ],
            chatResponse: {
              "English": "Homestyle Jain Odia Santula is ready! Light, comforting, and prepared strictly without onion, garlic, or root vegetables.",
              "Bengali": "Halka and gorom Jain Odia Santula ready! Sorir o pet er shanti.",
              "Hindi": "Halki aur shuddh Jain Odia Santula taiyar hai! Pet ke liye comfort aur digest karne me behad sahaj.",
              "Hinglish": "Jain style Santula and phulkas ready hai! Ghee-Hing tempered veggie stew cooked in light milk (no garlic, onion, roots) is highly comforting.",
              "Oriya": "Jain Santula ready karichi! Eha khub light o healthy dinner achhi."
            }
          }
        ],
        "Breakfast/Snacks ☕": [
          {
            title: "Jain Chakuli Pitha & Coconut Chutney",
            time: "15 MINS",
            complexity: "EASY",
            tag: "JAIN LIGHT",
            ingredients: [
              "Fermented Rice & Black gram batter (2 cups)",
              "Ghee (1 tbsp)",
              "Coconut (1/2 cup, grated for chutney)",
              "Green chilies & Coriander"
            ],
            steps: [
              "Whisk fermented batter with salt and cumin seeds.",
              "Heat flat tawa, spread a ladle of batter into a circular crepe, and drizzle ghee around the edges.",
              "Roast until golden-brown and crispy, flip, and cook for 1 minute.",
              "Grind coconut, green chilies, salt, and water to a thick chutney (avoid ginger/roots).",
              "Serve hot Chakuli Pitha alongside the fresh coconut chutney."
            ],
            chatResponse: {
              "English": "A fluffy, soft Jain Chakuli Pitha is ready! Perfect light breakfast crepe served with fresh coconut chutney.",
              "Bengali": "Gorom and soft Chakuli ready! Niramish o halka jolkhabarer treat.",
              "Hindi": "Healthy Jain Chakuli Pitha taiyar hai! Subah ke shuddh nashte ke liye ekdum soft aur digestible.",
              "Hinglish": "Jain style Chakuli Pitha ready hai! Rice-dal crepes cooked with ghee paired with fresh coconut chutney (no roots) breakfast ke liye ekdum light and digestible.",
              "Oriya": "Jain Chakuli Pitha o Chutney ready karichi! Subha sakala jolkhaba."
            }
          }
        ]
      }
    }
  },

  // ═══════════════════════════════════════════════════════════
  // TAMIL NADU
  // ═══════════════════════════════════════════════════════════
  "Tamil Nadu": {
    "Non-Vegetarian": {
      "Spicy Feast 🌶️": {
        "Lunch/Dinner 🍽️": [
          {
            title: "Chettinad Chicken Curry (Kozhi Kuzhambu)",
            time: "50 MINS",
            complexity: "ELABORATE",
            tag: "CHETTINAD SPECIAL",
            ingredients: [
              "Country Chicken (700g, cut into pieces)",
              "Freshly ground Kalpasi, Star anise & Marathi Mokku",
              "Coconut (1/2 cup, grated for paste)",
              "Tomatoes (3, chopped)",
              "Chettinad Kuzhambu Milagai (Red dried chili, 6-8)",
              "Ginger-Garlic paste (2 tbsp)",
              "Curry leaves (2 sprigs)"
            ],
            steps: [
              "Dry roast Kalpasi, Marathi Mokku, Star anise, fennel, and coriander seeds together until fragrant. Grind to a fine Chettinad masala powder.",
              "Blend the grated coconut with 2 dried red chilies and a little water into a smooth, thick paste.",
              "Heat oil in a kadhai. Sauté thinly sliced onions until deeply golden brown.",
              "Add ginger-garlic paste and cook for 3 minutes. Add chopped tomatoes and cook until mushy and oil floats.",
              "Add the freshly ground Chettinad masala, turmeric, and mix well for 2 minutes.",
              "Add chicken pieces and sear on high heat for 5 minutes, stirring constantly.",
              "Pour in 1.5 cups warm water, add the coconut paste, curry leaves, salt, and stir. Cover and cook on medium heat for 25 minutes until chicken is cooked through and oil separates on top.",
              "Garnish with fresh curry leaves and serve hot with steamed Seeraga samba rice or Parotta."
            ],
            chatResponse: {
              "English": "Here is a fiery authentic Chettinad Chicken Curry! Made with the rare Kalpasi and Marathi Mokku spices for an unmatched depth of flavor.",
              "Bengali": "Aponar jonne ekta darun Chettinad Chicken Curry! Dakshin Bharotiyo moshola diye tairi, khub jhaal ar darun swaad.",
              "Hindi": "Behtareen Chettinad Chicken Curry taiyar hai! Rare Kalpasi aur Marathi Mokku masalon se bana ek unforgettable spicy South Indian curry.",
              "Hinglish": "Authentic Chettinad Chicken Curry ready hai! Rare spices se bana, itna spicy aur aromatic ki dil khush ho jaye. Parotta ya rice ke saath best hai!",
              "Oriya": "Tasty Chettinad Chicken Curry ready karichi! Dakhina Bharatiya special masala sahita bahut spicy o swadist."
            }
          },
          {
            title: "Meen Kuzhambu (Tamil Fish Curry in Tamarind)",
            time: "35 MINS",
            complexity: "MEDIUM",
            tag: "COASTAL SPECIAL",
            ingredients: [
              "Kingfish or Seer Fish (500g, sliced)",
              "Tamarind (large gooseberry sized, soaked)",
              "Tomatoes (2, chopped)",
              "Sambar onions / shallots (10-12, whole)",
              "Coconut Oil (3 tbsp)",
              "Red chili powder (2 tsp)",
              "Curry leaves & Fenugreek seeds"
            ],
            steps: [
              "Extract a thick, dark tamarind water from the soaked tamarind.",
              "Heat coconut oil in a clay pot (manchatti) until hot. Add fenugreek seeds and curry leaves and let them splutter.",
              "Add the whole shallots and sauté until golden brown. Add tomatoes and cook until soft.",
              "Add turmeric, red chili powder, and coriander powder. Sauté for 2 minutes on medium heat.",
              "Pour in the thick tamarind water and bring to a boil. Season with salt.",
              "Gently slide in the fish pieces and cook on medium heat for 8-10 minutes until the oil floats on top and the curry thickens.",
              "Add a final drizzle of coconut oil and fresh curry leaves. Serve hot with steamed rice and papad."
            ],
            chatResponse: {
              "English": "A deeply aromatic Tamil Meen Kuzhambu is ready! Tangy tamarind, fragrant curry leaves, and fresh fish cooked in a clay pot for maximum flavor.",
              "Bengali": "Darun Tamil Fish Curry ready! Tetul ar narikel tel diye tairi, bhare bhare ekta swaad.",
              "Hindi": "Swadisht Tamil Meen Kuzhambu taiyar hai! Imli, nariyal tel aur curry leaves ka jabardast south indian flavor. Chawal ke saath perfect!",
              "Hinglish": "Tangy aur spicy Tamil Fish Curry ready hai! Tamarind base aur coconut oil se bana, clay pot me pakane se flavor aur bhi intense ho jata hai.",
              "Oriya": "Tasty Tamil Machha Kuzhambu ready! Tetula o narikel tel sahita bahut swadist."
            }
          }
        ],
        "Breakfast/Snacks ☕": [
          {
            title: "Masala Dosa with Potato Masala",
            time: "25 MINS",
            complexity: "MEDIUM",
            tag: "SOUTH INDIAN CLASSIC",
            ingredients: [
              "Fermented Dosa batter (2 cups, ready)",
              "Boiled Potatoes (4, mashed roughly)",
              "Onion (1, finely sliced)",
              "Green chilies (3, chopped)",
              "Mustard seeds, Curry leaves & Turmeric",
              "Ghee / Oil (for greasing tawa)"
            ],
            steps: [
              "For the masala: Heat oil, add mustard seeds, curry leaves, and slit green chilies. Let them splutter.",
              "Add thinly sliced onions and sauté until translucent. Add turmeric and salt, then add the roughly mashed potatoes.",
              "Mix well and cook for 3-4 minutes. The filling should be slightly chunky, not a paste.",
              "Heat a flat tawa or griddle until very hot. Drizzle a little oil and wipe with a cloth.",
              "Pour a ladle of batter in the center and spread outward in a circular motion into a very thin crepe.",
              "Drizzle ghee around the edges. When the base turns golden-crispy (2-3 minutes), place 2 spoons of potato filling on one side.",
              "Fold the dosa in half and serve immediately with fresh coconut chutney and hot sambar."
            ],
            chatResponse: {
              "English": "A perfectly crispy Masala Dosa with fluffy spiced potato filling is ready! The ultimate South Indian breakfast experience.",
              "Bengali": "Gorom gorom crispy Masala Dosa ready! Alu masala bhorti, coconut chutney ar sambar diye kheye dekhun - darun lage.",
              "Hindi": "Golden crispy Masala Dosa taiyar hai! Andar spicy aloo masala, saath me fresh coconut chutney aur garam sambar - classic south indian nashta.",
              "Hinglish": "Super crispy Masala Dosa ready hai! Iske sath garam sambar aur coconut chutney chahiye. South Indian breakfast ka king!",
              "Oriya": "Crispy Masala Dosa ready karichi! Alu masala sahita khub swadist south Indian breakfast."
            }
          }
        ]
      },
      "Light Comfort 🥣": {
        "Lunch/Dinner 🍽️": [
          {
            title: "Rasam & Rice (Pepper Tamarind Soup)",
            time: "20 MINS",
            complexity: "EASY",
            tag: "COMFORT FOOD",
            ingredients: [
              "Tomatoes (2, roughly chopped)",
              "Tamarind water (3 tbsp extract)",
              "Black peppercorns (1 tsp, coarsely ground)",
              "Cumin seeds (1 tsp)",
              "Toor dal (2 tbsp, cooked and mashed)",
              "Curry leaves & Coriander",
              "Ghee (1 tsp for tadka)"
            ],
            steps: [
              "Boil tomatoes in 2 cups water until soft. Mash and strain to get a tomato broth.",
              "Add tamarind extract, salt, turmeric, and the cooked mashed toor dal to the broth. Simmer for 5 minutes.",
              "For tadka: heat ghee, add mustard seeds, dried red chili, curry leaves, and coarsely ground pepper. Let it splutter.",
              "Pour the tadka into the rasam, add cumin powder and coriander. Simmer for 2 minutes.",
              "The rasam should be light, thin, and highly aromatic. Serve steaming hot over hot rice with ghee, or drink as a soup."
            ],
            chatResponse: {
              "English": "Comforting Rasam is ready! This light, peppery, tamarind-based soup is perfect over hot rice with a dollop of ghee for the soul.",
              "Bengali": "Halka ar aromatic Rasam ready! Sardo bhater upore ghee diye ektu rasam dhele khele darun comfort hoi.",
              "Hindi": "Garam aur digestive Rasam taiyar hai! Kali mirch aur imli ka ye halka soup chawal ke upar ghee ke saath khaane par pet ko sukoon milta hai.",
              "Hinglish": "Light aur super comforting Rasam ready hai! Chawal ke saath mix karke ghee dalo - ekdum desi comfort food hai.",
              "Oriya": "Swadist Rasam ready karichi! Pepper o tamarind sahita bahut light o digestive South Indian food."
            }
          }
        ],
        "Breakfast/Snacks ☕": [
          {
            title: "Ven Pongal (Savory Rice-Dal Porridge)",
            time: "25 MINS",
            complexity: "EASY",
            tag: "TEMPLE BREAKFAST",
            ingredients: [
              "Sona Masoori rice (1 cup)",
              "Split Moong Dal (1/4 cup)",
              "Ghee (3 tbsp generously)",
              "Black peppercorns (1 tsp, coarsely crushed)",
              "Cumin seeds (1 tsp)",
              "Ginger (1 inch, grated)",
              "Curry leaves & Cashews"
            ],
            steps: [
              "Rinse and cook rice and moong dal together with 4 cups of water in a pressure cooker for 4 whistles until mushy.",
              "Heat ghee generously in a tadka pan. Add cashews and fry until golden brown, then drain.",
              "In the same ghee, add mustard seeds, coarsely ground pepper, cumin seeds, ginger, and curry leaves. Let them splutter.",
              "Pour the entire tadka including excess ghee into the cooked rice-dal mixture.",
              "Stir vigorously on low heat, add salt to taste, and adjust consistency with warm water if needed.",
              "Serve piping hot, generously topped with fried cashews, more ghee, and coconut chutney."
            ],
            chatResponse: {
              "English": "A divine Temple-style Ven Pongal is ready! Silky soft, ghee-laden, peppered rice-lentil porridge — true South Indian comfort in a bowl.",
              "Bengali": "Garam o sohoj Ven Pongal ready! Mandir-style ghee diye baanano, ekta divine Tamil breakfast.",
              "Hindi": "Mandir jaisa Ven Pongal taiyar hai! Ghee, kali mirch aur cashew se bhari yeh soft rice-dal porridge ekdum divine lagti hai.",
              "Hinglish": "Temple style Ven Pongal ready hai! Soft mushy texture aur loads of ghee se bana, pepper aur cashew ka crunch kamaal lagta hai.",
              "Oriya": "Swadist Ven Pongal ready karichi! Ghee o moong dali sahita khub halka o tasty South Indian breakfast."
            }
          }
        ]
      }
    },
    "Vegetarian": {
      "Spicy Feast 🌶️": {
        "Lunch/Dinner 🍽️": [
          {
            title: "Sambar (Lentil & Vegetable Stew)",
            time: "30 MINS",
            complexity: "MEDIUM",
            tag: "SOUTH INDIAN STAPLE",
            ingredients: [
              "Toor Dal (3/4 cup, cooked and mashed)",
              "Tamarind (a small lime sized ball, soaked)",
              "Mixed vegetables (drumstick, eggplant, carrot, pumpkin)",
              "Sambar powder (2 tsp, good quality)",
              "Tomatoes (2, chopped)",
              "Curry leaves & Coriander",
              "Coconut Oil + Mustard seeds for tadka"
            ],
            steps: [
              "Cook the toor dal in a pressure cooker until completely soft. Mash it into a smooth paste.",
              "Extract the tamarind juice into 2 cups of warm water.",
              "In a large pot, boil the vegetables in the tamarind water until 80% cooked.",
              "Add the mashed toor dal, sambar powder, tomatoes, turmeric, and salt. Stir and bring to a boil.",
              "Simmer for 10-12 minutes until the vegetables are fully cooked and the sambar thickens to a medium consistency.",
              "Heat coconut oil for tadka: add mustard seeds, dried red chilies, and curry leaves. Pour over the sambar.",
              "Garnish with fresh coriander. Serve hot with idli, dosa, or steamed rice."
            ],
            chatResponse: {
              "English": "A rich and flavorful Tamil Sambar is ready! The backbone of South Indian cuisine — tangy, spiced, and loaded with vegetables.",
              "Bengali": "Darun Sambar ready! South Bharotiyo khabar er pran — tetul ar mishrit sabzi diye tairi, idli ba dosai-er sathe perfect.",
              "Hindi": "Tasty aur rich Sambar taiyar hai! Imli, dal aur mix sabziyon se bana, idli-dosa ke saath khaane mein south indian swad ka ananda aata hai.",
              "Hinglish": "Authentic Tamil Sambar ready hai! Tangy, thick aur vegetable loaded — idli, dosa ya chawal ke saath khaao — always works!",
              "Oriya": "Swadist Sambar ready karichi! Dali o sabji sahita South Indian staple food, idli ba dosa sahita best lagiba."
            }
          }
        ],
        "Breakfast/Snacks ☕": [
          {
            title: "Medu Vada (Crispy Urad Lentil Fritter)",
            time: "20 MINS",
            complexity: "MEDIUM",
            tag: "BREAKFAST CLASSIC",
            ingredients: [
              "Urad Dal (1 cup, soaked for 4 hours)",
              "Green chilies (2, finely chopped)",
              "Ginger (1/2 inch, grated)",
              "Curry leaves (1 sprig, finely chopped)",
              "Cumin seeds (1/2 tsp)",
              "Salt to taste",
              "Oil for deep frying"
            ],
            steps: [
              "Grind the soaked urad dal with very little water into a thick, fluffy white batter. The batter should be stiff enough to hold shape.",
              "Mix in chopped green chilies, ginger, curry leaves, cumin, and salt. Mix well.",
              "Wet your hand, take a ball of batter, flatten it slightly, and make a hole in the center like a donut.",
              "Slide it gently into hot oil (180°C) and fry on medium heat until deeply golden brown and crispy all around.",
              "Drain and serve immediately with fresh coconut chutney and piping hot sambar."
            ],
            chatResponse: {
              "English": "Crispy golden Medu Vada is ready! Donut-shaped urad lentil fritters — light inside, crunchy outside — the perfect South Indian breakfast sidekick.",
              "Bengali": "Gorom crispy Medu Vada ready! Urad dal er donut-shaped fritter, coconut chutney ar sambar diye ekdom darun jolkhabar.",
              "Hindi": "Crispy golden Medu Vada taiyar hai! Andar se fluffy, bahar se crunchy — sambar me duba ke khaao, ekdum divine lagta hai.",
              "Hinglish": "Hot crispy Medu Vada ready hai! South Indian breakfast ka champion - sambar me dip karke khaane ka maza hi alag hai!",
              "Oriya": "Crispy Medu Vada ready karichi! Urad dali fritter, sambar o chutney sahita perfect breakfast."
            }
          }
        ]
      },
      "Light Comfort 🥣": {
        "Lunch/Dinner 🍽️": [
          {
            title: "Kootu (Mixed Vegetable & Lentil Coconut Curry)",
            time: "30 MINS",
            complexity: "EASY",
            tag: "COMFORT VEG",
            ingredients: [
              "Raw Banana or Yam or Ash Gourd (300g, cubed)",
              "Chana Dal (1/4 cup, cooked)",
              "Coconut (1/2 cup, grated for grinding)",
              "Cumin seeds (1/2 tsp for grinding)",
              "Dried red chilies (2)",
              "Mustard seeds & Curry leaves for tadka"
            ],
            steps: [
              "Cook the cubed vegetable in salted water with turmeric until tender. Do not overcook.",
              "Grind grated coconut, cumin seeds, and one dry red chili into a coarse paste without adding water.",
              "Add the cooked chana dal and coconut paste to the vegetable. Mix well and cook on low heat for 5 minutes.",
              "Make tadka: heat coconut oil, add mustard seeds, remaining dry red chili, and curry leaves.",
              "Pour tadka over the kootu. Mix gently and serve as a side dish alongside sambar rice."
            ],
            chatResponse: {
              "English": "A nourishing Tamil Kootu is ready! A gentle semi-dry curry of vegetables, lentils, and coconut — perfect as a side with sambar rice.",
              "Bengali": "Halka ar postikar Kootu ready! Mishrit sabji, dal ar narikel diye tairi Tamil side dish.",
              "Hindi": "Paushtik Tamil Kootu taiyar hai! Sabzi, dal aur nariyal ka ye semi-dry curry sambar chawal ke saath khaya to kamaal laga.",
              "Hinglish": "Healthy aur yummy Kootu ready hai! Vegetable, lentil aur coconut ka combination — sambar-rice ke sath side me rakhna best hai.",
              "Oriya": "Swadist Kootu ready karichi! Sabji, dali o narikel sahita Tamil side dish."
            }
          }
        ],
        "Breakfast/Snacks ☕": [
          {
            title: "Idli with Coconut Chutney & Sambar",
            time: "20 MINS",
            complexity: "EASY",
            tag: "SOUTH CLASSIC",
            ingredients: [
              "Fermented Idli batter (2 cups, ready)",
              "Coconut (1/2 cup grated for chutney)",
              "Green chilies (2 for chutney)",
              "Ginger (1/2 inch for chutney)",
              "Tiffin sambar (1 cup ready, or packet)"
            ],
            steps: [
              "Pour idli batter into greased idli moulds, filling 3/4 full.",
              "Steam in an idli steamer for 10-12 minutes until a toothpick comes out clean.",
              "For chutney: blend coconut, green chili, ginger, salt, and a little water to a smooth paste.",
              "Temper with mustard seeds and curry leaves in coconut oil, pour over chutney.",
              "Unmould the idlis after 2 minutes, arrange on a plate with chutney and hot sambar."
            ],
            chatResponse: {
              "English": "Soft, pillowy Idlis are ready with fresh coconut chutney and hot sambar! The most beloved South Indian breakfast combo.",
              "Bengali": "Naram o soft Idli ready coconut chutney ar sambar diye! South Bharotiyo jolkhabar er ra raja.",
              "Hindi": "Soft aur fluffy Idli taiyar hai coconut chutney aur garam sambar ke saath! South Indian nashte ka sab se pyara combo.",
              "Hinglish": "Super soft Idli ready hai! Fresh coconut chutney aur garam sambar ke saath ye combination beat nahi hota. Best South Indian breakfast combo!",
              "Oriya": "Soft Idli ready karichi! Coconut chutney o sambar sahita perfect South Indian breakfast."
            }
          }
        ]
      },
      "Jain Special 📿": {
        "Lunch/Dinner 🍽️": [
          {
            title: "Jain Kootu (Jain Vegetable & Coconut Curry)",
            time: "25 MINS",
            complexity: "EASY",
            tag: "JAIN SOUTH INDIAN",
            ingredients: [
              "Pumpkin / Ash Gourd (300g, cubed, no roots)",
              "Chana Dal (1/4 cup cooked)",
              "Coconut (1/2 cup grated)",
              "Cumin & Green chilies",
              "Coconut Oil & Curry leaves for tadka"
            ],
            steps: [
              "Cook cubed pumpkin with salt and turmeric until tender.",
              "Grind coconut and cumin coarsely without water.",
              "Mix cooked dal and coconut paste into the pumpkin. Cook 5 minutes.",
              "Temper coconut oil with mustard seeds, curry leaves, and green chilies (no roots, no onion, no garlic).",
              "Pour tadka over kootu. Serve as side with plain rice."
            ],
            chatResponse: {
              "English": "A pure Jain Kootu is ready! No roots, onion, or garlic — just wholesome pumpkin, lentil, and coconut curry.",
              "Bengali": "Jain style Kootu ready! Peyaj, rosun ba kono root chara — shuddho sabji ar narikel diye tairi.",
              "Hindi": "Shudh Jain Kootu taiyar hai! Bina pyaaz, lehsun ya root vegetables ke — sirf kaddu, dal aur nariyal ka sattvik curry.",
              "Hinglish": "Pure Jain Kootu ready hai! No onion, no garlic, no roots — just simple pumpkin, chana dal aur coconut ka sattvik South Indian side dish.",
              "Oriya": "Jain Kootu ready karichi! Piaja, rasuna bina shuddha sabji o narikel sahita sattvik south Indian food."
            }
          }
        ],
        "Breakfast/Snacks ☕": [
          {
            title: "Jain Pongal (No Onion-Garlic Rice Porridge)",
            time: "20 MINS",
            complexity: "EASY",
            tag: "JAIN BREAKFAST",
            ingredients: [
              "Sona Masoori Rice (1 cup)",
              "Moong Dal (1/4 cup)",
              "Ghee (3 tbsp)",
              "Black pepper & Cumin",
              "Green Chilies (1, chopped)",
              "Cashews & Curry leaves"
            ],
            steps: [
              "Cook rice and moong dal together until very soft.",
              "Prepare tadka: heat ghee, fry cashews golden, add cumin, pepper, curry leaves, green chilies.",
              "Mix tadka into pongal, add salt, and stir on low heat.",
              "Serve hot with coconut chutney (no onion-garlic)."
            ],
            chatResponse: {
              "English": "A pure Jain Ven Pongal is ready! Sattvik South Indian breakfast without onion or garlic.",
              "Bengali": "Jain Ven Pongal ready! Peyaj-rosun chara ghee diye tairi, shuddho South Indian jolkhabar.",
              "Hindi": "Sattvik Jain Pongal taiyar hai! Bina pyaaz-lehsun ke ghee aur kali mirch se bani, ekdum temple prasad jaisi.",
              "Hinglish": "Jain Pongal ready hai! No onion, no garlic — pure sattvik ghee and pepper ka South Indian breakfast.",
              "Oriya": "Jain Pongal ready karichi! Piaja, rasuna bina ghee o moong dali sahita shuddha South Indian breakfast."
            }
          }
        ]
      }
    }
  },

  // ═══════════════════════════════════════════════════════════
  // KERALA
  // ═══════════════════════════════════════════════════════════
  "Kerala": {
    "Non-Vegetarian": {
      "Spicy Feast 🌶️": {
        "Lunch/Dinner 🍽️": [
          {
            title: "Kerala Nadan Chicken Curry (Country Chicken)",
            time: "50 MINS",
            complexity: "ELABORATE",
            tag: "KERALA NADAN",
            ingredients: [
              "Country Chicken (700g, cut into pieces)",
              "Shallots / Kunjulli (15-20, halved)",
              "Fresh Coconut (1 cup, chopped into small pieces)",
              "Kashmiri red chili (3 tsp powder)",
              "Coconut oil (4 tbsp)",
              "Curry leaves (3 sprigs)",
              "Kerala Garam Masala (1 tsp)"
            ],
            steps: [
              "Marinate chicken with turmeric, red chili powder, salt, and 1 tbsp coconut oil for 20 minutes.",
              "Heat coconut oil in a deep, heavy kadhai. Add the halved shallots and fry until deep golden brown.",
              "Add ginger-garlic paste, cook for 3 minutes. Add tomatoes and cook until mushy.",
              "Add the marinated chicken and sear on high heat, stirring, for 5 minutes.",
              "Add the small coconut pieces, curry leaves, and Kerala garam masala.",
              "Pour 1 cup warm water, cover, and slow cook for 30-35 minutes on medium-low heat.",
              "The curry should be dark, thick, and have a distinct coconut oil aroma. Serve with appam or Malabar parotta."
            ],
            chatResponse: {
              "English": "An authentic Kerala Nadan Chicken Curry is ready! Dark, rich, fragrant with coconut oil and curry leaves — the soul of Kerala cooking.",
              "Bengali": "Asol Kerala Nadan Chicken Curry ready! Narikel tel ar curry leaves er sougandhe bhore uthbeche — darun spicy ar boro swad.",
              "Hindi": "Authentic Kerala Country Chicken Curry taiyar hai! Nariyal tel, small coconut pieces aur curry leaves se bana, dark aur rich — Kerala ki soul.",
              "Hinglish": "Nadan Kerala Chicken Curry ready hai! Coconut oil ki fragrance aur curry leaves ka aroma — appam ke saath khaao, zaroor kamal lagega!",
              "Oriya": "Authentic Kerala Chicken Curry ready karichi! Narikel tela o curry leaves sahita bahut aromatic o spicy."
            }
          },
          {
            title: "Meen Pollichathu (Fish Roasted in Banana Leaf)",
            time: "40 MINS",
            complexity: "ELABORATE",
            tag: "KERALA HERITAGE",
            ingredients: [
              "Pearl Spot Fish / Karimeen (2 whole fish, scored)",
              "Coconut oil (3 tbsp)",
              "Banana leaves (for wrapping, warmed)",
              "Shallots (8, sliced thin)",
              "Tomatoes (2, finely chopped)",
              "Red chili powder & Pepper powder"
            ],
            steps: [
              "Marinate the scored fish with turmeric, red chili powder, salt, and a squeeze of lemon for 20 minutes.",
              "Shallow fry the marinated fish in coconut oil for 2 minutes per side until golden. Remove and set aside.",
              "In the same oil, sauté the shallots, ginger-garlic, and tomatoes with spice powders until a thick masala forms.",
              "Wilt the banana leaves over an open flame for 30 seconds until pliable.",
              "Place a spoon of masala on the leaf, put a fish on top, spread masala generously on top and around.",
              "Fold the banana leaf into a tight parcel and roast on a tawa for 8-10 minutes per side.",
              "The banana leaf should be charred outside and the fish perfectly cooked inside with an incredible smoky aroma."
            ],
            chatResponse: {
              "English": "A legendary Meen Pollichathu is ready! Fish roasted inside banana leaf with aromatic masala — a true Kerala heritage recipe.",
              "Bengali": "Darun Meen Pollichathu ready! Kola paata diye morano maach — Kerala heritage recipe, durdanto swaad.",
              "Hindi": "Legendary Meen Pollichathu taiyar hai! Kele ke patte mein masala se bhara hua fish roast — ekdum authentic Kerala ka zaika.",
              "Hinglish": "Heritage Kerala Meen Pollichathu ready hai! Banana leaf me wrap karke roast kiya gaya spiced fish — incredible smoky and aromatic flavor.",
              "Oriya": "Darun Meen Pollichathu ready! Kola patra re masala sahita macha roast — Kerala traditional recipe."
            }
          }
        ],
        "Breakfast/Snacks ☕": [
          {
            title: "Kerala Egg Roast (Spiced Boiled Egg Curry)",
            time: "20 MINS",
            complexity: "EASY",
            tag: "BREAKFAST SPECIALTY",
            ingredients: [
              "Boiled Eggs (4, peeled and scored)",
              "Onions (2 large, finely sliced)",
              "Tomato (1, chopped)",
              "Coconut oil (2 tbsp)",
              "Kashmiri chili powder (1.5 tsp)",
              "Garam masala (1/2 tsp)",
              "Curry leaves (1 sprig)"
            ],
            steps: [
              "Heat coconut oil in a pan. Add the sliced onions and cook on low-medium heat, stirring often, for 15 minutes until deeply caramelized and dark brown.",
              "Add ginger-garlic paste and cook for 2 minutes. Add tomato, chili powder, coriander, and turmeric. Cook until oil separates.",
              "Add the scored boiled eggs and gently coat them in the masala. Add garam masala and curry leaves.",
              "Cook for 5 minutes, turning eggs gently to absorb the flavors.",
              "Serve alongside appam, puttu, or porotta for a filling Kerala breakfast."
            ],
            chatResponse: {
              "English": "Kerala Egg Roast is ready! Deeply caramelized onions, spiced coconut oil masala with soft boiled eggs — the perfect breakfast partner for appam.",
              "Bengali": "Kerala Egg Roast ready! Khub brown onion ar narikel tel er masalai sida dimer shathe — appam er shera jibon sathi.",
              "Hindi": "Kerala Egg Roast taiyar hai! Deep caramelized pyaaz aur spiced coconut oil masala — appam ke saath khaya to breakfast perfect ho jata hai.",
              "Hinglish": "Kerala Egg Roast ready hai! Dark caramelized onion aur coconut oil masala me anda ka jabardast combo — appam ke saath must have!",
              "Oriya": "Kerala Egg Roast ready karichi! Caramelized piaja o masala sahita anda — appam re srestha breakfast."
            }
          }
        ]
      },
      "Light Comfort 🥣": {
        "Lunch/Dinner 🍽️": [
          {
            title: "Kerala Fish Molee (Light Coconut Fish Curry)",
            time: "25 MINS",
            complexity: "EASY",
            tag: "COASTAL COMFORT",
            ingredients: [
              "White firm fish fillet (500g, seer/tilapia)",
              "Thick Coconut milk (1 cup)",
              "Thin coconut milk (1 cup)",
              "Green chilies (4, slit)",
              "Turmeric (1/4 tsp)",
              "Coconut oil & Curry leaves"
            ],
            steps: [
              "Marinate fish with turmeric and salt for 10 minutes.",
              "Sauté sliced onions in coconut oil until translucent. Add green chilies, ginger, and garlic. Cook 2 minutes.",
              "Add tomatoes and cook until soft. Season with turmeric and pepper.",
              "Pour in the thin coconut milk and bring to a gentle simmer. Add the fish pieces.",
              "Cook on very low heat for 8-10 minutes — never let it boil to keep the coconut milk from splitting.",
              "Gently stir in the thick coconut milk, add curry leaves, and remove from heat immediately.",
              "Serve warm with appam or rice — the white, delicate gravy is light and utterly comforting."
            ],
            chatResponse: {
              "English": "A light, creamy Kerala Fish Molee is ready! Delicate white fish in a mild, velvety coconut milk gravy — gentle on the stomach and soul.",
              "Bengali": "Halka ar creamy Kerala Fish Molee ready! Narikel dudhe tairi mild gravy diye maach — pet ke aram, moner aram.",
              "Hindi": "Light aur soothing Kerala Fish Molee taiyar hai! Nariyal ke doodh ki velvety gravy mein machli — pet aur dil dono ko chain milta hai.",
              "Hinglish": "Creamy Kerala Fish Molee ready hai! Light coconut milk gravy aur delicate fish — iska mild flavor bahut comforting hai. Appam ke saath perfect!",
              "Oriya": "Halka Kerala Fish Molee ready! Narikel doodha re mild macha curry — bahut comforting o light."
            }
          }
        ],
        "Breakfast/Snacks ☕": [
          {
            title: "Puttu & Kadala Curry (Steamed Rice Cake with Chickpea Curry)",
            time: "30 MINS",
            complexity: "MEDIUM",
            tag: "KERALA MORNING",
            ingredients: [
              "Rice flour (1 cup, coarse for puttu)",
              "Grated fresh coconut (3/4 cup)",
              "Warm water (for rice flour moistening)",
              "Kala chana (black chickpea, 1 cup, soaked overnight)",
              "Coconut oil & Curry leaves for curry"
            ],
            steps: [
              "Mix rice flour with a pinch of salt and sprinkle just enough warm water to make it moist but crumbly (not wet).",
              "Layer the puttu maker: coconut layer, rice flour layer, coconut layer alternately. Steam for 8-10 minutes.",
              "For Kadala Curry: pressure cook soaked black chickpea with salt for 5 whistles until soft.",
              "Sauté onions in coconut oil until brown. Add ginger-garlic, tomatoes, and Kerala curry powder.",
              "Add the cooked chickpeas, coconut milk, curry leaves, and simmer for 10 minutes until thick.",
              "Unmould the cylinder-shaped puttu and break it gently. Serve alongside the rich kadala curry."
            ],
            chatResponse: {
              "English": "Steamed Puttu with Kadala Curry is ready! The iconic Kerala breakfast — crumbly rice and coconut cylinders with rich black chickpea curry.",
              "Bengali": "Puttu ar Kadala Curry ready! Kerala er shera jolkhabar — narikel ar rice er cylinder ar kalo channar curry darun.",
              "Hindi": "Puttu aur Kadala Curry taiyar hai! Kerala ka iconic nashta — coconut aur rice steam cake ke saath kale chane ki rich curry — Heavenly!",
              "Hinglish": "Kerala style Puttu aur Kadala Curry ready hai! Rice-coconut steam cake aur kala chana curry — Kerala subah ka sab se iconic combo!",
              "Oriya": "Puttu o Kadala Curry ready karichi! Kerala er traditional morning breakfast combo."
            }
          }
        ]
      }
    },
    "Vegetarian": {
      "Spicy Feast 🌶️": {
        "Lunch/Dinner 🍽️": [
          {
            title: "Avial (Mixed Vegetable & Coconut Curry)",
            time: "30 MINS",
            complexity: "MEDIUM",
            tag: "SADYA SPECIAL",
            ingredients: [
              "Mixed vegetables (raw banana, yam, drumstick, carrot, ash gourd, 3 cups total)",
              "Grated Coconut (1 cup)",
              "Cumin seeds (1 tsp for grinding)",
              "Green chilies (3-4, for grinding)",
              "Sour Curd / Yogurt (3 tbsp)",
              "Coconut oil (2 tbsp) & Curry leaves"
            ],
            steps: [
              "Cut all vegetables into uniform 2-inch batons. Cook each vegetable type separately in salted water until just cooked (not mushy).",
              "Grind coconut, green chilies, and cumin into a thick coarse paste without water.",
              "Combine all cooked vegetables in a wide pan. Add the coconut paste and mix gently on low heat.",
              "Add sour curd (room temperature, not cold), stir gently, and heat on very low flame — do not boil after adding curd.",
              "Season with salt. Drizzle raw coconut oil and add fresh curry leaves.",
              "Serve as part of a Kerala Sadya alongside sambar, rasam, and payasam."
            ],
            chatResponse: {
              "English": "A traditional Avial is ready! Mixed vegetables gently simmered with coconut and cumin, finished with raw coconut oil — a Sadya centerpiece.",
              "Bengali": "Traditional Avial ready! Mishrit sabji ar narikel er gentle curry — Kerala Sadya er jonne ideal.",
              "Hindi": "Shandar Avial taiyar hai! Mix sabziyaan, nariyal aur cumin ke saath simmered — raw coconut oil se finish kiya — Sadya ka centerpiece!",
              "Hinglish": "Traditional Kerala Avial ready hai! Mixed vegetables, coconut paste aur sour curd ka combination — coconut oil ke aroma ke saath Sadya ka hero!",
              "Oriya": "Darun Avial ready karichi! Mishrit sabji o narikel sahita Kerala Sadya er mukhya dish."
            }
          }
        ],
        "Breakfast/Snacks ☕": [
          {
            title: "Appam with Vegetable Stew (Kerala Ishtu)",
            time: "30 MINS",
            complexity: "MEDIUM",
            tag: "SUNDAY SPECIAL",
            ingredients: [
              "Fermented Appam batter (2 cups ready)",
              "Mixed vegetables (potato, carrot, green beans, 1.5 cups)",
              "Thick Coconut milk (1.5 cups)",
              "Green chilies (3, slit)",
              "Whole spices (cardamom, cloves, cinnamon)",
              "Coconut oil (1 tbsp) & Curry leaves"
            ],
            steps: [
              "Cook the vegetables until tender but not mushy in 1/2 cup water.",
              "Heat coconut oil, add whole spices, green chilies, ginger slices, and shallots. Sauté 2 minutes.",
              "Add the cooked vegetables and thin coconut milk. Simmer 5 minutes.",
              "Add thick coconut milk and curry leaves. Stir gently and remove from heat immediately (never boil).",
              "For Appam: heat a seasoned appam chatty (pan). Pour batter, swirl to create lacy thin edges and thick center. Cover and steam 2-3 minutes.",
              "Serve the lacy Appams with the gently spiced white Ishtu."
            ],
            chatResponse: {
              "English": "Lacy Appam with Vegetable Ishtu is ready! The softest, laciest rice pancakes with a mild, fragrant white coconut stew.",
              "Bengali": "Gorom Appam ar Vegetable Ishtu ready! Naram o lacy rice pancake ar mild narikel stew — Sunday breakfast er perfect choice.",
              "Hindi": "Lacy Appam aur Vegetable Stew taiyar hai! Sabse naram aur lacy rice pancake ke saath mild, fragrant white coconut stew — ekdum divine.",
              "Hinglish": "Lacy Kerala Appam aur Vegetable Ishtu ready hai! Soft fluffy appam ke saath mild coconut stew — weekend breakfast ka best choice!",
              "Oriya": "Appam o Vegetable Stew ready karichi! Naram lacy appam o mild narikel stew — perfect Kerala breakfast."
            }
          }
        ]
      },
      "Light Comfort 🥣": {
        "Lunch/Dinner 🍽️": [
          {
            title: "Olan (Ash Gourd in Coconut Milk)",
            time: "20 MINS",
            complexity: "EASY",
            tag: "SADYA DELICACY",
            ingredients: [
              "Ash Gourd (300g, cubed)",
              "Black-eyed peas (1/2 cup, soaked and cooked)",
              "Thin Coconut milk (1 cup)",
              "Thick Coconut milk (1/2 cup)",
              "Green chilies (3, slit)",
              "Coconut oil (1 tbsp) & Curry leaves"
            ],
            steps: [
              "Cook the cubed ash gourd in the thin coconut milk with green chilies, salt, and the cooked black-eyed peas.",
              "Simmer on medium heat for 10-12 minutes until the ash gourd is tender and the coconut milk slightly thickens.",
              "Add the thick coconut milk and curry leaves. Stir gently on very low flame for 2 minutes — do not boil.",
              "Drizzle raw coconut oil on top and serve immediately as part of a Kerala Sadya."
            ],
            chatResponse: {
              "English": "A delicate Olan is ready! The subtlest, most refined dish of the Kerala Sadya — ash gourd and cowpeas simmered in pure coconut milk.",
              "Bengali": "Darun Olan ready! Kerala Sadya-r shobcheye subtle dish — ash gourd ar cowpea narikel dudhe ghol kora.",
              "Hindi": "Delicate Olan taiyar hai! Kerala Sadya ka sabse refined dish — ash gourd aur lobia nariyal ke doodh mein simmered. Pure comfort.",
              "Hinglish": "Kerala Sadya ka superstar Olan ready hai! Simple ash gourd, black-eyed peas aur coconut milk — subtlety ka champion!",
              "Oriya": "Darun Olan ready! Ash gourd o narikel doodha sahita Kerala Sadya er subtle dish."
            }
          }
        ],
        "Breakfast/Snacks ☕": [
          {
            title: "Kerala Unniyappam (Fried Rice & Banana Balls)",
            time: "30 MINS",
            complexity: "MEDIUM",
            tag: "TEMPLE SWEET",
            ingredients: [
              "Rice flour (1 cup)",
              "Ripe Banana (2, mashed)",
              "Jaggery (3/4 cup, melted)",
              "Grated Coconut (1/4 cup)",
              "Cardamom powder (1/4 tsp)",
              "Sesame seeds (1 tbsp)",
              "Coconut oil / Ghee (for frying in Paniyaram pan)"
            ],
            steps: [
              "Mash the ripe bananas into a smooth pulp. Mix with melted jaggery, grated coconut, cardamom, and sesame seeds.",
              "Add rice flour gradually to make a thick batter (similar to idli batter consistency). Rest for 30 minutes.",
              "Heat a Paniyaram (Unniyappam) pan with a little coconut oil in each hole.",
              "Pour a spoonful of batter into each hole. Cover and cook on low-medium heat until the bottom is golden.",
              "Flip and cook the other side until golden brown and cooked through.",
              "Serve warm — they should be crispy outside and soft, moist inside with a lovely jaggery-banana aroma."
            ],
            chatResponse: {
              "English": "Warm and crispy Kerala Unniyappam is ready! Fried rice-banana-jaggery balls — a famous temple sweet that melts in the mouth.",
              "Bengali": "Gorom o crispy Unniyappam ready! Banana, jaggery ar rice diye banano Kerala-r temple special misti.",
              "Hindi": "Garam crispy Unniyappam taiyar hai! Kela, gur aur rice se bane ye fried balls ekdum temple prasad jaisa — muh mein ghul jata hai.",
              "Hinglish": "Kerala style Unniyappam ready hai! Rice, banana aur jaggery ka combination — crispy outside, soft inside — temple sweet vibes!",
              "Oriya": "Garam Unniyappam ready karichi! Banana o jaggery sahita rice fried balls — Kerala temple special."
            }
          }
        ]
      }
    }
  },

  // ═══════════════════════════════════════════════════════════
  // ANDHRA PRADESH
  // ═══════════════════════════════════════════════════════════
  "Andhra Pradesh": {
    "Non-Vegetarian": {
      "Spicy Feast 🌶️": {
        "Lunch/Dinner 🍽️": [
          {
            title: "Gongura Mutton (Sorrel Leaf Mutton Curry)",
            time: "60 MINS",
            complexity: "ELABORATE",
            tag: "ANDHRA SIGNATURE",
            ingredients: [
              "Mutton (500g, bone-in pieces)",
              "Gongura / Sorrel leaves (2 big bunches, washed and chopped)",
              "Onion (2 large, sliced)",
              "Ginger-Garlic paste (2 tbsp)",
              "Andhra red chilies (6-8, dry-roasted)",
              "Mustard oil or refined oil (4 tbsp)",
              "Coriander seeds, Cumin & Fenugreek"
            ],
            steps: [
              "Dry roast coriander seeds, cumin, and fenugreek. Grind with dry-roasted red chilies into a coarse powder.",
              "Heat oil in a heavy-bottomed pressure cooker. Add sliced onions and fry until dark golden.",
              "Add ginger-garlic paste and cook 3 minutes. Add the freshly ground spice powder and cook for 2 minutes.",
              "Add the mutton pieces and sear on high heat for 7-8 minutes, stirring constantly.",
              "Add the chopped gongura leaves and mix well. The leaves will wilt quickly.",
              "Add 1.5 cups warm water, salt, close the cooker, and pressure cook for 5-6 whistles.",
              "Open and reduce on high heat until the gravy is thick and glossy. The sour gongura combined with mutton is uniquely Andhra."
            ],
            chatResponse: {
              "English": "A legendary Gongura Mutton is ready! The pride of Andhra Pradesh — tender mutton slow-cooked with sour sorrel leaves for an unmatched tangy-spicy flavor.",
              "Bengali": "Darun Gongura Mutton ready! Andhra Pradesh er gorbo — mangsho ar sour gongura pata diye, ekta unique aur incredible swaad.",
              "Hindi": "Legendary Gongura Mutton taiyar hai! Andhra ki shan — tender mutton ko sorrel leaves ke saath slow cooked kiya gaya hai. Tangy, spicy, absolutely unique.",
              "Hinglish": "Andhra signature Gongura Mutton ready hai! Sour gongura leaves aur tender mutton ka unique tangy-spicy combination — iska jawab nahi!",
              "Oriya": "Gongura Mutton ready karichi! Andhra Pradesh er signature dish — sour gongura patra sahita mutton, bahut unique swaad."
            }
          },
          {
            title: "Hyderabadi Chicken Biryani (Dum Style)",
            time: "75 MINS",
            complexity: "ELABORATE",
            tag: "BIRYANI KING",
            ingredients: [
              "Chicken (750g, on bone)",
              "Basmati Rice (2 cups, soaked 30 mins)",
              "Fried onions (Birista) (1 large cup)",
              "Yogurt (1 cup)",
              "Saffron (a pinch, soaked in warm milk)",
              "Biryani masala (Shahi Jeera, cardamom, cloves, cinnamon)",
              "Fresh mint & coriander leaves",
              "Ghee (3 tbsp)"
            ],
            steps: [
              "Marinate chicken with yogurt, biryani masala, ginger-garlic paste, red chili, half the fried onions, mint, and salt for 2 hours (or overnight).",
              "Parboil the soaked basmati rice with whole spices and salt until 70% cooked. Drain.",
              "Layer in a heavy-bottomed pot: spread the marinated chicken at the bottom, layer the parboiled rice on top.",
              "Top with saffron milk, remaining fried onions, fresh mint, and generous dollops of ghee.",
              "Seal the pot tightly with foil or dough (dum seal). Cook on high heat for 5 minutes then on lowest heat for 25-30 minutes.",
              "Open the seal at the table for the full dramatic aroma release. Serve with raita and mirchi ka salan."
            ],
            chatResponse: {
              "English": "The legendary Hyderabadi Dum Biryani is ready! Layers of fragrant basmati, tender chicken, saffron, and crispy fried onions — the king of all biryanis.",
              "Bengali": "Shobar raja Hyderabadi Dum Biryani ready! Saffron basmati ar naram murgir layer — darun gandhho ar swaad. Biryani-r ra raja.",
              "Hindi": "Legendary Hyderabadi Dum Biryani taiyar hai! Saffron rice, tender chicken, crispy birista aur ghee ke layers — biryani ka raja aaya hai!",
              "Hinglish": "Hyderabadi Dum Biryani ready hai! Seal tod ke kholo toh saffron aur mint ki fragrance bhar jaye room mein — biryani ka real king!",
              "Oriya": "Hyderabadi Dum Biryani ready karichi! Saffron basmati o tender chicken sahita biryani er ra raja."
            }
          }
        ],
        "Breakfast/Snacks ☕": [
          {
            title: "Pesarattu (Green Moong Dosa with Ginger Chutney)",
            time: "20 MINS",
            complexity: "EASY",
            tag: "ANDHRA BREAKFAST",
            ingredients: [
              "Whole Green Moong (1 cup, soaked overnight)",
              "Green chilies (3)",
              "Ginger (1 inch)",
              "Onion (1/2, finely chopped, for topping)",
              "Cumin seeds (1/2 tsp)",
              "Oil for cooking"
            ],
            steps: [
              "Grind the soaked green moong with green chilies, ginger, cumin, and minimal water into a slightly coarse batter. Season with salt.",
              "Heat a flat tawa until hot. Pour a ladle of batter and spread into a thin crepe.",
              "Sprinkle finely chopped onions and cumin on top. Press lightly with spatula.",
              "Drizzle oil around the edges. Cook until the base is golden and crispy, then fold.",
              "Serve hot with ginger-coconut chutney and Upma stuffed inside (traditional Pesarattu-Upma combo)."
            ],
            chatResponse: {
              "English": "Crispy Pesarattu is ready! Andhra's beloved protein-rich green moong dosa — crispy, healthy, and delicious with ginger chutney.",
              "Bengali": "Crispy Pesarattu ready! Andhra er aati priya protein-rich green moong er crepe — halka, healthy, ar khub tasty.",
              "Hindi": "Crispy Pesarattu taiyar hai! Andhra ka pyara protein-rich green moong ka crepe — healthy, crispy, aur ginger chutney ke saath mast lagte hain.",
              "Hinglish": "Andhra style Pesarattu ready hai! Green moong ka crispy dosa — protein se bhari healthy breakfast. Ginger chutney ke saath must try!",
              "Oriya": "Crispy Pesarattu ready karichi! Green moong er crepe, healthy o tasty Andhra breakfast."
            }
          }
        ]
      },
      "Light Comfort 🥣": {
        "Lunch/Dinner 🍽️": [
          {
            title: "Andhra Kodi Kura (Country Chicken Curry)",
            time: "45 MINS",
            complexity: "MEDIUM",
            tag: "HOMESTYLE CHICKEN",
            ingredients: [
              "Country Chicken (600g)",
              "Onion (2, finely sliced)",
              "Tomatoes (2)",
              "Coconut (1/2 cup, ground to paste)",
              "Red chili powder (2 tsp, Andhra variety)",
              "Curry leaves & Coriander"
            ],
            steps: [
              "Heat oil and fry onions until golden. Add ginger-garlic paste and cook 2 minutes.",
              "Add tomatoes and cook until mushy. Add red chili, coriander, and turmeric powders.",
              "Add chicken and sear 5 minutes. Pour coconut paste and mix.",
              "Add 1.5 cups water, curry leaves, and salt. Cover and cook 30 minutes until chicken is tender.",
              "Garnish with fresh coriander. Serve with rice or roti."
            ],
            chatResponse: {
              "English": "Homestyle Andhra Kodi Kura is ready! Country chicken simmered with coconut paste and fiery Andhra spices — a soul-warming comforting curry.",
              "Bengali": "Halka Andhra Kodi Kura ready! Country chicken ar narikel paste diye tairi — khub comfort er dish.",
              "Hindi": "Homestyle Andhra Kodi Kura taiyar hai! Country chicken aur coconut paste se bana spiced curry — seena garm kar de!",
              "Hinglish": "Andhra Kodi Kura ready hai! Country chicken aur coconut paste ka comforting combination — rice ya roti ke saath perfect.",
              "Oriya": "Andhra Kodi Kura ready karichi! Country chicken o narikel sahita comfort curry."
            }
          }
        ],
        "Breakfast/Snacks ☕": [
          {
            title: "Punugulu (Andhra Rice Fritters)",
            time: "20 MINS",
            complexity: "EASY",
            tag: "ANDHRA SNACK",
            ingredients: [
              "Idli / Dosa batter (2 cups leftover)",
              "Onion (1/2 finely chopped)",
              "Green chilies (2 chopped)",
              "Cumin seeds (1/2 tsp)",
              "Coriander (2 tbsp chopped)",
              "Oil for deep frying"
            ],
            steps: [
              "Mix leftover batter with onion, green chili, cumin, coriander, and salt.",
              "Heat oil in a deep pan. Drop tablespoon-sized balls of batter into hot oil.",
              "Fry on medium heat until golden brown and crispy on all sides, about 4-5 minutes.",
              "Drain and serve hot with coconut chutney or tomato sauce."
            ],
            chatResponse: {
              "English": "Hot and crispy Punugulu is ready! Andhra's famous leftover batter fritters — crispy outside, fluffy inside, perfect tea-time snack.",
              "Bengali": "Gorom Punugulu ready! Andhra er famous leftover batter er fritter — crispy ar fluffy, chai-r shathe perfect snack.",
              "Hindi": "Garam Punugulu taiyar hai! Andhra ke famous fritters — crispy bahar se, fluffy andar se — chai ke saath perfect snack!",
              "Hinglish": "Hot Andhra Punugulu ready hai! Leftover batter se bane ye crispy fritters — chai ke saath best teatime snack hai!",
              "Oriya": "Gorom Punugulu ready! Andhra famous fritters, chai sahita perfect snack."
            }
          }
        ]
      }
    },
    "Vegetarian": {
      "Spicy Feast 🌶️": {
        "Lunch/Dinner 🍽️": [
          {
            title: "Gutti Vankaya Kura (Stuffed Brinjal Curry)",
            time: "35 MINS",
            complexity: "MEDIUM",
            tag: "ANDHRA CLASSIC",
            ingredients: [
              "Small round brinjal (8-10, slit in X shape from base)",
              "Peanuts (1/4 cup roasted)",
              "Sesame seeds (2 tbsp roasted)",
              "Coconut (2 tbsp grated)",
              "Tamarind paste (1 tbsp)",
              "Red chili powder (2 tsp)",
              "Oil (3 tbsp)"
            ],
            steps: [
              "Dry roast peanuts and sesame seeds. Grind with coconut, tamarind, red chili, coriander, cumin and salt into a thick paste.",
              "Gently stuff the X-slit brinjals with this masala paste, pressing it in firmly.",
              "Heat oil in a wide pan. Place the stuffed brinjals carefully and cook covered on low heat.",
              "Turn every 5 minutes, letting each side get slightly charred and cooked through — total 20 minutes.",
              "Add any remaining masala paste to the pan and cook for 5 more minutes.",
              "Serve garnished with coriander alongside steamed rice and dal."
            ],
            chatResponse: {
              "English": "A stunning Gutti Vankaya Kura is ready! Andhra's signature stuffed brinjal — masala-stuffed, slow-cooked until perfectly charred and tender.",
              "Bengali": "Darun Gutti Vankaya ready! Andhra-r signature — masala bhora baingan slow cook e tairi, ekta incredible dish.",
              "Hindi": "Shandar Gutti Vankaya Kura taiyar hai! Andhra ki signature stuffed brinjal — masala se bhara hua, slow cooked — incredible taste!",
              "Hinglish": "Andhra style Gutti Vankaya ready hai! Masala stuffed brinjal ko slow cook karke charred flavor laate hain — incredible South Indian dish!",
              "Oriya": "Gutti Vankaya Kura ready karichi! Andhra signature masala stuffed brinjal curry."
            }
          }
        ],
        "Breakfast/Snacks ☕": [
          {
            title: "Pulihora (Andhra Tamarind Rice)",
            time: "20 MINS",
            complexity: "EASY",
            tag: "TEMPLE RICE",
            ingredients: [
              "Cooked rice (2 cups, cooled)",
              "Tamarind (lemon sized ball, soaked for extract)",
              "Peanuts (3 tbsp, roasted)",
              "Sesame seeds (1 tbsp)",
              "Mustard seeds, dry red chili & Curry leaves",
              "Turmeric (1/2 tsp)"
            ],
            steps: [
              "Extract 1/2 cup thick tamarind juice.",
              "Heat oil in a pan. Add mustard seeds, dry red chili, peanuts, sesame, curry leaves, and turmeric. Fry 2 minutes.",
              "Add the tamarind extract and cook on medium heat until it thickens and becomes fragrant (5 minutes).",
              "Add the cooled cooked rice. Mix gently to coat every grain. Season with salt.",
              "Cook on low heat for 3-4 minutes, mixing gently. Serve at room temperature."
            ],
            chatResponse: {
              "English": "Tangy Andhra Pulihora is ready! Sacred tamarind rice loaded with peanuts and sesame — the classic temple prasad.",
              "Bengali": "Tangy Pulihora ready! Tetul ar peanut diye tairi Andhra-r mandir prasad rice — darun chatpata swaad.",
              "Hindi": "Chatpata Andhra Pulihora taiyar hai! Imli, mungfali aur til se bana ye tamarind rice temple prasad jaisa mast lagta hai.",
              "Hinglish": "Andhra Temple style Pulihora ready hai! Tangy tamarind rice with crunchy peanuts — travel food, prasad, ya tiffin sab ke liye perfect!",
              "Oriya": "Tangy Pulihora ready karichi! Tetula o peanut sahita Andhra temple prasad rice."
            }
          }
        ]
      },
      "Light Comfort 🥣": {
        "Lunch/Dinner 🍽️": [
          {
            title: "Majjiga Pulusu (Buttermilk Vegetable Stew)",
            time: "20 MINS",
            complexity: "EASY",
            tag: "ANDHRA COMFORT",
            ingredients: [
              "Sour Buttermilk (2 cups, room temperature)",
              "Raw Banana / Drumstick / Okra (1 cup, cooked)",
              "Green chilies (3, slit)",
              "Ginger (1/2 inch)",
              "Cumin powder (1/2 tsp)",
              "Oil + Mustard seeds + Curry leaves"
            ],
            steps: [
              "Cook the vegetables until tender.",
              "Whisk sour buttermilk with turmeric, salt, green chili, ginger, and cumin.",
              "Combine vegetables with the buttermilk mixture in a pot on low heat.",
              "Heat gently — never boil — stirring continuously until just warmed through.",
              "Temper with mustard seeds, dry red chili, and curry leaves in oil. Pour over the stew.",
              "Serve with hot steamed rice."
            ],
            chatResponse: {
              "English": "Comforting Majjiga Pulusu is ready! A gentle Andhra stew of sour buttermilk and vegetables — light, digestive, and wonderfully cooling.",
              "Bengali": "Halka Majjiga Pulusu ready! Sour buttermilk ar sabji diye Andhra-r comfort curry — halka ar digestive.",
              "Hindi": "Comforting Majjiga Pulusu taiyar hai! Khatti chaach aur sabziyon ka halka Andhra stew — pet ke liye bahut soothing aur digestive.",
              "Hinglish": "Andhra Majjiga Pulusu ready hai! Sour buttermilk aur vegetables ka light stew — digestive aur comforting summer food!",
              "Oriya": "Majjiga Pulusu ready! Khatta buttermilk o sabji sahita Andhra comfort stew."
            }
          }
        ],
        "Breakfast/Snacks ☕": [
          {
            title: "Attu (Andhra Rice Crepe)",
            time: "15 MINS",
            complexity: "EASY",
            tag: "LIGHT BREAKFAST",
            ingredients: [
              "Dosa batter (2 cups ready)",
              "Onion (1 small, finely chopped)",
              "Green chili (1, chopped)",
              "Coriander (2 tbsp)",
              "Oil for cooking"
            ],
            steps: [
              "Mix onion, green chili, and coriander into the dosa batter.",
              "Heat tawa and spread batter into thin crepes.",
              "Cook until crispy on medium heat.",
              "Serve with coconut chutney or peanut chutney."
            ],
            chatResponse: {
              "English": "Light and crispy Andhra Attu is ready! A simple, wholesome rice crepe for a light breakfast.",
              "Bengali": "Halka Andhra Attu ready! Simple rice crepe, coconut chutney diye darun jolkhabar.",
              "Hindi": "Halka Andhra Attu taiyar hai! Simple rice crepe for a light wholesome breakfast.",
              "Hinglish": "Light Andhra Attu ready hai! Simple rice crepe for a quick healthy breakfast.",
              "Oriya": "Halka Andhra Attu ready! Simple rice crepe, light breakfast."
            }
          }
        ]
      }
    }
  },

  // ═══════════════════════════════════════════════════════════
  // GUJARAT
  // ═══════════════════════════════════════════════════════════
  "Gujarat": {
    "Vegetarian": {
      "Spicy Feast 🌶️": {
        "Lunch/Dinner 🍽️": [
          {
            title: "Undhiyu (Gujarati Mixed Vegetable Casserole)",
            time: "60 MINS",
            complexity: "ELABORATE",
            tag: "WINTER FESTIVAL",
            ingredients: [
              "Surti Papdi (flat beans, 1 cup)",
              "Purple Yam (150g, cubed)",
              "Raw Banana (2, cubed)",
              "Potato (2, cubed)",
              "Fenugreek-stuffed dumplings (Muthiya)",
              "Fresh coconut + Green coriander-chili paste",
              "Sesame seeds, Ajwain, Sugar & Oil"
            ],
            steps: [
              "Make Muthiya: mix fenugreek leaves, gram flour, sugar, ajwain, and oil. Knead into small dumplings and steam until cooked, then shallow fry.",
              "Blend fresh coconut, green coriander, green chilies, ginger, sugar, and lemon into a vibrant green chutney-paste.",
              "Layer all vegetables in a deep, wide heavy pot — starting with dense vegetables at bottom and lighter ones on top.",
              "Apply the green coconut paste between layers. Add sesame seeds, sugar, salt, and oil.",
              "Cover tightly and cook on very low heat (Dum style) for 45 minutes, shaking the pot gently every 10 minutes.",
              "Open to reveal a vibrant, incredibly fragrant Gujarati festival casserole. Garnish with pomegranate and serve."
            ],
            chatResponse: {
              "English": "A spectacular Undhiyu is ready! Gujarat's crown jewel winter festival dish — a colorful casserole of multiple vegetables and Muthiya dumplings, slow-cooked to perfection.",
              "Bengali": "Darun Undhiyu ready! Gujarat-er crown jewel — mishrit sabji ar Muthiya diye tairi winter festival dish, darun rang ar swaad.",
              "Hindi": "Shandar Undhiyu taiyar hai! Gujarat ka crown jewel — multiple sabziyaan aur Muthiya ka vibrant festival casserole. Winter ka ek adbhut dish.",
              "Hinglish": "Spectacular Undhiyu ready hai! Gujarat ka festival special — mixed vegetables aur Muthiya ka vibrant casserole jo winter mein khaane ka maza alag hi hai!",
              "Oriya": "Darun Undhiyu ready! Gujarat er crown jewel winter festival sabji casserole."
            }
          }
        ],
        "Breakfast/Snacks ☕": [
          {
            title: "Khaman Dhokla (Soft Steamed Gram Snack)",
            time: "30 MINS",
            complexity: "MEDIUM",
            tag: "GUJARATI STAPLE",
            ingredients: [
              "Gram flour / Besan (1 cup)",
              "Yogurt (1/2 cup)",
              "Lemon juice (2 tbsp)",
              "Eno fruit salt (1 tsp)",
              "Sugar (1 tsp)",
              "For tadka: Oil, Mustard seeds, Curry leaves, Green chili, Sesame, Sugar"
            ],
            steps: [
              "Mix gram flour, yogurt, lemon juice, sugar, salt, and turmeric into a smooth, lump-free batter.",
              "Add Eno fruit salt just before steaming. Mix quickly — the batter will foam up.",
              "Immediately pour into a greased tray and steam for 12-15 minutes until a toothpick comes out clean.",
              "For tadka: heat oil, add mustard seeds, curry leaves, green chili, sesame, and a pinch of sugar. Add 3 tbsp water — it will sizzle.",
              "Pour the hot, sweet-spiced tadka all over the steamed dhokla evenly.",
              "Cut into squares, garnish with grated coconut and coriander. Serve with green chutney."
            ],
            chatResponse: {
              "English": "Soft and spongy Khaman Dhokla is ready! Gujarat's iconic steamed gram flour snack — light, tangy, sweet, and utterly addictive.",
              "Bengali": "Soft o spongy Khaman Dhokla ready! Gujarat-er iconic steamed snack — halka, tangy, mishti ar khub addictive.",
              "Hindi": "Soft aur spongy Khaman Dhokla taiyar hai! Gujarat ki famous steamed snack — halka, tangy, meetha aur bahut tasty.",
              "Hinglish": "Spongy Khaman Dhokla ready hai! Gujarat ka iconic snack — light, tangy, aur sweet tadka ke saath ekdum addictive hai!",
              "Oriya": "Soft Khaman Dhokla ready! Gujarat famous steamed snack, halka o tangy."
            }
          }
        ]
      },
      "Light Comfort 🥣": {
        "Lunch/Dinner 🍽️": [
          {
            title: "Dal Dhokli (Gujarati Lentil Dumplings)",
            time: "35 MINS",
            complexity: "MEDIUM",
            tag: "ONE POT COMFORT",
            ingredients: [
              "Toor Dal (1 cup, cooked and mashed)",
              "Wheat flour (1 cup, for dhokli dough)",
              "Tomatoes (2, chopped)",
              "Jaggery (2 tbsp)",
              "Tamarind (1 tbsp paste)",
              "Peanuts (2 tbsp)",
              "Coriander & Ghee for serving"
            ],
            steps: [
              "Make a stiff dough with wheat flour, red chili, turmeric, and oil. Roll thin and cut into small squares (Dhoklis).",
              "Prepare dal: in a pot, combine mashed toor dal, tomatoes, tamarind, jaggery, peanuts, and salt with 3 cups water. Bring to a boil.",
              "Slide the raw dhokli squares into the simmering dal one by one to prevent clumping.",
              "Cook on medium heat for 15 minutes, stirring occasionally, until dhoklis are fully cooked.",
              "Make tadka with ghee, mustard, asafoetida, and curry leaves. Pour over.",
              "Garnish with coriander and serve piping hot — the dhoklis should be soft and absorbed with the tangy-sweet dal."
            ],
            chatResponse: {
              "English": "A comforting Dal Dhokli is ready! The ultimate Gujarati one-pot comfort food — spiced wheat dumplings simmered in a tangy-sweet toor dal.",
              "Bengali": "Darun Dal Dhokli ready! Gujarat-er ultimate one-pot comfort food — moshladar wheat dumplings tangy-mishti dal e ghol kora.",
              "Hindi": "Swadisht Dal Dhokli taiyar hai! Gujarat ka ultimate one-pot comfort food — masaledar wheat ke tukde tangy-meethe toor dal mein pakaye gaye.",
              "Hinglish": "Gujarat ki ultimate comfort food Dal Dhokli ready hai! Spiced wheat dumplings aur tangy-sweet dal ka combo — ek hi pot mein perfect meal!",
              "Oriya": "Dal Dhokli ready! Gujarat er one-pot comfort food — masala wheat dumpling tangy dal sahita."
            }
          }
        ],
        "Breakfast/Snacks ☕": [
          {
            title: "Methi Thepla (Fenugreek Flatbread)",
            time: "20 MINS",
            complexity: "EASY",
            tag: "GUJARATI EVERYDAY",
            ingredients: [
              "Whole wheat flour (2 cups)",
              "Fresh Fenugreek leaves / Methi (1 cup, finely chopped)",
              "Yogurt (3 tbsp)",
              "Sesame seeds (1 tsp)",
              "Turmeric & Red chili powder (1/4 tsp each)",
              "Oil (1 tbsp)",
              "Salt to taste"
            ],
            steps: [
              "Mix flour, chopped methi, yogurt, sesame seeds, turmeric, chili powder, oil, and salt. Knead into a soft, pliable dough.",
              "Rest the dough for 10 minutes. Divide into small balls.",
              "Roll each ball into a thin round (thinner than roti). Cook on a hot tawa with a little oil on both sides until golden spots appear.",
              "Serve hot with yogurt, mango pickle, or curd — or pack for travel (they stay fresh for days)."
            ],
            chatResponse: {
              "English": "Soft and nutritious Methi Thepla is ready! Gujarat's beloved everyday flatbread — fragrant fenugreek, perfect for travel and tiffins.",
              "Bengali": "Naram Methi Thepla ready! Gujarat er loved flatbread — methi pata diye tairi, travel-e ba tiffin-e perfect.",
              "Hindi": "Soft aur nutritious Methi Thepla taiyar hai! Gujarat ki pyari roz ki roti — methi ki fragrance ke saath, travel aur tiffin ke liye perfect.",
              "Hinglish": "Healthy Methi Thepla ready hai! Gujarat ka everyday bread — methi ki scent ke saath soft flatbread — travel mein sath le jaao!",
              "Oriya": "Methi Thepla ready! Gujarat er everyday flatbread — methi sahita, travel pain perfect."
            }
          }
        ]
      }
    },
    "Non-Vegetarian": {
      "Spicy Feast 🌶️": {
        "Lunch/Dinner 🍽️": [
          {
            title: "Surti Chicken (Surat Style Chicken Curry)",
            time: "45 MINS",
            complexity: "MEDIUM",
            tag: "SURAT SPECIALTY",
            ingredients: [
              "Chicken (600g, cut into pieces)",
              "Onion (2, finely sliced)",
              "Tomatoes (2, chopped)",
              "Ginger-garlic paste (2 tbsp)",
              "Coconut milk (1/2 cup)",
              "Gujarat spice blend (coriander, cumin, chili)"
            ],
            steps: [
              "Fry onions until golden. Add ginger-garlic paste and tomatoes, cook until oil separates.",
              "Add spices and cook 2 minutes. Add chicken and sear 5 minutes.",
              "Add coconut milk and 1 cup water. Cook covered for 25 minutes.",
              "Garnish with coriander and serve with roti or rice."
            ],
            chatResponse: {
              "English": "Surati Chicken Curry is ready! A unique Gujarati non-veg specialty with coconut milk — subtle and delicious.",
              "Bengali": "Surati Chicken ready! Gujarat er unique non-veg specialty narikel dudhe — subtle ar tasty.",
              "Hindi": "Surati Chicken taiyar hai! Gujarat ka unique non-veg specialty coconut milk ke saath.",
              "Hinglish": "Surati Chicken ready hai! Gujarat style non-veg curry with coconut milk — subtle but delicious!",
              "Oriya": "Surati Chicken ready! Gujarat non-veg specialty narikel doodha sahita."
            }
          }
        ],
        "Breakfast/Snacks ☕": [
          {
            title: "Chicken Patra (Chicken Colocasia Roll)",
            time: "40 MINS",
            complexity: "MEDIUM",
            tag: "GUJARATI FUSION",
            ingredients: [
              "Colocasia / Taro leaves (8, large)",
              "Chicken mince (250g)",
              "Gram flour paste (for spreading)",
              "Spices: cumin, red chili, turmeric",
              "Oil for frying"
            ],
            steps: [
              "Mix chicken mince with spices. Prepare a spiced gram flour paste.",
              "Spread gram flour paste on colocasia leaves, layer with chicken mince, roll tightly.",
              "Steam the rolls for 20 minutes. Slice and shallow fry until golden.",
              "Serve with green chutney."
            ],
            chatResponse: {
              "English": "Unique Chicken Patra is ready! A fusion of classic Gujarati Patra with chicken — steamed rolls, then fried crispy.",
              "Bengali": "Unique Chicken Patra ready! Gujarat er classic Patra te chicken — steam kore crispy fry.",
              "Hindi": "Unique Chicken Patra taiyar hai! Gujarati Patra ka chicken fusion — steamed rolls ko crispy fry karo.",
              "Hinglish": "Chicken Patra ready hai! Classic Gujarati patra mein chicken twist — steam karke fry karo — unique fusion!",
              "Oriya": "Chicken Patra ready! Gujarat fusion recipe, chicken sahita patra rolls."
            }
          }
        ]
      },
      "Light Comfort 🥣": {
        "Lunch/Dinner 🍽️": [
          {
            title: "Gujarati Sev Tameta Nu Shaak (Tomato Sev Curry)",
            time: "20 MINS",
            complexity: "EASY",
            tag: "GUJARATI QUICK",
            ingredients: [
              "Tomatoes (4, chopped)",
              "Sev (thick, 1/2 cup)",
              "Onion (1, chopped)",
              "Mustard seeds & curry leaves",
              "Jaggery (1 tsp)"
            ],
            steps: [
              "Sauté onion in oil. Add tomatoes and cook until mushy.",
              "Add spices, jaggery, and 1/2 cup water. Simmer 5 minutes.",
              "Add sev just before serving (to retain crunch). Garnish with coriander."
            ],
            chatResponse: {
              "English": "Quick Gujarati Sev Tameta is ready! A tangy-sweet tomato curry with crunchy sev — a uniquely delicious Gujarati comfort dish.",
              "Bengali": "Quick Sev Tameta ready! Tangy-mishti tomato curry ar crunchy sev — unique Gujarati dish.",
              "Hindi": "Jaldi Gujarati Sev Tameta taiyar hai! Khatti-meethi tomato curry mein crunchy sev — ekdum unique!",
              "Hinglish": "Quick Sev Tameta ready hai! Tangy sweet tomato curry with crunchy sev — totally unique Gujarati comfort food!",
              "Oriya": "Sev Tameta ready! Tangy tomato curry o crunchy sev sahita Gujarati dish."
            }
          }
        ],
        "Breakfast/Snacks ☕": [
          {
            title: "Khandvi (Savory Gram Roll)",
            time: "25 MINS",
            complexity: "MEDIUM",
            tag: "GUJARATI PRIDE",
            ingredients: [
              "Gram flour (1/2 cup)",
              "Yogurt (1 cup)",
              "Turmeric (1/4 tsp)",
              "Salt to taste",
              "Tadka: mustard seeds, sesame, curry leaves, coconut"
            ],
            steps: [
              "Mix gram flour, yogurt, turmeric, and salt into a lump-free batter.",
              "Cook on low heat, stirring constantly, for 10-12 minutes until very thick.",
              "Spread quickly and thinly on a greased surface. Let cool for 2 minutes.",
              "Roll up into tight cylinders. Make tadka and pour over. Garnish with coconut."
            ],
            chatResponse: {
              "English": "Silky Khandvi is ready! Gujarat's pride — delicate rolled gram flour snack topped with fragrant tadka and fresh coconut.",
              "Bengali": "Silky Khandvi ready! Gujarat-er gorbo — naram rolled gram flour snack ar tadka diye — darun.",
              "Hindi": "Smooth Khandvi taiyar hai! Gujarat ki shaan — naram gram flour rolls aur tadka ke saath — ekdum classic snack.",
              "Hinglish": "Silky Khandvi ready hai! Gujarat ka pride — soft rolled besan snack — tadka aur coconut ke saath — must try!",
              "Oriya": "Silky Khandvi ready! Gujarat er famous rolled gram flour snack."
            }
          }
        ]
      }
    }
  },

  // ═══════════════════════════════════════════════════════════
  // RAJASTHAN
  // ═══════════════════════════════════════════════════════════
  "Rajasthan": {
    "Non-Vegetarian": {
      "Spicy Feast 🌶️": {
        "Lunch/Dinner 🍽️": [
          {
            title: "Laal Maas (Fiery Red Mutton Curry)",
            time: "60 MINS",
            complexity: "ELABORATE",
            tag: "RAJASTHANI ROYALE",
            ingredients: [
              "Mutton (600g, bone-in)",
              "Mathania Red Chilies (8-10, whole, soaked and ground to paste)",
              "Yogurt (1 cup)",
              "Onion (3, finely sliced)",
              "Ghee (4 tbsp)",
              "Garlic (8 cloves, crushed)",
              "Whole spices: bay leaf, cinnamon, cloves"
            ],
            steps: [
              "Marinate mutton with the Mathania chili paste, yogurt, salt, and half the garlic. Marinate for 2-4 hours.",
              "Heat ghee in a heavy kadhai. Add whole spices and let them sizzle.",
              "Add sliced onions and fry until very dark caramelized brown — this is key for Laal Maas.",
              "Add the remaining crushed garlic and cook for 2 minutes.",
              "Add the marinated mutton along with all the marinade. Sear on high heat for 10 minutes.",
              "Add 1.5 cups warm water, cover, and pressure cook for 5-6 whistles until mutton is fork-tender.",
              "Open and reduce the gravy until thick and glossy. The color should be a deep, fiery red. Garnish with sliced garlic fried in ghee."
            ],
            chatResponse: {
              "English": "The legendary Laal Maas is ready! Rajasthan's fiery red mutton — Mathania chilies, ghee, and slow-cooked mutton create an unforgettable royal dish.",
              "Bengali": "Legendary Laal Maas ready! Rajasthan-er fiery red mutton — Mathania chili, ghee ar slow cook — ekta unforgettable royal dish.",
              "Hindi": "Legendary Laal Maas taiyar hai! Rajasthan ka fiery masterpiece — Mathania mirch, ghee aur dheere pakaya mutton — ek baar kha lo to bhul nahi paoge.",
              "Hinglish": "Royal Rajasthani Laal Maas ready hai! Deep fiery red, Mathania chili aur ghee ka intense combo — iska taste bilkul unforgettable hai!",
              "Oriya": "Legendary Laal Maas ready! Rajasthan fiery red mutton — Mathania chili o ghee sahita royal dish."
            }
          }
        ],
        "Breakfast/Snacks ☕": [
          {
            title: "Keema Paratha (Minced Meat Stuffed Bread)",
            time: "35 MINS",
            complexity: "MEDIUM",
            tag: "RAJASTHANI BREAKFAST",
            ingredients: [
              "Wheat flour (2 cups)",
              "Chicken or mutton mince (250g, cooked with spices)",
              "Onion (1, finely chopped)",
              "Green chili & Coriander",
              "Ghee (for cooking)"
            ],
            steps: [
              "Prepare dry keema: cook mince with spices, onion, and coriander until dry.",
              "Roll wheat flour dough into circles. Stuff with keema. Seal and re-roll gently.",
              "Cook on hot tawa with ghee on both sides until golden and crispy.",
              "Serve with yogurt and green chutney."
            ],
            chatResponse: {
              "English": "Crispy Keema Paratha is ready! Rajasthani spiced minced meat stuffed in a golden flatbread — a hearty breakfast.",
              "Bengali": "Crispy Keema Paratha ready! Rajasthani moshladar keema bhorti paratha — ekta hearty jolkhabar.",
              "Hindi": "Crispy Keema Paratha taiyar hai! Rajasthani masaledar keema bhari hui golden paratha — bharpur nashta.",
              "Hinglish": "Rajasthani Keema Paratha ready hai! Spiced mince stuffed crispy paratha — hearty breakfast.",
              "Oriya": "Keema Paratha ready! Rajasthani spiced mince stuffed paratha — hearty breakfast."
            }
          }
        ]
      },
      "Light Comfort 🥣": {
        "Lunch/Dinner 🍽️": [
          {
            title: "Rajasthani Chicken Curry",
            time: "45 MINS",
            complexity: "MEDIUM",
            tag: "HOMESTYLE RAJASTHAN",
            ingredients: [
              "Chicken (600g)",
              "Onion (2, sliced)",
              "Yogurt (1/2 cup)",
              "Rajasthani masala",
              "Ghee (2 tbsp)"
            ],
            steps: [
              "Fry onions in ghee until golden. Add yogurt and cook until oil separates.",
              "Add Rajasthani masala, ginger-garlic paste, and chicken. Sear 5 minutes.",
              "Add water and cook 25 minutes until tender.",
              "Serve with bajra roti."
            ],
            chatResponse: {
              "English": "Homestyle Rajasthani Chicken Curry is ready! Ghee-rich, fragrant, and comforting — serve with bajra roti.",
              "Bengali": "Rajasthani Chicken Curry ready! Ghee-rich, aromatic ar comfort er dish — bajra roti diye perfect.",
              "Hindi": "Homestyle Rajasthani Chicken taiyar hai! Ghee-rich aur masaledar — bajra roti ke saath khao.",
              "Hinglish": "Rajasthani Chicken Curry ready hai! Ghee aur masala ka rich combo — bajra roti ke saath best!",
              "Oriya": "Rajasthani Chicken Curry ready! Ghee o masala sahita comfort curry."
            }
          }
        ],
        "Breakfast/Snacks ☕": [
          {
            title: "Mohan Thal (Besan Fudge)",
            time: "20 MINS",
            complexity: "EASY",
            tag: "RAJASTHANI SWEET",
            ingredients: [
              "Gram flour (1 cup)",
              "Ghee (1/2 cup)",
              "Sugar (1 cup, for syrup)",
              "Cardamom & Saffron",
              "Dry fruits"
            ],
            steps: [
              "Roast gram flour in ghee on low heat until golden and fragrant.",
              "Prepare one-string sugar syrup. Mix with roasted flour.",
              "Pour into a greased tray, top with dry fruits. Let it set and cut into squares."
            ],
            chatResponse: {
              "English": "Mohan Thal is ready! Rajasthani gram flour fudge — rich, nutty, and melt-in-mouth sweet.",
              "Bengali": "Mohan Thal ready! Rajasthani gram flour fudge — rich ar melt-in-mouth.",
              "Hindi": "Mohan Thal taiyar hai! Rajasthani besan ki barfi — rich, nutty, aur muh mein ghulne wali.",
              "Hinglish": "Rajasthani Mohan Thal ready hai! Ghee-roasted besan fudge — rich aur melt-in-mouth sweet!",
              "Oriya": "Mohan Thal ready! Rajasthani gram flour fudge — rich o tasty."
            }
          }
        ]
      }
    },
    "Vegetarian": {
      "Spicy Feast 🌶️": {
        "Lunch/Dinner 🍽️": [
          {
            title: "Dal Baati Churma (Rajasthani Baked Dumpling Feast)",
            time: "70 MINS",
            complexity: "ELABORATE",
            tag: "RAJASTHANI ROYALE",
            ingredients: [
              "Wheat flour (2 cups, for Baati)",
              "Ghee (1/2 cup + extra for drizzling)",
              "Five lentil mix (Toor, Moong, Chana, Masoor, Urad) for dal",
              "Tomatoes, Onion, Ginger-garlic for dal",
              "Coarse wheat flour + Jaggery + Cardamom for Churma"
            ],
            steps: [
              "For Baati: Mix flour with ghee, salt, and enough water to make a stiff dough. Shape into smooth balls.",
              "Bake at 200°C for 30-35 minutes until the outside is hard and the inside is fully cooked through.",
              "OR cook on a coal fire / gas burner tandoor for authentic charred flavor.",
              "For Five-Dal: pressure cook all lentils together. Make a rich tadka with ghee, tomato, onion, and spices.",
              "For Churma: coarsely grind the remaining wheat balls. Roast in ghee, mix with jaggery and cardamom.",
              "Serve: break open the Baati, pour generous ghee inside. Serve alongside the five-dal and sweet Churma."
            ],
            chatResponse: {
              "English": "The royal Dal Baati Churma is ready! Rajasthan's greatest culinary achievement — baked wheat dumplings, five-lentil dal, and sweet Churma with rivers of ghee.",
              "Bengali": "Royal Dal Baati Churma ready! Rajasthan-er shreshtha ranna — baked baati, panch dal ar mishti churma ghee-r sathe — darun regal feast.",
              "Hindi": "Rajasthani Dal Baati Churma taiyar hai! Rajasthan ki shaan — bake ki hui baati, panch dal aur meetha churma — ghee ke saath khaao, raja jaisi feeling aaye.",
              "Hinglish": "Royal Dal Baati Churma ready hai! Baked wheat dumpling, five lentil dal aur sweet churma — Rajasthan ka greatest dish. Ghee khoob daalo!",
              "Oriya": "Dal Baati Churma ready! Rajasthan er royal feast — baked baati, panch dali o sweet churma."
            }
          }
        ],
        "Breakfast/Snacks ☕": [
          {
            title: "Pyaaz Ki Kachori (Crispy Onion Pastry)",
            time: "35 MINS",
            complexity: "MEDIUM",
            tag: "JODHPURI SPECIAL",
            ingredients: [
              "Refined flour / Maida (2 cups)",
              "Onion (3 large, finely chopped)",
              "Fennel seeds (1 tsp)",
              "Red chili & Garam masala",
              "Oil for frying"
            ],
            steps: [
              "Make a medium-stiff dough with flour, oil, and water. Rest 20 minutes.",
              "For filling: sauté onions until soft. Add all spices. Cook until dry. Cool.",
              "Roll small dough circles. Stuff with onion filling. Seal tightly.",
              "Deep fry on medium-low heat until deeply golden and very crispy.",
              "Serve with tamarind chutney and green chutney."
            ],
            chatResponse: {
              "English": "Crispy Jodhpuri Pyaaz Kachori is ready! The most famous breakfast of Rajasthan — flaky, crispy pastry with a spiced onion filling.",
              "Bengali": "Crispy Pyaaz Kachori ready! Rajasthan-er shobcheye famous breakfast — flaky crispy pastry moshladar onion filling e.",
              "Hindi": "Crispy Jodhpuri Kachori taiyar hai! Rajasthan ka sabse famous breakfast — flaky crispy kachori andar masaledar pyaaz ke saath.",
              "Hinglish": "Jodhpuri Pyaaz Kachori ready hai! Rajasthan ka iconic breakfast — crispy flaky pastry with spiced onion — imli chutney ke saath must have!",
              "Oriya": "Crispy Pyaaz Kachori ready! Rajasthan famous breakfast, masala onion bharti flaky kachori."
            }
          }
        ]
      },
      "Light Comfort 🥣": {
        "Lunch/Dinner 🍽️": [
          {
            title: "Ker Sangri (Desert Berry & Bean Curry)",
            time: "30 MINS",
            complexity: "MEDIUM",
            tag: "DESERT TREASURE",
            ingredients: [
              "Ker berries (dried, 100g, soaked)",
              "Sangri pods (dried, 100g, soaked)",
              "Dry red chilies (4)",
              "Mustard oil (3 tbsp)",
              "Aamchur (dry mango powder)"
            ],
            steps: [
              "Soak Ker and Sangri in water overnight. Boil until tender.",
              "Heat mustard oil until smoking. Add dry red chilies, cumin, and the boiled ker-sangri.",
              "Sauté on medium heat for 10 minutes. Add all spices including aamchur.",
              "Cook until fragrant and slightly dry. Serve with bajra roti."
            ],
            chatResponse: {
              "English": "Traditional Ker Sangri is ready! A unique desert treasure — two Rajasthani desert plant ingredients cooked together in a tangy, spicy dry curry.",
              "Bengali": "Traditional Ker Sangri ready! Rajasthani desert-er special — do unique plant ingredient diye tairi tangy dry curry.",
              "Hindi": "Traditional Ker Sangri taiyar hai! Rajasthan ki ek anokhi dish — reth ke donon ingredients ko milakar banaya gaya tangy spicy curry.",
              "Hinglish": "Rajasthani Ker Sangri ready hai! Desert ki unique ingredient se bana ek special dry curry — bajra roti ke saath khao!",
              "Oriya": "Ker Sangri ready! Rajasthan desert ingredient sahita unique tangy dry curry."
            }
          }
        ],
        "Breakfast/Snacks ☕": [
          {
            title: "Gatte Ki Sabzi (Gram Flour Dumpling Curry)",
            time: "40 MINS",
            complexity: "MEDIUM",
            tag: "RAJASTHANI COMFORT",
            ingredients: [
              "Gram flour / Besan (1 cup)",
              "Sour Yogurt (1.5 cups)",
              "Red chili & Coriander powder",
              "Garam masala (1/2 tsp)",
              "Ghee + Mustard seeds for tadka"
            ],
            steps: [
              "Mix besan with spices, a little oil, and water into a stiff dough. Shape into logs.",
              "Boil the logs in salted water for 10 minutes. Cool and slice into rounds (Gatte).",
              "For curry: whisk sour yogurt with spices. Sauté in ghee until oil separates.",
              "Add 1.5 cups water and bring to a boil. Add the sliced Gatte.",
              "Simmer 10 minutes. Make tadka with ghee, mustard, and curry leaves. Pour over.",
              "Serve with bajra or wheat roti."
            ],
            chatResponse: {
              "English": "Comforting Gatte Ki Sabzi is ready! Classic Rajasthani gram flour dumplings in a tangy yogurt gravy — a desert-region delicacy.",
              "Bengali": "Darun Gatte Ki Sabzi ready! Classic Rajasthani gram flour dumpling tangy yogurt curry te — darun desert delicacy.",
              "Hindi": "Swadisht Gatte Ki Sabzi taiyar hai! Rajasthani classic — gram flour ke dumplings khatti dahi ki gravy mein. Bajra roti ke saath lajawaab!",
              "Hinglish": "Rajasthani Gatte Ki Sabzi ready hai! Besan ke dumplings aur tangy yogurt curry — roti ke saath amazing desert dish!",
              "Oriya": "Gatte Ki Sabzi ready! Rajasthani besan dumpling tangy yogurt curry sahita."
            }
          }
        ]
      },
      "Jain Special 📿": {
        "Lunch/Dinner 🍽️": [
          {
            title: "Jain Gatte Ki Sabzi (No Onion-Garlic Dumpling Curry)",
            time: "35 MINS",
            complexity: "MEDIUM",
            tag: "JAIN RAJASTHANI",
            ingredients: [
              "Gram flour (1 cup)",
              "Sour yogurt (1.5 cups)",
              "Hing / Asafoetida (1/4 tsp)",
              "Red chili & Coriander powder",
              "Ghee & Mustard seeds"
            ],
            steps: [
              "Make besan dough with hing, spices, and oil. Shape and boil as Gatte.",
              "For curry: whisk yogurt with spices. Cook in ghee with hing (no onion/garlic).",
              "Add Gatte and simmer 10 minutes.",
              "Serve with Jain roti (no root vegetables)."
            ],
            chatResponse: {
              "English": "Jain Gatte Ki Sabzi is ready! A pure sattvik Rajasthani dish — no onion, garlic or root vegetables.",
              "Bengali": "Jain Gatte Ki Sabzi ready! Shuddho sattvik Rajasthani dish — peyaj, rosun ba root chara.",
              "Hindi": "Jain Gatte Ki Sabzi taiyar hai! Shudh sattvik Rajasthani dish — bina pyaaz, lehsun ke.",
              "Hinglish": "Jain Gatte ready hai! Pure sattvik Rajasthani dish — no onion, no garlic, no roots.",
              "Oriya": "Jain Gatte Ki Sabzi ready! Shuddha sattvik Rajasthani dish, piaja rasuna bina."
            }
          }
        ],
        "Breakfast/Snacks ☕": [
          {
            title: "Jain Churma (Sweet Wheat Crumble)",
            time: "25 MINS",
            complexity: "EASY",
            tag: "JAIN SWEET",
            ingredients: [
              "Wheat flour (2 cups)",
              "Ghee (1/2 cup)",
              "Jaggery (1 cup, grated)",
              "Cardamom & Dry fruits"
            ],
            steps: [
              "Make stiff wheat dough. Shape into small balls and deep fry or bake until hard.",
              "Coarsely grind the baked balls.",
              "Mix in ghee, jaggery, and cardamom. Mix vigorously until combined.",
              "Garnish with dry fruits. Eat with ghee."
            ],
            chatResponse: {
              "English": "Jain Churma is ready! A pure sattvik Rajasthani sweet — coarse wheat crumble with ghee and jaggery.",
              "Bengali": "Jain Churma ready! Shuddho sattvik Rajasthani mishti — wheat crumble, ghee ar jaggery diye.",
              "Hindi": "Jain Churma taiyar hai! Shudh sattvik Rajasthani meetha — ghee, gur aur atta ka crumble.",
              "Hinglish": "Jain Churma ready hai! Pure sattvik Rajasthani sweet — ghee aur jaggery ke saath coarse wheat crumble.",
              "Oriya": "Jain Churma ready! Shuddha Rajasthani sweet — wheat crumble, ghee o jaggery sahita."
            }
          }
        ]
      }
    }
  }
};

export const getMergedKnowledgeBase = () => {
  const base = JSON.parse(JSON.stringify(CULINARY_KNOWLEDGE_BASE));
  const customStr = localStorage.getItem('hc_custom_recipes');
  if (customStr) {
    try {
      const customs = JSON.parse(customStr);
      customs.forEach(c => {
        const { state, diet, mood, course, recipe } = c;
        if (!state || !diet || !mood || !course || !recipe) return;
        if (!base[state]) base[state] = {};
        if (!base[state][diet]) base[state][diet] = {};
        if (!base[state][diet][mood]) base[state][diet][mood] = {};
        if (!base[state][diet][mood][course]) base[state][diet][mood][course] = [];
        
        const exists = base[state][diet][mood][course].some(
          r => r.title.toLowerCase() === recipe.title.toLowerCase()
        );
        if (!exists) {
          base[state][diet][mood][course].push(recipe);
        }
      });
    } catch (e) {
      console.error("Error merging custom recipes", e);
    }
  }
  return base;
};

export const appendCustomRecipe = (state, diet, mood, course, recipe) => {
  try {
    const customStr = localStorage.getItem('hc_custom_recipes') || '[]';
    const customs = JSON.parse(customStr);
    customs.push({ state, diet, mood, course, recipe });
    localStorage.setItem('hc_custom_recipes', JSON.stringify(customs));
    return true;
  } catch (e) {
    console.error("Error saving custom recipe to localStorage", e);
    return false;
  }
};
