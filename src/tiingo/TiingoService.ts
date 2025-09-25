import { type TiigoEndOfDaySchema } from "./internal/types.ts";
import {addDays, formatISO} from "date-fns";
import { getHistory as _getHistory } from "./internal/ApiClient.ts";

export async function getHistory(ticker : string, startDate?: Date, endDate?: Date) : Promise<TiigoEndOfDaySchema[]> {
    const now = new Date(Date.now())
    const toISODate = (d : Date) => formatISO(d, { representation: "date"})

    // default to 30 days
    if (!startDate && !endDate)
        return _getHistory(ticker, toISODate(addDays(now, -30)), toISODate(now))
    if (startDate && !endDate)
        return _getHistory(ticker, toISODate(startDate), toISODate(now))
    if (!startDate && endDate)
        return _getHistory(ticker, toISODate(addDays(endDate, -30)), toISODate(endDate))

        return _getHistory(ticker, toISODate(startDate!!), toISODate(endDate!!))
}