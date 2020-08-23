import React from 'react'

/* TODO */
// それぞれのコンポーネントをスタイリング
export const MarkedElements = ({ attributes, children, element }) => {
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
