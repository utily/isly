import type { Codec } from "."

export namespace String {
	export function create(options: Options = Options.standard): Codec<string> {
		const format = Options.formatter({ ...Options.standard, ...options })
		const validate = Options.validator({ ...Options.standard, ...options })
		return {
			encode(value: string): string | undefined {
				return format(value)
			},
			decode(data: string): string | undefined {
				return validate(data) ? data : undefined
			},
		}
	}
	// eslint-disable-next-line @typescript-eslint/no-empty-object-type
	export interface Options {}
	export namespace Options {
		export const standard: Required<Options> = {}
		export function validator(options: Required<Options>): (value: string) => value is string {
			const result: ((value: string) => boolean)[] = []
			return (value: string): value is string => result.every(verifier => verifier(value))
		}
		export function formatter(options: Options): (value: string) => string | undefined {
			return value => value.toString()
		}
	}
}
