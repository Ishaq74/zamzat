import { createClient } from '@supabase/supabase-js';

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

// Create client with fallback
let supabase: any;

if (isSupabaseConfigured()) {
  supabase = createClient(
    import.meta.env.SUPABASE_URL,
    import.meta.env.SUPABASE_ANON_KEY
  );
} else {
  console.warn('API Supabase désactivée - configuration manquante');
  // Mock client that throws meaningful errors
  supabase = {
    from: (table: string) => ({
      insert: () => Promise.resolve({ data: null, error: new Error('Supabase non configuré') }),
      update: () => Promise.resolve({ data: null, error: new Error('Supabase non configuré') }),
      delete: () => Promise.resolve({ data: null, error: new Error('Supabase non configuré') }),
      select: () => Promise.resolve({ data: [], error: null }),
    }),
  };
}

export async function createItem(table: string, data: any, token: string) {
  if (!isSupabaseConfigured()) {
    throw new Error(`Impossible de créer l'élément ${table}: Supabase non configuré`);
  }
  
  const { data: result, error } = await supabase
    .from(table)
    .insert(data)
    .select()
    .single();
  if (error) throw new Error(`Erreur création ${table}: ${error.message}`);
  return result;
}

export async function updateItem(table: string, id: string, data: any, token: string) {
  if (!isSupabaseConfigured()) {
    throw new Error(`Impossible de mettre à jour l'élément ${table}: Supabase non configuré`);
  }
  
  const { data: result, error } = await supabase
    .from(table)
    .update(data)
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(`Erreur mise à jour ${table}: ${error.message}`);
  return result;
}

export async function deleteItem(table: string, id: string, token: string) {
  if (!isSupabaseConfigured()) {
    throw new Error(`Impossible de supprimer l'élément ${table}: Supabase non configuré`);
  }
  
  const { error } = await supabase.from(table).delete().eq('id', id);
  if (error) throw new Error(`Erreur suppression ${table}: ${error.message}`);
}