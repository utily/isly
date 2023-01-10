import { Type } from "./Type"

export function string<T extends string = string>(...strings: string[]): Type<T> {
	const name = "string"
	function is(value: any | string): value is T {
		return typeof value == "string" && (strings.length == 0 || strings.includes(value))
	}
	const flaw: Type.FlawFunction = value => (is(value) ? undefined : { type: name })

	return Type.create(name, is, flaw)
}
