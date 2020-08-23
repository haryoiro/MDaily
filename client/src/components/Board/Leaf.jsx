import React from 'react'
import style from 'styled-components'

export const Leaf = ({ attributes, children, leaf }) => {
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
  font-weight: ${props => props.leaf.bold && 'bold'};
  font-style: ${props => props.leaf.italic && 'italic'};
  text-decoration: ${props => props.leaf.underlined && 'underline'};
`
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