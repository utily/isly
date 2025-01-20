import { Type } from "../Type"

export namespace Optional {
	export function create<T>(base: Type<T>): Type<T | undefined> {
		return Type.create<T | undefined>({
			class: "optional",
			name: `${base.name} | undefined`,
			is: (value: (T | undefined) | any): value is T | undefined => value == undefined || base.is(value),
		})
	}
}
Type.Methods.register("optional", Optional.create)
