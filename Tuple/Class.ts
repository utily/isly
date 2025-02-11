import { Base } from "../Base"
import { Flaw } from "../Flaw"
import type { isly } from "../index"
import { Name } from "../Name"

export class Class<V extends any[] = unknown[]> extends Base<V> {
	readonly class = "tuple"
	override readonly name: string
	override get definition(): isly.Definition {
		return Object.assign(super.definition, { base: this.base.map(b => b.definition) })
	}
	private constructor(readonly base: { [I in keyof V]: Base<V[I]> }, name?: string) {
		name = name ?? Name.fromTuple(base)
		super(`Tuple of ${name}.`)
		this.name = name
	}
	override is(value: V | any): value is V {
		return (
			globalThis.Array.isArray(value) &&
			value.length == this.base.length &&
			this.base.every((type, index) => type.is(value[index]))
		)
	}
	override flawed(value: V | any): Flaw | false {
		const result: Flaw | false = super.flawed(value)
		return (
			result && {
				...result,
				flaws: this.base
					.map((type, index) => type.flawed(value?.[index]))
					.map<false | (Flaw & { index: number })>((flaw, index) => (flaw ? { index, ...flaw } : flaw))
					.filter((f: (Flaw & { index: number }) | false): f is Flaw & { index: number } => !!f),
			}
		)
	}
	override prune(value: V | any): V | undefined {
		return this.is(value) ? (this.base.map((type, index) => type.prune(value[index])) as V) : undefined
	}
	static create<V extends any[] = unknown[]>(...base: { [I in keyof V]: Base<V[I]> }): isly.Tuple<V> {
		return new Class<V>(base).modify()
	}
}
