import { Flaw } from "./Flaw"
import { Type } from "./Type"

export function named<T>(name: string, backend: Type<T>): Type<T> {
	return new named.Class<T>(name, backend)
}
export namespace named {
	export class Class<T = unknown> extends Type<T> {
		readonly class = "named"
		constructor(name: string, protected readonly backend: Type<T>) {
			super(name, () => backend.condition)
		}
		is = (value: T | any): value is T => this.backend.is(value)
		createFlaw(value: any): Omit<Flaw, "isFlaw" | "type" | "condition"> {
			return this.createFlawFromType(this.backend, value)
		}
		get = (value: any): T | undefined => this.backend.get(value)
	}
}
