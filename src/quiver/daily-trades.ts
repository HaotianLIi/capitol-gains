import { CongressTradeSchema, type CongressTrade } from "./types";
import { QUIVER_CONFIG, ENDPOINTS } from "./api_client";

export async function getCongressTradeData(): Promise<CongressTrade> {
  console.log("Fetching raw data from CongressTrade api");

  const response = await fetch(ENDPOINTS.CONGRESS_TRADING, {
    headers: QUIVER_CONFIG.headers
  })
  const rawData = await response.json();
  return CongressTradeSchema.parse(rawData)
}


