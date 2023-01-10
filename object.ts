import type { Flaw } from "./Flaw"
import { Type } from "./Type"

export namespace object {
	export type Properties<T> = { [P in keyof T]: Type<T[P]> }
}

export function object<T>(properties: object.Properties<T>, type?: string): Type<T> {
	const p = properties
	const name = () =>
		type ??
		JSON.stringify(
			globalThis.Object.fromEntries(
				globalThis.Object.entries(properties).map(([property, type]: [string, Type<any>]) => [property, type.name])
			)
		)
	function is(value: any | T): value is T {
		return (
			value &&
			typeof value == "object" &&
			!globalThis.Array.isArray(value) &&
			globalThis.Object.entries<Type<any>>(p).every(([property, type]) => type.is(value[property]))
		)
	}
	function flaw(value: any): true | Flaw {
		return (
			is(value) || {
				type: name(),
				flaws: globalThis.Object.entries<Type<any>>(p)
					.map<[string, true | Flaw]>(([property, type]) => [property, type.flaw(value[property])])
					.map(([property, flaw]) => flaw == true || { property, ...flaw })
					.filter(f => f != true) as Flaw[],
			}
		)
	}
	return Type.create(name, is, flaw)
}
