import { Base } from "../Base"

export class Class<V extends undefined = undefined> extends Base<undefined> {
	readonly class = "undefined"
	private constructor(readonly name: string = "undefined") {
		super("Value has to be undefined.")
	}
	override is(value: V | any): value is V {
		return value === undefined
	}
	static create<V extends undefined = undefined>(name?: string): Class<V> {
		return new Class<V>(name).modify()
	}
}
