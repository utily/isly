import type { Type } from "./Type"

export type Name = string

export namespace Name {
	export function fromNames(names: Name[]): Name {
		return names.length == 1 ? names[0]! : `(${names.join(" | ")})`
	}
	export function fromString(name: undefined | string | string[]): Name {
		return !name ? "string" : !Array.isArray(name) ? `'${name}'` : fromNames(name.map(fromString))
	}
	export function fromNumber(name: number | number[]): Name {
		return !Array.isArray(name) ? name.toString() : fromNames(name.map(fromNumber))
	}
	export function fromBoolean(name: boolean): Name {
		return name.toString()
	}
	export function fromUnion(base: Type[]): Name {
		return fromNames(base.map(b => b.name))
	}
	export function fromArray(base: Type): Name {
		return `${base.name}[]`
	}
}
