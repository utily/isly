import { Type } from "../Type"

export namespace Readonly {
	export function create<T>(base: Type<T>): Type<Readonly<T>> {
		return Type.create<Readonly<T>>({
			class: "readonly",
			name: `Readonly<${base.name}>`,
			is: (value: Readonly<T> | any): value is Readonly<T> => base.is(value),
		})
	}
	Type.Methods.register("readonly", create)
}
