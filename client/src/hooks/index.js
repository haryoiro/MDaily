import { useState, useEffect, useRef } from 'react';

export function useField(type) {
  const [value, setValue] = useState('')

  const autoComplete = "off"

  function onChange(event) {
    setValue(event.target.value)
  }

  function onClear() {
    setValue('')
  }

  return {
    onClear,
    setValue,
    props: {
      type,
      value,
      onChange,
      autoComplete,
  }}
}

export function useToggle(value) {
  const [toggle, setToggle] = useState(false)

  function handleToggle(event) {
    event.preventDefault()
    setToggle(!toggle)
  }

  return {
    value,
    toggle,
    setToggle,
  }
}

export function useAutoFocus() {
  const [value, setValue] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    const node = inputRef.current
    if (node) {
      node.focus()
    }
  }, [value]);

  function change() {
    setValue(!value)
  }

  return [inputRef, change]
}