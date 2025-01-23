import { Type } from "../Type"

export interface Boolean<T extends boolean = boolean> extends Type<T> {
	readonly allowed?: T
}
export namespace Boolean {
	export interface Definition extends Boolean {
		readonly allowed?: boolean
	}
	export function create<T extends boolean = boolean>(allowed?: T): Boolean<T> {
		return Object.assign(
			Type.create<T>({
				class: "boolean",
				...(allowed == undefined
					? {
							name: "boolean",
							is: (value: T | any): value is T => typeof value == "boolean",
					  }
					: allowed
					? {
							name: "true",
							is: (value: T | any): value is T => typeof value == "boolean" && value,
					  }
					: {
							name: "false",
							is: (value: T | any): value is T => typeof value == "boolean" && !value,
					  }),
			}),
			{ allowed }
		)
	}
}
