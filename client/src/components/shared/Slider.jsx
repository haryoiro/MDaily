import React, { useState, useMemo } from 'react'
import styled from '@emotion/styled'

const StyledSlider = styled.input`
display: flex;
float: right;
justify-content: right;

&::-webkit {
  &-slider-thumb{
    -webkit-appearance: none;
    cursor: pointer;
    margin-top: -4px;
    border-radius: 6px;
    width: 12px;
    height: 12px;
    background: ${({ theme }) => theme.fg1};
  }
  &-slider-runnable-track{
    height: 4px;
    width: 100%;
    border-radius: 5px;
    background: ${({ theme }) => theme.fg2};
    &:focus{
      background: red;
    }
  }
}
&::-moz-range {
  &-thumb{
    margin: 12.5px;
    width: 5rem;
    cursor: pointer;
  }
  &-track{
    height: 4px;
    width: 100%;
    border-radius: 5px;
    background: ${({ theme }) => theme.fg2};
  }
}
&::-ms-thumb {
  margin: 12.5px;
  width: 5rem;
  cursor: pointer;
}
&::-webkit-slider-runnable-track {

}
&::-moz-range-track {

}
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
