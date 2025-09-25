import type { CongressTrade } from "../types";
import { QUIVER_CONFIG, ENDPOINTS } from "../endpoints";


export async function getCongressTradeByDefault() {
  const url = ENDPOINTS.congressTradeByDefault();
  const response = await fetch(url, { headers: QUIVER_CONFIG.headers })
  const defaultData = await response.json() as CongressTrade[];

  console.log(defaultData);
  console.log(`${defaultData.length} trade has been fetched`)

  return defaultData
}

export async function getCongressTradeByBioGuideId(bioGuideId: string) {
  const url = ENDPOINTS.congressTradingByBioId(bioGuideId);
  const response = await fetch(url, { headers: QUIVER_CONFIG.headers })
  const data = await response.json() as CongressTrade[];

  console.log("Trade data: ", JSON.stringify(data, null, 2));

  // console.log(`Trade of \n ${data}`);
  console.log(`Get ${data.length} trades of bioGuideId: ${bioGuideId}`);
  return data;
}

export async function getCongressTradeByPageSize(pageSize: number) {
  console.log('Testing pagination with different page sizses')

  const allData: CongressTrade[] = [];
  const url = `https://api.quiverquant.com/beta/bulk/congresstrading?=page=1&page_size=${pageSize}&version=V2`;
  try {
    const response = await fetch(url, { headers: QUIVER_CONFIG.headers });
    const data = await response.json() as CongressTrade[];
    console.log(`PageSize: ${pageSize} -> Received: ${data.length} items`);
    allData.push(...data);

    const fs = require('fs');
    fs.writeFileSync(`page_${pageSize}_data_V2.json`,
      JSON.stringify({
        metadata: {
          pageSize: pageSize,
          itemCount: data.length,
          generated: new Date().toISOString()
        },
        trade: data
      }, null, 2)
    )
  } catch (error) {
    console.log('API error', error);
  }
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
