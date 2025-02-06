import type { Boolean } from "."

export type Creator = {
	<V extends boolean = boolean>(type: "boolean", allowed?: V): Boolean<V>
}
export namespace Creator {}
