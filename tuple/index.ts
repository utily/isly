import { Flaw } from "../Flaw"
import { Type } from "../Type"

export function tuple<T extends any[]>(...items: { [I in keyof T]: Type<T[I]> }): Type<T> {
	return new IslyTuple<T>(...items)
}
export class IslyTuple<T extends any[] = unknown[]> extends Type<T> {
	readonly class = "tuple"
	readonly items: { [I in keyof T]: Type<T[I]> }
	constructor(...items: { [I in keyof T]: Type<T[I]> }) {
		super(() => "[" + items.map(e => e.name).join(", ") + "]")
		this.items = items
	}
	is = (value: T | any): value is T =>
		globalThis.Array.isArray(value) &&
		value.length == this.items.length &&
		this.items.every((item, index) => item.is(value[index]))
	protected override createFlaw(value: any): Omit<Flaw, "isFlaw" | "type" | "condition"> {
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
	protected override getValue(value: T): T {
		return this.items.map((item, index) => item.get(value[index])) as T
	}
}
