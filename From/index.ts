import { Type } from "../Type"

export type From<T = any> = Type<T>
export namespace From {
	export type Definition = Type.Definition
	export function create<T>(is: (value: T | any) => value is T, name: string): From<T>
	export function create<T>(is: (value: any) => boolean, name: string): From<T>
	export function create<T>(is: ((value: T | any) => value is T) | ((value: any) => boolean), name: string): From<T> {
		return Type.create<T>({ class: "from", name, is: is as (value: T | any) => value is T })
	}
}
