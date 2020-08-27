import { createGlobalStyle } from 'styled-components';
import reboot from './reboot.css'

export const GlobalStyles = createGlobalStyle`
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
    display: flex;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    height: 100vh;
    justify-content: center;
    text-rendering: optimizeLegibility;
  }
  `
