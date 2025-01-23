import { Type } from "../Type"

export interface Definition extends Type.Definition {
	readonly class: "intersection"
	readonly types: Definition[]
}
export namespace Definition {}
