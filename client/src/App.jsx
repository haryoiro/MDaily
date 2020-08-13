import React from 'react'
import { Todo } from './components/TodoList/Todo'
import { Notification } from './components/Notification/Notification'
// import MarkdownBox from './components/TodoList/MarkdownBox'

import { ReactQueryDevtools } from 'react-query-devtools'

// https://vivliostyle.github.io/vivliostyle_doc/ja/vivliostyle-user-group-vol2/spring-raining/index.html

export default function App() {
  return (
    <div>
      { // Development Only
        (process.env.NODE_ENV === 'development') &&
        <ReactQueryDevtools />
      }
      <header>
        <Notification />
      </header>
      <Todo />
    </div>
  )
}
