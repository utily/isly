export type Class = typeof Class.values[number]
export namespace Class {
	export const values = [
		"any",
		"array",
		"boolean",
		"from",
		"function",
		"instance",
		"intersection",
		"lazy",
		"null",
		"number",
		"object",
		"optional",
		"readonly",
		"record",
		"string",
		"tuple",
		"undefined",
		"union",
		"unknown",
	] as const
	export interface Value {
		any: any
		array: unknown[]
		boolean: boolean
		from: unknown
		// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
		function: Function
		instance: object
		intersection: unknown
		lazy: unknown
		null: null
		number: number
		object: Record<string | number | symbol, unknown>
		optional: unknown | undefined
		readonly: Readonly<unknown>
		record: Record<string | number | symbol, unknown>
		string: string
		tuple: Record<number, unknown>
		undefined: undefined
		union: unknown[]
		unknown: unknown
	}
}
