import { isly } from "../index"

export type NotSon = string | { [key: string]: NotSon }

export namespace NotSon {
	export const type: isly.Union<NotSon> = isly.union<NotSon>(
		isly.string(),
		isly.record<Exclude<NotSon, string>>(
			isly.string(),
			isly.lazy(() => type, "NotSon")
		)
	)
	export const is = type.is
	export const flawed = type.flawed
	export namespace alternateTypeDeclaration1 {
		export const { type, is, flawed } = isly
			.union<NotSon>(
				isly.string(),
				isly.record<Exclude<NotSon, string>>(
					isly.string(),
					isly.lazy((): isly.Union<NotSon> => type, "NotSon")
				)
			)
			.bind()
	}
	export namespace alternateTypeDeclaration2 {
		export const type = isly.string().or(
			isly.record<Exclude<NotSon, string>>(
				isly.string(),
				isly.lazy((): isly.Union<NotSon> => type, "NotSon")
			)
		)
		export const restrictedType = type
			.rename("Pearson")
			.restrict(value => typeof value !== "string" || /^\w{8}$/.test(value), "^\\w{8}$")
	}
	export const aNotSon: NotSon = {
		foo: "bar",
		baz: {
			hello: "hi",
			thing: {
				thing: "thing",
			},
		},
	}
	export const notANotSon = {
		foo: "bar",
		baz: {
			hello: "hi",
			no: { error: 95 },
		},
	}
}
describe("isly.lazy", () => {
	it.each<[any, boolean]>([
		["foo", true],
		[42, false],
		[NotSon.aNotSon, true],
		[NotSon.notANotSon, false],
	])("should type check", (value, result) => {
		expect(NotSon.type.is(value)).toBe(result)
		expect(NotSon.alternateTypeDeclaration1.is(value)).toBe(result)
		expect(NotSon.alternateTypeDeclaration2.type.is(value)).toBe(result)
	})
	it("renames and restricts", () => {
		expect(NotSon.alternateTypeDeclaration2.restrictedType.name).toEqual("Pearson")
		expect(NotSon.alternateTypeDeclaration2.restrictedType.condition).toEqual(["^\\w{8}$"])
		expect(NotSon.alternateTypeDeclaration2.restrictedType.is("abcdefgh")).toBe(true)
		expect(NotSon.alternateTypeDeclaration2.restrictedType.is("abcdefg")).toBe(false)
		// a restriction is not recursive unless you define a recursive verify function
		expect(NotSon.alternateTypeDeclaration2.restrictedType.is(NotSon.aNotSon)).toBe(true)
	})
	it("shows flaws", () => {
		expect(NotSon.type.flawed(NotSon.aNotSon)).toBe(false)
		expect(NotSon.type.flawed(NotSon.notANotSon)).toEqual({
			flaws: [
				{
					name: "string",
				},
				{
					flaws: [
						{
							name: "NotSon",
							property: "baz",
						},
					],
					name: "Record<string, NotSon>",
				},
			],
			name: "(string | Record<string, NotSon>)",
		})
		expect(NotSon.alternateTypeDeclaration2.restrictedType.flawed("abc")).toEqual({
			condition: ["^\\w{8}$"],
			flaws: [
				{
					flaws: [],
					name: "Record<string, NotSon>",
				},
			],
			name: "Pearson",
		})
	})
})
