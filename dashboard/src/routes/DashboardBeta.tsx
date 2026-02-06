import { useCallback, useEffect, useRef, useState } from "react";
import { useRelativeTime } from "../hooks";
import { usePortfolioHistory, useSetupStatus, useStatus, useTradeHistory } from "../hooks/data";
import type { Status } from "../types";

// 10 minutes in milliseconds
const STALE_THRESHOLD_MS = 10 * 60 * 1000;

interface ConnectionStatusProps {
  lastUpdated: Date | null;
  error: string | null;
  isInitialLoading: boolean;
}

function ConnectionStatus({ lastUpdated, error, isInitialLoading }: ConnectionStatusProps) {
  if (isInitialLoading) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-hud-text-dim animate-pulse" />
        <span className="text-hud-text-dim text-sm">Connecting...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-hud-error" />
        <span className="text-hud-error text-sm">Error</span>
      </div>
    );
  }

  if (!lastUpdated) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-hud-text-dim" />
        <span className="text-hud-text-dim text-sm">Not connected</span>
      </div>
    );
  }

  const isStale = Date.now() - lastUpdated.getTime() > STALE_THRESHOLD_MS;

  if (isStale) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-hud-warning animate-pulse" />
        <span className="text-hud-warning text-sm">Stale</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="w-2 h-2 rounded-full bg-hud-success" />
      <span className="text-hud-success text-sm">Connected</span>
    </div>
  );
}

interface RefreshButtonProps {
  onRefresh: () => void;
  isLoading: boolean;
  label: string;
}

function RefreshButton({ onRefresh, isLoading, label }: RefreshButtonProps) {
  const [isDebounced, setIsDebounced] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = useCallback(() => {
    if (isDebounced || isLoading) return;

    onRefresh();
    setIsDebounced(true);

    // Debounce for 2 seconds
    timeoutRef.current = setTimeout(() => {
      setIsDebounced(false);
    }, 2000);
  }, [isDebounced, isLoading, onRefresh]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <button
      onClick={handleClick}
      disabled={isDebounced || isLoading}
      className="hud-label text-hud-primary hover:text-hud-text disabled:text-hud-text-dim disabled:cursor-not-allowed transition-colors"
    >
      {isLoading ? "⟳" : "↻"} {label}
    </button>
  );
}

interface DataSectionProps {
  title: string;
  children: React.ReactNode;
  lastUpdated: Date | null;
  onRefresh: () => void;
  isLoading: boolean;
  error: string | null;
  connectionStatus: React.ReactNode;
}

function DataSection({
  title,
  children,
  lastUpdated,
  onRefresh,
  isLoading,
  error,
  connectionStatus,
}: DataSectionProps) {
  const relativeTime = useRelativeTime(lastUpdated);

  return (
    <div className="hud-panel p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-hud-text-bright font-medium">{title}</h3>
        {connectionStatus}
      </div>

      <div className="flex items-center gap-4 text-sm">
        <RefreshButton onRefresh={onRefresh} isLoading={isLoading} label="Refresh" />
        {lastUpdated && <span className="text-hud-text-dim">Updated {relativeTime}</span>}
      </div>

      {error && <div className="text-hud-error text-sm p-2 bg-hud-error/10 rounded">{error}</div>}

      <div className="pt-2">{children}</div>
    </div>
  );
}

function StatusContent({ status }: { status: Status | null }) {
  if (!status) {
    return <p className="text-hud-text-dim">No data available</p>;
  }

  return (
    <div className="space-y-2">
      <p className="text-hud-text">
        Account Equity: <span className="text-hud-text-bright">${status.account?.equity.toLocaleString()}</span>
      </p>
      <p className="text-hud-text">
        Positions: <span className="text-hud-text-bright">{status.positions?.length || 0}</span>
      </p>
      <p className="text-hud-text">
        Signals: <span className="text-hud-text-bright">{status.signals?.length || 0}</span>
      </p>
      <p className="text-hud-text">
        Market:{" "}
        <span className={status.clock?.is_open ? "text-hud-success" : "text-hud-error"}>
          {status.clock?.is_open ? "OPEN" : "CLOSED"}
        </span>
      </p>
    </div>
  );
}

function PortfolioContent({ snapshots }: { snapshots: { timestamp: number; equity: number }[] }) {
  if (snapshots.length === 0) {
    return <p className="text-hud-text-dim">No portfolio history available</p>;
  }

  const latest = snapshots[snapshots.length - 1];
  const first = snapshots[0];
  const change = latest.equity - first.equity;
  const changePct = first.equity > 0 ? (change / first.equity) * 100 : 0;

  return (
    <div className="space-y-2">
      <p className="text-hud-text">
        Data points: <span className="text-hud-text-bright">{snapshots.length}</span>
      </p>
      <p className="text-hud-text">
        Latest equity: <span className="text-hud-text-bright">${latest.equity.toLocaleString()}</span>
      </p>
      <p className="text-hud-text">
        Period change:{" "}
        <span className={change >= 0 ? "text-hud-success" : "text-hud-error"}>
          {change >= 0 ? "+" : ""}
          {changePct.toFixed(2)}%
        </span>
      </p>
    </div>
  );
}

function TradesContent({ trades }: { trades: { length: number } }) {
  return (
    <div className="space-y-2">
      <p className="text-hud-text">
        Total trades: <span className="text-hud-text-bright">{trades.length}</span>
      </p>
      <p className="text-hud-text-dim text-sm">Click refresh to load latest trades</p>
    </div>
  );
}

export function DashboardBeta() {
  const [currentTime, setCurrentTime] = useState(new Date());

  const { data: setupStatus } = useSetupStatus();

  const {
    data: status,
    isInitialLoading: statusInitialLoading,
    isLoading: statusLoading,
    error: statusError,
    lastUpdated: statusLastUpdated,
    refetch: refetchStatus,
  } = useStatus(Boolean(setupStatus?.configured));

  const {
    snapshots: portfolioHistory,
    isInitialLoading: portfolioInitialLoading,
    isLoading: portfolioLoading,
    error: portfolioError,
    lastUpdated: portfolioLastUpdated,
    refetch: refetchPortfolio,
  } = usePortfolioHistory("1D", Boolean(setupStatus?.configured));

  const {
    data: trades,
    isInitialLoading: tradesInitialLoading,
    isLoading: tradesLoading,
    error: tradesError,
    lastUpdated: tradesLastUpdated,
    refetch: refetchTrades,
  } = useTradeHistory();

  // Load trades on initial mount
  useEffect(() => {
    if (setupStatus?.configured && tradesInitialLoading) {
      refetchTrades();
    }
  }, [setupStatus?.configured, tradesInitialLoading, refetchTrades]);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!setupStatus?.configured) {
    return (
      <div className="min-h-screen bg-hud-bg flex items-center justify-center p-6">
        <div className="text-hud-text-bright">Setup required...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hud-bg">
      <div className="max-w-[1920px] mx-auto p-4">
        <header className="sticky top-0 z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 pb-3 border-b border-hud-line bg-hud-bg">
          <div className="flex items-center gap-4 md:gap-6">
            <div className="flex items-baseline gap-2">
              <span className="text-xl md:text-2xl font-light tracking-tight text-hud-text-bright">MAHORAGA</span>
              <span className="hud-label">v2 BETA</span>
            </div>
            <span className="text-hud-primary">[BETA]</span>
          </div>
          <div className="flex items-center gap-3 md:gap-6">
            <span className="hud-value-sm font-mono">{currentTime.toLocaleTimeString("en-US", { hour12: false })}</span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <DataSection
            title="Status"
            lastUpdated={statusLastUpdated}
            onRefresh={refetchStatus}
            isLoading={statusLoading}
            error={statusError}
            connectionStatus={
              <ConnectionStatus
                lastUpdated={statusLastUpdated}
                error={statusError}
                isInitialLoading={statusInitialLoading}
              />
            }
          >
            <StatusContent status={status} />
          </DataSection>

          <DataSection
            title="Portfolio History"
            lastUpdated={portfolioLastUpdated}
            onRefresh={refetchPortfolio}
            isLoading={portfolioLoading}
            error={portfolioError}
            connectionStatus={
              <ConnectionStatus
                lastUpdated={portfolioLastUpdated}
                error={portfolioError}
                isInitialLoading={portfolioInitialLoading}
              />
            }
          >
            <PortfolioContent snapshots={portfolioHistory} />
          </DataSection>

          <DataSection
            title="Trade History"
            lastUpdated={tradesLastUpdated}
            onRefresh={() => refetchTrades()}
            isLoading={tradesLoading}
            error={tradesError}
            connectionStatus={
              <ConnectionStatus
                lastUpdated={tradesLastUpdated}
                error={tradesError}
                isInitialLoading={tradesInitialLoading}
              />
            }
          >
            <TradesContent trades={trades} />
          </DataSection>
        </div>

        <div className="mt-8 p-4 hud-panel">
          <h3 className="text-hud-text-bright font-medium mb-2">About Beta Dashboard</h3>
          <p className="text-hud-text-dim text-sm">
            This beta version uses new composition patterns with stale-while-revalidate data fetching. Connection status
            indicators show green (connected), yellow (stale &gt;10min), or red (error). Each section has independent
            refresh controls with 2-second debounce.
          </p>
        </div>
      </div>
    </div>
  );
}
