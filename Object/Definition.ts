import { Type } from "../Type"

export interface Definition<T extends object = Record<string, any>> extends Type.Definition {
	readonly class: "object"
	readonly properties: Record<keyof T, Type.Definition>
}
export namespace Definition {}
