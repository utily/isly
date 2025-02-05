import { Base } from "../Base"
import type { isly } from "../index"

export class Class<V extends object = object> extends Base<V> {
	readonly class = "instance"
	private constructor(creator: typeof isly, readonly type: new (...properties: any[]) => V, readonly name: string) {
		super(creator, `Has to be instance of ${name}. `)
	}
	override is(value: V | any): value is V {
		return value instanceof this.type
	}
	static create<V extends object = object>(
		creator: typeof isly,
		constructor: new (...properties: any[]) => V,
		name: string
	): Class<V> {
		return new Class<V>(creator, constructor, name)
	}
}
