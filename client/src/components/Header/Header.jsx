import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

import NewBoard from '../NewBoard/NewBoard'
import { Icons } from '../shared'

// eslint-disable-next-line react/prop-types
const Header = ({ children, className, refetch }) => (
  <HeaderWrapper className={className}>
    <Container className="header-container">
      <RightItem className="header-right">
        <Reload width={25} height={25} onClick={refetch} />
        <NewBoard />
      </RightItem>
      <CenterItem className="header-center">
        <Link to="/">
          <Logo width={75} height={77} fill="#0000" className="LogoItem" />
        </Link>
      </CenterItem>
      <LeftItem className="header-left">
        {children}
        {/* <Expand width={25} height={25} /> */}
      </LeftItem>
    </Container>
  </HeaderWrapper>
)

const Logo = styled(Icons.LogoIcon)`
display: flex;
transform: scale(0.5);
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
// const Expand = styled(Icons.ExpandIcon)`
// display: flex;
// float: right;
// margin: 12.5px;
// `
const HeaderWrapper = styled.header`
display: grid;
position: sticky;
grid-area: "header";
height:  60px;
grid-row: auto;
width: 100vw;
background: ${({ theme }) => theme.bg1};
border-bottom: solid 1px ${({ theme }) => theme.bg2};
top: 0;
  @media screen and (max-width: 550px) {
  }
`

const CenterItem = styled.div`
display: flex;
position: absolute;
justify-content: center;
margin-left: -180px;
`
const LeftItem = styled.div`
display: flex;
position: absolute;
align-items: center;
align-content: center;
right:120px;
`
const RightItem = styled.div`
display: flex;
position: absolute;
left: 20px;

`
const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin: 0px 60px 0px 60px;
width: 100vw;
padding: 0;
`

export default Header
