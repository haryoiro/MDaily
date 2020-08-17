import React, { useMemo, useState, useCallback } from "react";
import { createEditor, Value } from 'slate'
import { Slate } from 'slate-react'
import When from 'slate-when'
import SoftBreak from 'slate-soft-break'
import { EditablePlugins, pipe } from '@udecode/slate-plugins'

import { withPlugins, plugins } from './helpers/plugin'

export function SlateEditor() {
  const editor = useMemo(() => pipe(createEditor(), ...withPlugins), [])
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
    {
      type: 'code_block',
      children: [{ text: 'const a = {text: "text"}' }]
    },
    {
      type: 'paragraph',
      children: [{ text: ' ' }],
    }
  ])

  // console.log(onKeyDown)
  plugins.push([
    When({
      when: value => !value.blocks.some(b => b.type === 'code'),
      plugin: SoftBreak({ shift: true }),
    }),
  ])

  return (
    <Slate editor={editor} value={value} onChange={newValue => setValue(newValue)}>
      <EditablePlugins
        plugins={plugins}
        placeholder="Enter some text..."
        spellCheck
        autoFocus
      />
    </Slate>
  )
}