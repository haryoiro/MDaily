/* eslint-disable react/jsx-props-no-spreading */
import React, {
  useState, useEffect, useCallback, useMemo,
} from 'react'
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { withHistory } from 'slate-history'
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
} from '@styled-icons/material'
import {
  // mains
  BalloonToolbar,
  ToolbarMark,
  EditablePlugins,
  // plugins
  HeadingPlugin,
  ParagraphPlugin,
  BoldPlugin,
  ItalicPlugin,
  UnderlinePlugin,
  ListPlugin,
  CodePlugin,
  CodeBlockPlugin,
  PreviewPlugin,
  renderLeafPreview,
  ResetBlockTypePlugin,
  // with
  withTransforms,
  withNormalizeTypes,
  withTrailingNode,
  withToggleType,
  withAutoformat,
  SoftBreakPlugin,
  ExitBreakPlugin,
  StrikethroughPlugin,
  pipe,
  MARK_BOLD,
  MARK_ITALIC,
  MARK_UNDERLINE,
} from '@udecode/slate-plugins'
// Elements
import Header from '../Header/Header'
import { ContentWrapper } from '../shared'
import autofomatRules, { headingTypes } from './AutoformatRules'

const plugins = [
  HeadingPlugin(),
  ParagraphPlugin(),
  BoldPlugin(),
  ItalicPlugin(),
  UnderlinePlugin(),
  ListPlugin(),
  CodePlugin(),
  CodeBlockPlugin(),
  StrikethroughPlugin(),
  PreviewPlugin(),
  SoftBreakPlugin({
    rules: [
      { hotkey: 'shift+enter' },
      {
        hotkey: 'enter',
        query: {
          allow: ['code_block', 'blockquote'],
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
  withTransforms(),
  withNormalizeTypes({
    rules: [{ path: [0, 0], strictType: 'h1' }],
  }),
  withTrailingNode({ type: 'h3', level: 1 }),
  withToggleType({ defaultType: 'p' }),
  withAutoformat({
    rules: autofomatRules,
  }),
]

const initial = [
  {
    children: [{
      type: 'h1',
      children: [{ text: 'title' }],
    }, {
      type: 'paragraph',
      children: [{
        text: 'This text is bold, italic and underlined',
        bold: true,
        italic: true,
        underline: true,
      }],
    }],
  },
]
const tooltip = {
  arrow: true,
  delay: 0,
  duration: [200, 0],
  hideOnClick: false,
  offset: [0, 17],
  placement: 'top',
}
const direction = 'top'
const theme = 'dark'
const hiddenDelay = 1
const arrow = false
function MEditor() {
  const [currentText, setCurrentText] = useState(initial)

  const editor = useMemo(() => pipe(createEditor(), ...withPlugins), [])
  const handleChangeEditor = (value) => {
    setCurrentText(value)
  }

  return (
    <>
      <Header />
      <ContentWrapper>
        <Slate
          editor={editor}
          value={currentText}
          onChange={handleChangeEditor}
        >
          <BalloonToolbar
            direction={direction}
            hiddenDelay={hiddenDelay}
            theme={theme}
            arrow={arrow}
          >
            <ToolbarMark
              type={MARK_BOLD}
              icon={<FormatBold />}
              tooltip={{ content: 'Bold (⌘B)', ...tooltip }}
            />
            <ToolbarMark
              type={MARK_ITALIC}
              icon={<FormatItalic />}
              tooltip={{ content: 'Italic (⌘I)', ...tooltip }}
            />
            <ToolbarMark
              type={MARK_UNDERLINE}
              icon={<FormatUnderlined />}
              tooltip={{ content: 'Underline (⌘U)', ...tooltip }}
            />
          </BalloonToolbar>
          <EditablePlugins plugins={plugins} placeholder="Enter some text..." />
        </Slate>
      </ContentWrapper>
    </>
  )
}

export default MEditor
