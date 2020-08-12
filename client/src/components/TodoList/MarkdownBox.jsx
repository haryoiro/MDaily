import unified from 'unified'
import parse from 'remark-parse'
// import remark2react from 'remark-react'
import slug from 'remark-slug'
import remark2rehype from 'remark-rehype'
import rehype2react from 'rehype-react'


import React, { useState, useEffect } from 'react'
import { useAutoFocus } from '../../hooks/index'


       // using remark-react
        // 生成されたHTMLを変形させたかったが、
        // ドキュメントが少ないのでr2rの内部で使用されている
        // rehypeを使用する方法をとってみる。
        // unified()
        //   .use(parse, {fragment: true})
        //   .use(remark2react)
        //   .processSync(value)
        //   .result
export default function MarkdownBox({ value, id }) {
  const [currentText, setCurrentText] = useState(value)
  const [editable, setEditable] = useState(false)
  const [inputRef, focus] = useAutoFocus()

  // 行がクリックされ、編集可能になったとき(div -> input)自動的にフォームにフォーカスする。
  useEffect(() => focus(), [editable])

  const MarkedLine = () =>
    <p className={`line${id}`} onClick={() => setEditable(true)}>
      {
        unified()
          .data('settings', { fragment: true })
          .use(parse)
          .use(slug)
          .use(remark2rehype)
          // .use(rehypeFormat)
          // .use(rehypeStringify)
          .use(rehype2react, {
            createElement: React.createElement
          })
          .processSync(value)
          .result
      }
    </p>
  const EditableLine = () =>
    <input
      ref={inputRef}
      type="text"
      onChange={(e) => setCurrentText(e.target.value)}
      onBlur={() => setEditable(false)}
      value={currentText}
    />

  if (!value) return null
  if (!editable) return MarkedLine()
  if (editable) return EditableLine()
}