import type { Database, Json } from "~/lib/supabase/types";

export type Equipment = Database["public"]["Tables"]["equipment"]["Row"];
export type EquipmentInsert = Database["public"]["Tables"]["equipment"]["Insert"];

export interface PropertyJson extends Record<string, Json | undefined> {
  name: string;
  value: number;
  display: string;
  type: string;
}

export interface SocketJson extends Record<string, Json | undefined> {
  group: number;
  attr: string;
}

export interface InfluenceJson extends Record<string, Json | undefined> {
  [key: string]: boolean | undefined;
}

export interface RequirementJson extends Record<string, Json | undefined> {
  name: string;
  value: number;
  display: string;
}

export interface EquipmentWithUrl extends Equipment {
  url?: string;
}

export function isPropertyJson(json: unknown): json is PropertyJson {
  if (typeof json !== 'object' || json === null) return false;
  return (
    'name' in json &&
    'value' in json &&
    'display' in json &&
    'type' in json
  );
}

export function isSocketJson(json: unknown): json is SocketJson {
  if (typeof json !== 'object' || json === null) return false;
  return (
    'group' in json &&
    'attr' in json
  );
}

export function isInfluenceJson(json: unknown): json is InfluenceJson {
  if (typeof json !== 'object' || json === null) return false;
  return Object.values(json).every(v => typeof v === 'boolean');
}

export function formatPropertyDisplay(property: PropertyJson): string {
  switch (property.type) {
    case 'quality':
      return `${property.value}%`;
    default:
      return property.value.toString();
  }
}
