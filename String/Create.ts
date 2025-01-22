import type { String } from "."

export type Create<T extends string = string> = (
	...parameters: ["string"] | ["string", values: readonly T[]] | ["string", ...(readonly T[])] | ["string", RegExp]
) => String<T>

export namespace Create {
	export type Parameters<T extends string = string> = globalThis.Parameters<Create<T>>
}
