import * as z from "zod";

export const PoliticalPartySchema = z.enum(["R", "D", "I"]); // Republican, Democrat, Independent
export const ChamberSchema = z.enum(["Representatives", "Senate"]);
export const TransactionTypeSchema = z.enum(["Purchase", "Sale"]);

export const CongressTradeSchema = z.object({
  Representative: z.string(),
  BioGuideID: z.string(),
  ReportDate: z.string(), // When the report was filed
  TransactionDate: z.string(), // When the trade actually happened
  Ticker: z.string(),
  Transaction: TransactionTypeSchema,
  Range: z.string(),
  House: ChamberSchema,
  Amount: z.string(),
  Party: PoliticalPartySchema,
  last_modified: z.string(),
  TickerType: z.string(),
  Description: z.string().nullable(),
  ExcessReturn: z.number(), // Performance metric vs market
  PriceChange: z.number(), // Price changed since trade
  SPYChange: z.number(), // S&P 500 changed since trade
});

export type CongressTrade = z.infer<typeof CongressTradeSchema>;
export const validCongressTrade = CongressTradeSchema.parse(undefined)

