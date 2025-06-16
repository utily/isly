import { Base } from "../Base"
import type { isly } from "../index"

export type Standard = keyof Mapping
interface Mapping {
	ArrayBuffer: isly.Object<globalThis.ArrayBuffer>
	ArrayBufferLike: isly.Union<globalThis.ArrayBufferLike>
	ArrayBufferView: isly.Object<globalThis.ArrayBufferView>
	Blob: isly.Object<globalThis.Blob>
	File: isly.Object<globalThis.File>
	FormData: isly.Object<globalThis.FormData>
	Headers: isly.Object<globalThis.Headers>
	ReadableStream: isly.Object<globalThis.ReadableStream>
	Request: isly.Object<globalThis.Request>
	RequestInit: isly.Object<globalThis.RequestInit>
	Response: isly.Object<globalThis.Response>
	ResponseInit: isly.Object<globalThis.ResponseInit>
	URL: isly.Object<globalThis.URL>
	URLSearchParams: isly.Object<globalThis.URLSearchParams>
}
const creator: { [P in Standard]: () => Mapping[P] } = {
	ArrayBuffer: () =>
		Base.isly.object<globalThis.ArrayBuffer>(
			{
				byteLength: Base.isly.number(),
				slice: Base.isly.function(),
				[Symbol.toStringTag]: Base.isly.string("value", "ArrayBuffer"),
			},
			"ArrayBuffer"
		),
	ArrayBufferLike: () =>
		Base.isly
			.union<globalThis.ArrayBufferLike>(
				Base.isly.instance(ArrayBuffer, "ArrayBuffer"),
				Base.isly.instance(SharedArrayBuffer, "SharedArrayBuffer")
			)
			.rename("ArrayBufferLike"),
	ArrayBufferView: () =>
		Base.isly.object<globalThis.ArrayBufferView>(
			{
				buffer: Base.isly.standard("ArrayBufferLike"),
				byteLength: Base.isly.number(),
				byteOffset: Base.isly.number(),
			},
			"ArrayBufferView"
		),
	Blob: () =>
		Base.isly.object<globalThis.Blob>(
			{
				size: Base.isly.number().readonly(),
				type: Base.isly.string().readonly(),
				arrayBuffer: Base.isly.function(),
				bytes: Base.isly.function().optional(), // not always available
				slice: Base.isly.function(),
				text: Base.isly.function(),
				stream: Base.isly.function(),
			} as any,
			"Blob"
		),
	File: () =>
		creator.Blob().extend<File>(
			{
				name: Base.isly.string(),
				lastModified: Base.isly.number(),
			} as any, // webkitRelativePath is not standard
			"File"
		),
	FormData: () =>
		Base.isly.object<globalThis.FormData>(
			{
				append: Base.isly.function(),
				delete: Base.isly.function(),
				forEach: Base.isly.function(),
				get: Base.isly.function(),
				getAll: Base.isly.function(),
				has: Base.isly.function(),
				set: Base.isly.function(),
			},
			"FormData"
		),
	Headers: () =>
		Base.isly.object<globalThis.Headers>(
			{
				append: Base.isly.function(),
				delete: Base.isly.function(),
				forEach: Base.isly.function(),
				get: Base.isly.function(),
				getSetCookie: Base.isly.function(),
				has: Base.isly.function(),
				set: Base.isly.function(),
			},
			"Headers"
		),
	ReadableStream: () =>
		Base.isly.object<globalThis.ReadableStream>(
			{
				cancel: Base.isly.function(),
				getReader: Base.isly.function(),
				locked: Base.isly.boolean(),
				pipeThrough: Base.isly.function(),
				pipeTo: Base.isly.function(),
				tee: Base.isly.function(),
			},
			"ReadableStream"
		),
	Request: () =>
		Base.isly.object<globalThis.Request>(
			{
				arrayBuffer: Base.isly.function(),
				blob: Base.isly.function(),
				body: Base.isly.any().or(Base.isly.null()).optional(),
				bodyUsed: Base.isly.boolean(),
				bytes: Base.isly.function().optional(), // not always available
				cache: Base.isly.string(),
				clone: Base.isly.function(),
				credentials: Base.isly.string(),
				destination: Base.isly.string(),
				formData: Base.isly.function(),
				headers: Base.isly.standard("Headers"),
				integrity: Base.isly.string(),
				json: Base.isly.function(),
				keepalive: Base.isly.boolean(),
				method: Base.isly.string(),
				mode: Base.isly.string(),
				redirect: Base.isly.string(),
				referrer: Base.isly.string(),
				referrerPolicy: Base.isly.string(),
				signal: Base.isly.any(),
				text: Base.isly.function(),
				url: Base.isly.string(),
			} as any, // bytes() not always available
			"Request"
		),
	RequestInit: () =>
		Base.isly.object<globalThis.RequestInit>(
			{
				body: Base.isly.any().optional(),
				credentials: Base.isly.string("value", ["include", "same-origin", "omit"]).optional(),
				headers: Base.isly.standard("Headers").optional(),
				integrity: Base.isly.string().optional(),
				keepalive: Base.isly.boolean().optional(),
				method: Base.isly.string().optional(),
				mode: Base.isly.string("value", ["cors", "no-cors", "same-origin"]).optional(),
				redirect: Base.isly.string("value", ["follow", "error", "manual"]).optional(),
				referrer: Base.isly.string().optional(),
				referrerPolicy: Base.isly
					.string("value", [
						"no-referrer",
						"no-referrer-when-downgrade",
						"origin",
						"origin-when-cross-origin",
						"same-origin",
					])
					.optional(),
				signal: Base.isly.any().optional(),
				window: Base.isly.any().optional(),
			},
			"RequestInit"
		),
	Response: () =>
		Base.isly.object<globalThis.Response>(
			{
				arrayBuffer: Base.isly.function(),
				blob: Base.isly.function(),
				body: Base.isly.any().or(Base.isly.null()).optional(),
				bodyUsed: Base.isly.boolean(),
				bytes: Base.isly.function().optional(), // not always available
				clone: Base.isly.function(),
				formData: Base.isly.function(),
				headers: Base.isly.standard("Headers"),
				json: Base.isly.function(),
				ok: Base.isly.boolean(),
				redirected: Base.isly.boolean(),
				status: Base.isly.number(),
				statusText: Base.isly.string(),
				text: Base.isly.function(),
				type: Base.isly.string(),
				url: Base.isly.string(),
			} as any, // bytes() not always available
			"Response"
		),
	ResponseInit: () =>
		Base.isly.object<globalThis.ResponseInit>(
			{
				headers: Base.isly.standard("Headers").optional(),
				status: Base.isly.number().optional(),
				statusText: Base.isly.string().optional(),
			},
			"ResponseInit"
		),
	URL: () =>
		Base.isly.object<globalThis.URL>(
			{
				hash: Base.isly.string(),
				host: Base.isly.string(),
				hostname: Base.isly.string(),
				href: Base.isly.string(),
				origin: Base.isly.string(),
				password: Base.isly.string(),
				pathname: Base.isly.string(),
				port: Base.isly.string(),
				protocol: Base.isly.string(),
				search: Base.isly.string(),
				searchParams: Base.isly.standard("URLSearchParams"),
				toJSON: Base.isly.function(),
				toString: Base.isly.function(),
				username: Base.isly.string(),
			},
			"URL"
		),
	URLSearchParams: () =>
		Base.isly.object<globalThis.URLSearchParams>(
			{
				append: Base.isly.function(),
				delete: Base.isly.function(),
				forEach: Base.isly.function(),
				get: Base.isly.function(),
				getAll: Base.isly.function(),
				has: Base.isly.function(),
				set: Base.isly.function(),
				size: Base.isly.number(),
				sort: Base.isly.function(),
				toString: Base.isly.function(),
			} as any,
			"URLSearchParams"
		),
} as const
export namespace Standard {
	export const values = Object.keys(creator)
	// export const { type, is, flawed } = Base.isly.string("value", ...values).bind()
	export function create<V extends Standard>(type: V): Mapping[V] {
		return creator[type]() as unknown as Mapping[V]
	}
}
