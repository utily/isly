import { Base } from "../Base"

export class Class<V = unknown> extends Base<V> {
	readonly class = "unknown"
	private constructor(readonly name: string = "unknown") {
		super("Value can be anything not undefined.")
	}
	override is(value: V | any): value is V {
		return value != undefined
	}
	static create<V extends undefined = undefined>(name?: string): Class<V> {
		return new Class<V>()
	}
}
