import React, { useState, useEffect } from 'react'
// import { SlateEditor } from './components/SlateEditor/SlateEditor'
import { MarkdownShortcuts } from './components/SlateSmallMark/SlateSmallMark'
import './App.css'
import './components/MainEditor/styles/megadraft/megadraft.scss'
// import { Notification } from './components/Notification/Notification'


export default function App() {
  return (
    <>
      <MarkdownShortcuts />
    </>
  )
}
