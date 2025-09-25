import {differenceInDays, parseISO } from "date-fns";
import type {CongressTrade} from "../../quiver/types.ts";

export interface CommitteeTransactions {
    committeeId: string,
    summary : TransactionSummary,
    transactions: Transaction[],
}

export type TransactionSummary = Record<string, number>

export interface Transaction {
    ticker : string,
    bioguideId: string,
    type?: "Buy" | "Sell",
    disclosureDate?: Date,
    executionDate?: Date,
    // needs to be filled by stockmarket api
    executionDateClosePrice?: number,
    disclosureDateClosePrice?: number,
    recentClosePrice?: number,
}
// mappers
export function toTransaction(ct : CongressTrade) : Transaction {
    return {
        ticker : ct.Ticker,
        bioguideId: ct.BioGuideID,
        type: ct.Transaction === 'Purchase' ? "Buy" : "Sell",
        disclosureDate: ct.ReportDate ? parseISO(ct.ReportDate) : undefined,
        executionDate: ct.TransactionDate ? parseISO(ct.TransactionDate) : undefined
    }
}

// helper functions based on Transactions
export function getDisclosureDelayDay(t : Transaction){
    return differenceInDays(t.disclosureDate!!, t.executionDate!!)
}

export function getReturnRatio(t : Transaction){
    return  (t.recentClosePrice!! - t.executionDateClosePrice!!) / t.executionDateClosePrice!!
}