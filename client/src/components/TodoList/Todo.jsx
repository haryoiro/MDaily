
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { useQuery, useMutation, queryCache } from 'react-query'
import { useField, useToggle, useAutoFocus } from '../../hooks/index'
import { getTodo, createTodo } from '../../services/todoAccess'

import { asyncNotification } from '../Notification/notificationSlice'
import MarkdownBox from './MarkdownBox'

export function Todo() {
  const { isLoading, isError, data, error } = useQuery('todo', getTodo)

  if (isLoading) return <div>NOW LOADING...</div>
  if (isError) return <div>{error.message}</div>

  return (
    <div>
      {
        data.map(a => a.lines.map(l =>
          <MarkdownBox value={l} />
        ))
      }
      <TodoForm />
    </div>
  )
}


export function TodoForm() {
  const dispatch = useDispatch()
  const title = useField('text')
  const lines = useField('text')
  const [mutate] = useMutation(createTodo, {
    onSuccess: async (data) => {
      queryCache.invalidateQueries('todo')
      await dispatch(asyncNotification(`${data.title} IS ADDED`))
    },
    onError: async (data, error) => {
      await dispatch(asyncNotification(error.message))
    }
  })

  async function handleSubmit(event) {
    event.preventDefault()

    const newContent = {
      title: title.props.value,
      lines: lines.props.value,
    }

    try {
      const returnedData = await mutate(newContent)
      title.onClear()
      lines.onClear()
      console.log(returnedData)
    } catch (error) {
      console.error(error.message)
    }

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        TITLE <input {...title.props} />
        BODY  <input {...lines.props} />
        <button type="submit">SUBMIT</button>
      </form>
    </div>
  )
}