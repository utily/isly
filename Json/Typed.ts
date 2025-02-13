import type { isly } from "../index"
import { Data } from "./Data"
import { Options } from "./Options"
import { Untyped } from "./Untyped"

export class Typed<T extends Data<T>> {
	private backend: Untyped
	get options(): Options {
		return this.backend.options
	}
	set options(value: Options) {
		this.backend.options = value
	}
	constructor(public type: isly.Type<T>, options: Options = {}) {
		this.backend = new Untyped(options)
	}
	parse(data: string): T | undefined {
		return this.type.get(this.backend.parse(data))
	}
	stringify(data: T): string {
		return this.backend.stringify(data)
	}
}
