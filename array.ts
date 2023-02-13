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

// The overloaded function is to avoid resulting in an Type<any[]>, but still be able to do array<number[]>(...) with only one generic!
// Thanks to @jcalz at StackOverflow!
// https://stackoverflow.com/questions/75128444/force-type-argument-inference-not-to-use-any-for-an-array-typescript?noredirect=1#comment132590506_75128444
export function array<T extends any[] = never>(itemType: Type<T[number]>, ...options: array.Option[]): Type<T>
export function array<I>(itemType: Type<I>, ...options: array.Option[]): Type<I[]>
export function array<T extends any[]>(itemType: Type<T[number]>, ...options: array.Option[]): Type<T> {
	const baseName = () => (itemType.name.includes(" ") ? `(${itemType.name})` : itemType.name)

	const name = () => baseName() + "[]"
	const itemName = (index: number) => `${baseName()}[${index}]`

	const is = (value =>
		globalThis.Array.isArray(value) &&
		options.every(option => criteriaFunctions[option.criteria].is(value, option.value)) &&
		value.every(item => itemType.is(item))) as Type.IsFunction<T>
	const flaw = (value => {
		if (is(value))
			return undefined
		const flaws =
			(globalThis.Array.isArray(value) &&
				value.flatMap((item, index) => {
					const subFlaw = itemType.flaw(item)
					return subFlaw ? [{ ...subFlaw, type: itemName(index) }] : []
				})) ||
			[]
		return {
			type: name(),
			...(options.length > 0
				? { condition: options.map(c => criteriaFunctions[c.criteria].condition(c.value)).join(" & ") }
				: undefined),
			...(flaws.length > 0 ? { flaws } : undefined),
		}
	}) as Type.FlawFunction<T>

	return Type.create<T>(name, is, flaw)
}
