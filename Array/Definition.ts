import { Base } from "../Base"
import type { Definition as islyDefinition } from "../Definition"

export interface Definition extends Base.Definition {
	readonly base: islyDefinition
}
export namespace Definition {}
