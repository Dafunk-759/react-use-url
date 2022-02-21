import * as React from "react"
import {
  matchPath,
  otherwise
} from "react-use-url"
import { Link } from "./Link"

const About = React.lazy(() => import("./Example6About"))
const Dashboard = React.lazy(() => import("./Example6Dashborad"));

export function Example6({path}) {
  const body = matchPath(path, {
    "/": () => <Home />,
    "/about": () => <React.Suspense fallback={<>......</>}><About /></React.Suspense>,
    [otherwise]: () => matchPath([path[0]], {
      "/dashboard": () => (
        <React.Suspense fallback={<>......</>}>
          <Dashboard path={path.slice(1)}/>
        </React.Suspense>
      ),
      [otherwise]: () => <NoMatch />
    })
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

function Info() {
  return (
    <>
      <h1>Lazy Loading Example</h1>

      <p>
        This example demonstrates how to lazily load both route elements and
        even entire portions of your route hierarchy on demand. To get the full
        effect of this demo, be sure to open your Network tab and watch the new
        bundles load dynamically as you navigate around.
      </p>

      <p>
        The "About" page is not loaded until you click on the link. When you do,
        a <code>&lt;React.Suspense fallback&gt;</code> renders while the code is
        loaded via a dynamic <code>import()</code> statement. Once the code
        loads, the fallback is replaced by the actual code for that page.
      </p>
    </>
  )
}

function Layout({children}) {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/example6">Home</Link>
          </li>
          <li>
            <Link to="/example6/about">About</Link>
          </li>
          <li>
            <Link to="/example6/dashboard/messages">Messages (Dashboard)</Link>
          </li>
        </ul>
      </nav>
      <hr />
      {children}
    </div>
  )
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/example6">Go to the home page</Link>
      </p>
    </div>
  )
}
