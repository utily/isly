import { Base } from "../Base"

export class Class<V, B extends Base<V, B>> extends Base<V | undefined, Class<V, B>> {
	readonly class = "optional"
	private constructor(readonly base: B, readonly name: string = `${base.name} | undefined`) {
		super("Value is optional i.e. undefined or base type.")
	}
	override is(value: V | undefined | any): value is V | undefined {
		return value === undefined || this.base.is(value)
	}
	override extract(value: V | undefined | any): V | undefined {
		return value === undefined ? undefined : this.base.extract(value)
	}
	static create<V, B extends Base<V, B>>(base: B, name?: string): Class<V, B> {
		return Base.bind(new Class<V, B>(base, name))
	}
}
