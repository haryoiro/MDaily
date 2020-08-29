import React from 'react';
import styled from 'styled-components'

const SideMenu = ({children}) => {
  return (
    <StyledSideMenu>
      {children}
    </StyledSideMenu>
  )
}

const StyledSideMenu = styled.nav`
  display: grid;
  grid-area: "sidebar";
  background: ${({ theme }) => theme.bg2};
  height: 100vh;
  width: 60px;
  padding: 12px;
  padding-top: 16px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.primaryHover};
  }
`

export default SideMenu;
