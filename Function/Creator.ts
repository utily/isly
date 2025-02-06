import type { Function } from "."

export type Creator = {
	<V extends globalThis.Function = globalThis.Function>(type: "function", name?: string): Function<V>
}
export namespace Creator {}
