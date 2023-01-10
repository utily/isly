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

export function array<T>(itemType: Type<T>, ...options: array.Option[]): Type<T[]> {
	const name = () => itemType.name + "[]"

	const is = (value =>
		globalThis.Array.isArray(value) &&
		options.every(option => criteriaFunctions[option.criteria].is(value, option.value)) &&
		value.every(item => itemType.is(item))) as Type.IsFunction<T[]>

	return Type.create<T[]>(name, is, value =>
		is(value)
			? undefined
			: {
					type: name(),
					...(options.length > 0
						? { condition: options.map(c => criteriaFunctions[c.criteria].condition(c.value)).join(" & ") }
						: undefined),
			  }
	)
}
