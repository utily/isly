export type Standard = typeof Standard.values[number]

export namespace Standard {
	export const values = ["ArrayBufferView", "ArrayBufferLike"] as const
	export function is(value: Standard | any): value is Standard {
		return typeof value == "string" && values.some(v => v == value)
	}
}
