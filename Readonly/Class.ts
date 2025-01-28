import { Base } from "../Base"

export class Class<V extends any | undefined = unknown | undefined, B extends Base<V, B> = Base<V>> extends Base<
	V,
	Class<V, B>
> {
	readonly class = "readonly"
	private constructor(readonly base: B, readonly name: string = `Readonly<${base.name}>`) {
		super("Readonly version of base type.")
	}
	override is(value: V | any): value is V {
		return value === undefined || this.base.is(value)
	}
	override extract(value: V | any): V | undefined {
		return this.base.extract(value)
	}
	static create<V extends any | undefined = unknown | undefined, B extends Base<V, B> = Base<V, any>>(
		base: B,
		name?: string
	): Class<V, B> {
		return Base.bind(new Class<V, B>(base, name))
	}
}
Base.register("readonly", Class.create)
