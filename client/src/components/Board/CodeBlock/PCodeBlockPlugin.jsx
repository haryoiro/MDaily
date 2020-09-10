/* eslint-disable camelcase */
import React from 'react'
import {
  getRenderElement, setDefaults, DEFAULTS_CODE_BLOCK, getElementDeserializer
} from '@udecode/slate-plugins'
import decorateCodeBlock from './decorateBlock'

export const MARK_PRISM = 'prism'

export const renderElementCodeBlock = (options) => {
  const { code_block } = setDefaults(options, DEFAULTS_CODE_BLOCK)

  return getRenderElement(code_block)
}

export const renderLeafCodeBlock = () => ({ leaf, children }) => {
  if (leaf[MARK_PRISM] && !!leaf.text) {
    return (
      <span className={leaf.className}>{children}</span>
    )
  }
  return children
}

export const deserializeCodeBlock = (options) => {
  const { code_block } = setDefaults(options, DEFAULTS_CODE_BLOCK)

  return {
    element: getElementDeserializer({
      type: code_block.type,
      rules: [{ nodeNames: 'PRE' }],
    }),
  }
}

export const PCodeBlockPlugin = (options) => ({
  renderElement: renderElementCodeBlock(options),
  renderLeaf: renderLeafCodeBlock(),
  deserialize: deserializeCodeBlock(options),
  decorate: decorateCodeBlock(),
})
