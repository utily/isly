import { Type } from "../Type"

export namespace Instance {
	export function create<T = undefined>(constructor: new () => T, name: string): Type<T> {
		return Type.create<T>({ class: "instance", name, is: (value: T | any): value is T => value instanceof constructor })
	}
}
