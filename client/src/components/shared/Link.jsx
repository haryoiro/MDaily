import styled from 'styled-components'
import { Link as BaseLink } from 'react-router-dom'

const Link = styled(BaseLink)`
color: ${({ theme }) => theme.fg1};
text-align: center;
text-decoration: none;
margin: 5px;
&:hover {
  color: ${({ theme }) => theme.fg2};
  background: ${({ theme }) => theme.primaryHover};
}
`

export default Link
