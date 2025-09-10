import { type CongressTrade } from "./types";
import { quiverConfig, ENDPOINTS } from "./api_client";

export function getTodayDate(): string {
  return new Date().toISOString();
}

export async function getTodaysTrades(): Promise<CongressTrade[]> {
  console.log("Fetching trades from Quiver API")

}
