import { Type } from "./Type"

export function unknown<T = unknown>(name?: string): Type<T> {
	return new unknown.Class<T>(name ?? "unknown")
}

export namespace unknown {
	export class Class<T = unknown> extends Type<T> {
		readonly class = "unknown"
		is = (value: T | any): value is T => value != undefined
	}
}
