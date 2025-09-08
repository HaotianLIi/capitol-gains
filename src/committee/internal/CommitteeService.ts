import * as z from "zod"

const committeeMemberSchema = z.object({
    name: z.string(),
    bioguide: z.string(),
    rank : z.number().int(),
    party: z.enum(["majority", "minority"]),
    title: z.string().optional()
})

const committeeMembershipSchema = z.record(
    z.string(), z.array(committeeMemberSchema)
)

const subCommitteeSchema = z.object({
    thomas_id: z.string(),
    name: z.string(),
    address: z.string().optional(),
    phone: z.string().optional(),
})

const committeeSchema =  z.object({
    thomas_id: z.string(),
    name: z.string(),
    // type: z.enum(["house", "senate"]),
    type: z.string(), //TODO: this should be narrowed to just either house or senate
    url: z.url().optional(),
    minority_url: z.string().optional(),
    house_committee_id: z.string().optional(),
    address: z.string().optional(),
    phone: z.string().optional(),
    res_url: z.string().optional(),
    jurisdiction: z.string().optional(),
    youtube_id: z.string().optional(),
    subcommittees: z.array(subCommitteeSchema).optional()
})

const legislatorSchema = z.object({
    id: z.object({
        bioguide: z.string(),
        thomas: z.string().optional(),
        lis: z.string().optional(),
        govtrack: z.coerce.string(),
        opensecrets: z.string().optional(),
        votesmart: z.coerce.string(),
        fec: z.string().array().optional(),
        cspan: z.coerce.string(),
    }),
    name: z.object({
        first:  z.string(),
        last: z.string(),
        official_full: z.string(),
    }),
    bio: z.object({
        birthDay: z.date().optional(),
        gender: z.enum(["M", "F"]),
    }),
    terms: z.object({
        type: z.string(),
        start: z.coerce.date(),
        end: z.coerce.date(),
        state: z.string().length(2),
        district: z.number().int().optional(),
        party: z.string(),
        state_rank: z.string().optional(),
        url: z.url().optional(),
        address: z.string().optional(),
        phone: z.string().optional(),
        fax: z.string().nullable().optional(),
        contact_form: z.string().optional(),
        office: z.string().optional(),
    }).array(),
})

type CommitteeMember = z.infer<typeof committeeMemberSchema>
type CommitteeMembership = z.infer<typeof committeeMembershipSchema>
type Committee = z.infer<typeof committeeSchema>
type SubCommittee = z.infer<typeof subCommitteeSchema>
type Legislator = z.infer<typeof legislatorSchema>

const COMMITTEE_MEMBERSHIP_CURRENT_PATH = process.cwd() + "/congress-legislators/committee-membership-current.yaml"
const COMMITTEE_CURRENT_PATH = process.cwd() + "/congress-legislators/committees-current.yaml"
const LEGISLATORS_CURRENT_PATH = process.cwd() + "/congress-legislators/legislators-current.yaml"

async function getCommitteeMembershipData() : Promise<CommitteeMembership> {
    const data  = await Bun.file(COMMITTEE_MEMBERSHIP_CURRENT_PATH).text()
    // @ts-ignore
    return committeeMembershipSchema.parse(Bun.YAML.parse(data))
}

async function getCommitteeData() : Promise<Committee[]> {
    const data = await Bun.file(COMMITTEE_CURRENT_PATH).text()
    // @ts-ignore
    return Bun.YAML.parse(data).map(committeeSchema.parse)
}

async function getLegislatorData() : Promise<Legislator[]> {
    const data = await Bun.file(LEGISLATORS_CURRENT_PATH).text()
    // @ts-ignore
    return Bun.YAML.parse(data).map(legislatorSchema.parse)
}


export const committeeData = await getCommitteeData()
export const committeeMembershipData = await getCommitteeMembershipData()
export const legislatorData = await getLegislatorData()

export type {
    CommitteeMember,
    CommitteeMembership,
    Committee,
    SubCommittee,
    Legislator,
}