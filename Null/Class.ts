import { Base } from "../Base"

export class Class<V extends null = null> extends Base<null> {
	readonly class = "null"
	private constructor(readonly name: string = "null") {
		super("Value has to be null.")
	}
	override is(value: V | any): value is V {
		return value === null
	}
	static create<V extends null = null>(): Class<V> {
		return new Class<V>().modify()
	}
}
