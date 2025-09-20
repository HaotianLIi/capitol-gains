import { TransactionType } from "../types";

export const mockFilterTrades = [
  {
    name: "Single filter - AAPL ticker",
    filters: {
      ticker: "AAPL"
    },
  },
  {
    name: "Mutiple filter - AAPL transactions",
    filters: {
      ticker: "AAPL",
      transaction: TransactionType.purchase
    }
  },
  {
    name: "Mutiple filter - TSLA 2025-08-01 Purchase",
    filters: {
      ticker: "TSLA",
      transactionDate: "2025-08-01",
      transaction: TransactionType.purchase
    }
  },
  {
    name: "Mutiple filter - Mitch McConnell MSFT 2023-02-20 Sale (Partial)",
    filters: {
      representative: "Mitch McConnell",
      ticker: "MSFT",
      transactionDate: "2023-02-20",
      transaction: TransactionType.sale_partial
    }
  }
];
