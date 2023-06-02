import { Flaw } from "./Flaw"

export abstract class Type<T> {
	get name(): string {
		return typeof this._name == "function" ? this._name() : this._name
	}
	get condition(): string | undefined {
		return typeof this._condition == "function" ? this._condition() : this._condition
	}
	public optional(): Type<T | undefined> {
		return new IslyOptional<T>(this)
	}
	public readonly(): Type<Readonly<T>> {
		return new IslyReadonly<T>(this)
	}
	public array(...options: array.Option[]): Type<T[]> {
		return array(this, ...options) as any
	}
	constructor(
		protected readonly _name: string | (() => string),
		protected readonly _condition?: string | (() => string | undefined)
	) {}
	/**
	 * Type guard for the type.
	 * [Typescript documentation: Using type predicates](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates)
	 *
	 * Since it is implemented as a closure, it is possible to reexport this function.
	 * ```
	 * const type = isly.object()
	 * const is = type.is
	 * if (is({})) {... // This would not be possible with a class-function, since the scope of `this` changes.
	 * ```
	 */
	abstract is: Type.IsFunction<T>
	/**
	 * Return the value if the value is valid for the type, otherwise undefined.
	 * For objects, unknown properties are filtered.
	 *
	 * Eg: isly.number().value(NaN) returns undefined
	 */
	public get: Type.GetFunction<T> = value => (this.is(value) ? this.getValue(value) : undefined)
	protected getValue(value: T) {
		return value
	}
	/**
	 * Return a flaw object, describing the flaws of the value compared to expected type.
	 *
	 * If it is a correct value, according to the type, it returns a Flaw with the message `{message:"This type is correct.", isFlaw: false, ... }`
	 *
	 * Implemented as a closure.
	 */
	public flaw: Type.FlawFunction = value => {
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
export namespace Type {
	export type IsFunction<T> = (value: any | T) => value is T
	export type FlawFunction = (value: any) => Flaw
	export type GetFunction<T> = (value: any) => T | undefined
}

class IslyOptional<T> extends Type<T | undefined> {
	constructor(protected readonly backend: Type<T>) {
		super(() => backend.name + " | undefined", backend.condition)
	}
	is = (value => value == undefined || this.backend.is(value)) as Type.IsFunction<T>
	protected createFlaw(value: any): Omit<Flaw, "isFlaw" | "type" | "condition"> {
		return this.createFlawFromType(this.backend, value)
	}
}

class IslyReadonly<T> extends Type<Readonly<T>> {
	constructor(protected readonly backend: Type<T>) {
		super(() => `Readonly<${backend.name}>`, backend.condition)
	}
	is = (value => value == undefined || this.backend.is(value)) as Type.IsFunction<T>
	protected createFlaw(value: any): Omit<Flaw, "isFlaw" | "type" | "condition"> {
		return this.createFlawFromType(this.backend, value)
	}
}
// Array has to be here to avoid circular dependency
export namespace array {
	export type Criteria = "length" | "minLength" | "maxLength"
	export type Option<C extends Criteria = Criteria> = { criteria: C; value: OptionValue<C> }
}
/**
 * Possible to have custom type for every Criteria.
 * Add option types with:
 * `C extends "myNewCriteria" ? optionTypeOfMyNewCriteria : number`
 */
type OptionValue<C extends array.Criteria> = C extends array.Criteria ? number : never

// The overloaded function is to avoid resulting in an Type<any[]>, but still be able to do array<number[]>(...) with only one generic!
// Thanks to @jcalz at StackOverflow!
// https://stackoverflow.com/questions/75128444/force-type-argument-inference-not-to-use-any-for-an-array-typescript?noredirect=1#comment132590506_75128444
export function array<T extends any[] = never>(itemType: Type<T[number]>, ...options: array.Option[]): Type<T>
export function array<I>(itemType: Type<I>, ...options: array.Option[]): Type<I[]>
export function array<T extends any[]>(itemType: Type<T[number]>, ...options: array.Option[]): Type<T> {
	return new IslyArray(itemType, options)
}

const criteriaFunctions: {
	[K in array.Criteria]: {
		is: (value: any[], optionValue: OptionValue<K>) => boolean
		condition: (optionValue: OptionValue<K>) => string
	}
} = {
	length: {
		is: (value: any[], optionValue: number) => value.length == optionValue,
		condition: optionValue => `length == ${optionValue}`,
	},
	minLength: {
		is: (value: any[], optionValue: number) => value.length >= optionValue,
		condition: optionValue => `minLength == ${optionValue}`,
	},
	maxLength: {
		is: (value: any[], optionValue: number) => value.length <= optionValue,
		condition: optionValue => `maxLength == ${optionValue}`,
	},
}

export class IslyArray<T extends any[]> extends Type<T> {
	constructor(protected readonly itemType: Type<T[number]>, protected readonly options: array.Option[]) {
		super(
			() => this.baseName() + "[]",
			options.length > 0 ? options.map(c => criteriaFunctions[c.criteria].condition(c.value)).join(" & ") : undefined
		)
	}
	protected baseName() {
		return this.itemType.name.includes(" ") ? `(${this.itemType.name})` : this.itemType.name
	}
	protected itemName(index: number) {
		return `${this.baseName()}[${index}]`
	}
	is = (value =>
		globalThis.Array.isArray(value) &&
		this.options.every(option => criteriaFunctions[option.criteria].is(value, option.value)) &&
		value.every(item => this.itemType.is(item))) as Type.IsFunction<T>
	createFlaw(value: any): Omit<Flaw, "isFlaw" | "type" | "condition"> {
		const flaws =
			(globalThis.Array.isArray(value) &&
				value.flatMap((item, index) => {
					const subFlaw = this.itemType.flaw(item)
					return subFlaw.isFlaw ?? true ? [{ ...subFlaw, type: this.itemName(index) }] : []
				})) ||
			[]
		return {
			...(flaws.length > 0 ? { flaws } : undefined),
		}
	}
	protected getValue(value: T) {
		return value.map(item => this.itemType.get(item)) as T
	}
}
