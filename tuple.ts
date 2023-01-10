import { Flaw } from "./Flaw"
import { Type } from "./Type"

export function tuple<T extends any[]>(...items: { [I in keyof T]: Type<T[I]> }): Type<T> {
	const name = () => "[" + items.map(e => e.name).join(", ") + "]"
	const is = (value =>
		globalThis.Array.isArray(value) &&
		value.length == items.length &&
		items.every((item, index) => item.is(value[index]))) as Type.IsFunction<T>
	return Type.create(name, is, (value: any): true | Flaw => {
		return (
			is(value) || {
				type: name(),
				flaws: items
					.map<[number, true | Flaw]>((type, property) => [property, type.flaw(value[property])])
					.map(([property, flaw]) => flaw == true || { property, ...flaw })
					.filter(f => f != true) as Flaw[],
			}
		)
	})
}
