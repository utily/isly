import type { Flaw } from "./Flaw"
import { Type } from "./Type"

type OptionalKeys<T> = NonNullable<{ [K in keyof T]: undefined extends T[K] ? K : never }[keyof T]>
type RequiredKeys<T> = NonNullable<{ [K in keyof T]: undefined extends T[K] ? never : K }[keyof T]>

export namespace object {
	export type BaseProperties<T> = { [P in OptionalKeys<T>]: Type<T[P] | undefined> } &
		{
			[P in RequiredKeys<T>]: Type<T[P]>
		}
	export type ExtendedProperties<T2 extends T, T> = BaseProperties<Omit<T2, keyof T>> &
		Partial<object.BaseProperties<Pick<T2, keyof T>>>
	export type Properties<T extends B, B, TB extends Type<B> | undefined> = TB extends undefined
		? object.BaseProperties<T>
		: object.ExtendedProperties<T, B>

	export interface ExtendableType<T> extends Type<T> {
		extend<T2 extends T>(properties: ExtendedProperties<T2, T>, name?: string): ExtendableType<T2>
		omit<K extends keyof T>(omits: K[], name?: string): object.ExtendableType<Omit<T, K>>
		omit<T2 extends Omit<T, K>, K extends keyof T>(omits: readonly K[], name?: string): object.ExtendableType<T2>
	}
}

class IslyObject<T extends B, B extends object, TB extends IslyObject<B, any, any> | undefined>
	extends Type<T>
	implements object.ExtendableType<T>
{
	constructor(
		protected readonly baseType: TB,
		protected readonly properties: object.Properties<T, B, TB>,
		name?: string
	) {
		super(
			() =>
				name ??
				(this.baseType ? `${this.baseType.name} & ` : "") +
					`{${globalThis.Object.entries(this.properties)
						.map(([property, type]: [string, Type<any>]) => `${property}: ${type.name}`)
						.join(", ")}}`
		)
	}
	extend<T2 extends T>(
		properties: { [P in OptionalKeys<Omit<T2, keyof T>>]: Type<Omit<T2, keyof T>[P] | undefined> } &
			{
				[P in RequiredKeys<Omit<T2, keyof T>>]: Type<Omit<T2, keyof T>[P]>
			} &
			Partial<object.BaseProperties<Pick<T2, keyof T>>>,
		name?: string | undefined
	): object.ExtendableType<T2> {
		return new IslyObject<T2, T, IslyObject<T, any, any>>(this, properties, name)
	}
	omit<K extends keyof T>(omits: K[], name?: string): object.ExtendableType<Omit<T, K>> {
		const properties: [
			Extract<keyof object.Properties<T, B, TB>, string>,
			object.Properties<T, B, TB>[Extract<keyof object.Properties<T, B, TB>, string>]
		][] = []
		for (const property in this.properties) {
			!omits.includes(property as any) && properties.push([property, this.properties[property]])
		}
		const result = Object.fromEntries(properties) as object.BaseProperties<Omit<T, K>>
		return new IslyObject<Omit<T, K>, Omit<T, K>, undefined>(undefined, result, name)
	}
	is = (value =>
		!!(
			value &&
			(this.baseType == undefined || this.baseType.is(value)) &&
			typeof value == "object" &&
			!globalThis.Array.isArray(value) &&
			globalThis.Object.entries<Type<any>>(this.properties).every(([property, type]) => type.is(value[property]))
		)) as Type.IsFunction<T>
	protected createFlaw(value: any): Omit<Flaw, "isFlaw" | "type" | "condition"> {
		return {
			flaws: [
				this.baseType ? this.baseType.flaw(value)?.flaws ?? [] : [],
				globalThis.Object.entries<Type<any>>(this.properties)
					.map<[string, undefined | Flaw]>(([property, type]) => [property, type.flaw((value as any)?.[property])])
					.map(([property, flaw]) => (flaw?.isFlaw ?? true) && { property, ...flaw })
					.filter(flaw => flaw) as Flaw[],
			]
				.flat()
				.filter(flaw => flaw?.isFlaw ?? true),
		}
	}
	/**
	 * get-function on a object returns a object with only specified properties
	 */
	protected getValue(value: T) {
		const result: Record<any, any> = this.baseType ? this.baseType.getValue(value) : {}
		if (result)
			for (const [key, type] of globalThis.Object.entries(this.properties) as [keyof T, Type<any>][])
				if (key in value)
					result[key] = type.get(value[key])

		return result as T
	}
}

export function object(): object.ExtendableType<object>
export function object<T extends object>(properties: object.BaseProperties<T>, name?: string): object.ExtendableType<T>
export function object<T extends object>(
	properties?: object.BaseProperties<T>,
	name?: string
): object.ExtendableType<T> {
	return new IslyObject<T, object, undefined>(
		undefined,
		properties ?? ({} as object.Properties<T, object, undefined>),
		name
	)
}
