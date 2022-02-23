export interface Url {
  path: string[],
  hash: string,
  search: string,
  state?: string
}

/** 
 * use `history.pushState` to push the `path`
 * and dispatch the `popstate` event.
 * 
 * this will trigger the subs rerun.
 * the state will be serialized and store in the `window.history.state`.
 */
export function push<A>(path:string, state?:A): void

/**
 * use `history.replaceState` to replace the `path`
 * and dispatch the `popstate` event.
 * 
 * this will trigger the subs rerun.
 * the state will be serialized and store in the `window.history.state`.
 */
export function replace<A>(path:string, state?:A): void

/**
 * query the global `location` and parse it to
 * `Url`.
 * the object's state property is not parsed.
 * warning: you may get old data.
 */
export function getInitUrl(): Url

type WatchCB = (url:Url) => void

export type WatchID = () => void

/**
 * start watch url. When `push` or `replace` called.
 * run the `cb`.
 */
export function watchUrl(cb:WatchCB): WatchID

/**
 * stop watch url. use the given `watchID`.
 */
export function unwatchUrl(watchID:WatchID): void

/**
 * `useUrl` is a React Hook to get `Url` and subscribe
 * the component's render to `watchUrl`.
 * 
 * when the `Url` change(`push` or `replace` get called).
 * the component will rerender to get the fresh data.
 */
export function useUrl<Assert = any>(): Parsed<Url, Assert>

type Parsed<A, Assert> = {
  [k in keyof A]: k extends "state"
    ? Assert
    : A[k]
}

/**
 * `otherwise` is used to catch all case.
 * 
 * example:
 * matchPath(path, {
 *  [otherwise]: () => <NotFound />
 * })
 */
export const otherwise: unique symbol

type F = (...args:string[]) => unknown

type MatchReturn<
  A extends Record<string|symbol, F>
> = {
  [k in keyof A]: ReturnType<A[k]>
}[keyof A]

/**
 * `matchPath` is a simple helper to match your 
 * url pattern.
 */
export function matchPath<
  A extends Record<string|symbol, F>
>(path: string[], matchOption: A): MatchReturn<A>