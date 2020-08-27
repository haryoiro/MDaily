import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from './app/store'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from './app/GlobalStyles'
import { theme } from './app/theme'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
