import * as React from "react"
import {
  push,
  replace
} from "react-use-url"

export function Link({
  to,
  action = "push", 
  children,
  ...props
}) {
  const onClick = e => {
    e.preventDefault()
    
    if (typeof props["onClick"] === "function") props["onClick"]()

    switch(action) {
      case "push":
        return push(to)
      case "replace":
        return replace(to)
      default:
        return push(to)
    }

  }

  return React.createElement("a", {...props, href: to, onClick}, children)
}