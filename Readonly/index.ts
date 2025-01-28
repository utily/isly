import { Base } from "../Base"
import { Definition as BaseDefinition } from "./Definition"

export class Readonly<V extends any | undefined = unknown | undefined, B extends Base<V, B> = Base<V>> extends Base<
	V,
	Readonly<V, B>
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
	): Readonly<V, B> {
		return Base.bind(new Readonly<V, B>(base, name))
	}
}
export namespace Readonly {
	export import Definition = BaseDefinition
}
