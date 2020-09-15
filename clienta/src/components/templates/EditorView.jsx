import React from 'react'
import styled from 'styled-components'

const Header = styled.div`
  background: #DDDDDD;
`
const Editor = styled.div`
  background: #444444;
`

function EditorView() {
  return (
    <EditorLayout>
      <Header />
      <Editor />
    </EditorLayout>
  )
}

// eslint-disable-next-line react/prop-types
function EditorLayout({ children }) {
  return (
    <div sytle={{ display: 'flex', flexDirection: 'row' }}>
      <div>{children[0]}</div>
      <div>{children[1]}</div>
    </div>
  )
}

export default EditorView
