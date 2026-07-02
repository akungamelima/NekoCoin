import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

const MNC_CONTRACT = "MNCXluck8888prosperity9999fortune7777sol";
const IS_PLACEHOLDER = MNC_CONTRACT.includes("luck8888");

interface PriceData {
  price: number;
  change24h: number;
}

export default function PriceTicker() {
  const [data, setData] = useState<PriceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (IS_PLACEHOLDER) {
      setLoading(false);
      return;
    }

    async function fetchPrice() {
      try {
        const res = await fetch(
          `https://api.dexscreener.com/latest/dex/tokens/${MNC_CONTRACT}`
        );
        const json = await res.json();
        const pair = json?.pairs?.[0];
        if (pair) {
          setData({
            price: parseFloat(pair.priceUsd ?? "0"),
            change24h: parseFloat(pair.priceChange?.h24 ?? "0"),
          });
        }
      } catch {
        // silently fail — token not live yet
      } finally {
        setLoading(false);
      }
    }

    fetchPrice();
    const interval = setInterval(fetchPrice, 30_000);
    return () => clearInterval(interval);
  }, []);

  if (IS_PLACEHOLDER || loading || !data) {
    return (
      <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono">
        <span className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-pulse" />
        <span className="text-primary/70 font-medium">$MNC</span>
        <span className="text-white/40">—</span>
        <span className="text-white/40 text-[10px]">Coming Soon</span>
      </div>
    );
  }

  const isPositive = data.change24h >= 0;

  return (
    <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono">
      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
      <span className="text-primary font-bold">$MNC</span>
      <span className="text-white font-semibold">
        ${data.price < 0.01
          ? data.price.toFixed(8)
          : data.price.toFixed(4)}
      </span>
      <span
        className={`flex items-center gap-0.5 font-semibold ${
          isPositive ? "text-green-400" : "text-red-400"
        }`}
      >
        {isPositive ? (
          <TrendingUp className="w-3 h-3" />
        ) : (
          <TrendingDown className="w-3 h-3" />
        )}
        {isPositive ? "+" : ""}
        {data.change24h.toFixed(2)}%
      </span>
    </div>
  );
}
