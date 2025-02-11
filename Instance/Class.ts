import { Base } from "../Base"
import { Instance } from "."

export class Class<V extends object = object> extends Base<V> {
	readonly class = "instance"
	private constructor(readonly type: new (...properties: any[]) => V, readonly name: string) {
		super()
	}
	override is(value: V | any): value is V {
		return value instanceof this.type
	}
	static create<V extends object = object>(constructor: new (...properties: any[]) => V, name: string): Instance<V> {
		return new Class<V>(constructor, name).modify()
	}
}
