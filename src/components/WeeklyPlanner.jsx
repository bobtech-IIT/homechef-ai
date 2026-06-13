import React, { useState } from 'react';
import { Calendar, Printer, X, RefreshCw, FileText, CheckCircle2, Clock, Sparkles, Plus } from 'lucide-react';

// --- Shared Premium Print Recipe Steps & Ingredients Dictionary ---
const getPrintRecipeSteps = (title, profile) => {
  const normalized = (title || '').toLowerCase();
  
  if (normalized.includes('shorshe maach') || normalized.includes('mustard fish') || normalized.includes('fish curry')) {
    return {
      time: '25 mins',
      complexity: 'Medium',
      ingredients: [
        'Fresh Fish Steaks (500g)',
        'Mustard paste (3 tbsp)',
        'Mustard Oil (4 tbsp)',
        'Turmeric powder (1 tsp)',
        'Green Chilies (4-5)',
        'Salt to taste'
      ],
      steps: [
        'Marinate fish steaks with salt and turmeric powder for 10 minutes.',
        'Shallow fry the fish steaks lightly in hot mustard oil on both sides, then set aside.',
        'Temper the remaining oil with Nigella seeds (Kalonji) and split green chilies.',
        'Pour in the mustard paste mixed with 1/2 cup warm water, simmer on low.',
        'Slide in the fried fish, cover, and let cook for 5 minutes until gravy coats the fish.',
        'Drizzle 1 tsp raw mustard oil on top and let rest before serving hot.'
      ]
    };
  }

  if (normalized.includes('luchi') && (normalized.includes('alur dom') || normalized.includes('aloo dum') || normalized.includes('dom'))) {
    return {
      time: '30 mins',
      complexity: 'Medium',
      ingredients: [
        'Refined Flour / Maida (2 cups)',
        'Ghee (for deep frying)',
        'Boiled Potatoes (4-5, cubed)',
        'Ginger paste & Tomato puree (1/2 cup)',
        'Spices: Turmeric, cumin, red chili'
      ],
      steps: [
        'Knead refined flour with 2 tbsp ghee, salt, and warm water into a soft dough. Rest covered for 15 minutes.',
        'Prick boiled potatoes and shallow fry in a little ghee until golden brown.',
        'Sauté ginger paste and tomato puree in 1 tbsp ghee until oil separates.',
        'Stir in red chili, cumin, and turmeric powders. Add fried potatoes, salt, a pinch of sugar, and 1 cup water.',
        'Simmer on medium heat for 10 minutes until the potato gravy is thick and coats the potatoes.',
        'Roll dough into thin rounds, deep-fry in smoking ghee until beautifully puffed, and serve hot with Alur Dom.'
      ]
    };
  }

  if (normalized.includes('posto') || normalized.includes('poppy')) {
    return {
      time: '20 mins',
      complexity: 'Easy',
      ingredients: [
        'Potatoes or Paneer (300g, cubed)',
        'Poppy Seeds / Posto (4 tbsp, ground to smooth paste)',
        'Mustard Oil (3 tbsp)',
        'Green Chilies (4, split)',
        'Kalonji / Nigella seeds (1/2 tsp)'
      ],
      steps: [
        'Soak poppy seeds in warm water, then grind with 2 green chilies into a thick, smooth paste.',
        'Heat mustard oil in a heavy pan. Temper with Kalonji and split green chilies.',
        'Add diced potatoes (or paneer) and sauté on medium heat for 5 minutes until golden.',
        'Add salt, 1/2 cup water, cover, and cook on low heat until 90% tender.',
        'Pour in the poppy seed paste, stir to coat, and cook on low for 3 minutes.',
        'Drizzle a splash of raw mustard oil, cover, turn off heat, and steam for 2 minutes.'
      ]
    };
  }

  if (normalized.includes('cholar dal') || normalized.includes('yellow dal') || normalized.includes('dal tadka') || normalized.includes('dal fry')) {
    return {
      time: '25 mins',
      complexity: 'Easy',
      ingredients: [
        'Lentils (Bengal Gram or Toor Dal) (1 cup)',
        'Cumin seeds (1 tsp)',
        'Pure Cow Ghee (2 tbsp)',
        'Hing / Asafoetida (a pinch)',
        'Dry red chilies & Ginger-tomato splash'
      ],
      steps: [
        'Wash lentils thoroughly. Pressure cook with turmeric, salt, and water for 3 whistles until soft.',
        'Lightly whisk the cooked lentils for a smooth, cohesive consistency.',
        'In a small pan, heat cow ghee. Let cumin seeds crackle and sauté split red chilies.',
        'Add a pinch of Hing, Kashmiri red chili powder, and pour sizzling ghee tempering into the hot dal.',
        'Cover immediately for 2 minutes to trap the smoky ghee aroma, garnish with coriander.'
      ]
    };
  }

  if (normalized.includes('kosha mangsho') || normalized.includes('mutton curry')) {
    return {
      time: '50 mins',
      complexity: 'Elaborate',
      ingredients: [
        'Goat Mutton (500g)',
        'Onions (3, finely sliced)',
        'Ginger-Garlic Paste (2 tbsp)',
        'Yogurt (1/2 cup)',
        'Mustard Oil (4 tbsp)',
        'Spices: Bengali Garam Masala, chili, turmeric'
      ],
      steps: [
        'Marinate mutton with yogurt, mustard oil, ginger-garlic paste, and basic spices for 1 hour.',
        'Heat mustard oil until smoking hot. Sauté sliced onions slowly until dark caramelized brown.',
        'Add marinated mutton and sauté (Bhuno) on medium-high heat for 20 minutes until oil separates.',
        'Add 2 cups warm water and halved potatoes. Cover and slow cook or pressure cook for 5 whistles until meat is super tender.',
        'Reduce the gravy on high heat until it is thick, dark brown, and coats the mutton pieces.',
        'Sprinkle home-ground Bengali garam masala and raw ghee before serving with soft luchis or paratha.'
      ]
    };
  }

  if (normalized.includes('chicken') && (normalized.includes('kosha') || normalized.includes('tariwala') || normalized.includes('butter') || normalized.includes('curry'))) {
    return {
      time: '35 mins',
      complexity: 'Medium',
      ingredients: [
        'Chicken pieces (500g)',
        'Onions (2, chopped)',
        'Ginger-Garlic paste (1.5 tbsp)',
        'Tomato Puree (1 cup)',
        'Pure Butter or Oil (3 tbsp)',
        'Cream & Kasuri Methi (for butter chicken)'
      ],
      steps: [
        'Marinate chicken chunks with yogurt, lemon juice, salt, and red chili powder for 30 minutes.',
        'Sauté onions, ginger, and garlic in a pan until golden brown and aromatic.',
        'Add tomato puree and cook until the gravy releases oil on the edges.',
        'Slide in the marinated chicken, sautéing on high heat for 5 minutes to seal in juices.',
        'Cover and simmer on low-medium flame for 15-20 minutes until chicken is tender.',
        'If preparing Butter Chicken, stir in fresh cream, butter, and crushed roasted Kasuri Methi.'
      ]
    };
  }

  // Fallback for any other Indian dish
  return {
    time: '25 mins',
    complexity: 'Medium',
    ingredients: [
      `${title} primary base (freshly cut)`,
      'Cooking oil or ghee (2 tbsp)',
      'Homestyle spices: Turmeric, chili, salt',
      'Onion, Ginger & Garlic aromatics',
      'Fresh coriander for garnish'
    ],
    steps: [
      `Clean and prep all raw bases for the ${title} recipe. Season lightly with turmeric.`,
      'Heat oil or pure ghee in a heavy-bottomed pan. Sauté chopped onions and ginger-garlic paste.',
      'Stir in key spices (turmeric, chili powder, salt) along with a splash of water to prevent burning.',
      `Slide in the prepared ingredients for ${title}, tossing to coat them completely in the masala.`,
      'Pour in warm water, cover the pan, and simmer on medium-low heat for 12-15 minutes.',
      'Garnish with fresh coriander leaves, drizzle a teaspoon of ghee, and let rest covered for 2 minutes.'
    ]
  };
};

const APPORTIONABLE_RECIPES = {
  Breakfast: [
    { title: 'Dim Pauruti (Bengali Egg Toast)', tag: 'Non-Veg • Bengal', time: '10m', complexity: 'Easy', description: 'Spiced egg-coated bread shallow fried, homestyle recipe.', palates: ['West Bengal'] },
    { title: 'Chirer Poha (Bengali Chirer Polao)', tag: 'Veg • Bengal', time: '15m', complexity: 'Easy', description: 'Flattened rice tossed with green peas, peanuts and turmeric.', palates: ['West Bengal'] },
    { title: 'Dhakai Luchi & Alur Dom', tag: 'Veg • Bengal', time: '25m', complexity: 'Medium', description: 'Puffed golden white flour puris served with spiced homestyle potato curry.', palates: ['West Bengal'] },
    { title: 'Amritsari Aloo Paratha & Butter', tag: 'Veg • Punjab', time: '20m', complexity: 'Medium', description: 'Crispy whole wheat flatbread stuffed with spiced potato mash, topped with fresh white butter.', palates: ['Punjab', 'Delhi'] },
    { title: 'Egg Bhurji Pav', tag: 'Non-Veg • Punjab', time: '15m', complexity: 'Easy', description: 'Scrambled eggs cooked with onions, tomatoes, and spices, served with buttered pav.', palates: ['Punjab', 'Delhi'] },
    { title: 'Indori Poha with Sev', tag: 'Veg • Light', time: '15m', complexity: 'Easy', description: 'Tangy steamed rice flakes topped with crunchy sev, fresh coriander & lemon.', palates: ['Punjab', 'Gujarat', 'Maharashtra'] },
    { title: 'Soft Idli & Coconut Chutney', tag: 'Veg • South', time: '15m', complexity: 'Easy', description: 'Steamed fluffy rice cakes served with fresh ground coconut chutney.', palates: ['South India'] },
    { title: 'Suji Upma & Chutney', tag: 'Veg • South', time: '15m', complexity: 'Easy', description: 'Roasted semolina cooked with mustard seeds, curry leaves, and vegetables.', palates: ['South India'] },
    { title: 'Methi Thepla & Fresh Curd', tag: 'Veg • Gujarat', time: '15m', complexity: 'Easy', description: 'Thin, spiced fenugreek-infused wheat flatbreads served with cool yogurt.', palates: ['Gujarat'] },
    { title: 'Kanda Poha & Solkadhi', tag: 'Veg • Maharashtra', time: '15m', complexity: 'Easy', description: 'Savoury flattened rice flakes cooked with caramelized onions and mild spices.', palates: ['Maharashtra'] }
  ],
  Lunch: [
    { title: 'Bengali Shorshe Maach & Rice', tag: 'Non-Veg • Bengal', time: '30m', complexity: 'Medium', description: 'Authentic river fish steak cooked in rich, pungent mustard & green chili gravy, served with rice.', palates: ['West Bengal'] },
    { title: 'Rui Macher Jhol & Bhat', tag: 'Non-Veg • Bengal', time: '30m', complexity: 'Medium', description: 'Rui fish steaks simmered in light potato, cumin, and turmeric gravy, served with steamed rice.', palates: ['West Bengal'] },
    { title: 'Bengali Aloo Posto & Rice', tag: 'Veg • Bengal', time: '25m', complexity: 'Easy', description: 'Diced potatoes simmered in a thick, nutty poppy seed paste, with steamed rice.', palates: ['West Bengal'] },
    { title: 'Punjabi Rajma Chawal & Raita', tag: 'Veg • Punjab', time: '30m', complexity: 'Medium', description: 'Slow cooked red kidney beans in thick spiced onion-tomato gravy, served with hot Basmati rice.', palates: ['Punjab', 'Delhi'] },
    { title: 'Punjabi Tariwala Chicken & Bhat', tag: 'Non-Veg • Punjab', time: '35m', complexity: 'Medium', description: 'Homestyle chicken curry cooked with whole aromatic spices, served with soft rice.', palates: ['Punjab', 'Delhi'] },
    { title: 'Yellow Dal Tadka & Jeera Rice', tag: 'Veg • Classic', time: '25m', complexity: 'Easy', description: 'Comforting yellow lentils tempered with cumin seeds, garlic, and pure cow ghee.', palates: ['Punjab', 'West Bengal', 'Delhi', 'Maharashtra'] },
    { title: 'Sambar Rice & Potato Fry', tag: 'Veg • South', time: '25m', complexity: 'Easy', description: 'Tangy tamarind lentil rice served with crispy spiced pan-fried potatoes.', palates: ['South India'] },
    { title: 'Chicken Chettinad & Rice', tag: 'Non-Veg • South', time: '35m', complexity: 'Spicy', description: 'Fiery roasted black pepper and coconut chicken curry, with steamed rice.', palates: ['South India'] },
    { title: 'Gujarati Kadhi & Jeera Rice', tag: 'Veg • Gujarat', time: '20m', complexity: 'Easy', description: 'Sweet and sour yogurt soup thickened with chickpea flour, served with cumin rice.', palates: ['Gujarat'] },
    { title: 'Pithla Bhakri & Thecha', tag: 'Veg • Maharashtra', time: '25m', complexity: 'Easy', description: 'Spiced chickpea flour paste served with sorghum flatbread and fiery garlic chili chutney.', palates: ['Maharashtra'] }
  ],
  Snack: [
    { title: 'Masala Chai & Biscuits', tag: 'Veg • Classic', time: '5m', complexity: 'Easy', description: 'Hot ginger-infused milk tea served with crispy wheat crackers.', palates: ['Punjab', 'West Bengal', 'Delhi', 'Maharashtra', 'Gujarat'] },
    { title: 'Chai & Jhal Muri', tag: 'Veg • Bengal', time: '10m', complexity: 'Easy', description: 'Tangy puffed rice spiced with mustard oil, chopped onions, coriander and peanuts.', palates: ['West Bengal'] },
    { title: 'Chai & Crispy Fish Kabiraji', tag: 'Non-Veg • Bengal', time: '20m', complexity: 'Elaborate', description: 'Traditional fish cutlet coated in a fine crispy lace of fried egg, with tea.', palates: ['West Bengal'] },
    { title: 'Masala Chai & Punjabi Samosa', tag: 'Veg • Punjab', time: '15m', complexity: 'Easy', description: 'Perfect evening ginger tea paired with hot crispy potato samosas.', palates: ['Punjab', 'Delhi'] },
    { title: 'Chai & Amritsari Fish Fry', tag: 'Non-Veg • Punjab', time: '15m', complexity: 'Easy', description: 'Spiced gram flour battered deep-fried river fish pieces with hot tea.', palates: ['Punjab'] },
    { title: 'Filter Coffee & Banana Chips', tag: 'Veg • South', time: '10m', complexity: 'Easy', description: 'Strong, aromatic South Indian frothed coffee served with crispy salted banana chips.', palates: ['South India'] },
    { title: 'Chai & Khaman Dhokla', tag: 'Veg • Gujarat', time: '15m', complexity: 'Easy', description: 'Steamed spongy gram flour cakes seasoned with mustard seeds & curry leaves, with tea.', palates: ['Gujarat'] },
    { title: 'Cutting Chai & Vada Pav', tag: 'Veg • Maharashtra', time: '15m', complexity: 'Easy', description: 'Hot tea paired with spicy deep-fried potato dumpling stuffed in a bread bun.', palates: ['Maharashtra'] },
    { title: 'Chai & Roasted Makhana', tag: 'Veg • Healthy', time: '10m', complexity: 'Easy', description: 'Evening tea served with light, crunchy toasted cumin-salt lotus seeds.', palates: ['Punjab', 'West Bengal', 'Delhi'] }
  ],
  Dinner: [
    { title: 'Paneer Butter Masala & Roti', tag: 'Veg • Classic', time: '30m', complexity: 'Medium', description: 'Cottage cheese in rich creamy cashew-tomato curry, served with thin phulkas.', palates: ['Punjab', 'Delhi', 'West Bengal'] },
    { title: 'Kosha Mangsho & Soft Luchi', tag: 'Non-Veg • Bengal', time: '50m', complexity: 'Spicy', description: 'Slow cooked spicy mutton curry in dark caramelised onion gravy, served with puffed white puris.', palates: ['West Bengal'] },
    { title: 'Bengali Dhokar Dalna & Phulka', tag: 'Veg • Bengal', time: '40m', complexity: 'Medium', description: 'Spiced lentil cakes simmered in ginger-cumin tomato gravy with soft rotis.', palates: ['West Bengal'] },
    { title: 'Butter Chicken & Roti', tag: 'Non-Veg • Punjab', time: '40m', complexity: 'Spicy', description: 'Tender chicken pieces in rich, sweet tomato and cashew cream gravy, with phulkas.', palates: ['Punjab', 'Delhi'] },
    { title: 'Dal Makhani & Naan', tag: 'Veg • Punjab', time: '45m', complexity: 'Medium', description: 'Creamy black lentils slow-cooked overnight with spices and butter, served with soft flatbread.', palates: ['Punjab', 'Delhi'] },
    { title: 'Plain Dosa & Kurma', tag: 'Veg • South', time: '20m', complexity: 'Easy', description: 'Crispy fermented rice crepe served with vegetable coconut curry.', palates: ['South India'] },
    { title: 'Malabar Fish Curry & Appam', tag: 'Non-Veg • South', time: '35m', complexity: 'Medium', description: 'Tangy fish curry cooked in coconut milk, paired with lacy white appams.', palates: ['South India'] },
    { title: 'Sev Tamatar Shaak & Rotla', tag: 'Veg • Gujarat', time: '20m', complexity: 'Easy', description: 'Spicy tomato curry topped with crispy gram flour noodles, served with thick millet flatbread.', palates: ['Gujarat'] },
    { title: 'Bharli Vangi & Soft Poli', tag: 'Veg • Maharashtra', time: '30m', complexity: 'Medium', description: 'Eggplants stuffed with roasted peanut, sesame and spice powder, served with soft rotis.', palates: ['Maharashtra'] },
    { title: 'Dim Kosha & Phulka', tag: 'Non-Veg • Classic', time: '20m', complexity: 'Easy', description: 'Thick egg gravy seasoned with ginger-garlic paste, served with soft phulkas.', palates: ['West Bengal', 'Punjab'] }
  ]
};

export default function WeeklyPlanner({ mealPlan, onSwapMeal, profile, onClearPlan, onAddMeal }) {
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [activeDayFilter, setActiveDayFilter] = useState('ALL');
  const [copiedText, setCopiedText] = useState(false);

  // Dynamically build current week's day labels (same logic as App.jsx generateInitialMeals)
  const getCurrentWeekDays = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diffToMon = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = new Date(today);
    monday.setDate(today.getDate() + diffToMon);
    const names = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
    const result = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      result.push(`${names[d.getDay()]} ${d.getDate()}`);
    }
    return result;
  };

  // Days list represented in the seeded database
  const days = ['ALL', ...getCurrentWeekDays()];
  const weekDays = getCurrentWeekDays();

  // Interactive Apportioning Assistant state
  const [activeApportionCourse, setActiveApportionCourse] = useState('Breakfast');
  const [activeApportionDay, setActiveApportionDay] = useState(weekDays[0] || 'MON 25');
  const [addedStatusId, setAddedStatusId] = useState(null);

  const filteredMeals = activeDayFilter === 'ALL'
    ? mealPlan
    : mealPlan.filter(m => m.dayOfWeek === activeDayFilter);

  // Group meals by day for the premium printable PDF table
  const groupedDays = weekDays.reduce((acc, day) => {
    acc[day] = {
      Breakfast: mealPlan.find(m => m.dayOfWeek === day && m.mealType === 'Breakfast'),
      Lunch: mealPlan.find(m => m.dayOfWeek === day && m.mealType === 'Lunch'),
      Snack: mealPlan.find(m => m.dayOfWeek === day && m.mealType === 'Snack'),
      Dinner: mealPlan.find(m => m.dayOfWeek === day && m.mealType === 'Dinner')
    };
    return acc;
  }, {});

  const handlePrint = () => {
    window.print();
  };

  const handleCopyToClipboard = () => {
    let text = `📋 *${profile.familyName.toUpperCase()} FAMILY DIET PLAN* \n`;
    text += `Regional Taste: ${profile.regionalPalate} • Diet: ${profile.dietaryPreference}\n\n`;
    
    weekDays.forEach(day => {
      const meals = groupedDays[day];
      if (meals) {
        text += `📅 *${day}*\n`;
        if (meals.Breakfast) text += `🍳 Breakfast: ${meals.Breakfast.title} (${meals.Breakfast.cookTime})\n`;
        if (meals.Lunch) text += `🍽️ Lunch: ${meals.Lunch.title} (${meals.Lunch.cookTime})\n`;
        if (meals.Snack) text += `☕ Snack: ${meals.Snack.title} (${meals.Snack.cookTime})\n`;
        if (meals.Dinner) text += `🌙 Dinner: ${meals.Dinner.title} (${meals.Dinner.cookTime})\n`;
        text += `\n`;
      }
    });

    text += `_Generated by Homechef AI Sathi_ ✨`;

    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    }).catch(err => {
      console.error("Clipboard copy failed: ", err);
    });
  };

  const handleAddMeal = (recipe) => {
    if (onAddMeal) {
      onAddMeal({
        dayOfWeek: activeApportionDay,
        mealType: activeApportionCourse,
        title: recipe.title,
        description: recipe.description,
        time: recipe.time,
        complexity: recipe.complexity,
        tag: recipe.tag
      });
      setAddedStatusId(recipe.title);
      setTimeout(() => setAddedStatusId(null), 1500);
    }
  };

  // Sort recipes so that regional favorites for profile.regionalPalate are sorted first!
  const currentRecipes = APPORTIONABLE_RECIPES[activeApportionCourse] || [];
  const sortedApportionRecipes = [...currentRecipes].sort((a, b) => {
    const aReg = a.palates.includes(profile.regionalPalate) ? 1 : 0;
    const bReg = b.palates.includes(profile.regionalPalate) ? 1 : 0;
    return bReg - aReg; // 1 (regional) comes first
  });

  return (
    <div className="fade-in-slide" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Top action row */}
      <div className="no-print" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-masala)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Calendar size={20} style={{ color: 'var(--primary-saffron)' }} />
          Weekly Food Planner
        </h3>

        <div style={{ display: 'flex', gap: '8px' }}>
          {mealPlan.length > 0 && (
            <button 
              onClick={onClearPlan}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'var(--pill-soft)',
                color: 'var(--accent-tomato)',
                border: '1px solid var(--border-sand)',
                padding: '8px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Clear Active Plan
            </button>
          )}

          <button 
            onClick={() => setShowPdfModal(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'var(--secondary-turmeric)',
              color: 'var(--text-masala)',
              border: 'none',
              padding: '8px 14px',
              borderRadius: 'var(--radius-full)',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: 'var(--shadow-warm)'
            }}
          >
            <FileText size={15} />
            Premium PDF
          </button>
        </div>
      </div>

      {/* 🍳 Interactive Meal Apportioning Assistant Section */}
      <div className="no-print warm-card" style={{
        padding: '16px',
        backgroundColor: '#FCFBF9',
        border: '1.5px solid var(--primary-saffron)',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        borderRadius: '16px',
        boxShadow: 'var(--shadow-warm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={20} style={{ color: 'var(--primary-saffron)', flexShrink: 0 }} />
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 900, color: 'var(--text-masala)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Quick Meal Apportioning Assistant
            </h4>
            <p style={{ fontSize: '10px', color: 'var(--text-muted)', margin: 0 }}>
              Select meal category & day, then instantly apportion dishes into your weekly planning sheet!
            </p>
          </div>
        </div>

        {/* Meal type radio tabs */}
        <div>
          <label style={{ fontSize: '9px', fontWeight: 900, color: 'var(--text-light)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
            1. Select Meal Course:
          </label>
          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
            {[
              { key: 'Breakfast', label: '🍳 Breakfast', color: 'var(--primary-saffron)' },
              { key: 'Lunch', label: '🍽️ Lunch', color: 'var(--accent-coriander)' },
              { key: 'Snack', label: '☕ Evening Snacks', color: 'var(--secondary-turmeric)' },
              { key: 'Dinner', label: '🌙 Dinner', color: '#8B5CF6' }
            ].map(item => {
              const isSel = activeApportionCourse === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setActiveApportionCourse(item.key)}
                  style={{
                    padding: '6px 12px',
                    fontSize: '11px',
                    fontWeight: 800,
                    borderRadius: 'var(--radius-full)',
                    border: '1.5px solid',
                    borderColor: isSel ? item.color : 'var(--border-sand)',
                    backgroundColor: isSel ? item.color : '#FFFFFF',
                    color: isSel ? '#FFFFFF' : 'var(--text-masala)',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'var(--transition-cozy)'
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Day selection radio tabs */}
        <div>
          <label style={{ fontSize: '9px', fontWeight: 900, color: 'var(--text-light)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
            2. Select Target Day:
          </label>
          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
            {weekDays.map((day, idx) => {
              const isSel = activeApportionDay === day;
              let relativeLabel = day;
              if (idx === 0) relativeLabel = `${day} (Today)`;
              else if (idx === 1) relativeLabel = `${day} (Tomorrow)`;
              else if (idx === 2) relativeLabel = `${day} (Day After)`;
              
              return (
                <button
                  key={day}
                  onClick={() => setActiveApportionDay(day)}
                  style={{
                    padding: '6px 12px',
                    fontSize: '10px',
                    fontWeight: 800,
                    borderRadius: '8px',
                    border: '1px solid',
                    borderColor: isSel ? 'var(--primary-saffron)' : 'var(--border-sand)',
                    backgroundColor: isSel ? 'var(--primary-saffron)' : '#FFFFFF',
                    color: isSel ? '#FFFFFF' : 'var(--text-masala)',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'var(--transition-cozy)'
                  }}
                >
                  {relativeLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dishes list grid */}
        <div>
          <label style={{ fontSize: '9px', fontWeight: 900, color: 'var(--text-light)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
            3. Choose & Apportion Culinary Dish:
          </label>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '8px',
            maxHeight: '260px',
            overflowY: 'auto',
            paddingRight: '4px'
          }}>
            {sortedApportionRecipes.map((recipe, index) => {
              const isRegional = recipe.palates.includes(profile.regionalPalate);
              return (
                <div
                  key={index}
                  style={{
                    padding: '10px',
                    backgroundColor: '#FFFFFF',
                    border: isRegional ? '1.5px solid var(--secondary-turmeric)' : '1px solid var(--border-sand)',
                    borderRadius: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '6px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                      <span style={{
                        fontSize: '7.5px',
                        fontWeight: 900,
                        backgroundColor: isRegional ? 'var(--secondary-turmeric)' : 'var(--pill-soft)',
                        color: 'var(--text-masala)',
                        padding: '1px 4px',
                        borderRadius: '3px',
                        textTransform: 'uppercase'
                      }}>
                        {isRegional ? '★ Regional Fav' : recipe.tag}
                      </span>
                      <span style={{ fontSize: '8px', color: 'var(--text-light)', fontWeight: 700 }}>{recipe.time}</span>
                    </div>
                    <h5 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-masala)', margin: '0 0 2px' }}>
                      {recipe.title}
                    </h5>
                    <p style={{ fontSize: '9.5px', color: 'var(--text-muted)', lineHeight: '13px', margin: 0 }}>
                      {recipe.description}
                    </p>
                  </div>

                  <button
                    onClick={() => handleAddMeal(recipe)}
                    style={{
                      padding: '5px 8px',
                      fontSize: '10px',
                      fontWeight: 800,
                      backgroundColor: 'var(--bg-warm)',
                      border: '1px solid var(--border-sand)',
                      color: 'var(--text-masala)',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                      width: '100%',
                      transition: 'var(--transition-cozy)'
                    }}
                  >
                    {addedStatusId === recipe.title ? (
                      <span style={{ color: 'var(--accent-coriander)', fontWeight: 800 }}>✓ Added!</span>
                    ) : (
                      <>
                        <Plus size={10} style={{ color: 'var(--primary-saffron)' }} />
                        Apportion to {activeApportionDay.split(' ')[0]}
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Days filter chips row */}
      <div className="no-print" style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
        {days.map(day => {
          const isSel = activeDayFilter === day;
          return (
            <button 
              key={day}
              onClick={() => setActiveDayFilter(day)}
              className={`pill-chip ${isSel ? 'active' : ''}`}
              style={{
                padding: '6px 12px',
                fontSize: '11px',
                backgroundColor: isSel ? 'var(--primary-saffron)' : '#FFFFFF',
                color: isSel ? '#FFFFFF' : 'var(--text-masala)',
                borderColor: isSel ? 'var(--primary-saffron)' : 'var(--border-sand)',
                fontWeight: 700
              }}
            >
              {day === 'ALL' ? 'Pura Hafta' : day}
            </button>
          );
        })}
      </div>

      {/* Meals Grid Scroll list */}
      <div className="no-print" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filteredMeals.length > 0 ? (
          filteredMeals.map(meal => (
            <div 
              key={meal.id}
              className="warm-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                padding: '14px 16px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{
                  fontSize: '9px',
                  fontWeight: 800,
                  backgroundColor: 'var(--pill-soft)',
                  color: 'var(--text-muted)',
                  padding: '2px 8px',
                  borderRadius: '4px'
                }}>
                  {meal.dayOfWeek}
                </span>

                <span style={{
                  fontSize: '10px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: 'var(--primary-saffron)',
                  letterSpacing: '0.8px'
                }}>
                  {meal.mealType}
                </span>
              </div>

              <div>
                <h5 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-masala)' }}>{meal.title}</h5>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '16px', marginTop: '2px' }}>
                  {meal.description}
                </p>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '8px',
                borderTop: '1px solid var(--border-sand)',
                marginTop: '4px'
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--text-light)', fontWeight: 600 }}>
                  <Clock size={12} />
                  {meal.cookTime}
                </span>

                <button 
                  onClick={() => onSwapMeal(meal.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--primary-saffron)',
                    cursor: 'pointer',
                    fontSize: '11px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <RefreshCw size={11} />
                  Swap
                </button>
              </div>
            </div>
          ))
        ) : (
          <div style={{
            padding: '40px 20px',
            textAlign: 'center',
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px dashed var(--border-sand)',
            color: 'var(--text-muted)',
            fontWeight: 600,
            fontSize: '13px'
          }}>
            Is din ke liye koi menu planned nahi hai. Click Chat to generate!
          </div>
        )}
      </div>

      {/* Premium PDF Modal Backdrop */}
      {showPdfModal && (
        <div className="pdf-preview-backdrop">
          <div className="pdf-preview-sheet fade-in-slide">
            
            {/* Modal Controls Header */}
            <div className="pdf-header no-print">
              <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-masala)' }}>
                Premium PDF Preview
              </h4>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={handleCopyToClipboard}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: copiedText ? 'var(--accent-coriander)' : 'var(--pill-soft)',
                    color: copiedText ? '#FFFFFF' : 'var(--text-masala)',
                    border: '1.5px solid var(--border-sand)',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'var(--transition-cozy)'
                  }}
                >
                  <CheckCircle2 size={14} style={{ color: copiedText ? '#FFFFFF' : 'var(--accent-coriander)' }} />
                  {copiedText ? 'Copied!' : 'Copy for WhatsApp'}
                </button>
                <button 
                  onClick={handlePrint}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: 'var(--primary-saffron)',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  <Printer size={14} />
                  Print / Save
                </button>
                <button 
                  onClick={() => setShowPdfModal(false)}
                  style={{
                    background: 'none',
                    border: '1px solid var(--border-sand)',
                    color: 'var(--text-masala)',
                    padding: '6px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Printable diet sheet */}
            <div className="pdf-body-print-container">
              <div style={{ textAlign: 'center', borderBottom: '2px solid var(--text-masala)', paddingBottom: '16px', marginBottom: '16px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 900, color: 'var(--text-masala)', textTransform: 'uppercase' }}>
                  {profile.familyName} Family Diet Plan
                </h2>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700, marginTop: '4px', letterSpacing: '0.5px' }}>
                  AUTOMATED BY HOMECHEF AI • REGIONAL STYLE: {profile.regionalPalate.toUpperCase()} • DIET: {profile.dietaryPreference.toUpperCase()}
                </p>
                <p style={{ fontSize: '9px', color: 'var(--text-light)', fontStyle: 'italic', marginTop: '2px' }}>
                  Custom-tailored low-salt limits for elders & allergen protection protocols enabled
                </p>
              </div>

              {/* Printable Table */}
              <table className="pdf-print-grid">
                <thead>
                  <tr>
                    <th style={{ width: '15%' }}>DAY</th>
                    <th style={{ width: '22%' }}>BREAKFAST</th>
                    <th style={{ width: '22%' }}>LUNCH</th>
                    <th style={{ width: '19%' }}>SNACK</th>
                    <th style={{ width: '22%' }}>DINNER</th>
                  </tr>
                </thead>
                <tbody>
                  {weekDays.map(day => {
                    const meals = groupedDays[day];
                    if (!meals) return null;
                    return (
                      <tr key={day}>
                        <td style={{ fontWeight: 800, verticalAlign: 'middle', textTransform: 'uppercase' }}>
                          {day}
                        </td>
                        
                        {/* Breakfast */}
                        <td>
                          {meals.Breakfast ? (
                            <div className="pdf-print-meal-item">
                              <div className="pdf-print-meal-title">{meals.Breakfast.title}</div>
                              <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>{meals.Breakfast.description} ({meals.Breakfast.cookTime})</div>
                            </div>
                          ) : '-'}
                        </td>

                        {/* Lunch */}
                        <td>
                          {meals.Lunch ? (
                            <div className="pdf-print-meal-item">
                              <div className="pdf-print-meal-title">{meals.Lunch.title}</div>
                              <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>{meals.Lunch.description} ({meals.Lunch.cookTime})</div>
                            </div>
                          ) : '-'}
                        </td>

                        {/* Snack */}
                        <td>
                          {meals.Snack ? (
                            <div className="pdf-print-meal-item">
                              <div className="pdf-print-meal-title">{meals.Snack.title}</div>
                              <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>{meals.Snack.description} ({meals.Snack.cookTime})</div>
                            </div>
                          ) : '-'}
                        </td>

                        {/* Dinner */}
                        <td>
                          {meals.Dinner ? (
                            <div className="pdf-print-meal-item">
                              <div className="pdf-print-meal-title">{meals.Dinner.title}</div>
                              <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>{meals.Dinner.description} ({meals.Dinner.cookTime})</div>
                            </div>
                          ) : '-'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Detailed DIY Cooking Guides Page Break Section */}
              <div className="page-break" style={{ pageBreakBefore: 'always', marginTop: '30px', paddingTop: '20px', borderTop: '2.5px solid var(--text-masala)', textAlign: 'left' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 900, color: 'var(--text-masala)', textTransform: 'uppercase', marginBottom: '8px', textAlign: 'center', letterSpacing: '1px' }}>
                  Weekly DIY Cooking Guides
                </h3>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '24px', textAlign: 'center', fontStyle: 'italic', fontWeight: 600 }}>
                  Detailed step-by-step preparation guidelines & ingredients checklists for all planned meals of the week
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {weekDays.map(day => {
                    const meals = groupedDays[day];
                    if (!meals) return null;
                    
                    return (
                      <div key={day} style={{ border: '1.5px solid var(--border-sand)', borderRadius: '12px', padding: '16px', backgroundColor: '#FCFBF9', breakInside: 'avoid', pageBreakInside: 'avoid' }}>
                        <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--primary-saffron)', borderBottom: '1.5px solid var(--border-sand)', paddingBottom: '6px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          {day} - Daily Recipe Sheets
                        </h4>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          {['Breakfast', 'Lunch', 'Snack', 'Dinner'].map(mealType => {
                            const meal = meals[mealType];
                            if (!meal) return null;
                            
                            const recipeInfo = getPrintRecipeSteps(meal.title, profile);
                            
                            return (
                              <div key={mealType} style={{ paddingLeft: '8px', borderLeft: '3px solid var(--secondary-turmeric)', breakInside: 'avoid', pageBreakInside: 'avoid' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                  <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-masala)' }}>
                                    {mealType}: {meal.title}
                                  </span>
                                  <span style={{ fontSize: '10px', color: 'var(--text-light)', fontWeight: 700 }}>
                                    {recipeInfo.time} • {recipeInfo.complexity.toUpperCase()}
                                  </span>
                                </div>
                                <p style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '8px', fontStyle: 'italic', lineHeight: '14px' }}>
                                  {meal.description}
                                </p>
                                
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px', marginTop: '6px' }}>
                                  {/* Ingredients list */}
                                  <div>
                                    <span style={{ fontSize: '9px', fontWeight: 800, color: 'var(--text-masala)', display: 'block', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                      Ingredients Checklist
                                    </span>
                                    <ul style={{ paddingLeft: '12px', margin: 0, fontSize: '9px', color: 'var(--text-muted)', lineHeight: '13px' }}>
                                      {recipeInfo.ingredients.map((ing, i) => (
                                        <li key={i} style={{ marginBottom: '2px' }}>{ing}</li>
                                      ))}
                                    </ul>
                                  </div>
                                  
                                  {/* Steps list */}
                                  <div>
                                    <span style={{ fontSize: '9px', fontWeight: 800, color: 'var(--text-masala)', display: 'block', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                      DIY Preparation Steps
                                    </span>
                                    <ol style={{ paddingLeft: '12px', margin: 0, fontSize: '9px', color: 'var(--text-muted)', lineHeight: '13px' }}>
                                      {recipeInfo.steps.map((step, i) => (
                                        <li key={i} style={{ marginBottom: '3px' }}>{step}</li>
                                      ))}
                                    </ol>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{ marginTop: '30px', fontSize: '9px', color: 'var(--text-light)', borderTop: '2px dashed var(--border-sand)', paddingTop: '12px', textAlign: 'center', lineHeight: '14px', fontWeight: 600 }}>
                <span style={{ fontWeight: 800, color: 'var(--text-masala)', display: 'block', marginBottom: '3px' }}>⚠️ SAFETY & MEDICAL EXCLUSION STATEMENT</span>
                HomeChef AI is an automated planning assistant. Ingredients and directions are generated dynamically and do not constitute certified medical, dietetic, or nutritional advice. Users must independently verify all recipe components against personal or household food allergies before preparation.
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
