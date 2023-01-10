import { Type } from "./Type"

export function string<T extends string = string>(...regexp: RegExp[]): Type<T>
export function string<T extends string = string>(...strings: string[]): Type<T>
export function string<T extends string = string>(...args: string[] | RegExp[]): Type<T> {
	const name = "string"
	function is(value: any | string): value is T {
		return (
			typeof value == "string" &&
			(args.length == 0 || args.some(arg => (arg instanceof RegExp ? arg.test(value) : arg == value)))
		)
	}
	const flaw: Type.FlawFunction = value =>
		is(value)
			? undefined
			: {
					type: name,
					...(args.length > 0
						? {
								condition: args
									.map(arg => (arg instanceof RegExp ? `/${arg.source}/${arg.flags}` : `"${arg}"`))
									.join(" | "),
						  }
						: undefined),
			  }

	return Type.create(name, is, flaw)
}
