import { Flaw } from "./Flaw"
import { Type } from "./Type"

export function string<T extends string = string>(...strings: string[]): Type<T> {
	const name = "string"
	function is(value: any | string): value is T {
		return typeof value == "string" && (strings.length == 0 || strings.includes(value))
	}
	function flaw(value: any): true | Flaw {
		return is(value) || { type: name }
	}
	return Type.create(name, is, flaw)
}
