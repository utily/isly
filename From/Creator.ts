import type { From } from "."

export type Creator = {
	<V = unknown>(
		type: "from",
		name: string,
		is: (value: V | any) => value is V,
		prune?: (value: V | any) => V | undefined
	): From<V>
}
export namespace Creator {}
