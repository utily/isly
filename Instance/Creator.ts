import type { Instance } from "."

export type Creator = {
	<V extends object = object>(type: "instance", constructor: new (...properties: any[]) => V, name: string): Instance<V>
}
export namespace Creator {}
