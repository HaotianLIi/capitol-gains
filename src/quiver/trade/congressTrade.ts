import { CongressTradeArraySchema, type CongressTrade } from "../types";
import { QUIVER_CONFIG, ENDPOINTS } from "../api_client";

export async function getCongressTradeData(): Promise<CongressTrade[]> {
  const response = await fetch(ENDPOINTS.CONGRESS_TRADING, {
    headers: QUIVER_CONFIG.headers
  })
  const rawData = await response.json();
  // Find invalid transaction values
  if (Array.isArray(rawData)) {
    const invalidTransactions = rawData
      .filter(trade => trade.Transaction && !["Purchase", "Sale", "Sale (Partial)", "Sale (Full)", "Exchange"].includes(trade.Transaction))
      .map(trade => ({
        representative: trade.Representative,
        transaction: trade.Transaction,
        ticker: trade.Ticker
      }));

    if (invalidTransactions.length > 0) {
      console.log("Found invalid transaction values: ", invalidTransactions)
    }
    console.log("Good Good")
  }
  const parsedData = CongressTradeArraySchema.parse(rawData);
  return parsedData;
}

export async function getTradeMonth(trades: CongressTrade[], yearMonth: string): Promise<CongressTrade[]> {
  return trades.filter(trade => trade.TransactionDate.startsWith(yearMonth));
}

export async function getLastMonthTrade() {
  const allTrade = await getCongressTradeData();
  const now = new Date();
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString().slice(0, 7); // YYYY-MM
  console.log("Last Month: ", lastMonth)
  return getTradeMonth(allTrade, lastMonth);
}


