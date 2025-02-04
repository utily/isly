export type Class = typeof Class.values[number]
export namespace Class {
	export const values = [
		"any",
		"array",
		"boolean",
		// "from",
		"function",
		// "instance",
		"intersection",
		"null",
		"number",
		"object",
		"optional",
		"readonly",
		"record",
		"string",
		"tuple",
		// "type",
		"undefined",
		"union",
		"unknown",
	] as const
}
