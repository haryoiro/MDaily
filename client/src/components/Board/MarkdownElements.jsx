import React from 'react'
import styled from 'styled-components'

/* TODO */
// それぞれのコンポーネントをスタイリング
export const MarkedElements = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'title':
      return <h1    {...attributes}>{children}</h1>
    case 'block-quote':
      return <BackQuote {...attributes}>{children}</BackQuote>
    case 'bulleted-list':
      return <Ul    {...attributes}>{children}</Ul>
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
      return <P     {...attributes}>{children}</P>
    case 'code':
      return <Code  {...attributes}>{children}</Code>
    default:
      return <P     {...attributes}>{children}</P>
  }
}

export const LeafElements = ({ attributes, children, leaf }) => {
  if (leaf.code)
    return <LeafCode leaf={leaf} {...attributes}>{children}</LeafCode>
  if (leaf.title)
    return <Titled leaf={leaf} {...attributes}>{children}</Titled>
  if (leaf.list)
    return <List leaf={leaf} {...attributes}>{children}</List>
  // if (leaf.hr)
  //   return <Hr leaf={leaf} {...attributes}>{children}</Hr>
  if (leaf.backquote)
    return <BackQuote leaf={leaf} {...attributes}>{children}</BackQuote>
  if (attributes['data-slate-leaf'])
    return <Span leaf={leaf} {...attributes}>{children}</Span>
}

const Span = styled.span`
display: block;
line-height: 28px;
width: 100%;
${props => props.leaf && `
  font-weight: ${props => props.leaf.bold && 'bold'};
  font-style: ${props => props.leaf.italic && 'italic'};
  text-decoration: ${props => props.leaf.underlined && 'underline'};
  `
  }`
const P = styled(Span)`
margin: 0;
`
const LeafCode = styled(Span)`
  font-family: monospace;
  padding: 3px;
`
const Code = styled.code`
  font-family: monospace;
  padding: 3px;
`
const Titled = styled(Span)`
  display: inline-block;
  font-weight: bold;
  font-size: 20px;
  margin: 20px 0 10px 0;
`
const Ul = styled.ul`
width: 100%;
display: grid;
padding-left: 1rem;
border-left: solid 2px #978B75;
margin: 0;
li::before {
  content: "•";
  margin-left: -3px;
  font-size: 130%;
  width: 1rem;
  line-height: 24px;
  color: #FB4934;
}
ul li::before {
  color: #B8BB26;
}
ul ul li::before {
  color: #FABD2F;
}
ul ul ul li::before {
  color: #83A598;
}
ul ul ul ul li::before {
  color: #D3869B;
}
`
const List = styled.li`
  display: grid;
  grid-template-columns: 1rem 1fr;
  ${props => props.leaf && `
  font-weight: ${props => props.leaf.bold && 'bold'};
  font-style: ${props => props.leaf.italic && 'italic'};
  text-decoration: ${props => props.leaf.underlined && 'underline'};
  `}
`
const BackQuote = styled(Span)`
  display: inline-block;
  border-left: 2px solid #ddd;
  padding-left: 10px;
  color: #aaa;
  font-style: italic;
`

const H1 = ({ attributes, children}) => {
  const S = styled.h1`
  `
  console.log(children)
  return (
    <S{...attributes}>{children}</S>
  )
}