import { Base } from "../Base"
import type { Definition as islyDefinition } from "../Definition"

export interface Definition<T extends object = Record<string, any>> extends Base.Definition {
	readonly properties: Record<keyof T, islyDefinition>
}
export namespace Definition {}
