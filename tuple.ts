import { Flaw } from "./Flaw"
import { Type } from "./Type"

class IslyTuple<T extends any[]> extends Type<T> {
	protected readonly items: { [I in keyof T]: Type<T[I]> }
	constructor(...items: { [I in keyof T]: Type<T[I]> }) {
		super(() => "[" + items.map(e => e.name).join(", ") + "]")
		this.items = items
	}
	is = (value =>
		globalThis.Array.isArray(value) &&
		value.length == this.items.length &&
		this.items.every((item, index) => item.is(value[index]))) as Type.IsFunction<T>
	protected createFlaw(value: any): Omit<Flaw, "isFlaw" | "type" | "condition"> {
		return {
			flaws: this.items
				.map<[number, undefined | Flaw]>((type, property) => [
					property,
					type.flaw(globalThis.Array.isArray(value) ? value?.[property] : undefined),
				])
				.map(([property, flaw]) => (flaw?.isFlaw ?? true) && { property, ...flaw })
				.filter(flaw => flaw) as Flaw[],
		}
	}
}

export function tuple<T extends any[]>(...items: { [I in keyof T]: Type<T[I]> }): Type<T> {
	return new IslyTuple<T>(...items)
}
