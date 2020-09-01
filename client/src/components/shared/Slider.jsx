import React, { useState, useMemo } from 'react'
import styled from 'styled-components'

const StyledSlider = styled.input`
display: flex;
float: right;
justify-content: right;
margin: 12.5px;
width: 5rem;
`

function Slider({ value, onChange, defaultValue }) {
  const [currentValue, setCurrentValue] = useState(defaultValue)
  useMemo(() => setCurrentValue(value), [value])

  return (
      <StyledSlider
        type="range"
        min={0}
        max={2}
        value={currentValue}
        onChange={onChange}
      />
  )
}

export default Slider