import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useTradeHistory } from "./useTradeHistory";

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("useTradeHistory", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("should start with empty array", () => {
    const { result } = renderHook(() => useTradeHistory());

    expect(result.current.data).toEqual([]);
    expect(result.current.isLoading).toBe(false);
  });

  it("should fetch trade history successfully", async () => {
    const mockTrades = [
      {
        id: "1",
        symbol: "AAPL",
        side: "buy",
        qty: 10,
        order_type: "market",
        filled_qty: 10,
        filled_avg_price: 150,
        status: "filled",
        created_at: new Date().toISOString(),
      },
      {
        id: "2",
        symbol: "TSLA",
        side: "sell",
        qty: 5,
        order_type: "market",
        filled_qty: 5,
        filled_avg_price: 200,
        status: "filled",
        created_at: new Date().toISOString(),
      },
    ];

    mockFetch.mockResolvedValueOnce({
      json: async () => ({ ok: true, data: mockTrades }),
    });

    const { result } = renderHook(() => useTradeHistory());

    await result.current.refetch();

    await waitFor(() => {
      expect(result.current.data).toEqual(mockTrades);
      expect(result.current.error).toBeNull();
    });

    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining("/api/trades?limit=50"), expect.any(Object));
  });

  it("should fetch with custom limit", async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => ({ ok: true, data: [] }),
    });

    const { result } = renderHook(() => useTradeHistory());

    await result.current.refetch(100);

    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining("/api/trades?limit=100"), expect.any(Object));
  });

  it("should handle fetch error", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useTradeHistory());

    await result.current.refetch();

    await waitFor(() => {
      expect(result.current.error).toBe("Failed to fetch trade history");
    });
  });
});
