import { Base } from "../Base"

export interface Definition<T extends object = Record<string, any>> extends Base.Definition {
	readonly properties: Record<keyof T, Base.Definition>
}
export namespace Definition {}
