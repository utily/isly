import { Flaw } from "./Flaw";

export abstract class Type<T> {
	abstract readonly type: string
	readonly condition?: ""
	abstract is(value: any | T): value is T
	flaw(value: any): true | Flaw {
		return this.is(value) || { type: this.type }
	}
}

export class String extends Type<string> {
	readonly type = "string"
	constructor() {
		super()		
	}
	is(value: any | string): value is string {
		return typeof value == "string"
	}
}
export const string = new String()

export class Array<T> extends Type<T[]> {
	readonly type: string
	constructor(readonly item: Type<T>) {
		super()		
		this.type = this.item.type + "[]"
	}
	is(value: any | T[]): value is T[] {
		return globalThis.Array.isArray(value) && value.every(item => this.item.is(item))
	}
}


export class Union<T, S> extends Type<T | S> {
	readonly type: string
	constructor(readonly left: Type<T>, readonly right: Type<T>) {
		super()		
		this.type = this.left.type + " | " + this.right.type
	}
	is(value: any | T | S): value is T | S {
		return this.left.is(value) || this.right.is(value)
	}
}
type Properties<T> = { [P in keyof T]: Type<T[P]> }

export class Object<T> extends Type<T> {
	constructor(readonly type: string, readonly properties: Properties<T>) {
		super()
	}
	is(value: any | T): value is T {
		return value && typeof value == "object" && 
			!globalThis.Array.isArray(value) && 
			globalThis.Object.entries<Type<any>>(this.properties).every(([property, type]) => type.is(value[property]))
	}
}
