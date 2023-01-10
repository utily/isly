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
	const is = (value =>
		value &&
		typeof value == "object" &&
		!globalThis.Array.isArray(value) &&
		globalThis.Object.entries<Type<any>>(p).every(([property, type]) => type.is(value[property]))) as Type.IsFunction<T>

	const flaw: Type.FlawFunction = (value: any) =>
		is(value)
			? undefined
			: {
					type: name(),
					flaws: globalThis.Object.entries<Type<any>>(p)
						.map<[string, undefined | Flaw]>(([property, type]) => [property, type.flaw(value?.[property])])
						.map(([property, flaw]) => flaw && { property, ...flaw })
						.filter(flaw => flaw) as Flaw[],
			  }

	return Type.create(name, is, flaw)
}
