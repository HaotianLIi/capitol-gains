import { type CongressTrade, type TradeFilters, CongressTradeFilterSchema } from "../types";

export function filterTrades(trades: CongressTrade[], filters: TradeFilters): CongressTrade[] {
  if (!filters || Object.keys(filters).length === 0) {
    return trades;
  }
  return trades.filter(trade => {
    if (filters.ticker && trade.Ticker !== filters.ticker) return false;
    if (filters.representative && trade.Representative !== filters.representative) return false;
    if (filters.bioGuideID && trade.BioGuideID !== filters.bioGuideID) return false;
    if (filters.transactionDate && trade.TransactionDate !== filters.transactionDate) return false;
    if (filters.reportDate && trade.ReportDate !== filters.reportDate) return false;
    if (filters.house && !trade.House.includes(filters.house)) return false;
    return true;
  })
}

export function validateFilters(input: any): TradeFilters {
  try {
    return CongressTradeFilterSchema.parse(input);
  } catch (error) {
    console.warn("Invalid filters provided, using empty filters", error)
    return {};
  }
} 
