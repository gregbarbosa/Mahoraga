import { useCallback, useEffect, useRef, useState } from "react";
import { authFetch } from "../../lib/api";
import type { Status } from "../../types";

interface UseStatusReturn {
  data: Status | null;
  isLoading: boolean;
  isInitialLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refetch: () => Promise<void>;
}

const API_BASE = "/api";
const POLL_INTERVAL = 5000;

export function useStatus(enabled: boolean = true): UseStatusReturn {
  const [data, setData] = useState<Status | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const hasFetchedSuccessfully = useRef(false);

  const fetchStatus = useCallback(async () => {
    if (!enabled) return;

    setIsLoading(true);
    try {
      const res = await authFetch(`${API_BASE}/status`);
      const json = await res.json();

      if (json.ok) {
        setData(json.data);
        setError(null);
        setLastUpdated(new Date());
        hasFetchedSuccessfully.current = true;
        setIsInitialLoading(false);
      } else {
        setError(json.error || "Failed to fetch status");
        setIsInitialLoading(false);
      }
    } catch (err) {
      setError("Connection failed - is the agent running?");
      setIsInitialLoading(false);
    } finally {
      setIsLoading(false);
    }
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    fetchStatus();
    const interval = setInterval(fetchStatus, POLL_INTERVAL);

    return () => clearInterval(interval);
  }, [enabled, fetchStatus]);

  return {
    data,
    isLoading,
    isInitialLoading,
    error,
    lastUpdated,
    refetch: fetchStatus,
  };
}
