import { useCallback, useEffect, useState } from "react";
import { authFetch } from "../../lib/api";
import type { BenchmarkData, PortfolioSnapshot } from "../../types";

interface UsePortfolioHistoryReturn {
  snapshots: PortfolioSnapshot[];
  benchmarks: BenchmarkData[];
  isLoading: boolean;
  error: string | null;
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
  const [error, setError] = useState<string | null>(null);

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
      } else {
        setError(json.error || "Failed to fetch portfolio history");
      }
    } catch (err) {
      setError("Failed to fetch portfolio history");
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
    error,
    refetch: fetchHistory,
  };
}
