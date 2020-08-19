import 'tippy.js/animations/scale.css';
import 'tippy.js/dist/tippy.css';
import React, { useMemo, useState, useCallback } from "react";
import { createEditor, Value } from 'slate'
import { Slate } from 'slate-react'
import { EditablePlugins, pipe } from '@udecode/slate-plugins'
import {
  BalloonToolbar,
  ToolbarMark,
  MARK_BOLD,
  MARK_ITALIC,
  MARK_UNDERLINE,
} from '@udecode/slate-plugins'
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
} from '@styled-icons/material';
import { withPlugins, plugins } from './helpers/plugin'

export function SlateEditor() {
  const editor = useMemo(() => pipe(createEditor(), ...withPlugins), [])
  const [value, setValue] = useState([
    {
      type: 'h1',
      children: [{ text: 'No Title' }],
    },
    {
      type: 'paragraph',
      children: [{ text: ' ' }],
    }
  ])

  const tooltip = {
    arrow: true,
    delay: 0,
    duration: [200, 0],
    hideOnClick: false,
    offset: [0, 17],
    placement: 'top',
  }

  return (
    <Slate editor={editor} value={value} onChange={newValue => setValue(newValue)}>
      <BalloonToolbar
        direction='top'
        allow={false}
        theme='dark'
        hiddenDelay={0}
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
      <EditablePlugins
        plugins={plugins}
        placeholder="Enter some text..."
        spellCheck
        autoFocus
      />
    </Slate>
  )
}