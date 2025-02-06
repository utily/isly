import type { Undefined } from "."

export type Creator = {
	<V extends undefined = undefined>(type: "undefined", name?: string): Undefined<V>
}
export namespace Creator {}
