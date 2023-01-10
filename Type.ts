import { Flaw } from "./Flaw"

export interface Type<T> {
	readonly name: string
	readonly condition?: string
	is(value: any | T): value is T
	flaw(value: any): undefined | Flaw
}
export namespace Type {
	export type IsFunction<T> = (value: any | T) => value is T
	export type FlawFunction = (value: any) => undefined | Flaw
	export function create<T>(
		name: string | (() => string),
		is: IsFunction<T>,
		flaw: FlawFunction,
		condition?: string
	): Type<T> {
		return Object.defineProperty(
			{
				is,
				flaw,
				condition,
			},
			"name",
			{ get: typeof name == "function" ? name : () => name }
		) as Type<T>
	}
}
// export interface Type<T> {
// 	readonly name: string
// 	readonly condition?: string
// 	is(value: any | T): value is T
// 	flaw(value: any): true | Flaw
// }
