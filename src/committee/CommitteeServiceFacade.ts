import {
    type Committee,
    committeeData,
    type CommitteeMember,
    committeeMembershipData,
    type Legislator,
    legislatorData,
    type Term,
} from "./internal/CommitteeService"
import type {Party} from "./Party.ts";
import {toLegislatorType} from "./Chamber.ts";

/**
 * Return all committee members that belongs to that committee by committeeId (thomasId)
 * @param committeeId (thomasId)
 */
export function getMembers(committeeId: string) : CommitteeMember[] {
    return committeeMembershipData[committeeId] ?? []
}

/**
 * Return all committees that a member belongs to via their bioguideId
 * @param bioguideId must be all capitalized
 */
export function getCommitteeMemberships(bioguideId: string) : Committee[] {
    const isInCommittee = (c: CommitteeMember[], bioguideId : string) =>
        !c ? false : c.filter(x => x.bioguide === bioguideId).length > 0

    const thomasIds = Object.keys(committeeMembershipData)
        .filter(x => isInCommittee(getMembers(x), bioguideId))

    return committeeData.filter(x => thomasIds.includes(x.thomas_id))
}

/**
 * Return all committees of all members that they belong to via their bioguideId
 * @param bioguideIds[] must be all capitalized
 */
export function getCommitteeMembershipsMany(...bioguideIds: string[]) : Record<string, Committee[]> {
    const result = listToRecord(bioguideIds)
    Object.keys(result).forEach(k => result[k] = getCommitteeMemberships(k))

    return result as Record<string, Committee[]>
}

export function getLegislatorsByParty(p : Party) : Legislator[] {
    return legislatorData.filter(x => findCurrentTerm(x.terms).party === p)
}

export function getLegislatorsByChamber(c : "House" | "Senate") : Legislator[] {
    return legislatorData.filter(x => findCurrentTerm(x.terms).type === toLegislatorType(c))
}

// helpers
function listToRecord(ls: string[]) : Record<string, unknown>{
    let result : Record<string, unknown> = {}
    for (let e of ls){
        result[e] = undefined
    }

    return result
}

function findCurrentTerm(ts : Term[]) : Term {
    const now = new Date(Date.now())
    return ts.find(x => x.start <= now && x.end >= now)!!
}
