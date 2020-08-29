import React, { useState, useEffect, useCallback, useMemo, memo} from 'react'

export function useSlider() {
  const [value, setValue] = useState(5)

  const handleSliderValueChanged = useCallback(v => { setValue(v) }, [])

  const sliderProps = useMemo(() => ({
    min: 0,
    min: 5,
    value,
    step: 1,
    onChange: e => handleSliderValueChanged(e)
  }), [value])
  const Sl = memo(<RangeSlider {...sliderProps} />)
  return [
    Sl,
    value,
  ]
}
