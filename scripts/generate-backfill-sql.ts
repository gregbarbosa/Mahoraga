import { readFileSync } from "fs";
import { join } from "path";
import { createAlpacaProviders } from "../src/providers/alpaca";
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

function escapeSQL(value: string | null | undefined): string {
  if (value === null || value === undefined) return "NULL";
  return `'${value.replace(/'/g, "''")}'`;
}

async function main() {
  const envPath = join(process.cwd(), ".dev.vars");
  const envContent = readFileSync(envPath, "utf-8");

  const env: any = {};
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const [key, ...valueParts] = trimmed.split("=");
    const value = valueParts.join("=").trim();
    if (key) {
      env[key] = value;
    }
  }

  const alpaca = createAlpacaProviders(env);

  console.log("📊 Querying Alpaca for orders since 2026-02-04...\n");

  const orders = await alpaca.trading.listOrders({
    status: "all",
    after: "2026-02-04T00:00:00Z",
    limit: 500,
  });

  console.log(`📦 Found ${orders.length} orders from Alpaca\n`);

  const deduplicatedLogTrades = deduplicateTrades(logTrades);
  console.log(`📝 Deduplicated ${logTrades.length} log entries to ${deduplicatedLogTrades.length} unique trades\n`);

  const sqlStatements: string[] = [];
  const matchedOrders = new Set<string>();

  for (const order of orders) {
    const logTrade = findMatchingLogTrade(order);

    if (logTrade) {
      matchedOrders.add(order.id);

      const reasonText = logTrade.reason || "Backfilled from Alpaca";
      console.log(`✅ Matched: ${order.symbol} ${order.side} - ${reasonText.substring(0, 60)}...`);
    }
  }

  console.log(`\n📊 Summary: ${matchedOrders.size} matched, ${orders.length - matchedOrders.size} unmatched\n`);

  console.log("📋 SQL INSERT statements:\n");
  console.log("-- Backfill trade history from logs + Alpaca");
  console.log(`-- Generated: ${new Date().toISOString()}\n`);

  for (const order of orders) {
    const logTrade = findMatchingLogTrade(order);
    const id = generateId();
    const now = new Date().toISOString();

    const reason = logTrade?.reason || "Backfilled from Alpaca";

    const sql = `INSERT INTO trades (id, approval_id, alpaca_order_id, symbol, side, qty, order_type, limit_price, stop_price, status, filled_qty, filled_avg_price, reason, created_at, updated_at)
  VALUES (
    '${id}',
    NULL,
    '${order.id}',
    '${order.symbol}',
    '${order.side}',
    ${order.qty},
    '${order.type}',
    ${order.limit_price ? order.limit_price : "NULL"},
    ${order.stop_price ? order.stop_price : "NULL"},
    '${order.status}',
    ${order.filled_qty || "NULL"},
    ${order.filled_avg_price || "NULL"},
    ${escapeSQL(reason)},
    '${order.created_at}',
    '${now}'
  );`;

    sqlStatements.push(sql);
  }

  for (const sql of sqlStatements) {
    console.log(sql);
  }

  console.log("\n");
  console.log("✅ Generated", sqlStatements.length, "SQL statements");
  console.log("📝 Run: wrangler d1 execute mahoraga-db --local --file=backfill-trades.sql");
  console.log("💾 Or run: wrangler d1 execute mahoraga-db --local --command=\"<sql>\"");
}

main().catch(console.error);
