import type { Unknown } from "."

export type Creator = {
	<V extends undefined = undefined>(type: "unknown", name?: string): Unknown<V>
}
export namespace Creator {}
