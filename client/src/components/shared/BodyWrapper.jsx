import styled from 'styled-components'

const BodyWrapper = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 60px 1fr;
  grid-template-rows: 128px 1fr;
  grid-template-areas:
  "sidebar header"
  "sidebar content"
  "sidebar content";
  transition: all 0.5s ease-in-out;
  @media screen and (max-width: 550px) {
    grid-template-columns: 0px 1fr;
    grid-template-areas:
      "header"
      "content"
      "content";
  }
`

export default BodyWrapper
