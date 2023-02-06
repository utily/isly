import type { Flaw } from "./Flaw"
import { Type } from "./Type"

type OptionalKeys<T> = NonNullable<{ [K in keyof T]: undefined extends T[K] ? K : never }[keyof T]>
type RequiredKeys<T> = NonNullable<{ [K in keyof T]: undefined extends T[K] ? never : K }[keyof T]>

export namespace object {
	export type Properties<T> = { [P in OptionalKeys<T>]?: Type<T[P]> } & { [P in RequiredKeys<T>]: Type<T[P]> }
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

	const flaw = (value =>
		is(value)
			? undefined
			: {
					type: name(),
					flaws: globalThis.Object.entries<Type<any>>(p)
						.map<[string, undefined | Flaw]>(([property, type]) => [property, type.flaw((value as any)?.[property])])
						.map(([property, flaw]) => flaw && { property, ...flaw })
						.filter(flaw => flaw) as Flaw[],
			  }) as Type.FlawFunction<T>

	return Type.create(name, is, flaw)
}
