import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { usePortfolioHistory } from "./usePortfolioHistory";

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("usePortfolioHistory", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("should start with empty arrays", () => {
    const { result } = renderHook(() => usePortfolioHistory("1D", false));

    expect(result.current.snapshots).toEqual([]);
    expect(result.current.benchmarks).toEqual([]);
    expect(result.current.isLoading).toBe(false);
  });

  it("should fetch portfolio history successfully", async () => {
    const mockSnapshots = [
      { timestamp: Date.now(), equity: 100000, pl: 0, pl_pct: 0 },
      { timestamp: Date.now() + 60000, equity: 100500, pl: 500, pl_pct: 0.5 },
    ];
    const mockBenchmarks = [{ symbol: "SPY", price: 450, change_pct: 1.2, beta: 1, price_history: [445, 450] }];

    mockFetch.mockResolvedValueOnce({
      json: async () => ({ ok: true, data: { snapshots: mockSnapshots, benchmarks: mockBenchmarks } }),
    });

    const { result } = renderHook(() => usePortfolioHistory("1D", true));

    await waitFor(() => {
      expect(result.current.snapshots).toEqual(mockSnapshots);
      expect(result.current.benchmarks).toEqual(mockBenchmarks);
      expect(result.current.error).toBeNull();
    });

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/history?period=1D&timeframe=15Min"),
      expect.any(Object)
    );
  });

  it("should use 1D timeframe for weekly period", async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => ({ ok: true, data: { snapshots: [], benchmarks: [] } }),
    });

    renderHook(() => usePortfolioHistory("1W", true));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/history?period=1W&timeframe=1D"),
        expect.any(Object)
      );
    });
  });

  it("should handle fetch error", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => usePortfolioHistory("1D", true));

    await waitFor(() => {
      expect(result.current.error).toBe("Failed to fetch portfolio history");
    });
  });

  it("should refetch when period changes", async () => {
    mockFetch.mockResolvedValue({
      json: async () => ({ ok: true, data: { snapshots: [], benchmarks: [] } }),
    });

    const { rerender } = renderHook(({ period }: { period: "1D" | "1W" | "1M" }) => usePortfolioHistory(period, true), {
      initialProps: { period: "1D" } as { period: "1D" | "1W" | "1M" },
    });

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    rerender({ period: "1W" });

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });
  });
});
