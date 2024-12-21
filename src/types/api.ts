export interface BaseResponse {
  success: boolean;
}

export interface ApiError {
  success: false;
  error: string;
}
