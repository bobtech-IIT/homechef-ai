import React, { useState, useEffect, useRef } from 'react';
import { ChefHat, Sparkles, Check, ChevronUp, ChevronDown, Trash2, RotateCcw, Search, Info, Plus, FileText, CheckCircle, BookOpen } from 'lucide-react';
import { getMergedKnowledgeBase, appendCustomRecipe } from '../data/CulinaryKnowledgeBase';
import { searchMegaIndex, MEGA_LSI_DICTIONARY } from '../data/RecipeIndex';

// --- Helper: Get current week's day labels starting from Monday ---
const getCurrentWeekDays = () => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0=Sun,1=Mon,...
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
  return result;
};

// --- Typo-Resilient Levenshtein Distance Algorithm ---
function getLevenshteinDistance(s1, s2) {
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
}

// --- Multilingual LSI Phonetic & Alias Mapping Dictionary (Mega - All Indian Languages) ---
// Using MEGA_LSI_DICTIONARY from RecipeIndex.js for comprehensive multilingual support
const LSI_DICTIONARY = MEGA_LSI_DICTIONARY;

// --- Binary Decision Tree Questions Map ---
const BINARY_TREE_QUESTIONS = {
  'DIET': {
    English: "Is this a Non-Vegetarian meal?",
    Bengali: "Eti ki aamish (Non-Veg) ranna?",
    Hindi: "Kya yeh Non-Vegetarian (maasahari) khana hai?",
    Hinglish: "Kya yeh Non-Veg meal banana hai?",
    Oriya: "Eha kana Non-Veg (amisha) khana achhi?",
    options: [
      { key: 'Yes', English: "Yes, Non-Veg 🍗", Bengali: "Hyan, Aamish 🍗", Hindi: "Haan, Non-Veg 🍗", Hinglish: "Haan, Non-Veg 🍗", Oriya: "Hna, Amisha 🍗" },
      { key: 'No', English: "No, Veg 🍃", Bengali: "Na, Niramish 🍃", Hindi: "Nahi, Shakahari 🍃", Hinglish: "Nahi, Pure Veg 🍃", Oriya: "Na, Niramisha 🍃" }
    ]
  },
  'DIET_NV_SUB': {
    English: "Do you want Seafood or Egg?",
    Bengali: "Aponi ki maach ba dim pochondo korben?",
    Hindi: "Kya aap machhli ya anda chahte hain?",
    Hinglish: "Kya aapko fish ya egg khana hai?",
    Oriya: "Apana kana machha ki dimba pasand karibe?",
    options: [
      { key: 'Yes', English: "Yes, Fish/Egg 🐟", Bengali: "Hyan, Maach/Dim 🐟", Hindi: "Haan, Machhli/Anda 🐟", Hinglish: "Haan, Fish/Egg 🐟", Oriya: "Hna, Machha/Dimba 🐟" },
      { key: 'No', English: "No, Chicken/Mutton 🍗", Bengali: "Na, Chicken/Mutton 🍗", Hindi: "Nahi, Meat 🍗", Hinglish: "Nahi, Chicken/Mutton 🍗", Oriya: "Na, Mutton/Chicken 🍗" }
    ]
  },
  'DIET_V_SUB': {
    English: "Is this a Jain Special meal (no root vegetables, onion, or garlic)?",
    Bengali: "Eti ki Jain Special (bina peyaj-rosun aar mul ranna)?",
    Hindi: "Kya yeh Jain Special khana hai (bina pyaaz, lehsun aur jameen ke neeche ugane wali sabziyo ke)?",
    Hinglish: "Kya yeh Jain Special meal hai (no onion, garlic, or roots)?",
    Oriya: "Eha kana Jain Special (bina piaja-rasuna) ahar?",
    options: [
      { key: 'Yes', English: "Yes, Jain Special 📿", Bengali: "Hyan, Jain 📿", Hindi: "Haan, Jain Special 📿", Hinglish: "Haan, Jain style 📿", Oriya: "Hna, Jain Ahar 📿" },
      { key: 'No', English: "No, Regular Veg 🍃", Bengali: "Na, Sadharan Niramish 🍃", Hindi: "Nahi, Normal Veg 🍃", Hinglish: "Nahi, Regular Veg 🍃", Oriya: "Na, Normal Veg 🍃" }
    ]
  },
  'REG_EAST': {
    English: "Do you want East Indian style cuisine (Bengal or Odisha)?",
    Bengali: "Aponi ki purba bharatiyo ranna (West Bengal ba Odisha style) pochondo korben?",
    Hindi: "Kya aap East Indian style khana chahte hain (Bengal ya Odisha ka)?",
    Hinglish: "Kya aapko East Indian style (Bengal/Odisha) cuisine chahiye?",
    Oriya: "Apana kana East Indian (Bengal/Odisha) ranna pasand karibe?",
    options: [
      { key: 'Yes', English: "Yes, East Coast 🌾", Bengali: "Hyan, Purbi 🌾", Hindi: "Haan, East Indian 🌾", Hinglish: "Haan, East Coast 🌾", Oriya: "Hna, East Coast 🌾" },
      { key: 'No', English: "No, North/West 🍛", Bengali: "Na, Uttor/Poshchim 🍛", Hindi: "Nahi, North/West 🍛", Hinglish: "Nahi, North/West 🍛", Oriya: "Na, Uttara/Pashchima 🍛" }
    ]
  },
  'REG_EAST_SUB': {
    English: "Do you prefer West Bengal style?",
    Bengali: "Aponi ki West Bengal-er (Bangali) swad pochondo korben?",
    Hindi: "Kya aap West Bengal style pasand karte hain?",
    Hinglish: "Kya aapko West Bengal style khana banana hai?",
    Oriya: "Apana kana West Bengal style pasand karibe?",
    options: [
      { key: 'Yes', English: "Yes, West Bengal 🌾", Bengali: "Hyan, Bangali 🌾", Hindi: "Haan, West Bengal 🌾", Hinglish: "Haan, West Bengal 🌾", Oriya: "Hna, West Bengal 🌾" },
      { key: 'No', English: "No, Odisha Style 📿", Bengali: "Na, Odia style 📿", Hindi: "Nahi, Odisha style 📿", Hinglish: "Nahi, Odisha style 📿", Oriya: "Na, Odia style 📿" }
    ]
  },
  'REG_NW_SUB': {
    English: "Do you want North Indian style (Punjab or Delhi)?",
    Bengali: "Aponi ki uttar bharatiyo ranna (Punjab ba Delhi style) pochondo korben?",
    Hindi: "Kya aap North Indian style khana chahte hain (Punjab ya Delhi ka)?",
    Hinglish: "Kya aapko North Indian style (Punjab/Delhi) cuisine chahiye?",
    Oriya: "Apana kana North Indian style (Punjab/Delhi) pasand karibe?",
    options: [
      { key: 'Yes', English: "Yes, North India 🥛", Bengali: "Hyan, Uttor 🥛", Hindi: "Haan, North India 🥛", Hinglish: "Haan, North India 🥛", Oriya: "Hna, Uttara India 🥛" },
      { key: 'No', English: "No, Maharashtra 🥥", Bengali: "Na, Maharashtra 🥥", Hindi: "Nahi, Maharashtra 🥥", Hinglish: "Nahi, Maharashtra 🥥", Oriya: "Na, Maharashtra 🥥" }
    ]
  },
  'REG_N_SUB': {
    English: "Do you want Punjab style?",
    Bengali: "Aponi ki Punjab style-er ranna pochondo korben?",
    Hindi: "Kya aap Punjab style pasand karte hain?",
    Hinglish: "Kya aapko Punjab style khana chahiye?",
    Oriya: "Apana kana Punjab style pasand karibe?",
    options: [
      { key: 'Yes', English: "Yes, Punjab 🥛", Bengali: "Hyan, Punjab 🥛", Hindi: "Haan, Punjab style 🥛", Hinglish: "Haan, Punjab style 🥛", Oriya: "Hna, Punjab style 🥛" },
      { key: 'No', English: "No, Delhi Style 🍛", Bengali: "Na, Delhi style 🍛", Hindi: "Nahi, Delhi style 🍛", Hinglish: "Nahi, Delhi style 🍛", Oriya: "Na, Delhi style 🍛" }
    ]
  },
  'MOOD': {
    English: "Do you want a spicy, rich feast?",
    Bengali: "Eti ki jhal aar moshladar boro ranna hobe?",
    Hindi: "Kya aap masaledar aur rich khana chahte hain?",
    Hinglish: "Kya aapko spicy feast chahiye?",
    Oriya: "Apana kana spicy o rich khana pasand karibe?",
    options: [
      { key: 'Yes', English: "Yes, Spicy 🌶️", Bengali: "Hyan, Moshladar 🌶️", Hindi: "Haan, Masaledar 🌶️", Hinglish: "Haan, Spicy 🌶️", Oriya: "Hna, Spicy 🌶️" },
      { key: 'No', English: "No, Light 🥣", Bengali: "Na, Halka 🥣", Hindi: "Nahi, Comfort/Halka 🥣", Hinglish: "Nahi, Light/Comfort 🥣", Oriya: "Na, Halka/Comfort 🥣" }
    ]
  },
  'COURSE': {
    English: "Is this for a main meal (Lunch/Dinner)?",
    Bengali: "Eti ki mukhho ahar (Lunch/Dinner) er jonne?",
    Hindi: "Kya yeh main course meal (Lunch ya Dinner) ke liye hai?",
    Hinglish: "Kya yeh main course (Lunch/Dinner) ke liye hai?",
    Oriya: "Eha kana mukhya ahar (Lunch/Dinner) pain achhi?",
    options: [
      { key: 'Yes', English: "Yes, Lunch/Dinner 🍽️", Bengali: "Hyan, Main Ahar 🍽️", Hindi: "Haan, Lunch/Dinner 🍽️", Hinglish: "Haan, Lunch/Dinner 🍽️", Oriya: "Hna, Lunch/Dinner 🍽️" },
      { key: 'No', English: "No, Breakfast/Snack ☕", Bengali: "Na, Jolkhabar ☕", Hindi: "Nahi, Nashta ☕", Hinglish: "Nahi, Breakfast/Snack ☕", Oriya: "Na, Jolkhaba ☕" }
    ]
  }
};

export default function AIChatPlanner({
  messages,
  onSendMessage,
  onClearChat,
  profile,
  members,
  inventory,
  isTyping,
  
  // Guided Interview States
  isInterviewActive,
  setIsInterviewActive,
  interviewStep,
  setInterviewStep,
  interviewAnswers,
  setInterviewAnswers
}) {
  const [inputText, setInputText] = useState('');
  const [expandedRecipe, setExpandedRecipe] = useState(null);
  
  // Dedicated direct-match recipe (to avoid category mismatch when searching by name)
  const [directMatchRecipes, setDirectMatchRecipes] = useState(null);
  
  // Interactive Binary Decision Tree State
  const [treeState, setTreeState] = useState({
    step: 'DIET', // DIET, DIET_NV_SUB, DIET_V_SUB, REG_EAST, REG_EAST_SUB, REG_NW_SUB, REG_N_SUB, MOOD, COURSE, RESULTS
    choices: {}
  });

  // Uploader and Custom Appender State
  const [showUploader, setShowUploader] = useState(false);
  const [rawText, setRawText] = useState('');
  const [parsedPreview, setParsedPreview] = useState(null);
  const [uploadState, setUploadState] = useState('West Bengal');
  const [uploadDiet, setUploadDiet] = useState('Vegetarian');
  const [uploadMood, setUploadMood] = useState('Light Comfort 🥣');
  const [uploadCourse, setUploadCourse] = useState('Lunch/Dinner 🍽️');
  const [uploadStatusMsg, setUploadStatusMsg] = useState('');

  // Track loaded recipes to show success feedback inline
  const [loadedRecipeId, setLoadedRecipeId] = useState(null);
  const [loadingDaySelectorId, setLoadingDaySelectorId] = useState(null);

  // Active Multilingual selector state
  const [activeLang, setActiveLang] = useState(() => {
    const palate = profile.regionalPalate || 'West Bengal';
    if (palate === 'West Bengal') return 'Bengali';
    if (palate === 'Odisha') return 'Oriya';
    return 'Hinglish';
  });

  const messagesEndRef = useRef(null);

  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    // Bypassing Puter auth login screen for frictionless zero-cost startup pitch
    setShowLoginPrompt(false);
  }, []);

  const handlePuterLogin = () => {
    if (window.puter && window.puter.auth) {
      window.puter.auth.signIn()
        .then(() => {
          if (window.puter.auth.isSignedIn()) {
            setShowLoginPrompt(false);
          }
        })
        .catch(err => {
          console.warn("Puter auth failed, bypassing to let user in gracefully", err);
          setShowLoginPrompt(false);
        });
    } else {
      setShowLoginPrompt(false);
    }
  };

  // Auto-scroll chat to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, treeState.step]);

  const handleResetTree = () => {
    setTreeState({
      step: 'DIET',
      choices: {}
    });
    setExpandedRecipe(null);
    setLoadingDaySelectorId(null);
    setRawText('');
    setParsedPreview(null);
    setShowUploader(false);
    setDirectMatchRecipes(null); // Clear direct match on reset
  };

  const getFiltersFromChoices = (choices) => {
    let diet = 'Vegetarian';
    if (choices['DIET'] === 'Yes') {
      diet = 'Non-Vegetarian';
    } else if (choices['DIET_V_SUB'] === 'Yes') {
      diet = 'Jain Special';
    }

    let state = 'West Bengal';
    if (choices['REG_EAST'] === 'Yes') {
      if (choices['REG_EAST_SUB'] === 'Yes') {
        state = 'West Bengal';
      } else {
        state = 'Odisha';
      }
    } else {
      if (choices['REG_NW_SUB'] === 'Yes') {
        if (choices['REG_N_SUB'] === 'Yes') {
          state = 'Punjab';
        } else {
          state = 'Delhi';
        }
      } else {
        state = 'Maharashtra';
      }
    }

    const mood = (choices['MOOD'] === 'Yes') ? 'Spicy Feast 🌶️' : 'Light Comfort 🥣';
    const course = (choices['COURSE'] === 'Yes') ? 'Lunch/Dinner 🍽️' : 'Breakfast/Snacks ☕';

    return { state, diet, mood, course };
  };

  // Traverses the binary decision tree logic
  const handleBinaryChoice = (choiceKey, displayLabel) => {
    // Clear any direct search match so tree navigation shows category results correctly
    setDirectMatchRecipes(null);
    const currentStep = treeState.step;
    let nextStep = '';
    const updatedChoices = { ...treeState.choices, [currentStep]: choiceKey };

    if (currentStep === 'DIET') {
      nextStep = choiceKey === 'Yes' ? 'DIET_NV_SUB' : 'DIET_V_SUB';
    } else if (currentStep === 'DIET_NV_SUB' || currentStep === 'DIET_V_SUB') {
      nextStep = 'REG_EAST';
    } else if (currentStep === 'REG_EAST') {
      nextStep = choiceKey === 'Yes' ? 'REG_EAST_SUB' : 'REG_NW_SUB';
    } else if (currentStep === 'REG_EAST_SUB') {
      nextStep = 'MOOD';
    } else if (currentStep === 'REG_NW_SUB') {
      nextStep = choiceKey === 'Yes' ? 'REG_N_SUB' : 'MOOD';
    } else if (currentStep === 'REG_N_SUB') {
      nextStep = 'MOOD';
    } else if (currentStep === 'MOOD') {
      nextStep = 'COURSE';
    } else if (currentStep === 'COURSE') {
      nextStep = 'RESULTS';
    }

    setTreeState({
      step: nextStep,
      choices: updatedChoices
    });

    // Append user bubble locally
    onSendMessage(displayLabel, null, true);

    if (nextStep === 'RESULTS') {
      setTimeout(() => {
        const filters = getFiltersFromChoices(updatedChoices);
        const recipes = getMatchingRecipes(filters);
        let confirmedText = '';
        
        if (recipes.length > 0) {
          const first = recipes[0];
          confirmedText = first.chatResponse[activeLang] || first.chatResponse['English'] || `Curated special recipes for you!`;
        } else {
          confirmedText = `Based on your selected choices, I have found perfect matching recipes. Check out the culinary cards below to cook or load them directly into your Hafta plan!`;
        }
        
        onSendMessage(confirmedText, null, false, 'AI');
      }, 500);
    }
  };

  // Helper to fetch matching recipes from merged knowledge base
  const getMatchingRecipes = (filters) => {
    try {
      const mergedDb = getMergedKnowledgeBase();
      const s = filters.state;
      const d = filters.diet;
      const m = filters.mood;
      const c = filters.course;
      
      return mergedDb[s]?.[d]?.[m]?.[c] || [];
    } catch (e) {
      console.error("Error retrieving recipes from merged knowledge base", e);
      return [];
    }
  };

  // Raw custom recipe uploader parser
  const handleRawTextChange = (text) => {
    setRawText(text);
    if (!text.trim()) {
      setParsedPreview(null);
      return;
    }
    
    let title = 'Custom Recipe';
    const titleMatch = text.match(/(?:title|name|recipe)\s*:\s*(.+)/i);
    if (titleMatch) {
      title = titleMatch[1].trim();
    } else {
      const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      if (lines.length > 0) {
        title = lines[0].replace(/^(title|name|recipe)\s*:\s*/i, '').trim();
      }
    }
    
    let time = '25 MINS';
    const timeMatch = text.match(/(?:time|cook time|duration)\s*:\s*(.+)/i) || text.match(/(\d+\s*(?:min|mins|minute|minutes|hour|hours))/i);
    if (timeMatch) {
      time = timeMatch[1].toUpperCase().trim();
    }

    let ingredients = [];
    const ingSectionMatch = text.match(/(?:ingredients|pantry|items|samaan)\s*:?\s*\n([\s\S]*?)(?:\n\s*\n|\n\s*(?:steps|instructions|direction|prep|cook|method|$))/i);
    if (ingSectionMatch) {
      ingredients = ingSectionMatch[1].split('\n')
        .map(l => l.replace(/^[-*•\d.\s]+/, '').trim())
        .filter(l => l.length > 0);
    } else {
      ingredients = text.split('\n')
        .filter(l => l.trim().startsWith('-') || l.trim().startsWith('*'))
        .map(l => l.replace(/^[-*\s]+/, '').trim())
        .filter(l => l.length > 0);
    }
    if (ingredients.length === 0) {
      ingredients = ["Custom Ingredients Needed"];
    }

    let steps = [];
    const stepsSectionMatch = text.match(/(?:steps|instructions|prep|cooking steps|method|directions)\s*:?\s*\n([\s\S]*)/i);
    if (stepsSectionMatch) {
      steps = stepsSectionMatch[1].split('\n')
        .map(l => l.replace(/^[-*•\d.\s]+/, '').trim())
        .filter(l => l.length > 0);
    } else {
      steps = text.split('\n')
        .map(l => l.trim())
        .filter(l => l.length > 15 && !l.startsWith('-') && !l.startsWith('*'))
        .filter(l => !l.toLowerCase().includes('ingredients:'));
    }
    if (steps.length === 0) {
      steps = ["1. Cook properly and serve hot."];
    }

    setParsedPreview({
      title,
      time,
      complexity: 'MEDIUM',
      tag: 'CUSTOM RECIPE',
      ingredients,
      steps,
      chatResponse: {
        "English": `Here is your customized ${title}! Cooked to perfection just the way you like.`,
        "Bengali": `Aponar jonne swadisht ${title} ready! Gorom gorom khele khub bhalo lagbe.`,
        "Hindi": `Aapka apna custom ${title} taiyar hai! Apne swad ke anusar ise garam parosein.`,
        "Hinglish": `Aapka customized ${title} ready hai! Ise recipe steps ke according fully cook karein.`,
        "Oriya": `Tasty ${title} ready karichi! Garam garam khub bhala lagiba.`
      }
    });
  };

  const handleConfirmUpload = () => {
    if (!parsedPreview) return;
    const success = appendCustomRecipe(uploadState, uploadDiet, uploadMood, uploadCourse, parsedPreview);
    if (success) {
      setUploadStatusMsg("✓ Appended to offline database successfully!");
      setTimeout(() => {
        setUploadStatusMsg('');
        setShowUploader(false);
        setRawText('');
        setParsedPreview(null);
        // Force jump tree to results of this added custom recipe
        setTreeState({
          step: 'RESULTS',
          choices: {
            'DIET': uploadDiet === 'Non-Vegetarian' ? 'Yes' : 'No',
            'DIET_V_SUB': uploadDiet === 'Jain Special' ? 'Yes' : 'No',
            'REG_EAST': (uploadState === 'West Bengal' || uploadState === 'Odisha') ? 'Yes' : 'No',
            'REG_EAST_SUB': uploadState === 'West Bengal' ? 'Yes' : 'No',
            'REG_NW_SUB': (uploadState === 'Punjab' || uploadState === 'Delhi') ? 'Yes' : 'No',
            'REG_N_SUB': uploadState === 'Punjab' ? 'Yes' : 'No',
            'MOOD': uploadMood.includes('Spicy') ? 'Yes' : 'No',
            'COURSE': uploadCourse.includes('Lunch') ? 'Yes' : 'No'
          }
        });
        onSendMessage(`Append custom recipe: "${parsedPreview.title}"`, null, true);
        setTimeout(() => {
          onSendMessage(`Adbhut! Appended your custom recipe "${parsedPreview.title}" successfully into our offline database! Check out your newly active card below:`, null, false, 'AI');
        }, 300);
      }, 1500);
    }
  };

  // --- Typo-Resilient & Phonetic Broken Language Search Resolver ---
  // KEY FIX: Calls onSendMessage(text, null, FALSE) to trigger real API waterfall in App.jsx
  // Offline search only sets recipe CARDS (directMatchRecipes), not the chat text
  const handleSearchSubmit = () => {
    const rawQuery = inputText.trim().toLowerCase();
    if (!rawQuery) return;

    const originalInput = inputText;
    setInputText('');

    if (isInterviewActive) {
      onSendMessage(originalInput, null, false);
      return;
    }

    // STOPWORDS: common Bengali/Hindi non-food conversational words to ignore
    const stopwords = new Set([
      'ranna','sekhao','banao','banana','batao','bolo','karo','debo','dite',
      'recipe','recipie','recepie','details','dikhao','sikhao','chahiye',
      'please','ok','okay','aaj','kal','aage','kya','hai','hain','de',
      'ki','kemon','kemiti','kaise','how','make','cook','prepare',
      'the','a','an','is','are','in','on','at','by','for','with','to',
      'and','or','not','liking','like','want','tell','me','give','show'
    ]);

    // Filter tokens: remove stopwords, short words
    const queryTokens = rawQuery.split(/[\s,._-]+/)
      .filter(t => t.length > 1 && !stopwords.has(t));

    // Clear old direct match immediately (prevents stale card showing)
    setDirectMatchRecipes(null);

    // Step 1: Trigger FULL API call through App.jsx (adds user bubble + runs Gemini→Groq→OpenRouter)
    // This is the live AI call - the chat response text comes from here
    onSendMessage(originalInput, null, false);

    // Step 2: Run offline search in parallel for RECIPE CARDS ONLY (not chat text)
    if (queryTokens.length === 0) return;

    // getMergedKnowledgeBase is already imported at the top of this file
    const mergedDb = getMergedKnowledgeBase();
    let scoredRecipes = [];

    Object.entries(mergedDb).forEach(([stateName, diets]) => {
      Object.entries(diets).forEach(([dietName, moods]) => {
        Object.entries(moods).forEach(([moodName, courses]) => {
          Object.entries(courses).forEach(([courseName, recipeList]) => {
            recipeList.forEach(recipe => {
              // Check Jain/Vegan restrictions
              if (profile.dietaryPreference === 'Jain') {
                const jainForbidden = ['aloo', 'potato', 'onion', 'pyaaz', 'garlic', 'lehsun', 'ginger', 'adrak', 'eggplant', 'begun', 'baingan'];
                const titleLower = recipe.title.toLowerCase();
                const hasForbidden = recipe.ingredients?.some(ing => 
                  jainForbidden.some(forbidden => ing.toLowerCase().includes(forbidden))
                ) || jainForbidden.some(forbidden => titleLower.includes(forbidden));
                if (hasForbidden) return;
              }
              if (profile.dietaryPreference === 'Vegan') {
                const veganForbidden = ['paneer', 'cheese', 'butter', 'ghee', 'cream', 'curd', 'milk', 'yogurt', 'dahi', 'honey', 'egg', 'chicken', 'mutton', 'fish', 'beef', 'meat'];
                const titleLower = recipe.title.toLowerCase();
                const hasForbidden = recipe.ingredients?.some(ing => 
                  veganForbidden.some(forbidden => ing.toLowerCase().includes(forbidden))
                ) || veganForbidden.some(forbidden => titleLower.includes(forbidden));
                if (hasForbidden) return;
              }

              let score = 0;
              const titleWords = recipe.title.toLowerCase().split(/[\s,._-]+/).filter(w => w.length > 0);

              queryTokens.forEach(token => {
                if (recipe.title.toLowerCase().includes(token)) score += 15;
                if (recipe.tag && recipe.tag.toLowerCase().includes(token)) score += 10;
                
                (recipe.ingredients || []).forEach(ing => {
                  if (ing.toLowerCase().includes(token)) score += 5;
                });

                titleWords.forEach(tWord => {
                  const dist = getLevenshteinDistance(token, tWord);
                  if (dist === 0) score += 15;
                  else if (dist === 1 && token.length >= 5) score += 10; // Strict: prevents loti→roti
                  else if (dist === 2 && token.length >= 6) score += 6;
                });

                Object.entries(LSI_DICTIONARY).forEach(([key, synonyms]) => {
                  const distToKey = getLevenshteinDistance(token, key);
                  if (distToKey === 0 || (distToKey === 1 && token.length >= 5)) {
                    synonyms.forEach(syn => {
                      if (recipe.title.toLowerCase().includes(syn)) score += 8;
                      (recipe.ingredients || []).forEach(ing => {
                        if (ing.toLowerCase().includes(syn)) score += 4;
                      });
                    });
                  }
                });
              });

              if (score >= 10) {
                scoredRecipes.push({ recipe, score });
              }
            });
          });
        });
      });
    });

    scoredRecipes.sort((a, b) => b.score - a.score);

    if (scoredRecipes.length > 0) {
      // Set ONLY the exact matched recipe card (fixes mismatch bug)
      setDirectMatchRecipes([scoredRecipes[0].recipe]);
      setTreeState({ step: 'RESULTS', choices: {} });
    } else {
      // TIER 2: Search Mega Recipe Index for a title hint card
      const megaResults = searchMegaIndex(rawQuery);
      if (megaResults.length > 0) {
        // Show mega index result as a minimal card
        const top = megaResults[0];
        const minimalCard = {
          title: top.title,
          time: top.time || '30 MINS',
          tag: top.state ? `${top.state.toUpperCase()} SPECIAL` : 'REGIONAL DISH',
          ingredients: top.ingredients || ['See full recipe below'],
          steps: ['Full step-by-step recipe is being fetched via AI. Use the binary tree choices below for an instant offline version!'],
          chatResponse: { English: `I found "${top.title}" — recipe card loaded.` }
        };
        setDirectMatchRecipes([minimalCard]);
        setTreeState({ step: 'RESULTS', choices: {} });
      }
      // If nothing found at all, leave directMatchRecipes null (no card — API chat handles it)
    }
  };


  // Loads recommended recipe into weekly calendar
  const handleLoadToPlan = (recipe, day) => {
    let mealType = 'Lunch';
    const filters = getFiltersFromChoices(treeState.choices);
    
    if (filters.course && filters.course.includes('Breakfast')) {
      mealType = 'Breakfast';
    } else if (recipe.title.toLowerCase().includes('chop') || recipe.title.toLowerCase().includes('muri') || recipe.title.toLowerCase().includes('chaat') || recipe.title.toLowerCase().includes('samosa')) {
      mealType = 'Snack';
    }

    const parsedRes = {
      chatText: `Loaded ${recipe.title} into your weekly plan under ${day} ${mealType}!`,
      hasRecipe: true,
      recipeTitle: recipe.title,
      recipeTime: recipe.time,
      recipeTag: recipe.tag,
      recipeIngredients: recipe.ingredients,
      recipeSteps: recipe.steps,
      meals: [
        {
          dayOfWeek: day,
          mealType: mealType,
          title: recipe.title,
          description: recipe.steps[0] || 'Delicious home cooked meal',
          cookTime: recipe.time,
          complexity: recipe.complexity,
          ingredientStatus: 'All at home',
          tag: recipe.tag
        }
      ]
    };

    onSendMessage(`Load ${recipe.title} into ${day} ${mealType}`, parsedRes, false);
    setLoadingDaySelectorId(null);
    setLoadedRecipeId(recipe.title);
    setTimeout(() => setLoadedRecipeId(null), 3000);
  };

  // Active recipes: prioritize direct search match over tree-category lookup (fixes mismatch bug)
  const activeRecipes = treeState.step === 'RESULTS' 
    ? (directMatchRecipes !== null ? directMatchRecipes : getMatchingRecipes(getFiltersFromChoices(treeState.choices)))
    : [];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 160px)',
      position: 'relative'
    }}>
      {showLoginPrompt ? (
        <div className="puter-login-gate" style={{ margin: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '90%' }}>
          <ChefHat size={48} style={{ color: 'var(--primary-saffron)', marginBottom: '16px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '8px', fontFamily: 'Outfit', color: 'var(--text-masala)' }}>
            Sign in to start chatting with Homechef AI
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px', padding: '0 10px' }}>
            Join Chakraborty Family's smart digital kitchen to cook zero-waste, track ingredients, and customize meal plans!
          </p>
          
          <button onClick={handlePuterLogin} className="google-login-btn">
            🔐 Sign in with Google
          </button>
          
          <div style={{ marginTop: '16px', borderTop: '1px solid var(--border-sand)', paddingTop: '16px', width: '100%' }}>
            <p className="subtext" style={{ fontSize: '10px', color: 'var(--text-light)', lineHeight: '14px', margin: 0, fontWeight: 700 }}>
              🔒 Secure Sign-in · Free Account · Powered by Secure Cloud AI
            </p>
            <p className="legal-note" style={{ fontSize: '9px', color: 'var(--text-light)', marginTop: '8px', lineHeight: '12px' }}>
              By signing in, you agree to our Google Play-compliant terms. Your data remains fully secure and encrypted.
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Flags, Reset & Document Uploader Bar */}
      <div className="no-print" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: '10px',
        borderBottom: '1px solid var(--border-sand)',
        gap: '8px',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button 
            onClick={handleResetTree}
            className="btn-secondary"
            style={{
              padding: '6px 12px',
              fontSize: '11px',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              borderColor: 'var(--border-sand)'
            }}
          >
            <RotateCcw size={12} />
            Reset Tree
          </button>

          <button 
            onClick={() => setShowUploader(!showUploader)}
            className="btn-primary"
            style={{
              padding: '6px 12px',
              fontSize: '11px',
              fontWeight: 800,
              width: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Plus size={12} />
            Append Recipes
          </button>
        </div>

        {/* Flag Language Selectors */}
        <div style={{ display: 'flex', gap: '4px' }}>
          {[
            { code: 'English', label: 'EN 🇬🇧' },
            { code: 'Bengali', label: 'BN 🇧🇩' },
            { code: 'Hindi', label: 'HN 🇮🇳' },
            { code: 'Hinglish', label: 'HNG 🗣️' },
            { code: 'Oriya', label: 'OR 📿' }
          ].map(lang => {
            const isAct = activeLang === lang.code;
            return (
              <button 
                key={lang.code}
                onClick={() => setActiveLang(lang.code)}
                style={{
                  fontSize: '10px',
                  fontWeight: 800,
                  padding: '4px 8px',
                  borderRadius: '4px',
                  border: 'none',
                  backgroundColor: isAct ? 'var(--primary-saffron)' : 'var(--pill-soft)',
                  color: isAct ? '#FFFFFF' : 'var(--text-masala)',
                  cursor: 'pointer',
                  transition: 'var(--transition-cozy)'
                }}
              >
                {lang.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Document Auto-Appender Form Panel */}
      {showUploader && (
        <div className="warm-card fade-in-slide" style={{
          padding: '16px',
          border: '2px dashed var(--primary-saffron)',
          margin: '10px 0',
          maxHeight: '380px',
          overflowY: 'auto'
        }}>
          <h5 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-masala)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <FileText size={16} style={{ color: 'var(--primary-saffron)' }} />
            📚 Document Auto-Appender (Fuzzy search matching active)
          </h5>
          <p style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '12px' }}>
            Paste raw recipe text or details from Google/LSI lists below. The smart parser will instantly index it.
          </p>

          <textarea 
            placeholder="Paste recipe here...\nExample:\nTitle: Odia Kakara Pitha\nTime: 20 MINS\nIngredients:\n- Semolina\n- Grated coconut\n- Sugar\nSteps:\n- Boil water with semolina.\n- Stuff dough with coconut and fry until golden brown."
            value={rawText}
            onChange={(e) => handleRawTextChange(e.target.value)}
            style={{
              width: '100%',
              height: '110px',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid var(--border-sand)',
              fontSize: '12px',
              fontFamily: 'monospace',
              outline: 'none',
              marginBottom: '12px',
              resize: 'none'
            }}
          />

          {parsedPreview && (
            <div className="fade-in-slide" style={{
              backgroundColor: 'var(--bg-warm)',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid var(--border-sand)',
              marginBottom: '12px'
            }}>
              <span style={{ fontSize: '9px', fontWeight: 800, color: 'var(--primary-saffron)' }}>✓ SMART PARSED PREVIEW:</span>
              <h6 style={{ fontSize: '12px', fontWeight: 800, margin: '2px 0', color: 'var(--text-masala)' }}>{parsedPreview.title}</h6>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Cook Time: {parsedPreview.time}</span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '6px' }}>
                <div>
                  <span style={{ fontSize: '9px', fontWeight: 700, color: 'var(--text-masala)' }}>Ingredients ({parsedPreview.ingredients.length}):</span>
                  <ul style={{ paddingLeft: '12px', fontSize: '9px', margin: 0, color: 'var(--text-muted)' }}>
                    {parsedPreview.ingredients.slice(0, 3).map((ing, i) => <li key={i}>{ing}</li>)}
                    {parsedPreview.ingredients.length > 3 && <li>+ {parsedPreview.ingredients.length - 3} more</li>}
                  </ul>
                </div>
                <div>
                  <span style={{ fontSize: '9px', fontWeight: 700, color: 'var(--text-masala)' }}>Steps ({parsedPreview.steps.length}):</span>
                  <ol style={{ paddingLeft: '12px', fontSize: '9px', margin: 0, color: 'var(--text-muted)' }}>
                    {parsedPreview.steps.slice(0, 2).map((s, i) => <li key={i}>{s.slice(0, 25)}...</li>)}
                  </ol>
                </div>
              </div>
            </div>
          )}

          {parsedPreview && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
              <div>
                <label style={{ fontSize: '9px', fontWeight: 800, color: 'var(--text-masala)' }}>ASSIGN REGION:</label>
                <select 
                  value={uploadState} 
                  onChange={(e) => setUploadState(e.target.value)}
                  style={{ width: '100%', padding: '6px', fontSize: '11px', borderRadius: '4px', border: '1px solid var(--border-sand)' }}
                >
                  <option value="West Bengal">West Bengal</option>
                  <option value="Odisha">Odisha / Orissa</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Maharashtra">Maharashtra</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '9px', fontWeight: 800, color: 'var(--text-masala)' }}>DIET TYPE:</label>
                <select 
                  value={uploadDiet} 
                  onChange={(e) => setUploadDiet(e.target.value)}
                  style={{ width: '100%', padding: '6px', fontSize: '11px', borderRadius: '4px', border: '1px solid var(--border-sand)' }}
                >
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Non-Vegetarian">Non-Vegetarian</option>
                  <option value="Jain Special">Jain Special</option>
                </select>
              </div>
            </div>
          )}

          {parsedPreview && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
              <div>
                <label style={{ fontSize: '9px', fontWeight: 800, color: 'var(--text-masala)' }}>COOKING MOOD:</label>
                <select 
                  value={uploadMood} 
                  onChange={(e) => setUploadMood(e.target.value)}
                  style={{ width: '100%', padding: '6px', fontSize: '11px', borderRadius: '4px', border: '1px solid var(--border-sand)' }}
                >
                  <option value="Light Comfort 🥣">Light Comfort</option>
                  <option value="Spicy Feast 🌶️">Spicy Feast</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '9px', fontWeight: 800, color: 'var(--text-masala)' }}>MEAL COURSE:</label>
                <select 
                  value={uploadCourse} 
                  onChange={(e) => setUploadCourse(e.target.value)}
                  style={{ width: '100%', padding: '6px', fontSize: '11px', borderRadius: '4px', border: '1px solid var(--border-sand)' }}
                >
                  <option value="Lunch/Dinner 🍽️">Lunch/Dinner</option>
                  <option value="Breakfast/Snacks ☕">Breakfast/Snacks</option>
                </select>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', alignItems: 'center' }}>
            {uploadStatusMsg && <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent-coriander)' }}>{uploadStatusMsg}</span>}
            <button 
              onClick={handleConfirmUpload}
              disabled={!parsedPreview}
              className="btn-primary"
              style={{ width: 'auto', padding: '8px 16px', fontSize: '12px', opacity: parsedPreview ? 1 : 0.5 }}
            >
              Confirm & Append
            </button>
          </div>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        {/* Guidelines Warning Info Box */}
        <div className="warm-card" style={{ padding: '12px 16px', display: 'flex', gap: '10px', borderLeft: '4px solid var(--primary-saffron)' }}>
          <Info size={18} style={{ color: 'var(--primary-saffron)', flexShrink: 0 }} />
          <div>
            <h5 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-masala)', margin: '0 0 2px' }}>
              Typo-Resilient Offline Kitchen Active
            </h5>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: '15px', margin: 0 }}>
              Use the binary decision tree below to match recipes, or type in the search bar. Supports broken language and spelling errors!
            </p>
          </div>
        </div>

        {/* Render Chat Messages */}
        {messages.map(msg => (
          <div 
            key={msg.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              alignItems: msg.sender === 'User' ? 'flex-end' : 'flex-start',
              marginBottom: '8px'
            }}
          >
            <div className={`chat-bubble ${msg.sender === 'User' ? 'user' : 'ai'}`}>
              {msg.messageText}
            </div>
            
            {msg.hasRecipe && (
              <div 
                className="recipe-card-premium fade-in-slide"
                style={{ 
                  width: '92%', 
                  marginTop: '8px', 
                  alignSelf: 'flex-start', 
                  border: '1.5px solid var(--border-sand)',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  backgroundColor: '#FFFFFF',
                  overflow: 'hidden'
                }}
              >
                <div 
                  onClick={() => setExpandedRecipe(expandedRecipe === msg.recipeTitle ? null : msg.recipeTitle)}
                  style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ChefHat size={16} style={{ color: 'var(--primary-saffron)' }} />
                    <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-masala)' }}>
                      {msg.recipeTitle}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{
                      fontSize: '8px',
                      fontWeight: 800,
                      backgroundColor: 'var(--secondary-turmeric)',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      color: 'var(--text-masala)'
                    }}>
                      {msg.recipeTag}
                    </span>
                    {expandedRecipe === msg.recipeTitle ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </div>
                </div>

                {expandedRecipe === msg.recipeTitle && (
                  <div style={{ padding: '0 14px 14px', borderTop: '1px solid var(--border-sand)', paddingTop: '12px' }}>
                    <div className="recipe-stats" style={{ marginBottom: '12px', display: 'flex', gap: '6px' }}>
                      <div className="recipe-stat-box" style={{ flex: 1, padding: '6px', textAlign: 'center', backgroundColor: 'var(--bg-warm)', borderRadius: '6px' }}>
                        <span className="recipe-stat-val" style={{ fontSize: '11px', display: 'block', fontWeight: 800 }}>{msg.recipeTime}</span>
                        <span className="recipe-stat-lbl" style={{ fontSize: '7px', color: 'var(--text-light)' }}>COOK TIME</span>
                      </div>
                      <div className="recipe-stat-box" style={{ flex: 1, padding: '6px', textAlign: 'center', backgroundColor: 'var(--bg-warm)', borderRadius: '6px', borderLeft: '1px solid var(--border-sand)', borderRight: '1px solid var(--border-sand)' }}>
                        <span className="recipe-stat-val" style={{ fontSize: '11px', display: 'block', fontWeight: 800 }}>Medium</span>
                        <span className="recipe-stat-lbl" style={{ fontSize: '7px', color: 'var(--text-light)' }}>COMPLEXITY</span>
                      </div>
                      <div className="recipe-stat-box" style={{ flex: 1, padding: '6px', textAlign: 'center', backgroundColor: 'var(--bg-warm)', borderRadius: '6px' }}>
                        <span className="recipe-stat-val" style={{ fontSize: '11px', display: 'block', color: 'var(--accent-coriander)', fontWeight: 800 }}>{msg.recipeTag}</span>
                        <span className="recipe-stat-lbl" style={{ fontSize: '7px', color: 'var(--text-light)' }}>DIET TAG</span>
                      </div>
                    </div>

                    <h6 style={{ fontSize: '11px', fontWeight: 800, marginBottom: '6px', color: 'var(--text-masala)', letterSpacing: '0.3px' }}>
                      INGREDIENTS CHECKLIST
                    </h6>
                    <ul className="recipe-list" style={{ marginBottom: '12px', paddingLeft: '14px', fontSize: '11px', lineHeight: '16px' }}>
                      {(msg.recipeIngredients || []).map((ing, i) => (
                        <li key={i}>{ing} - <span style={{ color: 'var(--accent-coriander)', fontWeight: 700 }}>At Home</span></li>
                      ))}
                    </ul>

                    <h6 style={{ fontSize: '11px', fontWeight: 800, marginBottom: '6px', color: 'var(--text-masala)', letterSpacing: '0.3px' }}>
                      DIY COOKING STEPS
                    </h6>
                    <ol style={{ paddingLeft: '14px', fontSize: '11px', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '6px', lineHeight: '16px' }}>
                      {(msg.recipeSteps || []).map((step, i) => (
                        <li key={i} style={{ marginBottom: '4px' }}>{step}</li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* Apportion day selection bar for chat bubble recipe */}
                <div style={{ 
                  padding: '10px 14px', 
                  borderTop: '1px solid var(--border-sand)', 
                  backgroundColor: 'var(--bg-warm)', 
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}>
                  {loadingDaySelectorId !== msg.recipeTitle ? (
                    <button 
                      onClick={() => setLoadingDaySelectorId(msg.recipeTitle)}
                      className="btn-secondary"
                      style={{
                        padding: '6px 10px',
                        fontSize: '10px',
                        fontWeight: 800,
                        backgroundColor: '#FFFFFF',
                        borderColor: 'var(--border-sand)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        width: '100%',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      <Sparkles size={11} style={{ color: 'var(--primary-saffron)' }} />
                      {loadedRecipeId === msg.recipeTitle ? "✓ Loaded Successfully!" : "Load into Weekly Plan"}
                    </button>
                  ) : (
                    <div className="fade-in-slide" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '8px', fontWeight: 800, color: 'var(--text-muted)', alignSelf: 'center' }}>
                        SELECT CALENDAR DAY TO APPORTION MEAL:
                      </span>
                      <div style={{ display: 'flex', gap: '4px', overflowX: 'auto', paddingBottom: '4px' }}>
                        {getCurrentWeekDays().map(day => (
                          <button 
                            key={day}
                            onClick={() => {
                              const dummyRecipe = {
                                title: msg.recipeTitle,
                                time: msg.recipeTime,
                                tag: msg.recipeTag,
                                ingredients: msg.recipeIngredients,
                                steps: msg.recipeSteps,
                                complexity: 'Medium'
                              };
                              handleLoadToPlan(dummyRecipe, day);
                            }}
                            className="pill-chip"
                            style={{ 
                              fontSize: '8px', 
                              padding: '4px 8px', 
                              backgroundColor: 'var(--primary-saffron)', 
                              color: '#FFFFFF',
                              fontWeight: 800,
                              flexShrink: 0,
                              borderRadius: '4px',
                              border: 'none',
                              cursor: 'pointer'
                            }}
                          >
                            {day}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Dynamic Binary Decision tree popups */}
        <div style={{ alignSelf: 'flex-start', width: '100%' }}>
          {treeState.step !== 'RESULTS' && !isInterviewActive && (
            <div className="chat-bubble ai fade-in-slide" style={{ display: 'inline-block', maxWidth: '85%' }}>
              <p style={{ margin: 0, fontWeight: 800, fontSize: '13px' }}>
                {BINARY_TREE_QUESTIONS[treeState.step]?.[activeLang] || BINARY_TREE_QUESTIONS[treeState.step]?.['English']}
              </p>
              <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                {BINARY_TREE_QUESTIONS[treeState.step]?.options.map(opt => (
                  <button 
                    key={opt.key}
                    onClick={() => handleBinaryChoice(opt.key, opt[activeLang] || opt['English'])}
                    className="btn-primary"
                    style={{ flex: 1, padding: '8px 12px', fontSize: '12px', fontWeight: 800 }}
                  >
                    {opt[activeLang] || opt['English']}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Results Recipes display */}
        {treeState.step === 'RESULTS' && !isInterviewActive && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--primary-saffron)', display: 'flex', alignItems: 'center', gap: '4px', paddingLeft: '8px' }}>
              <ChefHat size={14} />
              OFFLINE MATCHED RECIPES
            </span>

            {activeRecipes.length > 0 ? (
              activeRecipes.map(recipe => (
                <div 
                  key={recipe.title}
                  className="recipe-card-premium fade-in-slide"
                  style={{ width: '96%', alignSelf: 'center', margin: '0 0 10px' }}
                >
                  <div 
                    onClick={() => setExpandedRecipe(expandedRecipe === recipe.title ? null : recipe.title)}
                    style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <ChefHat size={18} style={{ color: 'var(--primary-saffron)' }} />
                      <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-masala)' }}>
                        {recipe.title}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{
                        fontSize: '9px',
                        fontWeight: 800,
                        backgroundColor: 'var(--secondary-turmeric)',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        color: 'var(--text-masala)'
                      }}>
                        {recipe.tag}
                      </span>
                      {expandedRecipe === recipe.title ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </div>

                  {expandedRecipe === recipe.title && (
                    <div style={{ padding: '0 16px 16px', borderTop: '1px solid var(--border-sand)', paddingTop: '12px' }}>
                      <div className="recipe-stats" style={{ marginBottom: '14px' }}>
                        <div className="recipe-stat-box">
                          <span className="recipe-stat-val">{recipe.time}</span>
                          <span className="recipe-stat-lbl">COOK TIME</span>
                        </div>
                        <div className="recipe-stat-box" style={{ borderLeft: '1px solid var(--border-sand)', borderRight: '1px solid var(--border-sand)' }}>
                          <span className="recipe-stat-val">{recipe.complexity}</span>
                          <span className="recipe-stat-lbl">COMPLEXITY</span>
                        </div>
                        <div className="recipe-stat-box">
                          <span className="recipe-stat-val" style={{ color: 'var(--accent-coriander)', fontWeight: 700 }}>
                            {recipe.tag}
                          </span>
                          <span className="recipe-stat-lbl">DIET TAG</span>
                        </div>
                      </div>

                      <h6 style={{ fontSize: '12px', fontWeight: 800, marginBottom: '6px', color: 'var(--text-masala)' }}>
                        INGREDIENTS CHECKLIST
                      </h6>
                      <ul className="recipe-list" style={{ marginBottom: '14px' }}>
                        {recipe.ingredients.map((ing, i) => (
                          <li key={i}>{ing} - <span style={{ color: 'var(--accent-coriander)', fontWeight: 700 }}>At Home</span></li>
                        ))}
                      </ul>

                      <h6 style={{ fontSize: '12px', fontWeight: 800, marginBottom: '6px', color: 'var(--text-masala)' }}>
                        DIY COOKING STEPS
                      </h6>
                      <ol style={{ paddingLeft: '16px', fontSize: '12px', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {recipe.steps.map((step, i) => (
                          <li key={i} style={{ marginBottom: '6px' }}>{step}</li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {/* Apportion day selection bar */}
                  <div style={{ 
                    padding: '10px 16px', 
                    borderTop: '1px solid var(--border-sand)', 
                    backgroundColor: 'var(--bg-warm)', 
                    borderBottomLeftRadius: '12px', 
                    borderBottomRightRadius: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}>
                    {loadingDaySelectorId !== recipe.title ? (
                      <button 
                        onClick={() => setLoadingDaySelectorId(recipe.title)}
                        className="btn-secondary"
                        style={{
                          padding: '8px',
                          fontSize: '11px',
                          fontWeight: 800,
                          backgroundColor: '#FFFFFF',
                          borderColor: 'var(--border-sand)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          width: '100%'
                        }}
                      >
                        <Sparkles size={12} style={{ color: 'var(--primary-saffron)' }} />
                        {loadedRecipeId === recipe.title ? "✓ Loaded Successfully!" : "Load into Weekly Plan"}
                      </button>
                    ) : (
                      <div className="fade-in-slide" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span style={{ fontSize: '9px', fontWeight: 800, color: 'var(--text-muted)', alignSelf: 'center' }}>
                          SELECT CALENDAR DAY TO APPORTION MEAL:
                        </span>
                        <div style={{ display: 'flex', gap: '4px', overflowX: 'auto', paddingBottom: '4px' }}>
                          {getCurrentWeekDays().map(day => (
                            <button 
                              key={day}
                              onClick={() => handleLoadToPlan(recipe, day)}
                              className="pill-chip"
                              style={{ 
                                fontSize: '9px', 
                                padding: '4px 8px', 
                                backgroundColor: 'var(--primary-saffron)', 
                                color: '#FFFFFF',
                                fontWeight: 800,
                                flexShrink: 0
                              }}
                            >
                              {day}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="warm-card" style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                No direct matching recipes in the offline knowledge base for this configuration. Reset choices to start over!
              </div>
            )}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input bar Footer controls */}
      <div className="no-print" style={{
        paddingTop: '10px',
        borderTop: '1px solid var(--border-sand)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: 'var(--bg-warm)'
      }}>
        <button 
          onClick={() => {
            onClearChat();
            handleResetTree();
          }}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            backgroundColor: 'var(--pill-soft)',
            border: '1px solid var(--border-sand)',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          title="Clear Chat History"
        >
          <Trash2 size={16} />
        </button>

        <input 
          type="text"
          placeholder={`Fuzzy search recipe... (e.g. possto, shorse mach)`}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
          style={{
            flex: 1,
            padding: '12px 14px',
            borderRadius: '10px',
            border: '1px solid var(--border-sand)',
            fontSize: '14px',
            fontWeight: 600,
            outline: 'none',
            fontFamily: 'inherit',
            color: 'var(--text-masala)'
          }}
        />

        <button 
          onClick={handleSearchSubmit}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            backgroundColor: 'var(--primary-saffron)',
            border: 'none',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(211, 84, 0, 0.2)'
          }}
        >
          <Search size={16} />
        </button>
      </div>
        </>
      )}

    </div>
  );
}
