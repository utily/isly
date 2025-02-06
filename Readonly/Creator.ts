import type { Base } from "../Base"
import type { Readonly } from "."

export type Creator = {
	<V extends any | undefined = unknown | undefined, B extends Base<V> = Base<V>>(
		type: "readonly",
		base: B,
		name?: string
	): Readonly<V, B>
}
export namespace Creator {}
