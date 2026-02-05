import { createAlpacaProviders } from "../src/providers/alpaca";
import { createD1Client } from "../src/storage/d1/client";
import { createTrade, getTradeByAlpacaOrderId } from "../src/storage/d1/queries/trades";
import { generateId } from "../src/lib/utils";

interface LogTrade {
  symbol: string;
  side: "buy" | "sell";
  timestamp: string;
  reason?: string;
  size?: number;
}

const logTrades: LogTrade[] = [
  {
    symbol: "GOOG",
    side: "sell",
    timestamp: "2026-02-05T14:30:35.817Z",
    reason: "Pre-market plan: GOOG has been held for over 21 hours with a significant negative P&L of -6.0%. The position has deteriorated beyond the stop loss threshold, and there are no strong positive sentiment signals to justify holding further.",
  },
  {
    symbol: "DRTS",
    side: "buy",
    timestamp: "2026-02-05T14:30:35.949Z",
    size: 5000,
  },
  {
    symbol: "DRTS",
    side: "buy",
    timestamp: "2026-02-05T14:30:49.650Z",
    size: 5000,
  },
  {
    symbol: "IREN",
    side: "sell",
    timestamp: "2026-02-05T14:30:49.696Z",
    reason: "LLM recommendation: IREN is showing a significant loss and has weak sentiment at 27%. The deteriorating sentiment and loss suggest it's prudent to cut losses.",
  },
  {
    symbol: "ONDS",
    side: "sell",
    timestamp: "2026-02-05T14:32:42.297Z",
    reason: "Stop loss at -6.1%",
  },
  {
    symbol: "SNAP",
    side: "sell",
    timestamp: "2026-02-05T14:33:18.135Z",
    reason: "LLM recommendation: SNAP has been held for over 23 hours with a negative P&L of -4.9%. Sentiment is low at 22%, suggesting limited recovery potential in the short term.",
  },
  {
    symbol: "DRTS",
    side: "buy",
    timestamp: "2026-02-05T14:33:18.232Z",
    size: 5000,
  },
  {
    symbol: "CIFR",
    side: "sell",
    timestamp: "2026-02-05T14:35:21.140Z",
    reason: "Take profit at +4.7%",
  },
];

function findMatchingLogTrade(order: any): LogTrade | undefined {
  const orderTime = new Date(order.created_at).getTime();

  for (const logTrade of logTrades) {
    if (logTrade.symbol !== order.symbol) continue;
    if (logTrade.side !== order.side) continue;

    const logTime = new Date(logTrade.timestamp).getTime();
    const diffMs = Math.abs(orderTime - logTime);
    const diffSeconds = diffMs / 1000;

    if (diffSeconds < 60) {
      return logTrade;
    }
  }

  return undefined;
}

function deduplicateTrades(trades: LogTrade[]): LogTrade[] {
  const seen = new Set<string>();
  const deduplicated: LogTrade[] = [];

  for (const trade of trades) {
    const key = `${trade.symbol}-${trade.side}-${trade.timestamp}`;
    if (!seen.has(key)) {
      seen.add(key);
      deduplicated.push(trade);
    }
  }

  return deduplicated;
}

export async function backfillTrades(env: any): Promise<{ inserted: number; skipped: number }> {
  const alpaca = createAlpacaProviders(env);
  const db = createD1Client(env.DB);

  let inserted = 0;
  let skipped = 0;

  console.log("📊 Querying Alpaca for orders since 2026-02-04...");

  const orders = await alpaca.trading.listOrders({
    status: "all",
    after: "2026-02-04T00:00:00Z",
    limit: 500,
  });

  console.log(`📦 Found ${orders.length} orders from Alpaca`);

  const deduplicatedLogTrades = deduplicateTrades(logTrades);
  console.log(`📝 Deduplicated ${logTrades.length} log entries to ${deduplicatedLogTrades.length} unique trades`);

  for (const order of orders) {
    try {
      const existing = await getTradeByAlpacaOrderId(db, order.id);
      if (existing) {
        console.log(`⏭️  Skipping ${order.symbol} ${order.side} - already in DB`);
        skipped++;
        continue;
      }

      const logTrade = findMatchingLogTrade(order);

      await createTrade(db, {
        symbol: order.symbol,
        side: order.side,
        qty: parseFloat(order.qty),
        order_type: order.type,
        filled_qty: order.filled_qty ? parseFloat(order.filled_qty) : undefined,
        filled_avg_price: order.filled_avg_price ? parseFloat(order.filled_avg_price) : undefined,
        status: order.status,
        alpaca_order_id: order.id,
        reason: logTrade?.reason || "Backfilled from Alpaca",
      });

      const reasonText = logTrade?.reason ? ` (${logTrade.reason.substring(0, 50)}...)` : "";
      console.log(`✅ Inserted ${order.symbol} ${order.side}${reasonText}`);
      inserted++;
    } catch (error) {
      console.error(`❌ Error processing order ${order.id}:`, error);
    }
  }

  console.log(`\n📊 Backfill complete: ${inserted} inserted, ${skipped} skipped`);

  return { inserted, skipped };
}
