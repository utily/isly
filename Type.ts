import { Flaw } from "./Flaw"

export abstract class Type<T> {
	abstract readonly name: string
	readonly condition?: ""
	abstract is(value: any | T): value is T
	flaw(value: any): Flaw {
		return { type: this.name }
	}
}
