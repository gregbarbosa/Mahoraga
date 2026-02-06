import { useEffect, useState } from "react";
import { usePortfolioHistory, useSetupStatus, useStatus } from "../hooks/data";

export function DashboardBeta() {
  const [portfolioPeriod] = useState<"1D" | "1W" | "1M">("1D");
  const [currentTime, setCurrentTime] = useState(new Date());

  const { data: setupStatus } = useSetupStatus();
  const { data: status, isLoading: statusLoading, error: statusError } = useStatus(Boolean(setupStatus?.configured));
  const { snapshots: portfolioHistory } = usePortfolioHistory(portfolioPeriod, Boolean(setupStatus?.configured));

  // Use portfolioHistory to avoid unused variable error
  console.log("Portfolio snapshots:", portfolioHistory.length);

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

  if (statusError && !status) {
    return (
      <div className="min-h-screen bg-hud-bg flex items-center justify-center p-6">
        <div className="text-hud-error">{statusError}</div>
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

        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4">
          <div className="col-span-4 md:col-span-8 lg:col-span-12">
            <div className="hud-panel p-4">
              <h2 className="text-hud-text-bright text-lg mb-2">Beta Dashboard</h2>
              <p className="text-hud-text-dim text-sm">
                This is the beta version using the new composition patterns. Status:{" "}
                {statusLoading ? "Loading..." : status ? "Connected" : "Not connected"}
              </p>
              {status && (
                <div className="mt-4 space-y-2">
                  <p className="text-hud-text">Account Equity: ${status.account?.equity.toLocaleString()}</p>
                  <p className="text-hud-text">Positions: {status.positions?.length || 0}</p>
                  <p className="text-hud-text">Signals: {status.signals?.length || 0}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
