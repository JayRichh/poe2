import { ApiError, BaseResponse } from "~/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

// Generic type for request data
interface RequestData {
  [key: string]: unknown;
}

class ApiService {
  private static instance: ApiService;

  private constructor() {}

  static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error: ApiError = await response.json();
      throw error;
    }
    return response.json();
  }

  private createHeaders(): Headers {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    // Add auth token if needed
    // const token = localStorage.getItem('token');
    // if (token) headers.append('Authorization', `Bearer ${token}`);
    return headers;
  }

  async get<T extends BaseResponse>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "GET",
        headers: this.createHeaders(),
      });
      return this.handleResponse<T>(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async post<T extends BaseResponse>(endpoint: string, data: RequestData): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: this.createHeaders(),
        body: JSON.stringify(data),
      });
      return this.handleResponse<T>(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async put<T extends BaseResponse>(endpoint: string, data: RequestData): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "PUT",
        headers: this.createHeaders(),
        body: JSON.stringify(data),
      });
      return this.handleResponse<T>(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async delete<T extends BaseResponse>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "DELETE",
        headers: this.createHeaders(),
      });
      return this.handleResponse<T>(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: unknown): ApiError {
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
        code: (error as { status?: number }).status || 500,
      };
    }
    return {
      success: false,
      error: "An unexpected error occurred",
      code: 500,
    };
  }
}

export const apiService = ApiService.getInstance();
