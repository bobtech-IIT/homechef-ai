import { createClient } from '@supabase/supabase-js';

// Retrieve credentials from Vite environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Mock Client fallback to prevent application crashes when credentials are empty
let supabaseInstance = null;

if (supabaseUrl && supabaseAnonKey) {
  try {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
    console.log('🔌 Supabase Database Client initialized successfully!');
  } catch (e) {
    console.error('Failed to initialize Supabase client:', e);
  }
}

// If credentials are not present, return a non-crashing mock interface
if (!supabaseInstance) {
  console.warn('⚠️ Supabase URL or Anon Key is missing. Falling back to local offline localStorage persistence.');
  
  supabaseInstance = {
    from: (table) => ({
      select: () => ({
        order: () => Promise.resolve({ data: [], error: null }),
        eq: () => Promise.resolve({ data: [], error: null })
      }),
      insert: (data) => {
        console.log(`[Mock DB] Storing row inside local ${table}:`, data);
        return Promise.resolve({ data, error: null });
      },
      update: (data) => Promise.resolve({ data, error: null }),
      delete: () => Promise.resolve({ error: null })
    })
  };
}

export const supabase = supabaseInstance;
