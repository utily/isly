import { Type } from "../Type"
import { Condition as ArrayCondition } from "./Condition"
import { Definition as ArrayDefinition } from "./Definition"

export interface Array<B = any, T extends globalThis.Array<B> = B[]> extends Type<T> {
	readonly element: Type<B>
	restrict(...condition: Array.Condition): Array<B, T>
}
export namespace Array {
	export import Condition = ArrayCondition
	export import Definition = ArrayDefinition
	export function create<B = any, T extends globalThis.Array<B> = B[]>(element: Type<B>, name?: string): Array<B, T> {
		return Object.assign(
			Type.create<T>({
				class: "array",
				name: name ?? `${element.name}[]`,
				is: (value: T | any): value is T => globalThis.Array.isArray(value) && value.every(element.is),
			}),
			{
				element: element,
				restrict(...condition: Array.Condition): Array<B, T> {
					return Condition.restrict(this as Array<B, T>, ...condition)
				},
			}
		)
	}
}
Type.Methods.register("array", type => Object.assign(type, () => Array.create(type)))
