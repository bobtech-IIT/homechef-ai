import React, { useState, useEffect } from 'react';
import Splash from './components/Splash';
import Onboarding from './components/Onboarding';
import SetupWizard from './components/SetupWizard';
import HomeDashboard from './components/HomeDashboard';
import InventoryManager from './components/InventoryManager';
import AIChatPlanner from './components/AIChatPlanner';
import WeeklyPlanner from './components/WeeklyPlanner';
import SettingsPanel from './components/SettingsPanel';
import WelcomeModal from './components/WelcomeModal';
import TOSDisclaimerModal from './components/TOSDisclaimerModal';
import IndianThaliMap from './components/IndianThaliMap';
import { Home, ClipboardList, MessageSquare, Calendar, Users, RefreshCw } from 'lucide-react';
import { getMergedKnowledgeBase, CULINARY_KNOWLEDGE_BASE } from './data/CulinaryKnowledgeBase';
import { RECIPE_MEGA_INDEX } from './data/RecipeIndex';

const IS_NATIVE = 
  !!window.Capacitor || 
  window.location.protocol.startsWith('capacitor') || 
  window.location.protocol.startsWith('file') || 
  (window.location.hostname === 'localhost' && !window.location.port) || 
  navigator.userAgent.includes('Capacitor');

// --- Helper: Get current week's day labels starting from Monday ---
const getCurrentWeekDays = () => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0=Sun,1=Mon,...
  // Find this week's Monday
  const diffToMon = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(today);
  monday.setDate(today.getDate() + diffToMon);
  const names = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
  const result = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const dayName = names[d.getDay()];
    result.push(`${dayName} ${d.getDate()}`);
  }
  return result; // ['MON 26', 'TUE 27', ...] dynamically
};

// --- Gastro-Matrix: Masterchef V2 Dynamic Seeding Engine ---
const generateInitialMeals = (diet, palate) => {
  const isVeg = diet === 'Vegetarian';
  const isJain = diet === 'Jain';
  const isNonVeg = diet === 'Non-Vegetarian';

  const daysList = getCurrentWeekDays(); // Dynamic: always this week's Mon-Sun
  let seeds = [];

  if (palate === 'West Bengal') {
    daysList.forEach((day, idx) => {
      const bId = idx * 4 + 1;
      const lId = idx * 4 + 2;
      const sId = idx * 4 + 3;
      const dId = idx * 4 + 4;

      if (isNonVeg) {
        if (day.startsWith('MON')) {
          seeds.push({ id: bId, dayOfWeek: day, mealType: 'Breakfast', title: 'Dim Pauruti (Bengali Egg Toast)', description: 'Spiced egg-coated bread shallow fried, homestyle recipe.', cookTime: '10m', complexity: 'Easy', ingredientStatus: 'All at home', tag: 'Quick Breakfast' });
          seeds.push({ id: lId, dayOfWeek: day, mealType: 'Lunch', title: 'Egg Curry & Rice', description: 'Tender boiled eggs simmered in classic onion-tomato gravy, served with rice.', cookTime: '25m', complexity: 'Medium', ingredientStatus: 'All at home', tag: 'Protein Rich' });
          seeds.push({ id: sId, dayOfWeek: day, mealType: 'Snack', title: 'Masala Chai & Biscuits', description: 'Traditional ginger tea paired with crispy rusks.', cookTime: '5m', complexity: 'Easy', ingredientStatus: 'All at home', tag: 'Classic Tea' });
          seeds.push({ id: dId, dayOfWeek: day, mealType: 'Dinner', title: 'Chicken Kosha & Roti', description: 'Rich, dry chicken masala cooked slowly in caramelized onion gravy.', cookTime: '35m', complexity: 'Medium', ingredientStatus: 'All at home', tag: 'Family Favorite' });
        } else if (day.startsWith('TUE')) {
          seeds.push({ id: bId, dayOfWeek: day, mealType: 'Breakfast', title: 'Chirer Poha (Bengali Chirer Polao)', description: 'Flattened rice tossed with green peas, peanuts and turmeric.', cookTime: '15m', complexity: 'Easy', ingredientStatus: 'All at home', tag: 'Light Breakfast' });
          seeds.push({ id: lId, dayOfWeek: day, mealType: 'Lunch', title: 'Rui Macher Jhol & Bhat', description: 'Rui fish steaks simmered in light potato and cumin gravy with rice.', cookTime: '30m', complexity: 'Medium', ingredientStatus: 'All at home', tag: 'Comfort Food' });
          seeds.push({ id: sId, dayOfWeek: day, mealType: 'Snack', title: 'Tea & Muri Makha', description: 'Crispy puffed rice seasoned with mustard oil, onions and split chilies.', cookTime: '5m', complexity: 'Easy', ingredientStatus: 'All at home', tag: 'Simple Munch' });
          seeds.push({ id: dId, dayOfWeek: day, mealType: 'Dinner', title: 'Dim Bhurji & Paratha', description: 'Scrambled eggs cooked with green chilies and onions, served with paratha.', cookTime: '20m', complexity: 'Easy', ingredientStatus: 'All at home', tag: 'Quick Dinner' });
        } else if (day.startsWith('WED')) {
          seeds.push({ id: bId, dayOfWeek: day, mealType: 'Breakfast', title: 'Dhakai Luchi & Alur Dom', description: 'Puffed golden white flour puris served with spiced homestyle potato curry.', cookTime: '25m', complexity: 'Medium', ingredientStatus: 'All at home', tag: 'Bengali Feast' });
          seeds.push({ id: lId, dayOfWeek: day, mealType: 'Lunch', title: 'Bengali Shorshe Maach & Rice', description: 'Authentic river fish steak cooked in rich, pungent mustard & green chili gravy, served with rice.', cookTime: '30m', complexity: 'Medium', ingredientStatus: 'Need 2 items', tag: 'Traditional Delicacy' });
          seeds.push({ id: sId, dayOfWeek: day, mealType: 'Snack', title: 'Chai & Crispy Fish Kabiraji', description: 'Hot tea served with traditional fish cutlet coated in a fine crispy egg net.', cookTime: '20m', complexity: 'Elaborate', ingredientStatus: 'All at home', tag: 'Calcutta Classic' });
          seeds.push({ id: dId, dayOfWeek: day, mealType: 'Dinner', title: 'Kosha Mangsho & Soft Luchi', description: 'Slow cooked spicy mutton curry in dark caramelised onion gravy, served with puffed rotis.', cookTime: '50m', complexity: 'Spicy', ingredientStatus: 'All at home', tag: 'Chef Special' });
        } else if (day.startsWith('THU')) {
          seeds.push({ id: bId, dayOfWeek: day, mealType: 'Breakfast', title: 'Egg Kathi Roll', description: 'Layered paratha lined with fried egg, stuffed with onions and lemon.', cookTime: '15m', complexity: 'Easy', ingredientStatus: 'All at home', tag: 'Calcutta Street' });
          seeds.push({ id: lId, dayOfWeek: day, mealType: 'Lunch', title: 'Mourala Macher Bati Chorchori', description: 'Tiny river fish steamed with mustard oil, onions and potatoes, served with rice.', cookTime: '25m', complexity: 'Medium', ingredientStatus: 'Need 1 item', tag: 'Homestyle Fish' });
          seeds.push({ id: sId, dayOfWeek: day, mealType: 'Snack', title: 'Tea & Vegetable Chop', description: 'Spiced beetroot-potato croquettes coated in crispy breadcrumbs.', cookTime: '15m', complexity: 'Easy', ingredientStatus: 'All at home', tag: 'Evening Bite' });
          seeds.push({ id: dId, dayOfWeek: day, mealType: 'Dinner', title: 'Chicken Do Pyaza & Roti', description: 'Flavorful chicken cooked with large chunks of sweet fried onions and spices.', cookTime: '30m', complexity: 'Medium', ingredientStatus: 'All at home', tag: 'Family Dinner' });
        } else if (day.startsWith('FRI')) {
          seeds.push({ id: bId, dayOfWeek: day, mealType: 'Breakfast', title: 'Aloo Bhaja & Luchi', description: 'Matchstick-cut crisp potatoes served with puffed warm luchis.', cookTime: '15m', complexity: 'Easy', ingredientStatus: 'All at home', tag: 'Classic Simple' });
          seeds.push({ id: lId, dayOfWeek: day, mealType: 'Lunch', title: 'Katla Kalia & Ghee Bhat', description: 'Rich Katla fish steaks simmered in yogurt, onion and ginger paste, with ghee rice.', cookTime: '35m', complexity: 'Medium', ingredientStatus: 'Need 2 items', tag: 'Premium Feast' });
          seeds.push({ id: sId, dayOfWeek: day, mealType: 'Snack', title: 'Chai & Egg Devil', description: 'Spiced hard-boiled egg wrap fried in breadcrumbs, street style.', cookTime: '20m', complexity: 'Medium', ingredientStatus: 'All at home', tag: 'Street Treat' });
          seeds.push({ id: dId, dayOfWeek: day, mealType: 'Dinner', title: 'Dim Kosha & Phulka', description: 'Thick egg gravy seasoned with ginger-garlic paste, served with soft rotis.', cookTime: '20m', complexity: 'Easy', ingredientStatus: 'All at home', tag: 'Comfort Dinner' });
        } else if (day.startsWith('SAT')) {
          seeds.push({ id: bId, dayOfWeek: day, mealType: 'Breakfast', title: 'Mughlai Paratha & Gravy', description: 'Layered paratha stuffed with egg, green chilies and onions.', cookTime: '30m', complexity: 'Elaborate', ingredientStatus: 'All at home', tag: 'Weekend Special' });
          seeds.push({ id: lId, dayOfWeek: day, mealType: 'Lunch', title: 'Macher Matha diye Mung Dal', description: 'Roasted yellow lentils slow cooked with fried fish head and cumin, with rice.', cookTime: '35m', complexity: 'Medium', ingredientStatus: 'Need 1 item', tag: 'Traditional Bengali' });
          seeds.push({ id: sId, dayOfWeek: day, mealType: 'Snack', title: 'Chai & Fish Chop', description: 'Crispy seasoned mincemeat fish croquettes served with mustard dip.', cookTime: '15m', complexity: 'Medium', ingredientStatus: 'All at home', tag: 'Calcutta Street' });
          seeds.push({ id: dId, dayOfWeek: day, mealType: 'Dinner', title: 'Bhetki Macher Paturi & Bhat', description: 'Fish marinated in mustard coconut paste, wrapped in banana leaves and steamed.', cookTime: '40m', complexity: 'Medium', ingredientStatus: 'Need 2 items', tag: 'Chef Signature' });
        } else if (day.startsWith('SUN')) {
          seeds.push({ id: bId, dayOfWeek: day, mealType: 'Breakfast', title: 'Luchi & Begun Bhaja', description: 'Golden puffed flour luchis paired with crispy round eggplant fry.', cookTime: '20m', complexity: 'Easy', ingredientStatus: 'All at home', tag: 'Lazy Sunday' });
          seeds.push({ id: lId, dayOfWeek: day, mealType: 'Lunch', title: 'Bengali Mutton Curry & Bhat', description: 'Homestyle light goat mutton curry cooked in a pressure cooker with potato halves.', cookTime: '45m', complexity: 'Elaborate', ingredientStatus: 'All at home', tag: 'Sunday Special' });
          seeds.push({ id: sId, dayOfWeek: day, mealType: 'Snack', title: 'Tea & Crispy Fish Fry', description: 'Premium breaded fish fillets deep-fried, served with Kasundi mustard.', cookTime: '20m', complexity: 'Medium', ingredientStatus: 'All at home', tag: 'Royal Snack' });
          seeds.push({ id: dId, dayOfWeek: day, mealType: 'Dinner', title: 'Bengali Chicken Biryani', description: 'Light, fragrant basmati rice cooked with chicken, boiled eggs, and ghee-infused potato.', cookTime: '50m', complexity: 'Elaborate', ingredientStatus: 'Need 2 items', tag: 'Weekend Finale' });
        }
      } else {
        // West Bengal Veg & Jain Seeding
        const isJ = isJain;
        if (day.startsWith('MON')) {
          seeds.push({ id: bId, dayOfWeek: day, mealType: 'Breakfast', title: 'Chirer Poha (Bengali Poha)', description: 'Flattened rice flakes steam-cooked with green peas and peanuts.', cookTime: '15m', complexity: 'Easy', ingredientStatus: 'All at home', tag: 'Gluten Free' });
          seeds.push({ id: lId, dayOfWeek: day, mealType: 'Lunch', title: isJ ? 'Jain Yellow Dal & Jeera Bhat' : 'Yellow Dal Tadka & Bhat', description: 'Yellow split peas tempered with cumin and ghee, with steamed rice.', cookTime: '25m', complexity: 'Easy', ingredientStatus: 'All at home', tag: 'Protein Rich' });
          seeds.push({ id: sId, dayOfWeek: day, mealType: 'Snack', title: 'Chai & Roasted Makhana', description: 'Hot ginger tea served with toasted cumin-salt lotus seeds.', cookTime: '10m', complexity: 'Easy', ingredientStatus: 'All at home', tag: 'Healthy Snack' });
          seeds.push({ id: dId, dayOfWeek: day, mealType: 'Dinner', title: isJ ? 'Jain Paneer Butter Masala & Roti' : 'Paneer Butter Masala & Roti', description: 'Cottage cheese in rich creamy cashew-tomato curry, served with thin rotis.', cookTime: '30m', complexity: 'Medium', ingredientStatus: 'All at home', tag: 'Family Favorite' });
        } else if (day.startsWith('TUE')) {
          seeds.push({ id: bId, dayOfWeek: day, mealType: 'Breakfast', title: 'Suji Halwa & Luchi', description: 'Sweet semolina dessert paired with soft puffed flour luchis.', cookTime: '20m', complexity: 'Easy', ingredientStatus: 'All at home', tag: 'Traditional Sweet' });
          seeds.push({ id: lId, dayOfWeek: day, mealType: 'Lunch', title: isJ ? 'Jain Posto Paneer & Rice' : 'Bengali Aloo Posto & Rice', description: 'Cottage cheese cubes or potato in rich, nutty poppy seed paste, with steamed rice.', cookTime: '25m', complexity: 'Medium', ingredientStatus: 'All at home', tag: 'Comfort Food' });
          seeds.push({ id: sId, dayOfWeek: day, mealType: 'Snack', title: 'Tea & Muri Makha', description: 'Savory dry-puffed rice tossed with mustard oil and fresh coriander.', cookTime: '5m', complexity: 'Easy', ingredientStatus: 'All at home', tag: 'Light Bite' });
          seeds.push({ id: dId, dayOfWeek: day, mealType: 'Dinner', title: isJ ? 'Jain Pepe Ghonto & Phulka' : 'Pepe Ghonto & Phulka', description: 'Slow-cooked grated raw papaya curry prepared homestyle, served with soft rotis.', cookTime: '25m', complexity: 'Easy', ingredientStatus: 'All at home', tag: 'Light & Healthy' });
        } else if (day.startsWith('WED')) {
          seeds.push({ id: bId, dayOfWeek: day, mealType: 'Breakfast', title: isJ ? 'Radhaballabhi & Cholar Dal' : 'Bengali Luchi & Cholar Dal', description: 'Golden puffed flour puris paired with sweet and savory chana dal topped with coconut.', cookTime: '25m', complexity: 'Medium', ingredientStatus: 'All at home', tag: 'Bengali Classic' });
          seeds.push({ id: lId, dayOfWeek: day, mealType: 'Lunch', title: isJ ? 'Jain Posto Paneer & Rice' : 'Bengali Aloo Posto & Biulir Dal', description: 'Nutty potato poppy-seed paste served with light black gram dal and Gobindobhog rice.', cookTime: '30m', complexity: 'Medium', ingredientStatus: 'All at home', tag: 'Traditional Veg' });
          seeds.push({ id: sId, dayOfWeek: day, mealType: 'Snack', title: 'Cutting Chai & Veg Chop', description: 'Traditional beetroot-potato croquette paired with hot ginger milk tea.', cookTime: '15m', complexity: 'Easy', ingredientStatus: 'All at home', tag: 'Calcutta Street' });
          seeds.push({ id: dId, dayOfWeek: day, mealType: 'Dinner', title: isJ ? 'Jain Chanar Dalna & Phulka' : 'Bengali Dhokar Dalna & Phulka', description: 'Spiced steamed lentil cakes cooked in flavorful ginger-cumin tomato gravy, with rotis.', cookTime: '40m', complexity: 'Medium', ingredientStatus: 'All at home', tag: 'Family Favorite' });
        } else if (day.startsWith('THU')) {
          seeds.push({ id: bId, dayOfWeek: day, mealType: 'Breakfast', title: 'Suji Upma & Coconut Chutney', description: 'Roasted semolina cooked with mustard seeds and curry leaves.', cookTime: '15m', complexity: 'Easy', ingredientStatus: 'All at home', tag: 'Healthy Start' });
          seeds.push({ id: lId, dayOfWeek: day, mealType: 'Lunch', title: isJ ? 'Jain Kacha Kolar Kofta & Rice' : 'Kacha Kolar Kofta & Rice', description: 'Raw banana dumplings simmered in rich cumin-ginger gravy, served with rice.', cookTime: '30m', complexity: 'Medium', ingredientStatus: 'All at home', tag: 'Nutritious Feast' });
          seeds.push({ id: sId, dayOfWeek: day, mealType: 'Snack', title: 'Tea & Crispy Beguni', description: 'Hot tea paired with deep-fried eggplant fritters coated in chickpea batter.', cookTime: '15m', complexity: 'Easy', ingredientStatus: 'All at home', tag: 'Crispy Snack' });
          seeds.push({ id: dId, dayOfWeek: day, mealType: 'Dinner', title: isJ ? 'Jain Potol Posto & Phulka' : 'Alur Dom & Phulka', description: 'Steamed pointed gourd in poppy seeds or homestyle thick potato curry with rotis.', cookTime: '25m', complexity: 'Medium', ingredientStatus: 'All at home', tag: 'Homestyle Veg' });
        } else if (day.startsWith('FRI')) {
          seeds.push({ id: bId, dayOfWeek: day, mealType: 'Breakfast', title: 'Jain/Veg Methi Thepla & Curd', description: 'Thin fenugreek-infused wheat flatbreads served with fresh yogurt.', cookTime: '15m', complexity: 'Easy', ingredientStatus: 'All at home', tag: 'Elderly Friendly' });
          seeds.push({ id: lId, dayOfWeek: day, mealType: 'Lunch', title: isJ ? 'Jain Chanar Dalna & Rice' : 'Chanar Dalna & Rice', description: 'Traditional homemade cottage cheese balls in light cumin tomato gravy with rice.', cookTime: '30m', complexity: 'Medium', ingredientStatus: 'All at home', tag: 'Traditional Bengali' });
          seeds.push({ id: sId, dayOfWeek: day, mealType: 'Snack', title: 'Chai & Roasted Murmura', description: 'Light puffed rice roasted with turmeric, salt and peanuts.', cookTime: '10m', complexity: 'Easy', ingredientStatus: 'All at home', tag: 'Low Calorie' });
          seeds.push({ id: dId, dayOfWeek: day, mealType: 'Dinner', title: isJ ? 'Jain Ghiye ke Kofte & Roti' : 'Lauki Kofta & Roti', description: 'Soft bottle-gourd dumplings simmered in light tomato gravy, served with rotis.', cookTime: '30m', complexity: 'Medium', ingredientStatus: 'All at home', tag: 'Comfort Dinner' });
        } else if (day.startsWith('SAT')) {
          seeds.push({ id: bId, dayOfWeek: day, mealType: 'Breakfast', title: isJ ? 'Jain Luchi & Kumror Chokka' : 'Karaishutir Kochuri & Alur Dom', description: 'Crispy puffed green peas kochuri served with delicious spiced potato halves.', cookTime: '30m', complexity: 'Elaborate', ingredientStatus: 'All at home', tag: 'Weekend Special' });
          seeds.push({ id: lId, dayOfWeek: day, mealType: 'Lunch', title: isJ ? 'Jain Bengali Bhuni Khichuri & Labra' : 'Bengali Khichuri & Labra', description: 'Fragrant roasted yellow lentil porridge with mixed seasonal vegetable stew.', cookTime: '35m', complexity: 'Medium', ingredientStatus: 'All at home', tag: 'Weekend Feast' });
          seeds.push({ id: sId, dayOfWeek: day, mealType: 'Snack', title: 'Tea & Singara', description: 'Ginger milk tea served with hot crispy triangular Bengali potato samosas.', cookTime: '15m', complexity: 'Medium', ingredientStatus: 'All at home', tag: 'Street Special' });
          seeds.push({ id: dId, dayOfWeek: day, mealType: 'Dinner', title: isJ ? 'Jain Shukto & Ghee Bhat' : 'Shukto & Ghee Bhat', description: 'Traditional bitter-sweet mixed vegetable stew slow-cooked in milk and ginger.', cookTime: '40m', complexity: 'Elaborate', ingredientStatus: 'All at home', tag: 'Royal Bengali' });
        } else if (day.startsWith('SUN')) {
          seeds.push({ id: bId, dayOfWeek: day, mealType: 'Breakfast', title: 'Luchi & Begun Bhaja', description: 'Puffed luchis served with golden-fried crispy eggplant slices.', cookTime: '20m', complexity: 'Easy', ingredientStatus: 'All at home', tag: 'Lazy Sunday' });
          seeds.push({ id: lId, dayOfWeek: day, mealType: 'Lunch', title: isJ ? 'Jain Paneer Pulao & Raita' : 'Paneer Katla Style & Rice', description: 'Cottage cheese pieces simmered in rich gravy with fragrant peas pulao.', cookTime: '35m', complexity: 'Medium', ingredientStatus: 'All at home', tag: 'Festive Lunch' });
          seeds.push({ id: sId, dayOfWeek: day, mealType: 'Snack', title: 'Tea & Warm Sandesh/Rasgulla', description: 'Sweet milk fudge or spongy cheese balls served with warm cardamoms.', cookTime: '5m', complexity: 'Easy', ingredientStatus: 'All at home', tag: 'Traditional Sweet' });
          seeds.push({ id: dId, dayOfWeek: day, mealType: 'Dinner', title: isJ ? 'Jain Potol Posto & Phulka' : 'Aloo Posto, Biulir Dal & Phulka', description: 'Light homestyle potato poppy seed paste paired with soft wheat rotis.', cookTime: '30m', complexity: 'Medium', ingredientStatus: 'All at home', tag: 'Sunday Wrap' });
        }
      }
    });
    return seeds;
  }

  // Punjab Palate (Also default fallback)
  daysList.forEach((day, idx) => {
    const bId = idx * 4 + 1;
    const lId = idx * 4 + 2;
    const sId = idx * 4 + 3;
    const dId = idx * 4 + 4;

    if (isNonVeg) {
      if (day.startsWith('MON')) {
        seeds.push({ id: bId, dayOfWeek: day, mealType: 'Breakfast', title: 'Egg Bhurji Pav', description: 'Scrambled eggs cooked with spices and served with hot buttered buns.', cookTime: '15m', complexity: 'Easy', ingredientStatus: 'All at home', tag: 'Quick Breakfast' });
        seeds.push({ id: lId, dayOfWeek: day, mealType: 'Lunch', title: 'Egg Curry & Rice', description: 'Tender boiled eggs simmered in classic onion-tomato gravy, served with rice.', cookTime: '25m', complexity: 'Medium', ingredientStatus: 'All at home', tag: 'Protein Rich' });
        seeds.push({ id: sId, dayOfWeek: day, mealType: 'Snack', title: 'Masala Chai & Biscuits', description: 'Hot ginger tea with crispy wheat crackers.', cookTime: '5m', complexity: 'Easy', ingredientStatus: 'All at home', tag: 'Comfort Snack' });
        seeds.push({ id: dId, dayOfWeek: day, mealType: 'Dinner', title: 'Chicken Kheema & Roti', description: 'Spiced minced chicken cooked with green peas, served with hot phulkas.', cookTime: '35m', complexity: 'Medium', ingredientStatus: 'All at home', tag: 'Family Favorite' });
      } else if (day.startsWith('TUE')) {
        seeds.push({ id: bId, dayOfWeek: day, mealType: 'Breakfast', title: 'Chicken Paratha & Curd', description: 'Spiced shredded chicken stuffed flatbread, roasted with ghee.', cookTime: '20m', complexity: 'Medium', ingredientStatus: 'All at home', tag: 'High Protein' });
        seeds.push({ id: lId, dayOfWeek: day, mealType: 'Lunch', title: 'Punjabi Tariwala Chicken & Bhat', description: 'Homestyle chicken curry cooked with whole aromatic spices, served with rice.', cookTime: '35m', complexity: 'Medium', ingredientStatus: 'Need 1 item', tag: 'Aromatic Feast' });
        seeds.push({ id: sId, dayOfWeek: day, mealType: 'Snack', title: 'Chai & Mathri', description: 'Ginger tea served with traditional crispy savory crackers.', cookTime: '10m', complexity: 'Easy', ingredientStatus: 'All at home', tag: 'Teatime Special' });
        seeds.push({ id: dId, dayOfWeek: day, mealType: 'Dinner', title: 'Egg Bhurji & Roti', description: 'Masala scrambled eggs cooked with raw butter, served with thin rotis.', cookTime: '15m', complexity: 'Easy', ingredientStatus: 'All at home', tag: 'Quick Comfort' });
      } else if (day.startsWith('WED')) {
        seeds.push({ id: bId, dayOfWeek: day, mealType: 'Breakfast', title: 'Amritsari Aloo Paratha', description: 'Crispy whole wheat flatbread stuffed with spiced potato mash.', cookTime: '20m', complexity: 'Medium', ingredientStatus: 'All at home', tag: 'Punjabi Start' });
        seeds.push({ id: lId, dayOfWeek: day, mealType: 'Lunch', title: 'Punjabi Rajma Chawal & Raita', description: 'Slow cooked red kidney beans in thick spiced gravy, served with basmati rice.', cookTime: '30m', complexity: 'Medium', ingredientStatus: 'All at home', tag: 'Comfort Classic' });
        seeds.push({ id: sId, dayOfWeek: day, mealType: 'Snack', title: 'Chai & Amritsari Fish Fry', description: 'Spiced gram flour battered deep-fried river fish pieces with hot tea.', cookTime: '15m', complexity: 'Easy', ingredientStatus: 'All at home', tag: 'Royal Bite' });
        seeds.push({ id: dId, dayOfWeek: day, mealType: 'Dinner', title: 'Butter Chicken & Roti', description: 'Tender chicken cubes in rich, sweet tomato and cashew cream gravy, with phulkas.', cookTime: '40m', complexity: 'Spicy', ingredientStatus: 'All at home', tag: 'Weekend Starter' });
      } else if (day.startsWith('THU')) {
        seeds.push({ id: bId, dayOfWeek: day, mealType: 'Breakfast', title: 'Egg Paratha & Raita', description: 'Crispy paratha stuffed with scrambled eggs, served with curd.', cookTime: '15m', complexity: 'Medium', ingredientStatus: 'All at home', tag: 'High Protein' });
        seeds.push({ id: lId, dayOfWeek: day, mealType: 'Lunch', title: 'Egg Curry & Jeera Rice', description: 'Spiced boiled egg curry served over aromatic cumin rice.', cookTime: '25m', complexity: 'Easy', ingredientStatus: 'All at home', tag: 'Protein Lunch' });
        seeds.push({ id: sId, dayOfWeek: day, mealType: 'Snack', title: 'Tea & Chicken Cutlet', description: 'Crispy pan-fried minced chicken patties served with hot ginger tea.', cookTime: '20m', complexity: 'Medium', ingredientStatus: 'All at home', tag: 'Teatime Crisp' });
        seeds.push({ id: dId, dayOfWeek: day, mealType: 'Dinner', title: 'Chicken Do Pyaza & Phulka', description: 'Tender chicken pieces cooked in thick onion gravy, served with rotis.', cookTime: '30m', complexity: 'Medium', ingredientStatus: 'All at home', tag: 'Comfort Dinner' });
      } else if (day.startsWith('FRI')) {
        seeds.push({ id: bId, dayOfWeek: day, mealType: 'Breakfast', title: 'Paneer Paratha & Yogurt', description: 'Crispy whole wheat paratha stuffed with grated cottage cheese.', cookTime: '15m', complexity: 'Medium', ingredientStatus: 'All at home', tag: 'High Protein' });
        seeds.push({ id: lId, dayOfWeek: day, mealType: 'Lunch', title: 'Chicken Tikka Masala & Rice', description: 'Roasted marinated chicken chunks cooked in spiced orange-gravy.', cookTime: '35m', complexity: 'Medium', ingredientStatus: 'Need 2 items', tag: 'Spicy Feast' });
        seeds.push({ id: sId, dayOfWeek: day, mealType: 'Snack', title: 'Tea & Chicken Samosa', description: 'Evening hot tea paired with crispy deep-fried meat samosas.', cookTime: '15m', complexity: 'Easy', ingredientStatus: 'All at home', tag: 'Elite Snack' });
        seeds.push({ id: dId, dayOfWeek: day, mealType: 'Dinner', title: 'Tariwala Mutton Curry & Roti', description: 'Slow cooked tender mutton pieces in light aromatic gravy with phulkas.', cookTime: '45m', complexity: 'Elaborate', ingredientStatus: 'All at home', tag: 'Traditional Dinner' });
      } else if (day.startsWith('SAT')) {
        seeds.push({ id: bId, dayOfWeek: day, mealType: 'Breakfast', title: 'Mughlai Egg Paratha', description: 'Layered paratha stuffed with spiced beaten eggs and green chilies.', cookTime: '25m', complexity: 'Medium', ingredientStatus: 'All at home', tag: 'Weekend Special' });
        seeds.push({ id: lId, dayOfWeek: day, mealType: 'Lunch', title: 'Mutton Kheema & Soft Naan', description: 'Rich spiced minced mutton cooked slowly with green peas, served with naan.', cookTime: '35m', complexity: 'Medium', ingredientStatus: 'All at home', tag: 'Royal Feast' });
        seeds.push({ id: sId, dayOfWeek: day, mealType: 'Snack', title: 'Chai & Fish Amritsari', description: 'Crispy spiced gram flour coated fried fish bites with hot tea.', cookTime: '15m', complexity: 'Easy', ingredientStatus: 'All at home', tag: 'Calcutta Street' });
        seeds.push({ id: dId, dayOfWeek: day, mealType: 'Dinner', title: 'Butter Chicken & Phulka', description: 'Tender chicken tikka chunks in creamy tomato gravy with soft rotis.', cookTime: '35m', complexity: 'Medium', ingredientStatus: 'All at home', tag: 'Chef Signature' });
      } else if (day.startsWith('SUN')) {
        seeds.push({ id: bId, dayOfWeek: day, mealType: 'Breakfast', title: 'Amritsari Kulcha & Chole', description: 'Baked crispy potato stuffed kulchas served with rich chickpea curry.', cookTime: '30m', complexity: 'Elaborate', ingredientStatus: 'All at home', tag: 'Traditional Feast' });
        seeds.push({ id: lId, dayOfWeek: day, mealType: 'Lunch', title: 'Punjabi Mutton Dum Biryani', description: 'Fragrant saffron rice layered with slow-cooked spicy mutton, served with raita.', cookTime: '60m', complexity: 'Elaborate', ingredientStatus: 'Need 2 items', tag: 'Sunday Special' });
        seeds.push({ id: sId, dayOfWeek: day, mealType: 'Snack', title: 'Sweet Lassi & Paneer Tikka', description: 'Creamy sweet curd drink paired with clay oven roasted cottage cheese.', cookTime: '15m', complexity: 'Medium', ingredientStatus: 'All at home', tag: 'Royal Combo' });
        seeds.push({ id: dId, dayOfWeek: day, mealType: 'Dinner', title: 'Homestyle Chicken Curry & Phulka', description: 'Light comforting chicken curry prepared with mild whole spices, with soft rotis.', cookTime: '30m', complexity: 'Medium', ingredientStatus: 'All at home', tag: 'Comfort Wrap' });
      }
    } else {
      // Punjab Veg & Jain
      const isJ = isJain;
      if (day.startsWith('MON')) {
        seeds.push({ id: bId, dayOfWeek: day, mealType: 'Breakfast', title: 'Indori Poha with Sev', description: 'Tangy steamed rice flakes topped with crunchy sev & lemon.', cookTime: '15m', complexity: 'Easy', ingredientStatus: 'All at home', tag: 'Gluten Free' });
        seeds.push({ id: lId, dayOfWeek: day, mealType: 'Lunch', title: isJ ? 'Jain Yellow Dal & Rice' : 'Yellow Dal Tadka & Jeera Rice', description: 'Comforting yellow lentils tempered with cumin seeds and pure cow ghee.', cookTime: '25m', complexity: 'Easy', ingredientStatus: 'All at home', tag: 'Protein Rich' });
        seeds.push({ id: sId, dayOfWeek: day, mealType: 'Snack', title: 'Chai & Baked Khakhra', description: 'Hot ginger tea with crispy whole wheat crackers.', cookTime: '10m', complexity: 'Easy', ingredientStatus: 'All at home', tag: 'Light Snack' });
        seeds.push({ id: dId, dayOfWeek: day, mealType: 'Dinner', title: isJ ? 'Jain Paneer Makhani & Roti' : 'Paneer Butter Masala & Roti', description: 'Paneer cubes in rich sweet cream gravy served with thin wheat rotis.', cookTime: '35m', complexity: 'Medium', ingredientStatus: 'All at home', tag: 'Family Favorite' });
      } else if (day.startsWith('TUE')) {
        seeds.push({ id: bId, dayOfWeek: day, mealType: 'Breakfast', title: isJ ? 'Jain Gobi Paratha & Curd' : 'Gobi Paratha & Curd', description: 'Spiced grated cauliflower stuffed flatbread roasted with pure ghee.', cookTime: '20m', complexity: 'Medium', ingredientStatus: 'All at home', tag: 'High Fiber' });
        seeds.push({ id: lId, dayOfWeek: day, mealType: 'Lunch', title: isJ ? 'Jain Chole Chawal' : 'Punjabi Chole Bhature', description: 'Tangy black chickpeas slow-cooked in black cardamom gravy with rice.', cookTime: '30m', complexity: 'Medium', ingredientStatus: 'All at home', tag: 'Aromatic Feast' });
        seeds.push({ id: sId, dayOfWeek: day, mealType: 'Snack', title: 'Tea & Mathri', description: 'Hot tea served with traditional crispy roasted crackers.', cookTime: '10m', complexity: 'Easy', ingredientStatus: 'All at home', tag: 'Classic Tea' });
        seeds.push({ id: dId, dayOfWeek: day, mealType: 'Dinner', title: isJ ? 'Jain Aloo Tamatar (No Potato) & Roti' : 'Matar Paneer & Phulka', description: 'Cottage cheese and sweet green peas cooked slowly in onion-free light gravy.', cookTime: '25m', complexity: 'Medium', ingredientStatus: 'All at home', tag: 'Comfort Dinner' });
      } else if (day.startsWith('WED')) {
        seeds.push({ id: bId, dayOfWeek: day, mealType: 'Breakfast', title: isJ ? 'Jain Paneer Paratha' : 'Amritsari Aloo Paratha & Butter', description: 'Crispy flatbreads stuffed with spiced cottage cheese or potatoes, topped with white butter.', cookTime: '20m', complexity: 'Medium', ingredientStatus: 'All at home', tag: 'Gluten Rich' });
        seeds.push({ id: lId, dayOfWeek: day, mealType: 'Lunch', title: isJ ? 'Jain Yellow Dal & Rice' : 'Punjabi Rajma Chawal & Curd', description: 'Comforting slow-cooked kidney bean curry in thick tomato gravy, served with hot Basmati rice.', cookTime: '30m', complexity: 'Medium', ingredientStatus: 'All at home', tag: 'Protein Rich' });
        seeds.push({ id: sId, dayOfWeek: day, mealType: 'Snack', title: isJ ? 'Chai & Baked Paneer Pakora' : 'Masala Chai & Punjabi Samosa', description: 'Perfect evening ginger tea paired with hot crispy paneer pakoras or samosas.', cookTime: '15m', complexity: 'Easy', ingredientStatus: 'All at home', tag: 'Classic Comfort' });
        seeds.push({ id: dId, dayOfWeek: day, mealType: 'Dinner', title: isJ ? 'Jain Shahi Paneer & Phulka' : 'Dal Makhani & Shahi Paneer with Naan', description: 'Creamy black lentils slow-cooked overnight and cottage cheese cubes in rich cashew sweet gravy.', cookTime: '45m', complexity: 'Spicy', ingredientStatus: 'Need 2 items', tag: 'Family Favorite' });
      } else if (day.startsWith('THU')) {
        seeds.push({ id: bId, dayOfWeek: day, mealType: 'Breakfast', title: 'Suji Upma & Chutney', description: 'Roasted semolina steam-cooked with mustard seeds and fresh curry leaves.', cookTime: '15m', complexity: 'Easy', ingredientStatus: 'All at home', tag: 'Healthy Start' });
        seeds.push({ id: lId, dayOfWeek: day, mealType: 'Lunch', title: isJ ? 'Jain Kadhi & Rice' : 'Kadhi Pakora & Rice', description: 'Sour yogurt and gram-flour gravy cooked with soft vegetable dumplings, served with rice.', cookTime: '25m', complexity: 'Medium', ingredientStatus: 'All at home', tag: 'Digestible & Light' });
        seeds.push({ id: sId, dayOfWeek: day, mealType: 'Snack', title: 'Chai & Roasted Makhana', description: 'Hot ginger tea with dry roasted crispy lotus seeds seasoned with turmeric.', cookTime: '10m', complexity: 'Easy', ingredientStatus: 'All at home', tag: 'Healthy Munch' });
        seeds.push({ id: dId, dayOfWeek: day, mealType: 'Dinner', title: isJ ? 'Jain Bhindi Masala & Phulka' : 'Aloo Baingan & Phulka', description: 'Dry spiced okra or potato-eggplant masala served with soft rotis.', cookTime: '25m', complexity: 'Easy', ingredientStatus: 'All at home', tag: 'Homestyle Veg' });
      } else if (day.startsWith('FRI')) {
        seeds.push({ id: bId, dayOfWeek: day, mealType: 'Breakfast', title: 'Paneer stuffed chilla', description: 'Savoury, protein-packed yellow lentil pancake with grated paneer.', cookTime: '15m', complexity: 'Easy', ingredientStatus: 'All at home', tag: 'High Protein' });
        seeds.push({ id: lId, dayOfWeek: day, mealType: 'Lunch', title: isJ ? 'Jain Dal Fry & Rice' : 'Black Urad Dal & Rice', description: 'Slow cooked black lentils tempered with cumin, tomato and ginger, with rice.', cookTime: '25m', complexity: 'Medium', ingredientStatus: 'All at home', tag: 'Protein Rich' });
        seeds.push({ id: sId, dayOfWeek: day, mealType: 'Snack', title: 'Chai & Roasted Moong Dal', description: 'Healthy roasted split mung beans served with warm tea.', cookTime: '10m', complexity: 'Easy', ingredientStatus: 'All at home', tag: 'Healthy Bite' });
        seeds.push({ id: dId, dayOfWeek: day, mealType: 'Dinner', title: isJ ? 'Jain Paneer Bhurji & Phulka' : 'Paneer Bhurji & Phulka', description: 'Scrambled cottage cheese tossed with raw spices, served with warm rotis.', cookTime: '20m', complexity: 'Easy', ingredientStatus: 'All at home', tag: 'Quick Comfort' });
      } else if (day.startsWith('SAT')) {
        seeds.push({ id: bId, dayOfWeek: day, mealType: 'Breakfast', title: 'Methi Thepla & Curd', description: 'Thin spiced fenugreek wheat flatbreads served with fresh curd.', cookTime: '15m', complexity: 'Easy', ingredientStatus: 'All at home', tag: 'Light Breakfast' });
        seeds.push({ id: lId, dayOfWeek: day, mealType: 'Lunch', title: isJ ? 'Jain Veg Pulao & Raita' : 'Veg Pulao & Raita', description: 'Fragrant basmati rice cooked with garden fresh vegetables, served with cucumber raita.', cookTime: '25m', complexity: 'Medium', ingredientStatus: 'All at home', tag: 'Comfort Pot' });
        seeds.push({ id: sId, dayOfWeek: day, mealType: 'Snack', title: 'Tea & Bread Pakora', description: 'Evening tea paired with deep-fried bread slices stuffed with spiced mash.', cookTime: '15m', complexity: 'Easy', ingredientStatus: 'All at home', tag: 'Evening Bite' });
        seeds.push({ id: dId, dayOfWeek: day, mealType: 'Dinner', title: isJ ? 'Jain Paneer Makhani & Roti' : 'Malai Kofta & Phulka', description: 'Deep fried paneer potato balls in rich sweet cream-onion gravy, with soft rotis.', cookTime: '40m', complexity: 'Elaborate', ingredientStatus: 'All at home', tag: 'Family Feast' });
      } else if (day.startsWith('SUN')) {
        seeds.push({ id: bId, dayOfWeek: day, mealType: 'Breakfast', title: 'Poori Chole & Sooji Halwa', description: 'Traditional puffed wheat pooris served with spiced chickpeas and hot sweet pudding.', cookTime: '30m', complexity: 'Elaborate', ingredientStatus: 'All at home', tag: 'Sunday Classic' });
        seeds.push({ id: lId, dayOfWeek: day, mealType: 'Lunch', title: isJ ? 'Jain Paneer Pulao & Dal Tadka' : 'Dal Makhani & Paneer Butter Masala with Rice', description: 'Slow cooked rich black lentils and cottage cheese in cashew gravy, with basmati rice.', cookTime: '45m', complexity: 'Elaborate', ingredientStatus: 'Need 1 item', tag: 'Festive Lunch' });
        seeds.push({ id: sId, dayOfWeek: day, mealType: 'Snack', title: 'Sweet Lassi & Khaman Dhokla', description: 'Chilled sweet yogurt lassi served with fluffy steamed chickpea cakes.', cookTime: '15m', complexity: 'Easy', ingredientStatus: 'All at home', tag: 'Lazy Sunday' });
        seeds.push({ id: dId, dayOfWeek: day, mealType: 'Dinner', title: 'Comfort Khichdi & Begun Bhaja', description: 'Light comforting rice-lentil porridge topped with cow ghee and crispy fried eggplant.', cookTime: '20m', complexity: 'Easy', ingredientStatus: 'All at home', tag: 'Sunday Wrap' });
      }
    }
  });

  // Support for South India, Gujarat, Maharashtra via mapped palates fallback
  if (palate === 'South India' || palate === 'Gujarat' || palate === 'Maharashtra') {
    // Modify seeds lightly to give relevant regional touches
    seeds.forEach(meal => {
      if (palate === 'South India') {
        meal.tag = 'South Special';
        const dayPrefix = meal.dayOfWeek.substring(0, 3);
        const isV = isVeg || isJain;
        if (meal.mealType === 'Breakfast') {
          if (dayPrefix === 'MON' || dayPrefix === 'TUE') {
            meal.title = isV ? 'Soft Idli & Coconut Chutney' : 'Egg Appam & Milk';
            meal.description = isV ? 'Steamed savory rice cakes served with fresh ground coconut chutney.' : 'Lacy fermented rice crepes with a soft egg center.';
          } else if (dayPrefix === 'WED' || dayPrefix === 'THU') {
            meal.title = isV ? 'Ven Pongal & Medu Vada' : 'Egg Dosa & Coconut Chutney';
            meal.description = isV ? 'Comforting black pepper-ghee rice mash served with crispy lentil donut.' : 'Crispy rice crepe lined with spiced beaten eggs.';
          } else {
            meal.title = isV ? 'Masala Dosa & Sambar' : 'Malabar Egg Roast & Appam';
            meal.description = isV ? 'Golden rice crepe stuffed with spiced potato mash, with tiffin sambar.' : 'Boiled eggs simmered in rich caramelized onion coconut gravy, with appams.';
          }
          meal.cookTime = '15m';
        } else if (meal.mealType === 'Lunch') {
          if (dayPrefix === 'MON' || dayPrefix === 'TUE') {
            meal.title = isV ? 'Sambar Rice & Potato Fry' : 'Chicken Chettinad & Rice';
            meal.description = isV ? 'Aromatic rice cooked in tamarind-lentil broth, with spicy roasted potato cubes.' : 'Fiery black pepper-coconut chicken gravy served over rice.';
          } else if (dayPrefix === 'WED' || dayPrefix === 'THU') {
            meal.title = isV ? 'Lemon Rice & Vadagam' : 'Andhra Kodi Kura & Bhat';
            meal.description = isV ? 'Tangy turmeric rice tempered with peanuts and curry leaves, with crisps.' : 'Spicy, rich country chicken curry served over steamed rice.';
          } else {
            meal.title = isV ? 'Avial & Gobindobhog Bhat' : 'Malabar Fish Curry & Bhat';
            meal.description = isV ? 'Thick mixed vegetable stew seasoned with coconut oil and curd, with fragrant rice.' : 'Tender king fish simmered in tangy red chili-kokum gravy, served with rice.';
          }
        } else if (meal.mealType === 'Snack') {
          meal.title = 'Filter Coffee & Banana Chips';
          meal.description = 'Traditional chicory-infused frothed milk coffee served with salty banana crisps.';
        } else if (meal.mealType === 'Dinner') {
          if (dayPrefix === 'MON' || dayPrefix === 'TUE') {
            meal.title = isV ? 'Plain Dosa & Kurma' : 'Malabar Fish Curry & Appam';
            meal.description = isV ? 'Crispy thin rice crepe served with mixed vegetable coconut gravy.' : 'Tangy red fish curry served with lacy fermented rice pancakes.';
          } else if (dayPrefix === 'WED' || dayPrefix === 'THU') {
            meal.title = isV ? 'Adai Dosa & Avial' : 'Chicken Chettinad Biryani';
            meal.description = isV ? 'Thick protein-rich mixed lentil flatbread served with coconut veg stew.' : 'Spiced fragrant seeraga samba rice layered with tender chicken.';
          } else {
            meal.title = isV ? 'Rava Uthappam & Tomato Chutney' : 'Kothu Parotta & Salna';
            meal.description = isV ? 'Thick semolina pancake topped with chopped onions and chilies.' : 'Shredded flaky flatbread stir-fried with eggs, meat, and rich gravy.';
          }
        }
      } else if (palate === 'Gujarat') {
        meal.tag = 'Gujarati Touch';
        const dayPrefix = meal.dayOfWeek.substring(0, 3);
        if (meal.mealType === 'Breakfast') {
          if (dayPrefix === 'MON' || dayPrefix === 'TUE') {
            meal.title = 'Methi Thepla & Fresh Curd';
            meal.description = 'Fragrant fenugreek flatbreads served with fresh homemade curd.';
          } else if (dayPrefix === 'WED' || dayPrefix === 'THU') {
            meal.title = 'Khandvi & Masala Chai';
            meal.description = 'Silky rolled gram flour sheets tempered with mustard seeds, with tea.';
          } else if (dayPrefix === 'FRI') {
            meal.title = 'Fafda Jalebi & Sambharo';
            meal.description = 'Crispy gram flour logs paired with sweet jalebis and papaya salad.';
          } else {
            meal.title = 'Khaman Dhokla & Green Chutney';
            meal.description = 'Soft steamed savory chickpea flour cakes topped with grated coconut.';
          }
        } else if (meal.mealType === 'Lunch') {
          if (dayPrefix === 'MON' || dayPrefix === 'TUE') {
            meal.title = 'Gujarati Kadhi & Jeera Rice';
            meal.description = 'Sweet and sour yogurt curry served over cumin-infused rice.';
          } else if (dayPrefix === 'WED' || dayPrefix === 'THU') {
            meal.title = 'Gujarati Tuvar Dal & Bhat';
            meal.description = 'Sweet and tangy split pigeon pea dal, with steamed basmati rice.';
          } else if (dayPrefix === 'FRI') {
            meal.title = 'Dal Dhokli';
            meal.description = 'Spiced wheat flour dumplings simmered in thick sweet-sour tuvar dal.';
          } else {
            meal.title = 'Undhiyu & Warm Puri';
            meal.description = 'Traditional slow-cooked winter vegetable casserole with fenugreek dumplings and puffed pooris.';
          }
        } else if (meal.mealType === 'Snack') {
          if (dayPrefix === 'MON' || dayPrefix === 'TUE') {
            meal.title = 'Chai & Khakhra';
            meal.description = 'Hot tea with paper-thin crispy whole wheat flatbreads.';
          } else if (dayPrefix === 'WED' || dayPrefix === 'THU') {
            meal.title = 'Tea & Muthiya';
            meal.description = 'Steamed and sautéed spiced bottle gourd dumplings, street style.';
          } else {
            meal.title = 'Chai & Khaman Dhokla';
            meal.description = 'Sweet ginger tea paired with spongy steamed dhoklas.';
          }
        } else if (meal.mealType === 'Dinner') {
          if (dayPrefix === 'MON' || dayPrefix === 'TUE') {
            meal.title = 'Sev Tamatar Shaak & Rotla';
            meal.description = 'Tangy tomato curry topped with crispy sev, served with millet flatbread.';
          } else if (dayPrefix === 'WED' || dayPrefix === 'THU') {
            meal.title = 'Khichdi Kadhi & Papad';
            meal.description = 'Comforting yellow rice-lentil mash served with hot yogurt curry and papad.';
          } else if (dayPrefix === 'FRI') {
            meal.title = 'Bhindi Sambhariya & Roti';
            meal.description = 'Okra stuffed with spiced coconut-peanut masala, with soft rotis.';
          } else {
            meal.title = 'Ringan No Oro & Bajra Rotla';
            meal.description = 'Smoky roasted eggplant mash cooked with green garlic, with thick millet flatbread.';
          }
        }
      } else if (palate === 'Maharashtra') {
        meal.tag = 'Marathi Touch';
        const dayPrefix = meal.dayOfWeek.substring(0, 3);
        const isV = isVeg || isJain;
        if (meal.mealType === 'Breakfast') {
          if (dayPrefix === 'MON' || dayPrefix === 'TUE') {
            meal.title = 'Kanda Poha & Solkadhi';
            meal.description = 'Flattened rice sautéed with onions and peanuts, with kokum-coconut drink.';
          } else if (dayPrefix === 'WED' || dayPrefix === 'THU') {
            meal.title = 'Sabudana Khichdi & Curd';
            meal.description = 'Spiced tapioca pearls stir-fried with potatoes and roasted peanuts.';
          } else {
            meal.title = 'Thalipeeth & White Butter';
            meal.description = 'Savory multi-grain flatbread seasoned with onions, coriander and green chilies.';
          }
        } else if (meal.mealType === 'Lunch') {
          if (dayPrefix === 'MON' || dayPrefix === 'TUE') {
            meal.title = 'Varan Bhaat & Batata Bhaji';
            meal.description = 'Comforting yellow split-pea dal served over steamed rice with dry potato stir-fry.';
          } else if (dayPrefix === 'WED' || dayPrefix === 'THU') {
            meal.title = isV ? 'Pithla Bhakri & Garlic Thecha' : 'Kolhapuri Chicken & Rice';
            meal.description = isV ? 'Thick savory gram flour porridge served with rustic sorghum flatbread and spicy garlic chutney.' : 'Fiery, aromatic chicken curry prepared with freshly ground dry-roasted coconut spices.';
          } else {
            meal.title = isV ? 'Masala Bhaat & Raita' : 'Mutton Rassa & Bhakri';
            meal.description = isV ? 'Spiced ivy-gourd vegetable rice cooked with traditional goda masala.' : 'Rich, fiery Kolhapuri mutton gravy cooked with black coconut masala.';
          }
        } else if (meal.mealType === 'Snack') {
          if (dayPrefix === 'MON' || dayPrefix === 'TUE') {
            meal.title = 'Cutting Chai & Chivda';
            meal.description = 'Hot cutting chai paired with crispy sweet-spicy flattened rice munch.';
          } else {
            meal.title = 'Cutting Chai & Vada Pav';
            meal.description = 'Spiced deep-fried potato dumpling stuffed inside pav bread with dry garlic chutney.';
          }
        } else if (meal.mealType === 'Dinner') {
          if (dayPrefix === 'MON' || dayPrefix === 'TUE') {
            meal.title = 'Bharli Vangi & Soft Poli';
            meal.description = 'Baby eggplants stuffed with spicy sweet peanut-coconut paste, with soft rotis.';
          } else if (dayPrefix === 'WED' || dayPrefix === 'THU') {
            meal.title = isV ? 'Usal Pav' : 'Kolhapuri Egg Curry & Pav';
            meal.description = isV ? 'Spicy sprouted moth bean curry topped with chopped onions, served with pav.' : 'Boiled eggs cooked in rich coconut-chili Kolhapuri rassa, served with pav.';
          } else {
            meal.title = 'Puran Poli & Warm Ghee';
            meal.description = 'Sweet cardamom-scented chana dal stuffed wheat flatbread roasted with pure cow ghee.';
          }
        }
      }
    });
  }

  if (isVegan) {
    seeds = seeds.map(meal => {
      let title = meal.title;
      let description = meal.description;
      let tag = meal.tag;

      // Replace dairy & meat key terms
      title = title.replace(/paneer/ig, 'Tofu')
                   .replace(/curd/ig, 'Vegan Yogurt')
                   .replace(/butter/ig, 'Coconut')
                   .replace(/lassi/ig, 'Lemonade')
                   .replace(/milk/ig, 'Almond Milk')
                   .replace(/egg/ig, 'Tofu')
                   .replace(/chicken/ig, 'Jackfruit')
                   .replace(/mutton/ig, 'Soya Chunks')
                   .replace(/fish/ig, 'Tofu');

      description = description.replace(/paneer/ig, 'tofu')
                               .replace(/cottage cheese/ig, 'spiced tofu')
                               .replace(/ghee/ig, 'oil')
                               .replace(/butter/ig, 'vegan spread')
                               .replace(/cream/ig, 'cashew cream')
                               .replace(/yogurt/ig, 'vegan yogurt')
                               .replace(/curd/ig, 'vegan yogurt')
                               .replace(/milk/ig, 'almond milk')
                               .replace(/egg/ig, 'tofu')
                               .replace(/chicken/ig, 'jackfruit')
                               .replace(/mutton/ig, 'soya chunks')
                               .replace(/fish/ig, 'tofu');
                               
      tag = tag.replace(/Jain/ig, 'Vegan');

      return {
        ...meal,
        title,
        description,
        tag: tag === 'South Special' || tag === 'Gujarati Touch' || tag === 'Marathi Touch' ? tag : 'Vegan Special'
      };
    });
  }

  return seeds;
};

// --- Cross-Browser Safe Promise-based Timeout Fetch Helper ---
const fetchWithTimeout = async (url, options = {}, timeoutMs = 8000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
};

// --- Typo-Resilient Levenshtein Distance for App.jsx ---
const getLevenshteinDistance = (s1, s2) => {
  const a = s1.toLowerCase().trim();
  const b = s2.toLowerCase().trim();
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  return matrix[b.length][a.length];
};

const LSI_DICTIONARY = {
  "aloo": ["alu", "aalu", "potato", "potatos", "potatoes", "batata", "pepe"],
  "alu": ["aloo", "aalu", "potato", "batata"],
  "aalu": ["aloo", "alu", "potato", "batata"],
  "batata": ["aloo", "alu", "potato"],
  "posto": ["poshto", "poppy", "poppyseed", "poppyseeds", "khaskhas", "khas khas", "postaa"],
  "poshto": ["posto", "poppy", "khaskhas"],
  "shorshe": ["sorse", "sorise", "mustard", "sarso", "sarson", "sarse", "shorsh"],
  "sorse": ["shorshe", "mustard", "sarso"],
  "mach": ["maach", "machha", "machhli", "fish", "meen", "macher", "macchli"],
  "maach": ["mach", "machha", "machhli", "fish", "meen"],
  "machha": ["mach", "maach", "fish", "meen"],
  "fish": ["mach", "maach", "machha", "machhli", "meen"],
  "chicken": ["murgi", "murgh", "chicken curry", "ciken", "chiken", "manso"],
  "murgi": ["chicken", "murgh"],
  "murg": ["chicken", "murgh"],
  "dalma": ["dalma", "dalmaa", "odia dal", "dal", "lentil", "lentils", "dahl", "dhal"],
  "dal": ["dalma", "lentil", "lentils", "dahl", "dhal", "yellow dal", "dal makhani", "cholar dal", "biulir dal"],
  "posto bhat": ["posto", "aloo posto"],
  "luchi": ["puri", "puris", "poori", "pooris", "lucchi", "lusi"],
  "puri": ["luchi", "poori"],
  "roti": ["phulka", "chapati", "chapathi", "paratha", "parotas", "ruti"],
  "phulka": ["roti", "chapati"],
  "paneer": ["cheese", "cottage cheese", "panir", "pneer"],
  "butter chicken": ["butter", "chicken", "murg makhani"],
  "poha": ["chira", "chirer polao", "chuda", "upma", "pooha"],
  "chira": ["poha", "chirer polao"],
  "chuda": ["poha", "upma", "chakuli"],
  "upma": ["suji", "chilla", "halwa"],
  "halwa": ["suji", "sheera", "halua"],
  "mutton": ["kosha", "mangsho", "meat", "goat", "maton", "muton"],
  "egg": ["dim", "anda", "bhurji", "eg", "eggs"],
  "dim": ["egg", "anda"],
  "anda": ["egg", "dim"],
  "spicy": ["feast", "masala", "spici", "jhal", "kasa", "kosha", "tikka"],
  // Soya / fusion
  "soya": ["soyabean", "soyabeen", "soybean", "soy", "meal maker", "mealmaker", "nutrela"],
  "soyabean": ["soya", "soyabeen", "soybean", "meal maker", "mealmaker", "chunks"],
  "soyabeen": ["soya", "soyabean", "soybean", "meal maker", "mealmaker", "chunks"],
  "kochur": ["kochu", "taro", "arbi", "colocasia", "kachhu"],
  "loti": ["kochu", "taro stem", "kochur loti", "arbi stem"],
  "kundru": ["tindli", "tindora", "ivy gourd", "tendli", "giloda", "kundri"],
  "begun": ["eggplant", "brinjal", "baingan", "baigan"],
  "potol": ["pointed gourd", "parwal", "parval"],
  "jhinge": ["ridge gourd", "turai", "torai"],
  "dhokli": ["dumplings", "wheat dumpling", "lentil dumplings"]
};

// Common non-food stopwords to exclude from search tokens (Bengali/Hindi conversational words)
const SEARCH_STOPWORDS = new Set([
  'ranna', 'sekhao', 'banao', 'banana', 'batao', 'bolo', 'karo', 'debo', 'dite',
  'recipe', 'recipie', 'recepie', 'details', 'dikhao', 'sikhao', 'chahiye',
  'please', 'ok', 'okay', 'aaj', 'kal', 'aage', 'kya', 'hai', 'hain', 'de',
  'please', 'ki', 'kemon', 'kemiti', 'kaise', 'how', 'make', 'cook', 'prepare',
  'the', 'a', 'an', 'is', 'are', 'in', 'on', 'at', 'by', 'for', 'with', 'to',
  'and', 'or', 'not', 'liking', 'like', 'want', 'tell', 'me', 'give', 'show'
]);

// --- Resilient Smart Multilingual Simulator Chat Helper ---
const generateSmartChatResponse = (userText, profile) => {
  const text = (userText || '').toLowerCase().trim();
  
  if (text.includes('hi') || text.includes('hello') || text.includes('hey') || text.includes('namaste') || text.includes('namoskar') || text.includes('namaskar')) {
    return {
      chatText: `Namaste ${profile.familyName ? profile.familyName + ' family' : 'ji'}! Main aapka HomeChef AI Rasoi Saathi hoon. Aaj kya banana chahte hain? Aapke Samaan (pantry) ke active items dekh ke ek swadisht regional meal suggest kar sakta hoon!`,
      hasRecipe: false
    };
  }
  
  if (text.includes('diet') || text.includes('veg') || text.includes('non-veg') || text.includes('non veg') || text.includes('jain')) {
    return {
      chatText: `Ji bilkul! Homechef AI is fully configured to respect your joint family dietary rules. Active Diet: ${profile.dietaryPreference}. Active regional palate is set to ${profile.regionalPalate}. All menu rules apply automatically!`,
      hasRecipe: false
    };
  }
  
  if (text.includes('how to use') || text.includes('help') || text.includes('setup') || text.includes('guide') || text.includes('kaise use')) {
    return {
      chatText: `Homechef AI is designed for modern busy Indian kitchens! Here's how to navigate:
1. 🏠 **Ghar (Settings)**: Add family profiles, age groups, and special rules (like allergy safeguards or diabetic parameters).
2. 🍳 **Rasoi (Dashboard)**: Sauté, swap individual meals, accept or reject the daily menu.
3. 📦 **Samaan (Inventory)**: Add active kitchen stock (Fridge, Pantry, Spices) to keep meals zero-waste.
4. 💬 **Chat**: Ask me to give detailed DIY recipes, answer ingredients questions, or run a 4-step meal plan interview.
5. 📅 **Hafta (Weekly)**: View and download a premium printable PDF of your 7-day meal plan with DIY cooking steps!`,
      hasRecipe: false
    };
  }
  
  if (text.includes('generate') || text.includes('plan') || text.includes('weekly') || text.includes('hafta') || text.includes('menu')) {
    return {
      chatText: `Sure! Let's generate a personalized meal plan. Aap modern weekly planner (Hafta) me all 7 days view kar sakte hain. To customize Wednesday's menu, simply reject the dashboard suggestion in Rasoi, and I will run a customized Masterchef interview for you!`,
      hasRecipe: false
    };
  }

  // --- Run Fuzzy search directly to support broken-language recipe request via chat ---
  // Filter stopwords before search to avoid "ranna sekhao" type false positives
  const queryTokens = text.split(/[\s,._-]+/)
    .filter(t => t.length > 1 && !SEARCH_STOPWORDS.has(t));
  if (queryTokens.length > 0) {
    const mergedDb = getMergedKnowledgeBase();
    let scoredRecipes = [];

    Object.entries(mergedDb).forEach(([stateName, diets]) => {
      Object.entries(diets).forEach(([dietName, moods]) => {
        Object.entries(moods).forEach(([moodName, courses]) => {
          Object.entries(courses).forEach(([courseName, recipeList]) => {
            recipeList.forEach(recipe => {
              let score = 0;
              const titleWords = recipe.title.toLowerCase().split(/[\s,._-]+/).filter(w => w.length > 0);

              queryTokens.forEach(token => {
                if (recipe.title.toLowerCase().includes(token)) score += 15;
                if (recipe.tag.toLowerCase().includes(token)) score += 10;
                
                recipe.ingredients.forEach(ing => {
                  if (ing.toLowerCase().includes(token)) score += 5;
                });

                titleWords.forEach(tWord => {
                  const dist = getLevenshteinDistance(token, tWord);
                  if (dist === 0) score += 15;
                  else if (dist === 1 && token.length >= 5) score += 10; // Stricter: was >= 3, now >= 5 to avoid loti→roti
                  else if (dist === 2 && token.length >= 6) score += 6; // Also stricter for dist=2
                });

                Object.entries(LSI_DICTIONARY).forEach(([key, synonyms]) => {
                  const distToKey = getLevenshteinDistance(token, key);
                  if (distToKey === 0 || (distToKey === 1 && token.length >= 5)) {
                    synonyms.forEach(syn => {
                      if (recipe.title.toLowerCase().includes(syn)) score += 8;
                      recipe.ingredients.forEach(ing => {
                        if (ing.toLowerCase().includes(syn)) score += 4;
                      });
                    });
                  }
                });
              });

              if (score > 0) {
                scoredRecipes.push({ recipe, score, stateName });
              }
            });
          });
        });
      });
    });

    scoredRecipes.sort((a, b) => b.score - a.score);

    if (scoredRecipes.length > 0 && scoredRecipes[0].score >= 10) { // Higher threshold: was 6, now 10
      const top = scoredRecipes[0].recipe;
      const lang = (text.includes('kemon') || text.includes('bhalo') || text.includes('ki khabo') || text.includes('posto') || text.includes('macher') || text.includes('korun')) ? 'Bengali' : 
                   (text.includes('kemiti') || text.includes('baniba')) ? 'Oriya' : 
                   (text.includes('kaise') || text.includes('banaen') || text.includes('chahiye')) ? 'Hindi' : 'Hinglish';
      
      return {
        chatText: `${top.chatResponse[lang] || top.chatResponse['Hinglish'] || top.chatResponse['English']} (Smart Match for: "${top.title}")`,
        hasRecipe: true,
        recipeTitle: top.title,
        recipeTime: top.time,
        recipeTag: top.tag,
        recipeIngredients: top.ingredients,
        recipeSteps: top.steps
      };
    }
  }

  // Multilingual general fallbacks if no recipe matched
  if (text.includes('kemon') || text.includes('ranna') || text.includes('mach') || text.includes('bhalo') || text.includes('ki khabo') || text.includes('posto')) {
    return {
      chatText: `Namoskar! Ami aponar AI Chef. Aponar pochondo moton regional ${profile.regionalPalate} khabar ranna korte ami sahajjo korbo. Samaan tab e active kitchen items rakhun, ami swadisht recipe ready kore debo! Aloo Posto, Shorshe Maach, or Luchi Alur Dom - perfect DIY cooking steps recipe card check korun below!`,
      hasRecipe: false
    };
  }

  if (text.includes('sapadu') || text.includes('eppadi') || text.includes('namaskaram') || text.includes('ela')) {
    return {
      chatText: `Namaskaram! I am your loving AI Rasoi Saathi. I can suggest healthy, zero-waste recipes using ingredients listed in your Samaan tab. Let me know what you'd like to cook!`,
      hasRecipe: false
    };
  }

  return {
    chatText: `Namaste Ji! Main aapka Masterchef AI Chef hoon. Aap settings me preferences customize kar sakte hain! Aapne Samaan (inventory) tab me items save kiye hain, unka use karke fresh and healthy menu design kar sakta hoon. Aap aaram se kitchen questions poochhein!`,
    hasRecipe: false
  };
};


// --- Multilingual Language Assistant & Cultural Saffron-Voice Responder ---
const getMultilingualGreeting = (userText, dishTitle) => {
  const text = (userText || '').toLowerCase();
  
  // 1. Bengali
  if (text.includes('kemon') || text.includes('kore') || text.includes('banabo') || text.includes('ami') || text.includes('machhli') || text.includes('ranna') || text.includes('bhalo') || text.includes('ki') || text.includes('namoskar')) {
    return `Namoskar! Aha, ${dishTitle} kemon kore banabe? Khub sahaj! Ami aponar jonne absolute Masterchef-style step-by-step DIY recipe ready korechi. Please check below and cook with love!`;
  }
  
  // 2. Hindi / Hinglish
  if (text.includes('kaise') || text.includes('banaen') || text.includes('banao') || text.includes('kya') || text.includes('batao') || text.includes('namaste')) {
    return `Namaste Ji! ${dishTitle} kaise banayein, ye pooch rahe hain? Bilkul bataunga! Aapki Rasoi Saathi ne step-by-step guide niche ready kar di hai. Aaram se cook karein!`;
  }
  
  // 3. Tamil
  if (text.includes('eppadi') || text.includes('seivadhu') || text.includes('vanakkam') || text.includes('enna') || text.includes('saapadu')) {
    return `Vanakkam! ${dishTitle} eppadi seiyadhu? Romba simple! I have generated the perfect detailed step-by-step DIY recipe checklist below. Enjoy cooking!`;
  }
  
  // 4. Telugu
  if (text.includes('ela') || text.includes('cheyali') || text.includes('namaskaram') || text.includes('bhojanam')) {
    return `Namaskaram! ${dishTitle} ela cheyali ani chustunnara? Chaala sulabham! Perfect step-by-step recipe with all measurements is ready below. Shubh Bhojanam!`;
  }
  
  // 5. Malayalam
  if (text.includes('engane') || text.includes('undakkam') || text.includes('namaskaram') || text.includes('kazhicho')) {
    return `Namaskaram! ${dishTitle} engane undakkam ennu njan paranju tharam. Innathae menu super aakum! Please check the detailed steps below.`;
  }
  
  // 6. Oriya
  if (text.includes('kemiti') || text.includes('baniba') || text.includes('jiba') || text.includes('khaba')) {
    return `Namaskar! ${dishTitle} kemiti banibe? Khub sahaj! Apana nka pain deep culinary recipe niche present karichi. Aaram se prastuta karantu!`;
  }
  
  // Default warm Hinglish-English
  return `Namaste! I have designed the ultimate customized recipe for ${dishTitle} to suit your family preferences. Tap the guide below to learn the steps!`;
};

export default function App() {
  // --- State Key Persistence ---
  const [currentScreen, setCurrentScreen] = useState(() => {
    return localStorage.getItem('hc_screen') || 'splash';
  });

  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('hc_tab') || 'home';
  });

  const [householdProfile, setHouseholdProfile] = useState(() => {
    const cached = localStorage.getItem('hc_profile');
    const defaults = {
      familyName: '',
      familySize: '3-4',
      regionalPalate: 'General Indian',
      dietaryPreference: 'Vegetarian',
      specialOccasion: 'No Preference',
      archetype: 'STANDARD'
    };
    return cached ? { ...defaults, ...JSON.parse(cached) } : defaults;
  });

  const [familyMembers, setFamilyMembers] = useState(() => {
    const cached = localStorage.getItem('hc_members');
    return cached ? JSON.parse(cached) : [
      { id: 1, name: 'Arjun', ageGroup: 'Adult', restrictions: 'No Spicy', favDish: 'Palak Paneer' },
      { id: 2, name: 'Mira', ageGroup: 'Child', restrictions: 'Peanuts', favDish: 'Butter Masala' }
    ];
  });

  const [inventoryItems, setInventoryItems] = useState(() => {
    const cached = localStorage.getItem('hc_inventory');
    return cached ? JSON.parse(cached) : [
      { id: 1, name: 'Milk', category: 'Fridge', quantity: '1L', expiryText: 'Fresh', critical: false },
      { id: 2, name: 'Paneer', category: 'Fridge', quantity: '200g', expiryText: 'Fresh', critical: false },
      { id: 3, name: 'Fresh Spinach (Palak)', category: 'Fridge', quantity: '2 Bunches', expiryText: 'Expiring soon', critical: true },
      { id: 4, name: 'Coriander Leaves', category: 'Fridge', quantity: '1 Bunch', expiryText: 'Expiring soon', critical: false },
      { id: 5, name: 'Aloo (Potatoes)', category: 'Pantry', quantity: '2kg', expiryText: 'Fresh', critical: false },
      { id: 6, name: 'Onions', category: 'Pantry', quantity: '1kg', expiryText: 'Fresh', critical: false },
      { id: 7, name: 'Atta (Flour)', category: 'Pantry', quantity: '5kg', expiryText: 'Fresh', critical: false },
      { id: 8, name: 'Basmati Rice', category: 'Pantry', quantity: '5kg', expiryText: 'Refill', critical: true },
      { id: 9, name: 'Turmeric Powder', category: 'Spices', quantity: '100g', expiryText: 'Fresh', critical: false },
      { id: 10, name: 'Kashmiri Red Chili', category: 'Spices', quantity: '200g', expiryText: 'Fresh', critical: false },
      { id: 11, name: 'Jeera / Cumin Seeds', category: 'Spices', quantity: '150g', expiryText: 'Fresh', critical: false }
    ];
  });

  const [mealPlan, setMealPlan] = useState(() => {
    const cached = localStorage.getItem('hc_meal_plan');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        // Validate cache has current week's days — regenerate if stale
        const currentWeekDays = getCurrentWeekDays();
        const currentMonday = currentWeekDays[0]; // e.g. 'MON 26'
        const hasFreshData = parsed.some(m => m.dayOfWeek === currentMonday);
        if (hasFreshData && parsed.length >= 20) {
          return parsed;
        }
      } catch (err) {
        console.error("Failed to parse cached meals", err);
      }
    }
    const p = localStorage.getItem('hc_profile');
    const prof = p ? JSON.parse(p) : {};
    return generateInitialMeals(prof.dietaryPreference || 'Vegetarian', prof.regionalPalate || 'General Indian');
  });

  const [chatMessages, setChatMessages] = useState(() => {
    const cached = localStorage.getItem('hc_chats');
    return cached ? JSON.parse(cached) : [
      { id: 1, sender: 'AI', messageText: 'Namaste! Main aapka HomeChef AI Rasoi Saathi hoon. Aaj kya banana chahte hain? Recipe, meal plan, ya pantry check — sab kuch poochh sakte hain!' }
    ];
  });
  const [isTyping, setIsTyping] = useState(false);

  const [globalRestrictions, setGlobalRestrictions] = useState(() => {
    const cached = localStorage.getItem('hc_global_rest');
    return cached ? JSON.parse(cached) : ['Vegetarian', 'No Spicy', 'Gluten Free'];
  });

  // --- V2 Menu State Orchestrators ---
  const [menuLockState, setMenuLockState] = useState(() => {
    return localStorage.getItem('hc_menu_locked') === 'true';
  });

  const [menuRejectedState, setMenuRejectedState] = useState(false);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);
  const [hasAcceptedTOS, setHasAcceptedTOS] = useState(() => {
    return localStorage.getItem('hc_tos_accepted') === 'true';
  });

  // --- Guided Chat Interview States ---
  const [isInterviewActive, setIsInterviewActive] = useState(() => {
    return localStorage.getItem('hc_int_active') === 'true';
  });
  const [interviewStep, setInterviewStep] = useState(() => {
    return parseInt(localStorage.getItem('hc_int_step') || '0', 10);
  });
  const [interviewAnswers, setInterviewAnswers] = useState(() => {
    const cached = localStorage.getItem('hc_int_ans');
    return cached ? JSON.parse(cached) : { mood: '', ingredients: '', time: '', health: '' };
  });

  const [isThaliMapOpen, setIsThaliMapOpen] = useState(false);

  // --- Effects for LocalStorage Cache Sync ---
  useEffect(() => { localStorage.setItem('hc_screen', currentScreen); }, [currentScreen]);
  useEffect(() => { localStorage.setItem('hc_tab', activeTab); }, [activeTab]);
  useEffect(() => { localStorage.setItem('hc_profile', JSON.stringify(householdProfile)); }, [householdProfile]);
  useEffect(() => { localStorage.setItem('hc_members', JSON.stringify(familyMembers)); }, [familyMembers]);
  useEffect(() => { localStorage.setItem('hc_inventory', JSON.stringify(inventoryItems)); }, [inventoryItems]);
  useEffect(() => { localStorage.setItem('hc_meal_plan', JSON.stringify(mealPlan)); }, [mealPlan]);
  useEffect(() => { localStorage.setItem('hc_chats', JSON.stringify(chatMessages)); }, [chatMessages]);
  useEffect(() => { localStorage.setItem('hc_global_rest', JSON.stringify(globalRestrictions)); }, [globalRestrictions]);
  useEffect(() => { localStorage.setItem('hc_menu_locked', menuLockState ? 'true' : 'false'); }, [menuLockState]);
  useEffect(() => { localStorage.setItem('hc_int_active', isInterviewActive ? 'true' : 'false'); }, [isInterviewActive]);
  useEffect(() => { localStorage.setItem('hc_int_step', interviewStep.toString()); }, [interviewStep]);
  useEffect(() => { localStorage.setItem('hc_int_ans', JSON.stringify(interviewAnswers)); }, [interviewAnswers]);
  useEffect(() => { localStorage.setItem('hc_tos_accepted', hasAcceptedTOS ? 'true' : 'false'); }, [hasAcceptedTOS]);

  // --- State Manipulation Handlers ---
  const saveWizardPreferences = (size, palate, diet, occasion, name) => {
    const updatedName = name || 'Chakraborty';
    setHouseholdProfile({
      familyName: updatedName,
      familySize: size,
      regionalPalate: palate,
      dietaryPreference: diet,
      specialOccasion: occasion
    });
    
    const freshlySeededMeals = generateInitialMeals(diet, palate);
    setMealPlan(freshlySeededMeals);
    setMenuLockState(false); 

    setCurrentScreen('mainApp');
    setActiveTab('home');
    setIsWelcomeModalOpen(true); 
  };

  const handleMenuAccept = () => {
    setMenuLockState(true);
  };

  const handleMenuReject = () => {
    setMenuRejectedState(true);
    
    setTimeout(() => {
      setMenuRejectedState(false);
      setActiveTab('chat');
      
      setIsInterviewActive(true);
      setInterviewStep(1);
      setInterviewAnswers({ mood: '', ingredients: '', time: '', health: '' });
      setChatMessages([
        { id: Date.now(), sender: 'AI', messageText: `Koi baat nahi ${householdProfile.familyName} Ji! Let's ask our Masterchef AI Chef. Main aapse 4-5 quick questions poochunga aur hum solid customized menu create karenge! Sabse pehle bataiye: Aaj family ka kya mood hai aur kya khana chahte hain? (e.g. something light, spicy feast, traditional comfort)?` }
      ]);
    }, 1800);
  };

// --- Safe JSON Extractor Utility ---
const extractJson = (str) => {
  if (!str) return '{}';
  const start = str.indexOf('{');
  const end = str.lastIndexOf('}');
  if (start !== -1 && end !== -1 && end > start) {
    return str.substring(start, end + 1);
  }
  return str.trim();
};

// --- AI Response Sanitizer: Strips markdown, emojis, and special formatting ---
const sanitizeAIText = (text) => {
  if (!text || typeof text !== 'string') return text || '';
  let cleaned = text;
  // Remove markdown bold/italic markers
  cleaned = cleaned.replace(/\*\*(.+?)\*\*/g, '$1');
  cleaned = cleaned.replace(/\*(.+?)\*/g, '$1');
  cleaned = cleaned.replace(/__(.+?)__/g, '$1');
  cleaned = cleaned.replace(/_(.+?)_/g, '$1');
  // Remove markdown headers
  cleaned = cleaned.replace(/^#{1,6}\s+/gm, '');
  // Remove markdown links [text](url)
  cleaned = cleaned.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  // Remove backticks
  cleaned = cleaned.replace(/`([^`]+)`/g, '$1');
  // Remove common emojis (unicode emoji ranges)
  cleaned = cleaned.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{200D}\u{20E3}\u{2328}\u{23CF}\u{23E9}-\u{23F3}\u{23F8}-\u{23FA}\u{1F004}\u{1F0CF}]/gu, '');
  // Remove leftover markdown bullet markers at line start
  cleaned = cleaned.replace(/^\s*[-*•]\s+/gm, '');
  // Collapse multiple spaces/newlines
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
  cleaned = cleaned.replace(/  +/g, ' ');
  return cleaned.trim();
};

// --- Helper: Keyless, Bypass-capable Client-Side Puter AI Chat Completion Fetch ---
const callPuterAI = async (promptText) => {
  let token = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("puter.auth.token.v2") || 
            (window.puter && window.puter.authToken);
  }

  const headers = {
    "Content-Type": "application/json",
  };
  
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch("https://api.puter.com/puterai/openai/v1/chat/completions", {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: "gpt-4o-mini", // Supported high-efficiency model
      messages: [{ role: "user", content: promptText }],
      temperature: 0.2,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Puter AI Error ${response.status}: ${errText}`);
  }

  const data = await response.json();
  if (data && data.choices && data.choices[0] && data.choices[0].message) {
    return data.choices[0].message.content;
  }
  throw new Error("Invalid response format from Puter AI REST API");
};

// --- Helper: Client-Side Offline RAG Engine (Corrected) ---
const retrieveRecipesRAG = (userText, diet, palate) => {
  if (!userText) return '';
  const query = userText.toLowerCase().trim();
  
  // Forbidden ingredients for Jain diets
  const jainForbidden = ['aloo', 'potato', 'onion', 'pyaaz', 'garlic', 'lehsun', 'ginger', 'adrak', 'eggplant', 'begun', 'baingan'];
  // Forbidden ingredients for Vegan diets
  const veganForbidden = ['paneer', 'cheese', 'butter', 'ghee', 'cream', 'curd', 'milk', 'yogurt', 'dahi', 'honey', 'egg', 'chicken', 'mutton', 'fish', 'beef', 'meat'];

  // Helper to normalize titles for fuzzy comparison
  const normalize = str => str.toLowerCase().replace(/[^a-z0-9]/g, '');

  // 1. Filter RecipeIndex stubs by diet, ingredients safety, and keywords
  const matchedStubs = RECIPE_MEGA_INDEX.filter(recipe => {
    // Basic diet filter
    if (diet === 'Vegetarian' && recipe.diet !== 'Vegetarian') return false;
    
    // Strict Jain filter: check both recipe metadata and forbid root ingredients
    if (diet === 'Jain') {
      if (recipe.diet !== 'Vegetarian' && recipe.diet !== 'Jain') return false;
      const titleLower = recipe.title.toLowerCase();
      const hasForbiddenIngredient = recipe.ingredients?.some(ing => 
        jainForbidden.some(forbidden => ing.toLowerCase().includes(forbidden))
      ) || jainForbidden.some(forbidden => titleLower.includes(forbidden));
      
      if (hasForbiddenIngredient) return false;
    }

    // Strict Vegan filter: check both recipe metadata and forbid animal/dairy ingredients
    if (diet === 'Vegan') {
      if (recipe.diet !== 'Vegetarian') return false;
      const titleLower = recipe.title.toLowerCase();
      const hasForbiddenIngredient = recipe.ingredients?.some(ing => 
        veganForbidden.some(forbidden => ing.toLowerCase().includes(forbidden))
      ) || veganForbidden.some(forbidden => titleLower.includes(forbidden));
      
      if (hasForbiddenIngredient) return false;
    }
    
    // Keyword match in title, aliases, tags
    const titleMatch = recipe.title.toLowerCase().includes(query);
    const tagMatch = recipe.tags.some(tag => query.includes(tag.toLowerCase()));
    
    // Fixed: Bidirectional alias match
    const aliasMatch = recipe.aliases?.some(alias => 
      alias.toLowerCase().includes(query) || query.includes(alias.toLowerCase())
    );
    
    return titleMatch || tagMatch || aliasMatch;
  }).slice(0, 3); // Get top 3 matches
  
  if (matchedStubs.length === 0) return 'No matching offline recipes found.';

  // 2. Resolve matches to full recipes in CULINARY_KNOWLEDGE_BASE
  let contextText = 'RETRIEVED OFFLINE RECIPE CONTEXT:\n';
  
  matchedStubs.forEach(stub => {
    let fullRecipe = null;

    // Helper search logic to find matching recipe in a state database
    const findInState = (stateData) => {
      if (!stateData) return null;
      const dietData = stateData[stub.diet] || stateData['Vegetarian'];
      if (!dietData) return null;
      
      for (const cat in dietData) {
        const courses = dietData[cat];
        for (const course in courses) {
          const recipeList = courses[course];
          
          // Fixed: Tokenized title matching to resolve slight discrepancies
          const found = recipeList.find(r => {
            const normR = normalize(r.title);
            const normStub = normalize(stub.title);
            
            // Check for mutual inclusion or high overlap
            if (normR.includes(normStub) || normStub.includes(normR)) {
              if (diet === 'Vegan') {
                const hasForbidden = r.ingredients?.some(ing =>
                  veganForbidden.some(forbidden => ing.toLowerCase().includes(forbidden))
                );
                if (hasForbidden) return false;
              }
              return true;
            }
            
            // Check keyword token overlap (e.g. "shorshe", "ilish")
            const rTokens = normR.split(/\s+/).filter(t => t.length > 2);
            const stubTokens = normStub.split(/\s+/).filter(t => t.length > 2);
            const overlap = rTokens.filter(t => stubTokens.includes(t));
            if (overlap.length >= 2) {
              if (diet === 'Vegan') {
                const hasForbidden = r.ingredients?.some(ing =>
                  veganForbidden.some(forbidden => ing.toLowerCase().includes(forbidden))
                );
                if (hasForbidden) return false;
              }
              return true;
            }
            return false;
          });
          
          if (found) return found;
        }
      }
      return null;
    };

    // Attempt targeted lookup first
    if (stub.state) {
      fullRecipe = findInState(CULINARY_KNOWLEDGE_BASE[stub.state]);
    }
    
    // Fixed: Fall back to searching across ALL states if null state or targeted lookup failed
    if (!fullRecipe) {
      for (const stateName in CULINARY_KNOWLEDGE_BASE) {
        fullRecipe = findInState(CULINARY_KNOWLEDGE_BASE[stateName]);
        if (fullRecipe) break;
      }
    }
    
    if (fullRecipe) {
      contextText += `\n- Recipe: ${fullRecipe.title} (${stub.state || 'Universal'}, ${stub.diet})\n`;
      contextText += `  Time: ${fullRecipe.time || stub.time}\n`;
      contextText += `  Ingredients: ${fullRecipe.ingredients.join(', ')}\n`;
      contextText += `  Steps: ${fullRecipe.steps.join(' -> ')}\n`;
    } else {
      contextText += `\n- Recipe: ${stub.title} (${stub.state || 'Universal'}, ${stub.diet})\n`;
      contextText += `  Time: ${stub.time}\n`;
      contextText += `  Ingredients: ${stub.ingredients.join(', ')}\n`;
      contextText += `  Steps: Refer to standard preparation steps for ${stub.title}.\n`;
    }
  });
  
  return contextText;
};

// --- V2 Bulletproof Message Handler: Completely Synced State Updates ---
const handleUserMessage = async (userText, parsedRes, isLocalOnly, senderOverride) => {
  const timeId = Date.now();
  
  if (senderOverride === 'AI') {
    // Add AI message directly (used for tree confirmed results and text confirmation bubbles)
    setChatMessages(prev => [...prev, { 
      id: timeId, 
      sender: 'AI', 
      messageText: userText,
      hasRecipe: parsedRes ? parsedRes.hasRecipe : false,
      recipeTitle: parsedRes ? parsedRes.recipeTitle : '',
      recipeTime: parsedRes ? parsedRes.recipeTime : '',
      recipeTag: parsedRes ? parsedRes.recipeTag : '',
      recipeIngredients: parsedRes ? parsedRes.recipeIngredients : [],
      recipeSteps: parsedRes ? parsedRes.recipeSteps : []
    }]);
    
    if (parsedRes?.meals && parsedRes.meals.length > 0) {
      updateMealsState(parsedRes.meals);
    }
    return;
  }

  // 1. Add user message
  setChatMessages(prev => [...prev, { id: timeId, sender: 'User', messageText: userText }]);

  // 2. If it is only a local choice click, stop here
  if (isLocalOnly) {
    return;
  }

  // 3. Intercept Guided Interview Steps
  if (isInterviewActive) {
    setIsTyping(true);
    setTimeout(async () => {
      setIsTyping(false);
      if (interviewStep === 1) {
        setInterviewAnswers(prev => ({ ...prev, mood: userText }));
        setInterviewStep(2);
        setChatMessages(prev => [...prev, { 
          id: Date.now(), 
          sender: 'AI', 
          messageText: "Got it. Ab bataiye: Aaj pantry mein kaunsi vegetables ya ingredients hain jinhe use karna hai?" 
        }]);
      } else if (interviewStep === 2) {
        setInterviewAnswers(prev => ({ ...prev, ingredients: userText }));
        setInterviewStep(3);
        setChatMessages(prev => [...prev, { 
          id: Date.now(), 
          sender: 'AI', 
          messageText: "Perfect. Aapke paas kitna time hai cooking ke liye (e.g. 20 mins, 45 mins)?" 
        }]);
      } else if (interviewStep === 3) {
        setInterviewAnswers(prev => ({ ...prev, time: userText }));
        setInterviewStep(4);
        setChatMessages(prev => [...prev, { 
          id: Date.now(), 
          sender: 'AI', 
          messageText: "Samajh gaya. Koi specific health requirements ya allergy instructions?" 
        }]);
      } else if (interviewStep === 4) {
        const finalAnswers = { ...interviewAnswers, health: userText };
        setInterviewAnswers(finalAnswers);
        await executeMasterchefSynthesis(finalAnswers);
      }
    }, 600);
    return;
  }

  // 4. If parsedRes is provided (loaded recipe from offline recommendations)
  if (parsedRes) {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setChatMessages(prev => [...prev, {
        id: timeId + 1,
        sender: 'AI',
        messageText: parsedRes.chatText,
        hasRecipe: true,
        recipeTitle: parsedRes.recipeTitle,
        recipeTime: parsedRes.recipeTime,
        recipeTag: parsedRes.recipeTag,
        recipeIngredients: parsedRes.recipeIngredients,
        recipeSteps: parsedRes.recipeSteps
      }]);
      
      if (parsedRes.meals && parsedRes.meals.length > 0) {
        updateMealsState(parsedRes.meals);
      }
    }, 600);
    return;
  }

  // 5. Standard free-text input search or prompt (handles live or offline fuzzy fallback)
  setIsTyping(true);
  
  const ragContext = retrieveRecipesRAG(userText, householdProfile.dietaryPreference, householdProfile.regionalPalate);

  const archetype = householdProfile.archetype || 'STANDARD';
  let archetypeContext = '';
  if (archetype === 'EUROPEAN_VC_WIFE') {
    archetypeContext = `
DIETARY STYLE: Health-Optimized
- Style: Clean, minimal plating, light portions.
- Ingredients: Low glycemic index, superfoods (chia, ashwagandha, turmeric, moringa), extra virgin oils, no processed sugar.
`;
  } else if (archetype === 'SHARK_TANK_JUDGE') {
    archetypeContext = `
DIETARY STYLE: High-Performance Fuel
- Style: Bold, high-protein, energizing meals.
- Ingredients: Ragi, quinoa, sattu, Brahmi ghee, seeds, Guntur chilies, performance nutrition.
`;
  }

  const customQueryInstruction = `
You are Homechef AI, a practical Indian home cooking assistant for the ${householdProfile.familyName} family.
${archetypeContext}

HOUSEHOLD RULES (STRICTLY FOLLOW):
- Diet: ${householdProfile.dietaryPreference}. ${householdProfile.dietaryPreference === 'Non-Vegetarian' ? 'Suggest fish, chicken, mutton, egg dishes primarily. Do NOT suggest paneer/vegetarian as the main dish unless asked.' : householdProfile.dietaryPreference === 'Vegetarian' ? 'NEVER suggest any meat, fish, egg, or non-veg dish.' : householdProfile.dietaryPreference === 'Vegan' ? 'NEVER suggest any animal products, milk, curd, paneer, honey, egg, ghee, butter, or meat.' : 'NEVER suggest meat, fish, egg, onion, garlic, or root vegetables.'}
- Regional palate: ${householdProfile.regionalPalate}
- Family members: ${familyMembers.map(m => m.name + ' (' + m.ageGroup + ', avoids: ' + (m.restrictions || 'none') + ')').join('; ')}
- Pantry stock: ${inventoryItems.map(i => i.name + ' (' + i.quantity + ')').join(', ')}

OFFLINE CULINARY DATABASE CONTEXT:
${ragContext}

User says: "${userText}"

RESPONSE RULES:
1. Reply in 2-3 SHORT clean sentences. Use simple warm Hinglish tone. NO emojis, NO markdown (no ** or * or # or - bullets), NO special characters.
2. If the user asks for a recipe or how to cook something, set hasRecipe to true and provide COMPLETE ingredients with quantities and step-by-step cooking instructions.
3. NEVER ask follow-up questions. ALWAYS give a direct, helpful answer with a concrete dish suggestion.
4. If user says "spicy" or "something new" — immediately suggest ONE specific dish with full recipe. Do not list options or ask what they want.
5. The dish MUST match the diet (${householdProfile.dietaryPreference}) and regional palate (${householdProfile.regionalPalate}).

Return ONLY valid JSON. No text before or after the JSON object:
{
  "chatText": "Your clean 2-3 sentence response without emojis or markdown",
  "hasRecipe": true or false,
  "recipeTitle": "Dish name",
  "recipeTime": "e.g. 25 MINS",
  "recipeTag": "e.g. BENGALI NON-VEG",
  "recipeIngredients": ["Ingredient with quantity"],
  "recipeSteps": ["Step description without numbering"]
}
    `;

    const runLocalChatSimFallback = () => {
      const res = generateSmartChatResponse(userText, householdProfile);
      setChatMessages(prev => [...prev, {
        id: timeId + 1,
        sender: 'AI',
        messageText: res.chatText,
        hasRecipe: res.hasRecipe,
        recipeTitle: res.recipeTitle || '',
        recipeTime: res.recipeTime || '25 MINS',
        recipeTag: res.recipeTag || 'CHEF SPECIAL',
        recipeIngredients: res.recipeIngredients || [],
        recipeSteps: res.recipeSteps || []
      }]);
      setIsTyping(false);
    };

    if (navigator.onLine && !IS_NATIVE) {
      try {
        callPuterAI(customQueryInstruction)
          .then(rawText => {
            const cleanText = extractJson(rawText);
            const parsed = JSON.parse(cleanText);
            
            setChatMessages(prev => [...prev, {
              id: timeId + 1,
              sender: 'AI',
              messageText: sanitizeAIText(parsed.chatText) || 'Here is your meal recommendation!',
              hasRecipe: parsed.hasRecipe !== undefined ? parsed.hasRecipe : false,
              recipeTitle: parsed.recipeTitle || '',
              recipeTime: parsed.recipeTime || '25 MINS',
              recipeTag: parsed.recipeTag || 'CHEF SPECIAL',
              recipeIngredients: parsed.recipeIngredients || [],
              recipeSteps: (parsed.recipeSteps || []).map(s => sanitizeAIText(s))
            }]);
            setIsTyping(false);
          })
          .catch(err => {
            console.warn("Puter AI query failed, running local fallback", err);
            runLocalChatSimFallback();
          });
      } catch (e) {
        console.warn("Puter AI initialization failed, running local fallback", e);
        runLocalChatSimFallback();
      }
    } else {
      // Local offline demo mode
      setTimeout(() => {
        runLocalChatSimFallback();
      }, 800);
    }
};

const updateMealsState = (newMeals) => {
  setMealPlan(prev => {
    const daysToReplace = newMeals.map(m => m.dayOfWeek.toUpperCase());
    const filtered = prev.filter(m => !daysToReplace.includes(m.dayOfWeek.toUpperCase()));
    const mapped = newMeals.map((m, idx) => ({
      id: Date.now() + idx,
      dayOfWeek: m.dayOfWeek.toUpperCase(),
      mealType: m.mealType,
      title: m.title,
      description: m.description,
      cookTime: m.cookTime,
      complexity: m.complexity,
      ingredientStatus: m.ingredientStatus,
      tag: m.tag
    }));
    return [...filtered, ...mapped];
  });
  setMenuLockState(false);
};

// --- Resilient Local Fallback Seeding Matrix ---
const getLocalFallbackMeals = (diet, palate) => {
  const isNV = diet === 'Non-Vegetarian';
  const isJain = diet === 'Jain';
  if (palate === 'West Bengal') {
    if (isNV) {
      return [
        { dayOfWeek: "WED 27", mealType: "Breakfast", title: "Luchi & Alur Dom", description: "Puffed golden Bengali flour puris with light home-cooked potato gravy.", cookTime: "15 mins", complexity: "Easy", ingredientStatus: "All at home", tag: "Calcutta Classic" },
        { dayOfWeek: "WED 27", mealType: "Lunch", title: "Homestyle Shorshe Maach", description: "Fresh river fish steaks simmered in light mustard-turmeric green chili gravy.", cookTime: "25 mins", complexity: "Medium", ingredientStatus: "All at home", tag: "Traditional Feast" },
        { dayOfWeek: "WED 27", mealType: "Snack", title: "Chai & Jhal Muri", description: "Tangy puffed rice spiced with mustard oil, coriander and peanuts.", cookTime: "10 mins", complexity: "Easy", ingredientStatus: "All at home", tag: "Street Style" },
        { dayOfWeek: "WED 27", mealType: "Dinner", title: "Dim Kosha & Phulka", description: "Comforting Bengali egg masala curry cooked slowly with home potatoes and rotis.", cookTime: "20 mins", complexity: "Easy", ingredientStatus: "All at home", tag: "Comfort Dinner" }
      ];
    } else if (isJain) {
      return [
        { dayOfWeek: "WED 27", mealType: "Breakfast", title: "Radhaballabhi & Cholar Dal", description: "Puffed golden gram flatbread served with sweet Bengal gram dal without root spices.", cookTime: "20 mins", complexity: "Medium", ingredientStatus: "All at home", tag: "Jain Bengali" },
        { dayOfWeek: "WED 27", mealType: "Lunch", title: "Jain Posto Paneer", description: "Cottage cheese cubes simmered in poppy seeds and green chili paste.", cookTime: "25 mins", complexity: "Medium", ingredientStatus: "All at home", tag: "Traditional Jain" },
        { dayOfWeek: "WED 27", mealType: "Snack", title: "Ginger Tea & Makhana", description: "Hot ginger tea served with toasted cumin seeds and crunchy makhana.", cookTime: "10 mins", complexity: "Easy", ingredientStatus: "All at home", tag: "Comfort Tea" },
        { dayOfWeek: "WED 27", mealType: "Dinner", title: "Chanar Dalna & Phulka", description: "Lentil cottage cheese balls cooked in cumin tomato gravy served with hot rotis.", cookTime: "25 mins", complexity: "Medium", ingredientStatus: "All at home", tag: "Jain Classic" }
      ];
    } else {
      return [
        { dayOfWeek: "WED 27", mealType: "Breakfast", title: "Bengali Luchi & Cholar Dal", description: "Puffed white puris served with sweet Bengal gram dal topped with coconut shards.", cookTime: "20 mins", complexity: "Medium", ingredientStatus: "All at home", tag: "Classic Veg" },
        { dayOfWeek: "WED 27", mealType: "Lunch", title: "Comforting Aloo Posto", description: "Diced potatoes simmered in a thick poppy-seed paste, with steamed rice.", cookTime: "25 mins", complexity: "Easy", ingredientStatus: "All at home", tag: "Zero-Waste Veg" },
        { dayOfWeek: "WED 27", mealType: "Snack", title: "Chai & Sabudana Vada", description: "Hot ginger tea served with crispy fried tapioca pearls.", cookTime: "15 mins", complexity: "Easy", ingredientStatus: "All at home", tag: "Simple Comfort" },
        { dayOfWeek: "WED 27", mealType: "Dinner", title: "Dhokar Dalna & Phulka", description: "Spiced lentil cakes simmered in ginger-cumin tomato gravy with soft rotis.", cookTime: "30 mins", complexity: "Medium", ingredientStatus: "All at home", tag: "Family Favorite" }
      ];
    }
  } else {
    if (isNV) {
      return [
        { dayOfWeek: "WED 27", mealType: "Breakfast", title: "Chicken Paratha & Yogurt", description: "Aromatic shredded spiced chicken paratha served hot.", cookTime: "15 mins", complexity: "Medium", ingredientStatus: "All at home", tag: "High Protein" },
        { dayOfWeek: "WED 27", mealType: "Lunch", title: "Punjabi Tariwala Chicken", description: "Light homestyle chicken curry cooked with aromatic whole spices and Basmati rice.", cookTime: "35 mins", complexity: "Medium", ingredientStatus: "All at home", tag: "Protein Rich" },
        { dayOfWeek: "WED 27", mealType: "Snack", title: "Chai & Fish Pakora", description: "Evening ginger tea served with crispy gram flour river fish fry.", cookTime: "15 mins", complexity: "Easy", ingredientStatus: "All at home", tag: "Classic Feast" },
        { dayOfWeek: "WED 27", mealType: "Dinner", title: "Butter Chicken & Butter Paratha", description: "Tender tandoori chicken cooked in rich sweet creamy tomato gravy.", cookTime: "30 mins", complexity: "Medium", ingredientStatus: "All at home", tag: "Family Favorite" }
      ];
    } else if (isJain) {
      return [
        { dayOfWeek: "WED 27", mealType: "Breakfast", title: "Jain Paneer Paratha", description: "Whole wheat flatbread stuffed with spiced grated paneer cooked with no root spices.", cookTime: "15 mins", complexity: "Medium", ingredientStatus: "All at home", tag: "Jain Special" },
        { dayOfWeek: "WED 27", mealType: "Lunch", title: "Comforting Kadhi Khichdi", description: "Warm soft khichdi served with spiced seasoned buttermilk kadhi (no garlic).", cookTime: "20 mins", complexity: "Easy", ingredientStatus: "All at home", tag: "Digestible & Light" },
        { dayOfWeek: "WED 27", mealType: "Snack", title: "Chai & Roasted Moong Dal", description: "Hot tea served with crunchy roasted salted yellow lentils.", cookTime: "10 mins", complexity: "Easy", ingredientStatus: "All at home", tag: "Comfort Tea" },
        { dayOfWeek: "WED 27", mealType: "Dinner", title: "Shahi Paneer & Phulka", description: "Spiced cashew-tomato gravy paneer prepared without onion or root vegetables.", cookTime: "25 mins", complexity: "Medium", ingredientStatus: "All at home", tag: "Jain Classic" }
      ];
    } else {
      return [
        { dayOfWeek: "WED 27", mealType: "Breakfast", title: "Paneer Paratha & Curd", description: "Stuffed whole wheat flatbread served with light yogurt.", cookTime: "15 mins", complexity: "Medium", ingredientStatus: "All at home", tag: "High Protein" },
        { dayOfWeek: "WED 27", mealType: "Lunch", title: "Comforting Rajma Chawal", description: "Slow-cooked kidney beans in spiced tomato gravy with long basmati rice.", cookTime: "25 mins", complexity: "Easy", ingredientStatus: "All at home", tag: "Classic Feast" },
        { dayOfWeek: "WED 27", mealType: "Snack", title: "Chai & Sabudana Vada", description: "Hot ginger tea with crispy sago pearls, highly digestible.", cookTime: "10 mins", complexity: "Easy", ingredientStatus: "All at home", tag: "Light Comfort" },
        { dayOfWeek: "WED 27", mealType: "Dinner", title: "Yellow Dal & Jeera Roti", description: "Comforting yellow pigeon-pea soup tempered with ghee & cumin seeds, perfectly digestible.", cookTime: "20 mins", complexity: "Easy", ingredientStatus: "All at home", tag: "Elderly Friendly" }
      ];
    }
  }
};

const executeMasterchefSynthesis = async (answers) => {
  setIsTyping(true);
  const timeId = Date.now();

  // Dynamic day label for synthesis
  const todayDayLabel = getCurrentWeekDays()[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1] || 'WED 28';

  const archetype = householdProfile.archetype || 'STANDARD';
  let archetypeContext = '';
  if (archetype === 'EUROPEAN_VC_WIFE') {
    archetypeContext = `
CLINICAL-DIETARY ARCHETYPE: European VC's Wife (Bio-Hacker)
- Plating & Style: Zen plating, minimalist description, clean.
- Ingredients rules: strictly low glycemic, incorporate superfoods/adaptogens where possible (e.g. chia seeds, ashwagandha, matcha, turmeric, moringa), use extra virgin olive/coconut oils, absolute zero processed sugar.
`;
  } else if (archetype === 'SHARK_TANK_JUDGE') {
    archetypeContext = `
CLINICAL-DIETARY ARCHETYPE: Shark Tank Judge (Cognitive Hustler)
- Plating & Style: High-impact dramatic plating, bold flavor markers, high-protein.
- Ingredients rules: use ragi, quinoa, sattu, Brahmi ghee, active seeds, Guntur chilies, performance fuel ingredients.
`;
  }

  const cloudKitchenInstruction = `
You are Homechef AI, a practical Indian home cooking planner for the ${householdProfile.familyName} family.
${archetypeContext}

STRICT RULES:
- Diet: ${householdProfile.dietaryPreference}. ${householdProfile.dietaryPreference === 'Non-Vegetarian' ? 'All main meals MUST include fish, chicken, mutton, or egg. Do NOT suggest paneer or pure veg dishes as main course.' : householdProfile.dietaryPreference === 'Vegetarian' ? 'NEVER include any meat, fish, or egg.' : householdProfile.dietaryPreference === 'Vegan' ? 'NEVER include any animal products, milk, curd, paneer, honey, egg, ghee, butter, or meat.' : 'NEVER include meat, fish, egg, onion, garlic, or root vegetables.'}
- Palate: ${householdProfile.regionalPalate}
- Mood: ${answers.mood}
- Available stock: ${answers.ingredients}
- Time limit: ${answers.time}
- Health notes: ${answers.health}

Design the menu for ${todayDayLabel} with exactly 4 meals: Breakfast, Lunch, Snack, Dinner.

RESPONSE RULES:
1. chatText must be 2-3 clean sentences in warm Hinglish. NO emojis, NO markdown, NO special characters.
2. Every meal must match the diet type strictly.
3. Provide one highlighted recipe with full ingredients and steps.

Return ONLY valid JSON:
{
  "chatText": "Clean 2-3 sentence summary of the menu plan",
  "hasRecipe": true,
  "recipeTitle": "Highlighted dish name",
  "recipeTime": "e.g. 25 MINS",
  "recipeTag": "e.g. BENGALI NON-VEG",
  "recipeIngredients": ["Ingredient with quantity"],
  "recipeSteps": ["Step without numbering"],
  "meals": [
    {"dayOfWeek": "${todayDayLabel}", "mealType": "Breakfast", "title": "name", "description": "desc", "cookTime": "15 mins", "complexity": "Easy", "ingredientStatus": "All at home", "tag": "tag"},
    {"dayOfWeek": "${todayDayLabel}", "mealType": "Lunch", "title": "name", "description": "desc", "cookTime": "25 mins", "complexity": "Medium", "ingredientStatus": "All at home", "tag": "tag"},
    {"dayOfWeek": "${todayDayLabel}", "mealType": "Snack", "title": "name", "description": "desc", "cookTime": "10 mins", "complexity": "Easy", "ingredientStatus": "All at home", "tag": "tag"},
    {"dayOfWeek": "${todayDayLabel}", "mealType": "Dinner", "title": "name", "description": "desc", "cookTime": "30 mins", "complexity": "Medium", "ingredientStatus": "All at home", "tag": "tag"}
  ]
}
  `;

  const runLocalSim = () => {
    const isNV = householdProfile.dietaryPreference === 'Non-Vegetarian';
    const isJain = householdProfile.dietaryPreference === 'Jain';
    const regionalStyle = householdProfile.regionalPalate;

    let chatText = '';
    let recipeTitle = '';
    let recipeTime = '';
    let recipeTag = '';
    let meals = [];

    if (regionalStyle === 'West Bengal') {
      if (isNV) {
        chatText = `Namaste ${householdProfile.familyName} Ji! I have designed Wednesday's zero-waste menu using your fish stock! Let's cook puffed Luchi & Alur Dom for breakfast and authentic Bengali Fish Salna for lunch. Grandpa's portions are kept diabetic friendly!`;
        recipeTitle = 'Bengali Shorshe Maach';
        recipeTime = '25 MINS';
        recipeTag = 'MASTERCHEF FUSION';
      } else if (isJain) {
        chatText = `Namaste ${householdProfile.familyName} Ji! We have created Wednesday's zero-waste menu using your Jain preferences! Let's cook delicious Radhaballabhi for breakfast and rich Posto Paneer for lunch.`;
        recipeTitle = 'Jain Posto Paneer';
        recipeTime = '20 MINS';
        recipeTag = 'JAIN SPECIAL';
      } else {
        chatText = `Namaste ${householdProfile.familyName} Ji! Today lunch is comforting Aloo Posto with poppy-seeds and light yellow dal, kept completely low-spices per your health checklist!`;
        recipeTitle = 'Bengali Aloo Posto';
        recipeTime = '20 MINS';
        recipeTag = 'HEALTHY VEG';
      }
    } else { 
      chatText = `Namaste! We've planned a high-protein Paneer Paratha for breakfast and slow-cooked Yellow Dal Tadka with Jeera Rice for lunch, complying with all health protocols!`;
      recipeTitle = 'Amritsari Rajma Chawal';
      recipeTime = '30 MINS';
      recipeTag = 'PUNJABI FUSION';
    }

    meals = getLocalFallbackMeals(householdProfile.dietaryPreference, householdProfile.regionalPalate);

    setIsTyping(false);
    setIsInterviewActive(false);
    setInterviewStep(0);

    setChatMessages(prev => [...prev, {
      id: timeId,
      sender: 'AI',
      messageText: chatText,
      hasRecipe: true,
      recipeTitle,
      recipeTime: recipeTime || "25 MINS",
      recipeTag: recipeTag || "CHEF SPECIAL",
      recipeIngredients: [],
      recipeSteps: []
    }]);
    
    updateMealsState(meals);
  };

  // We run a robust connection to Puter.js Serverless AI, cascading to Local Offline Sim if it fails
  let success = false;
  let parsed = null;

  const isNative = IS_NATIVE;

  if (navigator.onLine && !isNative) {
    try {
      const rawText = await callPuterAI(cloudKitchenInstruction);
      const cleanText = extractJson(rawText);
      parsed = JSON.parse(cleanText);
      success = true;
    } catch (e) {
      console.warn("Puter AI menu synthesis failed, running Local Offline Simulator", e);
    }
  }

  // --- Final Success Handler or Quaternary Offline Local Fallback ---
  if (success && parsed) {
    setIsTyping(false);
    setIsInterviewActive(false);
    setInterviewStep(0);
    
    setChatMessages(prev => [...prev, {
      id: timeId,
      sender: 'AI',
      messageText: sanitizeAIText(parsed.chatText) || 'Your customized menu is ready!',
      hasRecipe: parsed.hasRecipe !== undefined ? parsed.hasRecipe : true,
      recipeTitle: parsed.recipeTitle || 'AI Chef Recommendation',
      recipeTime: parsed.recipeTime || '25 MINS',
      recipeTag: parsed.recipeTag || 'CHEF SPECIAL',
      recipeIngredients: parsed.recipeIngredients || [],
      recipeSteps: (parsed.recipeSteps || []).map(s => sanitizeAIText(s))
    }]);
    
    if (parsed.meals && parsed.meals.length > 0) {
      updateMealsState(parsed.meals);
    } else {
      runLocalSim();
    }
  } else {
    runLocalSim();
  }
};

  const addFamilyMember = (name, ageGroup, restrictions, favDish) => {
    setFamilyMembers(prev => [
      ...prev,
      { id: Date.now(), name, ageGroup, restrictions, favDish }
    ]);
  };

  const deleteFamilyMember = (id) => {
    setFamilyMembers(prev => prev.filter(m => m.id !== id));
  };

  const addInventoryItem = (name, category, quantity, expiryText, critical) => {
    setInventoryItems(prev => [
      ...prev,
      { id: Date.now(), name, category, quantity, expiryText, critical }
    ]);
  };

  const removeInventoryItem = (id) => {
    setInventoryItems(prev => prev.filter(item => item.id !== id));
  };

  const updateInventoryItem = (id, name, category, quantity, expiryText, critical) => {
    setInventoryItems(prev => prev.map(item =>
      item.id === id
        ? { ...item, name, category, quantity, expiryText, critical }
        : item
    ));
  };

  const clearWeeklyPlan = () => {
    setMealPlan([]);
  };

  const addMealToWeeklyPlan = (meal) => {
    setMealPlan(prev => {
      const filtered = prev.filter(m => !(m.dayOfWeek.toUpperCase() === meal.dayOfWeek.toUpperCase() && m.mealType === meal.mealType));
      const newMeal = {
        id: Date.now(),
        dayOfWeek: meal.dayOfWeek.toUpperCase(),
        mealType: meal.mealType,
        title: meal.title,
        description: meal.description,
        cookTime: meal.cookTime || meal.time || '20m',
        complexity: meal.complexity || 'Easy',
        ingredientStatus: 'All at home',
        tag: meal.tag || 'Chef Special'
      };
      return [...filtered, newMeal];
    });
  };

  const toggleGlobalRestriction = (restriction) => {
    if (restriction === 'Vegetarian' || restriction === 'Non-Vegetarian' || restriction === 'Jain' || restriction === 'Vegan') {
      if (householdProfile.regionalPalate === 'Gujarat' && restriction === 'Non-Vegetarian') {
        alert("🥦 Gujarati regional palate is strictly Vegetarian, Jain, or Vegan. Non-Vegetarian cannot be selected.");
        return;
      }
      setHouseholdProfile(prev => {
        const newProfile = { ...prev, dietaryPreference: restriction };
        // Immediately regenerate weekly plan with new diet
        const freshlySeededMeals = generateInitialMeals(restriction, prev.regionalPalate);
        setMealPlan(freshlySeededMeals);
        return newProfile;
      });
    }

    setGlobalRestrictions(prev => 
      prev.includes(restriction)
        ? prev.filter(r => r !== restriction)
        : [...prev, restriction]
    );
  };

  const clearChatLog = () => {
    setIsInterviewActive(false);
    setInterviewStep(0);
    setChatMessages([
      { id: 1, sender: 'AI', messageText: `Namaste ${householdProfile.familyName} Family! Main aapka Masterchef AI Chef hoon (with 10,000 brains running). Aaj kya banaye?` }
    ]);
  };
  const swapMealItem = (id) => {
    const diet = householdProfile.dietaryPreference;
    
    // Alt base pool
    const alternatesPool = [
      { title: 'Moong Dal Chilla & Chutney', desc: 'Savoury, protein-packed lentil pancakes served with sour tamarind chutney.', time: '15m', complexity: 'Easy', ingredientStatus: 'All at home', tag: 'Healthy Breakfast', isVeg: true, isJain: true, isVegan: true, isNV: true },
      { title: 'Aloo Palak & Jeera Rice', desc: 'Hearty homestyle potatoes cooked in pureed baby spinach gravy, served with cumin tempered rice.', time: '25m', complexity: 'Easy', ingredientStatus: 'All at home', tag: 'Fresh Harvest', isVeg: true, isJain: false, isVegan: true, isNV: true },
      { title: 'Masala Oats Khichdi', desc: 'Very light porridge loaded with chopped carrots & green peas.', time: '12m', complexity: 'Easy', ingredientStatus: 'All at home', tag: 'Diabetic Friendly', isVeg: true, isJain: true, isVegan: true, isNV: true },
      { title: 'Jain Sabudana Khichdi', desc: 'Spiced tapioca pearls stir-fried with green peas and peanuts (no potato).', time: '15m', complexity: 'Easy', ingredientStatus: 'All at home', tag: 'Jain Special', isVeg: true, isJain: true, isVegan: true, isNV: true },
      { title: 'Tofu Bhurji & Multigrain Toast', desc: 'Scrambled spiced tofu with bell peppers and toasted multigrain bread.', time: '15m', complexity: 'Easy', ingredientStatus: 'All at home', tag: 'Vegan Protein', isVeg: true, isJain: true, isVegan: true, isNV: true },
      { title: 'Chicken Tikka Salad', desc: 'Pan-seared spiced chicken breast cubes tossed with fresh lettuce, cucumber, and lemon dressing.', time: '20m', complexity: 'Easy', ingredientStatus: 'Need 1 item', tag: 'Keto Friendly', isVeg: false, isJain: false, isVegan: false, isNV: true },
      { title: 'Egg Bhurji Pav', desc: 'Spiced scrambled eggs cooked with green chilies and served with buttered pav.', time: '15m', complexity: 'Easy', ingredientStatus: 'All at home', tag: 'Quick Breakfast', isVeg: false, isJain: false, isVegan: false, isNV: true },
      { title: 'Paneer Bhurji & Phulka', desc: 'Scrambled cottage cheese cooked with mild spices, served with warm phulka.', time: '20m', complexity: 'Easy', ingredientStatus: 'All at home', tag: 'High Protein', isVeg: true, isJain: false, isVegan: false, isNV: true },
      { title: 'Jain Paneer Tikka & Phulka', desc: 'Grilled paneer cubes in tomato cashew sauce (no onion, garlic, or roots).', time: '25m', complexity: 'Medium', ingredientStatus: 'All at home', tag: 'Jain Feast', isVeg: true, isJain: true, isVegan: false, isNV: true }
    ];

    // Filter according to diet
    const filteredAlternates = alternatesPool.filter(alt => {
      if (diet === 'Jain') return alt.isJain;
      if (diet === 'Vegan') return alt.isVegan;
      if (diet === 'Vegetarian') return alt.isVeg;
      return alt.isNV; // Non-Vegetarian can eat anything
    });

    setMealPlan(prev => prev.map(meal => {
      if (meal.id === id) {
        const index = Math.floor(Math.random() * filteredAlternates.length);
        const alt = filteredAlternates[index] || alternatesPool[0]; // fallback
        return {
          ...meal,
          title: alt.title,
          description: alt.desc,
          cookTime: alt.time,
          complexity: alt.complexity,
          ingredientStatus: alt.ingredientStatus,
          tag: alt.tag
        };
      }
      return meal;
    }));
  };

  const handleSelectThaliDish = (dishTitle) => {
    setActiveTab('chat');
    handleUserMessage(`I want to cook ${dishTitle}. Please show me the step-by-step recipe.`);
  };

  const updateArchetype = (newArchetype) => {
    setHouseholdProfile(prev => ({
      ...prev,
      archetype: newArchetype
    }));
  };

  // --- Router ---
  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return (
          <Splash 
            onNext={() => setCurrentScreen('onboarding')} 
            onReset={() => {
              localStorage.clear();
              window.location.reload();
            }}
          />
        );
      case 'onboarding':
        return (
          <Onboarding 
            onNext={() => setCurrentScreen('wizard')} 
            onSkip={() => {
              setCurrentScreen('mainApp');
              setActiveTab('home');
            }} 
          />
        );
      case 'wizard':
        return (
          <SetupWizard 
            profile={householdProfile} 
            onComplete={saveWizardPreferences} 
            onBack={() => setCurrentScreen('onboarding')}
          />
        );
      case 'mainApp':
      default:
        return (
          <div className="app-container">
            {/* Top Branding Banner */}
            <div className="no-print" style={{
              padding: '16px 20px 8px',
              backgroundColor: 'var(--bg-glass)',
              backdropFilter: 'blur(12px)',
              borderBottom: '1px solid var(--border-sand)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              zIndex: 90
            }}>
              <div>
                <h1 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--primary-saffron)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  Homechef AI
                </h1>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 800, letterSpacing: '0.5px' }}>
                  {householdProfile.familyName.toUpperCase()}'S RASOI
                </p>
              </div>
              
              <div style={{
                fontSize: '11px',
                padding: '4px 12px',
                backgroundColor: 'var(--secondary-light)',
                borderRadius: 'var(--radius-full)',
                fontWeight: 700,
                color: 'var(--primary-saffron)',
                border: '1px solid var(--border-sand)'
              }}>
                {householdProfile.dietaryPreference}
              </div>
            </div>

            {/* Welcome Tutorial Modal */}
            {isWelcomeModalOpen && (
              <WelcomeModal 
                familyName={householdProfile.familyName} 
                onClose={() => setIsWelcomeModalOpen(false)} 
              />
            )}

            {/* Active Tab Screen */}
            <div className="screen-scrollable">
              {activeTab === 'home' && (
                <HomeDashboard 
                  profile={householdProfile} 
                  familyMembers={familyMembers}
                  mealPlan={mealPlan}
                  onSwapMeal={swapMealItem}
                  menuLocked={menuLockState}
                  menuRejected={menuRejectedState}
                  onAcceptMenu={handleMenuAccept}
                  onRejectMenu={handleMenuReject}
                  onSwitchTab={setActiveTab}
                  onOpenThaliMap={() => setIsThaliMapOpen(true)}
                />
              )}
              {activeTab === 'inventory' && (
                <InventoryManager 
                  items={inventoryItems} 
                  onAddItem={addInventoryItem} 
                  onRemoveItem={removeInventoryItem}
                  onUpdateItem={updateInventoryItem}
                />
              )}
              {activeTab === 'chat' && (
                <AIChatPlanner 
                  messages={chatMessages} 
                  onSendMessage={handleUserMessage}
                  onClearChat={clearChatLog}
                  profile={householdProfile}
                  members={familyMembers}
                  inventory={inventoryItems}
                  isTyping={isTyping}
                  
                  // Guided Interview States
                  isInterviewActive={isInterviewActive}
                  setIsInterviewActive={setIsInterviewActive}
                  interviewStep={interviewStep}
                  setInterviewStep={setInterviewStep}
                  interviewAnswers={interviewAnswers}
                  setInterviewAnswers={setInterviewAnswers}
                />
              )}
              {activeTab === 'weekly' && (
                <WeeklyPlanner 
                  mealPlan={mealPlan} 
                  onSwapMeal={swapMealItem}
                  profile={householdProfile}
                  onClearPlan={clearWeeklyPlan}
                  onAddMeal={addMealToWeeklyPlan}
                />
              )}
              {activeTab === 'settings' && (
                <SettingsPanel 
                  profile={householdProfile}
                  members={familyMembers}
                  restrictions={globalRestrictions}
                  onAddMember={addFamilyMember}
                  onDeleteMember={deleteFamilyMember}
                  onToggleRestriction={toggleGlobalRestriction}
                  onResetWizard={() => setCurrentScreen('wizard')}
                  onHardReset={() => {
                    localStorage.clear();
                    window.location.reload();
                  }}
                  onUpdateArchetype={updateArchetype}
                />
              )}
            </div>

            {/* Indian Thali Map Modal */}
            {isThaliMapOpen && (
              <IndianThaliMap 
                onClose={() => setIsThaliMapOpen(false)} 
                onSelectRecipe={handleSelectThaliDish} 
              />
            )}

            {/* Navigation Bar */}
            <div className="bottom-nav no-print">
              <button 
                type="button"
                onClick={() => setActiveTab('settings')} 
                className={`nav-tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
              >
                <Users size={22} />
                <span>Ghar</span>
              </button>
              <button 
                type="button"
                onClick={() => setActiveTab('home')} 
                className={`nav-tab-btn ${activeTab === 'home' ? 'active' : ''}`}
              >
                <Home size={22} />
                <span>Rasoi</span>
              </button>
              <button 
                type="button"
                onClick={() => setActiveTab('inventory')} 
                className={`nav-tab-btn ${activeTab === 'inventory' ? 'active' : ''}`}
              >
                <ClipboardList size={22} />
                <span>Samaan</span>
              </button>
              <button 
                type="button"
                onClick={() => setActiveTab('chat')} 
                className={`nav-tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
              >
                <MessageSquare size={22} />
                <span>Chat</span>
              </button>
              <button 
                type="button"
                onClick={() => setActiveTab('weekly')} 
                className={`nav-tab-btn ${activeTab === 'weekly' ? 'active' : ''}`}
              >
                <Calendar size={22} />
                <span>Hafta</span>
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div style={{
      minHeight: '100dvh',
      backgroundColor: '#E8DDD4',
      display: 'flex',
      alignItems: 'stretch',
      justifyContent: 'center'
    }}>
      <div className="fade-in-slide" style={{ width: '100%', maxWidth: '500px', position: 'relative' }}>
        {renderScreen()}
        <TOSDisclaimerModal 
          isOpen={!hasAcceptedTOS} 
          onAccept={() => setHasAcceptedTOS(true)} 
        />
      </div>
    </div>
  );
}
