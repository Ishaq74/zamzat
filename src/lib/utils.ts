import { supabase } from './supabase';
import type { FieldSchema, Option, TableSchema, TableData } from '../types';

export async function inferSchemaFromSample(
  table: string,
  sample: TableData
): Promise<TableSchema> {
  console.log(`Inférence schéma pour ${table} avec échantillon:`, sample);
  const fields: FieldSchema[] = Object.entries(sample).map(([name, value]) => {
    let type: FieldType;
    if (typeof value === 'string') {
      type = name.endsWith('_id') || name === 'category' ? 'select' : name === 'description' || name === 'instructions' ? 'textarea' : 'text';
    } else if (typeof value === 'boolean') {
      type = 'boolean';
    } else if (typeof value === 'number') {
      type = 'number';
    } else {
      type = 'text';
    }

    const schema: FieldSchema = {
      name,
      type,
      label: name.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase()),
      required: name === 'id' || name === 'name' || name === 'title',
    };

    if (type === 'select') {
      const relatedTable = name === 'category' ? `${table.slice(0, -1)}categories` : name.replace('_id', 's');
      schema.relation = { table: relatedTable, value: 'id', label: 'name' };
      console.log(`Champ ${name} détecté comme relation vers ${relatedTable}`);
    }

    return schema;
  });

  return { fields, primaryKey: 'id' };
}

export async function loadOptions(field: FieldSchema): Promise<Option[]> {
  if (!field.relation) {
    console.log(`Aucune relation pour ${field.name}`);
    return [];
  }

  console.log(`Chargement options pour ${field.name} depuis ${field.relation.table}`);
  const { data, error } = await supabase
    .from(field.relation.table)
    .select(`${field.relation.value}, ${field.relation.label}`)
    .order(field.relation.label, { ascending: true });

  if (error) {
    console.warn(`Erreur chargement options ${field.relation.table}: ${error.message}`);
    return [];
  }

  const options = data.map(item => ({
    value: String(item[field.relation.value]),
    label: String(item[field.relation.label]),
  }));
  console.log(`Options chargées pour ${field.name}:`, options);
  return options;
}

export async function fetchTableData(table: string): Promise<TableData[]> {
  console.log(`Récupération données via Supabase pour ${table}`);
  const { data, error } = await supabase.from(table).select('*');
  if (error) {
    console.error(`Erreur chargement ${table}:`, error.message);
    throw new Error(`Erreur chargement ${table}: ${error.message}`);
  }
  console.log(`Données récupérées pour ${table}:`, data);
  return data as TableData[];
}