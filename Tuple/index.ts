import { Type } from "../Type"

export namespace Tuple {
	export function create<T extends any[]>(...types: { [I in keyof T]: Type<T[I]> }): Type<T> {
		return Type.create<T>({
			class: "tuple",
			name: `[${types.map(t => t.name).join(", ")}]`,
			is: (value: T | any): value is T =>
				Array.isArray(value) && value.length == types.length && types.every((type, index) => type.is(value[index])),
		})
	}
}
