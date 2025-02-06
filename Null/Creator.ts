import type { Null } from "."

export type Creator = {
	<V extends null = null>(type: "null"): Null<V>
}
export namespace Creator {}
