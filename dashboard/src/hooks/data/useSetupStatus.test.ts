import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useSetupStatus } from "./useSetupStatus";

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("useSetupStatus", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("should start with null data", () => {
    const { result } = renderHook(() => useSetupStatus());

    expect(result.current.data).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it("should fetch setup status successfully - configured", async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => ({ ok: true, data: { configured: true } }),
    });

    const { result } = renderHook(() => useSetupStatus());

    await waitFor(() => {
      expect(result.current.data).toEqual({ configured: true });
      expect(result.current.error).toBeNull();
    });

    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining("/api/setup/status"), expect.any(Object));
  });

  it("should fetch setup status successfully - not configured", async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => ({ ok: true, data: { configured: false } }),
    });

    const { result } = renderHook(() => useSetupStatus());

    await waitFor(() => {
      expect(result.current.data).toEqual({ configured: false });
    });
  });

  it("should handle fetch error", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useSetupStatus());

    await waitFor(() => {
      expect(result.current.error).toBe("Failed to check setup status");
    });
  });

  it("should refetch when called", async () => {
    mockFetch
      .mockResolvedValueOnce({
        json: async () => ({ ok: true, data: { configured: false } }),
      })
      .mockResolvedValueOnce({
        json: async () => ({ ok: true, data: { configured: true } }),
      });

    const { result } = renderHook(() => useSetupStatus());

    await waitFor(() => {
      expect(result.current.data).toEqual({ configured: false });
    });

    await result.current.refetch();

    await waitFor(() => {
      expect(result.current.data).toEqual({ configured: true });
    });
  });
});
