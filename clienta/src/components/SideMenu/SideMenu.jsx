import React from 'react'
import styled from 'styled-components'

// eslint-disable-next-line react/prop-types
const SideMenu = ({ children }) => (
  <StyledSideMenu>
    {children}
  </StyledSideMenu>
)

const StyledSideMenu = styled.nav`
  display: grid;
  grid-area: "sidebar";
  border-right: solid 2px ${({ theme }) => theme.bg2};
  height: 100vh;
  width: 60px;
  padding: 12px;
  padding-top: 16px;
  transition: transform 0.3s ease-in-out;

  @media screen and (max-width: 550px) {
    display: none;
    visibility: hidden;
  }
  &:hover {
    color: ${({ theme }) => theme.primaryHover};
  }
`

export default SideMenu
