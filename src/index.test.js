import {
  parsePath,
  parseSearch,
  parseHash
} from "./util"

describe("test parsePath", () => {
  test(`"" == []`, () => {
    expect(parsePath("")).toEqual([])
  })
  test(`"/" == []`, () => {
    expect(parsePath("/")).toEqual([])
  })
  test(`"/foo" == ["foo"]`, () => {
    expect(parsePath("/foo")).toEqual(["foo"])
  })
  test(`"/bar/foo" == ["bar", "foo"]`, () => {
    expect(parsePath("/bar/foo")).toEqual(["bar", "foo"])
  })
  test(`"/bar/foo/" == []`, () => {
    expect(parsePath("/bar/foo/")).toEqual(["bar", "foo"])
  })
  test(`"/bar/foo?baz=qux" == []`, () => {
    expect(parsePath("/bar/foo/?baz=qux")).toEqual(["bar", "foo"])
  })
})