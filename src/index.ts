import { getCongressTradeData } from "./quiver/daily-trades";

async function main() {
  console.log("Testing")
  const data = await getCongressTradeData()

  console.log("CongressTradeData: ", data)
}

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
//     // Loop through each trade and print it
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
