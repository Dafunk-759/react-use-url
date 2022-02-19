import {
  parsePath,
  parseSearch,
  parseHash,
  arrEq
} from "./util"

import {
  matchPath,
  otherwise
} from "./index"

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

describe("test parseHash and parseSearch", () => {
  test("test parseHash", () => {
    expect(parseHash("#")).toBe("")
    expect(parseHash("")).toBe("")
    expect(parseHash("#foo")).toBe("foo")
  })

  test("test parseSearch", () => {
    expect(parseHash("?age=12&name=foo")).toBe("age=12&name=foo")
    expect(parseHash("")).toBe("")
    expect(parseHash("?")).toBe("")
  })
})

describe("url eq", () => {
  test("arrEq", () => {
    expect(arrEq([], [])).toBe(true)
    expect(arrEq([1, 2], [3, 4])).toBe(false)
    expect(arrEq([1, 2], [1, 2, 3])).toBe(false)
    expect(arrEq(["aa", "bb", "cc"], ["aa", "bb"])).toBe(false)
    expect(arrEq(["aa", "bb"], ["aa", "bb"])).toBe(true)
  })
})

describe("test matchPath", () => {
  
  test("matchPath path", () => {
    const path1 = []
    const ret1 = matchPath(path1, {
      "/": () => "branch1"
    })

    const path2 = ["foo"]
    const ret2 = matchPath(path2, {
      "/": () => "branch1",
      "/foo": () => "branch2",
      "/foo/bar": () => "branch3",
      "/bar": () => "branch4",
      "/baz": () => "branch5"
    })

    const path3 = ["user", "524", "foo"]
    const ret3 = matchPath(path3, {
      "/bar": () => "branch1",
      "/user/:id/:name": (id, name) => `${id},${name}`
    })

    const path4 = ["qewrqwr", "afafafa"]
    const ret4 = matchPath(path4, {
      "/foo": () => "branch1",
      "/bar": () => "branch2",
      "/foo/bar": () => "branch3",
      [otherwise]: () => "default branch"
    })

    expect(ret1).toBe("branch1")
    expect(ret2).toBe("branch2")
    expect(ret3).toBe("524,foo")
    expect(ret4).toBe("default branch")
  })
})