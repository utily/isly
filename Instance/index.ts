import { Type } from "../Type"

export type Instance<T = any> = Type<T>
export namespace Instance {
	export type Definition = Type.Definition
	export function create<T = undefined>(constructor: new (...parameters: any[]) => T, name: string): Instance<T> {
		return Type.create<T>({ class: "instance", name, is: (value: T | any): value is T => value instanceof constructor })
	}
}
