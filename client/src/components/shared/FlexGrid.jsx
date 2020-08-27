import styled from 'styled-components'

export const Grid = styled.div`
`

export const Row = styled.div`
display: flex;
`

export const Col = styled.div`
  flex: ${props => props.size};
  ${props => props.collapse && media[props.collapse](`display: none;`)}
`

const media = {
  xs: (styles) => `
  @media only screen and (max-width: 480px) {
    ${styles}
  }`
}

export default {
  Grid,
  Row,
  Col,
  media,
}
