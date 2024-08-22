import { Flaw } from "./Flaw"
import { Type } from "./Type"

export function named<T>(name: string, backend: Type<T>): Type<T> {
	return new IslyNamed<T>(name, backend)
}
export class IslyNamed<T = unknown> extends Type<T> {
	readonly class = "named"
	constructor(name: string, readonly backend: Type<T>) {
		super(name, () => backend.condition)
	}
	is = (value: T | any): value is T => this.backend.is(value)
	createFlaw(value: any): Omit<Flaw, "isFlaw" | "type" | "condition"> {
		return this.createFlawFromType(this.backend, value)
	}
	getBackend() {
		return this.backend
	}
	get = (value: any): T | undefined => this.backend.get(value)
}
