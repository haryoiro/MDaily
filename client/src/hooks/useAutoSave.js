import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useMutation, queryCache } from 'react-query'
import { updateDataById, getDataById } from '../services/access'

import { asyncNotification } from '../components/Notification/notificationSlice'
import { setBoardById }from '../components/Board/boardSlice'

export function useAutoSave(currentId, refetch) {
  const dispatch = useDispatch()
  const [lastText, setLastText] = useState('')
  const [text, setText] = useState('')
  const [updateContent, { isLoading }] = useMutation(updateDataById, {
    onSuccess: async (data) => {
      // await queryCache.invalidateQueries(['board', { id: currentId }])
      // console.log(data)
      await refetch()
      await dispatch(asyncNotification(`CONTENT IS SAVED`))
    }
  })
  useEffect(() => {
    if (text !== lastText && !isLoading) {
      const timer = setTimeout(async () => {
        await saveText()
        setLastText(text)
      }, AUTO_SAVE_INTERVAL)
      return () => clearTimeout(timer)
    }
  }, [text, lastText])
  const AUTO_SAVE_INTERVAL = 10000

  async function saveText() {
    if (text !== lastText) {
      setLastText(text)
      await updateContent({ id: currentId, text })
    }
  }

  return [
    text,
    setText,
    saveText,
  ]
}
