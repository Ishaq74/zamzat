import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_ANON_KEY
);

export async function createItem(table: string, data: any, token: string) {
  const { data: result, error } = await supabase
    .from(table)
    .insert(data)
    .select()
    .single();
  if (error) throw new Error(`Erreur création ${table}: ${error.message}`);
  return result;
}

export async function updateItem(table: string, id: string, data: any, token: string) {
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
  const { error } = await supabase.from(table).delete().eq('id', id);
  if (error) throw new Error(`Erreur suppression ${table}: ${error.message}`);
}