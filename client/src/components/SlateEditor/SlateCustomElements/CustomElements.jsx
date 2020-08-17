import React from 'react'

export function CodeElement({ attributes, children }) {
  return (
    <pre {...attributes}>
      <code>{children}</code>
    </pre>
  )
}

export function DefaultElement({ attributes, children }) {
  return (
    <p {...attributes}>
      {children}
    </p>
  )
}

export function Leaf({ leaf, attributes, children }) {
  return (
    <span {...attributes}
      style={{ fontWeight: leaf.bold ? 'bold' : 'normal' }}>
      {children}
    </span>
  )
}