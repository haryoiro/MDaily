import { useState, useEffect, useRef } from 'react'

function useAutoFocus() {
  const [value, setValue] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    const node = inputRef.current
    if (node) {
      node.focus()
    }
  }, [value])

  function change() {
    setValue(!value)
  }

  return [inputRef, change]
}

export default useAutoFocus
