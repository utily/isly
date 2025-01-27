import { Base } from "../Base"
import { Definition as BaseDefinition } from "./Definition"

export class Optional<
	V extends any | undefined = unknown | undefined,
	T extends Base<V, T> = Base<V, any>,
	B extends Base<V, T> = Base<V, any>
> extends Base<V, Optional<V, T, B>> {
	readonly class = "optional"
	private constructor(readonly base: B, readonly name: string = `${base.name} | undefined`) {
		super("Value is optional i.e. undefined or base type.")
	}
	override is(value: V | any): value is V {
		return value === undefined || this.base.is(value)
	}
	static create<
		V extends any | undefined = unknown | undefined,
		T extends Base<V, T> = Base<V, any>,
		B extends Base<V, T> = Base<V, any>
	>(base: B, name?: string): Optional<V, T, B> {
		return Base.bind(new Optional<V, T, B>(base, name))
	}
}
export namespace Optional {
	export import Definition = BaseDefinition
}
