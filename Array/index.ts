import { Type } from "../Type"
import { Condition as ArrayCondition } from "./Condition"

export interface Array<T = any> extends Type<T[]> {
	restrict(...condition: Array.Condition): Array<T>
}
export namespace Array {
	export import Condition = ArrayCondition
	export function create<T = any>(base: Type<T>, name?: string): Array<T> {
		return Object.assign(
			Type.create<T[]>({
				class: "array",
				name: name ?? `${base.name}[]`,
				is: (value: T[] | any): value is T[] => globalThis.Array.isArray(value) && value.every(base.is),
			}),
			{
				restrict(...condition: Array.Condition): Array<T> {
					return Condition.restrict(this as Array<T>, ...condition)
				},
			}
		)
	}
}
Type.Methods.register("array", Array.create)
