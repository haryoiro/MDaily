/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react'
import {
  setDefaults, DEFAULTS_LINK, deserializeLink, renderElementLink,
} from '@udecode/slate-plugins'
import isUrl from '../../../plugins/isUrl'

function CustomLinkComponent({
  attributes, children, element, className,
}) {
  if (isUrl(element.url)) {
    return (
      <a
        className="slate-a"
        href={element.url}
        rel="noopener noreferrer noforrow"
        target="_blank"
        onClick={(e) => {
          e.preventDefault()
          window.open(element.url, '_blank')
          return null
        }}
        {...attributes}
      >
        {children}
      </a>
    )
  }
  return (
    <a
      className={className.root}
      href={element.url}
      {...attributes}
    >
      {children}
    </a>
  )
}

export const PLinkPlugin = (options) => {
  const exDef = {
    link: {
      ...DEFAULTS_LINK.link,
      rootProps: { className: 'slate-a' },
      component: CustomLinkComponent,
    },
  }
  const { link } = setDefaults(options, exDef)

  return {
    renderElement: renderElementLink(options),
    deserialize: deserializeLink(options),
    inlineTypes: [link.type],
  }
}

export default PLinkPlugin
