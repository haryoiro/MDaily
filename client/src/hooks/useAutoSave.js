import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useMutation, queryCache } from 'react-query'

import { asyncNotification } from '../components/Notification/notificationSlice'

export function useAutoSave(mutateFunction, currentId, fieldName, cb) {
  const dispatch = useDispatch()
  const [lastText, setLastText] = useState('')
  const [text, setText] = useState('')
  const [updateContent] = useMutation(mutateFunction, {
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
        await saveText()
        setLastText(text)
      }, AUTO_SAVE_INTERVAL)
      return () => clearTimeout(timer)
    }
  }, [text, lastText, currentId])
  const AUTO_SAVE_INTERVAL = 10000

  async function saveText() {
    if (text) {
      await updateContent({ currentId, [fieldName]: text })
      cb()
    }
  }

  return [
    text,
    setText,
    saveText,
  ]
}
