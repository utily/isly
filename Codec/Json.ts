import type { Codec } from "."

export namespace Json {
	export function create<V>(options?: Options): Codec<V> {
		return {
			encode(value: V): string | undefined {
				return JSON.stringify(value, options?.replacer, options?.space)
			},
			decode(data: string): V | undefined {
				let result: V | undefined = undefined
				try {
					result = JSON.parse(data)
				} catch {
					result = undefined
				}
				return result
			},
		}
	}
	export interface Options {
		replacer?: (this: any, key: string, value: any) => any
		space?: string | number
	}
}
