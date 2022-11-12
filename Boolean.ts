import { Flaw } from "./Flaw"
import { Type } from "./Type"

class BooleanClass extends Type<boolean> {
	readonly name = "boolean"
	constructor() {
		super()
	}
	is(value: any | boolean): value is boolean {
		return typeof value == "boolean"
	}
	flaw(value: any): true | Flaw {
		return this.is(value) || { type: this.name }
	}
}
export type Boolean = BooleanClass
export const boolean = new BooleanClass()
