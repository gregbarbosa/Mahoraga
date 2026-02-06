import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useStatus } from "./useStatus";

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("useStatus", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("should start with null data and not loading", () => {
    const { result } = renderHook(() => useStatus(false));

    expect(result.current.data).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should fetch status successfully", async () => {
    const mockStatus = {
      account: { equity: 100000, cash: 50000, buying_power: 100000, portfolio_value: 100000 },
      positions: [],
      clock: { is_open: true, next_open: "", next_close: "" },
      config: {
        data_poll_interval_ms: 60000,
        analyst_interval_ms: 300000,
        max_position_value: 10000,
        max_positions: 5,
        min_sentiment_score: 0.6,
        min_analyst_confidence: 0.7,
        take_profit_pct: 5,
        stop_loss_pct: 3,
        position_size_pct_of_cash: 20,
        llm_model: "gpt-4o-mini",
      },
      signals: [],
      logs: [],
      costs: { total_usd: 0, calls: 0, tokens_in: 0, tokens_out: 0 },
      lastAnalystRun: Date.now(),
      lastResearchRun: Date.now(),
      signalResearch: {},
      positionResearch: {},
    };

    mockFetch.mockResolvedValueOnce({
      json: async () => ({ ok: true, data: mockStatus }),
    });

    const { result } = renderHook(() => useStatus(true));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(true);
    });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockStatus);
      expect(result.current.error).toBeNull();
      expect(result.current.isLoading).toBe(false);
    });
  });

  it("should handle fetch error", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useStatus(true));

    await waitFor(() => {
      expect(result.current.error).toBe("Connection failed - is the agent running?");
      expect(result.current.data).toBeNull();
    });
  });

  it("should handle API error response", async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => ({ ok: false, error: "Invalid token" }),
    });

    const { result } = renderHook(() => useStatus(true));

    await waitFor(() => {
      expect(result.current.error).toBe("Invalid token");
    });
  });

  it("should refetch when called", async () => {
    const mockStatus = {
      account: null,
      positions: [],
      clock: null,
      config: {} as any,
      signals: [],
      logs: [],
      costs: { total_usd: 0, calls: 0, tokens_in: 0, tokens_out: 0 },
      lastAnalystRun: 0,
      lastResearchRun: 0,
      signalResearch: {},
      positionResearch: {},
    };

    mockFetch
      .mockResolvedValueOnce({
        json: async () => ({ ok: true, data: mockStatus }),
      })
      .mockResolvedValueOnce({
        json: async () => ({
          ok: true,
          data: {
            ...mockStatus,
            account: { equity: 200000, cash: 100000, buying_power: 200000, portfolio_value: 200000 },
          },
        }),
      });

    const { result } = renderHook(() => useStatus(true));

    await waitFor(() => {
      expect(result.current.data).toEqual(mockStatus);
    });

    await result.current.refetch();

    await waitFor(() => {
      expect(result.current.data?.account?.equity).toBe(200000);
    });
  });
});
