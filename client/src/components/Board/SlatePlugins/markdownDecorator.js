import { Text } from 'slate'
import Prism from 'prismjs'
import { getLength } from './utils'
// eslint-disable-next-line
Prism.languages.markdown = Prism.languages.extend("markup", {}),
Prism.languages.insertBefore('markdown', 'prolog', {
  blockquote: { pattern: /^>(?:[\t ]*>)*/m, alias: 'punctuation' },
  code: [{ pattern: /^(?: {4}|\t).+/m, alias: 'important' }, { pattern: /``.+?``|`[^`\n]+`/, alias: 'keyword' }],
  // 'code-block': [{ pattern: /(```).+[a-zA-Z]/m, alias: "keyword" }],
  title: [{ pattern: /\w+.*(?:\r?\n|\r)(?:==+|--+)/, alias: 'important', inside: { punctuation: /==+$|--+$/ } }, {
    pattern: /(^\s*)#+.+/m, lookbehind: !0, alias: 'important', inside: { punctuation: /^#+|#+$/ },
  }],
  hr: { pattern: /(^\s*)([*-])([\t ]*\2){2,}(?=\s*$)/m, lookbehind: !0, alias: 'punctuation' },
  list: { pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m, lookbehind: !0, alias: 'punctuation' },
  'url-reference': { pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/, inside: { variable: { pattern: /^(!?\[)[^\]]+/, lookbehind: !0 }, string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/, punctuation: /^[\[\]!:]|[<>]/ }, alias: 'url' },
  bold: { pattern: /(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/, lookbehind: !0, inside: { punctuation: /^\*\*|^__|\*\*$|__$/ } },
  italic: { pattern: /(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/, lookbehind: !0, inside: { punctuation: /^[*_]|[*_]$/ } },
  url: { pattern: /!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/, inside: { variable: { pattern: /(!?\[)[^\]]+(?=\]$)/, lookbehind: !0 }, string: { pattern: /"(?:\\.|[^"\\])*"(?=\)$)/ } } },
}),
// eslint-disable-next-line max-len
Prism.languages.markdown.bold.inside.url = Prism.util.clone(Prism.languages.markdown.url), Prism.languages.markdown.italic.inside.url = Prism.util.clone(Prism.languages.markdown.url), Prism.languages.markdown.bold.inside.italic = Prism.util.clone(Prism.languages.markdown.italic), Prism.languages.markdown.italic.inside.bold = Prism.util.clone(Prism.languages.markdown.bold) // prettier-ignore

function markdownDecorator([node, path]) {
  let ranges = []

  if (!Text.isText(node)) {
    return ranges
  }
  if (node.type === 'code-block') {
    const langName = 'javascript'
    const lang = Prism.languages[langName]

    const tokens = Prism.tokenize(node.text, lang)
    const offset = 0

    for (const token of tokens) {
      const length = getLength(token)
      const end = offset + length
      if (token.type === 'code-block') {
        ranges.push({
          anchor: { path, offset },
          focus: { path, offset: end },
          className: `prism-token token ${token.type}`,
          prism: true,
        })
      }
    }
  }
  const tokens = Prism.tokenize(node.text, Prism.languages.markdown)
  let offset = 0

  for (const token of tokens) {
    const length = getLength(token)
    const end = offset + length

    if (typeof token !== 'string') {
      ranges.push({
        anchor: { path, offset },
        focus: { path, offset: end },
        className: `prism-token token ${token.type}`,
        prism: true,
      })
    }

    offset = end
  }
  return ranges
}

export default markdownDecorator
