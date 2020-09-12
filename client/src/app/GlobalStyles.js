import styled from '@emotion/styled'
import { Global } from '@emotion/core'
import reboot from './reboot.css'

const GlobalStyles = styled(Global)`
  ${reboot}
  html, body {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  *, *::after, *::before {
    box-sizing: border-box;
  }
  body {
    align-items: center;
    background: ${({ theme }) => theme.bg1};
    color: ${({ theme }) => theme.fg1};
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    text-rendering: optimizeLegibility;
    justify-content: center;
  }
  input[type=range] {
    -webkit-appearance: none;
    width: 100%;
    background: transparent;
    }input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
  }

  input[type=range]:focus {
    outline: none;
  }

  input[type=range]::-ms-track {
    width: 100%;
    cursor: pointer;

    background: transparent;
    border-color: transparent;
    color: transparent;
  }
`

export default GlobalStyles
