import { test } from "bun:test";
import { getCongressTradeData, getTradeByBioGuideID, getTradeByTransactionType } from "./congressTrade";
import { getTradeByTransDate } from "./congressTrade";
import { all } from "axios";

export async function sleep(s: number) {
  return new Promise(resolve => setTimeout(resolve, s));
}

export async function testGetTradeByDate() {
  console.log("Testing Date filter");

  const allTrade = await getCongressTradeData();
  const transactionDate = "2025-08-01";
  const result = await getTradeByTransDate(allTrade, transactionDate);

  console.log("Trade filtered by transactionDate ", transactionDate, "is as following: ");
  console.log(result, "There are ", result.length, "trade filtered by ", transactionDate);

  return result;
}

export async function testGetTradeByRepresentative() {
  console.log("Testing representative filter");

  const allTrade = await getCongressTradeData();
  const representative = "Lisa Mcclain";
  const result = await getTradeByBioGuideID(allTrade, representative);

  console.log("Trade filtered by representative ", representative, "is as following");
  console.log(result, "There are ", result.length, "trade filtered by ", representative)

  return result
}

export async function testGetTradeByTicker() {
  console.log("Testing Ticker filter");

  const allTrade = await getCongressTradeData();
  const ticker = "AIRE";
  const result = await getTradeByTransactionType(allTrade, ticker);

  console.log("Trade filtered by ticker ", ticker, "is as following");
  console.log(result, "There are ", result.length, "trade filtered by ", ticker)

  return result
}
export async function testGetTradeByLastModified() {
  console.log("Testing LastModified filter");

  const allTrade = await getCongressTradeData();
  const LastModified = "2025-09-10";
  const result = await getTradeByTransactionType(allTrade, LastModified);

  console.log("Trade filtered by bioGuideId ", LastModified, "is as following");
  console.log(result, "There are ", result.length, "trade filtered by ", LastModified)

  return result
}
export async function testGetTradeByReportDate() {
  console.log("Testing ReportDate filter");

  const allTrade = await getCongressTradeData();
  const reportDate = "2025-09-15";
  const result = await getTradeByTransactionType(allTrade, reportDate);

  console.log("Trade filtered by reportDate ", reportDate, "is as following");
  console.log(result, "There are ", result.length, "trade filtered by ", reportDate)

  return result
}
