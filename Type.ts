import { Flaw } from "./Flaw"

export interface Type<T> {
	readonly name: string
	readonly condition?: string
	/**
	 * Type guard for the type.
	 * [Typescript documentation: Using type predicates](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates)
	 *
	 * Implemented as a closure.
	 */
	is: (value: any | T) => value is T
	/**
	 * Return a flaw object, describing the flaws of the value compared to expected type.
	 *
	 * If it is a correct value, according to the type, it returns a Flaw with the message `{message:"This type is correct.", isFlaw: false, ... }`
	 *
	 * Implemented as a closure.
	 */
	flaw: (value: any) => Flaw
}

export namespace Type {
	export type IsFunction<T> = Type<T>["is"]
	export type FlawFunction<T> = Type<T>["flaw"]

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
		/**
		 * Since it is implemented as a closure, it is possible to reexport this function.
		 * ```
		 * const type = isly.object()
		 * const is = type.is
		 * if (is({})) {... // This would not be possible with a class-function.
		 * ```
		 */
		abstract is: IsFunction<T>

		public flaw: FlawFunction<T> = value => {
			return this.is(value)
				? {
						type: this.name,
						...(this.condition ? { condition: this.condition } : undefined),
						isFlaw: false,
						message: "This type is correct.",
				  }
				: {
						...(this.condition ? { condition: this.condition } : undefined),
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
