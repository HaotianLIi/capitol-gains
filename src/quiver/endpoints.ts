const API_KEY = Bun.env.QUIVER_API_KEY;
if (!API_KEY) throw new Error("QUIVER_API_KEY not found");

export const QUIVER_CONFIG = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  }
}

export const ENDPOINTS = {
  congressTradeByDefault: () =>
    `https://api.quiverquant.com/beta/bulk/congresstrading`,
  congressTradingBySize: (pageSize: number) =>
    `https://api.quiverquant.com/beta/bulk/congresstrading?=page=1&page_size=${pageSize}&version=V2`,
  congressTradingByTicket: (ticker: string) =>
    `https://api.quiverquant.com/beta/historical/congresstrading/${ticker}`,
  congressTradingByBioId: (bioGuideId: string) =>
    `https://api.quiverquant.com/beta/bulk/congresstrading?bioguide_id=${bioGuideId}`
}



