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
  CodePlugin,
  StrikethroughPlugin,
  BlockquotePlugin,
  ListPlugin,
  HeadingPlugin,
  CodeBlockPlugin,
  ResetBlockTypePlugin,
  SoftBreakPlugin,
  ExitBreakPlugin,
  withAutoformat,
  withList,
  withToggleType,
  withTransforms,
  pipe,
} from '@udecode/slate-plugins'
import {
  headingTypes,
  options,
  optionsResetBlockTypes,
} from './SlateCustomElements/initialValues'

import { autoformatRules } from "./SlateCustomElements/autoformatRules";

const plugins = [
  ParagraphPlugin(options),
  BoldPlugin(),
  ItalicPlugin(),
  CodePlugin(),
  StrikethroughPlugin(),
  BlockquotePlugin(options),
  ListPlugin(options),
  HeadingPlugin(options),
  CodeBlockPlugin(options),
  ResetBlockTypePlugin(optionsResetBlockTypes),
  SoftBreakPlugin({
    rules: [
      { hotkey: 'shift+enter' },
      {
        hotkey: 'enter',
        query: {
          allow: [ options.code_block.type, options.blockquote.type],
        },
      },
    ],
  }),
  ExitBreakPlugin({
    rules: [
      {
        hotkey: 'mod+enter',
      },
      {
        hotkey: 'mod+shift+enter',
        before: true,
      },
      {
        hotkey: 'enter',
        query: {
          start: true,
          end: true,
          allow: headingTypes,
        },
      },
    ],
  }),
]

const withPlugins = [
  withReact,
  withHistory,
  withList(options),
  withToggleType({ defaultType: options.p.type }),
  withTransforms(),
  // withTrailingNode({ type: options.p.type }),
  withAutoformat({
    rules: autoformatRules,
  }),]


export function SlateEditor() {
  const editor = useMemo(() => pipe(createEditor(), ...withPlugins), [])
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
    {
      type: 'code',
      children: [{ text: 'const a = {text: "text"}' }]
    }
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