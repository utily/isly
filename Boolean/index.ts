import { Base } from "../Base"
import { Definition as BaseDefinition } from "./Definition"

export class Boolean<V extends boolean = boolean> extends Base<V, Boolean<V>> {
	readonly class = "boolean"
	readonly name: string = "boolean"
	private constructor(readonly allowed?: V) {
		super("Value has to be true or false.")
	}

	override is(value: V | any): value is V {
		return typeof value == "boolean"
	}
	// restrict(value: V, name?: string): Boolean<V>
	// restrict(verify: (value: V) => boolean, condition: string, name?: string): Boolean<V>
	static create<V extends boolean = boolean>(allowed?: V): Boolean<V> {
		const result = Base.bind(new Boolean(allowed))
		return allowed == undefined
			? result
			: result.restrict(value => value == allowed, `equals ${allowed}`, allowed.toString())
	}
}
export namespace Boolean {
	export import Definition = BaseDefinition
}
