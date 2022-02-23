import * as React from "react"
import {
  useUrl,
  matchPath,
  otherwise
} from "react-use-url"
import { Link } from "./Link"
import { Example1 } from "./Example1"
import { Example2 } from "./Example2"
import { Example3 } from "./Example3"
import { Example4 } from "./Example4"
import { Example5 } from "./Example5"
import { Example6 } from "./Example6"
import { Example7 } from "./Example7"


export function App() {
  const { path: rawPath } = useUrl()
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
    <div style={{display: "flex", flexFlow: "column"}}>
      <Link to={"/example1"}>Example1</Link>
      <Link to={"/example2"}>Example2</Link>
      <Link to={"/example3"}>Example3</Link>
      <Link to={"/example4"}>Example4</Link>
      <Link to={"/example5"}>Example5</Link>
      <Link to={"/example6"}>Example6</Link>
      <Link to={"/example7"}>Example7</Link>
    </div>
  )
}

function NotFound() {
  return (
    <div>Not Found</div>
  )
}