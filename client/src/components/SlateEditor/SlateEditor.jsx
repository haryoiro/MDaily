import React, { useMemo, useState, useCallback } from "react";
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { withHistory } from 'slate-history'
import {
  ParagraphPlugin,
  BoldPlugin,
  EditablePlugins,
  ItalicPlugin,
  UnderlinePlugin,
  pipe
} from '@udecode/slate-plugins'

import { toggleCodeBlock, toggleBoldMark } from '../../helpers/KeybindHelper'
import { DefaultElement, CodeElement, Leaf } from './SlateCustomElements/CustomElements'

const plugins = [ParagraphPlugin(), BoldPlugin(), ItalicPlugin(), UnderlinePlugin()];
const withPlugins = [withReact, withHistory]


export function SlateEditor() {
  const editor = useMemo(() => pipe(createEditor(), ...withPlugins), [])
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
    {
      type: 'code',
      children: [{ text: 'const a = {text: "text"}'}]
    }
  ])


  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])
  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />
  }, [])

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