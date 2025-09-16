export type Chamber = "House" | "Senate" | "Executive" | "Joint"

export function toLegislatorType(c: Chamber): string {
  switch (c) {
    case "House":
      return "rep"
    case "Senate":
      return "sen"
    default:
      throw Error("Illegal Chamber to Legislator type mapping")
  }
}
