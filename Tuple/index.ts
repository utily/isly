import { Type } from "../Type"

export interface Tuple<T extends any[] = any[]> extends Type<T> {
	types: { [I in keyof T]: Type<T[I]> }
}
export namespace Tuple {
	export interface Definition extends Type.Definition {
		readonly class: "tuple"
		readonly types: Type.Definition[]
	}
	export function create<T extends any[] = any[]>(...types: { [I in keyof T]: Type<T[I]> }): Tuple<T> {
		return Object.assign(
			Type.create<T>({
				class: "tuple",
				name: `[${types.map(t => t.name).join(", ")}]`,
				is: (value: T | any): value is T =>
					Array.isArray(value) && value.length == types.length && types.every((type, index) => type.is(value[index])),
			}),
			{ types }
		)
	}
}
