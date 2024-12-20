import { POEItem, POEItemJewelData, POEPassiveNode } from "./poe-items";

// POE OAuth Types
export interface POEOAuthConfig {
  clientId: string;
  clientSecret?: string; // Only for confidential clients
  redirectUri: string;
  scopes: POEScope[];
  isConfidentialClient: boolean;
}

export interface POETokenResponse {
  access_token: string;
  expires_in: number | null; // null for client_credentials
  token_type: "bearer";
  scope: string;
  username: string;
  sub: string; // UUID v4 in canonical format
  refresh_token?: string; // Only for authorization_code grant
}

// POE API Scopes
export type POEScope =
  | "account:profile"
  | "account:leagues"
  | "account:stashes"
  | "account:characters"
  | "account:league_accounts"
  | "account:item_filter"
  | "service:leagues"
  | "service:leagues:ladder"
  | "service:pvp_matches"
  | "service:pvp_matches:ladder"
  | "service:psapi";

// POE Account Types
export interface POEProfile {
  uuid: string; // UUIDv4 in canonical format
  name: string;
  realm?: "pc" | "xbox" | "sony";
  twitch?: {
    name: string;
  };
}

export interface POECharacter {
  id: string; // 64 digit hexadecimal string
  name: string;
  class: string;
  level: number;
  league?: string;
  experience: number;
  ruthless?: boolean;
  expired?: boolean;
  deleted?: boolean;
  current?: boolean;
  equipment?: POEItem[];
  inventory?: POEItem[];
  rucksack?: POEItem[]; // items stored in the Primalist's Rucksack
  jewels?: POEItem[];
  passives?: {
    hashes: number[];
    hashes_ex: number[];
    mastery_effects: Record<string, number>; // key: mastery node skill hash, value: selected effect hash
    skill_overrides: Record<string, POEPassiveNode>; // key: node identifier being replaced
    bandit_choice?: "Kraityn" | "Alira" | "Oak" | "Eramir";
    pantheon_major?: "TheBrineKing" | "Arakaali" | "Solaris" | "Lunaris";
    pantheon_minor?:
      | "Abberath"
      | "Gruthkul"
      | "Yugul"
      | "Shakari"
      | "Tukohama"
      | "Ralakesh"
      | "Garukhan"
      | "Ryslatha";
    jewel_data: Record<string, POEItemJewelData>; // key: x property of jewel item
    alternate_ascendancy?: "Warden" | "Warlock" | "Primalist";
  };
  metadata?: {
    version?: string; // game version for character's realm
  };
}

// POE League Types
export interface POELeague {
  id: string; // league name
  realm?: "pc" | "xbox" | "sony";
  description?: string;
  category?: {
    id: string; // e.g. "Affliction"
    current?: boolean; // true for active challenge leagues
  };
  rules?: POELeagueRule[];
  registerAt?: string; // ISO8601 date
  event?: boolean;
  url?: string; // forum thread URL
  startAt?: string; // ISO8601 date
  endAt?: string; // ISO8601 date
  timedEvent?: boolean;
  scoreEvent?: boolean;
  delveEvent?: boolean;
  ancestorEvent?: boolean;
  leagueEvent?: boolean;
}

export interface POELeagueRule {
  id: string; // e.g. "Hardcore", "NoParties" (SSF)
  name: string;
  description?: string;
}

// POE API Error Types
export interface POEError {
  error: {
    code: number;
    message: string;
  };
}

// POE Rate Limit Types
export interface POERateLimit {
  policy: string;
  rules: string[];
  limits: Record<string, POERateLimitRule>;
  state: Record<string, POERateLimitState>;
  retryAfter?: number;
}

export interface POERateLimitRule {
  maxHits: number;
  period: number;
  restrictedTime: number;
}

export interface POERateLimitState {
  hits: number;
  period: number;
  restrictedTimeRemaining: number;
}

// POE API Response Types
export interface POEAPIResponse<T> {
  data: T;
  error?: POEError;
  rateLimit?: POERateLimit;
}

// Utility Types
export type POERealm = "pc" | "xbox" | "sony";
export type POEGrantType = "authorization_code" | "client_credentials" | "refresh_token";
