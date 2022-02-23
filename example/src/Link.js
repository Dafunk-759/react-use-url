import * as React from "react"
import {
  push,
  replace
} from "react-use-url"

export function Link({
  to,
  action = "push", 
  state = null,
  baseUrl = process?.env?.PUBLIC_URL ?? "",
  children,
  ...props
}) {

  const onClick = e => {
    e.preventDefault()
    
    if (typeof props.onClick === "function") props.onClick()

    switch(action) {
      case "push":
        return push(to, state, baseUrl)
      case "replace":
        return replace(to, state, baseUrl)
      default:
        return push(to, state, baseUrl)
    }

  }

  return (
    <a
      {...props}
      href={baseUrl + to}
      onClick={onClick}
    > 
      {children}
    </a>
  )
}