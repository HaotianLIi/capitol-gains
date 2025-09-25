import { getCongressTradeData } from "./quiver/trade/congressTrade";
import { testAllCases, testGetTradeByDate, testGetTradeByTransactionType } from "./quiver/trade/congressTradeFilter.test";

export const allTrades = await getCongressTradeData();

async function main() {

  if (process.argv.includes('--test')) {
    await testAllCases();
    // await testGetTradeByTransactionType();
    return;
  }
}
// Test samples
// Representative: "Lisa Mcclain"
// BioGuideID: "M001136"
// TransactionDate: "2025-08-13"
// Ticker: "FCX"
// Transaction: "Purchase"
// Range: "$1001 - $15000"
// House "Representatives"
// last_modified: "2025-09-15"
// TickerType: "ST"

await main();

// API request
// async function fetchCongressTrades() {
//   try {
//     console.log(`Making request to: ${endpointUrl}`);
//     const response = await axios.get<any[]>(endpointUrl, config);
//
//     const targetMonth = "2025-08";
//     const allTrades = response.data;
//     const monthlyTrades = allTrades.filter(trade => {
//       return trade.TransactionDate.startsWith(targetMonth);
//     });
//     console.log(`Found ${monthlyTrades.length} trades in ${targetMonth}`);
//     console.log("-----------------------------------");
//     // Get first 5
//     const firstFiveTrades = response.data.slice(0, 50);
//     // L33p through each trade and print it
//     firstFiveTrades.forEach((trade, index) => {
//       console.log(`Trade #${index + 1}:`);
//       console.log(trade);
//       console.log('---');
//     });
//     // // Total trade received
//     console.log(`Total trade: ${response.data.length}`);
//
//
//   } catch (error) {
//     console.error("Error fetching data");
//     if (axios.isAxiosError(error)) {
//       console.log(`Status Code: ${error.response?.status}`);
//       console.log(`Error Message: ${error.response?.data || error.message}`);
//     } else {
//       console.log("An unexpeceted error occurred: ", error);
//     }
//   }
// }
// await fetchCongressTrades();
