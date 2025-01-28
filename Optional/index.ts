import { Base } from "../Base"
import { Definition as BaseDefinition } from "./Definition"

export class Optional<V = unknown, B extends Base<V, B> = Base<V>> extends Base<V | undefined, Optional<V, B>> {
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
	static create<V = unknown, B extends Base<V, B> = Base<V>>(base: B, name?: string): Optional<V, B> {
		return Base.bind(new Optional<V, B>(base, name))
	}
}
export namespace Optional {
	export import Definition = BaseDefinition
}
