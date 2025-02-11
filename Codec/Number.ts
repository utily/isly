import type { Codec } from "."

export namespace Number {
	export function create(options: Options = Options.standard): Codec<number> {
		const format = Options.formatter({ ...Options.standard, ...options })
		const validate = Options.validator({ ...Options.standard, ...options })
		return {
			encode(value: number): string | undefined {
				return format(value)
			},
			decode(data: string): number | undefined {
				let result: number | undefined
				try {
					result = (options.precision == 0 ? globalThis.Number.parseInt : globalThis.Number.parseFloat)(data)
				} catch {
					result = undefined
				}
				return result != undefined && validate(result) ? result : undefined
			},
		}
	}
	export interface Options {
		precision?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
	}
	export namespace Options {
		export const standard: Options = {}
		export function validator(options: Options): (value: number) => value is number {
			const result: ((value: number) => boolean)[] = []
			return (value: number): value is number => result.every(verifier => verifier(value))
		}
		export function formatter(options: Options): (value: number) => string | undefined {
			return typeof options.precision == "number"
				? (value: number) => value.toPrecision(options.precision)
				: (value: number) => value.toString()
		}
	}
}
