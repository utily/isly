import { Base } from "../Base"
import { Flaw } from "../Flaw"
import { Name } from "../Name"
import { Restriction } from "./Restriction"

export class Class<V, B extends Base<V>> extends Base<V[]> {
	readonly class = "array"
	override readonly name: string
	private constructor(readonly base: B, name?: string) {
		name = name ?? Name.fromArray(base)
		super(`Array of ${name}.`)
		this.name = name
	}
	override is(value: V[] | any): value is V[] {
		return globalThis.Array.isArray(value) && value.every(this.base.is)
	}
	override flawed(value: V[] | any): Flaw | false {
		const result: Flaw | false = super.flawed(value)
		return (
			result && {
				...result,
				flaws: (Array.isArray(value)
					? value.map(this.base.flawed).map((flaw, index) => flaw && { ...flaw, index })
					: [this.base.flawed(undefined)]
				).filter((f: Flaw | false): f is Flaw => !f),
			}
		)
	}
	override prune(value: V[] | any): V[] | undefined {
		return this.is(value) ? (value.map(this.base.prune.bind(this.base)) as V[]) : undefined
	}
	override restrict(...restriction: Restriction): this
	override restrict(verify: (value: V[]) => boolean, condition: string, name?: string): this
	override restrict(...restriction: Restriction | [verify: (value: V[]) => boolean, condition: string, name?: string]) {
		return restriction.length > 2 && typeof restriction[0] == "function"
			? super.restrict(...restriction)
			: Restriction.restrict(this, ...(restriction as Restriction))
	}
	static create<V = unknown, B extends Base<V> = Base<V>>(base: B, ...restriction: Restriction | []): Class<V, B> {
		const result: Class<V, B> = new Class<V, B>(base)
		return ((value: any): value is [] => Array.isArray(value) && value.length == 0)(restriction)
			? result
			: Restriction.restrict(result, ...restriction)
	}
}
