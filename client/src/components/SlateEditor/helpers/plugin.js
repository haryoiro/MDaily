import { withHistory } from 'slate-history'
import { withReact } from 'slate-react'
import withShortcuts from './withShortcut'
import {
  ParagraphPlugin,
  BoldPlugin,
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
  withMarks,
  withToggleType,
  withTransforms,
  withNormalizeTypes,

  // withInlineVoid,
} from '@udecode/slate-plugins'

import {
  headingTypes,
  options,
  optionsResetBlockTypes,
} from './initialValues'

import { autoformatRules } from "./autoformatRules";

export const plugins = [
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
  SoftBreakPlugin(options,{
      rules: [
        { hotkey: 'shift+enter' },
        {
          hotkey: 'enter',
          query: {
            allow: [options.code_block.type, options.blockquote.type],
          },
        },
      ],
    })
]

export const withPlugins = [
  withReact,
  withHistory,
  // withToggleType({ defaultType: options.p.type }),
  withTransforms(),
  // withAutoformat({ rules: autoformatRules }),
  withList(options),
  withMarks(),
  withNormalizeTypes({
    rules: [{ path: [0, 0], strictType: options.h1.type }],
  }),
  withShortcuts(options),
  // withInlineVoid({ plugins })
]
