import React from 'react'
import style from 'styled-components'

/* TODO */
// それぞれのコンポーネントをスタイリング
export const MarkedElements = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'block-quote':
      return <BackQuote {...attributes}>{children}</BackQuote>
    case 'bulleted-list':
      return <ul    {...attributes}>{children}</ul>
    case 'heading-one':
      return <h1    {...attributes}>{children}</h1>
    case 'heading-two':
      return <h2    {...attributes}>{children}</h2>
    case 'heading-three':
      return <h3    {...attributes}>{children}</h3>
    case 'heading-four':
      return <h4    {...attributes}>{children}</h4>
    case 'heading-five':
      return <h5    {...attributes}>{children}</h5>
    case 'heading-six':
      return <h6    {...attributes}>{children}</h6>
    case 'list-item':
      return <List  {...attributes}>{children}</List>
    case 'new-line':
      return <p     {...attributes}>{children}</p>
    case 'code':
      return <Code  {...attributes}>{children}</Code>
    default:
      return <p     {...attributes}>{children}</p>
  }
}

export const LeafElements = ({ attributes, children, leaf }) => {
  if (leaf.code)
    return <Code leaf={leaf} {...attributes}>{children}</Code>
  if (leaf.title)
    return <Titled leaf={leaf} {...attributes}>{children}</Titled>
  if (leaf.list)
    return <List leaf={leaf} {...attributes}>{children}</List>
  if (leaf.hr)
    return <Hr leaf={leaf} {...attributes}>{children}</Hr>
  if (leaf.backquote)
    return <BackQuote leaf={leaf} {...attributes}>{children}</BackQuote>
  if (attributes['data-slate-leaf'])
    return <Span leaf={leaf} {...attributes}>{children}</Span>
}

const Span = style.span`
${props => props.leaf && `
  font-weight: ${props => props.leaf.bold && 'bold'};
  font-style: ${props => props.leaf.italic && 'italic'};
  text - decoration: ${ props => props.leaf.underlined && 'underline' };
  `
}`
const Code = style(Span)`
  font-family: monospace;
  background-color: #eee;
  padding: 3px;
`
const Titled = style(Span)`
  display: inline-block;
  font-weight: bold;
  font-size: 20px;
  margin: 20px 0 10px 0;
`
const List = style(Span)`
  padding-left: 10px;
  font-size: 20px;
  line-height: 10px;
`
const Hr = style(Span)`
  display: block;
  text-align: center;
  border-bottom: 2px solid #ddd;
`
const BackQuote = style(Span)`
  display: inline-block;
  border-left: 2px solid #ddd;
  padding-left: 10px;
  color: #aaa;
  font-style: italic;
`