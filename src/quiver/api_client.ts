const API_KEY = Bun.env.QUIVER_API_KEY;
if (!API_KEY) throw new Error("QUIVER_API_KEY not found");

export const quiverConfig = {
  headers: {
    'Accept': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  }
}

export const ENDPOINTS = {
  CONGRESS_TRADING: 'https://api.quiverquant.com/beta/live/congresstrading',
  BULK_TRADING: 'https://api.quiverquant.com/beta/bulk/congresstrading'

}
