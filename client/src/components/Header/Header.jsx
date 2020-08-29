import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { Icons } from '../shared'

const StyledHeader = styled.header`
display: grid;
grid-area: "header";
height: 128px;
grid-row: auto;
background: ${({ theme }) => theme.bg1};
top: 0;
`

const Header = () => {
  return (
    <StyledHeader>
      <FlexContainer>
        <Link to="/">
          <Logo width={50} height={50} fill={"#0000"} className="LogoItem" />
        </Link>
        <Reload width={25} height={25}/>
        <Expand width={25} height={25}/>
      </FlexContainer>
    </StyledHeader>
  )
}

const Logo = styled(Icons.LogoIcon)`
display: flex;
margin: 0px 169px;
`
const Reload = styled(Icons.ReloadIcon)`
display: flex;
float: right;
`
const Expand = styled(Icons.ExpandIcon)`
display: flex;
float: right;
`
const FlexContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
`

export default Header