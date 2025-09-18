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
  }
  const parsedData = CongressTradeArraySchema.parse(rawData);
  return parsedData;
}
await getCongressTradeData();

export async function filterTradeData(trades: CongressTrade[], input: string): Promise<CongressTrade[]> {
  return trades.filter(trade => trade.TransactionDate.startsWith(input));
}
// export async function getTradeByTransactionDate(trades: CongressTrade[], transactionDate: string): Promise<CongressTrade[]> {
//   return trades.filter(trade => trade.TransactionDate.startsWith(transactionDate));
// }
// export async function getTradeByHouse(trades: CongressTrade[], house: string): Promise<CongressTrade[]> {
//   return trades.filter(trade => trade.House.startsWith(house));
// }
// export async function getTradeByTicker(trades: CongressTrade[], ticker: string): Promise<CongressTrade[]> {
//   return trades.filter(trade => trade.Ticker.startsWith(ticker));
// }
// export async function getTradeByMonth(trades: CongressTrade[], yearMonth: string): Promise<CongressTrade[]> {
//   return trades.filter(trade => trade.TransactionDate.startsWith(yearMonth));
// }
// export async function getTradeByBioGuideID(trades: CongressTrade[], bioId: string): Promise<CongressTrade[]> {
//   return trades.filter(trade => trade.BioGuideID.startsWith(bioId));
// }
export async function getTradeByMonth(allTrade: CongressTrade[], yearMonth: string) {
  console.log(allTrade.length, yearMonth)
  return filterTradeData(allTrade, yearMonth);
}
