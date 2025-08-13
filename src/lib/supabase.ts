import { createClient } from "@supabase/supabase-js";

// Helper function to check if Supabase is properly configured
const isSupabaseConfigured = () => {
  const url = import.meta.env.SUPABASE_URL;
  const key = import.meta.env.SUPABASE_ANON_KEY;
  return url && key && 
         url !== 'your_supabase_url_here' && 
         url !== 'https://example.supabase.co' &&
         key !== 'your_supabase_anon_key_here' &&
         key !== 'dummy_key_for_testing';
};

// Create client with fallback for development
let supabase: any;

if (isSupabaseConfigured()) {
  supabase = createClient(
    import.meta.env.SUPABASE_URL,
    import.meta.env.SUPABASE_ANON_KEY,
    {
      auth: {
        flowType: "pkce",
      },
    },
  );
} else {
  console.warn('Supabase non configuré - client mock utilisé');
  // Mock client for development
  supabase = {
    auth: {
      signInWithPassword: () => Promise.resolve({ data: null, error: new Error('Supabase non configuré') }),
      signOut: () => Promise.resolve({ error: null }),
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } }, error: null }),
    },
    from: () => ({
      select: () => Promise.resolve({ data: [], error: null }),
      insert: () => Promise.resolve({ data: null, error: new Error('Supabase non configuré') }),
      update: () => Promise.resolve({ data: null, error: new Error('Supabase non configuré') }),
      delete: () => Promise.resolve({ data: null, error: new Error('Supabase non configuré') }),
    }),
  };
}

export { supabase };