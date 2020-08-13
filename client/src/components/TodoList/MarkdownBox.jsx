import unified from 'unified'
import parse from 'remark-parse'
import slug from 'remark-slug'
import remark2rehype from 'remark-rehype'
import rehype2react from 'rehype-react'

import React, { createElement, useState, useEffect } from 'react'
import { useAutoFocus } from '../../hooks/index'

export default function MarkdownBox({ value }) {
  const [currentText, setCurrentText] = useState(value)
  const [editable, setEditable] = useState(false)
  const [inputRef, focus] = useAutoFocus()

  useEffect(() => focus(), [editable])

  if (!value) return null
  if (!editable) return <p onClick={() => setEditable(true)}>
    {unified()
      // .data('settings', { fragment: true })
      .use(parse)
      .use(slug)
      .use(remark2rehype)
      .use(rehype2react, { createElement: React.createElement })
      .processSync(value)
      .result
    }
  </p>
  if (editable) return <input
    ref={inputRef}
    type="text"
    onChange={(e) => setCurrentText(e.target.value)}
    onBlur={() => setEditable(false)}
    value={currentText}
  />
}