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
} from "use-route"

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

## License

MIT © [Dafunk-759](https://github.com/Dafunk-759)
