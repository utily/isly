import type { Flaw } from "./Flaw"
import { Type } from "./Type"

type OptionalKeys<T> = NonNullable<{ [K in keyof T]: undefined extends T[K] ? K : never }[keyof T]>
type RequiredKeys<T> = NonNullable<{ [K in keyof T]: undefined extends T[K] ? never : K }[keyof T]>

export interface ExtendableType<T> extends Type<T> {
	extend<T2 extends T>(
		properties: object.Properties<Omit<T2, keyof T>> & Partial<object.Properties<Pick<T2, keyof T>>>,
		type?: string
	): ExtendableType<T2>
}

export namespace object {
	export type Properties<T> = { [P in OptionalKeys<T>]: Type<T[P] | undefined> } &
		{ [P in RequiredKeys<T>]: Type<T[P]> }
}

function withExtendFunction<T>(baseType: Type<T>): ExtendableType<T> {
	const extend = ((moreProperties, type) => {
		const types = [baseType, object(moreProperties)] as const
		const name = () => type ?? types.map(type => type.name).join(" & ")
		const is = (value => types.every(type => type.is(value))) as Type.IsFunction<T>
		const flaw = (value =>
			is(value)
				? undefined
				: {
						type: name(),
						flaws: (types.flatMap(type => (type.is(value) ? [] : type.flaw(value))) as Flaw[]).flatMap(
							flaw => flaw.flaws
						),
				  }) as Type.FlawFunction<T>
		return withExtendFunction(Type.create(name, is, flaw))
	}) as ExtendableType<T>["extend"]
	return Object.defineProperty(baseType, "extend", { value: extend }) as ExtendableType<T>
}

export function object<T>(properties: object.Properties<T>, type?: string): ExtendableType<T> {
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

	return withExtendFunction(Type.create(name, is, flaw))
}
