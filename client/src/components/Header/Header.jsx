import React from 'react'
import { Link, useHistory } from 'react-router-dom'

export function Header() {
  const history = useHistory()

  function goBack(e) {
    e.preventDefault()
    history.goBack()
  }
  function goForward(e) {
    e.preventDefault()
    history.goForward()
  }

  return (
    <div>
      <Link to='/'>Board</Link>
      <button onClick={goBack}>＜</button>
      <button onClick={goForward}>＞</button>
    </div>
  )
}