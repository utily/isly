import { Type } from "../Type"

export interface Definition extends Type.Definition {
	readonly class: "intersection"
	readonly types: Type<unknown>[]
}
export namespace Definition {}
