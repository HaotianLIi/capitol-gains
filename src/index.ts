import axios from 'axios';

interface CongressTrade{
  Representativ: string;
  BioGuideID: string;
  ReportDate: string;
  TransactionDate: string;
  Tikcer: string;
  Transaction: string;
  Range: string;
  House: string;
  Party: string;
}

const API_KEY = process.env.QUIVER_API_KEY;

if(!API_KEY){
 console.error("API KEY NOT FOUND");
}

const ENDPOINT_URL = 'https://api.quiverquant.com/beta/live/congresstrading';

async function main(){
  const response = await axios.get<CongressTrade[]>(ENDPOINT_URL,{
    header: {
     'Accept': 'application/json',
     'Authorization': `Bearer ${API_KEY}`
    }
  });
  
  const trades = response.data;

  trades.slice(0, 5).forEach((trade, i) => {
      console.log(`#${i + 1}: ${trade.Representative} (${trade.Party})`);
      console.log(`   • ${trade.Transaction} of ${trade.Ticker}`);
      console.log(`   • Amount: ${trade.Range}`);
      console.log(`   • Date: ${trade.TransactionDate}`);
      console.log('');
    });

    console.log(`📊 Fetched ${trades.length} trades total.`);
}
await main();
