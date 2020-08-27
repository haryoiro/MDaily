import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
// API Access
import { updateDataById, getDataById } from '../../services/access'
// Slate
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
// Slate Plugin
import { withHistory } from 'slate-history'
import { withShortcuts } from './withShortcuts'
// Elements
import { MarkedElements, LeafElements } from './MarkdownElements'
import { markdownDecorator } from './markdownDecorator'
import { useAutoSave } from '../../hooks/useAutoSave'

function generateSlateNode(type, text = '') {
  return [{ type, children: [{ text }] }]
}

const Board = () => {
  const { id } = useParams()
  const { isLoading, isError, data, error }
    = useQuery(['board', { id }], getDataById)

  // AutoSaving Hooks
  const [text, setText, saveText] = useAutoSave(id)
  // Editor Initialize
  const [currentText, setCurrentText] = useState(generateSlateNode('paragraph'))

  const renderElement = useCallback(props => <MarkedElements {...props} />, [])
  const renderLeaf = useCallback(props => <LeafElements {...props} />, [])
  // Settings for a Slate Editor
  const editor = useMemo(() => withShortcuts(withReact(withHistory(createEditor()))), [])
  const decorate = useCallback(markdownDecorator, [])

  useEffect(() => {
    if (data) {
      const parsed = JSON.parse(data.contents.text)
      setCurrentText(parsed)
    }
  }, [data])

  if (isLoading) return <div>NOW LOADING...</div>
  if (isError) return <div>{error.message}</div>

  async function onHotKey(e) {
    if (e.key === 's' && ((e.ctrlKey && !e.metaKey) || (!e.ctrlKey && e.metaKey))) {
      e.preventDefault()
      if (currentText !== text) {
        await saveText()
      }
    }
  }

  return (
    <div>
      <Slate editor={editor} value={currentText} onChange={v => {
        setCurrentText(v)
        const stringig = JSON.stringify(v)
        setText(stringig)
      }}>
        <Editable
          decorate={decorate}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Write some markdown..."
          autoFocus
          className="editor"
          onKeyDown={onHotKey}
        />
      </Slate>
    </div>
  )
}


export default Board