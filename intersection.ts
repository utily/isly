import { Flaw } from "./Flaw"
import { Type } from "./Type"

class IslyIntersection<T extends A & B, A, B> extends Type.AbstractType<T> {
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
}

export function intersection<T extends A & B, A, B>(...types: [Type<A>, Type<B>]): Type<T> {
	return new IslyIntersection<T, A, B>(...types)
}
