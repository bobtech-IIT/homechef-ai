import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { GRANDMOTHER_RECIPES } from '../data/GrandmotherRecipes';

const AppContext = createContext();

const INITIAL_STATE = {
  profile: {
    familyName: '',
    familySize: '3-4 Members 👨‍👩‍👧‍👦',
    regionalPalate: 'general',
    dietType: 'Vegetarian 🌱',
    occasions: [],
    cuisineInterests: [],
    culinaryArchetype: 'standard',
    isSetupComplete: false
  },
  inventory: [
    { id: '1', name: 'Paneer', category: 'Fridge 🧊', quantity: '200g', status: 'Fresh' },
    { id: '2', name: 'Onions', category: 'Pantry 🌾', quantity: '2kg', status: 'Fresh' },
    { id: '3', name: 'Coriander/Dhania', category: 'Spices 🫙', quantity: '1 bunch', status: 'Expiring Soon' },
    { id: '4', name: 'Tomatoes', category: 'Pantry 🌾', quantity: '500g', status: 'Refill' }
  ],
  weeklyPlan: {
    MON: { breakfast: null, lunch: null, snack: null, dinner: null },
    TUE: { breakfast: null, lunch: null, snack: null, dinner: null },
    WED: { breakfast: null, lunch: null, snack: null, dinner: null },
    THU: { breakfast: null, lunch: null, snack: null, dinner: null },
    FRI: { breakfast: null, lunch: null, snack: null, dinner: null },
    SAT: { breakfast: null, lunch: null, snack: null, dinner: null },
    SUN: { breakfast: null, lunch: null, snack: null, dinner: null }
  },
  chatHistory: [],
  nutritionScore: { protein: 65, carbs: 50, fat: 40, fiber: 75, iron: 55 }
};

function appReducer(state, action) {
  switch (action.type) {
    case 'COMPLETE_SETUP':
      return {
        ...state,
        profile: { ...state.profile, ...action.payload, isSetupComplete: true }
      };
    
    case 'UPDATE_PROFILE':
      return {
        ...state,
        profile: { ...state.profile, ...action.payload }
      };
    
    case 'ADD_INVENTORY_ITEM':
      return {
        ...state,
        inventory: [...state.inventory, { id: Date.now().toString(), ...action.payload }]
      };
      
    case 'REMOVE_INVENTORY_ITEM':
      return {
        ...state,
        inventory: state.inventory.filter(item => item.id !== action.payload)
      };
      
    case 'UPDATE_INVENTORY_ITEM':
      return {
        ...state,
        inventory: state.inventory.map(item => item.id === action.payload.id ? action.payload : item)
      };

    case 'SEED_WEEKLY_PLAN':
      return {
        ...state,
        weeklyPlan: action.payload
      };

    case 'SWAP_MEAL': {
      const { day, mealType, newMeal } = action.payload;
      return {
        ...state,
        weeklyPlan: {
          ...state.weeklyPlan,
          [day]: {
            ...state.weeklyPlan[day],
            [mealType]: newMeal
          }
        }
      };
    }

    case 'ADD_CHAT_MESSAGE':
      return {
        ...state,
        chatHistory: [...state.chatHistory, action.payload]
      };

    case 'RESET_ALL':
      return INITIAL_STATE;

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const STORAGE_KEY = 'homechef_state_v4'; // Bumped from v3 to break stale "Sharma" cached sessions from prior agent runs. Old key ignored → fresh wizard on first load after update.

  const [state, dispatch] = useReducer(appReducer, INITIAL_STATE, () => {
    try {
      // Ephemeral mode: always start completely fresh on app open.
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('homechef_state_v3');
      localStorage.removeItem('homechef_state_v2');
      localStorage.removeItem('homechef_state');
      localStorage.removeItem('homechef_custom_recipes');
      localStorage.removeItem('homechef_custom_rag_chunks');
      localStorage.removeItem('homechef_dynamic_thali_data');
      console.log('🧹 Headless PWA: Cleared all old cache. Starting completely fresh!');
    } catch (e) {
      console.warn('Failed to clear local storage:', e);
    }
    return INITIAL_STATE;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
