import { Type } from "../Type"
import { Condition as NumberCondition } from "./Condition"

export interface Number<T extends number = number> extends Type<T> {
	restrict(...condition: Number.Condition<T>): Number<T>
}
export namespace Number {
	export type Definition = Type.Definition
	export import Condition = NumberCondition
	export function create<T extends number = number>(...condition: Condition<T> | []): Number<T> {
		const result: Number<T> = Object.assign(
			Type.create<T>({
				class: "number",
				name: "number",
				is: (value: T | any): value is T => typeof value == "number" && globalThis.Number.isFinite(value),
			}),
			{
				restrict(...condition: Condition<T>): Number<T> {
					return Condition.restrict(this as Number<T>, ...condition)
				},
			}
		)
		return ((value: any): value is [] => Array.isArray(value) && value.length == 0)(condition)
			? result
			: result.restrict(...condition)
	}
}
