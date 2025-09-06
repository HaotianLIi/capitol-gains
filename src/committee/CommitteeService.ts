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

type CommitteeMember = z.infer<typeof committeeMemberSchema>
type CommitteeMembership = z.infer<typeof committeeMembershipSchema>
type Committee = z.infer<typeof committeeSchema>
type SubCommittee = z.infer<typeof subCommitteeSchema>

async function getCommitteeMembershipData() : Promise<CommitteeMembership> {
    const data  = await Bun.file("congress-legislators/committee-membership-current.yaml").text()
    return committeeMembershipSchema.parse(Bun.YAML.parse(data))
}

async function getCommitteeData() : Promise<Committee[]> {
    const data = await Bun.file("congress-legislators/committees-current.yaml").text()
    return Bun.YAML.parse(data).map(committeeSchema.parse)
}

async function getMembers(thomasId: string) : Promise<CommitteeMember[] | undefined> {
    const data = await getCommitteeMembershipData()
    return data[thomasId]
}

export type {
    CommitteeMember,
    CommitteeMembership,
    Committee,
    SubCommittee,
}

export {
    getMembers
}