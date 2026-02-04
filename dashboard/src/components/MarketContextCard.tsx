import clsx from "clsx";
import type { BenchmarkData } from "../types";
import { Sparkline } from "./LineChart";

interface MarketContextCardProps {
  benchmarks: BenchmarkData[];
}

export function MarketContextCard({ benchmarks }: MarketContextCardProps) {
  if (benchmarks.length === 0) {
    return <div className="text-hud-text-dim text-sm py-8 text-center">No benchmarks configured</div>;
  }

  const getBetaStrength = (beta: number): { label: string; color: string } => {
    if (Math.abs(beta) > 1.2) return { label: "High", color: "text-hud-error" };
    if (Math.abs(beta) > 0.8) return { label: "Med", color: "text-hud-warning" };
    return { label: "Low", color: "text-hud-success" };
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-hud-line/50">
            <th className="hud-label text-left py-2 px-2">Symbol</th>
            <th className="hud-label text-right py-2 px-2 hidden sm:table-cell">Price</th>
            <th className="hud-label text-right py-2 px-2">% Change</th>
            <th className="hud-label text-right py-2 px-2 hidden md:table-cell">Beta</th>
            <th className="hud-label text-center py-2 px-2">Trend</th>
          </tr>
        </thead>
        <tbody>
          {benchmarks.map((benchmark) => {
            const betaStrength = getBetaStrength(benchmark.beta);
            return (
              <tr key={benchmark.symbol} className="border-b border-hud-line/20 hover:bg-hud-line/10">
                <td className="hud-value-sm py-2 px-2 font-bold text-hud-primary">{benchmark.symbol}</td>
                <td className="hud-value-sm text-right py-2 px-2 hidden sm:table-cell">
                  ${benchmark.price.toFixed(2)}
                </td>
                <td
                  className={clsx(
                    "hud-value-sm text-right py-2 px-2",
                    benchmark.change_pct >= 0 ? "text-hud-success" : "text-hud-error"
                  )}
                >
                  {benchmark.change_pct >= 0 ? "+" : ""}
                  {benchmark.change_pct.toFixed(2)}%
                </td>
                <td className={clsx("hud-value-sm text-right py-2 px-2 hidden md:table-cell", betaStrength.color)}>
                  {benchmark.beta.toFixed(2)} ({betaStrength.label})
                </td>
                <td className="py-2 px-2">
                  <div className="flex justify-center">
                    <Sparkline data={benchmark.price_history} width={60} height={20} />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
