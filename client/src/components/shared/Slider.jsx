import React, { useState, useMemo } from 'react'
import styled from 'styled-components'

const StyledSlider = styled.div`
position: absolute;
`

export function Slider({ value, onChange, defaultValue }) {
  const [currentValue, setCurrentValue] = useState(defaultValue)
  useMemo(() => setCurrentValue(value), [value])

  return (
    <StyledSlider>
      <input
        type="range"
        min={0}
        max={2}
        value={currentValue}
        onChange={onChange}
      />
      <div>{value}</div>
    </StyledSlider>
  )
}