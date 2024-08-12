import { Flaw } from "./Flaw"
import { Type } from "./Type"

class IslyIntersection<T> extends Type<T> {
	protected readonly types: Type<unknown>[]
	constructor(...types: Type<unknown>[]) {
		super(() => types.map(type => type.name).join(" & "))
		this.types = types
	}
	is = (value: T | any): value is T => this.types.every(type => type.is(value))
	createFlaw(value: any): Omit<Flaw, "isFlaw" | "type" | "condition"> {
		return {
			flaws: this.types.map(type => type.flaw(value)).filter(flaw => flaw) as Flaw[],
		}
	}
	// This seams to be the behavior users describe on stack overflow
	// https://stackoverflow.com/questions/59722333/union-and-intersection-of-types
	protected getValue(value: T): T {
		return value && typeof value == "object"
			? (this.types
					.slice(1)
					.reduce((resolved, type) => this.merge(resolved, type.get(value)), this.types[0].get(value)) as T)
			: value
	}

	private merge<Target, Source>(target: Target, source: Source): Target & Source {
		let result = target as Target & Source

		if (Array.isArray(target) && Array.isArray(source))
			result = target.map((item, index) => this.merge(item, source[index])) as Source & Target
		else if (target && typeof target == "object" && source && typeof source == "object")
			for (const key in source)
				if (
					globalThis.Object.getOwnPropertyDescriptor(target, key) &&
					typeof target[key as string as keyof typeof target] == "object" &&
					typeof source[key] == "object"
				)
					globalThis.Object.assign(target, {
						[key]: this.merge(target[key as string as keyof typeof target], source[key]),
					})
				else
					globalThis.Object.assign(target, { [key]: source[key] })

		return result
	}
}

export function intersection<T extends A & B, A, B>(typeA: Type<A>, typeB: Type<B>): Type<T>
export function intersection<T extends A & B & C, A, B, C>(typeA: Type<A>, typeB: Type<B>, typeC: Type<C>): Type<T>
export function intersection<T extends A & B & C, A, B, C>(typeA: Type<A>, typeB: Type<B>, typeC: Type<C>): Type<T>
export function intersection<T extends A & B & C & D, A, B, C, D>(
	typeA: Type<A>,
	typeB: Type<B>,
	typeC: Type<C>,
	typeD: Type<D>
): Type<T>
export function intersection<T extends A & B & C & D & E, A, B, C, D, E>(
	typeA: Type<A>,
	typeB: Type<B>,
	typeC: Type<C>,
	typeD: Type<D>,
	typeE: Type<E>
): Type<T>
export function intersection<T extends A & B & C & D & E & F, A, B, C, D, E, F>(
	typeA: Type<A>,
	typeB: Type<B>,
	typeC: Type<C>,
	typeD: Type<D>,
	typeE: Type<E>,
	typeF: Type<F>
): Type<T>
export function intersection<T>(...types: Type<unknown>[]): Type<T> {
	return new IslyIntersection<T>(...types)
}
