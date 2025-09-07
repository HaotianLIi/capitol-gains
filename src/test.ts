import 'dotenv/config';

// Define the interface based on the response example
interface SenateTrade {
  Senator: string;
  ReportDate: string;
  Date: string;
  Ticker: string;
  Transaction: string;
  Range: string;
  District: string;
  House: string;
  Amount: number;  // Note: This is a number, not a string
  Party: string;
  last_modified: string | null;
}

const API_KEY = process.env.QUIVER_API_KEY;

if (!API_KEY) {
  console.error("❌ API KEY NOT FOUND");
  process.exit(1);
}

// Define the ticker and build the URL dynamically
const ticker = 'UNH'; // You can change this to any ticker
const endpointUrl = `https://api.quiverquant.com/beta/historical/senatetrading/${ticker}`;

// API request
async function fetchSenateTrades() {
  try {
    console.log(`📡 Making request to: ${endpointUrl}`);
    
    const response = await fetch(endpointUrl, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the response as an array of SenateTrade objects
    const data: SenateTrade[] = await response.json();
    
    console.log("✅ Success!");
    console.log("==========================================");
    console.log(`📊 Historical Senate Trades for ${ticker}`);
    console.log(`📈 Total Trades Found: ${data.length}`);
    console.log("==========================================");

    // Check if there are any trades
    if (data.length === 0) {
      console.log("No historical senate trades found for this ticker.");
      return;
    }

    // Display each trade
    data.forEach((trade, index) => {
      console.log(`\nTrade #${index + 1}:`);
      console.log(`  👤 Senator: ${trade.Senator} (${trade.Party})`);
      console.log(`  🏛️  Chamber: ${trade.House}`);
      console.log(`  📍 District: ${trade.District}`);
      console.log(`  ⚡ Action: ${trade.Transaction}`);
      console.log(`  💰 Amount: ${trade.Range} (Value: ${trade.Amount})`);
      console.log(`  📅 Trade Date: ${trade.Date}`);
      console.log(`  📋 Report Date: ${trade.ReportDate}`);
      console.log("------------------------------------------");
    });

  } catch (error) {
    console.error("❌ Error fetching data");
    if (error instanceof Error) {
      console.log(`   Error: ${error.message}`);
    } else {
      console.log('   Unexpected error:', error);
    }
  }
}

// Run the function
fetchSenateTrades();
