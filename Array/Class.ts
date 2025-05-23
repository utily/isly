import { Base } from "../Base"
import { Flaw } from "../Flaw"
import type { isly } from "../index"
import { Name } from "../Name"
import { Restriction } from "./Restriction"

export class Class<V> extends Base<V[]> {
	readonly class = "array"
	private _name: string | undefined
	get name(): string {
		return (this._name ??= Name.fromArray(this.base))
	}
	override get definition(): isly.Definition {
		return Object.assign(super.definition, { base: this.base.definition })
	}
	private constructor(readonly base: Base<V>, name?: string) {
		super()
		this._name = name
	}
	override is(value: V[] | any): value is V[] {
		return globalThis.Array.isArray(value) && value.every(this.base.is.bind(this.base))
	}
	override flawed(value: V[] | any): Flaw | false {
		const result: Flaw | false = super.flawed(value)
		return (
			result && {
				...result,
				flaws: (Array.isArray(value)
					? value.map(this.base.flawed.bind(this.base)).map((flaw, index) => flaw && { ...flaw, index })
					: [this.base.flawed(undefined)]
				).filter((f: Flaw | false): f is Flaw => !!f),
			}
		)
	}
	override prune(value: V[] | any): V[] | undefined {
		return this.is(value) ? (value.map(this.base.prune.bind(this.base)) as V[]) : undefined
	}
	override restrict(...restriction: Restriction | Base.Restriction) {
		return super.restrict(...(Base.Restriction.is(restriction) ? restriction : Restriction.convert(restriction)))
	}
	static create<V>(base: Base<V>, ...restriction: isly.Array.Restriction | []): isly.Array<V> {
		const result = new Class(base)
		return ((value: any): value is [] => Array.isArray(value) && value.length == 0)(restriction)
			? result
			: result.restrict(...restriction)
	}
}
