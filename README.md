# react-use-url

> a tiny simple lib for react route

## Install

```bash
npm install --save react-use-url
```

## Usage

```jsx
import React from "react"
import {
  matchPath,
  otherwise,
  useUrl
} from "react-use-url"

export default function App() {
  const { path } = useUrl()

  const body = matchPath(path, {
    "/": () => <Home />,
    "/teams": () => <Teams><LeagueStandings /></Teams>,
    "/teams/new": () => <Teams><NewTeamForm /></Teams>,
    "/teams/:teamId": teamId => <Teams><Team teamId={teamId} /></Teams>,
    [otherwise]: () => <NotFound width={500} height={500} />
  })

  return (
    <Main>
      {body}
    </Main>
  )
}

function Main({children}) {

  return (
    <div style={outline("red", 700, 700)}>
      Main
      {children}
    </div>
  )
}

function Home() {
  return <div style={outline("green", 500, 500)}>
    Home
  </div>
}

function NotFound(width, height) {
  return <div style={outline("pink", width, height)}>
    NotFound
  </div>
}

function Teams({children}) {
  return (
    <div style={outline("blue", 500, 500)}>
      Teams
      {children}
    </div>
  )
}

function Team({teamId}) {
  return (
    <div style={outline("orange", 300, 300)}>
      {"teamId is: " + teamId}
    </div>
  )
}

function NewTeamForm() {
  return <div style={outline("black", 300, 300)}>
    new team form
  </div>
}

function LeagueStandings() {
  return <div style={outline("yellow", 300, 300)}>
    LeagueStandings
  </div>
}

function outline(color, width, height) {
  return {
    border: `2px solid ${color}`, 
    padding: "20px",
    width: `${width}px`,
    height: `${height}px`
  }
}

```

## Api

### Url
```ts
export interface Url {
  path: string[],
  hash: string,
  search: string,
  state?: string
}
```

### useUrl
`useUrl` is a React Hook to get `Url` and subscribe
the component's render to `watchUrl`.
  
when the `Url` change(`push` or `replace` get called).
the component will rerender to get the fresh data.

``` ts
export function useUrl<Assert = any>(): Parsed<Url, Assert>
```

### watchUrl
start watch url. When `push` or `replace` called.
run the `cb`.

```ts
export function watchUrl(cb:WatchCB): WatchID
type WatchCB = (url:Url) => void
export type WatchID = () => void
```

### unwatchUrl
stop watch url. use the given `watchID`.

``` ts
export function unwatchUrl(watchID:WatchID): void
type WatchCB = (url:Url) => void
export type WatchID = () => void
```

### getInitUrl
query the global `location` and parse it to
`Url`.
the object's state property is not parsed.
warning: you may get old data.

```ts
export function getInitUrl(): Url
```

### push
use `history.pushState` to push the `path`
and dispatch the `popstate` event.
 
this will trigger the subs rerun.
the state will be serialized and store in the `window.history.state`.

```ts
export function push<A>(path:string, state?:A): void
```

### replace
use `history.replaceState` to replace the `path`
and dispatch the `popstate` event.

this will trigger the subs rerun.
the state will be serialized and store in the `window.history.state`.

```ts
export function replace<A>(path:string, state?:A): void
```

### matchPath
`matchPath` is a simple helper to match your 
url pattern.

```ts
type F = (...args:string[]) => unknown

type MatchReturn<
  A extends Record<string|symbol, F>
> = {
  [k in keyof A]: ReturnType<A[k]>
}[keyof A]

export function matchPath<
  A extends Record<string|symbol, F>
>(path: string[], matchOption: A): MatchReturn<A>
```

### otherwise

`otherwise` is used to catch all case.

example:
```jsx
matchPath(path, {
 [otherwise]: () => <NotFound />
})
```

```ts
export const otherwise: unique symbol
```

## License

MIT © [Dafunk-759](https://github.com/Dafunk-759)
