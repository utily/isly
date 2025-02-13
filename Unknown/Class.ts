import { Base } from "../Base"
import type { isly } from "../index"

export class Class<V = unknown> extends Base<V> {
	readonly class = "unknown"
	private constructor(readonly name: string = "unknown") {
		super()
	}
	override is(value: V | any): value is V {
		return value != undefined
	}
	static create<V extends undefined = undefined>(name?: string): isly.Unknown<V> {
		return new Class<V>(name)
	}
}
