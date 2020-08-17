import { withHistory } from 'slate-history'
import { withReact } from 'slate-react'

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
  withToggleType,
  withTransforms,
  withInlineVoid,
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
  SoftBreakPlugin(options),
  ExitBreakPlugin(options),
]

export const withPlugins = [
  withReact,
  withHistory,
  withList(options),
  withToggleType({ defaultType: options.p.type }),
  withTransforms(),
  withAutoformat({ rules: autoformatRules }),
  withInlineVoid({ plugins })
]
