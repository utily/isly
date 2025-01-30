import { Base } from "../Base"

export class Class<V, B extends Base<V>> extends Base<V | undefined> {
	readonly class = "optional"
	private constructor(readonly base: B, readonly name: string = `${base.name} | undefined`) {
		super("Value is optional i.e. undefined or base type.")
	}
	override is(value: V | undefined | any): value is V | undefined {
		return value === undefined || this.base.is(value)
	}
	override prune(value: V | undefined | any): V | undefined {
		return value === undefined ? undefined : this.base.prune(value)
	}
	static create<V, B extends Base<V>>(base: B, name?: string): Class<V, B> {
		return new Class<V, B>(base, name)
	}
}
