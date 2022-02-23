import * as React from "react"
import {
  useUrl,
  push,
  matchPath,
  otherwise
} from "react-use-url"
import { Example1 } from "./Example1"
import { Example2 } from "./Example2"
import { Example3 } from "./Example3"
import { Example4 } from "./Example4"
import { Example5 } from "./Example5"
import { Example6 } from "./Example6"
import { Example7 } from "./Example7"

export function App() {
  const { path: rawPath } = useUrl()
  // deploy to https://dafunk-759.github.io/react-use-url/
  // so need to remove first path.
  const path = rawPath.slice(1)
  
  const body = matchPath(path, {
    "/": () => <Links />,
    [otherwise]: () => matchPath([path[0]], {
      "/example1": () => <Example1 path={path.slice(1)}/>,
      "/example2": () => <Example2 path={path.slice(1)}/>,
      "/example3": () => <Example3 path={path.slice(1)}/>,
      "/example4": () => <Example4 path={path.slice(1)}/>,
      "/example5": () => <Example5 path={path.slice(1)}/>,
      "/example6": () => <Example6 path={path.slice(1)}/>,
      "/example7": () => <Example7 path={path.slice(1)}/>,
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
      <button onClick={() => push("/example3")}>Example3</button> 
      <button onClick={() => push("/example4")}>Example4</button> 
      <button onClick={() => push("/example5")}>Example5</button> 
      <button onClick={() => push("/example6")}>Example6</button> 
      <button onClick={() => push("/example7")}>Example7</button> 
    </>
  )
}

function NotFound() {
  return (
    <div>Not Found</div>
  )
}