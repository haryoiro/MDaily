import React, { useEffect, useMemo, useState, useCallback } from "react";
import { createEditor, Editor, Transforms } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'

export function SlateEditor() {
  const editor = useMemo(() => withReact(createEditor()), [])
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
    {
      type: 'code',
      children: [{ text: 'const a = {text: "text"}'}]
    }
  ])

  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  })

  return (
    <Slate editor={editor} value={value} onChange={newValue => setValue(newValue)}>
      <Editable
        renderElement={renderElement}
        onKeyDown={e => {
          if (e.key === '`' && e.ctrlKey) {
            e.preventDefault()
            // 現在選択されているブロックが`code`ブロックであるかどうかを判断
            const [match] = Editor.nodes(editor, {
              match: n => n.type === 'code',
            })
            // ブロックタイプが'paragtaph'か'code'いずれかの場合それらを交互に切り替える
            Transforms.setNodes(
              editor,
              { type: match ? 'paragraph' : 'code' },
              { match: n => Editor.isBlock(editor, n)}
            )
          }
      }}/>
    </Slate>
  )
}

function CodeElement({attributes, children}) {
  return (
    <pre {...attributes}>
      <code>{children}</code>
    </pre>
  )
}

function DefaultElement({attributes, children}) {
return <p {...attributes}>{children}</p>
}