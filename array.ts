import { Flaw } from "./Flaw"
import { Type } from "./Type"

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

const criteriaFunctions: {
	[K in array.Criteria]: {
		is: (value: any[], optionValue: OptionValue<K>) => boolean
		condition: (optionValue: OptionValue<K>) => string
	}
} = {
	length: {
		is: (value: any[], optionValue) => value.length == optionValue,
		condition: optionValue => `length == ${optionValue}`,
	},
	minLength: {
		is: (value: any[], optionValue) => value.length >= optionValue,
		condition: optionValue => `minLength == ${optionValue}`,
	},
	maxLength: {
		is: (value: any[], optionValue) => value.length <= optionValue,
		condition: optionValue => `maxLength == ${optionValue}`,
	},
}

class IslyArray<T extends any[]> extends Type<T> {
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
	get: Type.GetFunction<T> = value => {
		return this.is(value) ? (value.map(item => this.itemType.get(item)) as T) : undefined
	}
}

// The overloaded function is to avoid resulting in an Type<any[]>, but still be able to do array<number[]>(...) with only one generic!
// Thanks to @jcalz at StackOverflow!
// https://stackoverflow.com/questions/75128444/force-type-argument-inference-not-to-use-any-for-an-array-typescript?noredirect=1#comment132590506_75128444
export function array<T extends any[] = never>(itemType: Type<T[number]>, ...options: array.Option[]): Type<T>
export function array<I>(itemType: Type<I>, ...options: array.Option[]): Type<I[]>
export function array<T extends any[]>(itemType: Type<T[number]>, ...options: array.Option[]): Type<T> {
	return new IslyArray(itemType, options)
}
