import { Base } from "../Base"
import type { Definition as islyDefinition } from "../Definition"
import { Number } from "../Number"
import { String } from "../String"

export interface Definition extends Base.Definition {
	readonly key: String.Definition | Number.Definition
	readonly value: islyDefinition
}
export namespace Definition {}
