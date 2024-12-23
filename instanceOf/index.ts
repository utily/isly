import { Type } from "../Type"

export function instanceOf<T = undefined>(type: new () => T, name?: string): Type<T> {
	return new InstantOf<T>(name ?? "class", type)
}
export class InstantOf<T = undefined> extends Type<T> {
	readonly class = "instanceOf"
	constructor(name: string, readonly type: new (...argument: any[]) => T) {
		super(name)
	}
	is = (value: T | any): value is T => value instanceof this.type
}
