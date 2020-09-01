/* eslint-disable react/jsx-props-no-spreading */
import React, {
  useState, useEffect, useCallback, useMemo,
} from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
// Slate
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
// Slate Plugin
import { withHistory } from 'slate-history'
import { withLayout, withShortcuts, markdownDecorator } from './SlatePlugins'
// AutoSave Hooks
import { useAutoSave } from '../../hooks'
// API Access
import { getDataById } from '../../services/access'
// Elements
import Header from '../Header/Header'
import { ContentWrapper } from '../shared'
import { MarkedElements, LeafElements } from './MarkdownElements'

function generateSlateNode(type, text = '') {
  return [{ type, children: [{ text }] }]
}

function MEditor() {
  const { id } = useParams()
  const {
    isLoading, isError, data, error, refetch,
  } = useQuery(['board', { id }], getDataById)

  // AutoSaving Hooks
  const [text, setText, saveText] = useAutoSave(id, refetch)
  // Editor Initialize
  const [currentText, setCurrentText] = useState(generateSlateNode('heading-one'))

  const renderElement = useCallback((props) => <MarkedElements {...props} />, [])
  const renderLeaf = useCallback((props) => <LeafElements {...props} />, [])
  // Settings for a Slate Editor
  const editor = useMemo(() => withHistory(withLayout(withShortcuts(withReact(createEditor())))), [])
  const decorate = useCallback(markdownDecorator, [])

  useEffect(() => {
    if (data) {
      const parsed = JSON.parse(data.contents.text)
      setCurrentText(parsed)
    }
  }, [data, isLoading, isError])

  if (isLoading) return <div>NOW LOADING...</div>
  if (isError) return <div>{error.message}</div>

  async function onHotKey(e) {
    if (e.key === 's'
      && currentText !== text
      && ((e.ctrlKey && !e.metaKey) || (!e.ctrlKey && e.metaKey))) {
      e.preventDefault()
      await saveText(id)
    }
  }
  const handleChangeEditor = (value) => {
    setCurrentText(value)
    setText(JSON.stringify(value))
  }

  return (
    <>
      <Header />
      <ContentWrapper>
        <Slate
          editor={editor}
          value={currentText}
          onChange={handleChangeEditor}
        >
          <Editable
            onKeyDown={onHotKey}
            decorate={decorate}
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="Write some markdown..."
            className="editor"
            spellCheck="false"
          />
        </Slate>
      </ContentWrapper>
    </>
  )
}

export default MEditor
