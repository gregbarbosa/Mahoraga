import { useCallback, useState } from "react";
import { authFetch } from "../../lib/api";
import type { Trade } from "../../types";

interface UseTradeHistoryReturn {
  data: Trade[];
  isLoading: boolean;
  error: string | null;
  refetch: (limit?: number) => Promise<void>;
}

const API_BASE = "/api";

export function useTradeHistory(): UseTradeHistoryReturn {
  const [data, setData] = useState<Trade[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTrades = useCallback(async (limit: number = 50) => {
    setIsLoading(true);
    try {
      const res = await authFetch(`${API_BASE}/trades?limit=${limit}`);
      const json = await res.json();

      if (json.ok && json.data) {
        setData(json.data);
        setError(null);
      } else {
        setError(json.error || "Failed to fetch trade history");
      }
    } catch (err) {
      setError("Failed to fetch trade history");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    data,
    isLoading,
    error,
    refetch: fetchTrades,
  };
}
