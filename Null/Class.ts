import { Base } from "../Base"
import type { isly } from "../index"

export class Class<V extends null = null> extends Base<null> {
	readonly class = "null"
	private constructor(readonly name: string = "null") {
		super()
	}
	override is(value: V | any): value is V {
		return value === null
	}
	static create<V extends null = null>(): isly.Null<V> {
		return new Class<V>().modify()
	}
}
