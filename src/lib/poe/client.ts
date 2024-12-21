import type {
  POEAPIResponse,
  POECharacter,
  POEError,
  POELeague,
  POEOAuthConfig,
  POEProfile,
  POEScope,
  POETokenResponse,
} from "@/types/poe-api";

import { createClient } from "~/lib/supabase/client";
import type { POEAccountData } from "~/lib/supabase/types";

const POE_API_URL = "https://api.pathofexile.com";
const POE_OAUTH_URL = "https://www.pathofexile.com/oauth";

interface RateLimitHeaders {
  policy: string;
  rules: string[];
  limits: Record<
    string,
    {
      maxHits: number;
      period: number;
      restrictedTime: number;
    }
  >;
  state: Record<
    string,
    {
      hits: number;
      period: number;
      restrictedTimeRemaining: number;
    }
  >;
  retryAfter?: number;
}

export class POEClient {
  private config: POEOAuthConfig;
  private accessToken?: string;
  private refreshToken?: string;
  private tokenExpiry?: Date;

  constructor(config: POEOAuthConfig) {
    this.config = config;
  }

  // OAuth Methods

  async generateAuthUrl(state: string, codeVerifier: string): Promise<string> {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      response_type: "code",
      scope: this.config.scopes.join(" "),
      state,
      redirect_uri: this.config.redirectUri,
      code_challenge: await this.generateCodeChallenge(codeVerifier),
      code_challenge_method: "S256",
    });

    return `${POE_OAUTH_URL}/authorize?${params.toString()}`;
  }

  async exchangeCode(code: string, codeVerifier: string): Promise<POETokenResponse> {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      grant_type: "authorization_code",
      code,
      redirect_uri: this.config.redirectUri,
      code_verifier: codeVerifier,
    });

    if (this.config.isConfidentialClient && this.config.clientSecret) {
      params.append("client_secret", this.config.clientSecret);
    }

    const response = await fetch(`${POE_OAUTH_URL}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": `OAuth ${this.config.clientId}/1.0.0 (contact: your@email.com)`,
      },
      body: params.toString(),
    });

    if (!response.ok) {
      throw await this.handleError(response);
    }

    const data = (await response.json()) as POETokenResponse;
    await this.setTokens(data);
    return data;
  }

  async refreshAccessToken(): Promise<POETokenResponse> {
    if (!this.refreshToken) {
      throw new Error("No refresh token available");
    }

    const params = new URLSearchParams({
      client_id: this.config.clientId,
      grant_type: "refresh_token",
      refresh_token: this.refreshToken,
    });

    if (this.config.isConfidentialClient && this.config.clientSecret) {
      params.append("client_secret", this.config.clientSecret);
    }

    const response = await fetch(`${POE_OAUTH_URL}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": `OAuth ${this.config.clientId}/1.0.0 (contact: your@email.com)`,
      },
      body: params.toString(),
    });

    if (!response.ok) {
      throw await this.handleError(response);
    }

    const data = (await response.json()) as POETokenResponse;
    await this.setTokens(data);
    return data;
  }

  // API Methods

  async getProfile(): Promise<POEProfile> {
    return this.request<POEProfile>("/profile");
  }

  async getCharacters(): Promise<POECharacter[]> {
    const response = await this.request<{ characters: POECharacter[] }>("/character");
    return response.characters;
  }

  async getCharacter(name: string): Promise<POECharacter> {
    return this.request<POECharacter>(`/character/${encodeURIComponent(name)}`);
  }

  async getLeagues(): Promise<POELeague[]> {
    const response = await this.request<{ leagues: POELeague[] }>("/league");
    return response.leagues;
  }

  // Helper Methods

  private async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    if (!this.accessToken || this.isTokenExpired()) {
      if (this.refreshToken) {
        await this.refreshAccessToken();
      } else {
        throw new Error("No valid access token");
      }
    }

    const response = await fetch(`${POE_API_URL}${path}`, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${this.accessToken}`,
        "User-Agent": `OAuth ${this.config.clientId}/1.0.0 (contact: your@email.com)`,
      },
    });

    // Handle rate limits
    const rateLimit = this.parseRateLimitHeaders(response);
    if (rateLimit && response.status === 429) {
      // Wait and retry if rate limited
      await new Promise((resolve) => setTimeout(resolve, (rateLimit.retryAfter || 1) * 1000));
      return this.request(path, options);
    }

    if (!response.ok) {
      throw await this.handleError(response);
    }

    return response.json() as Promise<T>;
  }

  private async generateCodeChallenge(verifier: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const digest = await crypto.subtle.digest("SHA-256", data);

    return btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  private parseRateLimitHeaders(response: Response): RateLimitHeaders | null {
    const policy = response.headers.get("X-Rate-Limit-Policy");
    if (!policy) return null;

    const rules = response.headers.get("X-Rate-Limit-Rules")?.split(",") || [];
    const limits: RateLimitHeaders["limits"] = {};
    const state: RateLimitHeaders["state"] = {};

    rules.forEach((rule) => {
      const limitHeader = response.headers.get(`X-Rate-Limit-${rule}`);
      const stateHeader = response.headers.get(`X-Rate-Limit-${rule}-State`);

      if (limitHeader && stateHeader) {
        const [maxHits, period, restrictedTime] = limitHeader.split(":").map(Number);
        const [hits, statePeriod, restrictedTimeRemaining] = stateHeader.split(":").map(Number);

        limits[rule] = { maxHits, period, restrictedTime };
        state[rule] = { hits, period: statePeriod, restrictedTimeRemaining };
      }
    });

    return {
      policy,
      rules,
      limits,
      state,
      retryAfter: Number(response.headers.get("Retry-After")) || undefined,
    };
  }

  private async handleError(response: Response): Promise<never> {
    const error = (await response.json()) as POEError;
    throw new Error(error.error.message);
  }

  private async setTokens(data: POETokenResponse): Promise<void> {
    this.accessToken = data.access_token;
    this.refreshToken = data.refresh_token;

    if (data.expires_in) {
      this.tokenExpiry = new Date(Date.now() + data.expires_in * 1000);
    }

    // Store tokens in Supabase if user is logged in
    if (this.refreshToken) {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { error } = await supabase
          .from("profiles")
          .update({
            poe_account: {
              connected: true,
              accountName: data.username,
              lastSync: new Date().toISOString(),
            } as POEAccountData,
            poe_refresh_token: this.refreshToken,
          })
          .eq("id", user.id);

        if (error) {
          console.error("Failed to store POE refresh token:", error);
        }
      }
    }
  }

  private isTokenExpired(): boolean {
    return this.tokenExpiry ? this.tokenExpiry < new Date() : true;
  }
}
