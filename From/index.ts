import { Type } from "../Type"

export namespace From {
	export function create<T>(is: (value: T | any) => value is T, name: string): Type<T>
	export function create<T>(is: (value: any) => boolean, name: string): Type<T>
	export function create<T>(is: ((value: T | any) => value is T) | ((value: any) => boolean), name: string): Type<T> {
		return Type.create<T>({ class: "from", name, is: is as (value: T | any) => value is T })
	}
}
