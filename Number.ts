import { Type } from "./Type"

class NumberClass extends Type<number> {
	readonly name = "number"
	constructor() {
		super()
	}
	is(value: any | number): value is number {
		return typeof value == "number"
	}
}
export type Number = NumberClass
export const number = new NumberClass()
