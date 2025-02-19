import type { Class } from "Class"

export interface Definition {
	readonly class: Class
	readonly name: string
	readonly description?: string
	readonly condition?: string[]
}
export namespace Definition {}
