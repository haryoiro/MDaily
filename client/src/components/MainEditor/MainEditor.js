import React, { useState } from "react";
import { MegadraftEditor, editorStateFromRaw } from "megadraft";


export function MainEditor() {
  const [eState, setEState] = useState({editorState: editorStateFromRaw(null)})

  function handleChange(editorState) {
    setEState({ editorState })
  }

  return (
    <div style={{marginLeft: 80}}>
      <MegadraftEditor
        editorState={eState.editorState}
        onChange={editorState => handleChange(editorState)}
        placeholder='Add some text'
        />
    </div>
  )
}


