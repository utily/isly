import type { Base } from "../Base"
import type { String } from "."

export type Creator = {
	<V extends string = string>(type: "string"): String<V>
	<V extends string = string>(type: "string", ...restriction: [] | String.Restriction<V> | Base.Restriction): String<V>
}
export namespace Creator {}
