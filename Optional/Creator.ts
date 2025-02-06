import type { Base } from "../Base"
import type { Optional } from "."

export type Creator = {
	<V extends any | undefined = unknown | undefined, B extends Base<V> = Base<V>>(
		type: "optional",
		base: B,
		name?: string
	): Optional<V, B>
}
export namespace Creator {}
