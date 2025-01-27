import { Base } from "../Base"
import { Definition as BaseDefinition } from "./Definition"

export class Readonly<
	V extends any | undefined = unknown | undefined,
	T extends Base<V, T> = Base<V, any>,
	B extends Base<V, T> = Base<V, any>
> extends Base<V, Readonly<V, T, B>> {
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
	static create<
		V extends any | undefined = unknown | undefined,
		T extends Base<V, T> = Base<V, any>,
		B extends Base<V, T> = Base<V, any>
	>(base: B, name?: string): Readonly<V, T, B> {
		return Base.bind(new Readonly<V, T, B>(base, name))
	}
}
export namespace Readonly {
	export import Definition = BaseDefinition
}
