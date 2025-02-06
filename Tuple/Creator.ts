import type { Base } from "../Base"
import type { Tuple } from "."

export type Creator = {
	<V extends any[] = unknown[]>(type: "tuple", ...base: { [I in keyof V]: Base<V[I]> }): Tuple<V>
}
export namespace Creator {}
