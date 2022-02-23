import React from "react"
import {
  matchPath,
  otherwise,
  push as originPush,
  replace as originReplace,
  useUrl
} from "react-use-url"
import { Link } from "./Link"

const push = (path, state = null) => originPush(path, state, process.env.PUBLIC_URL)
const replace = (path, state = null) => originReplace(path, state, process.env.PUBLIC_URL)

const fakeAuthProvider = {
  isAuthenticated: false,
  signin(callback) {
    fakeAuthProvider.isAuthenticated = true
    setTimeout(callback, 100)
  },
  signout(callback) {
    fakeAuthProvider.isAuthenticated = false
    setTimeout(callback, 100)
  }
}

const AuthContext = React.createContext(null)

function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);

  const signin = (newUser, callback) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser)
      callback()
    })
  }

  const signout = (callback) => {
    return fakeAuthProvider.signout(() => {
      setUser(null)
      callback()
    })
  }

  const value = { user, signin, signout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function useAuth() {
  return React.useContext(AuthContext);
}

export function Example3({path}) {

  const layoutChildren = matchPath(path, {
    "/": () => <PublicPage />,
    "/login": () => <LoginPage />,
    "/protected": () => (
      <RequireAuth>
        <ProtectedPage />
      </RequireAuth>
    ),
    [otherwise]: () => <div>Not Found</div>
  })

  return (
    <AuthProvider>
      <Info />
      <Layout>
        {layoutChildren}
      </Layout>
    </AuthProvider>
  )
}

function Info() {
  return (
    <>
      <h1>Auth Example</h1>

      <p>
        This example demonstrates a simple login flow with three pages: a public
        page, a protected page, and a login page. In order to see the protected
        page, you must first login. Pretty standard stuff.
      </p>

      <p>
        First, visit the public page. Then, visit the protected page. You're not
        yet logged in, so you are redirected to the login page. After you login,
        you are redirected back to the protected page.
      </p>

      <p>
        Notice the URL change each time. If you click the back button at this
        point, would you expect to go back to the login page? No! You're already
        logged in. Try it out, and you'll see you go back to the page you
        visited just *before* logging in, the public page.
      </p>
    </>
  )
}

function AuthStatus() {
  const auth = useAuth()

  if (!auth.user) {
    return <p>You are not logged in.</p>
  }

  return (
    <p>
      Welcome {auth.user}!{" "}
      <button
        onClick={() => {
          auth.signout(() => push("/example3/"))
        }}
      >
        Sign out
      </button>
    </p>
  )
}

function RequireAuth({ children }) {
  const auth = useAuth()
  const { path } = useUrl()

  React.useEffect(() => {
    if(!auth.user) {
      replace("/example3/login", path.slice(1) /* remove baseUrl */)
    }
  })


  return auth.user && children
}

function Layout({children}) {
  return (
    <div>
      <AuthStatus />
      <ul>
        <li>
          <Link to="/example3/" >Public Page</Link>
        </li>
        <li>
          <Link to="/example3/protected" >Protected Page</Link>
        </li>
      </ul>
      {children}
    </div>
  )
}

function LoginPage() {
  const auth = useAuth()
  const { state } = useUrl()
  const from = !state 
    ? "/example3/"
    : "/" + state.join("/")

  function handleSubmit(e) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const username = formData.get("username") 

    auth.signin(username, () => {
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use replace so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.
      replace(from)
    })
  }

  return (
    <div>
      <p>{"You must log in to view the page at :" + from}</p>

      <form onSubmit={handleSubmit}>
        <label>
          Username: <input name="username" type="text" />
        </label>{" "}
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

function PublicPage() {
  return <h3>Public</h3>;
}

function ProtectedPage() {
  return <h3>Protected</h3>;
}
