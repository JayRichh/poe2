"use client";

import { useCallback, useState } from "react";

import { ApiError, BaseResponse } from "~/types";

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
}

export function useAsync<T extends BaseResponse>() {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async (asyncFunction: () => Promise<T>) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await asyncFunction();
      setState({
        data: response,
        loading: false,
        error: null,
      });
      return response;
    } catch (error) {
      const apiError: ApiError = {
        success: false,
        error: error instanceof Error ? error.message : "An unexpected error occurred",
      };
      setState((prev) => ({
        ...prev,
        loading: false,
        error: apiError,
      }));
      throw apiError;
    }
  }, []);

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}
