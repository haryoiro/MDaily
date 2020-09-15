import {
  toggleList, unwrapList,
  DEFAULTS_ALIGN,
  DEFAULTS_BLOCKQUOTE,
  DEFAULTS_BOLD,
  DEFAULTS_CODE,
  DEFAULTS_CODE_BLOCK,
  DEFAULTS_KBD,
  DEFAULTS_HEADING,
  DEFAULTS_HIGHLIGHT,
  DEFAULTS_IMAGE,
  DEFAULTS_ITALIC,
  DEFAULTS_LINK,
  DEFAULTS_LIST,
  DEFAULTS_MEDIA_EMBED,
  DEFAULTS_MENTION,
  DEFAULTS_PARAGRAPH,
  DEFAULTS_SEARCH_HIGHLIGHT,
  DEFAULTS_STRIKETHROUGH,
  DEFAULTS_SUBSUPSCRIPT,
  DEFAULTS_TABLE,
  DEFAULTS_TODO_LIST,
  DEFAULTS_UNDERLINE,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  isBlockAboveEmpty,
  isSelectionAtBlockStart,
} from '@udecode/slate-plugins'

export const headingTypes = [
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
]
export const options = {
  ...DEFAULTS_PARAGRAPH,
  ...DEFAULTS_MENTION,
  ...DEFAULTS_BLOCKQUOTE,
  ...DEFAULTS_CODE_BLOCK,
  ...DEFAULTS_LINK,
  ...DEFAULTS_IMAGE,
  ...DEFAULTS_MEDIA_EMBED,
  ...DEFAULTS_TODO_LIST,
  ...DEFAULTS_TABLE,
  ...DEFAULTS_LIST,
  ...DEFAULTS_HEADING,
  ...DEFAULTS_ALIGN,
  // marks
  ...DEFAULTS_BOLD,
  ...DEFAULTS_ITALIC,
  ...DEFAULTS_UNDERLINE,
  ...DEFAULTS_STRIKETHROUGH,
  ...DEFAULTS_CODE,
  ...DEFAULTS_KBD,
  ...DEFAULTS_SUBSUPSCRIPT,
  ...DEFAULTS_HIGHLIGHT,
  ...DEFAULTS_SEARCH_HIGHLIGHT,
}

const preFormat = (editor) => unwrapList(editor, options)
const autoformatRules = [
  {
    type: 'h1',
    markup: '#',
    preFormat,
  },
  {
    type: 'h2',
    markup: '##',
    preFormat,
  },
  {
    type: 'h3',
    markup: '###',
    preFormat,
  },
  {
    type: 'h4',
    markup: '####',
    preFormat,
  },
  {
    type: 'h5',
    markup: '#####',
    preFormat,
  },
  {
    type: 'h6',
    markup: '######',
    preFormat,
  },
  {
    type: 'li',
    markup: ['*', '-', '+'],
    preFormat,
    format: (editor) => {
      toggleList(editor, { ...options, typeList: options.ul.type })
    },
  },
  {
    type: 'al',
    markup: ['1.', '1)'],
    preFormat,
    format: (editor) => {
      toggleList(editor, { ...options, typeList: options.ol.type })
    },
  },
  {
    type: 'todo_li',
    markup: ['[]'],
    preFormat,
  },
  {
    type: 'blockquote',
    markup: ['>'],
    preFormat,
  },
  {
    type: 'bold',
    between: ['**', '**'],
    mode: 'inline',
    insertTrigger: true,
  },
  {
    type: 'bold',
    between: ['__', '__'],
    mode: 'inline',
    insertTrigger: true,
  },
  {
    type: 'italic',
    between: ['*', '*'],
    mode: 'inline',
    insertTrigger: true,
  },
  {
    type: 'italic',
    between: ['_', '_'],
    mode: 'inline',
    insertTrigger: true,
  },
  {
    type: 'code',
    between: ['`', '`'],
    mode: 'inline',
    insertTrigger: true,
  },
  {
    type: 'strikethrough',
    between: ['~~', '~~'],
    mode: 'inline',
    insertTrigger: true,
  },
  {
    trigger: '`',
    type: 'code_block',
    markup: '``',
    mode: 'inline-block',
    preFormat: (editor) => unwrapList(editor, options),
  },
]
const resetBlockTypesCommonRule = {
  types: [
    'blockquote',
    'code_block',
    'todo_li',
  ],
  defaultType: 'p',
}
export const optionsResetBlockTypes = {
  rules: [
    {
      ...resetBlockTypesCommonRule,
      hotkey: 'Enter',
      predicate: isBlockAboveEmpty,
    },
    {
      ...resetBlockTypesCommonRule,
      hotkey: 'Backspace',
      predicate: isSelectionAtBlockStart,
    },
  ],
}
export default autoformatRules
