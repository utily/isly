import { Type } from "../Type"
import { Condition as StringCondition } from "./Condition"
import { Create as StringCreate } from "./Create"

export interface String<T extends string = string> extends Type<T> {
	readonly values?: readonly T[]
	restrict(...condition: String.Condition): String<T>
}

export namespace String {
	export interface Definition extends Type.Definition {
		readonly class: "string"
		readonly values?: string[]
	}
	export import Condition = StringCondition
	export import Create = StringCreate
	export function create<T extends string = string>(): String<T>
	export function create<T extends string = string>(values: readonly T[]): String<T>
	export function create<T extends string = string>(...values: readonly T[]): String<T>
	export function create<T extends string = string>(condition: RegExp): String<T>
	export function create<T extends string = string>(condition?: readonly T[] | RegExp): String<T> {
		const result = Object.assign(
			Type.create<T>({
				class: "string",
				name: "string",
				...(Array.isArray(condition)
					? {
							condition: [condition.map(v => `"${v}"`).join(" | ")],
							is: (value: T | any): value is T => typeof value == "string" && condition.some(v => v == value),
					  }
					: condition instanceof RegExp
					? {
							condition: [condition.toString()],
							is: (value: T | any): value is T => typeof value == "string" && condition.test(value),
					  }
					: {
							is: (value: T | any): value is T => typeof value == "string",
					  }),
			}),
			{
				...(Array.isArray(condition) ? { values: condition } : {}),
				restrict(...condition: String.Condition): String<T> {
					return Condition.restrict(result, ...condition) // TODO: call String.create before returning to
				},
			}
		)
		return result
	}
}
