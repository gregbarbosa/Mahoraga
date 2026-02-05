import { backfillTrades } from "./backfill-trades";
import { readFileSync } from "fs";
import { join } from "path";

async function main() {
  try {
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

    const dbPath = join(process.cwd(), ".wrangler/state/v3/d1/miniflare-D1DatabaseObject");
    const { D1Database } = await import("miniflare");

    const db = new D1Database(dbPath, true);
    env.DB = db;

    console.log("🚀 Starting trade backfill...");
    const result = await backfillTrades(env);
    console.log("\n✅ Backfill completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Backfill failed:", error);
    process.exit(1);
  }
}

main();
