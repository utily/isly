import { isly } from "../index"

export type NotSON = string | { [key: string]: NotSON }

export namespace NotSON {
	export const type: isly.Union<NotSON> = isly.union<NotSON>(
		isly.string(),
		isly.record<Exclude<NotSON, string>>(
			isly.string(),
			isly.lazy(() => type, "NotSON")
		)
	)
	export const is = type.is
	export const flawed = type.flawed
	export namespace alternateTypeDeclaration1 {
		export const { type, is, flawed } = isly
			.union<NotSON>(
				isly.string(),
				isly.record<Exclude<NotSON, string>>(
					isly.string(),
					isly.lazy((): isly.Union<NotSON> => type, "NotSON")
				)
			)
			.bind()
	}
	export namespace alternateTypeDeclaration2 {
		export const type = isly.string().or(
			isly.record<Exclude<NotSON, string>>(
				isly.string(),
				isly.lazy((): isly.Union<NotSON> => type, "NotSON")
			)
		)
		export const restrictedType = type
			.rename("Petsson")
			.restrict(value => typeof value !== "string" || /^\w{8}$/.test(value), "^\\w{8}$")
	}
	export const aNotSON: NotSON = {
		foo: "bar",
		baz: {
			hej: "svejs",
			grej: {
				sak: "ting",
			},
		},
	}
	export const notANotSON = {
		foo: "bar",
		baz: {
			hej: "svejs",
			nej: { fel: 95 },
		},
	}
}
describe("isly.lazy", () => {
	it.each<[any, boolean]>([
		["foo", true],
		[42, false],
		[NotSON.aNotSON, true],
		[NotSON.notANotSON, false],
	])("should type check", (value, result) => {
		expect(NotSON.type.is(value)).toBe(result)
		expect(NotSON.alternateTypeDeclaration1.is(value)).toBe(result)
		expect(NotSON.alternateTypeDeclaration2.type.is(value)).toBe(result)
	})
	it("renames and restricts", () => {
		expect(NotSON.alternateTypeDeclaration2.restrictedType.name).toEqual("Petsson")
		expect(NotSON.alternateTypeDeclaration2.restrictedType.condition).toEqual(["^\\w{8}$"])
		expect(NotSON.alternateTypeDeclaration2.restrictedType.is("abcdefgh")).toBe(true)
		expect(NotSON.alternateTypeDeclaration2.restrictedType.is("abcdefg")).toBe(false)
		// a restriction is not recursive unless you define a recursive verify function
		expect(NotSON.alternateTypeDeclaration2.restrictedType.is(NotSON.aNotSON)).toBe(true)
	})
	it("shows flaws", () => {
		expect(NotSON.type.flawed(NotSON.aNotSON)).toBe(false)
		expect(NotSON.type.flawed(NotSON.notANotSON)).toEqual({
			flaws: [
				{
					name: "string",
				},
				{
					flaws: [
						{
							name: "NotSON",
							property: "baz",
						},
					],
					name: "Record<string, NotSON>",
				},
			],
			name: "(string | Record<string, NotSON>)",
		})
		expect(NotSON.alternateTypeDeclaration2.restrictedType.flawed("abc")).toEqual({
			condition: ["^\\w{8}$"],
			flaws: [
				{
					flaws: [],
					name: "Record<string, NotSON>",
				},
			],
			name: "Petsson",
		})
	})
})
