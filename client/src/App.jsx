import React from 'react'
import { Todo } from './components/TodoList/Todo'
import { Notification } from './components/Notification/Notification'

import { ReactQueryDevtools } from 'react-query-devtools'

export default function App() {
  return (
    <div>
      { // Development Only
        (process.env.NODE_ENV === 'development') &&
        <ReactQueryDevtools />
      }
      <header>
        <h1>TODO</h1>
        <Notification />
      </header>
      <Todo />
    </div>
  )
}
