import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
// API Access
import { updateDataById, getDataById } from '../../services/access'
// Slate
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
// Slate Plugin
import { withHistory } from 'slate-history'
import { withShortcuts } from './withShortcuts'
import { withLayout } from './withLayout'
// Elements
import { Header } from '../../components/'
import { MarkedElements, LeafElements } from './MarkdownElements'
import { markdownDecorator } from './markdownDecorator'
import { useAutoSave } from '../../hooks/useAutoSave'

function generateSlateNode(type, text = '') {
  return [{ type, children: [{ text }] }]
}

const Board = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { isLoading, isError, data, error, refetch } = useQuery(['board', {id}],getDataById)

  // AutoSaving Hooks
  const [text, setText, saveText] = useAutoSave(id, refetch)
  // Editor Initialize
  const [currentText, setCurrentText] = useState(generateSlateNode('paragraph'))

  const renderElement = useCallback(props => <MarkedElements {...props} />, [])
  const renderLeaf = useCallback(props => <LeafElements {...props} />, [])
  // Settings for a Slate Editor
  const editor = useMemo(() => withLayout(
    withShortcuts(
      withReact(
        withHistory(
          createEditor()
        )
      )
    )
  ), [])
  const decorate = useCallback(markdownDecorator, [])

  useEffect(() => {
    if (data) {
      console.log(data)
      // const parsed = JSON.parse(data.contents.text)
      // setCurrentText(parsed)
    }
  }, [data])

  if (isLoading) return <div>NOW LOADING...</div>
  if (isError) return <div>{error.message}</div>

  async function onHotKey(e) {
    if (e.key === 's' && ((e.ctrlKey && !e.metaKey) || (!e.ctrlKey && e.metaKey))) {
      e.preventDefault()
      if (currentText !== text) {
        await saveText(id)
      }
    }
  }

  return (
    <>
      <Header />
      <EditorWrapper spellCheck={"false"}>
        <Slate editor={editor} value={currentText} onChange={v => {
          setCurrentText(v)
          setText(JSON.stringify(v))
        }}>
          <Editable
            decorate={decorate}
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="Write some markdown..."
            autoFocus
            spellCheck={"false"}
            className="editor"
            onKeyDown={onHotKey}
          />
        </Slate>
      </EditorWrapper>
    </>
  )
}



const EditorWrapper = styled.div`
display: grid;
grid-area: "content";
grid-column: 2;
overflow: scroll;
padding: 10px 20px;
margin: 0px 60px 0px 60px;
height: 100vh;
`

export default Board

