import * as z from "zod";

export const PoliticalParty = z.enum(["R", "D", "I"]); //Republican, Democrat, Independent
export const ChamberSchema = z.enum(["Representatives", "Senate"]);
export const TransactionTypeEnum = z.enum(["Purchase", "Sale", "Sale (Partial)", "Sale (Full)", "Exchange"]);

export enum TransactionType {
  purchase = "Purchase",
  sale = "Sale",
  sale_partial = "Sale (Partial)",
  sale_full = "Sale (Full)",
  exchange = "Exchange"
}
// Development Schema (Strict)
export const CongressTradeSchema = z.object({
  Representative: z.string(),
  BioGuideID: z.string(),
  ReportDate: z.string(),
  TransactionDate: z.string(),
  Ticker: z.string(),
  Transaction: TransactionTypeEnum,
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
  representative: z.string().optional(),
  ticker: z.string().optional(),
  bioGuideID: z.string().optional(),
  reportDate: z.string().optional(),
  transactionDate: z.string().optional(),
  house: z.string().optional(),
  excessReturn: z.number().optional(),
  transaction: TransactionTypeEnum.optional()
})

export type TradeFilters = z.infer<typeof CongressTradeFilterSchema>;



