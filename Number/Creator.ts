import type { Base } from "../Base"
import type { Number } from "."

export type Creator = {
	<V extends number = number>(type: "number"): Number<V>
	<V extends number = number>(type: "number", ...restriction: [] | Number.Restriction<V> | Base.Restriction): Number<V>
}
export namespace Creator {}
