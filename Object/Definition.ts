import { Type } from "../Type"
import { Properties } from "./Properties"

export interface Definition<T extends object = Record<string, any>> extends Type.Definition {
	readonly class: "object"
	readonly properties: Properties<T>
}
export namespace Definition {}
