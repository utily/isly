import type { Base } from "../Base"
import type { Array } from "."

export type Creator = {
	<V = unknown, B extends Base<V> = Base<V>>(type: "array", base: B, ...restriction: Array.Restriction | []): Array<
		V,
		B
	>
}
export namespace Creator {}
