import type { Json } from "~/lib/supabase/types";

export interface PropertyJson extends Record<string, Json | undefined> {
  name: string;
  value: number;
  display?: string;
  type?: string;
}

export interface SocketJson extends Record<string, Json | undefined> {
  group: number;
  color: string;
  attr?: string;
}

export interface RequirementJson extends Record<string, Json | undefined> {
  name: string;
  value: number;
  display?: string;
}

export interface InfluenceJson extends Record<string, Json | undefined> {
  type: string;
}

export function isPropertyJson(value: unknown): value is PropertyJson {
  if (!value || typeof value !== 'object') return false;
  const prop = value as Record<string, unknown>;
  return typeof prop.name === 'string' && 
         typeof prop.value === 'number';
}

export function isSocketJson(value: unknown): value is SocketJson {
  if (!value || typeof value !== 'object') return false;
  const socket = value as Record<string, unknown>;
  return typeof socket.group === 'number' && 
         typeof socket.color === 'string';
}

export function isRequirementJson(value: unknown): value is RequirementJson {
  if (!value || typeof value !== 'object') return false;
  const req = value as Record<string, unknown>;
  return typeof req.name === 'string' && 
         typeof req.value === 'number';
}

export function isInfluenceJson(value: unknown): value is InfluenceJson {
  if (!value || typeof value !== 'object') return false;
  const influence = value as Record<string, unknown>;
  return typeof influence.type === 'string';
}

export function formatPropertyDisplay(property: PropertyJson): string {
  switch (property.name) {
    case 'quality':
      return `${property.value}%`;
    case 'level_requirement':
      return `Level ${property.value}`;
    default:
      return property.value.toString();
  }
}
