import { withReact } from 'slate-react'
import { withHistory } from 'slate-history'
import {
  AlignPlugin,
  HeadingPlugin,
  ParagraphPlugin,
  BoldPlugin,
  BlockquotePlugin,
  ItalicPlugin,
  ImagePlugin,
  UnderlinePlugin,
  ListPlugin,
  CodePlugin,
  TablePlugin,
  PreviewPlugin,
  ResetBlockTypePlugin,
  MediaEmbedPlugin,
  TodoListPlugin,
  // with
  withTransforms,
  withNormalizeTypes,
  withTrailingNode,
  withToggleType,
  withAutoformat,
  withLink,
  withList,
  withTable,
  withMarks,
  withNodeID,
  SoftBreakPlugin,
  ExitBreakPlugin,
  StrikethroughPlugin,
  SubscriptPlugin,
  SuperscriptPlugin,
} from '@udecode/slate-plugins'
// eslint-disable-next-line import/named
import { PCodeBlockPlugin } from '../CodeBlock/PCodeBlockPlugin'
import { PLinkPlugin } from '../Link/PLinkPlugin'
import autofomatRules, { headingTypes, optionsResetBlockTypes } from './slateOptions'

export const plugins = [
  AlignPlugin(),
  HeadingPlugin(),
  ParagraphPlugin(),
  BoldPlugin(),
  BlockquotePlugin(),
  ItalicPlugin(),
  ImagePlugin(),
  UnderlinePlugin(),
  ListPlugin(),
  TodoListPlugin(),
  PLinkPlugin({ isUrl: 'true' }),
  TablePlugin(),
  PCodeBlockPlugin(),
  CodePlugin(),
  StrikethroughPlugin(),
  SubscriptPlugin(),
  SuperscriptPlugin(),
  PreviewPlugin(),
  ResetBlockTypePlugin(optionsResetBlockTypes),
  MediaEmbedPlugin(),
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
          allow: [...headingTypes],
        },
      },
      {
        hotkey: 'enter',
        query: {
          allow: ['link', 'code'],
        },
      },
    ],
  }),
]

export const withPlugins = [
  withReact,
  withHistory,
  withNodeID(),
  withTable(),
  withTransforms(),
  withMarks(),
  withNormalizeTypes({
    rules: [{ path: [0, 0], strictType: 'h1' }],
  }),
  withTrailingNode({ type: 'h3', level: 1 }),
  withToggleType({ defaultType: 'p' }),
  withAutoformat({
    rules: autofomatRules,
  }),
  withLink(),
  withList(),
]
