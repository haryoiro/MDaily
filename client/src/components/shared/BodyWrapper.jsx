
import styled from 'styled-components'

const BodyWrapper = styled.div`
  display: grid;
  height: 100vh;
  width: 1fr;
  grid-template-columns: 60px 1fr;
  grid-template-rows: 128px 1fr;
  grid-template-areas:
  "sidebar header"
  "sidebar content"
  "sidebar content";
`

export default BodyWrapper
