import { Base } from "../Base"
import type { isly } from "../index"

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export class Class<V extends Function = Function> extends Base<Function> {
	readonly class = "function"
	private constructor(readonly name: string = "function") {
		super("Value has to be a function.")
	}
	override is(value: V | any): value is V {
		return typeof value == "function"
	}
	// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
	static create<V extends Function = Function>(type: "function", name?: string): isly.Function<V> {
		return new Class<V>(name).modify()
	}
}
