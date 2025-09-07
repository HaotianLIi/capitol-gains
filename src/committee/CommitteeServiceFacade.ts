import {type Committee, committeeData, type CommitteeMember, committeeMembershipData} from "./internal/CommitteeService"

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
    Object.entries(result).forEach(([ k, _ ]) => result[k] = getCommitteeMemberships(k))

    return result as Record<string, Committee[]>
}

// helpers
function listToRecord(ls: string[]) : Record<string, unknown>{
    let result : Record<string, unknown> = {}
    for (let e of ls){
        result[e] = undefined
    }
    return result
}
