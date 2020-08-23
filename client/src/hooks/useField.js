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
