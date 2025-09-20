import * as z from "zod";

export const PoliticalPartySchema = z.enum(["R", "D", "I"]); //Republican, Democrat, Independent
export const ChamberSchema = z.enum(["Representatives", "Senate"]);
export const TransactionTypeSchema = z.enum(["Purchase", "Sale", "Sale (Partial)", "Sale (Full)", "Exchange"]);

// Development Schema (Strict)
export const CongressTradeSchema = z.object({
  Representative: z.string(),
  BioGuideID: z.string(),
  ReportDate: z.string(),
  TransactionDate: z.string(),
  Ticker: z.string(),
  Transaction: TransactionTypeSchema,
  Range: z.string(),
  House: ChamberSchema,
  last_modified: z.string(),
  TickerType: z.string(),
  Description: z.string().nullable(),
  ExcessReturn: z.number().nullable(),
  PriceChange: z.number().nullable(),
  SPYChange: z.number().nullable()
});

export const CongressTradeArraySchema = z.array(CongressTradeSchema);
export type CongressTrade = z.infer<typeof CongressTradeSchema>;

export const CongressTradeFilterSchema = z.object({
  Representative: z.string().optional,
  Ticker: z.string().optional,
  BioGuideID: z.string().optional,
  ReportDate: z.string().optional,
  TransactionDate: TransactionTypeSchema.optional,
  house: z.string().optional(),
  ExcessReturn: z.number().optional()
})

export type TradeFilters = z.infer<typeof CongressTradeFilterSchema>;

