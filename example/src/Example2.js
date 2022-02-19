import * as React from "react"
import {
  matchPath,
  otherwise,
  push
} from "use-route"


export function Example2({path}) {
  const body = matchPath(path, {
    "/": () => <Home />,
    "/about": () => <About />,
    "/dashboard": () => <Dashboard />,
    [otherwise]: () => <NoMatch />
  })

  return (
    <div>
      <Info />
      <Layout>
        {body}
      </Layout>
    </div>
  )
}

function Info() {
  return (<>
    <h1>Basic Example</h1>
    <p>
      This example demonstrates some of the core features of React Router
      including nested <code>&lt;Route&gt;</code>s,{" "}
      <code>&lt;Outlet&gt;</code>s, <code>&lt;Link&gt;</code>s, and using a
      "*" route (aka "splat route") to render a "not found" page when someone
      visits an unrecognized URL.
    </p>
  </>)
}

function Layout({children}) {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/nothing-here">Nothing Here</Link>
          </li>
        </ul>
      </nav>
      <hr />
      {children}
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

function Link({to, children}) {
  return (
    <button onClick={() => push("/example2" + to)}>
      {children}
    </button>
  )
}