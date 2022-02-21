import * as React from "react"
import {
  matchPath,
  otherwise
} from "react-use-url"

import { Link } from "./Link"

export default function Dashboard({path}) {
  const body = matchPath(path, {
    "/": () => <DashboardIndex />,
    "/messages": () => <Messages />,
    [otherwise]: () => <div>Not Found</div>
  })

  return (
    <DashboardLayout>
      {body}
    </DashboardLayout>
  )
}

function DashboardLayout({children}) {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/example6/dashboard">Dashboard Home</Link>
          </li>
          <li>
            <Link to="/example6/dashboard/messages">Messages</Link>
          </li>
        </ul>
      </nav>
      <hr />
      {children}
    </div>
  )
}

function DashboardIndex() {
  return (
    <div>
      <h2>Dashboard Index</h2>
    </div>
  )
}

function Messages() {
  return (
    <div>
      <h2>Messages</h2>
      <ul>
        <li>Message 1</li>
        <li>Message 2</li>
      </ul>
    </div>
  )
}