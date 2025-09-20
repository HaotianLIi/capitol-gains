import { type TradeFilters, TransactionType } from "../types";

export const mockTrades: TradeFilters[] = [
  {
    representative: "Nacy Pelosi",
    ticker: "AAPL",
    transactionDate: "2023-01-15",
    transaction: TransactionType.purchase
  },
  {
    representative: "Mitch McConnell",
    ticker: "MSFT",
    transactionDate: "2023-02-20",
    transaction: TransactionType.sale_partial
  },
  {
    ticker: "TSLA",
    transactionDate: "2025-08-01",
    transaction: TransactionType.purchase
  }
];
