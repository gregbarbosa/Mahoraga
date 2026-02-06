import { useCallback, useEffect, useState } from "react";
import { authFetch } from "../../lib/api";

interface SetupStatus {
  configured: boolean;
}

interface UseSetupStatusReturn {
  data: SetupStatus | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const API_BASE = "/api";

export function useSetupStatus(): UseSetupStatusReturn {
  const [data, setData] = useState<SetupStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSetupStatus = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await authFetch(`${API_BASE}/setup/status`);
      const json = await res.json();

      if (json.ok) {
        setData(json.data);
        setError(null);
      } else {
        setError(json.error || "Failed to check setup status");
      }
    } catch (err) {
      setError("Failed to check setup status");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSetupStatus();
  }, [fetchSetupStatus]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchSetupStatus,
  };
}
