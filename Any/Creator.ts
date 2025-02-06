import type { Any } from "."

export type Creator = {
	<V = any>(type: "any", name?: string): Any<V>
}
export namespace Creator {}
