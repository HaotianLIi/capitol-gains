import { z } from 'zod';

export type PoliticalParty = "R" | "D" | "I"; // Republican, Democrat, Independent
export type Chamber = "Representatives" | "Senate";
export type TransactionType = "Purchase" | "Sale";

export interface CongressTrade {
  Representative: string;
  BioGuideID: string;
  ReportDate: string; // When the report was filed
  TransactionDate: string; // When the trade actually happened
  Ticker: string;
  Transaction: TransactionType;
  Range: string;
  House: Chamber;
  Amount: string;
  Party: PoliticalParty;
  last_modified: string;
  TickerType: string;
  Description: string | null;
  ExcessReturn: number; // Performance metric vs market
  PriceChange: number; // Price changed since trade
  SPYChange: number; // S&P 500 changed since trade
}

