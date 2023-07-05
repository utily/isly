import { Flaw } from "./Flaw"
import { object } from "./object"
import { Type } from "./Type"

class IslyIntersection<T extends A & B, A, B> extends Type<T> {
	protected readonly types: [Type<A>, Type<B>]
	constructor(...types: [Type<A>, Type<B>]) {
		super(() => types.map(type => type.name).join(" & "))
		this.types = types
	}
	is = (value => this.types.every(type => type.is(value))) as Type.IsFunction<T>
	createFlaw(value: any): Omit<Flaw, "isFlaw" | "type" | "condition"> {
		return {
			flaws: this.types.map(type => type.flaw(value)).filter(flaw => flaw) as Flaw[],
		}
	}
	// This seams to be the behavior users describe on stack overflow
	// https://stackoverflow.com/questions/59722333/union-and-intersection-of-types
	protected getValue(value: T): T {
		let result: T = value
		if (typeof value == "object") {
			const first = this.types[0].get(value) ?? {}
			const second = this.types[1].get(value) ?? {}
			result = merge(first, second) as T
		}
		return result
	}
}

export function intersection<T extends A & B, A, B>(...types: [Type<A>, Type<B>]): Type<T> {
	return new IslyIntersection<T, A, B>(...types)
}

function merge<Source, Target>(target: Target, source: Source): Source & Target {
	let result: Source & Target = target as Source & Target

	if (object().is(target) && object().is(source))
		if (Array.isArray(target) && Array.isArray(source))
			result = target.concat(source) as Source & Target
		else
			for (const key in source)
				if (
					Object.getOwnPropertyDescriptor(target, key) &&
					object().is(source[key]) &&
					object().is(target[key as string as keyof typeof target])
				)
					Object.assign(target, { [key]: merge(source[key], target[key as string as keyof typeof target]) })
				else
					Object.assign(target, { [key]: source[key] })

	return result
}
