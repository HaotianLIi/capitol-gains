import { CongressTradeArraySchema, type CongressTrade } from "../types";
import { QUIVER_CONFIG, ENDPOINTS } from "../api_client";


export async function verifyPagePrams(pageSize: number) {
  console.log('Testing pagination with different page sizses')

  const allData: CongressTrade[] = [];
  const url = `https://api.quiverquant.com/beta/bulk/congresstrading?=page=1&page_size=${pageSize}&version=V2`;
  try {
    const response = await fetch(url, { headers: QUIVER_CONFIG.headers });
    const data = await response.json() as CongressTrade[];
    console.log(`PageSize: ${pageSize} -> Received: ${data.length} items`);
    allData.push(...data);

    //Save to file for inspection
    const fs = require('fs');
    fs.writeFileSync(`page_${pageSize}_data_V2.txt`,
      `Version: V2 PageSize: ${pageSize}\nItems: ${data.length}\n\n${JSON.stringify(data, null, 2)}`
    );
  } catch (error) {
    console.log('API error', error);
  }
}


export async function getCongressTradeData(): Promise<CongressTrade[]> {
  const url = ENDPOINTS.congressTradingBySize(2);
  const response = await fetch(url, {
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
  console.log(`There are ${parsedData.length} of trades disdplayed`);
  return parsedData;
}

export async function getCongressTradeByTicket(ticker: string) {
  const url = ENDPOINTS.congressTradingByTicket(ticker);
  console.log("URL", url);
  const response = await fetch(url, {
    headers: QUIVER_CONFIG.headers,
  })
  if (!response.ok) {
    throw new Error(`API error of ${url}, StatusCode: ${response.status},Message: ${response.statusText}`)
  }

  const data = await response.json();
  console.log("Get trade by ticker: ", data)
  // console.log(`There are ${data.length} group of trade displayed`);
  return data;
}
