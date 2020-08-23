import React from 'react'
import { useHistory } from 'react-router-dom'
import { createNew } from '../../services/access'
import { useMutation, queryCache } from 'react-query'
import { useDispatch } from 'react-redux'
import { asyncNotification } from '../Notification/notificationSlice'

export function NewBoard() {
  const history = useHistory()
  const dispatch = useDispatch()
  const [createNote] = useMutation(createNew, {
    onSuccess: async (data) => {
      queryCache.invalidateQueries('board')
      await dispatch(asyncNotification(`CONTENT IS SAVED`))
    },
    onError: async (data, error) => {
      await dispatch(asyncNotification(error.message))
    }
  })

  async function onCreateNew() {
      const { id } = await createNote()
      history.push(`/board/${id}`)
  }

  return (
    <button onClick={onCreateNew}>
      <span>➕</span>
    </button>
  )
}