import { useCallback, useRef, useState } from "react";
import { authFetch } from "../../lib/api";
import type { Trade } from "../../types";

interface UseTradeHistoryReturn {
  data: Trade[];
  isLoading: boolean;
  isInitialLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refetch: (limit?: number) => Promise<void>;
}

const API_BASE = "/api";

export function useTradeHistory(): UseTradeHistoryReturn {
  const [data, setData] = useState<Trade[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const hasFetchedSuccessfully = useRef(false);

  const fetchTrades = useCallback(async (limit: number = 50) => {
    setIsLoading(true);
    try {
      const res = await authFetch(`${API_BASE}/trades?limit=${limit}`);
      const json = await res.json();

      if (json.ok && json.data) {
        setData(json.data);
        setError(null);
        setLastUpdated(new Date());
        hasFetchedSuccessfully.current = true;
        setIsInitialLoading(false);
      } else {
        setError(json.error || "Failed to fetch trade history");
        setIsInitialLoading(false);
      }
    } catch (err) {
      setError("Failed to fetch trade history");
      setIsInitialLoading(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    data,
    isLoading,
    isInitialLoading,
    error,
    lastUpdated,
    refetch: fetchTrades,
  };
}
