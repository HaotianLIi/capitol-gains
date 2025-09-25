import * as z from 'zod'

export const tiigoEndOfDaySchema = z.object({
    date : z.coerce.date().optional(),
    open : z.number().optional(),
    high : z.number().optional(),
    low : z.number().optional(),
    close: z.number().optional(),
    volume: z.number().optional(),
    adjOpen: z.number().optional(),
    adjClose: z.number().optional(),
    adjHigh: z.number().optional(),
    adjLow: z.number().optional(),
    divCash: z.number().optional(),
    splitFactor : z.number().optional(),
})

export type TiigoEndOfDaySchema = z.infer<typeof tiigoEndOfDaySchema>

