import React, { useState, useEffect } from 'react'
import { MainEditor } from './components/MainEditor/MainEditor.js'
import { SlateEditor } from './components/SlateEditor/SlateEditor'
import './App.css'
import './components/MainEditor/styles/megadraft/megadraft.scss'
// import { Notification } from './components/Notification/Notification'


// Draft.js plugins
// yarn remove draft-js-plugins-editor draft-js-static-toolbar-plugin draft-js-markdown-shortcuts-plugin draft-js-inline-toolbar-plugin draft-js-anchor-plugin draft-js-linkify-plugin
// import { ReactQueryDevtools } from 'react-query-devtools'

export default function App() {
  return (
    <>
      <MainEditor />
      <SlateEditor />
    </>
  )
}
