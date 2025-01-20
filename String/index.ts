import { Type } from "../Type"

export namespace String {
	export function create<T extends string = string>(): Type<T>
	export function create<T extends string = string>(values: readonly T[]): Type<T>
	export function create<T extends string = string>(...values: readonly T[]): Type<T>
	export function create<T extends string = string>(condition: RegExp): Type<T>
	export function create<T extends string = string>(condition?: readonly T[] | RegExp): Type<T> {
		return Type.create<T>(
			Array.isArray(condition)
				? {
						class: "string",
						name: condition.map(v => `"${v}"`).join(" | "),
						condition: `one of: ${condition.map(v => `"${v}"`).join(", ")}`,
						is: (value: T | any): value is T => typeof value == "string" && condition.some(v => v == value),
				  }
				: condition instanceof RegExp
				? {
						class: "string",
						name: "string",
						condition: condition.toString(),
						is: (value: T | any): value is T => typeof value == "string" && condition.test(value),
				  }
				: {
						class: "string",
						name: "string",
						is: (value: T | any): value is T => typeof value == "string",
				  }
		)
	}
}
