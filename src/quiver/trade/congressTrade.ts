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

export async function getTradeByTransDate(
  trades: CongressTrade[],
  datePrefix: string
): Promise<CongressTrade[]> {
  const filterByTransDate = trades.filter(trade => trade.TransactionDate.startsWith(datePrefix));
  return filterByTransDate;
}

export async function getTradeByBioGuideID(
  trades: CongressTrade[],
  idPrefix: string
): Promise<CongressTrade[]> {
  return trades.filter(trade => trade.BioGuideID.startsWith(idPrefix));
}

export async function getTradeByTransactionType(
  trades: CongressTrade[],
  typePrefix: string
): Promise<CongressTrade[]> {
  return trades.filter(trade => trade.Transaction.startsWith(typePrefix));
}

export async function getTradeByRepresentative(
  trades: CongressTrade[],
  representativePrefix: string
): Promise<CongressTrade[]> {
  return trades.filter(trade => trade.Representative.startsWith(representativePrefix));
}

export async function getTradeByTicker(
  trades: CongressTrade[],
  tickerPrefix: string
): Promise<CongressTrade[]> {
  return trades.filter(trade => trade.Ticker.startsWith(tickerPrefix));
}

export async function getTradeByLastModified(
  trades: CongressTrade[],
  publishPrefix: string
): Promise<CongressTrade[]> {
  return trades.filter(trade => trade.last_modified.startsWith(publishPrefix));
}

export async function getTradeByReportDate(
  trades: CongressTrade[],
  reportDatePrefix: string
): Promise<CongressTrade[]> {
  return trades.filter(trade => trade.ReportDate.startsWith(reportDatePrefix));
}












