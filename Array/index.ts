import { Type } from "../Type"

export namespace Array {
	export function create<T = any>(base: Type<T>, name?: string): Type<T[]> {
		return Type.create<T[]>({
			class: "array",
			name: name ?? `${base.name}[]`,
			is: (value: T[] | any): value is T[] => global.Array.isArray(value) && value.every(base.is),
		})
	}
}
Type.Methods.register("array", Array.create)
