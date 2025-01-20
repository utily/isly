import { Type } from "../Type"

export namespace Boolean {
	export function create<T extends boolean = boolean>(value?: T): Type<T> {
		return Type.create<T>({
			class: "boolean",
			...(value == undefined
				? {
						name: "boolean",
						is: (value: T | any): value is T => typeof value == "boolean",
				  }
				: value
				? {
						name: "true",
						is: (value: T | any): value is T => typeof value == "boolean" && value,
				  }
				: {
						name: "false",
						is: (value: T | any): value is T => typeof value == "boolean" && !value,
				  }),
		})
	}
}
