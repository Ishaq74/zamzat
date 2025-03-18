export type FieldType = 'text' | 'textarea' | 'boolean' | 'number' | 'select';

export interface FieldSchema {
  name: string;
  type: FieldType;
  label: string;
  required: boolean;
  relation?: { table: string; value: string; label: string };
}

export interface TableSchema {
  fields: FieldSchema[];
  primaryKey: string;
}

export interface Option {
  value: string;
  label: string;
}

export type TableData = Record<string, string | number | boolean | null | undefined>;