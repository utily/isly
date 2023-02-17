import { Flaw } from "./Flaw"

export interface Type<T> {
	readonly name: string
	readonly condition?: string
	is(value: any | T): value is T
	flaw(value: any): undefined | Flaw
}

export namespace Type {
	export type IsFunction<T> = Type<T>["is"]
	export type FlawFunction<T> = Type<T>["flaw"]
	// /**
	//  * @deprecated Use AbstractType
	//  */
	// export function create<T>(
	// 	name: string | (() => string),
	// 	is: IsFunction<T>,
	// 	flaw: FlawFunction<T>,
	// 	condition?: string
	// ): Type<T> {
	// 	return Object.defineProperty(
	// 		{
	// 			is,
	// 			// flaw: (value): FlawFunction => (is(value) ? {isFlaw: false, type: } satisfies Flaw : flaw(value)),
	// 			flaw,
	// 			condition,
	// 		},
	// 		"name",
	// 		{ get: typeof name == "function" ? name : () => name }
	// 	) as Type<T>
	// }

	export abstract class AbstractType<T> implements Type<T> {
		get name(): string {
			return typeof this._name == "function" ? this._name() : this._name
		}
		get condition(): string | undefined {
			return typeof this._condition == "function" ? this._condition() : this._condition
		}
		constructor(
			protected readonly _name: string | (() => string),
			protected readonly _condition?: string | (() => string | undefined)
		) {}

		abstract is(value: any | T): value is T

		public flaw<A>(value: A): undefined | Flaw {
			return this.is(value)
				? undefined
				: // {
				  // 		type: this.name,
				  // 		...(this.condition ? { condition: this.condition } : undefined),
				  // 		isFlaw: false,
				  // 		message: "This type is correct.",
				  //   }
				  {
						...(this.condition ? { condition: this.condition } : undefined),
						// isFlaw: true,
						...this.createFlaw(value),
						type: this.name,
				  }
		}
		/**
		 * Override this to create custom Flaws.
		 * Not necessary for simple types.
		 */
		protected createFlaw(value: any): Omit<Flaw, "isFlaw" | "type" | "condition"> {
			return {}
		}
		/**
		 * Used by types that use a backend type.
		 */
		protected createFlawFromType(backend: Type<any>, value: any): Omit<Flaw, "isFlaw" | "type" | "condition"> {
			return "createFlaw" in backend && typeof backend.createFlaw == "function"
				? backend.createFlaw(value)
				: backend.flaw(value)
		}
	}
}
