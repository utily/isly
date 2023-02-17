import type { Flaw } from "./Flaw"
import { Type } from "./Type"

type OptionalKeys<T> = NonNullable<{ [K in keyof T]: undefined extends T[K] ? K : never }[keyof T]>
type RequiredKeys<T> = NonNullable<{ [K in keyof T]: undefined extends T[K] ? never : K }[keyof T]>

export namespace object {
	export type BaseProperties<T> = { [P in OptionalKeys<T>]: Type<T[P] | undefined> } &
		{ [P in RequiredKeys<T>]: Type<T[P]> }
	export type ExtendedProperties<T2 extends T, T> = BaseProperties<Omit<T2, keyof T>> &
		Partial<object.BaseProperties<Pick<T2, keyof T>>>
	export type Properties<T extends B, B, TB extends Type<B> | undefined> = TB extends undefined
		? object.BaseProperties<T>
		: object.ExtendedProperties<T, B>

	export interface ExtendableType<T> extends Type<T> {
		extend<T2 extends T>(properties: ExtendedProperties<T2, T>, name?: string): ExtendableType<T2>
	}
}

class IslyObject<T extends B, B, TB extends Type<B> | undefined>
	extends Type.AbstractType<T>
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
					JSON.stringify(
						globalThis.Object.fromEntries(
							globalThis.Object.entries(this.properties).map(([property, type]: [string, Type<any>]) => [
								property,
								type.name,
							])
						)
					)
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
		return new IslyObject<T2, T, Type<T>>(this, properties, name)
	}
	is = (value =>
		value &&
		(this.baseType == undefined || this.baseType.is(value)) &&
		typeof value == "object" &&
		!globalThis.Array.isArray(value) &&
		globalThis.Object.entries<Type<any>>(this.properties).every(([property, type]) =>
			type.is(value[property])
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
