import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Slate, Editable, withReact } from 'slate-react'
import { Editor, Transforms, createEditor } from 'slate'
import { withHistory } from 'slate-history'
import { useQuery, useMutation, queryCache } from 'react-query'
import { getDataById, updateDataById } from '../../services/access'
import { useParams } from 'react-router-dom'
import { withShortcuts, Element } from './withShortcuts'
import { useDispatch } from 'react-redux'
import { asyncNotification } from '../Notification/notificationSlice'

const Board = () => {
  const { id } = useParams()
  const [text, setText, setSendTitle, saveText] = useAutoSave(id)
  const [content, setContent] = useState([{ type: 'paragraph', children: [{ text: 'A line of text in a paragraph.' }] }])
  const [title, setTitle] = useState([{ type: 'heading-one', children: [{ text: 'UNTITLED' }] }])
  const { isLoading, isError, data, error } = useQuery(['board', { id }], getDataById)
  const renderElement = useCallback(props => <Element {...props} />, [])
  const editor = useMemo(() => withShortcuts(withReact(withHistory(createEditor()))), [])
  const titleEditor = useMemo(() => withReact(withHistory(createEditor())), [])

  useEffect(() => {
    if (data) {
      const parsedBodyText = JSON.parse(data.contents.text)
      setContent(parsedBodyText)
      setTitle([{ type: 'heading-one', children: [{ text: data.title }] }])
    }
  }, [data])

  if (isLoading) return <div>NOW LOADING...</div>
  if (isError) return <div>{error.message}</div>
  function onTitleChange(value) {
    setTitle(value)
    if (value[0].children[0].text === '') { setSendTitle('UNTITLED') }
    setSendTitle(value[0].children[0].text)
  }

  return (
    <>
      <Slate editor={titleEditor} value={title} onChange={onTitleChange}>
        <Editable renderElement={renderElement} onKeyDown={e => {
          if (e.key === 'Enter') { e.preventDefault() }
          if (e.key === 's' && ((e.ctrlKey && !e.metaKey) || (!e.ctrlKey && e.metaKey)) ) {
            e.preventDefault()
            saveText()
          }
        }} />
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
        />
      </Slate>
    </>
  )
}

export { Board }

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
    if (text !== lastText) {
      const timer = setTimeout(async () => {
        await updateContent([currentId, text, title])
        setLastText(text)
        setLastTitle(title)
      }, AUTO_SAVE_INTERVAL)
      return () => clearTimeout(timer)
    }
  }, [text, title])
  const AUTO_SAVE_INTERVAL = 10000

  async function saveText() {
    await updateContent([currentId, text, title])
  }

  return [
    text,
    setText,
    setTitle,
    saveText,
  ]
}