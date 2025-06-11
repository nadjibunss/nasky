import { useState } from 'react';

interface ApiCallResult<T> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
  execute: (...args: any[]) => Promise<void>;
}

export const useApiCall = <T,>(apiFunction: (...args: any[]) => Promise<T>): ApiCallResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = async (...args: any[]) => {
    try {
      setIsLoading(true);
      setError(null);
      console.log('Executing API call with args:', args);

      const result = await apiFunction(...args);
      console.log('API call successful:', result);

      setData(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      console.error('API call failed:', errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, execute };
};