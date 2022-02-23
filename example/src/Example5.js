import * as React from "react"
import {
  matchPath,
  otherwise,
  useUrl
} from "react-use-url"
import { Link } from "./Link"

export function Example5({path}) {
  const body = matchPath(path, {
    "/": () => <Home />,
    "/about": () => <About />,
    [otherwise]: () => <NoMatch />
  })

  return (
    <>
      <Info />
      <Layout>
        {body}
      </Layout>
    </>
  )
}

function CustomLink({ children, to, ...props }) {
  const { path } = useUrl()
  const isMatch = matchPath(path.slice(1) /* remove baseUrl */, {
    [to]: () => true,
    [otherwise]: () => false
  })

  return (
    <div>
      <Link
        style={{ textDecoration: isMatch ? "underline" : "none" }}
        to={to}
        {...props}
      >
        {children}
      </Link>
      {isMatch && " (active)"}
    </div>
  )
}

function Layout({ children }) {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <CustomLink to="/example5">Home</CustomLink>
          </li>
          <li>
            <CustomLink to="/example5/about">About</CustomLink>
          </li>
        </ul>
      </nav>
      <hr />
      {children}
    </div>
  )
}

function Info() {
  return (
    <>
      <h1>Custom Link Example</h1>

      <p>
        This example demonstrates how to create a custom{" "}
        <code>&lt;Link&gt;</code> component that knows whether or not it is
        "active"
      </p>
    </>
  )
}


function Home() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

function About() {
  return (
    <div>
      <h1>About</h1>
    </div>
  )
}

function NoMatch() {
  return (
    <div>
      <h1>Nothing to see here!</h1>
      <p>
        <Link to="/example5">Go to the home page</Link>
      </p>
    </div>
  )
}


