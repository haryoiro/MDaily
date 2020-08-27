import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useMutation, queryCache } from 'react-query'
import { updateDataById, getDataById } from '../services/access'

import { asyncNotification } from '../components/Notification/notificationSlice'

export function useAutoSave(currentId) {
  const dispatch = useDispatch()
  const [lastText, setLastText] = useState('')
  const [text, setText] = useState('')
  const [updateContent] = useMutation(updateDataById, {
    onSuccess: async (data) => {
      await queryCache.invalidateQueries('board')
      await dispatch(asyncNotification(`CONTENT IS SAVED`))
    },
    onError: async (data, error) => {
      await dispatch(asyncNotification(error.message))
    }
  })
  useEffect(() => {
    if (text !== lastText) {
      const timer = setTimeout(async () => {
        await updateContent({ currentId, text })
        setLastText(text)
      }, AUTO_SAVE_INTERVAL)
      return () => clearTimeout(timer)
    }
  }, [text, lastText, currentId])
  const AUTO_SAVE_INTERVAL = 100000

  async function saveText() {
      await updateContent({ currentId, text })
  }

  return [
    text,
    setText,
    saveText,
  ]
}
