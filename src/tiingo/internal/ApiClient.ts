import {type TiigoEndOfDaySchema, tiigoEndOfDaySchema} from "./types.ts";

const API_KEY = Bun.env.TIINGO_API_KEY;
if (!API_KEY) throw new Error("TIINGO_API_KEY not found");

export const API_CONFIG = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${API_KEY}`
    }
}

async function testAPIKey(){
    return fetch("https://api.tiingo.com/api/test", API_CONFIG)
        .then(x => x.ok ? 200 : Error("failed api test"))
}

export async function getHistory(ticker : string, startDate?: string, endDate?: string) : Promise<TiigoEndOfDaySchema[]> {
    const root = `https://api.tiingo.com/tiingo/daily/${ticker}/prices`
    const param = (startDate: Date, endDate: Date) => `?startDate=${startDate}&endDate=${endDate}`

    return fetch(root + param, API_CONFIG)
        .then(x => x.json())
        .then((data : any) => data.map(tiigoEndOfDaySchema.parse))
}