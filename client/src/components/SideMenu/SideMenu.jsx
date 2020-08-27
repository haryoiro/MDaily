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
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: top;
  background: ${({ theme }) => theme.bg2};
  height: 100vh;
  width: 90px;
  text-align: left;
  padding: 24px;
  padding-top: 48px;
  left: 0;
  top: 0;
  transition: transform 0.3s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.primaryHover};
  }
`

export default SideMenu;
