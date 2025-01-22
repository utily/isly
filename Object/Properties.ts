import { Type } from "../Type"

export type Properties<T extends object> = {
	[P in keyof T]: Type<T[P]>
}
export namespace Properties {}
