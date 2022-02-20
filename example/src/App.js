import React from "react"
import {
  useUrl,
  push,
  matchPath,
  otherwise
} from "react-use-url"
import { Example1 } from "./Example1"
import { Example2 } from "./Example2"

export function App() {
  const { path } = useUrl()
  
  const body = matchPath(path, {
    "/": () => <Links />,
    [otherwise]: () => matchPath([path[0]], {
      "/example1": () => <Example1 path={path.slice(1)}/>,
      "/example2": () => <Example2 path={path.slice(1)}/>,
      [otherwise]: () => <NotFound />
    })
  })

  return (
    <>{body}</>
  )
}

function Links() {
  return (
    <>
      <button onClick={() => push("/example1")}>Example1</button> 
      <button onClick={() => push("/example2")}>Example2</button> 
    </>
  )
}

function NotFound() {
  return (
    <div>Not Found</div>
  )
}