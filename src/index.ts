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

const config = {
  headers: {
    'Accept': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  }
}

const endpointUrl = 'https://api.quiverquant.com/beta/live/congresstrading';
// API request
async function fetchCongressTrades(){
  try {
   console.log(`Making request to: ${endpointUrl}`);
   const response: AxiosResponse<any[]> = await axios.get(endpointUrl,config);

   console.log("Success");
   console.log("----------------")
   console.log(response.data[0]);
  } catch (error) {
    console.error("Error fetching data");
    if(axios.isAxiosError(error)){
      console.log(`Status Code: ${error.response?.status}`);
      console.log(`Error Message: ${error.response?.data || error.message}`);
    } else {
      console.log('An unexpeceted error occurred:', error);
    }
  }
}
fetchCongressTrades();
