import {getMembers} from "../../committee/CommitteeServiceFacade.ts";
import {getCongressTradeData, getTradeByBioGuideID} from "../../quiver/trade/congressTrade.ts";

async function getTradesByCommittee(committeeId : string, startDate? : Date, endDate? : Date){
    const data = await getCongressTradeData()

    // doing it this way because some functions are async when they don't need to be
    const result = await Promise.all(
                getMembers(committeeId)
                .map(x => x.bioguide)
                .map(x => getTradeByBioGuideID(data, x))
    )

    return result.flatMap(x => x)
}

console.log(
    Object.fromEntries(
        Object.entries(
            Object.groupBy(
                await getTradesByCommittee("SSEG"),
                ({ Ticker }) => Ticker
            )
        ).map(([key, value]) => [key, value?.length])
    )
)