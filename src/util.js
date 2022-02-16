export const POPSTATE = "popstate"

export const location = document.location

export const addEventListener = window.addEventListener.bind(window)

export const removeEventListener = window.removeEventListener.bind(window)

export const dispatchEvent = window.dispatchEvent.bind(window)

const history = window.history

export const pushState = history.pushState.bind(history, null, "")

export const replaceState = history.replaceState.bind(history, null, "")

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
  failWith("todo")
}

export function parseSearch(raw) {
  failWith("todo")
}