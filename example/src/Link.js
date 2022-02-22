import * as React from "react"
import {
  push,
  replace
} from "react-use-url"

export function Link({
  to,
  action = "push", 
  state = null,
  children,
  ...props
}) {
  const onClick = e => {
    e.preventDefault()
    
    if (typeof props["onClick"] === "function") props["onClick"]()

    switch(action) {
      case "push":
        return push(to, state)
      case "replace":
        return replace(to, state)
      default:
        return push(to, state)
    }

  }

  return React.createElement("a", {...props, href: to, onClick}, children)
}