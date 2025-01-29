import { Base } from "Base"

export class Class<V extends boolean> extends Base<V> {
	readonly class = "boolean"
	readonly name: string = "boolean"
	protected constructor(readonly allowed?: V) {
		super("Value has to be true or false.")
	}
	override is(value: V | any): value is V {
		return typeof value == "boolean"
	}
	// restrict(value: V, name?: string): Boolean<V>
	// restrict(verify: (value: V) => boolean, condition: string, name?: string): Boolean<V>
	static create<V extends boolean>(allowed?: V): Class<V> {
		return new Class<V>()
		// const result = Base.bind(new Class<V>(allowed))
		// return allowed == undefined
		// 	? result
		// 	: result
		// 			.restrict(value => value == allowed, `equals ${allowed}`, allowed.toString())
		// 			.describe(`Value has to be ${allowed}.`)
	}
}
