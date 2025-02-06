import { Base } from "../Base"

export class Class<V = any> extends Base<V> {
	readonly class = "any"
	private constructor(readonly name: string = "any") {
		super("Anything except undefined.")
	}
	override is(value: V | any): value is V {
		return value != undefined
	}
	static create<V = any>(name?: string): Class<V> {
		return new Class<V>(name).modify()
	}
}
