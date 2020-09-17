import React from 'react'
import { ThemeProvider, Styled } from 'theme-ui'
import theme from './theme'
const Root = Styled.root

export default ({ children }) => (
  <ThemeProvider theme={theme}>
    <Root>
      {children}
    </Root>
  </ThemeProvider>
)
