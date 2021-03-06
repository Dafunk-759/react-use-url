export {
  useEffect,
  useState
} from "react"

export const POPSTATE = "popstate"

export const location = document.location

export const addEventListener = window.addEventListener.bind(window)

export const removeEventListener = window.removeEventListener.bind(window)

export const dispatchEvent = window.dispatchEvent.bind(window)

export const history = window.history

export const pushState = (path, state = null) => 
  history.pushState(state, "", path)

export const replaceState = (path, state = null) => 
  history.replaceState(state, "", path)

export function pipe(v, ...funcs) {
  let ret = v
  for(const f of funcs) {
    ret = f(ret)
  }
  return ret
}

export function failWith(msg) {
  throw new Error(msg)
}

export function arrEq(a1, a2) {
  if (a1.length !== a2.length) return false
  return a1.every((v, i) => v === a2[i])
}

export function makeEvent(eventName) {
  return (
    typeof Event === "function"
      ? new Event(eventName)
      : pipe(
        document.createEvent(eventName),
        e => {
          e.initEvent(eventName, true, true)
          return e
        }
      )
  )
}

export function parsePath(raw) {
  switch(raw) {
    case "":
    case "/":
      return []
    default:
      return pipe(
        raw,
        raw => raw.slice(1),
        raw => raw[raw.length - 1] === "/"
          ? raw.slice(0, -1)
          : raw,
        raw => raw.split("?")[0],
        raw => raw.split("/")
                  .filter(s => s.length !== 0)
      )
  }
}

export function parseHash(raw) {
  switch(raw) {
    case "":
    case "#":
      return ""
    default:
      return raw.slice(1)
  }
}

export function parseSearch(raw) {
  switch(raw) {
    case "":
    case "?":
      return ""
    default:
      return raw.split("?")[1]
  }
}

export function safeStringify(state) {
  let ret = null
  try {
    ret = JSON.stringify(state)
  }catch(e) {
    console.error(e)
  }
  return ret
}

export function safeParse(state) {
  let ret = null
  try {
    ret = JSON.parse(state)
  }catch(e) {
    console.error(e)
  }
  return ret
}