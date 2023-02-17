import type { Flaw } from "./Flaw"
import { Type } from "./Type"

type OptionalKeys<T> = NonNullable<{ [K in keyof T]: undefined extends T[K] ? K : never }[keyof T]>
type RequiredKeys<T> = NonNullable<{ [K in keyof T]: undefined extends T[K] ? never : K }[keyof T]>

export interface ExtendableType<T> extends Type<T> {
	extend<T2 extends T>(
		properties: object.Properties<Omit<T2, keyof T>> & Partial<object.Properties<Pick<T2, keyof T>>>,
		name?: string
	): ExtendableType<T2>
}

export namespace object {
	export type Properties<T> = { [P in OptionalKeys<T>]: Type<T[P] | undefined> } &
		{ [P in RequiredKeys<T>]: Type<T[P]> }
}

class IslyObject<T extends B, B> extends Type.AbstractType<T> implements ExtendableType<T> {
	protected readonly properties: object.Properties<T>
	constructor(protected readonly baseType: Type<B> | undefined, properties?: object.Properties<T>, name?: string) {
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
		this.properties = properties ?? ({} as object.Properties<T>)
	}
	extend<T2 extends T>(
		properties: { [P in OptionalKeys<Omit<T2, keyof T>>]: Type<Omit<T2, keyof T>[P] | undefined> } &
			{
				[P in RequiredKeys<Omit<T2, keyof T>>]: Type<Omit<T2, keyof T>[P]>
			} &
			Partial<object.Properties<Pick<T2, keyof T>>>,
		name?: string | undefined
	): ExtendableType<T2> {
		return new IslyObject<T2, T>(this, properties as any, name)
	}
	is(value: any): value is T {
		return (
			value &&
			(this.baseType == undefined || this.baseType.is(value)) &&
			typeof value == "object" &&
			!globalThis.Array.isArray(value) &&
			globalThis.Object.entries<Type<any>>(this.properties).every(([property, type]) => type.is(value[property]))
		)
	}
	protected createFlaw(value: any): Omit<Flaw, "isFlaw" | "type" | "condition"> {
		return {
			flaws: [
				this.baseType ? this.baseType.flaw(value)?.flaws ?? [] : [],
				globalThis.Object.entries<Type<any>>(this.properties)
					.map<[string, undefined | Flaw]>(([property, type]) => [property, type.flaw((value as any)?.[property])])
					.map(([property, flaw]) => flaw && { property, ...flaw })
					.filter(flaw => flaw) as Flaw[],
			].flat(),
		}
	}
}

export function object(): ExtendableType<object>
export function object<T>(properties: object.Properties<T>, name?: string): ExtendableType<T>
export function object<T>(properties?: object.Properties<T>, name?: string): ExtendableType<T> {
	return new IslyObject<T, T>(undefined, properties, name)
}
