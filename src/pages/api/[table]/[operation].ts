import type { APIRoute } from 'astro';
import { supabase } from '@lib/supabase';
import type { TableData } from '../../../types';

export const GET: APIRoute = async ({ params }) => {
  const { table } = params;
  console.log(`API GET pour ${table}`);
  const { data, error } = await supabase.from(table).select('*');
  if (error) {
    console.error(`Erreur GET ${table}:`, error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
  console.log(`Données GET pour ${table}:`, data);
  return new Response(JSON.stringify(data), { status: 200 });
};

export const POST: APIRoute = async ({ params, request }) => {
  const { table } = params;
  const data = await request.json();
  console.log(`API POST pour ${table} avec données:`, data);
  const { data: newItem, error } = await supabase.from(table).insert(data).select().single();
  if (error) {
    console.error(`Erreur POST ${table}:`, error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
  console.log(`Création réussie dans ${table}:`, newItem);
  return new Response(JSON.stringify(newItem), { status: 201 });
};

export const PUT: APIRoute = async ({ params, request }) => {
  const { table } = params;
  const body = await request.json();
  const { id, ...data } = body;
  console.log(`API PUT reçu pour ${table} avec body complet:`, body);
  console.log(`ID extrait: ${id}, Données à mettre à jour:`, data);

  // Validation stricte de l'ID
  if (!id || typeof id !== 'string' || !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id)) {
    console.error(`ID invalide pour ${table}:`, id);
    return new Response(JSON.stringify({ error: 'Invalid UUID provided' }), { status: 400 });
  }

  // Log juste avant l'appel à Supabase
  console.log(`Envoi à Supabase pour ${table} - ID: ${id}, Données:`, data);
  const { data: updatedItem, error } = await supabase.from(table).update(data).eq('id', id).select().single();
  if (error) {
    console.error(`Erreur PUT ${table} ID ${id}:`, error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
  console.log(`Mise à jour réussie dans ${table} ID ${id}:`, updatedItem);
  return new Response(JSON.stringify(updatedItem), { status: 200 });
};

export const DELETE: APIRoute = async ({ params, request }) => {
  const { table } = params;
  const { id } = await request.json();
  console.log(`API DELETE pour ${table} ID ${id}`);
  const { error } = await supabase.from(table).delete().eq('id', id);
  if (error) {
    console.error(`Erreur DELETE ${table} ID ${id}:`, error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
  console.log(`Suppression réussie dans ${table} ID ${id}`);
  return new Response(null, { status: 204 });
};