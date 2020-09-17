import React from 'react';
import ReactDOM from 'react-dom'
import { ThemeProvider, Styled } from 'theme-ui'
import theme from './theme/theme'
import App from './App';
const Root = Styled.root

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Root>
        <App />
      </Root>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)