import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useMutation } from 'react-query'
import { updateDataById } from '../services/access'

import { asyncNotification } from '../components/Notification/notificationSlice'

const AUTO_SAVE_INTERVAL = 10000

function useAutoSave(currentId, refetch) {
  const dispatch = useDispatch()
  const [lastText, setLastText] = useState('')
  const [text, setText] = useState('')
  const [updateContent, { isLoading }] = useMutation(updateDataById, {
    onSuccess: async () => {
      await refetch()
      await dispatch(asyncNotification('CONTENT IS SAVED'))
    },
  })
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (text !== lastText && !isLoading) {
        setLastText(text)
        await updateContent({ id: currentId, text })
      }
    }, AUTO_SAVE_INTERVAL)
    return () => clearTimeout(timer)
  }, [text, lastText, isLoading])

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

export default useAutoSave
