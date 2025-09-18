import { getCongressTradeData } from "./congressTrade";
import { filterTradeByTransDate } from "./congressTrade";

export async function sleep(s: number) {
  return new Promise(resolve => setTimeout(resolve, s));
}

export async function testDateFilter() {
  console.log("Testing Date filter");

  const allTrade = await getCongressTradeData();
  const transactionDate = "2025-08-01";
  const aug_first = await filterTradeByTransDate(allTrade, transactionDate);

  console.log("The trade for", transactionDate, "is as following: ");
  console.log(aug_first, "There are ", aug_first.length, "trade being made at ", transactionDate);

  return aug_first;
}
