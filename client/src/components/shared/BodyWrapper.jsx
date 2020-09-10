import styled from '@emotion/styled'

const BodyWrapper = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 60px 1fr;
  grid-template-rows: 75px 20px 1fr;
  grid-template-areas:
  "sidebar header"
  "sidebar toolbar"
  "sidebar content";
  transition: all 0.5s ease-in-out;
  @media screen and (max-width: 550px) {
    grid-template-columns: 0px 1fr;
    grid-template-areas:
      "header"
      "toolbar"
      "content";
  }
`

export default BodyWrapper
