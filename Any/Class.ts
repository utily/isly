import { Base } from "../Base"
import type { isly } from "../index"

export class Class<V = any> extends Base<V> {
	readonly class = "any"
	private constructor(readonly name: string = "any") {
		super()
	}
	override is(value: V | any): value is V {
		return value != undefined
	}
	static create<V = any>(name?: string): isly.Any<V> {
		return new Class<V>(name).modify()
	}
}
