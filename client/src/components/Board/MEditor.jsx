/* eslint-disable react/jsx-props-no-spreading */
import React, {
  useState, useEffect, useMemo,
} from 'react'
import { createEditor } from 'slate'
import { Slate } from 'slate-react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import {
  FormatAlignCenter,
  FormatAlignLeft,
  FormatAlignRight,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  FormatStrikethrough,
  FormatUnderlined,
  Image,
  Link as LinkIcon,
  Looks3,
  Looks4,
  Looks5,
  Looks6,
  LooksOne,
  LooksTwo,
  Search,
} from '@styled-icons/material'
import { CodeAlt } from '@styled-icons/boxicons-regular/CodeAlt'
import { CodeBlock } from '@styled-icons/boxicons-regular/CodeBlock'
import { Subscript, Superscript } from '@styled-icons/foundation'
import {
  // mains
  BalloonToolbar,
  EditablePlugins,
  // Toolbar
  HeadingToolbar,
  ToolbarAlign,
  ToolbarElement,
  ToolbarImage,
  ToolbarLink,
  ToolbarList,
  ToolbarMark,
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_SUBSCRIPT,
  MARK_SUPERSCRIPT,
  MARK_UNDERLINE,
  LinkElement,
  // with
  pipe,
} from '@udecode/slate-plugins'
import { useAutoSave } from '../../hooks'
import { getDataById } from '../../services/access'
import Header from '../Header/Header'
import { ContentWrapper } from '../shared'
import '../../app/prism-theme.css'
import './slate.css'
import { isHotkey } from './SlatePlugins'

import { plugins, withPlugins } from './SlatePlugins/slatePlugins'

const initial = [
  {
    type: 'paragraph',
    children: [{
      text: 'This text is bold, italic and underlined',
    }],
  }]

function MEditor() {
  const { id } = useParams()
  const {
    isLoading, isError, data, error, refetch,
  } = useQuery(['board', { id }], getDataById)

  // AutoSaving Hooks
  const [text, setText, saveText] = useAutoSave(id, refetch)
  const [currentText, setCurrentText] = useState(initial)
  const editor = useMemo(() => pipe(createEditor(), ...withPlugins), [])
  useEffect(() => { if (data) { setCurrentText(data.contents.text) } }, [data, isLoading, isError])

  const handleChangeEditor = (value) => {
    setCurrentText(value)
    setText(value)
  }
  function onHotKey(e) {
    const { nativeEvent } = e

    if (isHotkey.isSave(nativeEvent) && currentText !== text) {
      e.preventDefault()
      const save = async () => { await saveText(id) }
      save()
    }
    if (isHotkey.isTab(nativeEvent)) {
      e.preventDefault()
      editor.insertText('\t')
    }
  }
  const onKeyBoard = [onHotKey]
  if (isLoading) return <div>NOW LOADING...</div>
  if (isError) return <div>{error.message}</div>

  return (
    <>
      <Slate
        editor={editor}
        value={currentText}
        onChange={handleChangeEditor}
        spellCheck="false"
      >
        <Header className="editor-header" />
        <HToolbar className="editor-header-toolbar" />
        <ContentWrapper className="editor-wrapper" spellCheck="false">
          <EditablePlugins
            plugins={plugins}
            placeholder="Enter some text..."
            onKeyDown={onKeyBoard}
          />
          <BToolbar />
        </ContentWrapper>
      </Slate>
    </>
  )
}
const tooltipOptions = {
  direction: 'top',
  theme: 'dark',
  hiddenDelay: 1,
  arrow: false,
}
const tooltip = {
  arrow: true,
  delay: 0,
  duration: [200, 0],
  hideOnClick: false,
  offset: [0, 4],
  placement: 'top',
}
function BToolbar() {
  return (
    <BalloonToolbar
      direction={tooltipOptions.direction}
      hiddenDelay={tooltipOptions.hiddenDelay}
      theme={tooltipOptions.theme}
      arrow={tooltipOptions.arrow}
      className="baloon-toolbar"
    >
      <ToolbarMark
        type={MARK_BOLD}
        icon={<FormatBold />}
        tooltip={{ content: 'Bold (⌘B)', ...tooltip }}
      />
      <ToolbarMark
        type={MARK_ITALIC}
        icon={<FormatItalic />}
        tooltip={{ content: 'Italic (⌘I)', ...tooltip }}
      />
      <ToolbarMark
        type={MARK_UNDERLINE}
        icon={<FormatUnderlined />}
        tooltip={{ content: 'Underline (⌘U)', ...tooltip }}
      />
      <ToolbarMark
        type={MARK_STRIKETHROUGH}
        icon={<FormatStrikethrough />}
        tooltip={{ content: 'Strikethrough (⌘⇧S)', ...tooltip }}
      />
      <ToolbarMark
        type={MARK_CODE}
        icon={<CodeAlt />}
        tooltip={{ content: 'InlineCode (⌘E)', ...tooltip }}
      />
      <ToolbarLink
        type="a"
        icon={<LinkIcon />}
        tooltip={{ content: 'Link', ...tooltip }}
      />
    </BalloonToolbar>
  )
}
function HToolbar() {
  return (
    <HeadingToolbar className="heading-toolbar">
      <ToolbarElement
        type="h1"
        icon={<LooksOne />}
        tooltip={{ content: 'Header-1 (#)', ...tooltip }}
      />
      <ToolbarElement
        type="h2"
        icon={<LooksTwo />}
        tooltip={{ content: 'Header-2 (##)', ...tooltip }}
      />
      <ToolbarElement
        type="h3"
        icon={<Looks3 />}
        tooltip={{ content: 'Header-3 (###)', ...tooltip }}
      />
      <ToolbarElement
        type="h4"
        icon={<Looks4 />}
        tooltip={{ content: 'Header-4 (####)', ...tooltip }}
      />
      <ToolbarElement
        type="h5"
        icon={<Looks5 />}
        tooltip={{ content: 'Header-5 (#####)', ...tooltip }}
      />
      <ToolbarElement
        type="h6"
        icon={<Looks6 />}
        tooltip={{ content: 'Header-6 (######)', ...tooltip }}
      />
      <ToolbarList
        typeList="ul"
        icon={<FormatListBulleted />}
        tooltip={{ content: 'UnOrdered (- or + or *)', ...tooltip }}
      />
      <ToolbarList
        typeList="ol"
        icon={<FormatListNumbered />}
        tooltip={{ content: 'OrderdList (1.)', ...tooltip }}
      />
      <ToolbarElement
        type="blockquote"
        icon={<FormatQuote />}
        tooltip={{ content: 'BlockQuote (>)', ...tooltip }}
      />
      <ToolbarElement
        type="code_block"
        icon={<CodeBlock />}
        tooltip={{ content: 'CodeBlock (```)', ...tooltip }}
      />

      {/* Marks */}
      <ToolbarMark
        type={MARK_BOLD}
        icon={<FormatBold />}
        tooltip={{ content: 'Bold (⌘B)', ...tooltip }}
      />
      <ToolbarMark
        type={MARK_ITALIC}
        icon={<FormatItalic />}
        tooltip={{ content: 'Italic (⌘I)', ...tooltip }}
      />
      <ToolbarMark
        type={MARK_UNDERLINE}
        icon={<FormatUnderlined />}
        tooltip={{ content: 'Underline (⌘U)', ...tooltip }}
      />
      <ToolbarMark
        type={MARK_STRIKETHROUGH}
        icon={<FormatStrikethrough />}
        tooltip={{ content: 'Strikethrough (⌘⇧S)', ...tooltip }}
      />
      <ToolbarMark
        type={MARK_CODE}
        icon={<CodeAlt />}
        tooltip={{ content: 'InlineCode (⌘E)', ...tooltip }}
      />
      <ToolbarMark
        type={MARK_SUPERSCRIPT}
        clear={MARK_SUBSCRIPT}
        icon={<Superscript />}
        tooltip={{ content: 'Superscript', ...tooltip }}
      />
      <ToolbarMark
        type={MARK_SUBSCRIPT}
        clear={MARK_SUPERSCRIPT}
        icon={<Subscript />}
        tooltip={{ content: 'Subscript', ...tooltip }}
      />
      <ToolbarAlign
        icon={<FormatAlignLeft />}
        tooltip={{ content: 'AlignLeft', ...tooltip }}
      />
      <ToolbarAlign
        type="align_center"
        icon={<FormatAlignCenter />}
        tooltip={{ content: 'AlignCenter', ...tooltip }}
      />
      <ToolbarAlign
        type="align_right"
        icon={<FormatAlignRight />}
        tooltip={{ content: 'AlignRight', ...tooltip }}
      />
      <ToolbarLink
        type="a"
        icon={<LinkIcon />}
        tooltip={{ content: 'Link', ...tooltip }}
      />
      <ToolbarImage icon={<Image />} />
    </HeadingToolbar>
  )
}

export default MEditor
