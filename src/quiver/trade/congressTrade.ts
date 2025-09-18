import { CongressTradeArraySchema, type CongressTrade } from "../types";
import { QUIVER_CONFIG, ENDPOINTS } from "../api_client";

export async function getCongressTradeData(): Promise<CongressTrade[]> {
  const response = await fetch(ENDPOINTS.CONGRESS_TRADING, {
    headers: QUIVER_CONFIG.headers
  })
  if (!response.ok) {
    throw new Error(`API error: ${response.status}, ${response.statusText}`)
  }

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
  }
  const parsedData = CongressTradeArraySchema.parse(rawData);
  return parsedData;
}

export async function filterTradeByTransDate(
  trades: CongressTrade[],
  datePrefix: string
): Promise<CongressTrade[]> {
  return trades.filter(trade => trade.TransactionDate.startsWith(datePrefix));
}

