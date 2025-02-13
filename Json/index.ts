import type { isly } from "../index"
import { Data as JsonData } from "./Data"
import { Options as JsonOptions } from "./Options"
import { Typed as JsonTyped } from "./Typed"
import { Untyped as JsonUntyped } from "./Untyped"

export type Json<T extends Json.Data<T> = undefined> = T extends undefined
	? Json.Untyped | Json.Typed<JsonData>
	: Json.Typed<T>
export namespace Json {
	export import Data = JsonData
	export import Options = JsonOptions
	export type Typed<T extends Json.Data> = JsonTyped<T> // only export as type, must use Json.create
	export type Untyped = JsonUntyped // only export as type, must use Json.create

	export function create<T extends Json.Data<T>>(type: isly.Type<T>, options?: Json.Options): Json<T>
	export function create(options?: Json.Options): Json
	export function create<T extends Json.Data<T> = undefined>(
		type?: isly.Type<T> | Options,
		options?: Json.Options
	): Json<T> | Json {
		return type && "is" in type ? new JsonTyped<T>(type, options) : new JsonUntyped(type)
	}
	let parser: Json | undefined
	export function parse<T extends Json.Data<T> = Json.Data>(data: string): T | undefined {
		return (parser ??= create()).parse(data) as T
	}
	export function stringify<T extends Json.Data<T> = Json.Data>(data: T): string {
		return (parser ??= create()).stringify(data)
	}
}
