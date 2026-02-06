import { useCallback, useEffect, useRef, useState } from "react";
import { authFetch } from "../../lib/api";
import type { BenchmarkData, PortfolioSnapshot } from "../../types";

interface UsePortfolioHistoryReturn {
  snapshots: PortfolioSnapshot[];
  benchmarks: BenchmarkData[];
  isLoading: boolean;
  isInitialLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refetch: () => Promise<void>;
}

const API_BASE = "/api";
const POLL_INTERVAL = 60000;

export function usePortfolioHistory(
  period: "1D" | "1W" | "1M" = "1D",
  enabled: boolean = true
): UsePortfolioHistoryReturn {
  const [snapshots, setSnapshots] = useState<PortfolioSnapshot[]>([]);
  const [benchmarks, setBenchmarks] = useState<BenchmarkData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const hasFetchedSuccessfully = useRef(false);

  const fetchHistory = useCallback(async () => {
    if (!enabled) return;

    setIsLoading(true);
    try {
      const timeframe = period === "1D" ? "15Min" : "1D";
      const intraday = period === "1D" ? "&intraday_reporting=extended_hours" : "";
      const res = await authFetch(`${API_BASE}/history?period=${period}&timeframe=${timeframe}${intraday}`);
      const json = await res.json();

      if (json.ok && json.data?.snapshots) {
        setSnapshots(json.data.snapshots);
        setBenchmarks(json.data.benchmarks || []);
        setError(null);
        setLastUpdated(new Date());
        hasFetchedSuccessfully.current = true;
        setIsInitialLoading(false);
      } else {
        setError(json.error || "Failed to fetch portfolio history");
        setIsInitialLoading(false);
      }
    } catch (err) {
      setError("Failed to fetch portfolio history");
      setIsInitialLoading(false);
    } finally {
      setIsLoading(false);
    }
  }, [period, enabled]);

  useEffect(() => {
    if (!enabled) return;

    fetchHistory();
    const interval = setInterval(fetchHistory, POLL_INTERVAL);

    return () => clearInterval(interval);
  }, [enabled, fetchHistory]);

  return {
    snapshots,
    benchmarks,
    isLoading,
    isInitialLoading,
    error,
    lastUpdated,
    refetch: fetchHistory,
  };
}
