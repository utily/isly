import type { Base } from "../Base"
import type { Number } from "../Number"
import type { String } from "../String"
import type { Unknown } from "../Unknown"
import type { Record } from "."

export type Creator = {
	<
		V extends globalThis.Record<string, any> | globalThis.Record<number, any> | globalThis.Record<symbol, any> = Record<
			string,
			any
		>,
		KType extends keyof V extends string
			? String
			: keyof V extends number
			? Number
			: Unknown<symbol> = keyof V extends string ? String : keyof V extends number ? Number : Unknown<symbol>,
		VType extends Base<V[keyof V]> = Unknown<V[keyof V]>
	>(
		type: "record",
		key: KType,
		value: VType,
		name?: string
	): Record<V, KType, VType>
}
export namespace Creator {}
