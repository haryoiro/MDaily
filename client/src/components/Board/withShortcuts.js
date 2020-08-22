import React from 'react'
import { Editor, Transforms, Range, Point } from 'slate'

const SHORTCUTS = {
  '*': 'list-item',
  '-': 'list-item',
  '+': 'list-item',
  '>': 'block-quote',
  '#': 'heading-one',
  '##': 'heading-two',
  '###': 'heading-three',
  '####': 'heading-four',
  '#####': 'heading-five',
  '######': 'heading-six',
  '': 'new-line',
  '```': 'code'
}

export const withShortcuts = editor => {
  const { deleteBackward, insertText } = editor

  editor.insertText = text => {
    const { selection } = editor


    if (text === ' ' && selection && Range.isCollapsed(selection)) {
      const { anchor } = selection
      const block = Editor.above(editor, {
        match: n => Editor.isBlock(editor, n)
      })
      const path = block ? block[1] : []
      const start = Editor.start(editor, path)
      const range = { anchor, focus: start }
      const beforeText = Editor.string(editor, range)
      const type = SHORTCUTS[beforeText]
      if (type) {
        Transforms.select(editor, range)
        Transforms.delete(editor)
        Transforms.setNodes(
          editor,
          { type },
          { match: n => Editor.isBlock(editor, n) }
        )
        if (type === undefined) {
          Transforms.setNodes(
            editor,
            { type: 'new-line' },
            { match: n => Editor.isBlock(editor, n) }
          )
        }

        if (type === 'list-item') {
          const list = { type: 'bulleted-list', children: [] }
          Transforms.wrapNodes(editor, list, {
            match: n => n.type === 'list-item',
          })
        }

        return
      }
    }

    insertText(text)
  }

  editor.deleteBackward = (...args) => {
    const { selection } = editor

    if (selection && Range.isCollapsed(selection)) {
      const match = Editor.above(editor, {
        match: n => Editor.isBlock(editor, n),
      })

      if (match) {
        const [block, path] = match
        const start = Editor.start(editor, path)

        if (
          block.type !== 'paragraph' &&
          Point.equals(selection.anchor, start)
        ) {
          Transforms.setNodes(editor, { type: 'paragraph' })

          if (block.type === 'list-items') {
            Transforms.unwrapNodes(editor, {
              match: n => n.type === 'bulleted-list',
              split: true,
            })
          }

          return
        }
      }

      deleteBackward(...args)
    }
  }

  return editor
}


export const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'block-quote':
      return <blockquote className='marked-block'{...attributes}>{children}</blockquote>
    case 'bulleted-list':
      return <ul className='marked-bulleted'{...attributes}>{children}</ul>
    case 'heading-one':
      return <h1 className='marked-h1'{...attributes}>{children}</h1>
    case 'heading-two':
      return <h2 className='marked-h2'{...attributes}>{children}</h2>
    case 'heading-three':
      return <h3 className='marked-h3'{...attributes}>{children}</h3>
    case 'heading-four':
      return <h4 className='marked-h4'{...attributes}>{children}</h4>
    case 'heading-five':
      return <h5 className='marked-h5'{...attributes}>{children}</h5>
    case 'heading-six':
      return <h6 className='marked-h6'{...attributes}>{children}</h6>
    case 'list-item':
      return <li className='marked-li'{...attributes}>{children}</li>
    case 'new-line':
      return <p className='marked-p'  {...attributes}>{children}</p>
    case 'code':
      return <code className='marked-code' {...attributes}>{children}</code>
    default:
      return <p className='marked-p'  {...attributes}>{children}</p>
  }
}


function log(obj) {
  for (let i in obj) {
    console.log(i, '\t\t\t|', obj[i])
  }
}