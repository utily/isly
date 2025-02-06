import type { islyObject } from "."

export type Creator = {
	<V extends object = Record<string, any>>(
		type: "object",
		properties: islyObject.Properties<V>,
		name?: string
	): islyObject<V>
}
export namespace Creator {}
