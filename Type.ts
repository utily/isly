import { Flaw } from "./Flaw"

export abstract class Type<T> {
	abstract readonly name: string
	readonly condition?: string = ""
	abstract is(value: any | T): value is T
	abstract flaw(value: any): true | Flaw
}
