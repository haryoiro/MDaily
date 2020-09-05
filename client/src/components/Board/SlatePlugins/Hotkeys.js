/**
 * https://github.com/ianstormtaylor/slate/blob/master/packages/slate-react/src/utils/hotkeys.ts
 */

import { isKeyHotkey } from 'is-hotkey'

const IS_APPLE = typeof navigator !== 'undefined' && /Mac OS X/.test(navigator.userAgent)

const HOTKEYS = {
  save: 'mod+s',
}

const APPLE_HOTKEYS = {
  save: 'cmd+s',
}

const WINDOWS_HOTKEYS = {
  save: 'ctrl+s',
}

const create = (key) => {
  const generic = HOTKEYS[key]
  const apple = APPLE_HOTKEYS[key]
  const windows = WINDOWS_HOTKEYS[key]
  const isGeneric = generic && isKeyHotkey(generic)
  const isApple = apple && isKeyHotkey(apple)
  const isWindows = windows && isKeyHotkey(windows)

  return (event) => {
    if (isGeneric && isGeneric(event)) return true
    if (IS_APPLE && isApple && isApple(event)) return true
    if (!IS_APPLE && isWindows && isWindows(event)) return true
    return false
  }
}

export default {
  isSave: create('save'),
}