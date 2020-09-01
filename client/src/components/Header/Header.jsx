import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { Icons } from '../shared'

// eslint-disable-next-line react/prop-types
const Header = ({ children, refetch }) => (
  <HeaderWrapper>
    <Container>
      <CenterItem>
        <Link to="/">
          <Logo width={75} height={77} fill="#0000" className="LogoItem" />
        </Link>
      </CenterItem>
      <LeftItem>
        {children}
        <Reload width={25} height={25} onClick={refetch} />
        {/* <Expand width={25} height={25} /> */}
      </LeftItem>
    </Container>
  </HeaderWrapper>
)

const Logo = styled(Icons.LogoIcon)`
display: flex;
`
const Reload = styled(Icons.ReloadIcon)`
display: flex;
float: right;
margin: 12.5px;
cursor: pointer;
:hover {
  background: ${({ theme }) => theme.bg2};
}
`
const Expand = styled(Icons.ExpandIcon)`
display: flex;
float: right;
margin: 12.5px;
`

const HeaderWrapper = styled.header`
display: grid;
position: sticky;
grid-area: "header";
height: 128px;
grid-row: auto;
width: 100vw;
background: ${({ theme }) => theme.bg1};
top: 0;
`

const CenterItem = styled.div`
position: absolute;
display: flex;
justify-content: center;
margin-right: 55px;
`
const LeftItem = styled.div`
display: flex;
position: absolute;
right:120px;
`
const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin: 0px 60px 0px 60px;
width: 100vw;
margin: 0;
padding: 0;
`

export default Header
