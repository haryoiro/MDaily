import React, { useEffect, useMemo, useState } from "react";
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'

export function SlateEditor() {
  const editor = useMemo(() => withReact(createEditor()), [])
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ])

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={newValue => setValue(newValue)}
    >
      <Editable onKeyDown={e => {
        if (e.key === '&') {
          e.preventDefault()
          editor.insertText('and')
        }
      }}/>
    </Slate>
  )
}