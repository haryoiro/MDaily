/** @jsx jsx */
import React from 'react'
import { Flex, Box,  Link, css, jsx } from 'theme-ui'


const NavStyle = css({
  height: '3em',
  border: "1px solid",
  alignItems: "center",
  listStyle: "none",
  "li:not(:first-of-type) a, li:not(:first-of-type) button": {
    "margin-left": "1rem"
  },
  a: {
    textDecoration: "none",
    textTransform: "uppercase",
    color: "text",
    fontSize: 1,
    fontWeight: "bold",
    letterSpacing: 1
  },
  "a:hover": {
    textDecoration: "underline"
  }
})

export default function NavBar(props) {
  return (
    <Box >
      <Flex
        px={3}
        alignItems='center'
        sx={NavStyle} >
        <li><Link to="/board">Home</Link></li>
        <Box mx='auto' />
        <li><Link to="/board">New</Link></li>
        <Box mx='auto' />
        <li><Link to="/board">Profile</Link></li>
      </Flex>
    </Box>
  )
}
