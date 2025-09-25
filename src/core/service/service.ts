import { getMembers } from "../../committee/CommitteeServiceFacade.ts";
import {
    getCongressTradeByBioGuideId,
} from "../../quiver/trade/congressTrade.ts";
import {toTransaction, type Transaction, type TransactionSummary} from "../model/CommitteeTransactions.ts";

async function getTradesByCommittee(committeeId : string, startDate? : Date, endDate? : Date){
    const result = await Promise.all(
                getMembers(committeeId)
                .map(x => x.bioguide)
                .map(x => getCongressTradeByBioGuideId(x))
    ).then(x => x.flatMap(y => y))
        // .then(x => x.map(toTransaction))

    console.log(result.length)
    console.log(result.filter(x => x.TransactionDate).length)
}

function toTransactionSummary(data : any[]) : TransactionSummary {
    return Object.fromEntries(
        Object.entries(
            Object.groupBy(data, ({ Ticker }) => Ticker)
        ).map(([key, value]) => [key, value?.length ?? 0]))
}

console.log(
    await getTradesByCommittee("SSEG")
)