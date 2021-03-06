import * as React from "react"
import {
  matchPath,
  otherwise
} from "react-use-url"
import { Link } from "./Link"


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
  </>)
}

function Layout({children}) {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/example2">Home</Link>
          </li>
          <li>
            <Link to="/example2/about">About</Link>
          </li>
          <li>
            <Link to="/example2/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/example2/nothing-here">Nothing Here</Link>
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
        <Link to="/example2">Go to the home page</Link>
      </p>
    </div>
  );
}

