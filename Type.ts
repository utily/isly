import { Flaw } from "./Flaw"

export interface Type<T> {
	readonly name: string
	readonly condition?: string
	is(value: any | T): value is T
	flaw<A>(value: A): A extends T ? undefined : Flaw
}

export namespace Type {
	export type IsFunction<T> = Type<T>["is"]
	export type FlawFunction<T> = Type<T>["flaw"]
	export function create<T>(
		name: string | (() => string),
		is: IsFunction<T>,
		flaw: FlawFunction<T>,
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
