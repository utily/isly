import { Base } from "../Base"
import { Definition as BaseDefinition } from "./Definition"

export class Undefined<V extends undefined = undefined> extends Base<undefined, Undefined<V>> {
	readonly class = "undefined"
	private constructor(readonly name: string = "undefined") {
		super("Value has to be undefined.")
	}
	override is(value: V | any): value is V {
		return value === undefined
	}
	static create<V extends undefined = undefined>(name?: string): Undefined<V> {
		return Base.bind(new Undefined<V>())
	}
}
export namespace Undefined {
	export import Definition = BaseDefinition
}
