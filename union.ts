import { Flaw } from "./Flaw"
import { Type } from "./Type"

/**
 * Usage: isly.union<string | number>(isly.string(), isly.number())
 * @param types
 * @returns
 */
export function union<T>(...types: Type<T>[]): Type<T> {
	const name = () => types.map(type => type.name).join(" | ")
	const is = (value => types.some(type => type.is(value))) as Type.IsFunction<T>
	return Type.create(
		name,
		is,
		(value: any): true | Flaw =>
			is(value) || {
				type: name(),
				flaws: types.map(type => type.flaw(value)).filter(flaw => flaw != true) as Flaw[],
			}
	)
}
