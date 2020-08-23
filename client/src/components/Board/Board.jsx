import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useParams } from 'react-router-dom'
// API Access
import { updateDataById } from '../../services/access'
// Slate
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
// Slate Plugin
import { withHistory } from 'slate-history'
import { withShortcuts } from './withShortcuts'
// Elements
import { MarkedElements } from './MarkedElements'
import { Leaf } from './Leaf'

import { useAutoSave } from '../../hooks/useAutoSave'

function generateSlateNode(type, text = '') {
  return [{ type, children: [{ text }] }]
}

export const Board = ({ datas, refetch }) => {
  const { id } = useParams()
  const data = datas.find(n => n.id === id)
  // AutoSaving Hooks
  const [text, setText, saveText] = useAutoSave(updateDataById, id, 'text', refetch)
  const [title, setTitle, saveTitle] = useAutoSave(updateDataById, id, 'title', refetch)
  // Editor Initialize
  const [currentText, setCurrentText] = useState(generateSlateNode('paragraph'))
  const [currentTitle, setCurrentTitle] = useState(generateSlateNode('heading-one'))

  const renderElement = useCallback(props => <MarkedElements {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  // Settings for a Slate Editor
  const editor = useMemo(() => withShortcuts(withReact(withHistory(createEditor()))), [])
  const titleEditor = useMemo(() => withReact(withHistory(createEditor())), [])
  const decorate = useCallback(markdownDecorator, [])

  useEffect(() => {
    if (data) {
      setCurrentText(JSON.parse(data.contents.text))
      setCurrentTitle(generateSlateNode('heading-one', data.title))
      setTitle(data.title)
    }
  }, [data])

  function onTitleChange(value) {
    setCurrentTitle(value)
    const titleText = value[0].children[0].text
    setTitle(titleText)
  }

  function onHotKey(e) {
    if (e.key === 's' && ((e.ctrlKey && !e.metaKey) || (!e.ctrlKey && e.metaKey))) {
      e.preventDefault()
      if (currentText !== text) {
        console.log('text saved')
        saveText()
      }
      if (currentTitle !== title) {
        console.log('title saved')
        saveTitle()
      }
    }
  }

  return (
    <>
      <Slate editor={titleEditor} value={currentTitle} onChange={onTitleChange}>
        <Editable renderElement={renderElement} placeholder="Write some Title" onKeyDown={e => {
          if (e.key === 's' && ((e.ctrlKey && !e.metaKey) || (!e.ctrlKey && e.metaKey))) {
            e.preventDefault()
            if (currentText !== text) saveText()
            if (currentTitle !== title) saveTitle()
          }
        }} />
      </Slate>
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
          className="editor"
          onKeyDown={onHotKey}
        />
      </Slate>
    </>
  )

}

