import { Flaw } from "./Flaw"
import { Type } from "./Type"

export function intersection<T extends A & B, A, B>(...types: [Type<A>, Type<B>]): Type<T> {
	const name = () => types.map(type => type.name).join(" & ")
	const is = (value => types.every(type => type.is(value))) as Type.IsFunction<T>
	const flaw = (value =>
		is(value)
			? undefined
			: {
					type: name(),
					flaws: types.map(type => type.flaw(value)).filter(flaw => flaw) as Flaw[],
			  }) as Type.FlawFunction<T>
	return Type.create(name, is, flaw)
}
