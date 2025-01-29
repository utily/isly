export interface Flaw {
	readonly name: string
	readonly description?: string
	readonly condition?: string[]
	readonly flaws?: readonly (Flaw & ({ index?: number } | { property: string }))[]
}
export namespace Flaw {}
