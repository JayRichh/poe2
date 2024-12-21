export type POEScope = 
  | "account:profile" 
  | "account:characters" 
  | "account:leagues" 
  | "account:stashes";

export interface POEOAuthConfig {
  clientId: string;
  clientSecret?: string;
  redirectUri: string;
  scopes: POEScope[];
  isConfidentialClient: boolean;
}

export interface POETokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  username: string;
}

export interface POEAPIResponse<T = unknown> {
  data: T;
  success: boolean;
}

export interface POEError {
  error: {
    code: number;
    message: string;
  };
}

export interface POEProfile {
  uuid: string;
  name: string;
  realm: string;
  guild?: {
    name: string;
    tag: string;
  };
  twitch?: {
    name: string;
  };
  private: boolean;
}

export interface POECharacter {
  id: string;
  name: string;
  class: string;
  level: number;
  league: string;
  experience: number;
  lastActive: string;
}

export interface POELeague {
  id: string;
  realm: string;
  description: string;
  registerAt: string;
  endAt: string | null;
  delveEvent: boolean;
  rules: string[];
}
