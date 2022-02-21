import {
  useEffect,
  useState,
  parsePath,
  parseHash,
  parseSearch,
  location,
  history,
  pushState,
  replaceState,
  dispatchEvent,
  addEventListener,
  removeEventListener,
  makeEvent,
  POPSTATE,
  arrEq,
  safeStringify,
  safeParse
} from "./util"

export function push(path, state = null) {
  pushState(path, safeStringify(state))
  dispatchEvent(makeEvent(POPSTATE))
}

export function replace(path, state = null) {
  replaceState(path, safeStringify(state))
  dispatchEvent(makeEvent(POPSTATE))
}

export function getInitUrl() {
  const state = typeof history.state === "string"
    ? history.state
    : safeStringify(history.state)

  return {
    path: path(),
    hash: hash(),
    search: search(),
    state
  }
}

export function watchUrl(callback) {
  const watchID = () => callback(getInitUrl())
  addEventListener(POPSTATE, watchID)
  return watchID
}

export function unwatchUrl(watchID) {
  removeEventListener(POPSTATE, watchID)
}

export function useUrl() {
  const [url, setUrl] = useState(getInitUrl)

  useEffect(() => {
    const watchID = watchUrl(url => setUrl(() => url))

    const newUrl = getInitUrl()
    if(!urlEqual(newUrl, url)) {
      setUrl(() => newUrl)
    }

    return () => unwatchUrl(watchID)
  })

  return {
    ...url,
    state: safeParse(url.state)
  }
}

export const otherwise = Symbol("otherwise")

export function matchPath(path, matchOption) {

  for(const key of Object.keys(matchOption)) {
    const matcher = parsePath(key)
    const ret = match(path, matcher)

    switch(ret.t) {
      case "NotMatch":
        continue
      case "Match":
        return matchOption[key](...ret.vars)
    }
  }

  return (matchOption[otherwise] ?? (() => {}))()
}


function match(realPath, matcher) {
  const len = realPath.length
  if (len !== matcher.length) return {t:"NotMatch"}

  const matchedVar = []

  for(let i = 0; i < len; i++) {
    const p = realPath[i]
    const mp = matcher[i]

    if (mp.startsWith(":")) {
      matchedVar.push(p)
    } else if (p !== mp) {
      return {t:"NotMatch"}
    }
  }

  return {t:"Match", vars: matchedVar}
}

function urlEqual(u1, u2) {
  return (
    u1.hash === u2.hash 
      && u1.search === u2.search 
      && arrEq(u1.path, u2.path)
      && u1.state === u2.state   
  ) 
}

function path() {
  return parsePath(location.pathname)
}

function hash() {
  return parseHash(location.hash)
}

function search() {
  return parseSearch(location.search)
}