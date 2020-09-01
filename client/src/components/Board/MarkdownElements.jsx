/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'

// それぞれのコンポーネントをスタイリング
export const MarkedElements = ({ attributes, children, element }) => {
  switch (element.type) {
  case 'title':
    return <h1 {...attributes}>{children}</h1>
  case 'block-quote':
    return <BackQuote {...attributes}>{children}</BackQuote>
  case 'bulleted-list':
    return <Ul {...attributes}>{children}</Ul>
  case 'heading-one':
    return <h1 {...attributes}>{children}</h1>
  case 'heading-two':
    return <h2 {...attributes}>{children}</h2>
  case 'heading-three':
    return <h3 {...attributes}>{children}</h3>
  case 'heading-four':
    return <h4 {...attributes}>{children}</h4>
  case 'heading-five':
    return <h5 {...attributes}>{children}</h5>
  case 'heading-six':
    return <h6 {...attributes}>{children}</h6>
  case 'list-item':
    return <List {...attributes}>{children}</List>
  case 'new-line':
    return <P {...attributes}>{children}</P>
  case 'code':
    return <code {...attributes}>{children}</code>
  default:
    return <Span {...attributes}>{children}</Span>
  }
}

export const LeafElements = ({ attributes, children, leaf }) => {
  return <Leaf {...attributes} leaf={leaf}>{children}</Leaf>
}

const Leaf = styled.span`
${({ leaf, theme }) => `
fontWeight: ${leaf.bold ? 'bold' : 'normal'};
fontStyle: ${leaf.italic ? 'italic' : 'normal'};
text-decoration: ${leaf.underlined ? 'underline' : 'normal'};
  ${leaf.code && `
  background: ${theme.bg2};
  padding-bottom: 2px;
  border-radius: 6px;
  & span {
    font-family: "Lucida Console", Monaco, monospace;
    positioin: relative;
    font-size: 0.8rem;
    color: #FB4934;
  }
  ::before {
    position: absolute;
    font-family: monospace, Consolas;
    content: '▮';
    font-size: 1rem;
    margin-top: -2px;
    margin-left: -2px;
    color: ${theme.bg2};
  }
  ::after {
    position: absolute;
    font-family: monospace, Consolas;
    content: '▮';
    font-size: 1.2rem;
    margin-top: -2px;
    margin-left: -0.6rem;
    color: ${theme.bg2};
  }
  `}
  ${leaf.list && `
  display: grid;
  grid-template-columns: 1rem 1fr;
  `}
  ${leaf.backquote && `
  display: inline-block;
  border-left: 2px solid #ddd;
  padding-left: 10px;
  color: #aaa;
  font-style: italic;
  `}
`
}
`

const Span = styled.span`
display: block;
line-height: 28px;
width: 100%;
${(props) => props.leaf && `
  font-weight: ${props.leaf.bold && 'bold'};
  font-style: ${props.leaf.italic && 'italic'};
  text-decoration: ${props.leaf.underlined && 'underline'};
  `
}`
const P = styled(Span)`
margin: 0;
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
`
const BackQuote = styled(Span)`
  display: inline-block;
  border-left: 2px solid #ddd;
  padding-left: 10px;
  color: #aaa;
  font-style: italic;
`
