import { Base } from "../Base"
import { Number } from "../Number"
import { String } from "../String"
import { Unknown } from "../Unknown"
import { Class } from "./Class"
import { Creator as RecordCreator } from "./Creator"
import { Definition as RecordDefinition } from "./Definition"

export type Record<
	V extends globalThis.Record<string, any> | globalThis.Record<number, any> | globalThis.Record<symbol, any> = Record<
		string,
		any
	>,
	KType extends keyof V extends string
		? String
		: keyof V extends number
		? Number
		: Unknown<symbol> = keyof V extends string ? String : keyof V extends number ? Number : Unknown<symbol>,
	VType extends Base<V[keyof V]> = Unknown<V[keyof V]>
> = Omit<Class<V, KType, VType>, "constructor">

export namespace Record {
	export import Creator = RecordCreator
	export import Definition = RecordDefinition
}
