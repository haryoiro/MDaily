import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Slate, Editable, withReact } from 'slate-react'
import { createEditor } from 'slate'
import { withHistory } from 'slate-history'
import { useQuery, useMutation, queryCache } from 'react-query'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getDataById, updateDataById } from '../../services/access'
import { withShortcuts } from './withShortcuts'
import { asyncNotification } from '../Notification/notificationSlice'
import { MarkedElements } from './MarkedElements'

export const Board = () => {
  const { id } = useParams()
  const [setText, setSendTitle, saveText] = useAutoSave(id)
  const [content, setContent] = useState([{ type: 'paragraph', children: [{ text: '' }] }])
  const [title, setTitle] = useState([{ type: 'heading-one', children: [{ text: '' }] }])
  const { isLoading, isError, data, error } = useQuery(['board', { id }], getDataById)
  const renderElement = useCallback(props => <MarkedElements {...props} />, [])
  const editor = useMemo(() => withShortcuts(withReact(withHistory(createEditor()))), [])
  const titleEditor = useMemo(() => withReact(withHistory(createEditor())), [])

  useEffect(() => {
    if (data) {
      const parsedBodyText = JSON.parse(data.contents.text)
      setContent(parsedBodyText)
      setTitle([{ type: 'heading-one', children: [{ text: data.title }] }])
      setSendTitle(data.title)
    }
  }, [data])

  if (isLoading) return <div>NOW LOADING...</div>
  if (isError) return <div>{error.message}</div>

  function onTitleChange(value) {
    setTitle(value)
    const titleText = value[0].children[0].text
    if (titleText === '') { setSendTitle('UNTITLED') }
    setSendTitle(titleText)
  }

  return (
    <>
      <Slate editor={titleEditor} value={title} onChange={onTitleChange}>
        <Editable renderElement={renderElement} onKeyDown={e => {
          if (e.key === 'Enter') { e.preventDefault() }
          if ((e.key === 's') && ((e.ctrlKey && !e.metaKey) || (!e.ctrlKey && e.metaKey))) {
            e.preventDefault()
            saveText()
          }
        }}
          placeholder="Write Some Title"
        />
      </Slate>
      <Slate editor={editor} value={content} onChange={value => {
        setContent(value)
        setText(JSON.stringify(value))
      }}>
        <Editable
          renderElement={renderElement}
          placeholder="Write some markdown..."
          autoFocus
          className="editor"
          onKeyDown={e => {
            if (e.key === 's' && ( (e.ctrlKey && !e.metaKey) || (!e.ctrlKey && e.metaKey) )) {
              e.preventDefault()
              saveText()
            }
          }}
        />
      </Slate>
    </>
  )

}


function useAutoSave(currentId) {
  const dispatch = useDispatch()
  const [lastText, setLastText] = useState('')
  const [text, setText] = useState('')
  const [lastTitle, setLastTitle] = useState('')
  const [title, setTitle] = useState('')
  const [updateContent] = useMutation(updateDataById, {
    onSuccess: async (data) => {
      queryCache.invalidateQueries('board')
      await dispatch(asyncNotification(`CONTENT IS SAVED`))
    },
    onError: async (data, error) => {
      await dispatch(asyncNotification(error.message))
    }
  })
  useEffect(() => {
    if ((text !== lastText) || (title !== lastTitle)) {
      const timer = setTimeout(async () => {
        await updateContent([currentId, text, title])
        setLastText(text)
        setLastTitle(title)
      }, AUTO_SAVE_INTERVAL)
      return () => clearTimeout(timer)
    }
  }, [text, title, lastText, currentId, lastTitle, updateContent])
  const AUTO_SAVE_INTERVAL = 10000

  async function saveText() {
    await updateContent([currentId, text, title])
  }

  return [
    setText,
    setTitle,
    saveText,
  ]
}