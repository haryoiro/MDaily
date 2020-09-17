import React from 'react'
import { Box } from 'theme-ui'

const Icon = ({ styles, children, ...props }) => (
  <Box {...props}>
    <svg height="32px" width="32px" viewBox="-8 -8 50 50" styles={styles}>
    {children}
    </svg>
  </Box>
)

export default Icon
