import { languages, tokenize } from 'prismjs'
import { Node } from 'slate'
import { ELEMENT_CODE_BLOCK } from '@udecode/slate-plugins'

const decorateCodeBlock = () => (entry) => {
  const ranges = []
  const [node, path] = entry
  if (node.type === ELEMENT_CODE_BLOCK) {
    const text = Node.string(node)
    const langName = 'javascript'
    const lang = languages[langName]
    const tokens = tokenize(text, lang)
    let offset = 0

    for (const element of tokens) {
      if (typeof element === 'string') {
        offset += element.length
      } else {
        const token = element
        ranges.push({
          anchor: { path, offset },
          focus: { path, offset: offset + token.length },
          className: `prism-token token ${token.type} `,
          prism: true,
        })
        offset += token.length
      }
    }
  }
  return ranges
}

export default decorateCodeBlock
