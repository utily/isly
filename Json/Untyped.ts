import { Data } from "./Data"
import { Options } from "./Options"

export class Untyped {
	constructor(public options: Options = {}) {}
	parse<T extends Data<T> = Data>(data: string): T | undefined {
		let result: T | undefined
		try {
			result = JSON.parse(data)
		} catch {
			result = undefined
		}
		return result
	}
	stringify<T extends Data<T> = Data>(data: T): string {
		return JSON.stringify(data, this.options?.replacer, this.options?.space)
	}
}
